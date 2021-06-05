import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PropertyList } from '@core/interfaces/property-list';
import { ApiService } from '@core/services/api.service';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss']
})
export class SearchpageComponent implements OnInit {
  private readonly defaultData = {
    bedrooms: '',
    propertyType: "",
    amenities: []
  };

  pageNumber : number = 1;
  pageNumbers : number[] = [1];
  pageNumberSet : number[] = this.pageNumbers;
  properties: PropertyList[] = null;
  propertyTypes: string[] = [];
  filteredProperties = null;
  filterOptions = this.formBuilder.group(this.defaultData);

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
        this.api.getProperties(params.locationId ?? 60272)
        .then((data : PropertyList[] ) => {
          this.filteredProperties = data.filter(x => x.platforms.homeaway_property_id != null).sort((a,b) => (b.rating ?? 0) - (a.rating ?? 0) );
          this.properties = this.filteredProperties;
          this.propertyTypes = this.properties.map(x => x.property_type).filter((x, i, self) => self.indexOf(x) == i).sort();
          this.numberOfRentals = this.filteredProperties.length.toString().split("");
          this.pageNumbers = Array(Math.ceil(this.filteredProperties.length/9)).fill(0).map((x,i)=>i+1);
          this.updatePageNumber(1);
        });
      }
    );

    this.filterOptions.valueChanges
      .subscribe(options => {
        console.log(options);
        this.filteredProperties = this.properties.filter(x => {
          let allowProperty = true;
          if (options.bedrooms > 0 && options.bedrooms != x.bedrooms) {
            allowProperty = false;
          }
          if (options.propertyType != "" && options.propertyType != x.property_type) {
            allowProperty = false;
          }
          return allowProperty;
        });
        this.numberOfRentals = this.filteredProperties.length.toString().split("");
        this.pageNumbers = Array(Math.ceil(this.filteredProperties.length/9)).fill(0).map((x,i)=>i+1);
        this.updatePageNumber(1);
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
}
