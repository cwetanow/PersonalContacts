import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalContactsComponent } from './personal-contacts.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [PersonalContactsComponent]
})
export class PersonalContactsModule { }
