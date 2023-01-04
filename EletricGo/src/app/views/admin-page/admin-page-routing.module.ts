import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { AdminPageComponent } from './admin-page.component';
import { CreateUserComponent } from './create-user/create-user.component';

const routes: Routes = [
  { path: 'views/create-user', component:CreateUserComponent},
  { path: 'views/admin-page', component:AdminPageComponent},
]
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPageRoutingModule { }
