import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/node/auth.service";
import {SocialAuthService} from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-fleet-manager',
  templateUrl: './fleet-manager.component.html',
  styleUrls: ['./fleet-manager.component.css']
})
export class FleetManagerComponent implements OnInit {

  constructor(public router: Router,private aService: SocialAuthService) { }

  ngOnInit(): void {
  }


  OnLogout(){
    this.aService.signOut();
    localStorage.removeItem('token')
    this.router.navigate(['login'])
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }
}
