import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap } from 'rxjs/operators';
import { PersonalContactsResource } from '../personal-contacts.resource';
import { loadPersonalContactsSuccess, PersonalContactActions, deleteContactSuccess } from './personal-contact.actions';

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
}