import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Anime } from 'src/shared/list.model';

const GET_ANIME_BY_ID = gql`
  query getAnime($id: Int) {
    Media(id: $id) {
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
`;

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  item!: Anime;

  constructor(private router: Router, private apollo: Apollo) {}

  ngOnInit() {
    // get anime id from url
    this.getAnime(this.router.url.split('/').pop());
  }

  getAnime(id?: string) {
    this.apollo
      .query({
        query: GET_ANIME_BY_ID,
        variables: {
          id,
        },
      })
      .subscribe((result: any) => {
        this.item = result.data.Media;
      });
  }
}
