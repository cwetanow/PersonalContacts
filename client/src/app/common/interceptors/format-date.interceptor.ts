import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

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
      return this.serializeDate(obj);
    }

    if (obj instanceof Object) {
      const copy = Object.assign({}, obj);

      Object.keys(copy)
        .forEach(key => copy[key] = this.serializeDates(copy[key]));

      return copy;
    }

    return obj;
  }

  private serializeDate(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}