import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeliveriesService {
   Url = 'https://localhost:5001/api/Deliveries';

  constructor(private httpClient: HttpClient) { }

  createDelivery(dIdentifier:string,date:number,mass:number,timeLoad:number,timeUnload:number,deliveryWarehouse:string): Observable<any> {
    const body={

      "DIdentifier":{
        "DIdentifier": dIdentifier
      } ,
      "Date": date,
      "Mass": mass,
      "TimeLoad": timeLoad,
      "TimeUnload": timeUnload,
      "DeliveryWarehouse":deliveryWarehouse,
    }
    ;
    return this.httpClient.post(this.Url ,body).pipe(map(this.extractData));
  }

  getDeliveries(): Observable<any> {
    return this.httpClient.get<any>(this.Url + '/getAll').pipe(
      map(this.extractData));
  }

  public extractData(res: any) {
    return res || { };
  }

  updateDelivery(dIdentifier:string,date:number,mass:number,timeLoad:number,timeUnload:number,deliveryWarehouse:string){
    const body={ 
    "Date": date,
    "Mass": mass,
    "TimeLoad": timeLoad,
    "TimeUnload": timeUnload,
    "DeliveryWarehouse":deliveryWarehouse,};
  console.log(body);
    return this.httpClient.put(this.Url + '/Update' + dIdentifier,body)
      .pipe(map(this.extractData)
      );
  }
}

