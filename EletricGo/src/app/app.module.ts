import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { NetworkComponent } from './views/network/network.component';
import { FleetManagerComponent } from './views/fleet-manager/fleet-manager.component';
import { CreateTruckComponent } from './views/create-truck/create-truck.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NetworkComponent,
    FleetManagerComponent,
    CreateTruckComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
