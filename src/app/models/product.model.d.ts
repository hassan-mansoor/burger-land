import {IExtras} from '../Extras/extras.model';

export interface IProduct {
    id: number;
    title: string;
    description: string;
    price: string;
    purchasePrice: string;
    quantity: number;
    extras?: IExtras;
}

export interface IProducts {
    id: number;
    category: string;
    products: Array<IProduct>;
}
