import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { WarehousesService } from './warehouses.service';

describe('WarehousesService', () => {
  let service: WarehousesService;

  beforeEach(() => {
    TestBed.configureTestingModule({      imports:[HttpClientTestingModule,FormsModule,RouterTestingModule],
    });
    service = TestBed.inject(WarehousesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
