import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API_BASE_URL = "http://localhost:3000/api";

  constructor() { }

  public getLocations(location: string) {
    location = location.trim();
    if (location == "") {
      location = "Orlando";
    }
    return axios.get(`${this.API_BASE_URL}/locations?location=${location}`)
    .then(resp => resp.data);
  }

  public getProperties(cityId: number) {
    return axios.get(`${this.API_BASE_URL}/properties?cityId=${cityId}`)
    .then(resp => resp.data.properties);
  }

  public getVrboPropertyDetails(propertyId: string) {
    return axios.get(`${this.API_BASE_URL}/vrbo/${propertyId}`)
    .then(resp => resp.data);
  }
}
