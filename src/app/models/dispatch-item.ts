import { CartItem } from './cart-item';

export class DispatchItem {
    item : CartItem
    remarks : string

    constructor(item: CartItem , remarks = '') {
        this.item = item
        this.remarks = remarks
    }
}
