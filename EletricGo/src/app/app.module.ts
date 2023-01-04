import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import {FormsModule} from "@angular/forms";
import { FleetManagerComponent } from './views/fleet-manager/fleet-manager.component';
import { CreateTruckComponent } from './views/create-truck/create-truck.component';
import {HttpClientModule} from "@angular/common/http";
import { ListTruckComponent } from './views/list-truck/list-truck.component';
import { SharedModule } from './views/shared.module';
import { TruckStatusComponent } from './views/truck-status/truck-status.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {WarehouseManagerModule} from "./views/warehouse-manager/warehouse-manager.module";
import { CreateUserComponent } from './views/create-user/create-user.component';
import { AdminPageComponent } from './views/admin-page/admin-page.component';
import { LogisticsManagerModule } from './views/logistics-manager/logistics-manager.module';
import { NetworkComponent } from './views/network/network.component';
import { ListPlannedRoutesComponent } from './views/list-planned-routes/list-planned-routes.component';
import { GetPlannedRouteComponent } from './views/get-planned-route/get-planned-route.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NetworkComponent,
    FleetManagerComponent,
    ListPlannedRoutesComponent,
    GetPlannedRouteComponent,
    CreateTruckComponent,
    ListTruckComponent,
    TruckStatusComponent,
    CreateUserComponent,
    AdminPageComponent

  ],
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      SharedModule,
      NgxPaginationModule,
      WarehouseManagerModule,
      LogisticsManagerModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

