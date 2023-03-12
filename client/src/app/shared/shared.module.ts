import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table'

const primeModules = [
  TableModule
];

@NgModule({
  imports: [
    CommonModule,
    ...primeModules
  ],
  exports: [
    CommonModule,
    ...primeModules
  ]
})
export class SharedModule { }
