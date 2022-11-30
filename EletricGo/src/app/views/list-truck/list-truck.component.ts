import {TrucksService} from "../../services/node/truck.service";
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';  import {ActivatedRoute, Router} from "@angular/router";
  import {Observable} from "rxjs";

@Component({
  selector: 'app-list-truck',
  templateUrl: './list-truck.component.html',
  styleUrls: ['./list-truck.component.css']
})
export class ListTruckComponent implements OnInit {
  trucks: Truck[];
  truck:Truck;
licencePlate:string;
searchString: string;

  constructor( private truckService: TrucksService,
    private route: ActivatedRoute,
    private router: Router) {

}

ngOnInit(): void {
  this.getTrucks();
}


public getTrucks():void{
this.truckService.getTrucks().subscribe(data => {console.log(data);
this.trucks=data});
}

public getTruck():void{
  this.truckService.getTruck(this.licencePlate).subscribe(data => {console.log(data);
  this.truck=data});
}

public static turnOff(){
  let x1 = document.getElementById("chooseTruck");
  if(x1!=null){
    x1.style.display="none";
  }
}

  public static turnOn(){
    let x1 = document.getElementById("chooseTruck");
    if(x1!=null){
      x1.style.display="block";
    }
  }

}

