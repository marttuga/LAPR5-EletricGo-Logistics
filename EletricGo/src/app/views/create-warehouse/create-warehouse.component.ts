import { Component, OnInit } from '@angular/core';
import {WarehousesService} from "../../services/dotnet/warehouses.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-create-warehouse',
  templateUrl: './create-warehouse.component.html',
  styleUrls: ['./create-warehouse.component.css']
})
export class CreateWarehouseComponent implements OnInit {

  warehouse:Warehouse;
 warehouseIdentifier:string;
 designation:string;
 latitude:number;
 longitude:number;
 street:string;
 doorNumber:number;
 city:string;
 zipcode:string;
 altitude:string;



  constructor( private warehouseService: WarehousesService,
               private route: ActivatedRoute,
               private router: Router) {

  }

  ngOnInit(): void {
  }

  public createWarehouse():void{
    this.warehouseService.createWarehouse(this.warehouseIdentifier,this.designation,this.latitude,this.longitude,this.street,this.doorNumber,this.city,this.zipcode,this.altitude).subscribe(data => {console.log(data);
    this.warehouse=data});
  }

}
