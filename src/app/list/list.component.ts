import { Apollo, gql } from 'apollo-angular';
import { Component } from '@angular/core';
import { RequestArgs, Anime } from 'src/shared/list.model';

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
export class ListComponent {
  error: any;
  animeList: Anime[] = [];
  currentPage = 3;

  constructor(private apollo: Apollo) {}

  getList(variables?: RequestArgs) {
    this.apollo
      .query({
        query: GET_POPULAR_ANIME,
        variables,
      })
      .subscribe((result: any) => {
        this.animeList = result.data.Page.media;
        this.error = result.error;
      });
  }
}
