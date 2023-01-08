import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {Router} from "@angular/router";

const AUTH_API = 'http://localhost:3000/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};
@Injectable({
  providedIn:'root'
})
export class AuthService{

  constructor(private http: HttpClient,private router: Router) {}

  login(credentials):Observable<any>{
    console.log(credentials.email);
    return this.http.post(AUTH_API + 'signin',{
      "email":credentials.email,
      "password": credentials.password
    }, httpOptions).pipe( map(this.extractData))

  }

  goToWarehouseManager(token){
    const headers = new HttpHeaders({
      'Content-Type': 'application.json',
      'Authorization': 'Bearer ${token}'
    })
    return this.http.get(AUTH_API + 'warehouse-manager', {headers:headers})
  }

  register(user):Observable<any>{
    return this.http.post(AUTH_API + 'signup',{
      email: user.email,
      password: user.password
    }, httpOptions)
  }

  redirectToHome(): void {
    if (sessionStorage.getItem("user-data")) {
      this.redirect('views/login');
    }
  }


  redirect(url: string): void {
    this.router.navigate([url]).then();
  }

  public extractData(res: any) {
    return res || { };
  }
}
