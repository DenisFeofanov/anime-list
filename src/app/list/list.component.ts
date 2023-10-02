import { Apollo, gql } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import { Anime } from 'src/shared/list.model';
import { Filters, GENRE_VALUES } from 'src/shared/filters.model';

const GET_POPULAR_ANIME = gql`
  query PopularAnime(
    $search: String
    $genre: [String]
    $status: MediaStatus
    $page: Int
  ) {
    Page(page: $page, perPage: 5) {
      pageInfo {
        hasNextPage
      }
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
  currentPage = 1;
  hasNextPage!: Boolean;
  filters: Filters = {
    search: '',
    genre: GENRE_VALUES.map((name) => {
      return { name, isChecked: false };
    }),
    status: 'FINISHED',
  };
  isLoading: boolean = false;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.getList();
  }

  getList(areFiltersChanged?: Boolean): void {
    if (areFiltersChanged) this.currentPage = 1;

    // convert to request format, assign undefined if values are empty
    let selectedGenres = this.filters.genre
      .filter((genre) => genre.isChecked)
      .map((genre) => genre.name);

    this.isLoading = true;
    this.apollo
      .query({
        query: GET_POPULAR_ANIME,
        variables: {
          search: this.filters.search || undefined,
          genre: (selectedGenres.length && selectedGenres) || undefined,
          status: this.filters.status || undefined,
          page: this.currentPage,
        },
      })
      .subscribe((result: any) => {
        this.isLoading = false;
        this.animeList = result.data.Page.media;
        this.error = result.error;
        this.hasNextPage = result.data.Page.pageInfo.hasNextPage;
      });
  }

  changePage(pageAmount: number): void {
    const newPage = this.currentPage + pageAmount;
    if (newPage < 1 || (pageAmount === 1 && !this.hasNextPage)) return;

    this.currentPage = newPage;
    this.getList();
  }
}
