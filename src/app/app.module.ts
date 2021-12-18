import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { NavbarComponent } from '@core/components/navbar/navbar.component';
import { FooterComponent } from '@core/components/footer/footer.component';
import { SafePipe } from '@core/pipes/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SafePipe,
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
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
