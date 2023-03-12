import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalContactsComponent } from './personal-contacts.component';
import { SharedModule } from '../shared/shared.module';
import { PersonalContactEffects } from './state/personal-contact.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [PersonalContactsComponent],
  providers: [
    PersonalContactEffects
  ]
})
export class PersonalContactsModule { }
