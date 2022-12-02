import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {TrucksService} from "../../services/node/truck.service";
import { CreateTruckComponent } from './create-truck.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from "@angular/router/testing";


describe('CreateTruckComponent', () => {
  let service: TrucksService;
  let component: CreateTruckComponent;
  let fixture: ComponentFixture<CreateTruckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,FormsModule,RouterTestingModule],
      declarations: [ CreateTruckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('component should be created',() => {
    const fixture = TestBed.createComponent(CreateTruckComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
    });


  it('should render NEED MORE TRUCKS? in h2', () => {
    const fixture = TestBed.createComponent(CreateTruckComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('NEED MORE TRUCKS?');
  });

  it('should render CREATE ANOTHER ONE in h3', () => {
    const fixture = TestBed.createComponent(CreateTruckComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('CREATE ANOTHER ONE');
  });




    
/*   it('should render Warnings in h4', () => {
    const fixture = TestBed.createComponent(CreateTruckComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h4')?.textContent).toContain('Warnings');
  }); */
});
