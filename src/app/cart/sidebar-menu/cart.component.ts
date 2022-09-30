import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'src/app/services/localStorageService.service';
import { IProduct } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { Order } from '../../order/order.component';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class Cart {
  @Input()  displayAsModal: boolean= false;

  title = 'cart';
  menuItems: Array<string> = [
    'Combos',
    'Burgers',
    'Sides',
    'Mini',
    'dips',
  ];
  cartItems: Array<IProduct> = [];
  totalPrice: number = 0;

  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private LocalStorageService: LocalStorageService,
    private CartService: CartService
  ) {}

  ngOnInit(): void {
    this.CartService.getProduct().subscribe(items => {
      if(items.length > 0) {console.log(items);
        this.cartItems = items;
        this.calculatePrice();
      }
    });
  }

  removeItemFromCart(item: IProduct) {
    const index = this.cartItems.findIndex(i => i.id === item.id);
    if (index != -1) {
      this.cartItems.splice(index, 1);
      this.LocalStorageService.set('cart', this.cartItems);
      this.calculatePrice();
    }
  }

  calculatePrice() {
    if (this.cartItems.length === 1) {
      this.totalPrice = parseFloat(this.cartItems[0].purchasePrice);
    } else if (this.cartItems.length > 1) {
      this.cartItems.forEach(item => {
        this.totalPrice += parseFloat(item.purchasePrice);
      });
    } else {
      this.totalPrice = 0;
    }

    this.CartService.setTotalPrice(this.totalPrice);
  }

  close() {
    this.activeModal.close();
  }

  addOrderDetails() {
    const modalRef = this.modalService.open(Order, { backdrop: 'static' });
  }
}
