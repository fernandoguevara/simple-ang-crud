import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './page/home/home.component';
import { MaterialModule } from "../../shared/material.module";


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule
  ]
})
export class HomeModule { }
