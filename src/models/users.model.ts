import db from '../database'
import { userType } from '../interfaces/user.interface'
import bcrypt from 'bcrypt'
import config from '../config'

export default class usersClass {
    static users = 'users'
    //                         Get All Users
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    static async Get(): Promise<userType[]> {
        try {
            const connection = await db.connect()
            const query = `SELECT id,username,email FROM ${usersClass.users};`
            const result = await connection.query(query)
            connection.release()

            return result.rows
        } catch (err) {
            throw new Error(`There is something wrong ERROR:${err}`)
        }
    }
    //                         Get User By ID
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    static async GetOne(id: string) {
        try {
            const connection = await db.connect()
            const query = `SELECT id, username, email FROM ${usersClass.users} WHERE id=($1);`
            const result = await connection.query(query, [id])
            connection.release()

            return result.rows[0]
        } catch (err) {
            console.log(`There is something wrong ${err}`)
        }
    }

    //                          Insert New User
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    static async Insert(username: string, HashPassword: string, email: string) {
        try {
            const connection = await db.connect()
            const query = `INSERT INTO ${usersClass.users} (username ,password ,email) VALUES ($1, $2, $3) returning id,username,email ;`
            const result = await connection.query(query, [username, HashPassword, email])
            connection.release()

            return result.rows[0]
        } catch (err) {
            console.log(`There is something wrong ${err}`)
        }
    }
    //                          UPDATE user
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    static async update(
        id: (string|undefined),
        username: (string|undefined),
        password: (string|undefined),
        email: (string|undefined)
    ) {
        try {
            const connection = await db.connect()
            const query = `
                Update ${usersClass.users} 
                    SET username=COALESCE($1, username), password=COALESCE($2, password), email=COALESCE($3, email)
                    WHERE id=($4) 
                    RETURNING id, username, email;
                `
            const result = await connection.query(query, [username, password, email, id])
            connection.release()
            return result.rows[0]
        } catch (err) {
            console.log(`There is something wrong ERROR:${err}`)
        }
    }
    //                          DELETE
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    static async delete(id: string): Promise<userType[]> {
        try {
            if (!id) {
                throw 'Please Enter Order ID'
            }
            const connection = await db.connect()
            const query = `DELETE FROM ${usersClass.users} WHERE id=($1);`
            const result = await connection.query(query, [id])
            connection.release()

            return result.rows
        } catch (err) {
            throw new Error(`There is something wrong ERROR:${err}`)
        }
    }
    //                          Check Password Validation
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    static async isValidatePassword(email: string, password: string) {
        try {
            const connection = await db.connect()
            const query = `SELECT password FROM ${usersClass.users} WHERE email=$1;`
            const result = await connection.query(query, [email])
            
            if (result.rows.length > 0) {
                const HashPassword: string = result.rows[0].password
                const isValid = bcrypt.compareSync(
                    `${password}${config.bcryptPassword}`,
                    HashPassword
                )
                if (isValid) {
                    const GetUserQuery = `SELECT id,username,email FROM ${usersClass.users} WHERE email=$1;`
                    const user = await connection.query(GetUserQuery, [email])
                    return user.rows[0]
                }
            }
            connection.release()
            return null
        } catch (error) {
            
        }
    }
}
