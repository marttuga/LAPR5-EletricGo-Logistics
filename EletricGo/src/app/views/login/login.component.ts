import { Component, OnInit } from '@angular/core';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
import {UserService} from "../../services/node/user.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ROLE_URL = 'http://localhost:4200/api/views/';
  email:string;
  password:string;
  form: any  = {};
  isLoggedIn = false;
  isLoginFailed = false;
  showWMBoard = false;
  showAdminBoard = false;
  useremail: string;
  errorMessage: '';
  user: any;
  socialUser: SocialUser;
  loggedIn: any;
  constructor(private authService: SocialAuthService, private userService: UserService, public router : Router) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((u) => {
      if (u.idToken) {
        this.socialUser = u;
        console.log(this.socialUser);
        sessionStorage.setItem("google-user", JSON.stringify(u));
        this.userService.getUserByEmail(this.socialUser.email).subscribe(data => {console.log(data)
          this.user = data;
          this.isLoggedIn = true;
          if(this.roles.includes(this.user.role)){
            this.callFunction(this.user.role)
          }
        });
      }
    });
  }

  roles: string[] = [
    "Warehouse_Manager",
    "Logistics Manager",
    "Fleet Manager",
    "Admin",
    "Client"
  ];

  callFunction(choice:string){
    switch(choice) {
      case "Warehouse_Manager": {
        this.showWMBoard = true;
        break;
      }
      case "Admin":{
        this.showAdminBoard = true;
        break;
      }
    }
  }

  signIn():void{
    this.userService.logUser(this.form.email,this.form.password).subscribe(data => {console.log(data)
      this.user = data;
      this.isLoggedIn = true;
      sessionStorage.setItem("user-data", JSON.stringify(data));
      if(this.roles.includes(this.user.role)){
        this.callFunction(this.user.role)
      }
    });
  }

  /*login():void{
    this.aService.login(this.form).subscribe(res =>{
      console.log(res)
      if (res){
        localStorage.setItem('token', res['data']['authToken'])
        this.user = JSON.stringify(localStorage.getItem('token'))
        console.log(this.user)
        this.router.navigate(['views/Warehouse_Manager'])
      }
    });
  }*/

  signOut(): void {
    this.authService.signOut();
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }



}
