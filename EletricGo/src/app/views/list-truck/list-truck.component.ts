import {TrucksService} from "../../services/node/truck.service";
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-list-truck',
  templateUrl: './list-truck.component.html',
  styleUrls: ['./list-truck.component.css']
})
export class ListTruckComponent implements OnInit {
  @Output() getTruckLicencePlateEvent = new EventEmitter<string>();
  @Input() networkChecker=0;

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

  ngAfterViewInit(): void {
   this.turnOn();

  }


  public getTruckLicencePlate(value: string) {
    this.chosenTruck=value;
    this.getTruckLicencePlateEvent.emit(value);
  }

  public getTrucks():void{
    this.truckService.getTrucks().subscribe(data => {console.log(data);
      this.trucks=data

    });
  }

public getTruck():void{
  this.truckService.getTruck(this.licencePlate).subscribe(data => {console.log(data);
    this.truck=data});
}
  public turnOn() {
    let element1 = document.getElementById("ARQSI");
    let element2 = document.getElementById("SGRAI");
    if (element1 != null&&element2!=null) {
      if (this.networkChecker == 1) {
        element1.style.display = "none"
        element2.style.display = "block"
      } else {
        element1.style.display = "block"
        element2.style.display = "none"
      }
    }
  }
}

