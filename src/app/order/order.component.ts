import {Component} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'Order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})

export class Order {

  title: string = 'Order Details';

  constructor(private activeModal: NgbActiveModal) {}

  placeOrder() {
    this.close();
  }

  close(){
    this.activeModal.close();
  }
}
