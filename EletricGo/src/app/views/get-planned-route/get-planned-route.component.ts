import { PathLocationStrategy } from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import {PlannedRouteService} from "../../services/node/plannedRoute.service";
import {TrucksService} from "../../services/node/truck.service";
import {WarehousesService} from "../../services/dotnet/warehouses.service";


@Component({
  selector: 'app-get-planned-route',
  templateUrl: './get-planned-route.component.html',
  styleUrls: ['./get-planned-route.component.css']
})
export class GetPlannedRouteComponent implements OnInit {
  @Input() networkChecker=false;
  @Output() getRouteAndTruckEvent = new EventEmitter<Map<string,string[]>>();

  plannedRoutes: PlannedRoute[];

  fleetPlaningId:string;
  truckId:string;
  date: string;
  totalTime: string;
  searchDate: string;
  routes: string[];
  plannedRoute:any;
  plannedRoutesNames: any;
  allTrucks:Truck[]=[];
  allWarehouses:Warehouse[]=[];
  choice: string;
  constructor(private  plannedRouteService:PlannedRouteService,private trucksService:TrucksService,private warehousesService:WarehousesService) {}




  ngOnInit(): void {
    //this.getPlannedRoutes();
    this.getAllTrucks();
    this.getAllWarehouses();
  }
  ngAfterViewInit(): void {
    this.turnOff(this.networkChecker);

  }

  submit = false;

  public getBestRoute():void{
    this.plannedRouteService.getBestRoute(this.date,this.truckId).subscribe(data => {
      this.transformer(data);
      this.transformerCity();
      this.getRouteAndTruck();
    });
    this.plannedRoutes=[];
    this.submit = !this.submit;
  }
  public getNearestWarehouse():void{
    this.plannedRouteService.getNearestWarehouse(this.date,this.truckId).subscribe(data => {console.log(data);
      this.transformer(data);
      this.transformerCity();
      this.getRouteAndTruck();
    });
    this.plannedRoutes=[];
    this.submit = !this.submit;

  }

  public getRouteGreaterMass():void{
    this.plannedRouteService.getRouteGreaterMass(this.date,this.truckId).subscribe(data => {console.log(data);
      this.transformer(data);
      this.transformerCity();
      this.getRouteAndTruck();
    });
    this.plannedRoutes=[];
    this.submit = !this.submit;
  }

  public getRouteBestRelation():void{
    this.plannedRouteService.getRouteBestRelation(this.date,this.truckId).subscribe(data => {console.log(data);
      this.transformer(data);
      this.transformerCity();
      this.getRouteAndTruck();
    });
    this.plannedRoutes=[];
    this.submit = !this.submit;
  }

  public turnOff(checker:boolean){
   if(checker){
    let x1=document.getElementById("navBar")
   /* let x2=document.getElementById("truck")
     let x3=document.getElementById("options-dropdown-truck")*/

     if(x1!=null/*&&x2!=null&&x3!=null*/) {
      x1.style.display = "none"
     /* x2.style.display = "none"
       x3.style.display = "block"*/

     }
    }
  }
  public getAllTrucks(){
    this.trucksService.getTrucks().subscribe(data=>{
      this.allTrucks=data;
    })
  }
  public getAllWarehouses(){
    this.warehousesService.getWarehouses().subscribe(data=>{
      this.allWarehouses=data;
    })
  }
  public getRouteAndTruck(){
    let map=new Map<string,string[]>();
    map.set(this.truckId,this.plannedRoute);
    this.getRouteAndTruckEvent.emit(map);

  }


  callFunction(){
    switch(this.choice) {
      case "bestRoute": {
        this.getBestRoute();
        break;
      }
      case "nearestWarehouse": {
        this.getNearestWarehouse();
        break;
      }
      case "greaterMass": {
        this.getRouteGreaterMass();
        break;
      }
      case "bestRelation": {
        this.getRouteBestRelation();
        break;
      }
    }
  }
  private transformer(data:any) {
    this.plannedRoute=[];
    for(let i=0;i<data.length;i++){
     let j= data[i].toString().length;
     if(j==1){
     this.plannedRoute[i]="W0"+data[i];
     }else {
       this.plannedRoute[i]="W"+data[i];
     }
    }
  }

  private transformerCity() {
    this.plannedRoutesNames=[];
    for(let i=0;i<this.plannedRoute.length;i++){
      for(let j=0;j<this.allWarehouses.length;j++){
        if(this.plannedRoute[i]==this.allWarehouses[j].warehouseIdentifier) {
          this.plannedRoutesNames[i]=this.allWarehouses[j].designation;
        }

      }
    }
  }


}
