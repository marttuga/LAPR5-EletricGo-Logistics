import { Component, OnInit } from '@angular/core';
import {WarehousesService} from "../../services/dotnet/warehouses.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-list-warehouses',
  templateUrl: './list-warehouses.component.html',
  styleUrls: ['./list-warehouses.component.css']
})
export class ListWarehousesComponent implements OnInit {

  warehouses: Warehouse[];
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
  constructor(private warehouseService: WarehousesService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.listWarehouses();
  }

  public listWarehouses():void{
    this.warehouseService.getWarehouses().subscribe(data => {console.log(data);
      this.warehouses=data});
  }

}
