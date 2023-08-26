import { Component, Input } from '@angular/core';
import { Anime } from 'src/shared/anime.model';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent {
  @Input() item!: Anime;
}
