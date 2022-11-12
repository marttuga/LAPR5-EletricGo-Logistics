import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WarehousesService {
  private Url = 'https://localhost:5001/api/warehouses/';

  constructor() { }
}
