export const GENRE_VALUES = ['Action', 'Adventure', 'Horror', 'Mystery'];

export const STATUS_VALUES = [
  'FINISHED',
  'RELEASING',
  'NOT_YET_RELEASED',
  'CANCELLED',
  'HIATUS',
];

export interface Filters {
  search: string;
  genre: string;
  status: string;
}
