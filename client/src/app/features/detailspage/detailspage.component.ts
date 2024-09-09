import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AirdnaPropertyPayload } from '@core/interfaces/airdna-property-details';
import { ApiService } from '@core/services/api.service';
import { Image } from '@ks89/angular-modal-gallery';
import * as seedrandom from 'seedrandom';
import MockRatings from './mock/mock-ratings'

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

  reviews: any[];
  ratings: number[];
  readonly reviewsPerPage = 5;
  pageNumber = 1;

  private cachedReviews: { [key: number]: any } = {};

  propertyId: string;
  rng: () => number;  

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
    this.propertyId = this.route.snapshot.paramMap.get('id');
    this.rng = seedrandom(this.propertyId);
    this.api.getAirdnaPropertyDetails(this.propertyId)
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

        this.ratings = this.generateRatings();
        this.getReviewers(1);
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

  generateRatings(): number[] {
    const { details: { rating, reviews } } = this.payload;
    const totalSum = Math.round(rating * reviews);
    let ratings = Array(reviews).fill(0);

    // Fill the array with random integers between 0 and 5 using the seeded random generator
    for (let i = 0; i < reviews; i++) {
      ratings[i] = Math.floor(this.rng() * 6);
    }

    let currentSum = ratings.reduce((sum, rating) => sum + rating, 0);

    // Adjust the ratings to match the property's average rating
    let index = 0;
    while (currentSum !== totalSum) {
      if (currentSum < totalSum && ratings[index] < 5) {
        ratings[index]++;
        currentSum++;
      } else if (currentSum > totalSum && ratings[index] > 0) {
        ratings[index]--;
        currentSum--;
      }
      index = (index + 1) % reviews;
    }

    return ratings;
  }

  updateReviews(page: number) {
    this.getReviewers(page);
  }

  private getReviewers(page: number) {
    if (this.cachedReviews[page]) {
      this.reviews = this.cachedReviews[page];
      return;
    }

    this.api.getRandomUsers(page, Math.min(this.payload.details.reviews, this.reviewsPerPage), this.propertyId)
      .then((data) => {
        this.reviews = data.results.map((user, index) => {
          const rating = this.ratings[index * page] ?? 0;
          return {
            name: `${user.name.first} ${user.name.last}`,
            image: user.picture.thumbnail,
            rating: rating,
            createdDate: user.registered.date,
            ...this.generateReviewContent(rating)
          }
        });

        this.cachedReviews[page] = this.reviews;
      })
  }

  private generateReviewContent(rating: number): { headline: string, description: string } {
    const feedbackList = MockRatings[Math.floor(rating)] ?? MockRatings[0];
    const randomIndex = Math.floor(this.rng() * feedbackList.length);
    return feedbackList[randomIndex];
  }
}
