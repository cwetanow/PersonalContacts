import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, map, filter } from 'rxjs';
import { PersonalContactsState } from '../../state/personal-contact.reducer';
import { ChangeContactDetailsRequest } from '../../requests/change-contact-details.request';
import { PersonalContactDetail } from '../../models/personal-contact-details.model';

@Component({
  selector: 'app-change-contact-details',
  templateUrl: './change-contact-details.component.html',
  styleUrls: ['./change-contact-details.component.scss']
})
export class ChangeContactDetailsComponent implements OnInit {

  form: FormGroup;

  @Input() display = false;
  @Input() contact: PersonalContactDetail;

  @Output() saveForm = new EventEmitter<ChangeContactDetailsRequest>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      dateOfBirth: [this.contact.dateOfBirth, Validators.required],
      address: this.formBuilder.group({
        street: [this.contact.address.street, Validators.required],
        city: [this.contact.address.city, Validators.required],
        zipCode: [this.contact.address.zipCode]
      }),
      phoneNumber: [this.contact.phoneNumber, Validators.pattern(/^\d{10}$/)],
      iban: [this.contact.iban, Validators.pattern(/^[A-Z]{2}\d{2}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{2}$/)]
    })
  }

  save() {
    this.saveForm.emit(this.form.value as ChangeContactDetailsRequest);
  }

}
