import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { IProducts } from '../models/product.model';

@Injectable({
    providedIn: 'root',
  })
  
export class ProductsService {
    private readonly apiAddress: string = '';
    public products: Array<IProducts> = [];

    constructor() {}

    public getProducts(productType: string): any {
        this.products = require('../services/mock-data.json');
        return of(this.products.find(product => product.category === productType));
    }


}