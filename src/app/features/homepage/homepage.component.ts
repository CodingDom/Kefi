import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private api : ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.api.getTravelNews().then(data => {
      this.shuffleArray(data);
      this.destinations = data.slice(0, 6);
    });
  }

  shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
  }

  searchByLocation(name: string) {
    this.api.getLocations(name)
    .then(({items}) => {          
      const location = items[Math.floor(Math.random() * items.length)];  
      const query = {
        location: location.name,
        locationId: location.city.id
      };          
      this.router.navigate(['/search'], { queryParams: query });
    })
    .catch(err => {
      console.log(err);
    });
  }

}
