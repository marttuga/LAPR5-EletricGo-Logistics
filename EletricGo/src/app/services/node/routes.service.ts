import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  private Url = 'http://localhost:3000/api/routes/';

  constructor(private httpClient: HttpClient) { }

  public getWarehouses(): Observable<any> {
    return this.httpClient.get(this.Url + 'getRoutes').pipe(
      map(this.extractData));
  }

  public extractData(res: any) {
    return res || { };
  }
}
