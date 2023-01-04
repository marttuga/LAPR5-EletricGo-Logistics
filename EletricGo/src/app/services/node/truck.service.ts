import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TrucksService {
   Url = 'http://localhost:3000/api/truck';
   //https://lapr5-nodejs.herokuapp.com/

  constructor(private httpClient: HttpClient) { }

  getTrucks(): Observable<any> {
    return this.httpClient.get<any>(this.Url + '/getAll').pipe( map(this.extractData));
  }
  getActiveTrucks(): Observable<any> {
    return this.httpClient.get<any>(this.Url + '/getAllActive').pipe( map(this.extractData));
  }

  getTruck(licencePlate: string): Observable<any> {
    return this.httpClient.get(this.Url + '/getTruck/' +licencePlate).pipe( map(this.extractData));
  }
  changeStatustoInactive(licencePlate: string,active:boolean) {
    const body={"active":active}
    return this.httpClient.patch(this.Url + '/changeStatustoInactive/' +licencePlate,body).pipe(map(this.extractData));
  }
  changeStatustoActive(licencePlate: string,active:boolean){
    const body={"active":active}
    return this.httpClient.patch(this.Url + '/changeStatustoActive/' +licencePlate,body).pipe(map(this.extractData));
  }
  changeStatus(licencePlate: string,active:boolean){
    const body={"active":active}
    return this.httpClient.put(this.Url + '/changeStatus/' +licencePlate,body).pipe(map(this.extractData));
  }
  createTruck(licencePlate: string,tare:number,capacity:number,maxBateryCapacity:number,autonomyFullChargeLoad: number, timeCharging: number) {
    const body={"licencePlate":licencePlate, "tare":tare, "capacity":capacity, "maxBateryCapacity":maxBateryCapacity, "autonomyFullChargeLoad": autonomyFullChargeLoad, "timeCharging":timeCharging};
    return this.httpClient.post(this.Url + '/createTruck',body).pipe(map(this.extractData) );

  }



/*   updateTruck(licencePlate: string,tare:number,capacity:number,maxBateryCapacity:number,autonomyFullChargeLoad: number, timeCharging: number){
    const body={"tare":tare, "capacity":capacity, "maxBateryCapacity":maxBateryCapacity, "autonomyFullChargeLoad": autonomyFullChargeLoad, "timeCharging":timeCharging};
  console.log(body);
    return this.httpClient.put(this.Url + '/updateTruck' +licencePlate,body)
      .pipe(map(this.extractData)
      );
  }
 */

  public extractData(res: any) {
    return res || { };
  }


}
