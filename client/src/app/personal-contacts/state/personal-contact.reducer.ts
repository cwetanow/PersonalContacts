import { createReducer, on, Action } from "@ngrx/store";
import { loadPersonalContacts, loadPersonalContactsSuccess } from './personal-contact.actions'

import { PersonalContactSimple } from '../models/personal-contact-simple.model';
import { PersonalContactDetail } from '../models/personal-contact-details.model';

export interface PersonalContactsState {
  contacts: PersonalContactSimple[],
  selectedContact: PersonalContactDetail | null;
}

export const initialState: PersonalContactsState = {
  contacts: [],
  selectedContact: null
}

export const personalContactsReducer = createReducer(initialState,
  on(loadPersonalContactsSuccess, (state, { data }) => ({ selectedContact: null, contacts: data }))
);