import { Component, OnInit , ViewChild} from '@angular/core';
import {DeliveriesService} from "../../../services/dotnet/deliveries.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-list-deliveries',
  templateUrl: './list-deliveries.component.html',
  styleUrls: ['./list-deliveries.component.css']
})

export class ListDeliveriesComponent implements OnInit {
  activeColumns = true;
  searchDate: string;
  searchDeliveryWarehouse: string;
  deliveries: Delivery[];
  delivery:Delivery;
  dIdentifier:string;
 date:number;
 mass:number;
 timeLoad:number;
 timeUnload:number;
 deliveryWarehouse:string;
 p:number = 1;
 dataSource: any;
 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;


  constructor(private deliveryService: DeliveriesService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.listDeliveries();
  }

  public listDeliveries():void{
    this.deliveryService.getDeliveries().subscribe(data => {console.log(data);
      this.deliveries=data;
      this.dataSource.sort =this.sort;});
  }
  


}
