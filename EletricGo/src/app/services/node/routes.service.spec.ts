import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { first } from 'rxjs';

import { RoutesService } from './routes.service';

describe('RoutesService', () => {
  let service: RoutesService;
  let httpClientSpy:HttpTestingController
  beforeEach(() => {
    TestBed.configureTestingModule({      imports:[HttpClientTestingModule,FormsModule,RouterTestingModule],
    });
    service = TestBed.inject(RoutesService);
    httpClientSpy=TestBed.inject(HttpTestingController);

  });
  afterEach(() => {
    httpClientSpy.verify();
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('get Route', () => {
    const expectedResult: Route= {
      routeId: "2",
      distance: "313",
      routeTime: "3",
      batteryWaste: "22",
      arrivalId: "W07",
      departureId: "W01",
      extraTime: "2",
    };

    const service : RoutesService = TestBed.get(RoutesService);
    service.getRoute('1')
    .pipe(
        first(),
    )
    .subscribe((data) => {
        expect(data).toBe(expectedResult);
    });

    const req = httpClientSpy.expectOne('http://localhost:3000/api/routes/getById/1');
    expect(req.request.method).toBe('GET');
    req.flush(expectedResult);
});
 

it('should create', () => {
  const expectedResult: Route= {
    routeId: "2",
    distance: "313",
    routeTime: "3",
    batteryWaste: "22",
    arrivalId: "W07",
    departureId: "W01",
    extraTime: "2",
  };

  const service : RoutesService = TestBed.get(RoutesService);
  service.createRoute('1','313','3','22','W07','W01','2')
  .pipe(
      first(),
  )
  .subscribe((data) => {
      expect(data).toBe(expectedResult);
  });

  const req = httpClientSpy.expectOne('http://localhost:3000/api/routes/createRoute');
  expect(req.request.method).toBe('POST');
  req.flush(expectedResult);
});
});
