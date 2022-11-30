import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WarningService {
  warnings: string[] = [];

  add(warning: string) {
    this.warnings.push(warning);
  }

  clear() {
    this.warnings = [];
  }
}