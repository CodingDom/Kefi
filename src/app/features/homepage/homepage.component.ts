import { Component, OnInit } from '@angular/core';
import { TravelNews } from '@core/interfaces/travel-news';
import { ApiService } from '@core/services/api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  destinations: TravelNews[] = [];
  locationSearch: any;

  constructor(
    private api : ApiService
  ) { }

  ngOnInit(): void {
    this.api.getTravelNews().then(data => {
      this.shuffleArray(data);
      this.destinations = data.slice(0, 6);
      const locations = {};
      let currIndex = 0;
      for (let i = 0; i < this.destinations.length; i++) {
        this.api.getLocations(this.destinations[i].location.title)
        .then(data => {          
          const location = data[Math.abs(Math.random() * data.length)];
          locations[this.destinations[i].location.title] = `/search?location=${encodeURIComponent(location.name)}&locationId=${location.city.id}`;          
        })
        .catch(err => {
          
        })
        .finally(() => {
          currIndex++;
          if (currIndex == this.destinations.length) {
            this.locationSearch = locations;
          }
          console.log(currIndex);
        });
      }      
    });
  }

  shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
  }

}
