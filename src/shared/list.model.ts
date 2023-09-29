import { Status } from './filters.model';

export interface RequestArgs {
  search?: string;
  genre?: string[];
  status?: Status;
}

export interface Anime {
  title: Title;
  genres: string[];
  status: string;
}

export interface Title {
  english: string;
  native: string;
}
