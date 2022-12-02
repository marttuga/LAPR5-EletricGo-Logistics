import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {TrucksService} from "../../services/node/truck.service";
import { CreateTruckComponent } from './create-truck.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from "@angular/router/testing";
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';


describe('CreateTruckComponent', () => {
  let service: TrucksService;
  let component: CreateTruckComponent;
  let fixture: ComponentFixture<CreateTruckComponent>;
  let debugElement: DebugElement;
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

/*   it('should hide contents if show is false', () => {
    // should be rendered initially
    expect(debugElement.query(By.css('.textfield')).nativeElement).toBeTruthy();
    //trigger change
    const button = debugElement.query(By.css('button')).nativeElement;
    button.click();   // this will change show to false
    fixture.detectChanges();
    // should not be rendered
    expect(debugElement.query(By.css('.textfield')).nativeElement).toBeFalsy();
}); */


    
/*   it('should render Warnings in h4', () => {
    const fixture = TestBed.createComponent(CreateTruckComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h4')?.textContent).toContain('Warnings');
  }); */
});
