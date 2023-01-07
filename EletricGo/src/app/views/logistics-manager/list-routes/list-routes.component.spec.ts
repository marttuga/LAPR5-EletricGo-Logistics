import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../../model/filterPipe';
import { ListRoutesComponent } from './list-routes.component';

describe('ListRoutesComponent', () => {
  let component: ListRoutesComponent;
  let fixture: ComponentFixture<ListRoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterPipe, ListRoutesComponent ],
      imports:[HttpClientTestingModule,FormsModule,RouterTestingModule,NgxPaginationModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should test ngOninit', () => {
    spyOn(component, 'getRoutes').and.callFake(() => null);
    component.ngOnInit();
    expect(component.getRoutes).toHaveBeenCalled();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render ALL ROUTES AVAILABLE in h2', () => {
    const fixture = TestBed.createComponent(ListRoutesComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('ALL ROUTES AVAILABLE');
  });
});
