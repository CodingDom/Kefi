import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VrboPropertyDetails } from '@core/interfaces/vrbo-property-details';
import { ApiService } from '@core/services/api.service';
import { AccessibilityConfig, Image } from '@ks89/angular-modal-gallery';

@Component({
  selector: 'app-detailspage',
  templateUrl: './detailspage.component.html',
  styleUrls: ['./detailspage.component.scss']
})
export class DetailspageComponent implements OnInit {
  public details: VrboPropertyDetails;
  public map_url: string;
  public displayMode: string = "overview";
  public carouselImages : Image[] = [];

  constructor(private api: ApiService, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.api.getVrboPropertyDetails(id)
    .then((data: VrboPropertyDetails) => {
      this.details = data;
      this.map_url = `https://maps.google.com/maps?q=${data.listingReducer.geoCode.latitude},${data.listingReducer.geoCode.longitude}&hl=es;z=14&amp;output=embed`;
      this.carouselImages = data.listingReducer.images.map((x, i) => new Image(i, 
        {
          img: this.unicodeToChar(x.uri),
          description: x.caption
      }, 
      {
        img: this.unicodeToChar(x.uri),
        description: x.caption,
        title: x.caption,
        alt: x.altText
      }));
      console.log(this.carouselImages);
      console.log(data.listingReducer);      
    });
  }

  private unicodeToChar(text: string) : string {
    return text.replace(/\\u[\dA-F]{4}/gi, 
           function (match) {
                return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
           });
 }

}
