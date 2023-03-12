import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table'
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const angularModules = [
  CommonModule,
  HttpClientModule,
  ReactiveFormsModule,
  FormsModule,
]

const primeModules = [
  TableModule,
  InputTextModule
];

@NgModule({
  imports: [
    ...angularModules,
    ...primeModules
  ],
  exports: [
    ...angularModules,
    ...primeModules
  ]
})
export class SharedModule { }
