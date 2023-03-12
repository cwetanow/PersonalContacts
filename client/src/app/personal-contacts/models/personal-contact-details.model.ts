import { PersonalContactSimple } from './personal-contact-simple.model';
import { Address } from './address.model';

export class PersonalContactDetail extends PersonalContactSimple {
  dateOfBirth: Date;
  address: Address;
  phoneNumber: string;
  iban: string;
}