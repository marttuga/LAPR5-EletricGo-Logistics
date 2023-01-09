import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';import { CreateTruckComponent } from './views/fleet-manager/create-truck/create-truck.component';
import {LoginComponent} from "./views/login/login.component";
import {NetworkComponent} from "./views/network/network.component";
import { RgpdComponent } from './views/rgpd/rgpd.component';
import {WarehouseManagerComponent} from "./views/warehouse-manager/warehouse-manager.component";
import {AdminPageComponent} from "./views/admin-page/admin-page.component";



const routes: Routes = [
  { path: '',redirectTo: '/views/login', pathMatch: 'full' },
  { path: 'views/login', component: LoginComponent},
  { path: 'views/network', component:NetworkComponent},
  { path: 'views/rgpd', component:RgpdComponent},



  { path: 'warehouse-manager', component:WarehouseManagerComponent, /*canActivate: [AuthGuard]*/},
  { path: 'views/admin-page', component:AdminPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

