import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { SearchpageComponent } from '@features/searchpage/searchpage.component';
import { HomepageComponent } from './features/homepage/homepage.component';
import { PropertyFilterComponent } from './features/searchpage/components/property-filter/property-filter.component';
import { PropertyComponent } from './features/searchpage/components/property/property.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchpageComponent,
    HomepageComponent,
    PropertyFilterComponent,
    PropertyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatDatepickerModule, 
    MatFormFieldModule, 
    MatNativeDateModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
