import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  searchForm = this.formBuilder.group({
    location: '',
    roomType: '',
    dateTo: '',
    dateFrom: ''
  });

  open_search: false;

  constructor(
    private formBuilder: FormBuilder
    ) { }

  onSubmit() {
    console.log(this.searchForm.value);
  }

}
