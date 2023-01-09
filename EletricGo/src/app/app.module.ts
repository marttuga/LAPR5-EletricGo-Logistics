import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { NetworkComponent } from './views/network/network.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { LogisticsManagerComponent } from './views/logistics-manager/logistics-manager.component';
import { GetPlannedRouteComponent } from './views/get-planned-route/get-planned-route.component';
import { SharedModule } from './views/shared.module';
import { ListPlannedRoutesComponent } from './views/list-planned-routes/list-planned-routes.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {WarehouseManagerModule} from "./views/warehouse-manager/warehouse-manager.module";
import { CreateUserComponent } from './views/admin-page/create-user/create-user.component';
import { AdminPageModule } from './views/admin-page/admin-page.module';
import {FleetManagerModule} from "./views/fleet-manager/fleet-manager.module";
import { LogisticsManagerModule } from './views/logistics-manager/logistics-manager.module';
import {MatFormFieldModule} from "@angular/material/form-field";
import {ChooseTruckAndRouteComponent} from "./views/choose-truck-and-route/choose-truck-and-route.component";

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSortModule} from "@angular/material/sort";
import {MatInputModule} from "@angular/material/input";
import { RgpdComponent } from './views/rgpd/rgpd.component';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NetworkComponent,
    GetPlannedRouteComponent,
    ListPlannedRoutesComponent,
  ],
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      SharedModule,
      NgxPaginationModule,
      WarehouseManagerModule,
      FleetManagerModule,
      AdminPageModule,
      LogisticsManagerModule,
      MatFormFieldModule,
      MatTableModule,
      MatPaginatorModule,
      MatIconModule,
      MatButtonModule,
      MatSlideToggleModule,
      MatSortModule,
      MatInputModule,
      SocialLoginModule
    ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '427292031267-5hdgi97nd6drercqdoe4mah4doukeg8n.apps.googleusercontent.com'
          )
        },
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

