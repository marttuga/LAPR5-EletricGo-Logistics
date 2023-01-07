import { Component, OnInit , ViewChild, Pipe, PipeTransform} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {DeliveriesService} from "../../../services/dotnet/deliveries.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


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
  order:number= 1;
  delivery:Delivery;
  dIdentifier:string;
 date:number;
 mass:number;
 timeLoad:number;
 timeUnload:number;
 deliveryWarehouse:string;
 p:number = 1;
 dataSource: any;
 searchForm: FormGroup;
 @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private deliveryService: DeliveriesService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.listDeliveries();
  }

  public listDeliveries():void{
    this.deliveryService.getDeliveries().subscribe(data => {console.log(data);
      this.deliveries=data;
      this.dataSource = new MatTableDataSource<Delivery>(data);
     });
  }

  key: string = 'date';


  sortByDate() {
    this.order = - this.order;
    this.deliveries.sort((a,b) => (a.date < b.date ? -this.order : this.order));
  }

  sortByDeliveryWarehouse(){
    this.order = - this.order;
    this.deliveries.sort((a,b) => (a.deliveryWarehouse < b.deliveryWarehouse ? -this.order : this.order));
  }





 
}