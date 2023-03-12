import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { PersonalContactSimple } from './models/personal-contact-simple.model';
import { loadPersonalContacts } from './state/personal-contact.actions';
import { PersonalContactsState } from './state/personal-contact.reducer';

@Component({
  selector: 'app-personal-contacts',
  templateUrl: './personal-contacts.component.html',
  styleUrls: ['./personal-contacts.component.scss']
})
export class PersonalContactsComponent implements OnInit {

  contacts$: Observable<PersonalContactSimple[]>;

  constructor(private store: Store<{ personalContacts: PersonalContactsState }>) {
    this.contacts$ = this.store.select(s => s.personalContacts.contacts);
  }

  ngOnInit() {
    this.store.dispatch(loadPersonalContacts());
  }
}
