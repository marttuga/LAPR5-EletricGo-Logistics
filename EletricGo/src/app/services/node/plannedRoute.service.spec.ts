
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { PlannedRouteService } from './plannedRoute.service';

describe('PlannedRouteS', () => {
  let service: PlannedRouteService;
  let httpClientSpy:HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({        imports:[HttpClientTestingModule,FormsModule,RouterTestingModule],
    });
    service = TestBed.inject(PlannedRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
