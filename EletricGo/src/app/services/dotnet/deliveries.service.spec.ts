import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { DeliveriesService } from './deliveries.service';

describe('DeliveriesService', () => {
  let service: DeliveriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({      imports:[HttpClientTestingModule,FormsModule,RouterTestingModule],
    });
    service = TestBed.inject(DeliveriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
