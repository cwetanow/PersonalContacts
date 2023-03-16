import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { forEach } from 'cypress/types/lodash';

@Injectable()
export class FormatDateInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const body = req.body;
    this.serializeDates(body);
    const newReq = req.clone({ body: this.serializeDates(body) });
    return next.handle(newReq);
  }

  private serializeDates(obj: any): any {
    if (obj instanceof Date) {
      return moment(obj).format('YYYY-MM-DD');
    }

    if (obj instanceof Object) {
      const copy = Object.assign({}, obj);

      Object.keys(copy)
        .forEach(key => copy[key] = this.serializeDates(copy[key]));

      return copy;
    }

    return obj;
  }
}