import Product from "./Product";
import Sku from "./Sku";

export default interface LineItem {
    product: Product,
    sku: Sku,
    quantity: number,
    unitPrice: number,
    totalPrice: number
}