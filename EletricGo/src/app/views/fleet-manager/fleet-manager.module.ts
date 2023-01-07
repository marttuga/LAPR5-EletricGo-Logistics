import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../../app-routing.module';
import { SharedModule } from '../shared.module';
import { CreateTruckComponent } from './create-truck/create-truck.component';
import { ListTruckComponent } from './list-truck/list-truck.component';
import { FleetManagerRoutingModule } from './fleet-manager-routing.module';
import { FleetManagerComponent } from './fleet-manager.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [FleetManagerComponent,
    CreateTruckComponent,
    ListTruckComponent,
    ],
  imports: [
    CommonModule,
    FleetManagerRoutingModule,
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
export class FleetManagerModule { }
