import { Address } from './address.model';

export class PersonalContactDetail {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  dateOfBirth: Date;
  address: Address;
  phoneNumber: string;
  iban: string;
}