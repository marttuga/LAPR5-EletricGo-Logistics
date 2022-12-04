import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { WarehousesService } from './warehouses.service';
import {first} from "rxjs";


describe('WarehousesService', () => {
  let service: WarehousesService;
  let httpClientSpy:HttpTestingController


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,FormsModule,RouterTestingModule],
    });
    service = TestBed.inject(WarehousesService);
    httpClientSpy=TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpClientSpy.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('get Warehouse', () => {
    const expectedResult: Warehouse= {
      warehouseIdentifier: 'W01',
      designation: 'Arouca',
      latitude:40.9321,
      longitude:8.2451,
      street: 'Rua de S. Sebastião',
      doorNumber:7,
      city:'Arouca',
      zipcode:'4540-099',
      altitude: '250'
    };

    const service : WarehousesService = TestBed.get(WarehousesService);
    service.getWarehouseByIdentifier('W01')
      .pipe(
        first(),
      )
      .subscribe((data) => {
        expect(data).toBe(expectedResult);
      });

    const req = httpClientSpy.expectOne('https://lapr5-dotnet.herokuapp.com/api/warehouse/getByWI/W01');
    expect(req.request.method).toBe('GET');
    req.flush(expectedResult);
  });


  it('should create warehouse', () => {
    const expectedResult: Warehouse= {
      warehouseIdentifier: 'W55',
      designation: 'designation',
      latitude:40,
      longitude:8,
      street: 'street',
      doorNumber:1,
      city:'city',
      zipcode:'1111-111',
      altitude: '10'
    };

    const service : WarehousesService = TestBed.get(WarehousesService);
    service.createWarehouse('W55','desigantion',40,8,'street',1, 'city','1111-111','10')
      .pipe(
        first(),
      )
      .subscribe((data) => {
        expect(data).toBe(expectedResult);
      });

    const req = httpClientSpy.expectOne('https://lapr5-dotnet.herokuapp.com/api/warehouse/createWarehouse');
    expect(req.request.method).toBe('POST');
    req.flush(expectedResult);
  });




});
