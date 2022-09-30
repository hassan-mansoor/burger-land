import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../services/cart.service';
import {IExtras} from './extras.model';
import {IProduct} from "../models/product.model";

@Component({
  selector: 'Extras',
  templateUrl: './extras.component.html',
  styleUrls: ['./extras.component.scss']
})

export class Extras {
  @Input() selectedProduct: IProduct = Object.assign({});

  title: string = '';
  optOut: Array<IExtras> = [];
  drinks: Array<IExtras> = [];
  extraForBurger: Array<IExtras> = [];
  sauce: Array<IExtras> = [];
  fries: Array<IExtras> = [];

  constructor(private activeModal: NgbActiveModal, private CartService: CartService) {}

  ngOnInit() {
    this.title = `How do you want your ${this.selectedProduct.title}`;
    this.optOut = [
      {
        name: 'Cheeder',
        selected: false,
      }, {
        name: 'Ketchup',
        selected: false,
      }, {
        name: 'Onion',
        selected: false,
      }, {
        name: 'Mayo',
        selected: false,
      }, {
        name: 'Pickles',
        selected: false
      }, {
        name: 'Mustard',
        selected: false,
      }
    ];
    this.drinks = [
      {
        name: 'Cola', selected: false,
      }, {
        name: 'Finta',
        selected: false,
      }, {
        name: '7up',
        selected: false,
      },
      {
        name: 'Water',
        selected: false,
      }, {
        name: 'Sparking water',
        selected: false,
      }, {
        name: 'Coke Zero',
        selected: false,
      }, {
        name: 'Squash',
        selected: false,
      }
    ];
    this.extraForBurger = [{
      name: 'gluten-free-bun',
      selected: false,
    }, {
      name: 'welldone',
      selected: false,
    }, {
      name: 'bacon',
      selected: false,
    }, {
      name: 'tomato lettuce onion',
      selected: false,
    }, {
      name: 'extra cheese',
      selected: false,
    }];
    this.sauce = [
      {
        name: 'Mayo',
        selected: false,
      }, {
        name: 'Ketchup',
        selected: false,
      }, {
        name: 'Hot sauce',
        selected: false,
      }, {
        name: 'Barbeque',
        selected: false,
      }
    ];
    this.fries = [
      {
        name: 'Potato fries',
        selected: false,
      }, {
        name: 'Sweet potato fries',
        selected: false
      }, {
        name: 'Onion rings',
        selected: false,
      }];
  }

  close() {
    this.activeModal.close();
  }

  extrasToadd() {
    const optOutItems = this.optOut.filter(({selected}) => selected === true);
    const selectedExtraForBurger = this.extraForBurger.filter(({selected}) => selected === true);
    const selectedFires = this.fries.filter(({selected}) => selected === true);
    const selectedDrinks = this.drinks.filter(({selected}) => selected === true);
    const selectedSauce = this.sauce.filter(({selected}) => selected === true);
    const extraItems: Array<IExtras> = [
      ...optOutItems,
      ...selectedExtraForBurger,
      ...selectedFires,
      ...selectedDrinks,
      ...selectedSauce
    ];

    const product = {...this.selectedProduct, extraItems};
    console.log(product);
    this.CartService.addProductToCart(product);
  }

  toggleSelect(item: IExtras) {
    item.selected = !item.selected;
  }
}
