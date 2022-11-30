import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterPipe } from '../model/filterPipe';
import { ListDeliveriesComponent } from './list-deliveries.component';

describe('ListDeliveriesComponent', () => {
  let component: ListDeliveriesComponent;
  let fixture: ComponentFixture<ListDeliveriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterPipe, ListDeliveriesComponent ],
      imports:[HttpClientTestingModule,FormsModule,RouterTestingModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
