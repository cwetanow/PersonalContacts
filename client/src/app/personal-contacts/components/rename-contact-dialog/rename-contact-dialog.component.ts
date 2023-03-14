import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { RenameContactRequest } from '../../requests/rename-contact.request';

@Component({
  selector: 'app-rename-contact-dialog',
  templateUrl: './rename-contact-dialog.component.html',
  styleUrls: ['./rename-contact-dialog.component.scss']
})
export class RenameContactDialogComponent {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private ref: DynamicDialogRef, private config: DynamicDialogConfig<RenameContactRequest>) { }

  ngOnInit() {
    const request = this.config.data!;

    this.form = this.formBuilder.group({
      firstName: [request.firstName, Validators.required],
      lastName: [request.lastName, Validators.required],
    });
  }

  save() {
    this.ref.close(this.form.value);
  }

}
