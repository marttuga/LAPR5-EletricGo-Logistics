import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeliveriesService {
  private Url = 'https://localhost:5001/api/deliveries/';

  constructor() { }
}
