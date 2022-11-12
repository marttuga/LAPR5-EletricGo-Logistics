import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  private Url = 'http://localhost:3000/api/routes/';

  constructor() { }
}
