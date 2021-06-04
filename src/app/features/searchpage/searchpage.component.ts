import { Component, OnInit } from '@angular/core';
import { PropertyList } from '@core/interfaces/property-list';
import { ApiService } from '@core/services/api.service';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss']
})
export class SearchpageComponent implements OnInit {
  public properties = null;
  public displayMode = "list";
  
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getProperties(60272)
    .then((data : PropertyList[] ) => {
      this.properties = data.filter(x => x.platforms.homeaway_property_id != null);
    });
  }

}
