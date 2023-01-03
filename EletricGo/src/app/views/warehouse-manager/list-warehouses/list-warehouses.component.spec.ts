import { ComponentFixture, TestBed } from '@angular/core/testing';
<<<<<<< HEAD:EletricGo/src/app/views/list-warehouses/list-warehouses.component.spec.ts
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../model/filterPipe';
=======

>>>>>>> 3746633b24eb3bdfdd1c8ec5bcb36a2dc9817ed1:EletricGo/src/app/views/warehouse-manager/list-warehouses/list-warehouses.component.spec.ts
import { ListWarehousesComponent } from './list-warehouses.component';

describe('ListWarehousesComponent', () => {
  let component: ListWarehousesComponent;
  let fixture: ComponentFixture<ListWarehousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
<<<<<<< HEAD:EletricGo/src/app/views/list-warehouses/list-warehouses.component.spec.ts
      declarations: [ FilterPipe,ListWarehousesComponent ],
      imports:[HttpClientTestingModule,FormsModule,RouterTestingModule,NgxPaginationModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
=======
      declarations: [ ListWarehousesComponent ]
>>>>>>> 3746633b24eb3bdfdd1c8ec5bcb36a2dc9817ed1:EletricGo/src/app/views/warehouse-manager/list-warehouses/list-warehouses.component.spec.ts
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListWarehousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
