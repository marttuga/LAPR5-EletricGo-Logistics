import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { NetworkComponent } from './views/network/network.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { CreateRouteComponent } from './views/create-route/create-route.component';
import { LogisticsManagerComponent } from './views/logistics-manager/logistics-manager.component';
import { GetPlannedRouteComponent } from './views/get-planned-route/get-planned-route.component';
import { ListRoutesComponent } from './views/list-routes/list-routes.component';
import { SharedModule } from './views/shared.module';
import { ListPlannedRoutesComponent } from './views/list-planned-routes/list-planned-routes.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {WarehouseManagerModule} from "./views/warehouse-manager/warehouse-manager.module";
import { CreateUserComponent } from './views/admin-page/create-user/create-user.component';
import { AdminPageModule } from './views/admin-page/admin-page.module';
import {FleetManagerModule} from "./views/fleet-manager/fleet-manager.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NetworkComponent,
    CreateRouteComponent,
    GetPlannedRouteComponent,
    ListRoutesComponent,
    ListPlannedRoutesComponent,
LogisticsManagerComponent
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
      FleetManagerModule,
      AdminPageModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

