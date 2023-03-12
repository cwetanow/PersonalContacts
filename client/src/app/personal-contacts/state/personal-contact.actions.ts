import { createAction, props } from '@ngrx/store';
import { PersonalContactSimple } from '../models/personal-contact-simple.model';

export enum PersonalContactActions {
  LoadContacts = '[PersonalContact] Load',
  LoadContactsSuccess = '[PersonalContact] Load Success',
}

export const loadPersonalContacts = createAction(
  PersonalContactActions.LoadContacts,
  props<{ nameSearchTerm: string | null }>()
);

export const loadPersonalContactsSuccess = createAction(
  PersonalContactActions.LoadContactsSuccess,
  props<{ data: PersonalContactSimple[] }>()
);