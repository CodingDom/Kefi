import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '@core/services/api.service';
import { from, Observable } from 'rxjs';
import { tap, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  searchForm = this.formBuilder.group({
    location: "",
    locationId: -1,
    roomType: '0',
    dateTo: '',
    dateFrom: ''
  });

  filteredOptions: Observable<any[]>;
  lastOption;
  @ViewChild(MatAutocompleteTrigger) trigger;

  open_search: false;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService
    ) { 
      this.filteredOptions = this.searchForm.get("location").valueChanges.pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(val => {
              return this.filter(val || '')
         }) 
      )
    }

  ngAfterViewInit() {
      this.trigger.panelClosingActions
        .subscribe(e => {
          if (!(e && e.source)) {
            this.searchForm.get("location").setValue('');
            this.trigger.closePanel();
          } 
        });
    }

  toggleSearchWidget(val) {
    this.open_search = val;
  }

  filter(val): Observable<any[]> {
    // call the service which makes the http-request
    if (typeof(val) == "object") {
      val = val.name;
    }
    return from(this.api.getLocations(val))
     .pipe(
       map(response => response.items)
     )
   }  

   getSelectedCity(e) {
    this.searchForm.get("locationId").setValue(e.id);
   }

  onSubmit() {
    console.log(this.searchForm.value);
  }

}
