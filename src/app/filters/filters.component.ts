import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filters } from 'src/shared/filters.model';
import { STATUS_VALUES } from 'src/shared/filters.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
  @Input() filters!: Filters;
  @Output() submitted = new EventEmitter();

  statusValues = STATUS_VALUES;
  areCheckboxesVisible: boolean = false;

  get amountOfSelectedCheckboxes() {
    return this.filters.genre.filter((genre) => genre.isChecked).length;
  }

  onChange(): void {
    const filtersHasChanged = true;
    this.submitted.emit(filtersHasChanged);
  }
}
