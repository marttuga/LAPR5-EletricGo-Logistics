import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPlannedRouteComponent } from './get-planned-route.component';

describe('GetPlannedRouteComponent', () => {
  let component: GetPlannedRouteComponent;
  let fixture: ComponentFixture<GetPlannedRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetPlannedRouteComponent ]
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
