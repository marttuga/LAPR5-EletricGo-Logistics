import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { AdminPageComponent } from './admin-page.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ListUserComponent } from './list-user/list-user.component';

const routes: Routes = [
  { path: 'views/create-user', component:CreateUserComponent},
  { path: 'views/admin-page', component:AdminPageComponent},
  { path: 'views/list-user', component:ListUserComponent},

]
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPageRoutingModule { }
