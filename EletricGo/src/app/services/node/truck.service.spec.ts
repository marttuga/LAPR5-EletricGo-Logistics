import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { TrucksService } from './truck.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('TrucksService', () => {
  let service: TrucksService;
  let httpClientSpy:HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({        imports:[HttpClientTestingModule,FormsModule,RouterTestingModule],
    });
    service = TestBed.inject(TrucksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

/*   it("should return the all Trucks", () =>{
    const body=[{"licencePlate":"DF-12-DF", "tare":"12345", "capacity":"12345", "maxBateryCapacity":"123", "autonomyFullChargeLoad": "123", "timeCharging":"2"}];
    service.getTrucks().subscribe(data=>{
      expect(data).toBe(body);
    });
    const request=httpClientSpy.expectOne(service.Url+"/getAll");
    expect(request.request.method).toBe('GET');
    request.flush(body);

  });

  it("should return the truck with licence plate Test", () =>{
    service.getTruck("DF-12-DF").subscribe(data=>{
      expect(data.licencePlate).toBe("DF-12-DF");
      request.flush(data);
    });
    const request=httpClientSpy.expectOne(service.Url+"/DF-12-DF");
    expect(request.request.method).toBe('GET');
  });


  it("should return the truck with update Test", () =>{
    service.updateTruck("DF-12-DF", 12000,12345, 123, 123, 2).subscribe(data=>{
      expect(data.tare).toBe(12000);
      request.flush(data);
    });
    const request=httpClientSpy.expectOne(service.Url+"/updateTruck");
    expect(request.request.method).toBe('PUT');
  });

  it("should create a new Truck", () =>{
    service.createTruck( "DF-12-DF", 12345,12345,123, 123, 2).subscribe(data=>{
    expect(data.licencePlate).toBe("DF-12-DF");
      request.flush(data);
    });
    const request=httpClientSpy.expectOne(service.Url+"/createTruck");
    expect(request.request.method).toBe('POST');
  });
 */

});
