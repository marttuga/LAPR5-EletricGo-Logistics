import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {UserService} from "../../../services/node/user.service";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

    firstName: string;
    lastName:string;
    email:string;
    password:string;
    role: string;
     userContact: number
    user:User;
    users:User[]


  ngOnInit(): void {
  }

  submit = false;


  public createUser():void{
    this.userService.createUser(this.firstName,this.lastName,this.email,this.password,this.role,this.userContact ).subscribe(data => {console.log(data);
    this.user =data});
 

    this.submit = !this.submit;
  }

}
