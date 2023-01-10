 import { TestBed } from '@angular/core/testing';
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
    const expectedResult: User= {
      firstName: "Maria",
      lastName: "Flores",
      email: "mariaFlores@gmail.com",
      password: "Mariaflores1",
      role:"fleet-manager" ,
      userContact: 913766577,
      active: true
    };

    const service : UserService = TestBed.get(UserService);
    service.getUserByEmail('mariaflores@gmail.com')
    .pipe(
        first(),
    )
    .subscribe((data) => {
        expect(data).toBe(expectedResult);
    });

    const req = httpClientSpy.expectOne('http://localhost:3000/api/user/getUserByEmail/mariaflores@gmail.com');
    expect(req.request.method).toBe('GET');
    req.flush(expectedResult);
});
 

it('should create truck', () => {
  const expectedResult: User= {
    firstName: "Maria",
      lastName: "Flores",
      email: "mariaFlores@gmail.com",
      password: "Mariaflores1",
      role:"fleet-manager" ,
      userContact: 913766577,
      active: true
  
  };

  const service : UserService = TestBed.get(UserService);
  service.createUser('Maria',"Flores","mariaFlores@gmail.com","Mariaflores1","Fleet_Manager", 913766577)
  .pipe(
      first(),
  )
  .subscribe((data) => {
      expect(data).toBe(expectedResult);
  });

  const req = httpClientSpy.expectOne('http://localhost:3000/api/user/createUser');
  expect(req.request.method).toBe('POST');
  req.flush(expectedResult);
});



});
 
