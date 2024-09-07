import { Component, Input, OnInit } from '@angular/core';
import { PropertyList } from '@core/interfaces/property-list';

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

  @Input() displayMode : string;

  starsObject = {
    fiveStars: this.starsOutput('fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star'),
    fourHalfStars: this.starsOutput('fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star-half-alt'),
    fourStars: this.starsOutput('fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star', 'far fa-star'),
    threeHalfStars: this.starsOutput('fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star-half-alt', 'far fa-star'),
    threeStars: this.starsOutput('fa fa-star', 'fa fa-star', 'fa fa-star', 'far fa-star', 'far fa-star'),
    twoHalfStars: this.starsOutput('fa fa-star', 'fa fa-star', 'fa fa-star-half-alt', 'far fa-star', 'far fa-star'),
    twoStars: this.starsOutput('fa fa-star', 'fa fa-star', 'far fa-star', 'far fa-star', 'far fa-star'),
    oneHalfStar: this.starsOutput('fa fa-star', 'fa fa-star-half-alt', 'far fa-star', 'far fa-star', 'far fa-star'),
    oneStar: this.starsOutput('fa fa-star', 'far fa-star', 'far fa-star', 'far fa-star', 'far fa-star'),
    noStars: this.starsOutput('far fa-star', 'far fa-star', 'far fa-star', 'far fa-star', 'far fa-star')
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

  public starrating(dataRating: number) : string {
    dataRating = (dataRating/10)*5;

    // Rules
    if (dataRating >= 4.75) {
        return this.starsObject.fiveStars;
    } else if (dataRating >= 4.25) {
        return this.starsObject.fourHalfStars;
    } else if (dataRating >= 3.75) {
        return this.starsObject.fourStars;
    } else if (dataRating >= 3.25) {
        return this.starsObject.threeHalfStars;
    } else if (dataRating >= 2.75) {
        return this.starsObject.threeStars;
    } else if (dataRating >= 2.25) {
        return this.starsObject.twoHalfStars;
    } else if (dataRating >= 1.75) {
        return this.starsObject.twoStars;
    } else if (dataRating >= 1.25) {
        return this.starsObject.oneHalfStar;
    } else if (dataRating > 0) {
        return this.starsObject.oneStar;
    } else {
        return this.starsObject.noStars;
    }
  }

  public getPropertyId(property: PropertyList): string | number {
    if (property.platforms.airbnb_property_id) {
      return property.airbnb_property_id;
    } else if (property.platforms.homeaway_property_id) {
      return property.homeaway_property_id;
    } else if (property.m_homeaway_property_id) {
      return property.m_homeaway_property_id;
    }

    return property.id;
  }

}
