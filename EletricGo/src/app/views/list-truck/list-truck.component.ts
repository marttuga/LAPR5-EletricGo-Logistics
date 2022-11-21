import {TrucksService} from "../../services/node/truck.service";
  import { Component, OnInit } from '@angular/core';
  import {ActivatedRoute, Router} from "@angular/router";
  import {Observable} from "rxjs";

@Component({
  selector: 'app-list-truck',
  templateUrl: './list-truck.component.html',
  styleUrls: ['./list-truck.component.css']
})
export class ListTruckComponent implements OnInit {
  truck:Truck;
  licencePlate:string;
  tare:number;
  capacity:number;
  maxBateryCapacity:number;
  autonomyFullChargeLoad:number;
  timeCharging:number;

  constructor( private truckService: TrucksService,
    private route: ActivatedRoute,
    private router: Router) {

}

ngOnInit(): void {
}


public getTrucks():void{
this.truckService.getTrucks().subscribe(data => {console.log(data);
this.truck=data});
}

}
