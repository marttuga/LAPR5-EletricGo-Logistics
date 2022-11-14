import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WarehousesService {
  private Url = 'https://localhost:5001/api/warehouses/';

  constructor(private httpClient: HttpClient) { }

  createWarehouse(warehouseIdentifier:string,designation:string,latitude:number,longitude:number,street:string,doorNumber:number,city:string,zipcode:string,altitude:string): Observable<any> {
    const body={
      "warehouseIdentifier": {
        "warehouseIdentifier": warehouseIdentifier
      },
      "Designation": {
        "Designation": designation
      },
      "Coordinates": {
        "Latitude":latitude,
        "Longitude":longitude
      },
      "Address":  {
        "Street":street,
        "DoorNumber": doorNumber,
        "City":city,
        "zipCode":zipcode
      },
      "WarehouseAltitude": {
        "WarehouseAltitude": altitude
      }
    }
    ;
    return this.httpClient.post(this.Url ,body).pipe(map(this.extractData));
  }

  public extractData(res: any) {
    return res || { };
  }
}
