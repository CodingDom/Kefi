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
  details: VrboPropertyDetails;
  map_url: string;
  displayMode: string = "overview";
  carouselImages : Image[] = [];
  availability = null;
  openQuote: boolean = false;

  constructor(private api: ApiService, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.api.getVrboPropertyDetails(id)
    .then((data) => {
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
      
    console.log(this.details.reviewsReducer.reviews);
    });
  }

  private unicodeToChar(text: string) : string {
    return text.replace(/\\u[\dA-F]{4}/gi, 
           function (match) {
                return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
           });
 }

 private starsOutput(firstStar, secondStar, thirdStar, fourthStar, fifthStar) : string {
  return ('' +
      '<i class="' + firstStar + '"></i>' +
      '<i class="' + secondStar + '"></i>' +
      '<i class="' + thirdStar + '"></i>' +
      '<i class="' + fourthStar + '"></i>' +
      '<i class="' + fifthStar + '"></i>');
}

public starrating(dataRating: Number) : string {
  const fiveStars = this.starsOutput('fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star');

  const fourHalfStars = this.starsOutput('fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star-half-alt');
  const fourStars = this.starsOutput('fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star', 'far fa-star');

  const threeHalfStars = this.starsOutput('fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star-half-alt', 'far fa-star');
  const threeStars = this.starsOutput('fa fa-star', 'fa fa-star', 'fa fa-star', 'far fa-star', 'far fa-star');

  const twoHalfStars = this.starsOutput('fa fa-star', 'fa fa-star', 'fa fa-star-half-alt', 'far fa-star', 'far fa-star');
  const twoStars = this.starsOutput('fa fa-star', 'fa fa-star', 'far fa-star', 'far fa-star', 'far fa-star');

  const oneHalfStar = this.starsOutput('fa fa-star', 'fa fa-star-half-alt', 'far fa-star', 'far fa-star', 'far fa-star');
  const oneStar = this.starsOutput('fa fa-star', 'far fa-star', 'far fa-star', 'far fa-star', 'far fa-star');

  const noStars = this.starsOutput('far fa-star', 'far fa-star', 'far fa-star', 'far fa-star', 'far fa-star');

  // Rules
  if (dataRating >= 4.75) {
      return fiveStars;
  } else if (dataRating >= 4.25) {
      return fourHalfStars;
  } else if (dataRating >= 3.75) {
      return fourStars;
  } else if (dataRating >= 3.25) {
      return threeHalfStars;
  } else if (dataRating >= 2.75) {
      return threeStars;
  } else if (dataRating >= 2.25) {
      return twoHalfStars;
  } else if (dataRating >= 1.75) {
      return twoStars;
  } else if (dataRating >= 1.25) {
      return oneHalfStar;
  } else if (dataRating > 0) {
      return oneStar;
  } else {
      return noStars;
  }
}

scrollTo(el: HTMLElement) {
  el.scrollIntoView();
}

}
