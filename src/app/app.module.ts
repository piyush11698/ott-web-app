import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { MoviesHomeComponent } from './components/movies-home/movies-home.component';
import { AddMoviesComponent } from './components/add-movies/add-movies.component';
import { ButtonComponent } from './components/button/button.component';
import { MovieTileComponent } from './components/movie-tile/movie-tile.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdminRoutingModule } from './modules/admin/admin-routing.module';
import { AdminModule } from './modules/admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    ToolBarComponent,
    MoviesHomeComponent,
    AddMoviesComponent,
    ButtonComponent,
    MovieTileComponent,
    MovieDetailComponent,
    LoginComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
