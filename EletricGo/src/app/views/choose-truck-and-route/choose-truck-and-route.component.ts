import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PlannedRouteService} from "../../services/node/plannedRoute.service";
import {TrucksService} from "../../services/node/truck.service";
import {WarehousesService} from "../../services/dotnet/warehouses.service";
import {RoutesService} from "../../services/node/routes.service";

@Component({
  selector: 'app-choose-truck-and-route',
  templateUrl: './choose-truck-and-route.component.html',
  styleUrls: ['./choose-truck-and-route.component.css']
})
export class ChooseTruckAndRouteComponent implements OnInit {
  @Output() getRouteAndTruckEvent = new EventEmitter<Map<string,string>>();

  allTrucks:Truck[]=[];
  allWarehouses:Warehouse[]=[];
  allRoutes:Route[]=[];

  manualTruckRoads:string[]=[]

  chosenTruck:string
  chosenRoad:string
  constructor(private  plannedRouteService:PlannedRouteService,private trucksService:TrucksService,private warehousesService:WarehousesService,private routesService:RoutesService) {}

  ngOnInit(): void {
    this.getAllTrucks();


  }
  public getAllTrucks(){
    this.trucksService.getTrucks().subscribe(data=>{
      this.allTrucks=data;
      this.getAllWarehouses()
    })
  }
  public getAllWarehouses(){
    this.warehousesService.getWarehouses().subscribe(data=>{
      this.allWarehouses=data;
      this.getAllRoutes()
    })
  }
  public getAllRoutes(){
    this.routesService.getRoutes().subscribe(data=>{
      this.allRoutes=data;
      this.path();
    })
  }

  public getRouteAndTruck(){

    setTimeout(() => {
      if (this.chosenTruck !== undefined) {
        let map = new Map<string, string>();
        map.set(this.chosenTruck, this.chosenRoad);
        this.getRouteAndTruckEvent.emit(map);
      }
    }, 1000); // wait for 1 second before executing the rest of the function
  }

  public path(){
    for(let i=0; i<this.allRoutes.length;i++){
      let w0= this.wareIdToWareDesignationConverter(this.allRoutes[i].departureId);
      let w1= this.wareIdToWareDesignationConverter(this.allRoutes[i].arrivalId);
      this.manualTruckRoads.push(w0.trim()+"-"+w1.trim());
      this.manualTruckRoads.push(w1.trim()+"-"+w0.trim());
    }
  }
  public wareIdToWareDesignationConverter(wareId:string):string{
    for(let i=0;i<this.allWarehouses.length;i++){
      if(this.allWarehouses[i].warehouseIdentifier==wareId){
        return this.allWarehouses[i].designation
      }
    }
    return "";
  }

}
