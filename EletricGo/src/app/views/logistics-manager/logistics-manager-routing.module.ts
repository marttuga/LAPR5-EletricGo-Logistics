import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LogisticsManagerComponent} from "./logistics-manager.component";
import {CreateRouteComponent} from "./create-route/create-route.component";
import {ListRoutesComponent} from "./list-routes/list-routes.component";
import { GetPlannedRouteComponent } from '../get-planned-route/get-planned-route.component';
import { ListPlannedRoutesComponent } from '../list-planned-routes/list-planned-routes.component';
import {FleetManagerComponent} from "../fleet-manager/fleet-manager.component";


const routes: Routes = [
  { path: '', component:LogisticsManagerComponent},
  { path: 'logistics-manager', component:LogisticsManagerComponent},
  { path: 'logistics-manager/create-route', component:CreateRouteComponent},
  { path: 'logistics-manager/list-routes',  component:ListRoutesComponent},
  { path: 'views/get-planned-route', component:GetPlannedRouteComponent},
  { path: 'views/list-planned-routes',  component:ListPlannedRoutesComponent},];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogisticsManagerRoutingModule { }
