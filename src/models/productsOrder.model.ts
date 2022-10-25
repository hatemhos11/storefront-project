import db from '../database'

export default class productsOrderClass {
    static productsOrder = 'productOrder'
    // Get All Users
    static async Get() {
        try {
            const connection = await db.connect()
            const productsOrderQuery = `SELECT P.id as product_id, P.name as product_name , O.id as order_id
                FROM ${productsOrderClass.productsOrder} PO, orders O, products P
                WHERE PO.order_id=O.id AND PO.product_id=P.id;
            `
            const { rows: productsFromOrders } = await connection.query(productsOrderQuery)

            connection.release()
            return productsFromOrders
        } catch (err) {
            throw new Error(`There is something wrong ERROR:${err}`)
        }
    }
    // Get products By ID
    static async GetOne( orderID: number, productID: number) {
        try {
            const connection = await db.connect()
            const productsOrderQuery = `SELECT * FROM ${productsOrderClass.productsOrder} 
                WHERE order_id=($1) AND product_id=($2);
            `
            const { rows: productsFromOrders } = await connection.query(productsOrderQuery, [ orderID , productID])

            connection.release()
            return productsFromOrders[0]
        } catch (err) {
            throw new Error(`There is something wrong ${err}`)
        }
    }
    // Insert New Order
    static async Insert(
        productID: number,
        orderID: number,
        quantity: number
    ) {
        try {
            const connection = await db.connect()

            const productsOrderQuery = `INSERT INTO ${productsOrderClass.productsOrder} (product_id, order_id, quantity) VALUES ($1, $2, $3) returning *;`
            const { rows: orders } = await connection.query(productsOrderQuery, [ productID, orderID, quantity ])

            connection.release()
            return orders[0] 
        } catch (err) {
            throw new Error(`There is something wrong ${err}`)
        }
    }
    // Update New Order
    static async update(
        orderID: number,
        productID: number,
        quantity: number
    ) {
        try {
            const connection = await db.connect()
            const query = `UPDATE ${productsOrderClass.productsOrder} SET quantity=COALESCE($1, quantity) WHERE order_id=($2) AND product_id=($3) RETURNING *;`

            const result = await connection.query(query, [quantity, orderID, productID])
            connection.release()

            return result.rows
        } catch (err) {
            throw new Error(`There is something wrong ERROR:${err}`)
        }
    }
    // DELETE
    static async delete(orderID: number, productID: number) {
        try {
            if (!orderID || !productID) {
                throw 'Please Enter Order ID'
            }
            const connection = await db.connect()
            const query = `DELETE FROM ${productsOrderClass.productsOrder} WHERE order_id=($1) AND product_id=($2);`
            const result = await connection.query(query, [orderID, productID])
            connection.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`There is something wrong ERROR:${err}`)
        }
    }
}
