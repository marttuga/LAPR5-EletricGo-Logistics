import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {WarehouseManagerComponent} from "./warehouse-manager.component";
import {CreateWarehouseComponent} from "./create-warehouse/create-warehouse.component";
import {ListWarehousesComponent} from "./list-warehouses/list-warehouses.component";
import { CreateDeliveryComponent } from './create-delivery/create-delivery.component';
import { ListDeliveriesComponent } from './list-deliveries/list-deliveries.component';
import {W} from "@angular/cdk/keycodes";


const routes: Routes = [
  {path:'', component: WarehouseManagerComponent},
  { path: 'warehouse-manager/create-warehouse', component:CreateWarehouseComponent},
  { path: 'warehouse-manager/list-warehouses',  component:ListWarehousesComponent},
  { path: 'warehouse-manager/create-delivery', component:CreateDeliveryComponent},
  { path: 'warehouse-manager/list-deliveries', component:ListDeliveriesComponent}];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseManagerRoutingModule { }
