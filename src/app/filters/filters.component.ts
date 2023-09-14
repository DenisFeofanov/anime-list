import { Component, EventEmitter, Output } from '@angular/core';
import { Filters } from 'src/shared/filters.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
  filters: Filters = {
    search: '',
    genre: '',
    type: '',
  };

  @Output() submitted = new EventEmitter<Filters>();
  areCheckboxesVisible: boolean = false;

  onSubmit() {
    this.submitted.emit(this.filters);
  }
}
