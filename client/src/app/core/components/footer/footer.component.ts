import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currYear: number = (new Date()).getFullYear();

  constructor() { }

  ngOnInit(): void {
  }

  scrollToDestinations(): void {
    document.querySelector("#destinations").scrollIntoView({ behavior: "smooth", block: "start" });
  }

}
