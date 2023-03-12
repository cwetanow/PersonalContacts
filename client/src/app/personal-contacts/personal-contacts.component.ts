import { Component, OnInit } from '@angular/core';
import { PersonalContactDetail } from './models/personal-contact-details.model';
import { PersonalContactSimple } from './models/personal-contact-simple.model';

@Component({
  selector: 'app-personal-contacts',
  templateUrl: './personal-contacts.component.html',
  styleUrls: ['./personal-contacts.component.scss']
})
export class PersonalContactsComponent implements OnInit {

  contacts: PersonalContactSimple[] = [{
    firstName: 'first',
    lastName: 'last',
    id: '1234',
    fullName: 'first last'
  }];

  constructor() { }

  ngOnInit() {
  }

}
