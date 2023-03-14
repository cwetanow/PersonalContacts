import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, filter, map, distinct, tap } from 'rxjs';
import { PersonalContactsState } from '../../state/personal-contact.reducer';
import { PersonalContactDetail } from '../../models/personal-contact-details.model';
import { ActivatedRoute, Router } from '@angular/router';
import { deleteContact, loadPersonalContactDetails, changeContactDetails } from '../../state/personal-contact.actions';
import { Address } from '../../models/address.model';
import { ConfirmationService } from 'primeng/api';
import { ChangeContactDetailsRequest } from '../../requests/change-contact-details.request';
import { DialogService } from 'primeng/dynamicdialog';
import { ChangeContactDetailsComponent } from '../change-contact-details/change-contact-details.component';

@Component({
  selector: 'app-personal-contact-details',
  templateUrl: './personal-contact-details.component.html',
  styleUrls: ['./personal-contact-details.component.scss']
})
export class PersonalContactDetailsComponent implements OnInit {

  contact$: Observable<PersonalContactDetail>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ personalContacts: PersonalContactsState }>,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService
  ) {
    this.contact$ = this.store.select(s => s.personalContacts.selectedContact)
      .pipe(
        filter(contact => !!contact),
        map(contact => contact!)
      );
  }

  ngOnInit() {
    this.route.params.pipe(
      map(params => params['id']),
      filter(id => !!id),
      distinct()
    )
      .subscribe(id => this.store.dispatch(loadPersonalContactDetails({ id })));
  }

  getAddressInfo(address: Address) {
    return `${address.street}, ${address.city} ${address.zipCode}`;
  }

  deleteContact(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want remove this contact?',
      accept: () => this.store.dispatch(deleteContact({ contactId: id }))
    });
  }

  changeDetails(contact: PersonalContactDetail) {
    this.dialogService.open(ChangeContactDetailsComponent, {
      header: 'Change Details',
      width: '60%',
      data: contact,
    })
      .onClose
      .pipe(filter(request => !!request))
      .subscribe((request: ChangeContactDetailsRequest) => this.store.dispatch(changeContactDetails({ id: contact.id, request })));
  }
}
