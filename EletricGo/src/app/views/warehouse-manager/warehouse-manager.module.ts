import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../../app-routing.module';
import { SharedModule } from '../shared.module';
import { CreateWarehouseComponent } from './create-warehouse/create-warehouse.component';
import { ListWarehousesComponent } from './list-warehouses/list-warehouses.component';
import { WarehouseManagerRoutingModule } from './warehouse-manager-routing.module';
import { WarehouseManagerComponent } from './warehouse-manager.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [WarehouseManagerComponent,
    CreateWarehouseComponent,
    ListWarehousesComponent
    ],
  imports: [
    CommonModule,
    WarehouseManagerRoutingModule,
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
  ]


})
export class WarehouseManagerModule { }
