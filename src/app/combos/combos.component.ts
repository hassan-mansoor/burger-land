import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
@Component({
  selector: 'combos',
  templateUrl: './combos.component.html',
  styleUrls: ['./combos.component.scss']
})
export class Combos {
  title = 'Combos';
  items: any;
  
  constructor(private ProductsService: ProductsService) {
    this.ProductsService.getProducts('combos').subscribe(
      (result: any) => {
        this.items = result.products;
      },      
    );
  }
  
}
