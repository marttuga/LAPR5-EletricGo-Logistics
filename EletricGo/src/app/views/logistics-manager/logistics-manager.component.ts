import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/node/auth.service";
import {SocialAuthService} from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-logistics-manager',
  templateUrl: './logistics-manager.component.html',
  styleUrls: ['./logistics-manager.component.css']
})
export class LogisticsManagerComponent implements OnInit {

  constructor(public router: Router,private aService: SocialAuthService) { }


  OnLogout(){
    this.aService.signOut();
    localStorage.removeItem('token')
    this.router.navigate(['login'])
  }

  ngOnInit(): void {
  }

}
