import supertest from 'supertest'
import app from '../../index'

const request = supertest(app)



const order_test = {
    userID: '',
    status: 'active',
}
const user_test = {
    username: 'test',
    email: 'test-email@test',
    password: 'password'
}

let user_id: string = ''
let order_id: string = ''
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
    order_test.userID = user_id
})


describe('orders Endpoints', () => {

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

        it(' Add order Without Token (order) ', async () => {
            const res = await request.post('/orders/add').send(order_test)
            order_id = res.body.id
            expect(res.status).toBe(401)
        })

        it('Get orders without token', async () => {
            const res = await request.get('/orders')
            expect(res.status).toBe(401)
        })

        it('GetOne order without token', async () => {
            const res = await request.get(`/orders/${user_id}`)
            expect(res.status).toBe(401)
        })

    })


    describe('Methods with token', ()=>{

        it(' Add order with Token (order)', async () => {
            const res = await request.post('/orders/add')
                .send(order_test)
                .set('Authorization', `Bearer ${token}`)

            expect(res.status).toBe(200)
        })
        it(' Add order (values) with Token (order)', async () => {
            const res = await request.post('/orders/add')
                .send(order_test)
                .set('Authorization', `Bearer ${token}`)
            order_id = res.body.id
            expect(res.body).toEqual({
                id: order_id,
                status: order_test.status
            })
        })

        it('Get orders with token', async () => {
            const res = await request.get('/orders').set('Authorization', `Bearer ${token}`)

            expect(res.status).toBe(200)
        })

        it('GetOne order with token', async () => {
            const res = await request.get('/orders/1')
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
        })
        
        it('GetOne (values) order with token', async () => {
            const res = await request
                .get(`/orders/${order_id}`)
                .send({user_id})
                .set('Authorization', `Bearer ${token}`)
                
            expect(res.body).toEqual({
                id: order_id,
                status: order_test.status,
            })
        })
    })

    
    describe('AFTER ALL',()=>{
        afterAll(()=>{
            it('(delete) method  orders (It requires token)', async ()=>{
                const res = await request.get(`/orders/${user_id}`).set('Authorization', `Bearer ${token}`)
                expect(res.status).toBe(200)
            })
        })
    })
})