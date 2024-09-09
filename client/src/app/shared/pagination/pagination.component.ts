import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() pages: number;
  @Input() maxVisiblePagination: number = 5;

  @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  currentPage: number = 1;
  pageNumbers: number[];
  visiblePageNumbers: number[];
  
  private transitionNumber: number;

  constructor() { }

  ngOnInit(): void {
    this.pageNumbers = Array(Math.ceil(this.pages)).fill(0).map((x,i)=>i+1);
    this.transitionNumber = this.maxVisiblePagination/2;
    this.updatePageNumber(1);
  }

  updatePageNumber(val) {
    const maxIndex = this.maxVisiblePagination-1;
    
    
    if (val != this.currentPage) {
      this.currentPage = val;
      this.pageChanged.emit(val);
    }
    
    if (val < this.transitionNumber || this.pageNumbers.length <= maxIndex) {
      this.visiblePageNumbers = this.pageNumbers.slice(0, maxIndex);
    } 
    else if (val > this.pageNumbers.length-5) {
      this.visiblePageNumbers = this.pageNumbers.slice(this.pageNumbers.length-maxIndex, this.pageNumbers.length);
    }
    else {
      this.visiblePageNumbers = this.pageNumbers.slice(val-this.transitionNumber,val+this.transitionNumber-1);
    }    
  }

}
