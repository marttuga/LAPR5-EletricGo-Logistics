import { Component, OnInit } from '@angular/core';
import { PlannedRouteService } from '../services/node/plannedRoute.service';

@Component({
  selector: 'app-list-planned-routes',
  templateUrl: './list-planned-routes.component.html',
  styleUrls: ['./list-planned-routes.component.css']
})
export class ListPlannedRoutesComponent implements OnInit {

  plannedRoutes: PlannedRoute[];
  fleetPlaningId:string;
  truckId:string;
  date: string;
  routes: string[];
  plannedRoute:PlannedRoute;

  searchString: string;
  chosenTruck:string;

  constructor( private prService: PlannedRouteService) {

}

ngOnInit(): void {
  //this.getActiveTrucks();
  this.getPlanings();
}

  ngAfterViewInit(): void {

  }


  public getPlanings():void{
    this.prService.getPlanings().subscribe(data => {console.log(data);
      this.plannedRoutes=data

    });
  }

}
