import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTruckComponent } from './views/create-truck/create-truck.component';
import { FleetManagerComponent } from './views/fleet-manager/fleet-manager.component';
import {LoginComponent} from "./views/login/login.component";
import {NetworkComponent} from "./views/network/network.component";
import {LogisticsManagerComponent} from "./views/logistics-manager/logistics-manager.component";
import {CreateRouteComponent} from "./views/create-route/create-route.component";
import {ListTruckComponent} from "./views/list-truck/list-truck.component";
import { GetPlannedRouteComponent } from './views/get-planned-route/get-planned-route.component';
import { ListRoutesComponent } from './views/list-routes/list-routes.component';
import { ListPlannedRoutesComponent } from './views/list-planned-routes/list-planned-routes.component';
import { CreateUserComponent } from './views/create-user/create-user.component';
import { AdminPageComponent } from './views/admin-page/admin-page.component';


const routes: Routes = [
  { path: '',redirectTo: '/views/login', pathMatch: 'full' },
  { path: 'views/login', component: LoginComponent},
  { path: 'views/network', component:NetworkComponent},
  { path: 'views/logistics-manager', component:LogisticsManagerComponent},
  { path: 'views/fleet-manager', component:FleetManagerComponent},
  { path: 'views/create-truck', component:CreateTruckComponent},
  { path: 'views/create-route', component:CreateRouteComponent},
  { path: 'views/create-truck', component:CreateTruckComponent},
  { path: 'views/list-truck', component:ListTruckComponent},
  { path: 'views/get-planned-route', component:GetPlannedRouteComponent},
  { path: 'views/list-routes', component:ListRoutesComponent},
  { path: 'views/list-planned-routes', component:ListPlannedRoutesComponent},
  { path: 'views/create-user', component:CreateUserComponent},
  { path: 'views/admin-page', component:AdminPageComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

