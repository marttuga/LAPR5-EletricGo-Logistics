import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeliveriesService {
  private Url = 'https://localhost:5001/api/deliveries/';

  constructor(private httpClient: HttpClient) { }

  createDelivery(dIdentifier:string,date:number,mass:number,timeLoad:number,timeUnload:number): Observable<any> {
    const body={
      "DIdentifier": {
        "DIdentifier": dIdentifier
      },

      "Date": date,
       
      "Mass": mass,

      "TimeLoad": timeLoad,

      "TimeUnload": timeUnload,
    }
    ;
    return this.httpClient.post(this.Url ,body).pipe(map(this.extractData));
  }

  public extractData(res: any) {
    return res || { };
  }
}

