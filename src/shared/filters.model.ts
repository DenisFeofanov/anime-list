export const GENRE_VALUES = ['Action', 'Adventure', 'Horror', 'Mystery'];

export const STATUS_VALUES = [
  'FINISHED',
  'RELEASING',
  'NOT_YET_RELEASED',
  'CANCELLED',
  'HIATUS',
] as const;

export type Status = (typeof STATUS_VALUES)[number];

interface Checkbox {
  name: string;
  isChecked: boolean;
}

export interface Filters {
  search: string;
  genre: Checkbox[];
  status: Status;
}
