import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrucksService } from 'src/app/services/node/truck.service';

@Component({
  selector: 'app-truck-status',
  templateUrl: './truck-status.component.html',
  styleUrls: ['./truck-status.component.css']
})
export class TruckStatusComponent implements OnInit {


 trucks: Truck[];
 truck:Truck;
 licencePlate: string;
 searchString: string;
 chosenTruck:string;
 activeT:true;
 activeF:false

  constructor( private truckService: TrucksService,
               private route: ActivatedRoute,
               private router: Router) {

  }

  ngOnInit(): void {
  }

  submit = false;
  submitt = false;
  submittt = false;


public changeStatustoInactive():void{
  this.truckService.changeStatustoInactive(this.truck.licencePlate,this.activeF).subscribe(data => {console.log(data);
    this.truck=data});
    this.submittt = !this.submittt;

}

public changeStatustoActive():void{
  this.truckService.changeStatustoActive(this.truck.licencePlate,this.activeT).subscribe(data => {console.log(data);
    this.truck=data});

    this.submitt = !this.submitt;

}
public getTruck():void{
  this.truckService.getTruck(this  .licencePlate).subscribe(data => {console.log(data);
    this.truck=data});
    console.log(this.licencePlate)
    console.log(this.truck)
    this.submit = !this.submit;

}
public get truckActive() { return (this.truck && this.truck.active) ? this.truck.active : [] } 

}