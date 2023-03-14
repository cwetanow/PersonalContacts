import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalContactsComponent } from './personal-contacts.component';
import { SharedModule } from '../shared/shared.module';
import { PersonalContactEffects } from './state/personal-contact.effects';
import { PersonalContactFormDialogComponent } from './components/personal-contact-form-dialog/personal-contact-form-dialog.component';
import { PersonalContactDetailsComponent } from './components/personal-contact-details/personal-contact-details.component';
import { RouterModule } from '@angular/router';
import { RenameContactDialogComponent } from './components/rename-contact-dialog/rename-contact-dialog.component';
import { ChangeContactDetailsComponent } from './components/change-contact-details/change-contact-details.component';
import { PersonalContactsListComponent } from './components/personal-contacts-list/personal-contacts-list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    PersonalContactsComponent,
    PersonalContactFormDialogComponent,
    PersonalContactDetailsComponent,
    RenameContactDialogComponent,
    ChangeContactDetailsComponent,
    PersonalContactsListComponent
  ],
  providers: [
    PersonalContactEffects
  ]
})
export class PersonalContactsModule { }
