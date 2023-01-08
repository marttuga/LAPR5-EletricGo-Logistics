import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// ...
import { FilterPipe } from '../views/model/filterPipe';
import { ChooseTruckAndRouteComponent } from './choose-truck-and-route/choose-truck-and-route.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    // Modules
    CommonModule,
    FormsModule,
  ],

  declarations: [
    // Components &amp; directives
    FilterPipe,
    ChooseTruckAndRouteComponent,
  ],

  providers: [
    // Services
  ],

  exports: [
    // ...
    FilterPipe,
    ChooseTruckAndRouteComponent,
  ],
})
export class SharedModule {}
