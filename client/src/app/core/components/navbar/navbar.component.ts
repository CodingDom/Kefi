import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '@core/services/api.service';
import { from, Observable } from 'rxjs';
import { tap, startWith, debounceTime, distinctUntilChanged, switchMap, map, take, filter } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private readonly DARK_MODE_KEY = 'IS_DARK_MODE';
  private readonly defaultData = {
    location: "",
    locationId: -1,
    roomType: '0',
    dateTo: '',
    dateFrom: '',
    bedrooms: null,
    guests: null
  };
  searchForm = this.formBuilder.group(this.defaultData);
  queryParams: any = {};

  filteredOptions: Observable<any[]>;
  lastOption;
  @ViewChild(MatAutocompleteTrigger) trigger;

  openSearch: false;
  isDarkMode: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.filteredOptions = this.searchForm.get("location").valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
        return this.filter(val || '')
      })
    )

    this.isDarkMode = localStorage.getItem(this.DARK_MODE_KEY) === 'true';
    if (this.isDarkMode) {
      document.body.classList.add('theme-dark');
    } else {
      document.body.classList.remove('theme-dark');
    }
  }

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      if (event.url.indexOf("search") == -1)
        return;
      this.populateFields();
    });
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
    this.openSearch = val;
  }

  toggleTheme() {
    document.body.classList.toggle('theme-dark');
    this.isDarkMode = document.body.classList.contains('theme-dark');
    localStorage.setItem(this.DARK_MODE_KEY, this.isDarkMode.toString());
  }

  filter(val): Observable<any[]> {
    // call the service which makes the http-request
    if (typeof (val) == "object") {
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
    const queryParams: any = {};
    const data = this.searchForm.value;
    if (data.location.trim() != "") {
      queryParams.location = data.location;
    }
    if (data.locationId > -1) {
      queryParams.locationId = data.locationId;
    }
    if (data.roomType > 0) {
      queryParams.roomType = data.roomType;
    }
    if (data.dateFrom && data.dateTo) {
      queryParams.dateFrom = data.dateFrom.toISOString().split("T")[0];
      queryParams.dateTo = data.dateTo.toISOString().split("T")[0];
    }
    if (data.bedrooms) {
      queryParams.bedrooms = data.bedrooms;
    }
    if (data.guests) {
      queryParams.guests = data.guests;
    }
    this.queryParams = queryParams;
    this.toggleSearchWidget(false);
    this.router.navigate(["/search"], { queryParams });
  }

  populateFields() {
    this.route.queryParams.pipe(take(1)).subscribe(params => {
      if (params.location && params.locationId) {
        this.searchForm.get('location').setValue(params.location);
        this.searchForm.get('locationId').setValue(params.locationId);
      }
      else {
        this.searchForm.get('location').setValue(this.defaultData.location);
        this.searchForm.get('locationId').setValue(this.defaultData.locationId);
      }
      if (params.dateFrom) {
        this.searchForm.get("dateFrom").setValue(new Date(params.dateFrom));
      }
      else {
        this.searchForm.get("dateFrom").setValue(this.defaultData.dateFrom);
      }
      if (params.dateTo) {
        this.searchForm.get("dateTo").setValue(new Date(params.dateTo));
      }
      else {
        this.searchForm.get("dateTo").setValue(this.defaultData.dateTo);
      }
      if (params.roomType) {
        this.searchForm.get("roomType").setValue(params.roomType);
      }
      else {
        this.searchForm.get("roomType").setValue(this.defaultData.roomType);
      }
      if (params.bedrooms) {
        this.searchForm.get("bedrooms").setValue(params.bedrooms);
      }
      else {
        this.searchForm.get("bedrooms").setValue(this.defaultData.bedrooms);
      }
      if (params.guests) {
        this.searchForm.get("guests").setValue(params.guests);
      }
      else {
        this.searchForm.get("guests").setValue(this.defaultData.guests);
      }
    });
  }

}
