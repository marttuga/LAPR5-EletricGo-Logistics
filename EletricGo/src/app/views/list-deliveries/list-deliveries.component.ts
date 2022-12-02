import { Component, OnInit } from '@angular/core';
import {DeliveriesService} from "../../services/dotnet/deliveries.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-list-deliveries',
  templateUrl: './list-deliveries.component.html',
  styleUrls: ['./list-deliveries.component.css']
})

export class ListDeliveriesComponent implements OnInit {

  searchString: string;
  deliveries: Delivery[];
  delivery:Delivery;
  dIdentifier:string;
 date:number;
 mass:number;
 timeLoad:number;
 timeUnload:number;
 deliveryWarehouse:string;
  constructor(private deliveryService: DeliveriesService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.listDeliveries();
  }

  public listDeliveries():void{
    this.deliveryService.getDeliveries().subscribe(data => {console.log(data);
      this.deliveries=data});
  }

}
