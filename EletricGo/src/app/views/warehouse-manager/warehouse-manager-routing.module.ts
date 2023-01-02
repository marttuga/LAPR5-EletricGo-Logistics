import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {WarehouseManagerComponent} from "./warehouse-manager.component";
import {CreateWarehouseComponent} from "./create-warehouse/create-warehouse.component";
import {ListWarehousesComponent} from "./list-warehouses/list-warehouses.component";


const routes: Routes = [
  { path: 'views/warehouse-manager', component:WarehouseManagerComponent},
  { path: 'views/warehouse-manager/create-warehouse', component:CreateWarehouseComponent},
  { path: 'views/warehouse-manager/list-warehouses',  component:ListWarehousesComponent}];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseManagerRoutingModule { }
