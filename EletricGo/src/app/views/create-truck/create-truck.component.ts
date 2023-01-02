import {TrucksService} from "../../services/node/truck.service";
  import { Component, OnInit } from '@angular/core';
  import {ActivatedRoute, Router} from "@angular/router";
  import {Observable} from "rxjs";


@Component({
  selector: 'app-create-truck',
  templateUrl: './create-truck.component.html',
  styleUrls: ['./create-truck.component.css']
})
export class CreateTruckComponent implements OnInit {

 truck:Truck;
 licencePlate:string;
 tare:number;
 capacity:number;
 maxBateryCapacity:number;
 autonomyFullChargeLoad:number;
 timeCharging:number;
 active:true;


  constructor( private truckService: TrucksService,
               private route: ActivatedRoute,
               private router: Router) {

  }

  ngOnInit(): void {
  }

  submit = false;


  public createTruck():void{
    this.truckService.createTruck(this.licencePlate,this.tare,this.capacity,this.maxBateryCapacity,this.autonomyFullChargeLoad,this.timeCharging ).subscribe(data => {console.log(data);
    this.truck=data});
    this.submit = !this.submit;
  }
  
 
}
