import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { PersonalContactSimple } from './models/personal-contact-simple.model';
import { PersonalContactDetail } from './models/personal-contact-details.model';
import { ChangeContactRequest } from './requests/change-contact.request';

@Injectable({ providedIn: 'root' })
export class PersonalContactsResource {
  private readonly url = '/api/v1/PersonalContacts';

  constructor(private http: HttpClient) { }

  getPersonalContacts(nameSearchTerm: string | null): Observable<PersonalContactSimple[]> {
    let params = new HttpParams();
    if (nameSearchTerm) {
      params = params.set('nameSearchTerm', nameSearchTerm);
    }

    return this.http.get<PersonalContactSimple[]>(this.url, { params });
  }

  getContactById(id: string): Observable<any> {
    return this.http.get<PersonalContactDetail>(`${this.url}/${id}`);
  }

  addContact(request: ChangeContactRequest): Observable<string> {
    return this.http.post<string>(this.url, request);
  }

  updateContact(id: string, request: ChangeContactRequest): Observable<string> {
    return this.http.put<string>(`${this.url}/${id}`, request);
  }

  deleteContact(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}