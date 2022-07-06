import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AddMoviesComponent } from 'src/app/components/add-movies/add-movies.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
