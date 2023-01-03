import { Component, OnInit,ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WarehousesService} from "../../../services/dotnet/warehouses.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from "@angular/material/sort";



@Component({
  selector: 'app-list-warehouses',
  templateUrl: './list-warehouses.component.html',
  styleUrls: ['./list-warehouses.component.css']
})

export class ListWarehousesComponent implements OnInit{

    activeColumns = true;
    isActive = true;
    dataSource: any;
    displayedColumns=['warehouseIdentifier','designation','status',];
    columns=['latitude','longitude','street','doorNumber','city','zipCode','warehouseAltitude'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;



    constructor(private warehouseService: WarehousesService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit(): void {
    this.listWarehouses()
    }



    public listWarehouses(): void {
      this.warehouseService.getWarehouses().subscribe(data => {
        console.log(data);
      this.dataSource = new MatTableDataSource<Warehouse>(data);
      this.dataSource.paginator =this.paginator;
      this.dataSource.sort =this.sort;

    });
  }
    public inhibitWarehouse(id:string): void {
      this.warehouseService.softDelete(id).subscribe(data => {
        console.log(data);
      setTimeout(window.location.reload.bind(window.location),200);
    });

  }

  public activateWarehouse(id:string): void {
    this.warehouseService.activate(id).subscribe(data => {
      console.log(data);
       setTimeout(window.location.reload.bind(window.location),200);
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
