import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { PersonalContactSimple } from './models/personal-contact-simple.model';

@Injectable({ providedIn: 'root' })
export class PersonalContactsResource {
  constructor(private http: HttpClient) { }

  getPersonalContacts(nameSearchTerm: string | null): Observable<PersonalContactSimple[]> {
    let params = new HttpParams();
    if (nameSearchTerm) {
      params = params.set('nameSearchTerm', nameSearchTerm);
    }

    return this.http.get<PersonalContactSimple[]>('/api/v1/PersonalContacts', { params });
  }
}