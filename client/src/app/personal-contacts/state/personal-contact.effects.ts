import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, debounceTime } from 'rxjs/operators';
import { PersonalContactsResource } from '../personal-contacts.resource';
import { loadPersonalContactsSuccess, PersonalContactActions, deleteContactSuccess, addContactSuccess, loadPersonalContactDetailsSuccess, renameContactSuccess, changeContactDetailsSuccess } from './personal-contact.actions';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { PersonalContactDetail } from '../models/personal-contact-details.model';
import { RenameContactRequest } from '../requests/rename-contact.request';
import { ChangeContactDetailsRequest } from '../requests/change-contact-details.request';
import { AddContactRequest } from '../requests/add-contact.request';

@Injectable()
export class PersonalContactEffects {
  constructor(
    private actions$: Actions,
    private resource: PersonalContactsResource,
    private router: Router
  ) { }

  loadContacts$ = createEffect(() => this.actions$.pipe(
    ofType(PersonalContactActions.LoadContacts),
    exhaustMap((action: { nameSearchTerm: string | null }) => this.resource.getPersonalContacts(action.nameSearchTerm)
      .pipe(
        map(contacts => loadPersonalContactsSuccess({ data: contacts }))
      ))
  ));

  deleteContact$ = createEffect(() => this.actions$.pipe(
    ofType(PersonalContactActions.DeleteContact),
    exhaustMap((action: { contactId: string }) => this.resource.deleteContact(action.contactId)
      .pipe(
        map(() => deleteContactSuccess({ deletedContactId: action.contactId }))
      ))
  ));

  addContact$ = createEffect(() => this.actions$.pipe(
    ofType(PersonalContactActions.AddContact),
    exhaustMap((action: { request: AddContactRequest }) => this.resource.addContact(action.request)
      .pipe(
        map(contact => addContactSuccess({ contact }))
      ))
  ));

  renameContact$ = createEffect(() => this.actions$.pipe(
    ofType(PersonalContactActions.RenameContact),
    exhaustMap((action: { id: string, request: RenameContactRequest }) => this.resource.renameContact(action.id, action.request)
      .pipe(
        map(updatedContact => renameContactSuccess({ updatedContact }))
      ))
  ));

  changeContactDetails$ = createEffect(() => this.actions$.pipe(
    ofType(PersonalContactActions.ChangeContactDetails),
    exhaustMap((action: { id: string, request: ChangeContactDetailsRequest }) => this.resource.changeContactDetails(action.id, action.request)
      .pipe(
        map(updatedContact => changeContactDetailsSuccess({ updatedContact }))
      ))
  ));

  loadContactDetails$ = createEffect(() => this.actions$.pipe(
    ofType(PersonalContactActions.LoadContactDetails),
    exhaustMap((action: { id: string }) => this.resource.getContactById(action.id)
      .pipe(
        map(contact => loadPersonalContactDetailsSuccess({ contact }))
      ))
  ));

  addContactSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(PersonalContactActions.AddContactSuccess),
    tap((action: { contact: PersonalContactDetail }) => this.router.navigate(['contacts', action.contact.id]))
  ), { dispatch: false });

  deleteContactSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(PersonalContactActions.DeleteContactSuccess),
    tap(() => this.router.navigate(['contacts']))
  ), { dispatch: false });
}