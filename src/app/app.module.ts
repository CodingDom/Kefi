import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { SearchpageComponent } from '@features/searchpage/searchpage.component';
import { HomepageComponent } from '@features/homepage/homepage.component';
import { PropertyFilterComponent } from '@features/searchpage/components/property-filter/property-filter.component';
import { PropertyComponent } from '@features/searchpage/components/property/property.component';
import { DetailspageComponent } from '@features/detailspage/detailspage.component';
import { SafePipe } from '@core/pipes/safe.pipe';

// ********************** angular-modal-gallery *****************************
import 'hammerjs'; // Mandatory for angular-modal-gallery 3.x.x or greater (`npm i --save hammerjs`)
import 'mousetrap'; // Mandatory for angular-modal-gallery 3.x.x or greater (`npm i --save mousetrap`)
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { MapComponent } from './core/components/map/map.component';
import { FooterComponent } from './core/components/footer/footer.component'; // <----------------- angular-modal-gallery library import
// **************************************************************************

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchpageComponent,
    HomepageComponent,
    PropertyFilterComponent,
    PropertyComponent,
    DetailspageComponent,
    SafePipe,
    MapComponent,
    FooterComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatDatepickerModule, 
    MatFormFieldModule, 
    MatNativeDateModule,
    MatAutocompleteModule,
    GalleryModule.forRoot()
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
