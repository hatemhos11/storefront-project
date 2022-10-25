import supertest from 'supertest'
import app from '../../index'

const request = supertest(app)


const user_test = {
    username: 'test',
    email: 'test-email@test',
    password: 'password'
}
const order_test = {
    userID: '',
    status: 'active',
}
const product_test = {
    name: 'product-name-test',
    price: 23,
    quantity: 200
}
const productOrder_test = {
    product_id: '',
    order_id: '',
    quantity: 434
}

let productOrder_id: string = ''
let token: string = ''

beforeAll( async () => {
    // Add new User 
    const user = await request.post('/users/add')
    .set('Content-type', 'application/json')
    .send({
        username: user_test.username,
        password: user_test.password,
        email: user_test.email
    })
    order_test.userID = user.body.id

    // Login
    const login = await request.post('/users/login')
    .set('Content-type', 'application/json')
    .send({
        email: user_test.email,
        password: user_test.password
    })
    token = login.body.token

    // Add new Order
    const order = await request.post('/orders/add')
    .send(order_test)
    .set('Authorization', `Bearer ${token}`)
    productOrder_test.order_id = order.body.id

    // Add new Product
    const product = await request.post('/products/add')
    .send(product_test)
    .set('Authorization', `Bearer ${token}`)
    productOrder_test.product_id = product.body.id

})


describe('productsOrder Endpoints', () => {


    describe('Methods with token', ()=>{
        it('Add Product-order with Token (productsOrder)', async () => {
            const res = await request
                .post(`/products-order/${productOrder_test.order_id}/add-product/${productOrder_test.product_id}`)
                .send({quantity: productOrder_test.quantity})
                .set('Authorization', `Bearer ${token}`)
            productOrder_id = res.body.id
            expect(res.status).toBe(200)
        })

        it('Get Products-order with token', async () => {
            const res = await request
                .get('/products-order')
                .set('Authorization', `Bearer ${token}`)

            expect(res.status).toBe(200)
        })

        it('GetOne (status code) Product-order with token', async () => {
            const res = await request
                .post(`/products-order/${productOrder_test.order_id}/add-product/${productOrder_test.product_id}`)
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
        })

        it('GetOne (value) Product-order with token', async () => {
            const res = await request
                .post(`/products-order/${productOrder_test.order_id}/add-product/${productOrder_test.product_id}`)
                .send(productOrder_test)            
                .set('Authorization', `Bearer ${token}`)
            

            const productOrderID = res.body.id
            expect(res.body).toEqual({
                id: productOrderID,
                order_id: productOrder_test.order_id.toString(),
                product_id: productOrder_test.product_id.toString(),
                quantity: null
            })
        })
        it(' Update Product-order with Token (Product-order) ', async () => {
            const res = await request
                .put(`/products-order/${productOrder_test.product_id}/products/${productOrder_test.product_id}`)
                .send({quantity: 20})
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
        })

    })



    describe('Methods without Token',()=>{

        it(' Add Product-order Without Token (Product-order) ', async () => {
            const res = await request
                .post(`/products-order/${productOrder_test.order_id}/add-product/${productOrder_test.product_id}`)
                .send({quantity: productOrder_test.quantity})
            productOrder_id = res.body.id
            expect(res.status).toBe(401)
        })


        it('Get Products-order without token', async () => {
            const res = await request.get('/products-order')
            expect(res.status).toBe(401)
        })

        it('GetOne Product-order without token', async () => {
            const res = await request
                .get(`/products-order/${productOrder_test.order_id}/products/${productOrder_test.product_id}`)
            expect(res.status).toBe(401)
        })
        it(' Update Product-order Without Token (Product-order) ', async () => {
            const res = await request
                .put(`/products-order/${productOrder_test.product_id}/products/${productOrder_test.product_id}`)
                .send({quantity: 23})
            expect(res.status).toBe(401)
        })
    })


    describe('AFTER ALL',()=>{
        afterAll(()=>{
            it('(delete) method  Products-order (It requires token)', async ()=>{
                const res = await request
                    .delete(`/products-order/${productOrder_test.product_id}/products/${productOrder_test.product_id}`)
                    .set('Authorization', `Bearer ${token}`)
                expect(res.status).toBe(200)
            })
        })
    })
})