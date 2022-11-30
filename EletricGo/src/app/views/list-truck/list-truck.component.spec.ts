import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ListTruckComponent } from './list-truck.component';
import { FilterPipe } from "../model/filterPipe";

describe('ListTruckComponent', () => {
  let component: ListTruckComponent;
  let fixture: ComponentFixture<ListTruckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterPipe, ListTruckComponent ],
      imports:[HttpClientTestingModule,FormsModule,RouterTestingModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
