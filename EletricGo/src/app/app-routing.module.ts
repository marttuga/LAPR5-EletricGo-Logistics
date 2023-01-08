import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';import { CreateTruckComponent } from './views/fleet-manager/create-truck/create-truck.component';
import {LoginComponent} from "./views/login/login.component";
import {NetworkComponent} from "./views/network/network.component";
import { RgpdComponent } from './views/rgpd/rgpd.component';



const routes: Routes = [
  { path: '',redirectTo: '/views/login', pathMatch: 'full' },
  { path: 'views/login', component: LoginComponent},
  { path: 'views/network', component:NetworkComponent},
  { path: 'views/rgpd', component:RgpdComponent},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

