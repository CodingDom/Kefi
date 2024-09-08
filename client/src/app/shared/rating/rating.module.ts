import { NgModule } from '@angular/core';
import { RatingComponent } from './rating.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    RatingComponent
  ],
  exports: [
    RatingComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RatingModule { }
