import { Component, AfterViewInit, Input } from '@angular/core';
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
  get properties() {
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
        {icon: new L.icon({iconUrl: "./leaflet/images/marker-icon-2x.png", iconSize: [25, 41], iconAnchor: [12, 41]})}
        );
        this.markers.push(marker);
        if (this.popUp) {          
          marker.addTo(this.map)
              .bindPopup(`<div>
        <img src="${info.img_cover}" width="150px" height="80px" style="object-fit:cover;"/>
        <p style="max-width:60px;">${info.title}</p>			
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
