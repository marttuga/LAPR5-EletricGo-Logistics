import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WarehousesService } from 'src/app/services/dotnet/warehouses.service';
import { PlannedRouteService } from '../../services/node/plannedRoute.service';

@Component({
  selector: 'app-list-planned-routes',
  templateUrl: './list-planned-routes.component.html',
  styleUrls: ['./list-planned-routes.component.css']
})
export class ListPlannedRoutesComponent implements OnInit {

  activeColumns = true;
  isActive = true;
  dataSource: any;
  displayedColumns=['fleetPlaningId','routes',];
  columns=['truckId','date','routesB','routesE'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  plannedRoutes: PlannedRoute[];
  fleetPlaningId:string;
  truckId:string;
  date: string;
  routes: string;
  plannedRoute:PlannedRoute;
  routesB: any;
  routesE: string;

  searchString: string;
  chosenTruck:string;
  p:number = 1;
  allWarehouses:Warehouse[]=[];
  plannedRoutesNames: any;

  constructor( private prService: PlannedRouteService,private warehousesService:WarehousesService) {

}

ngOnInit(): void {
  //this.getActiveTrucks();
  this.getPlanings();

}

  ngAfterViewInit(): void {

  }


  public getPlanings():void{
    this.prService.getPlanings().subscribe(data => {console.log(data);
      this.dataSource = new MatTableDataSource<PlannedRoute>(data);
      this.dataSource.paginator =this.paginator;
      this.dataSource.sort =this.sort;

    });
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


