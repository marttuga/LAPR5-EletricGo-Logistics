import {TrucksService} from "../../../services/node/truck.service";
import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-list-truck',
  templateUrl: './list-truck.component.html',
  styleUrls: ['./list-truck.component.css']
})
export class ListTruckComponent implements OnInit {

  
  activeColumns = true;
  isActive = true;
  dataSource: any;
  displayedColumns=['licencePlate','active',];
  columns=['tare','capacity','maxBateryCapacity','autonomyFullChargeLoad','timeCharging'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  trucks: Truck[];
  truck:Truck;
  licencePlate: string;
  searchString: string;
  chosenTruck:string;
  p:number = 1;
active:boolean
  constructor( private truckService: TrucksService) {

}

ngOnInit(): void {
  //this.getActiveTrucks();
  this.getTrucks();
}

  ngAfterViewInit(): void {

  }


  public getTrucks():void{
    this.truckService.getTrucks().subscribe(data => {console.log(data);
      this.dataSource = new MatTableDataSource<Truck>(data);
      this.dataSource.paginator =this.paginator;
      this.dataSource.sort =this.sort;

    });
  }

  public getActiveTrucks():void{
    this.truckService.getActiveTrucks().subscribe(data => {console.log(data);
      this.trucks=data

    });
  }

  public changeStatustoInactive(licencePlate:string):void{
    this.truckService.changeStatustoInactive(licencePlate,false).subscribe(data => {console.log(data);
      this.truck=data});
      setTimeout(window.location.reload.bind(window.location),200);
  
  }
  
  public changeStatustoActive(licencePlate:string):void{
    this.truckService.changeStatustoActive(licencePlate,true).subscribe(data => {console.log(data);
      this.truck=data});
  
      setTimeout(window.location.reload.bind(window.location),200);
  
  }

public getTruck():void{
  this.truckService.getTruck(this.licencePlate).subscribe(data => {console.log(data);
    this.truck=data});
}

public changeStatus():void{
  this.truckService.changeStatus(this.truck.licencePlate,this.active).subscribe(data => {console.log(data);
    this.truck=data});

}

public get truckActive() { return (this.truck && this.truck.active) ? this.truck.active : [] } 

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
addColumns(){
  this.activeColumns=false;
  this.displayedColumns = this.displayedColumns.concat(this.columns);
}
hideColumns(){
  this.activeColumns=true;
  this.displayedColumns.splice(3,6);
}
}

