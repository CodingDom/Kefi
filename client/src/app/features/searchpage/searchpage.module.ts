import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MapModule } from '@shared/app-map/map.module';
import { SearchpageComponent } from './searchpage.component';
import { PropertyFilterComponent } from './components/property-filter/property-filter.component';
import { PropertyComponent } from './components/property/property.component';
import { SearchpageRoutingModule } from './searchpage-routing.module';

@NgModule({
  declarations: [
    SearchpageComponent,
    PropertyFilterComponent,
    PropertyComponent
  ],
  imports: [
    MapModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SearchpageRoutingModule
  ]
})
export class SearchpageModule { }