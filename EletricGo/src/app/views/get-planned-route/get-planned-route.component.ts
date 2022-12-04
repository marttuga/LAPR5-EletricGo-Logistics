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
  truckId: Truck;
  arrivalId: string;
  departureId: string;
  date: string;
  totalTime: string;
  searchDate: string;

  constructor( private plannedRouteService: PlannedRouteService,
    private route: ActivatedRoute,
    private router: Router) {

}

  ngOnInit(): void {
    //this.getPlannedRoutes();
  }

  // public getPlannedRoutes():void{
  //   //this.routeService.getRoutes().subscribe(data => {console.log(data);
  //   this.plannedRoutes=data});
  //   }

}
