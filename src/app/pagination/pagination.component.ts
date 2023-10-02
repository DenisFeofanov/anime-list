import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  @Input() currentPage!: number;
  @Output() changePageClicked = new EventEmitter();

  onClick(pageAmount: number): void {
    this.changePageClicked.emit(pageAmount);
  }
}
