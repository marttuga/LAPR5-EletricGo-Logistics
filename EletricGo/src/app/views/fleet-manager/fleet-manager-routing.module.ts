import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { CreateTruckComponent } from './create-truck/create-truck.component';
import { FleetManagerComponent } from './fleet-manager.component';
import { ListTruckComponent } from './list-truck/list-truck.component';
import {AdminPageComponent} from "../admin-page/admin-page.component";



const routes: Routes = [
  {path:'fleet-manager', component: FleetManagerComponent},
  { path: 'fleet-manager/create-truck', component:CreateTruckComponent},
  { path: 'fleet-manager/list-truck', component:ListTruckComponent},

]
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetManagerRoutingModule { }
