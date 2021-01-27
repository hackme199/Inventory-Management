import { environment } from 'src/environments/environment'

export const baseUrl = environment.production ? 'https://api.shoppingcart.com' : 'http://localhost:3000'
// export const productUrl = baseUrl + '/products'
export const categoriesUrl = baseUrl + '/categories'
export const productsUrl = baseUrl + '/products'
export const cartUrl = baseUrl + '/cart'
export const checkoutsUrl = baseUrl + '/checkouts'
// export const dispatchHistoryUrl = baseUrl + '/history'