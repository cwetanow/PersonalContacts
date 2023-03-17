import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { PersonalContactsResource } from '../personal-contacts.resource';
import {
  PersonalContactActions,
  loadPersonalContactsSuccess,
  deleteContactSuccess,
  addContactSuccess,
  loadPersonalContactDetailsSuccess,
  renameContactSuccess,
  changeContactDetailsSuccess,
  contactActionFail
} from './personal-contact.actions';
import { Router } from '@angular/router';
import { PersonalContactDetail } from '../models/personal-contact-details.model';
import { RenameContactRequest } from '../requests/rename-contact.request';
import { ChangeContactDetailsRequest } from '../requests/change-contact-details.request';
import { AddContactRequest } from '../requests/add-contact.request';
import { MessageService } from "primeng/api";
import { of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class PersonalContactEffects {
  constructor(
    private actions$: Actions,
    private resource: PersonalContactsResource,
    private router: Router,
    private messageService: MessageService
  ) { }

  loadContacts$ = createEffect(() => this.actions$.pipe(
    ofType(PersonalContactActions.LoadContacts),
    exhaustMap((action: { nameSearchTerm: string | null }) => this.resource.getPersonalContacts(action.nameSearchTerm)
      .pipe(
        map(contacts => loadPersonalContactsSuccess({ data: contacts })),
        catchError(({ error }: HttpErrorResponse) => of(contactActionFail({ errorMessage: error.error })))
      ))
  ));

  deleteContact$ = createEffect(() => this.actions$.pipe(
    ofType(PersonalContactActions.DeleteContact),
    exhaustMap((action: { contactId: string }) => this.resource.deleteContact(action.contactId)
      .pipe(
        map(() => deleteContactSuccess({ deletedContactId: action.contactId })),
        catchError(({ error }: HttpErrorResponse) => of(contactActionFail({ errorMessage: error.error })))
      ))
  ));

  addContact$ = createEffect(() => this.actions$.pipe(
    ofType(PersonalContactActions.AddContact),
    exhaustMap((action: { request: AddContactRequest }) => this.resource.addContact(action.request)
      .pipe(
        map(contact => addContactSuccess({ contact })),
        catchError(({ error }: HttpErrorResponse) => of(contactActionFail({ errorMessage: error.error })))
      ))
  ));

  renameContact$ = createEffect(() => this.actions$.pipe(
    ofType(PersonalContactActions.RenameContact),
    exhaustMap((action: { id: string, request: RenameContactRequest }) => this.resource.renameContact(action.id, action.request)
      .pipe(
        map(updatedContact => renameContactSuccess({ updatedContact })),
        catchError(({ error }: HttpErrorResponse) => of(contactActionFail({ errorMessage: error.error })))
      ))
  ));

  changeContactDetails$ = createEffect(() => this.actions$.pipe(
    ofType(PersonalContactActions.ChangeContactDetails),
    exhaustMap((action: { id: string, request: ChangeContactDetailsRequest }) => this.resource.changeContactDetails(action.id, action.request)
      .pipe(
        map(updatedContact => changeContactDetailsSuccess({ updatedContact })),
        catchError(({ error }: HttpErrorResponse) => of(contactActionFail({ errorMessage: error.error })))
      ))
  ));

  loadContactDetails$ = createEffect(() => this.actions$.pipe(
    ofType(PersonalContactActions.LoadContactDetails),
    exhaustMap((action: { id: string }) => this.resource.getContactById(action.id)
      .pipe(
        map(contact => loadPersonalContactDetailsSuccess({ contact })),
        catchError(({ error }: HttpErrorResponse) => of(contactActionFail({ errorMessage: error.error })))
      ))
  ));

  addContactSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(PersonalContactActions.AddContactSuccess),
    tap((action: { contact: PersonalContactDetail }) => this.router.navigate(['contacts', action.contact.id])),
    catchError(({ error }: HttpErrorResponse) => of(contactActionFail({ errorMessage: error.error })))
  ), { dispatch: false });

  deleteContactSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(PersonalContactActions.DeleteContactSuccess),
    tap(() => this.router.navigate(['contacts'])),
    catchError(({ error }: HttpErrorResponse) => of(contactActionFail({ errorMessage: error.error })))
  ), { dispatch: false });

  contactActionFail$ = createEffect(() => this.actions$.pipe(
    ofType(PersonalContactActions.PersonalContactActionFail),
    tap((action: { errorMessage: string }) => this.messageService.add({ severity: 'error', summary: 'Error', detail: action.errorMessage })),
  ), { dispatch: false });
}