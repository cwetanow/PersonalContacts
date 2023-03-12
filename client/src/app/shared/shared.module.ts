import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table'
import { HttpClientModule } from '@angular/common/http';

const primeModules = [
  TableModule
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ...primeModules
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    ...primeModules
  ]
})
export class SharedModule { }
