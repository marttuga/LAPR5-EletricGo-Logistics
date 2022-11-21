import {TrucksService} from "../../services/node/truck.service";
  import { Component, OnInit } from '@angular/core';
  import {ActivatedRoute, Router} from "@angular/router";
  import {Observable} from "rxjs";

@Component({
  selector: 'app-list-truck',
  templateUrl: './list-truck.component.html',
  styleUrls: ['./list-truck.component.css']
})
export class ListTruckComponent implements OnInit {
  trucks: Truck[];



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

}

