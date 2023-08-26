import { Apollo, gql } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import { Anime } from './list.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  error: any;
  animeList!: Anime[];

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .query({
        query: gql`
          query PopularAnime {
            Page(page: 1, perPage: 10) {
              media(type: ANIME, sort: POPULARITY) {
                title {
                  romaji
                  native
                }
              }
            }
          }
        `,
      })
      .subscribe((result: any) => {
        this.animeList = result.data.Page.media;
        this.error = result.error;
      });
  }
}
