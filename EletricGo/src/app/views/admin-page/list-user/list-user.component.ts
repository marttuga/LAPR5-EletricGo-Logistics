import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/node/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
 
  activeColumns = true;
  isActive = true;
  dataSource: any;
  displayedColumns=['email'/* ,'password' */,'role','active',];
  columns=['firstName','lastName','userContact'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  users: User[];
  user:User;
  firstName: string;
  lastName:string;
  email:string;
  password:string;
  role: string;
   userContact: number;
  p:number = 1;
active:boolean

constructor(private userService: UserService,
  private route: ActivatedRoute,
  private router: Router) { }


  ngOnInit(): void {
    //this.getActiveusers();
    this.getUsers();
  }


  public getUsers():void{
    this.userService.getUsers().subscribe(data => {console.log(data);
      this.dataSource = new MatTableDataSource<User>(data);
      this.dataSource.paginator =this.paginator;
      this.dataSource.sort =this.sort;

    });
  }


  public changeStatustoInactive(email:string):void{
    this.userService.changeStatustoInactive(email,false).subscribe(data => {console.log(data);
      this.user=data});
      setTimeout(window.location.reload.bind(window.location),200);
  
  }
  
  public changeStatustoActive(email:string):void{
    this.userService.changeStatustoActive(email,true).subscribe(data => {console.log(data);
      this.user=data});
  
      setTimeout(window.location.reload.bind(window.location),200);
  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  addColumns(){
    this.activeColumns=false;
    this.displayedColumns = this.displayedColumns.concat(this.columns);
  }
  hideColumns(){
    this.activeColumns=true;
    this.displayedColumns.splice(3,6);
  }

}
