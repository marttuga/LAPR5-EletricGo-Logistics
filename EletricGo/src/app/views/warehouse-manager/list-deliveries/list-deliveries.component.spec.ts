import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
<<<<<<< HEAD:EletricGo/src/app/views/list-deliveries/list-deliveries.component.spec.ts
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../model/filterPipe';
=======
import { FilterPipe } from '../../model/filterPipe';
>>>>>>> 3746633b24eb3bdfdd1c8ec5bcb36a2dc9817ed1:EletricGo/src/app/views/warehouse-manager/list-deliveries/list-deliveries.component.spec.ts
import { ListDeliveriesComponent } from './list-deliveries.component';

describe('ListDeliveriesComponent', () => {
  let component: ListDeliveriesComponent;
  let fixture: ComponentFixture<ListDeliveriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterPipe, ListDeliveriesComponent ],
      imports:[HttpClientTestingModule,FormsModule,RouterTestingModule,NgxPaginationModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should test ngOninit', () => {
    spyOn(component, 'listDeliveries').and.callFake(() => null);
    component.ngOnInit();
    expect(component.listDeliveries).toHaveBeenCalled();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render All Deliveries in h2', () => {
    const fixture = TestBed.createComponent(ListDeliveriesComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('All Deliveries');
  });

});
