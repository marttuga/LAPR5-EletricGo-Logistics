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



  public extractData(res: any) {
    return res || { };
  }


}
