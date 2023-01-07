import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  order:number= 1;
  dataSource: any;
  searchForm: FormGroup;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private routeService: RoutesService,
    private activedRoute: ActivatedRoute,
    private router: Router) {

}

ngOnInit(): void {
  this.getRoutes();
}

key: string = 'warehouse';

sortByArrivalId(){
  this.order = - this.order;
  this.routes.sort((a,b) => (a.arrivalId < b.arrivalId ? -this.order : this.order));
}
sortByDepartureId(){
  this.order = - this.order;
  this.routes.sort((a,b) => (a.departureId < b.departureId ? -this.order : this.order));
}

sortByRouteId(){
  this.order = - this.order;
  this.routes.sort((a,b) => (a.routeId < b.routeId ? -this.order : this.order));
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
