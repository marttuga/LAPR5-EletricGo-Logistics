
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { PrologPathsService } from './plannedRoute.service';

describe('PrologPathsService', () => {
  let service: PrologPathsService;
  let httpClientSpy:HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({        imports:[HttpClientTestingModule,FormsModule,RouterTestingModule],
    });
    service = TestBed.inject(PrologPathsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
