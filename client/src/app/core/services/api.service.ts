import { Injectable } from '@angular/core';
import { PropertyList, PropertyListQueryOptions } from '@core/interfaces/property-list';
import { TravelNews } from '@core/interfaces/travel-news';
import { VrboPropertyDetails } from '@core/interfaces/vrbo-property-details';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API_BASE_URL = "https://kefi-api.herokuapp.com/api";//"http://localhost:3000/api";

  constructor() { }

  public getLocations(location: string) {
    location = location.trim();
    if (location == "") {
      location = "Orlando";
    }
    return fetch(`${this.API_BASE_URL}/locations?location=${location}`)
    .then(resp => resp.json());
  }

  public getProperties(cityId: number, options?: PropertyListQueryOptions) : Promise<PropertyList[]> {
    let extras = "";
    Object.keys(options).forEach(x => {
      extras = `${extras}&${x}=${options[x]}`;
    });
    return fetch(`${this.API_BASE_URL}/properties?cityId=${cityId}${extras}`)
    .then(resp => resp.json())
    .then(data => data.properties);
  }

  public getVrboPropertyDetails(propertyId: string) : Promise<VrboPropertyDetails> {
    return fetch(`${this.API_BASE_URL}/vrbo/${propertyId}`)
    .then(resp => resp.json());
  }

  public getTravelNews() : Promise<TravelNews[]> {
    return fetch(`${this.API_BASE_URL}/travel-news`)
    .then(resp => resp.json());
  }
}
