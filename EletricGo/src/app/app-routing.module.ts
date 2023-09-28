import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';import { CreateTruckComponent } from './views/fleet-manager/create-truck/create-truck.component';
import {LoginComponent} from "./views/login/login.component";
import {NetworkComponent} from "./views/network/network.component";
import { RgpdComponent } from './views/rgpd/rgpd.component';
import {WarehouseManagerComponent} from "./views/warehouse-manager/warehouse-manager.component";
import {AdminPageComponent} from "./views/admin-page/admin-page.component";
import {AuthGuard} from "./auth.guard";
import {FleetManagerComponent} from "./views/fleet-manager/fleet-manager.component";
import {LogisticsManagerComponent} from "./views/logistics-manager/logistics-manager.component";



const routes: Routes = [
  { path: '',redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent,},
  { path: 'network', component:NetworkComponent},
  { path: 'rgpd', component:RgpdComponent},
  { path: 'warehouse-manager', component:WarehouseManagerComponent, canActivate: [AuthGuard]},
  { path: 'logistics-manager', component:LogisticsManagerComponent, canActivate: [AuthGuard]},
  { path: 'fleet-manager', component:FleetManagerComponent},
  { path: 'views/logistics-manager', component:LogisticsManagerComponent, canActivate: [AuthGuard]},
  { path: 'admin-page', component:AdminPageComponent,canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

