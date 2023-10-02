import { Component, Input } from '@angular/core';
import { Anime } from 'src/shared/list.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() item!: Anime;
}
