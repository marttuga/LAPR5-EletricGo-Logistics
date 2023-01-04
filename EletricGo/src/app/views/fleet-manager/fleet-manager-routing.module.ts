import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { CreateTruckComponent } from './create-truck/create-truck.component';
import { FleetManagerComponent } from './fleet-manager.component';
import { ListTruckComponent } from './list-truck/list-truck.component';
import { TruckStatusComponent } from './truck-status/truck-status.component';



const routes: Routes = [
  { path: 'views/fleet-manager', component:FleetManagerComponent},
  { path: 'views/create-truck', component:CreateTruckComponent},
  { path: 'views/list-truck', component:ListTruckComponent},  { path: 'views/truck-status', component:TruckStatusComponent},

]
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetManagerRoutingModule { }
