import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, map, filter } from 'rxjs';
import { PersonalContactsState } from '../../state/personal-contact.reducer';
import { ChangeContactDetailsRequest } from '../../requests/change-contact-details.request';
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

    this.form = this.formBuilder.group({
      dateOfBirth: [contact.dateOfBirth, Validators.required],
      address: this.formBuilder.group({
        street: [contact.address.street, Validators.required],
        city: [contact.address.city, Validators.required],
        zipCode: [contact.address.zipCode]
      }),
      phoneNumber: [contact.phoneNumber, Validators.pattern(/^\d{10}$/)],
      iban: [contact.iban, Validators.pattern(/^[A-Z]{2}\d{2}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{2}$/)]
    })
  }

  save() {
    this.ref.close(this.form.value);
  }
}
