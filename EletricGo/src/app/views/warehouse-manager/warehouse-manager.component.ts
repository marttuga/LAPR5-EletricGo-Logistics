import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-warehouse-manager',
  templateUrl: './warehouse-manager.component.html',
  styleUrls: ['./warehouse-manager.component.css']
})
export class WarehouseManagerComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
    /*if (localStorage.getItem('token')){
      this.authService.goToWarehouseManager(localStorage.getItem('token')).subscribe(res=>{
        if(res  && res['status']==='ok'){
          console.log('eheh')
        }
      })
    }*/
  }

  OnLogout(){
    localStorage.removeItem('token')
    this.router.navigate(['views/login'])
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }

}
