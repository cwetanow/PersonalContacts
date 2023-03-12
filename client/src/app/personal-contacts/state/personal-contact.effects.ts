import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap } from 'rxjs/operators';
import { PersonalContactsResource } from '../personal-contacts.resource';
import { loadPersonalContactsSuccess, PersonalContactActions } from "./personal-contact.actions";

@Injectable()
export class PersonalContactEffects {
  constructor(
    private actions$: Actions,
    private resource: PersonalContactsResource
  ) { }

  loadContacts$ = createEffect(() => this.actions$.pipe(
    ofType(PersonalContactActions.LoadContacts),
    exhaustMap(() => this.resource.getPersonalContacts()
      .pipe(
        map(contacts => loadPersonalContactsSuccess({ data: contacts }))
      ))
  ));
}