import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../services/products.service';
import { IProducts, IProduct } from '../models/product.model';
import { Extras } from '../Extras/extras.component';

@Component({
  selector: 'burgers',
  templateUrl: './burgers.component.html',
  styleUrls: ['./burgers.component.scss']
})
export class Burgers {
  title = 'Burgers';

  items: Array<IProduct> = [];
  quantity: Array<number> = [1,2,3,4,5,6,7,8,9,10,11,12];
  currentQuantity: number = 1;
  selectedItem: any;

  constructor(private modalService: NgbModal, private ProductsService: ProductsService) {
    this.ProductsService.getProducts('burgers').subscribe(
      (result: IProducts) => {
        this.items = result.products
        .map((item: IProduct) => ({
          ...item,
          purchasePrice: item.price,
          quantity: 1
        })
        );

        this.selectedItem = this.items[0];
      },
    );
  }

  onChange(event:any, item: IProduct) {
    const quantity: number = Number(event.target.value);
    item.purchasePrice = (parseFloat(item.price) * quantity).toString();
    item.quantity = quantity;
  }

  addItemToBasket(item: IProduct) {
    const modalRef = this.modalService.open(Extras, { backdrop: 'static' });
    modalRef.componentInstance.selectedProduct = item;
  }
}
