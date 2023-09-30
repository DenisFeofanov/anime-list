import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CardComponent } from './card/card.component';

const routes: Routes = [
  { path: 'cards/:id', title: 'Card', component: CardComponent },
  { path: 'cards', title: 'Anime List', component: ListComponent },
  { path: '', redirectTo: '/cards', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
