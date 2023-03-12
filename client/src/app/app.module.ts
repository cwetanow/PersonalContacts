import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonalContactsModule } from './personal-contacts/personal-contacts.module';
import { SharedModule } from './shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { personalContactsReducer } from './personal-contacts/state/personal-contact.reducer';
import { PersonalContactEffects } from './personal-contacts/state/personal-contact.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PersonalContactsModule,
    SharedModule,
    StoreModule.forRoot({ personalContacts: personalContactsReducer }),
    EffectsModule.forRoot([PersonalContactEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
