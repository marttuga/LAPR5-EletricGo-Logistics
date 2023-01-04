import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LogisticsManagerComponent} from "./logistics-manager.component";
import {CreateRouteComponent} from "./create-route/create-route.component";
import {ListRoutesComponent} from "./list-routes/list-routes.component";
import { GetPlannedRouteComponent } from '../get-planned-route/get-planned-route.component';
import { ListPlannedRoutesComponent } from '../list-planned-routes/list-planned-routes.component';


const routes: Routes = [
  { path: 'views/logistics-manager', component:LogisticsManagerComponent},
  { path: 'views/logistics-manager/create-route', component:CreateRouteComponent},
  { path: 'views/logistics-manager/list-routes',  component:ListRoutesComponent},
  { path: 'views/get-planned-route', component:GetPlannedRouteComponent},
  { path: 'views/list-planned-routes',  component:ListPlannedRoutesComponent},];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogisticsManagerRoutingModule { }
