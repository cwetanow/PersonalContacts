import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { debounceTime, distinct, filter, Observable } from 'rxjs';
import { PersonalContactSimple } from './models/personal-contact-simple.model';
import { addContact, deleteContact, loadPersonalContacts } from './state/personal-contact.actions';
import { PersonalContactsState } from './state/personal-contact.reducer';
import { PersonalContactDetail } from './models/personal-contact-details.model';
import { ChangeContactRequest } from './requests/change-contact.request';

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
    private fb: FormBuilder
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
    this.contactFormOpened = true;
  }

  saveContact(request: ChangeContactRequest) {
    this.store.dispatch(addContact({ request }));
  }
}
