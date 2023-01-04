import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import {RoutesService} from "../../../services/node/routes.service";

@Component({
  selector: 'app-list-routes',
  templateUrl: './list-routes.component.html',
  styleUrls: ['./list-routes.component.css']
})
export class ListRoutesComponent implements OnInit {
  routes: Route[];
  route: Route;
  routeId: string;
  distance: string;
  routeTime: string;
  batteryWaste: string;
  arrivalId: string;
  departureId: string;
  extraTime: string;
  searchArrivalID: string;
  searchDepartureID: string;
  p:number = 1;
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private routeService: RoutesService,
    private activedRoute: ActivatedRoute,
    private router: Router) {

}

ngOnInit(): void {
  this.getRoutes();
}


public getRoutes():void{
this.routeService.getRoutes().subscribe(data => {console.log(data);
this.routes=data;
this.dataSource.sort =this.sort;});
}

public getRoute():void{
  this.routeService.getRoute(this.routeId).subscribe(data => {console.log(data);
  this.route=data;
  this.dataSource.sort =this.sort;});
}

}
