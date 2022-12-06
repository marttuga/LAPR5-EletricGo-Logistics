import {TrucksService} from "../../services/node/truck.service";
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';  import {ActivatedRoute, Router} from "@angular/router";
  import {Observable} from "rxjs";

@Component({
  selector: 'app-list-truck',
  templateUrl: './list-truck.component.html',
  styleUrls: ['./list-truck.component.css']
})
export class ListTruckComponent implements OnInit {
  @Output() getTruckLicencePlateEvent = new EventEmitter<string>();

  trucks: Truck[];
  truck:Truck;
  licencePlate: string;
  searchString: string;
  chosenTruck:string;


  constructor( private truckService: TrucksService) {

}

ngOnInit(): void {
  this.getTrucks();
  }

  public getTruckLicencePlate(value: string) {
    this.chosenTruck=value;
    this.getTruckLicencePlateEvent.emit(value);
  }

  public getTrucks():void{
    this.truckService.getTrucks().subscribe(data => {console.log(data);
      this.trucks=data});
  }

public getTruck():void{
  this.truckService.getTruck(this.licencePlate).subscribe(data => {console.log(data);
    this.truck=data});
}


}

