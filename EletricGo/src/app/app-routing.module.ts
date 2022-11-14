import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTruckComponent } from './views/create-truck/create-truck.component';
import { FleetManagerComponent } from './views/fleet-manager/fleet-manager.component';
import {LoginComponent} from "./views/login/login.component";
import {NetworkComponent} from "./views/network/network.component";

const routes: Routes = [
  { path: '',redirectTo: '/views/login', pathMatch: 'full' },
  { path: 'views/login', component: LoginComponent},
  { path: 'views/network', component:NetworkComponent},
  { path: 'views/create-truck', component:CreateTruckComponent},
  { path: 'views/fleet-manager', component:FleetManagerComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
