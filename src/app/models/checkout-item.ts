import { CartItem } from './cart-item'

export class CheckoutItem {
        name: string
        phone: number
        place: string
        dispatcherName: string
        remarks: string
        cartItems: CartItem[]
        date: Date
        returnStatus: boolean
}
