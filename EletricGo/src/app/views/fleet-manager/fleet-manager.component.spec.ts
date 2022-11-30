import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { FleetManagerComponent } from './fleet-manager.component';

describe('FleetManagerComponent', () => {
  let component: FleetManagerComponent;
  let fixture: ComponentFixture<FleetManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FleetManagerComponent ],
      imports: [FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FleetManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render WELCOME in p', () => {
    const fixture = TestBed.createComponent(FleetManagerComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('WELCOME');
  });

  it('should render FLEET MANAGER! in h1', () => {
    const fixture = TestBed.createComponent(FleetManagerComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('FLEET MANAGER!');
  });
});
