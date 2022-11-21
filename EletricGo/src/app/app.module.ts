import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { NetworkComponent } from './views/network/network.component';
import { WarehouseManagerComponent } from './views/warehouse-manager/warehouse-manager.component';
import {FormsModule} from "@angular/forms";
import { FleetManagerComponent } from './views/fleet-manager/fleet-manager.component';
import { CreateTruckComponent } from './views/create-truck/create-truck.component';
import { CreateDeliveryComponent } from './views/create-delivery/create-delivery.component';
import {HttpClientModule} from "@angular/common/http";
import { CreateRouteComponent } from './views/create-route/create-route.component';
import { LogisticsManagerComponent } from './views/logistics-manager/logistics-manager.component';
import {CreateWarehouseComponent} from "./views/create-warehouse/create-warehouse.component";
import { ListWarehousesComponent } from './views/list-warehouses/list-warehouses.component';
import { ListTruckComponent } from './views/list-truck/list-truck.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NetworkComponent,
    FleetManagerComponent,
    WarehouseManagerComponent,
    CreateTruckComponent,
    CreateDeliveryComponent,
    CreateRouteComponent,
    LogisticsManagerComponent,
    CreateWarehouseComponent,
    ListWarehousesComponent

  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
