import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../../app-routing.module';
import { SharedModule } from '../shared.module';
import { CreateRouteComponent } from './create-route/create-route.component';
import { ListRoutesComponent } from './list-routes/list-routes.component';
import { LogisticsManagerRoutingModule } from './logistics-manager-routing.module';
import { LogisticsManagerComponent } from './logistics-manager.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { NgxPaginationModule } from 'ngx-pagination';
import { ListPlannedRoutesComponent } from '../list-planned-routes/list-planned-routes.component';
import { GetPlannedRouteComponent } from '../get-planned-route/get-planned-route.component';


@NgModule({
 declarations: [ LogisticsManagerComponent,CreateRouteComponent,ListRoutesComponent ],

  imports: [
    CommonModule,
    LogisticsManagerRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    NgxPaginationModule
  ]


})
export class LogisticsManagerModule { }
