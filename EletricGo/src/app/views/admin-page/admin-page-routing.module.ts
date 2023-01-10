import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { AdminPageComponent } from './admin-page.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import {WarehouseManagerComponent} from "../warehouse-manager/warehouse-manager.component";

const routes: Routes = [
  {path:'admin-page', component: AdminPageComponent},
  { path: 'admin-page/create-user', component:CreateUserComponent},
  { path: 'admin-page/list-user', component:ListUserComponent},

]
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPageRoutingModule { }
