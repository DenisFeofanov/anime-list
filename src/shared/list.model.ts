import { Status } from './filters.model';

export interface RequestArgs {
  search?: string;
  genre?: string[];
  status?: Status;
}
