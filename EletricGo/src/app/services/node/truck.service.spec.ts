import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TrucksService } from './truck.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('TrucksService', () => {
  let service: TrucksService;

  beforeEach(() => {
    TestBed.configureTestingModule({        imports:[HttpClientTestingModule,FormsModule,RouterTestingModule],
    });
    service = TestBed.inject(TrucksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
