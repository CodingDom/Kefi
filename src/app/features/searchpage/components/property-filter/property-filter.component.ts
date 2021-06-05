import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-property-filter',
  templateUrl: './property-filter.component.html',
  styleUrls: ['./property-filter.component.scss']
})
export class PropertyFilterComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() propertyTypes: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
