import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, distinct, filter, Observable } from 'rxjs';
import { PersonalContactSimple } from './models/personal-contact-simple.model';
import { addContact, loadPersonalContacts } from './state/personal-contact.actions';
import { PersonalContactsState } from './state/personal-contact.reducer';
import { AddContactRequest } from './requests/add-contact.request';
import { DialogService } from 'primeng/dynamicdialog';
import { PersonalContactFormDialogComponent } from './components/personal-contact-form-dialog/personal-contact-form-dialog.component';

@Component({
  selector: 'app-personal-contacts',
  templateUrl: './personal-contacts.component.html',
  styleUrls: ['./personal-contacts.component.scss']
})
export class PersonalContactsComponent implements OnInit {
  searchForm: FormGroup;
  contacts$: Observable<PersonalContactSimple[]>;

  contactFormOpened: boolean;

  constructor(
    private store: Store<{ personalContacts: PersonalContactsState }>,
    private fb: FormBuilder,
    private dialogService: DialogService
  ) {
    this.contacts$ = this.store.select(s => s.personalContacts.contacts);
  }

  ngOnInit() {
    this.store.dispatch(loadPersonalContacts({ nameSearchTerm: null }));

    this.searchForm = this.fb.group({
      nameSearchTerm: ''
    });

    this.searchForm.controls['nameSearchTerm'].valueChanges
      .pipe(
        filter(value => value.length > 2),
        debounceTime(500),
        distinct()
      )
      .subscribe(value => this.store.dispatch(loadPersonalContacts({ nameSearchTerm: value })))
  }

  addContact() {
    this.dialogService.open(PersonalContactFormDialogComponent,
      {})
      .onClose
      .pipe(
        filter(request => !!request)
      )
      .subscribe(request => this.store.dispatch(addContact({ request })));
  }
}
