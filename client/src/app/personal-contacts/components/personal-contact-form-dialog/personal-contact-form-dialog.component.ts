import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonalContactDetail } from '../../models/personal-contact-details.model';

@Component({
  selector: 'app-personal-contact-form-dialog',
  templateUrl: './personal-contact-form-dialog.component.html',
  styleUrls: ['./personal-contact-form-dialog.component.scss']
})
export class PersonalContactFormDialogComponent implements OnInit {
  form: FormGroup;
  model: PersonalContactDetail;

  @Input() display = false;

  @Output() saveForm = new EventEmitter<PersonalContactDetail>();

  constructor(private fb: FormBuilder) {

  }

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
      phoneNumber: ['', Validators.pattern(/^\d{10}$/)],
      iban: ['', Validators.pattern(/^[A-Z]{2}\d{2}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{2}$/)]
    });

  }

  save() {
    this.saveForm.emit(this.model);
  }

}
