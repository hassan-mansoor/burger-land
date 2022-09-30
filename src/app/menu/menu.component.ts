import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cart } from '../cart/sidebar-menu/cart.component';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class Menu {
  title: string = 'side bar';
  selectedItem: any = {};
  public totalPrice: Number = 0;

  menuItems: Array<any> = [
    { name: 'Burgers', link: "/burgers" },
    { name: 'Combos', link: '/combos'},
    { name: 'Sides', link: '/sides'},
    { name: 'Mini', link: '/mini'},
    { name: 'dips', link: '/dips'},
  ];

  constructor(private modalService: NgbModal, private CartService: CartService) {
    this.selectedItem = this.menuItems[0];
  }

  ngOnInit(): void {
    this.CartService.getTotalPrice().subscribe(price => {
     this.totalPrice = price || 0;
    });
  }

  activeSelectedItem(item: any) {
      this.selectedItem  = item;
  }

  open() {
    const modalRef = this.modalService.open(Cart, { backdrop: 'static' });
    modalRef.componentInstance.displayAsModal = true;
  }
}
