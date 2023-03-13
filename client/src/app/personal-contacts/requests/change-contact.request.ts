import { Address } from "../models/address.model";

export class ChangeContactRequest {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  address: Address;
  phoneNumber: string;
  iban: string;
}