import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table'
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';

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
  ConfirmDialogModule
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
    ConfirmationService
  ]
})
export class SharedModule { }
