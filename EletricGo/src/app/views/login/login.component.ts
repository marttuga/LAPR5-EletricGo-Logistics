import { Component, OnInit } from '@angular/core';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
import {UserService} from "../../services/node/user.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "../../services/node/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  response:string;
  role:string;
  aToken:string;
  form: any  = {};
  isLoggedIn = false;
  isLoginFailed = false;
  socialUser: SocialUser;
  constructor(private authService: SocialAuthService,private aService : AuthService, private userService: UserService, public router : Router) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((u) => {
      if (u.idToken) {
        this.socialUser = u
        this.aToken = this.socialUser.idToken.slice(1,-1)
        console.log(this.socialUser)
        this.aService.loginGoogle(this.socialUser.email, this.aToken).subscribe(res =>{
          if (res) {
            localStorage.setItem("token", this.aToken);
            this.role = res['data']['existUser']['_value']['role']
            if(this.roles.includes(this.role)) {
              this.callFunction(this.role)
              this.isLoggedIn = true;
            }
          }
        });
      }
    });

  }

  roles: string[] = [
    "warehouse-manager",
    "logistics-manager",
    "fleet-manager",
    "admin"
  ];



  login():void{
    this.aService.login(this.form).subscribe(res =>{
      if (res && res['status'] === 'ok'){
        localStorage.setItem('token', res['data']['authToken'])
        this.role = res['data']['existUser']['_value']['role']
        if(this.roles.includes(this.role)) {
          this.callFunction(this.role)
        }
        this.isLoggedIn = true;
      }else if(res && res['status'] === 'error'){
        this.response = res['data']['response']
        this.isLoginFailed = true
      }
    });
  }

  callFunction(choice:string){
    switch(choice) {
      case "warehouse-manager": {
        this.router.navigate(['warehouse-manager'])
        break;
      }
      case "admin":{
        this.router.navigate(['admin-page'])
        break;
      }
      case "logistics-manager":{
        this.router.navigate(['logistics-manager'])
        break;
      }
      case "fleet-manager":{
        this.router.navigate(['fleet-manager'])
        break;
      }
    }
  }


  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }



}
