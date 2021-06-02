import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API_BASE_URL = "http://localhost:3000/api";

  constructor() { }

  public getLocations(location: string) {
    return axios.get(`${this.API_BASE_URL}/locations?location=${location}`);
  }

  public getProperties(cityId: number) {
    return axios.get(`${this.API_BASE_URL}/properties?cityId=${cityId}`);
  }

  public getVrboPropertyDetails(propertyId: string) {
    return axios.get(`${this.API_BASE_URL}/vrbo/${propertyId}`)
    .then(resp => resp.data);
  }
}
