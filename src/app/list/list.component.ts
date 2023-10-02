import { Apollo, gql } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import { Anime } from 'src/shared/list.model';
import { Filters, GENRE_VALUES } from 'src/shared/filters.model';

const GET_POPULAR_ANIME = gql`
  query PopularAnime($search: String, $genre: [String], $status: MediaStatus) {
    Page(page: 1, perPage: 5) {
      media(
        type: ANIME
        sort: POPULARITY_DESC
        search: $search
        genre_in: $genre
        status: $status
      ) {
        title {
          english
          native
        }
        genres
        status
        description
        id
      }
    }
  }
`;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  error: any;
  animeList: Anime[] = [];
  currentPage = 3;
  filters: Filters = {
    search: '',
    genre: GENRE_VALUES.map((name) => {
      return { name, isChecked: false };
    }),
    status: 'FINISHED',
  };

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    // convert to request format, assign undefined if values are empty
    let selectedGenres = this.filters.genre
      .filter((genre) => genre.isChecked)
      .map((genre) => genre.name);

    this.apollo
      .query({
        query: GET_POPULAR_ANIME,
        variables: {
          search: this.filters.search || undefined,
          genre: (selectedGenres.length && selectedGenres) || undefined,
          status: this.filters.status || undefined,
        },
      })
      .subscribe((result: any) => {
        this.animeList = result.data.Page.media;
        this.error = result.error;
      });
  }
}
