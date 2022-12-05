import { PathLocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import {PlannedRouteService} from "../../services/node/plannedRoute.service";


@Component({
  selector: 'app-get-planned-route',
  templateUrl: './get-planned-route.component.html',
  styleUrls: ['./get-planned-route.component.css']
})
export class GetPlannedRouteComponent implements OnInit {

  plannedRoutes: PlannedRoute[];
  fleetPlaningId:string;
  truckId:string;
  date: string;
  totalTime: string;
  searchDate: string;
  routes: string[];
  plannedRoute:any;

  constructor(private  plannedRouteService:PlannedRouteService) {

}

  ngOnInit(): void {
    //this.getPlannedRoutes();
  }
  submit = false;

  public getAllRoutesOnDate():void{
    this.plannedRouteService.getAllRoutesOnDate(this.date).subscribe(data => {console.log(data.final_route);
      this.plannedRoutes=data.final_route});
      this.submit = !this.submit;
  }

  public getBestRoute():void{
    this.plannedRouteService.getBestRoute(this.date,this.truckId).subscribe(data => {
      this.plannedRoute=data.best_route;
      this.plannedRoutes=[];
      console.log(this.plannedRoute)


    });
      this.submit = !this.submit;
  }
  public getNearestWarehouse():void{
    this.plannedRouteService.getNearestWarehouse(this.date,this.truckId).subscribe(data => {console.log(data);
      this.plannedRoute=data.route_nearest_warehouse});
    this.plannedRoutes=[];
    this.submit = !this.submit;
  }

  public getRouteGreaterMass():void{
    this.plannedRouteService.getRouteGreaterMass(this.date,this.truckId).subscribe(data => {console.log(data);
      this.plannedRoute=data.route_plus_mass});
    this.plannedRoutes=[];
    this.submit = !this.submit;
  }

  public getRouteBestRelation():void{
    this.plannedRouteService.getRouteBestRelation(this.date,this.truckId).subscribe(data => {console.log(data);
      this.plannedRoute=data.route_best_relation});
    this.plannedRoutes=[];
    this.submit = !this.submit;
  }


}
