import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })
  
export class LocalStorageService {
    constructor() {}

    set(key: string, data: any): void {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (e) {
        console.error('Error', e);
      }
    }
  
    get(key: string) {
      try {
        const item = localStorage.getItem(key);
        if (!item) {
          return null;
        } else {
          return JSON.parse(item);
        }
      } catch (e) {
        console.error('Error getting data', e);
        return null;
      }
    }
};