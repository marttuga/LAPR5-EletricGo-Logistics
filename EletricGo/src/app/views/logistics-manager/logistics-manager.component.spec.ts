import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LogisticsManagerComponent } from './logistics-manager.component';

describe('LogisticsManagerComponent', () => {
  let component: LogisticsManagerComponent;
  let fixture: ComponentFixture<LogisticsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogisticsManagerComponent ],
      imports:[FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogisticsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render Welcome back! in h1', () => {
    const fixture = TestBed.createComponent(LogisticsManagerComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Welcome back!');
  });

});
