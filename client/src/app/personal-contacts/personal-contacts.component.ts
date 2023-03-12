import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { debounceTime, filter, Observable } from 'rxjs';
import { PersonalContactSimple } from './models/personal-contact-simple.model';
import { deleteContact, loadPersonalContacts } from './state/personal-contact.actions';
import { PersonalContactsState } from './state/personal-contact.reducer';

@Component({
  selector: 'app-personal-contacts',
  templateUrl: './personal-contacts.component.html',
  styleUrls: ['./personal-contacts.component.scss']
})
export class PersonalContactsComponent implements OnInit {
  searchForm: FormGroup;
  contacts$: Observable<PersonalContactSimple[]>;

  constructor(
    private store: Store<{ personalContacts: PersonalContactsState }>,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService) {
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
        debounceTime(500)
      )
      .subscribe(value => this.store.dispatch(loadPersonalContacts({ nameSearchTerm: value })))
  }

  deleteContact(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want remove this contact?',
      accept: () => {
        this.store.dispatch(deleteContact({ contactId: id }));
      }
    });
  }
}
