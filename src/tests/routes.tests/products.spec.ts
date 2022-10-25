import supertest from 'supertest'
import app from '../../index'

const request = supertest(app)

const product_test = {
    name: 'product-name',
    price: 12,
    quantity: 200
}
const user_test = {
    username: 'test',
    email: 'test-email@test',
    password: 'password'
}

let user_id: string = ''
let product_id: string = ''
let token: string = ''

beforeAll( async () => {
    const res = await request.post('/users/add')
    .set('Content-type', 'application/json')
    .send({
        username: user_test.username,
        password: user_test.password,
        email: user_test.email
    })
    user_id = await res.body.id
})


describe('products Endpoints', () => {

    describe('Methods without Token',()=>{

        it('Login and fetch token', async () => {
            const res = await request.post('/users/login')
                .set('Content-type', 'application/json')
                .send({
                    email: user_test.email,
                    password: user_test.password
                })

            token = res.body.token
            expect(res.status).toBe(200)
        })

        it('Add product Without Token (prdouct) ', async () => {
            const res = await request.post('/products/add').send(product_test)
            product_id = res.body.id
            expect(res.status).toBe(401)
        })


        it('Update product Without Token (prdouct) ', async () => {
            const res = await request.put(`/products/${product_id}`).send({name:'name-updated', price: 232, quantity: 453})
            expect(res.status).toBe(401)
        })
    })


    describe('Methods with token', ()=>{

        it('Add product with Token (product)', async () => {
            const res = await request.post('/products/add')
                .send(product_test)
                .set('Authorization', `Bearer ${token}`)
            product_id = res.body.id
            expect(res.status).toBe(200)
            expect(res.body).toEqual({
                id: product_id,
                name: product_test.name,
                price: product_test.price,
                quantity: product_test.quantity
            })
        })

        it('Get products with token', async () => {
            const res = await request.get('/products').set('Authorization', `Bearer ${token}`)

            expect(res.status).toBe(200)
        })

        it('GetOne product with token', async () => {
            const res = await request.get(`/products/${product_id}`)
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
        })
        it('GetOne (Values) product with token', async () => {
            const res = await request.get(`/products/${product_id}`)
                .set('Authorization', `Bearer ${token}`)
            expect(res.body).toEqual({
                id:       product_id,
                name:     product_test.name,
                price:    product_test.price,
                quantity: product_test.quantity
            
            })
        })
    })

    describe('AFTER ALL',()=>{
        afterAll(()=>{
            it('(delete) method  Products (It requires token)', async ()=>{
                const res = await request.delete(`/products/${product_id}`).set('Authorization', `Bearer ${token}`)
            })
        })
    })
})