import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RoutesService} from "../../services/node/routes.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private routesService:RoutesService) { }

  ngOnInit(): void {
  }

/*  private test(){
    this.routesService.getWarehouses().subscribe(data=>{
      console.log(data)
    })
  }*/


  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }

}
