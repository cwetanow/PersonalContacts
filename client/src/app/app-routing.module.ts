import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalContactsComponent } from './personal-contacts/personal-contacts.component';
import { PersonalContactDetailsComponent } from './personal-contacts/components/personal-contact-details/personal-contact-details.component';

const routes: Routes = [
  {
    path: 'contacts',
    children: [
      {
        path: '',
        component: PersonalContactsComponent
      },
      {
        path: ':id',
        component: PersonalContactDetailsComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: 'contacts',
    pathMatch: 'full'
  },
  {
    path: '*',
    redirectTo: 'contacts',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
