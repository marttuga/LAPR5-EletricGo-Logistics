import { Component, OnInit } from '@angular/core';
import {DeliveriesService} from "../../services/dotnet/deliveries.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-create-delivery',
  templateUrl: './create-delivery.component.html',
  styleUrls: ['./create-delivery.component.css']
})

export class CreateDeliveryComponent implements OnInit {

 delivery:Delivery;
 dIdentifier:string;
 date:number;
 mass:number;
 timeLoad:number;
 timeUnload:number;
 deliveryWarehouse:string;



  constructor( private deliveryService: DeliveriesService,
               private route: ActivatedRoute,
               private router: Router) {

  }

  ngOnInit(): void {
  }

  public createDelivery():void{
    this.deliveryService.createDelivery(this.dIdentifier,this.date,this.mass,this.timeLoad,this.timeUnload, this.deliveryWarehouse).subscribe(data => {console.log(data);
    this.delivery=data});
  }

}
