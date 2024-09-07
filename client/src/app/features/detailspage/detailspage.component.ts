import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AirdnaPropertyPayload } from '@core/interfaces/airdna-property-details';
import { ApiService } from '@core/services/api.service';
import { Image } from '@ks89/angular-modal-gallery';

@Component({
  selector: 'app-detailspage',
  templateUrl: './detailspage.component.html',
  styleUrls: ['./detailspage.component.scss']
})
export class DetailspageComponent implements OnInit {
  payload: AirdnaPropertyPayload;
  map_url: string;
  displayMode: string = "overview";
  carouselImages: Image[] = [];
  availability = null;
  openQuote: boolean = false;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private metaTagService: Meta
  ) { }

  ngOnInit(): void {
    this.metaTagService.updateTag({
      name: 'description',
      content: "Take a look at this beautiful vacation home through Kefi Rentals."
    });
    const id = this.route.snapshot.paramMap.get('id');
    this.api.getAirdnaPropertyDetails(id)
      .then((data) => {
        this.payload = data.payload;
        this.map_url = `https://maps.google.com/maps?q=${this.payload.location.lat},${this.payload.location.lng}&hl=es;z=14&amp;output=embed`;
        this.carouselImages = this.payload.details.images.map((url, i) => new Image(i,
          {
            img: this.unicodeToChar(url),
          },
          {
            img: this.unicodeToChar(url),
          }));

      })
      .catch(() => {
        this.router.navigate(["/404"], { replaceUrl: true });
      });
  }

  private unicodeToChar(text: string): string {
    return text.replace(/\\u[\dA-F]{4}/gi,
      function (match) {
        return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
      });
  }

  private starsOutput(firstStar, secondStar, thirdStar, fourthStar, fifthStar): string {
    return ('' +
      '<i class="' + firstStar + '"></i>' +
      '<i class="' + secondStar + '"></i>' +
      '<i class="' + thirdStar + '"></i>' +
      '<i class="' + fourthStar + '"></i>' +
      '<i class="' + fifthStar + '"></i>');
  }

  public starrating(dataRating: number): string {
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
