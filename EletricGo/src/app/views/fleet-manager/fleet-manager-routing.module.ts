import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { CreateTruckComponent } from './create-truck/create-truck.component';
import { FleetManagerComponent } from './fleet-manager.component';
import { ListTruckComponent } from './list-truck/list-truck.component';



const routes: Routes = [
  { path: 'views/fleet-manager', component:FleetManagerComponent},
  { path: 'views/create-truck', component:CreateTruckComponent},
  { path: 'views/list-truck', component:ListTruckComponent}, 

]
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetManagerRoutingModule { }
