import {TrucksService} from "../../services/node/truck.service";
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-list-truck',
  templateUrl: './list-truck.component.html',
  styleUrls: ['./list-truck.component.css']
})
export class ListTruckComponent implements OnInit {


  trucks: Truck[];
  truck:Truck;
  licencePlate: string;
  searchString: string;
  chosenTruck:string;
  p:number = 1;

  constructor( private truckService: TrucksService) {

}

ngOnInit(): void {
  this.getActiveTrucks();
  //this.getTrucks();
}

  ngAfterViewInit(): void {

  }


  public getTrucks():void{
    this.truckService.getTrucks().subscribe(data => {console.log(data);
      this.trucks=data

    });
  }

  public getActiveTrucks():void{
    this.truckService.getActiveTrucks().subscribe(data => {console.log(data);
      this.trucks=data

    });
  }

public getTruck():void{
  this.truckService.getTruck(this.licencePlate).subscribe(data => {console.log(data);
    this.truck=data});
}

}

