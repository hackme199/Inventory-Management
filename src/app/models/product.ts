export class Product {
    id: number;
    category: string
    // id : number;
    name : string;
    description : string;
    // price : number;
    imageUrl : string;
    qty: number;

    constructor(id, name, description = '', qty = 10, imageUrl = 'https://images-na.ssl-images-amazon.com/images/I/61j4acmknmL._AC_SX466_.jpg') {
        this.id = id
        this.name = name
        this.description = description
        this.imageUrl = imageUrl
        this.qty = qty
    }
}
