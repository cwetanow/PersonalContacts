import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap } from 'rxjs/operators';
import { PersonalContactsResource } from '../personal-contacts.resource';
import { loadPersonalContactsSuccess, PersonalContactActions, loadPersonalContacts } from './personal-contact.actions';
import { tap } from 'rxjs';

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
}