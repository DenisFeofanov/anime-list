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

  onChange(): void {
    this.submitted.emit();
  }
}
