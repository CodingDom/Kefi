import { Component, Input, OnInit } from '@angular/core';
import { PropertyList } from '@core/interfaces/property-list';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent {
  private _info = null;

  @Input()
  get info() { return this._info }
  set info(val) {
    this._info = val;
  }

  @Input() displayMode : string;

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
