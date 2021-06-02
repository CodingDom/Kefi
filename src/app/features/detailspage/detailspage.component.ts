import { Component, OnInit } from '@angular/core';
import { VrboPropertyDetails } from '@core/interfaces/vrbo-property-details';
import { ApiService } from '@core/services/api.service';

@Component({
  selector: 'app-detailspage',
  templateUrl: './detailspage.component.html',
  styleUrls: ['./detailspage.component.scss']
})
export class DetailspageComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getVrboPropertyDetails("7868453ha")
    .then((data: VrboPropertyDetails) => {
      console.log(data);
    });
  }

}
