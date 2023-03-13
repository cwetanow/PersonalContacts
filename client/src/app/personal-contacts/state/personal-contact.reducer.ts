import { createReducer, on } from "@ngrx/store";
import { loadPersonalContactsSuccess, deleteContactSuccess, addContactSuccess, loadPersonalContactDetailsSuccess, renameContactSuccess, changeContactDetails, changeContactDetailsSuccess } from './personal-contact.actions';

import { PersonalContactSimple } from '../models/personal-contact-simple.model';
import { PersonalContactDetail } from '../models/personal-contact-details.model';

export interface PersonalContactsState {
  contacts: PersonalContactSimple[],
  nameSearchTerm: string | null,
  selectedContact: PersonalContactDetail | null;
}

export const initialState: PersonalContactsState = {
  contacts: [],
  nameSearchTerm: null,
  selectedContact: null
}

export const personalContactsReducer = createReducer(initialState,
  on(loadPersonalContactsSuccess, (state, { data }) => ({ ...state, selectedContact: null, contacts: data })),
  on(deleteContactSuccess, (state, { deletedContactId }) => ({ ...state, selectedContact: null, contacts: state.contacts.filter(c => c.id !== deletedContactId) })),
  on(loadPersonalContactDetailsSuccess, (state, { contact }) => ({ ...state, selectedContact: contact })),
  on(changeContactDetailsSuccess, (state, { updatedContact }) => ({
    ...state,
    selectedContact: updatedContact,
    contacts: state.contacts.map(c => c.id === updatedContact.id ? Object.assign(new PersonalContactSimple(), updatedContact) : c)
  })),
  on(renameContactSuccess, (state, { updatedContact }) => ({
    ...state,
    contacts: state.contacts.map(c => c.id === updatedContact.id ? updatedContact : c)

  })),
  on(addContactSuccess, (state, { contact }) => ({ ...state, selectedContact: contact, contacts: [...state.contacts, Object.assign(new PersonalContactSimple(), contact)] }))
);