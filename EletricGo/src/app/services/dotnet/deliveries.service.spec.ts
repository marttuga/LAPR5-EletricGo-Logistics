import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { first } from 'rxjs';

import { DeliveriesService } from './deliveries.service';

describe('DeliveriesService', () => {
  let service: DeliveriesService;
  let httpClientSpy:HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({      imports:[HttpClientTestingModule,FormsModule,RouterTestingModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
    });
    service = TestBed.inject(DeliveriesService);
    httpClientSpy=TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpClientSpy.verify();
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('get Delivery', () => {
    const expectedResult: Delivery= {
    
    dIdentifier: 'D01'
       ,
      date: 21072022,
      mass: 12,
      timeLoad: 5,
      timeUnload: 10,
      deliveryWarehouse:'W01',
    };

    const service : DeliveriesService = TestBed.get(DeliveriesService);
    service.getDeliveryByIdentifier('D01')
    .pipe(
        first(),
    )
    .subscribe((data) => {
        expect(data).toBe(expectedResult);
    });

    const req = httpClientSpy.expectOne('https://localhost:5001/api/Deliveries/ById/D01');
    expect(req.request.method).toBe('GET');
    req.flush(expectedResult);
});
 

it('should create', () => {
  const expectedResult: Delivery= {
    
    dIdentifier: 'D01'
       ,
      date: 21072022,
      mass: 12,
      timeLoad: 5,
      timeUnload: 10,
      deliveryWarehouse:'W01',
    };

  const service : DeliveriesService = TestBed.get(DeliveriesService);
  service.createDelivery('D01',21072022,12,5,10,'W01')
  .pipe(
      first(),
  )
  .subscribe((data) => {
      expect(data).toBe(expectedResult);
  });

  const req = httpClientSpy.expectOne('https://localhost:5001/api/Deliveries');
  expect(req.request.method).toBe('POST');
  req.flush(expectedResult);
});
});

 