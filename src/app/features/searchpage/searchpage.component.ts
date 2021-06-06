import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Currency, PropertyList, PropertyListQueryOptions, RoomTypes } from '@core/interfaces/property-list';
import { ApiService } from '@core/services/api.service';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss']
})
export class SearchpageComponent implements OnInit {
  private readonly defaultData = {
    bathrooms: '',
    bedrooms: '',
    propertyType: ''
  };

  pageNumber : number = 1;
  pageNumbers : number[] = [1];
  pageNumberSet : number[] = this.pageNumbers;
  propertiesPerPage: number = 9;
  properties: PropertyList[] = null;
  propertyTypes: string[] = [];
  filteredProperties: PropertyList[] = null;
  filterOptions = this.formBuilder.group(this.defaultData);
  sortOrder: string = "0";

  displayMode = "grid";
  numberOfRentals = ["0"];  

  constructor(
    private api: ApiService, 
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.properties = null;
        const options: PropertyListQueryOptions = this.createQueryOptions(params);
        this.api.getProperties(params.locationId ?? 60272, options)
        .then((data : PropertyList[] ) => {          
          this.filteredProperties = data.filter(x => x.platforms.homeaway_property_id != null);
          this.sortBy(this.sortOrder);
          this.properties = this.filteredProperties;
          this.propertyTypes = this.properties.map(x => x.property_type).filter((x, i, self) => self.indexOf(x) == i).sort();
          this.resetFilters();
          this.numberOfRentals = this.filteredProperties.length.toString().split("");
          this.pageNumbers = Array(Math.ceil(this.filteredProperties.length/this.propertiesPerPage)).fill(0).map((x,i)=>i+1);
          this.updatePageNumber(1);
        });
      }
    );

    this.filterOptions.valueChanges
      .subscribe(options => {
        if (this.properties) {
          this.filteredProperties = this.properties.filter(x => {
            let allowProperty = true;
            if (options.bathrooms > 0 && options.bathrooms != x.bathrooms) {
              allowProperty = false;
            }
            if (options.bedrooms > 0 && options.bedrooms != x.bedrooms) {
              allowProperty = false;
            }
            if (options.propertyType != "" && options.propertyType != x.property_type) {
              allowProperty = false;
            }
            return allowProperty;
          });
          this.numberOfRentals = this.filteredProperties.length.toString().split("");
          this.pageNumbers = Array(Math.ceil(this.filteredProperties.length/this.propertiesPerPage)).fill(0).map((x,i)=>i+1);
          this.updatePageNumber(1);
        }
      });
  }

  resetFilters(): void {
    this.filterOptions.setValue(this.defaultData);
  }

  updatePageNumber(val) {    
    this.pageNumber = val;
    if (val < 5 || this.pageNumbers.length <= 9) {
      this.pageNumberSet = this.pageNumbers.slice(0, 9);
    } 
    else if (val > this.pageNumbers.length-5) {
      this.pageNumberSet = this.pageNumbers.slice(this.pageNumbers.length-9, this.pageNumbers.length);
    }
    else {
      this.pageNumberSet = this.pageNumbers.slice(val-5,val+4);
    }    
  }

  createQueryOptions(params: any) : PropertyListQueryOptions {
    const options : PropertyListQueryOptions = {};
    if (params.roomType && parseInt(params.roomType) > 0) {
      options.room_types = RoomTypes[parseInt(params.roomType)];
    }
    if (params.guests) {
      options.accommodates = parseInt(params.guests);
    }
    if (params.dateFrom && params.dateTo) {
      options.start_date = params.dateFrom;
      options.months = this.monthDiff(new Date(params.dateFrom), new Date(params.dateTo));
    }
    options.currency = Currency.USD;
    return options;
  }

  monthDiff(dateFrom: Date, dateTo: Date) {
    return dateTo.getMonth() - dateFrom.getMonth() + 
      (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
   }

   sortBy(val: string) {
     switch(val) {
       case "0": 
        this.filteredProperties.sort((a,b) => (b.rating ?? 0) - (a.rating ?? 0) );
       break;
       case "1":
        this.filteredProperties.sort((a,b) => (a.adr ?? 0) - (b.adr ?? 0));
       break;
       case "2":
        this.filteredProperties.sort((a,b) => (b.adr ?? 0) - (a.adr ?? 0));
        console.log("Works");
       break;
       case "3": 
        this.filteredProperties.sort((a,b) => (a.rating ?? 0) - (b.rating ?? 0) );
       break;
       default: 
        console.log("This one works tho...");
     }
     this.sortOrder = val;
   }
}
