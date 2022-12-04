import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from "@angular/forms";
import { RouterTestingModule } from '@angular/router/testing';

import { CreateDeliveryComponent } from './create-delivery.component';

describe('CreateDeliveryComponent', () => {
  let component: CreateDeliveryComponent;
  let fixture: ComponentFixture<CreateDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDeliveryComponent ],
      imports:[HttpClientTestingModule,FormsModule,RouterTestingModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('component should create', () => {
    const fixture = TestBed.createComponent(CreateDeliveryComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });


  it('should render Enter all information here! in h2', () => {
    const fixture = TestBed.createComponent(CreateDeliveryComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Enter all information here!');
  });

});
