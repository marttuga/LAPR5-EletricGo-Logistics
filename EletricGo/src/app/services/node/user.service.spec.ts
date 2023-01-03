/* import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { first } from 'rxjs';
import { UserService } from './user.service';

describe('TrucksService', () => {
  let service: UserService;
  let httpClientSpy:HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({        imports:[HttpClientTestingModule,FormsModule,RouterTestingModule],
    });
    service = TestBed.inject(UserService);
    httpClientSpy=TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpClientSpy.verify();
});


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('get Truck', () => {
    const expectedResult: Truck= {
      licencePlate: 'HH-00-HH',
      tare: 10000,
      capacity: 10000,
      maxBateryCapacity: 100,
      autonomyFullChargeLoad: 100,
      timeCharging: 2,
      active: true
    };

    const service : UserService = TestBed.get(UserService);
    service.getUserByEmail('HH-00-HH')
    .pipe(
        first(),
    )
    .subscribe((data) => {
        expect(data).toBe(expectedResult);
    });

    const req = httpClientSpy.expectOne('http://localhost:3000/api/truck/getTruck/HH-00-HH');
    expect(req.request.method).toBe('GET');
    req.flush(expectedResult);
});
 

it('should create truck', () => {
  const expectedResult: Truck= {
    licencePlate: 'HH-00-kk',
    tare: 10000,
    capacity: 10000,
    maxBateryCapacity: 100,
    autonomyFullChargeLoad: 100,
    timeCharging: 2,
    active: true
  };

  const service : UserService = TestBed.get(UserService);
  service.createUser('HH-00-kk',10000,10000,100,100,2)
  .pipe(
      first(),
  )
  .subscribe((data) => {
      expect(data).toBe(expectedResult);
  });

  const req = httpClientSpy.expectOne('http://localhost:3000/api/truck/createTruck');
  expect(req.request.method).toBe('POST');
  req.flush(expectedResult);
});



});
 */
