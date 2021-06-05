import { Injectable } from '@angular/core';
import { PropertyListQueryOptions } from '@core/interfaces/property-list';
import axios from 'axios';

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
    return axios.get(`${this.API_BASE_URL}/locations?location=${location}`)
    .then(resp => resp.data);
  }

  public getProperties(cityId: number, options?: PropertyListQueryOptions) {
    let extras = "";
    Object.keys(options).forEach(x => {
      extras = `${extras}&${x}=${options[x]}`;
    });
    return axios.get(`${this.API_BASE_URL}/properties?cityId=${cityId}${extras}`)
    .then(resp => resp.data.properties);
  }

  public getVrboPropertyDetails(propertyId: string) {
    return axios.get(`${this.API_BASE_URL}/vrbo/${propertyId}`)
    .then(resp => resp.data);
  }
}
