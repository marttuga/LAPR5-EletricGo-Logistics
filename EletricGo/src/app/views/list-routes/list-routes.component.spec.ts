import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterPipe } from '../model/filterPipe';
import { ListRoutesComponent } from './list-routes.component';

describe('ListRoutesComponent', () => {
  let component: ListRoutesComponent;
  let fixture: ComponentFixture<ListRoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterPipe, ListRoutesComponent ],
      imports:[HttpClientTestingModule,FormsModule,RouterTestingModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
