import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrucksService {
  private Url = 'http://localhost:3000/api/trucks/';

  constructor() { }
}
