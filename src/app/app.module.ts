import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './list/list.component';
import { CardComponent } from './card/card.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FiltersComponent } from './filters/filters.component';
import { DetailsComponent } from './details/details.component';
import { PropertyComponent } from './property/property.component';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { CacheRouteReuseStrategy } from './cache-route-reuse.strategy';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CardComponent,
    PaginationComponent,
    FiltersComponent,
    DetailsComponent,
    PropertyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: CacheRouteReuseStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
