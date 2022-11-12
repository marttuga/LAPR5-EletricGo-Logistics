import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./views/login/login.component";
import {NetworkComponent} from "./views/network/network.component";

const routes: Routes = [
  { path: 'views/login', component: LoginComponent},
  {path:'views/network',component:NetworkComponent},
  { path: '', redirectTo: '/views/network', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
