import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {WarningService} from "../../services/warning.service";


@Injectable({
  providedIn: 'root'
})
export class TrucksService {
  private Url = 'http://localhost:3000/api/truck';

  constructor(private httpClient: HttpClient, private warningService: WarningService) { }

  getTrucks(): Observable<any> {
    return this.httpClient.get(this.Url + '/getAll').pipe(
      map(this.extractData));
  }

  getTruck(licencePlate: string): Observable<any> {
    return this.httpClient.get(this.Url + '/getTruck/:licencePlate' +licencePlate).pipe(
      map(this.extractData));
  }

  createTruck(licencePlate: string,tare:number,capacity:number,maxBateryCapacity:number,autonomyFullChargeLoad: number, timeCharging: number) {
    const body={"licencePlate":licencePlate, "tare":tare, "capacity":capacity, "maxBateryCapacity":maxBateryCapacity, "autonomyFullChargeLoad": autonomyFullChargeLoad, "timeCharging":timeCharging};
    console.log(body);
    return this.httpClient.post(this.Url + '/createTruck',body)
      .pipe(map(this.extractData)
      );

  }

  updateTruck(licencePlate: string,tare:number,capacity:number,maxBateryCapacity:number,autonomyFullChargeLoad: number, timeCharging: number){
    const body={"tare":tare, "capacity":capacity, "maxBateryCapacity":maxBateryCapacity, "autonomyFullChargeLoad": autonomyFullChargeLoad, "timeCharging":timeCharging};
  console.log(body);
    return this.httpClient.put(this.Url + '/updateTruck' +licencePlate,body)
      .pipe(map(this.extractData)
      );
  }
 

  public extractData(res: any) {
    return res || { };
  }


  log(warning:string){
    this.warningService.add('INVALID DATA: \n${warning}');
  }
  

createValidateTruck(licencePlate: string,tare:number,capacity:number,maxBateryCapacity:number,autonomyFullChargeLoad: number, timeCharging: number): Observable<any> | null{
  if(this.validateInfo(licencePlate,tare,capacity,maxBateryCapacity,autonomyFullChargeLoad, timeCharging)){
      return this.createTruck(licencePlate,tare,capacity,maxBateryCapacity,autonomyFullChargeLoad,timeCharging);

  }else return null;
}

  validateInfo(licencePlate: string,tare:number,capacity:number,maxBateryCapacity:number,autonomyFullChargeLoad: number, timeCharging: number): boolean{
    let flag:boolean=true;

    if(licencePlate.length!=8){
      this.log("Please insert a licence plate of this format: XX-00-XX");
    flag=false;
    }

    if(tare<3000 || tare>20000){
      this.log("Please insert a tare between 3000kg and 20000kg ");
    flag=false;
    }

    if(capacity<2000 || capacity>20000){
      this.log("Please insert a capacity between 2000kg and 20000kg ");
    flag=false;
    }

    if(maxBateryCapacity<80 || maxBateryCapacity>200){
      this.log("Please insert a batery capacity between 80kWh and 200kWh ");
    flag=false;
    }

    if(autonomyFullChargeLoad<100 || autonomyFullChargeLoad>8000){
      this.log("Please insert a autonomy between 100km and 8000km ");
    flag=false;
    }

    if(timeCharging<1 || timeCharging>5){
      this.log("Please insert a capacity between between 1h and 5h ");
    flag=false;
    }
    
    return flag;

  }
 

}
