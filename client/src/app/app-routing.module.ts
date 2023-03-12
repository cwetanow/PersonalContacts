import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalContactsComponent } from './personal-contacts/personal-contacts.component';

const routes: Routes = [
  {
    path: 'contacts',
    component: PersonalContactsComponent
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
