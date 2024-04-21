import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { TravelNews, TravelNewsQueryParams } from '@core/interfaces/travel-news';
import { ApiService } from '@core/services/api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  destinations: TravelNews[] = [];
  queryParams: TravelNewsQueryParams = {};
  locationSearch: any;

  constructor(
    private api : ApiService,
    private router: Router,
    private metaTagService: Meta
  ) { }

  ngOnInit(): void {
    this.metaTagService.updateTag({ 
      name: 'description', 
      content: "Book your dream vacation home anywhere in the world through Kefi Rentals." 
    });
    this.api.getTravelNews().then(data => {
      this.shuffleArray(data);
      const initialSet = data.slice(0,6);
      this.setLocationQueries(initialSet);
      this.preloadDestinations(initialSet);
    });
    
    if (history.state.destinations) {
      document.querySelector("#destinations").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  preloadDestinations(data) {
    let loaded = 0;
    data.forEach(d => {
      const img = new Image();
      img.src = d.thumbnail.src;
      img.onload = () => {
        loaded++;
        if (loaded === data.length)
          this.destinations = data;
      }
    });
  }

  shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
  }

  setLocationQueries(destinations: TravelNews[]) {
    destinations.forEach(destination => {
      const title = destination.location.title;      
      this.api.getLocations(title)
      .then(({items}) => {          
        const location = items[Math.floor(Math.random() * items.length)];  
        this.queryParams[title] = {
          location: location.name,
          locationId: location.city.id
        };          
      })
      .catch(err => {
        console.log(err);
      });
    });
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

}
