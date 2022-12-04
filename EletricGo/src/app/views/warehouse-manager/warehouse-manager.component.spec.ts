import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseManagerComponent } from './warehouse-manager.component';

describe('WarehouseManagerComponent', () => {
  let component: WarehouseManagerComponent;
  let fixture: ComponentFixture<WarehouseManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseManagerComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],

    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
