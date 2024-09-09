import { Component, AfterViewInit, Input } from '@angular/core';
import { PropertyList } from '@core/interfaces/property-list';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  private map;
  private markers = [];

  @Input()
  get properties() : PropertyList[] {
    return this._properties;
  }
  set properties(val) {
    this._properties = val;
    if (this.map != null) {
      this.createMarkers();
    }
  }

  @Input() popUp: boolean;

  private _properties = null;

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [this.properties[0].latitude, this.properties[0].longitude],
      zoom: 13
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 8,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    this.createMarkers();
  }

  createMarkers() {
    if (this.markers.length > 0) {
      this.markers.forEach(x => {
        this.map.removeLayer(x);
      });
      this.markers = [];
    }

    for (let i = 0; i < this.properties.length; i++) {
      const info = this.properties[i];
      const marker = L.marker(
        [info.latitude, info.longitude], 
        {icon: new L.icon({iconUrl: "assets/images/marker-icon.png", iconSize: [25, 41], iconAnchor: [12, 41]})}
        );
        this.markers.push(marker);
        if (this.popUp) {          
          marker.addTo(this.map)
              .bindPopup(`<div style="width:150px">
              <div style="height:66px;"></div>
        <img src="${info.img_cover}" width="100%" height="80px" style="position:absolute;top:0;left:0;object-fit:cover;"/>
        <div class="row text-center mt-1">
          <div class="col">
            <i class="fas fa-users"></i> ${info.accommodates}
          </div>
          <div class="col">
            <i class="fas fa-bed"></i> ${info.bedrooms}
          </div>    
          <div class="col">
            <i class="fas fa-bath"></i> ${info.bathrooms}
          </div>
        </div>
        <p>${info.title}</p>			
        <div class="text-center"><a href="/property/${info.platforms.homeaway_property_id}" class="btn-accent py-2 px-4" style="color:white;">View</a></div>
        </div>`);
        } 
        else {
          marker.addTo(this.map);
        }

  }

    const group = new L.featureGroup(this.markers);
    this.map.flyToBounds(group, {
        padding: L.point(36, 36),
        animate: true,
    });
  }

}
