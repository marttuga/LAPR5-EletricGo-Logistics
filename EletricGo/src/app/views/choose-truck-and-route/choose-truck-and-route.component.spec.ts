import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseTruckAndRouteComponent } from './choose-truck-and-route.component';

describe('ChooseTruckAndRouteComponent', () => {
  let component: ChooseTruckAndRouteComponent;
  let fixture: ComponentFixture<ChooseTruckAndRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseTruckAndRouteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseTruckAndRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
