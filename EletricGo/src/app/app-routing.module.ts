import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./views/login/login.component";
import {NetworkComponent} from "./views/network/network.component";
import {WarehouseManagerComponent} from "./views/warehouse-manager/warehouse-manager.component";
import {CreateWarehouseComponent} from "./views/create-warehouse/create-warehouse.component";

const routes: Routes = [
  { path: '',redirectTo: '/views/login', pathMatch: 'full' },
  { path: 'views/login', component: LoginComponent},
  { path: 'views/network', component:NetworkComponent},
  { path: 'views/warehouse-manager', component:WarehouseManagerComponent},
  //{ path: 'views/fleet-manager', component:FleetManagerComponenet},
  { path: 'views/create-warehouse', component:CreateWarehouseComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
