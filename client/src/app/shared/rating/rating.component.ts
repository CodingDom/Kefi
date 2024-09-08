import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() rating: number;

  ratingIcons: string[];

  constructor() { }

  ngOnInit(): void {
    this.ratingIcons = this.getRatingIcons();
  }

  private getRatingIcons(): string[] {
    const rating = isNaN(this.rating) ? 0 : this.rating/2;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.25 && rating % 1 < 0.75 ? 'fa fa-star-half-alt' : '';
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const starsArray = Array(fullStars).fill('fa fa-star');
    if (halfStar) starsArray.push(halfStar);
    starsArray.push(...Array(emptyStars).fill('far fa-star'));

    return starsArray;
  }
}
