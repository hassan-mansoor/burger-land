import { Injectable } from '@angular/core';
import { IProduct } from '../models/product.model';
import { LocalStorageService } from './localStorageService.service';
import { ProductsService } from './products.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })

export class CartService {

    private cartItems: Array<IProduct> = [];
    private productListObserver = new BehaviorSubject<Array<IProduct>>([]);
    private totalPriceObserver = new BehaviorSubject<Number>(0);

    constructor(private LocalStorageService: LocalStorageService, private ProductsService: ProductsService){
        this.addProduct();
    }

    addProductToCart(product: IProduct) {
        this.cartItems = this.LocalStorageService.get('cart');
        let existingProduct = this.getAlreadyExistsItemInCart(product);

        if (!existingProduct) {
           this.cartItems.push(product);
        } else {
          this.updateProductInCart(existingProduct, product);
        }

        this.LocalStorageService.set('cart', this.cartItems);
        this.addProduct();
    }

    getAlreadyExistsItemInCart(product: IProduct) {
        const item =  this.cartItems.find((item: IProduct) => {
          const existingItem = this.convertToObjectWithExcludeKeys(item, ['purchasePrice', 'quantity']);
          const newItem = this.convertToObjectWithExcludeKeys(product, ['purchasePrice', 'quantity']);
          if (JSON.stringify(existingItem) === JSON.stringify(newItem)) {
            return existingItem;
          }
        });

        return item;
    }

    updateProductInCart(existingProduct: IProduct, newProduct: IProduct) {
        const indexOfExistingProduct = this.cartItems.findIndex((item: IProduct) => JSON.stringify(existingProduct) === JSON.stringify(item));
        const newQuantity = existingProduct.quantity + newProduct.quantity;
        const newPurchasePrice = parseFloat(existingProduct.purchasePrice) + parseFloat(newProduct.purchasePrice);
        const updatedProduct: IProduct = { ...existingProduct, quantity: newQuantity, purchasePrice: newPurchasePrice.toString() };
        this.cartItems[indexOfExistingProduct] = updatedProduct;
    }

    addProduct() {
        const items: Array<IProduct> = this.LocalStorageService.get('cart');
        if (!items) {
            this.LocalStorageService.set('cart', []);
        }

        this.productListObserver.next(items);
    }

    getProduct(): Observable<Array<IProduct>> {
        return this.productListObserver.asObservable();
    }

    setTotalPrice (price: Number) {
        this.totalPriceObserver.next(price);
    }

    getTotalPrice() {
        return this.totalPriceObserver.asObservable();
    }

    convertToObjectWithExcludeKeys(orginalObject: any, excludeKeys: Array<string>){
    var newObj: any = {};
    Object.keys(orginalObject).map(key => {
      if(excludeKeys.indexOf(key) < 0){
        newObj[key] = orginalObject[key];
      }

    })
    return newObj;
}
}
