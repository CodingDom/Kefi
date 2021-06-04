import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyList } from '@core/interfaces/property-list';
import { ApiService } from '@core/services/api.service';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss']
})
export class SearchpageComponent implements OnInit {
  public pageNumber : number = 1;
  public pageNumbers : number[] = [1];
  public pageNumberSet : number[] = this.pageNumbers;
  public properties = null;
  public displayMode = "grid";
  public numberOfRentals = ["0"];
  constructor(
    private api: ApiService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.properties = null;
        this.api.getProperties(params.locationId ?? 60272)
        .then((data : PropertyList[] ) => {
          this.properties = data.filter(x => x.platforms.homeaway_property_id != null).sort((a,b) => (b.rating ?? 0) - (a.rating ?? 0) );
          this.numberOfRentals = this.properties.length.toString().split("");
          this.pageNumbers = Array(Math.ceil(this.properties.length/9)).fill(0).map((x,i)=>i+1);
          this.updatePageNumber(1);
        });
      }
    );
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
