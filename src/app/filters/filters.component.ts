import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Filters, GENRE_VALUES } from 'src/shared/filters.model';
import { STATUS_VALUES } from 'src/shared/filters.model';
import { RequestArgs } from 'src/shared/list.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit {
  filters: Filters = {
    search: '',
    genre: GENRE_VALUES.map((name) => {
      return { name, isChecked: false };
    }),
    status: 'FINISHED',
  };
  statusValues = STATUS_VALUES;
  @Output() submitted = new EventEmitter<RequestArgs>();
  areCheckboxesVisible: boolean = false;

  ngOnInit(): void {
    this.sendRequest();
  }

  onSubmit(): void {
    this.sendRequest();
  }

  sendRequest(): void {
    // convert to request format, assign undefined if values are empty
    let selectedGenres = this.filters.genre
      .filter((genre) => genre.isChecked)
      .map((genre) => genre.name);
    this.submitted.emit({
      search: this.filters.search || undefined,
      genre: (selectedGenres.length && selectedGenres) || undefined,
      status: this.filters.status || undefined,
    });
  }
}
