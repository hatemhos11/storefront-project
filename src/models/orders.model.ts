import db from '../database'
import { orderType } from '../interfaces/order.interface'

export default class ordersClass {
    static orders = 'orders'
    // Get All Users
    static async Get(): Promise<orderType[]> {
        try {
            const connection = await db.connect()
            const orderQuery = `SELECT orders.id, users.username, orders.totalPrice, orders.status
                FROM ${ordersClass.orders}
                INNER JOIN users
                ON users.id=orders.id;
            `
            const { rows: orders } = await connection.query(orderQuery)

            connection.release()
            return orders
        } catch (err) {
            throw new Error(`There is something wrong ERROR:${err}`)
        }
    }
    // Get User By ID
    static async GetOne(id: string, user_id:string) {
        try {
            const connection = await db.connect()
            const orderQuery = `SELECT orders.id , orders.status
                FROM ${ordersClass.orders}
                INNER JOIN users 
                ON users.id=orders.user_id
                WHERE orders.id=($1) AND orders.user_id=$2;
            `
            const { rows: orders } = await connection.query(orderQuery, [id, user_id])

            connection.release()
            return orders[0]
        } catch (err) {
            throw new Error(`There is something wrong ${err}`)
        }
    }
    // Insert New Order
    static async Insert(userID: string, status: string) {
        const orderQuery = `INSERT INTO ${ordersClass.orders} (user_id, status)
            VALUES ($1, $2) 
            RETURNING id , status
            ;
        `
        try {
            const connection = await db.connect()
            const { rows: orders } = await connection.query(orderQuery, [userID, status])

            connection.release()
            return orders[0]
        } catch (err) {
            throw new Error(`There is something wrong ${err}`)
        }
    }
    // DELETE
    static async delete(id: string, userID: string) {
        try {
            if (!id) {
                throw 'Please Enter Order ID'
            }
            const connection = await db.connect()
            const query = `DELETE FROM ${ordersClass.orders} WHERE id=($1) AND user_id=($2);`
            const result = await connection.query(query, [id, userID])
            connection.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`There is something wrong ERROR:${err}`)
        }
    }
}
