import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  private _info = null;

  @Input()
  get info() { return this._info}
  set info(val) {
    this._info = val;
  }

  constructor() { }

  ngOnInit(): void {
    
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

}
