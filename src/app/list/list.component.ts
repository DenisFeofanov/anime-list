import { Apollo, gql } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import { Anime } from 'src/shared/anime.model';
import { Filters } from 'src/shared/filters.model';

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
          romaji
          native
        }
        genres
        status
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
  animeList!: Anime[];
  currentPage = 3;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.getList();
  }

  getList(filters?: Filters) {
    // check that filters' values are non-empty, otherwise assign undefined
    let searchValue = (filters && filters.search) || undefined,
      genreValue =
        (filters && filters.genre.length && filters.genre) || undefined,
      statusValue = (filters && filters.status) || undefined;

    this.apollo
      .query({
        query: GET_POPULAR_ANIME,
        variables: {
          search: searchValue,
          genre: genreValue,
          status: statusValue,
        },
      })
      .subscribe((result: any) => {
        this.animeList = result.data.Page.media;
        this.error = result.error;
      });
  }
}
