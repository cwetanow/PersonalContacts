import { createAction, props } from '@ngrx/store';
import { PersonalContactSimple } from '../models/personal-contact-simple.model';
import { ChangeContactRequest } from '../requests/change-contact.request';
import { PersonalContactDetail } from '../models/personal-contact-details.model';

export enum PersonalContactActions {
  LoadContacts = '[PersonalContact] Load Contacts',
  LoadContactsSuccess = '[PersonalContact] Load Contacts Success',

  DeleteContact = '[PersonalContact] Delete Contact',
  DeleteContactSuccess = '[PersonalContact] Delete Contact Success',

  AddContact = '[PersonalContact] Add Contact',
  AddContactSuccess = '[PersonalContact] Add Contact Success',

  LoadContactDetails = '[PersonalContact] Load Contact Details',
  LoadContactDetailsSuccess = '[PersonalContact] Load Contact Details Success',

  UpdateContact = '[PersonalContact] Update Contact',
  UpdateContactSuccess = '[PersonalContact] Update Contact Success',
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
  props<{ request: ChangeContactRequest }>()
);

export const addContactSuccess = createAction(
  PersonalContactActions.AddContactSuccess,
  props<{ contact: PersonalContactDetail }>()
);

export const updateContact = createAction(
  PersonalContactActions.UpdateContact,
  props<{ id: string, request: ChangeContactRequest }>()
);

export const updateContactSuccess = createAction(
  PersonalContactActions.UpdateContactSuccess,
  props<{ updatedContact: PersonalContactDetail }>()
);