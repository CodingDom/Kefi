import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VrboPropertyDetails } from '@core/interfaces/vrbo-property-details';
import { ApiService } from '@core/services/api.service';

@Component({
  selector: 'app-detailspage',
  templateUrl: './detailspage.component.html',
  styleUrls: ['./detailspage.component.scss']
})
export class DetailspageComponent implements OnInit {
  public details: VrboPropertyDetails;
  public map_url: string;

  constructor(private api: ApiService, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.api.getVrboPropertyDetails(id)
    .then((data: VrboPropertyDetails) => {
      this.details = data;
      this.map_url = `https://maps.google.com/maps?q=${data.listingReducer.geoCode.latitude},${data.listingReducer.geoCode.longitude}&hl=es;z=14&amp;output=embed`;
      console.log(data.listingReducer);      
    });
  }

}
