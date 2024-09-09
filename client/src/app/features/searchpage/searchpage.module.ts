import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MapModule } from '@shared/map/map.module';
import { SearchpageComponent } from './searchpage.component';
import { PropertyFilterComponent } from './components/property-filter/property-filter.component';
import { PropertyComponent } from './components/property/property.component';
import { SearchpageRoutingModule } from './searchpage-routing.module';
import { RatingModule } from '@shared/rating/rating.module';
import { PaginationModule } from '@shared/pagination/pagination.module';

@NgModule({
  declarations: [    
    PropertyFilterComponent,
    PropertyComponent,
    SearchpageComponent
  ],
  imports: [
    MapModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    SearchpageRoutingModule,
    RatingModule
  ]
})
export class SearchpageModule { }