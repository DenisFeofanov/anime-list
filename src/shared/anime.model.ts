export interface Anime {
  title: Title;
  genres: string[];
  status: string;
}

export interface Title {
  romaji: string;
  native: string;
}
