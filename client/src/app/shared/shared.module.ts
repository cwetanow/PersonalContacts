import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const primeModules = [];

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    ...primeModules
  ]
})
export class SharedModule { }
