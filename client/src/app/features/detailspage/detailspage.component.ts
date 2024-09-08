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

  scrollTo(el: HTMLElement) {
    el.scrollIntoView();
  }

}
