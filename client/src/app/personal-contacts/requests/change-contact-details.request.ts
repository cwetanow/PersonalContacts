import { Address } from "../models/address.model";

export class ChangeContactDetailsRequest {
  dateOfBirth: Date;
  address: Address;
  phoneNumber: string;
  iban: string;
}
