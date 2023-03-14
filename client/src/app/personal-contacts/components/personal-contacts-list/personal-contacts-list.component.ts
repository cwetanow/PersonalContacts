import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PersonalContactSimple } from '../../models/personal-contact-simple.model';

@Component({
  selector: 'app-personal-contacts-list',
  templateUrl: './personal-contacts-list.component.html',
  styleUrls: ['./personal-contacts-list.component.scss']
})
export class PersonalContactsListComponent {

  @Input() contacts: PersonalContactSimple[];

  @Output() addContact = new EventEmitter<void>();

}
