import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { GetPlannedRouteComponent } from './get-planned-route.component';

describe('GetPlannedRouteComponent', () => {
  let component: GetPlannedRouteComponent;
  let fixture: ComponentFixture<GetPlannedRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetPlannedRouteComponent ],
      imports:[HttpClientTestingModule,FormsModule,RouterTestingModule],
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