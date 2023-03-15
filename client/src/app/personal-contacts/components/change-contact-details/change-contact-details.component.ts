import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonalContactDetail } from '../../models/personal-contact-details.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-change-contact-details',
  templateUrl: './change-contact-details.component.html',
  styleUrls: ['./change-contact-details.component.scss']
})
export class ChangeContactDetailsComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, public ref: DynamicDialogRef, private config: DynamicDialogConfig<PersonalContactDetail>) { }

  ngOnInit(): void {
    const contact = this.config.data!;
    console.log(typeof contact.dateOfBirth)
    this.form = this.formBuilder.group({
      dateOfBirth: [new Date(contact.dateOfBirth), Validators.required],
      address: this.formBuilder.group({
        street: [contact.address.street, Validators.required],
        city: [contact.address.city, Validators.required],
        zipCode: [contact.address.zipCode]
      }),
      phoneNumber: [contact.phoneNumber, Validators.compose([Validators.required, Validators.pattern(/^\+?\d{3,}/)])],
      iban: [contact.iban, [Validators.required, Validators.pattern(/^[A-Z]{2}/)]]
    })
  }

  save() {
    this.ref.close(this.form.value);
  }
}
