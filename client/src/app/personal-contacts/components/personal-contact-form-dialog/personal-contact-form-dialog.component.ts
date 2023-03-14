import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddContactRequest } from '../../requests/add-contact.request';

@Component({
  selector: 'app-personal-contact-form-dialog',
  templateUrl: './personal-contact-form-dialog.component.html',
  styleUrls: ['./personal-contact-form-dialog.component.scss']
})
export class PersonalContactFormDialogComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private ref: DynamicDialogRef) { }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        zipCode: ['']
      }),
      phoneNumber: ['', Validators.compose([Validators.required, Validators.pattern(/^\+?\d{3,}/)])],
      iban: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}/)]]
    });

  }

  save() {
    this.ref.close(this.form.value);
  }

}
