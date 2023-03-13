import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { PersonalContactSimple } from './models/personal-contact-simple.model';
import { PersonalContactDetail } from './models/personal-contact-details.model';
import { RenameContactRequest } from './requests/rename-contact.request';
import { ChangeContactDetailsRequest } from './requests/change-contact-details.request';
import { AddContactRequest } from './requests/add-contact.request';

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

  getContactById(id: string): Observable<PersonalContactDetail> {
    return this.http.get<PersonalContactDetail>(`${this.url}/${id}`);
  }

  addContact(request: AddContactRequest): Observable<PersonalContactDetail> {
    return this.http.post<PersonalContactDetail>(this.url, request);
  }

  renameContact(id: string, request: RenameContactRequest): Observable<PersonalContactSimple> {
    return this.http.put<PersonalContactSimple>(`${this.url}/${id}/Rename`, request);
  }

  changeContactDetails(id: string, request: ChangeContactDetailsRequest): Observable<PersonalContactDetail> {
    return this.http.put<PersonalContactDetail>(`${this.url}/${id}/Details`, request);
  }

  deleteContact(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}