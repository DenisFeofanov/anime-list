import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: 'cards/:id', title: 'Card', component: DetailsComponent },
  { path: 'cards', title: 'Anime List', component: ListComponent },
  { path: '', redirectTo: '/cards', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
