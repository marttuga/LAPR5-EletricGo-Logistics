import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ListTruckComponent } from './list-truck.component';
import { FilterPipe } from "../../model/filterPipe";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

describe('ListTruckComponent', () => {
  let component: ListTruckComponent;
  let fixture: ComponentFixture<ListTruckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterPipe, ListTruckComponent, ],
      imports:[HttpClientTestingModule,FormsModule,RouterTestingModule,NgxPaginationModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should test ngOninit', () => {
    spyOn(component, 'getTrucks').and.callFake(() => null);
    component.ngOnInit();
    expect(component.getTrucks).toHaveBeenCalled();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  
});
