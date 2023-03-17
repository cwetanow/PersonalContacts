import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table'
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { MenubarModule } from 'primeng/menubar';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

const angularModules = [
  CommonModule,
  HttpClientModule,
  ReactiveFormsModule,
  FormsModule,
]

const primeModules = [
  TableModule,
  InputTextModule,
  ButtonModule,
  ConfirmDialogModule,
  DialogModule,
  CalendarModule,
  CardModule,
  DynamicDialogModule,
  MenubarModule,
  ToastModule
];

@NgModule({
  imports: [
    ...angularModules,
    ...primeModules
  ],
  exports: [
    ...angularModules,
    ...primeModules
  ],
  providers: [
    ConfirmationService,
    DialogService,
    MessageService
  ]
})
export class SharedModule { }
