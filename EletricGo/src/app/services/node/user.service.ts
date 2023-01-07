import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
   Url = 'http://localhost:3000/api/user';
   //https://lapr5-nodejs.herokuapp.com/

  constructor(private httpClient: HttpClient) { }


  getUsers(): Observable<any> {
    return this.httpClient.get<any>(this.Url + '/getAll').pipe( map(this.extractData));
  }

  logUser(email: string, password: string): Observable<any> {
    return this.httpClient.get(this.Url + '/getUser/'+ email +'/'+password).pipe(map(this.extractData));
  }
  logUserContact(contact: number, password: string): Observable<any> {
    return this.httpClient.get(this.Url + '/getUserContact/'+ contact +'/'+password).pipe(map(this.extractData));
  }


  getUserByEmail(email: string): Observable<any> {
    return this.httpClient.get(this.Url + '/getUserByEmail/' +email).pipe( map(this.extractData));
  }
  getUserByPhone(contact: number): Observable<any> {
    return this.httpClient.get(this.Url + '/getUserByPhone/' +contact).pipe( map(this.extractData));
  }

  createUser(firstName: string,lastName:string,email:string,password:string,role: string, userContact: number) {
    const body={"firstName":firstName, "lastName":lastName, "email":email, "password":password, "role": role, "userContact":userContact};
    return this.httpClient.post(this.Url + '/createUser',body).pipe(map(this.extractData) );

  }
  deleteAccountByEmail(email: string): Observable<any> {
    return this.httpClient.get(this.Url + '/deleteAccountByEmail/' +email).pipe( map(this.extractData));
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
    return this.httpClient.patch(this.Url + '/changeStatus/' +licencePlate,body).pipe(map(this.extractData));
  }


  public extractData(res: any) {
    return res || { };
  }


}
