import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterPipe } from '../model/filterPipe';
import { GetPlannedRouteComponent } from './get-planned-route.component';

describe('GetPlannedRouteComponent', () => {
  let component: GetPlannedRouteComponent;
  let fixture: ComponentFixture<GetPlannedRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetPlannedRouteComponent,   FilterPipe ],
  
      imports:[HttpClientTestingModule,FormsModule,RouterTestingModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetPlannedRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
