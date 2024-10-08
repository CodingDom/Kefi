import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapModule } from '@shared/map/map.module';
import { DetailspageComponent } from '@features/detailspage/detailspage.component';

// ********************** angular-modal-gallery *****************************
import 'hammerjs'; // Mandatory for angular-modal-gallery 3.x.x or greater (`npm i --save hammerjs`)
import 'mousetrap'; // Mandatory for angular-modal-gallery 3.x.x or greater (`npm i --save mousetrap`)
import { GalleryModule } from '@ks89/angular-modal-gallery'; // <----------------- angular-modal-gallery library import
import { DetailspageRoutingModule } from './detailspage-routing.module';
import { RatingModule } from '@shared/rating/rating.module';
import { PaginationModule } from '@shared/pagination/pagination.module';
// **************************************************************************

@NgModule({
  declarations: [
    DetailspageComponent,
  ],
  imports: [
    GalleryModule.forRoot(),
    MapModule,
    CommonModule,
    DetailspageRoutingModule,
    PaginationModule,
    RatingModule
  ]
})
export class DetailsModule { }
