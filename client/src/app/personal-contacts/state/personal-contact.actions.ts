import { createAction, props } from '@ngrx/store';
import { PersonalContactSimple } from '../models/personal-contact-simple.model';
import { PersonalContactDetail } from '../models/personal-contact-details.model';
import { RenameContactRequest } from '../requests/rename-contact.request';
import { ChangeContactDetailsRequest } from '../requests/change-contact-details.request';
import { AddContactRequest } from '../requests/add-contact.request';

export enum PersonalContactActions {
  LoadContacts = '[PersonalContact] Load Contacts',
  LoadContactsSuccess = '[PersonalContact] Load Contacts Success',

  DeleteContact = '[PersonalContact] Delete Contact',
  DeleteContactSuccess = '[PersonalContact] Delete Contact Success',

  AddContact = '[PersonalContact] Add Contact',
  AddContactSuccess = '[PersonalContact] Add Contact Success',

  LoadContactDetails = '[PersonalContact] Load Contact Details',
  LoadContactDetailsSuccess = '[PersonalContact] Load Contact Details Success',

  RenameContact = '[PersonalContact] Rename Contact',
  RenameContactSuccess = '[PersonalContact] Rename Contact Success',

  ChangeContactDetails = '[PersonalContact] Change Contact Details',
  ChangeContactDetailsSuccess = '[PersonalContact] Change Contact Details Success',
}

export const loadPersonalContacts = createAction(
  PersonalContactActions.LoadContacts,
  props<{ nameSearchTerm: string | null }>()
);

export const loadPersonalContactsSuccess = createAction(
  PersonalContactActions.LoadContactsSuccess,
  props<{ data: PersonalContactSimple[] }>()
);

export const deleteContact = createAction(
  PersonalContactActions.DeleteContact,
  props<{ contactId: string }>()
);

export const deleteContactSuccess = createAction(
  PersonalContactActions.DeleteContactSuccess,
  props<{ deletedContactId: string }>()
);

export const loadPersonalContactDetails = createAction(
  PersonalContactActions.LoadContactDetails,
  props<{ id: string }>()
);

export const loadPersonalContactDetailsSuccess = createAction(
  PersonalContactActions.LoadContactDetailsSuccess,
  props<{ contact: PersonalContactDetail }>()
);

export const addContact = createAction(
  PersonalContactActions.AddContact,
  props<{ request: AddContactRequest }>()
);

export const addContactSuccess = createAction(
  PersonalContactActions.AddContactSuccess,
  props<{ contact: PersonalContactDetail }>()
);

export const renameContact = createAction(
  PersonalContactActions.RenameContact,
  props<{ id: string, request: RenameContactRequest }>()
);

export const renameContactSuccess = createAction(
  PersonalContactActions.RenameContactSuccess,
  props<{ updatedContact: PersonalContactSimple }>()
);

export const changeContactDetails = createAction(
  PersonalContactActions.ChangeContactDetails,
  props<{ id: string, request: ChangeContactDetailsRequest }>()
);

export const changeContactDetailsSuccess = createAction(
  PersonalContactActions.ChangeContactDetailsSuccess,
  props<{ updatedContact: PersonalContactDetail }>()
);