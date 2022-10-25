export interface orderType {
    id?: string
    totalPrice: string
    products_order: string // forign key from "products_order" table
    userID: string // forign key from "users" table,
    date: string
}
