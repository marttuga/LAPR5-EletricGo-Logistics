import { Component, OnInit } from '@angular/core';
import {RoutesService} from "../../../services/node/routes.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.css']
})
export class CreateRouteComponent implements OnInit {

  route: Route;
routeId: string;
distance: string;
routeTime: string;
batteryWaste: string;
arrivalId: string;
departureId: string;
extraTime: string;


  constructor( private routeService: RoutesService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
}

  ngOnInit(): void {
  }

  submit = false;

  public createRoute():void{
    this.routeService.createRoute(this.routeId,this.distance,this.routeTime,this.batteryWaste,this.arrivalId,this.departureId,this.extraTime).subscribe(data => {console.log(data);
    this.route=data});
    this.submit = !this.submit;
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }
}
