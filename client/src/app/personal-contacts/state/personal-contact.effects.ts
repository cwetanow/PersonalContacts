import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap } from 'rxjs/operators';
import { PersonalContactsResource } from '../personal-contacts.resource';
import { loadPersonalContactsSuccess, PersonalContactActions, deleteContactSuccess, addContactSuccess, updateContact, updateContactSuccess, loadPersonalContactDetailsSuccess } from './personal-contact.actions';
import { ChangeContactRequest } from '../requests/change-contact.request';

@Injectable()
export class PersonalContactEffects {
  constructor(
    private actions$: Actions,
    private resource: PersonalContactsResource
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
    exhaustMap((action: { request: ChangeContactRequest }) => this.resource.addContact(action.request)
      .pipe(
        map(contact => addContactSuccess({ contact }))
      ))
  ));

  updateContact$ = createEffect(() => this.actions$.pipe(
    ofType(PersonalContactActions.UpdateContact),
    exhaustMap((action: { id: string, request: ChangeContactRequest }) => this.resource.updateContact(action.id, action.request)
      .pipe(
        map(updatedContact => updateContactSuccess({ updatedContact }))
      ))
  ));

  loadContactDetails$ = createEffect(() => this.actions$.pipe(
    ofType(PersonalContactActions.LoadContactDetails),
    exhaustMap((action: { id: string }) => this.resource.getContactById(action.id)
      .pipe(
        map(contact => loadPersonalContactDetailsSuccess({ contact }))
      ))
  ));
}