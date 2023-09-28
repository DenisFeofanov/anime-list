import { Component, EventEmitter, Output } from '@angular/core';
import { Filters, GENRE_VALUES } from 'src/shared/filters.model';
import { STATUS_VALUES } from 'src/shared/filters.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
  filters: Filters = {
    search: '',
    genre: [],
    status: 'RELEASING',
  };
  genreValues = GENRE_VALUES;
  statusValues = STATUS_VALUES;
  @Output() submitted = new EventEmitter<Filters>();
  areCheckboxesVisible: boolean = false;

  onSubmit() {
    this.submitted.emit(this.filters);
  }
}
