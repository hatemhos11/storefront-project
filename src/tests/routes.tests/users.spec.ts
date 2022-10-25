import supertest from 'supertest'
import app from '../../index'

const request = supertest(app)

const user_test = {
    username: 'test',
    email: 'test-email@test',
    password: 'password'
}


let user_id:string = ''
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


describe('Users Endpoint', () => {

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

        it('Authorization without token', async () => {
            const res = await request.get('/users')
            expect(res.status).toBe(401)
        })



        it('Get users without token', async () => {
            const res = await request.get('/users')
            expect(res.status).toBe(401)
        })

        it('GetOne user (status code) without token', async () => {
            const res = await request.get(`/users/${user_id}`)
            expect(res.status).toBe(401)
        })


        it(' Add user Without Token (User) ', async () => {
            const res = await request.post('/users/add').send(user_test)
            user_id = res.body.id
            expect(res.status).toBe(200)
        })
    })


    describe('Methods with token', ()=>{

        it('Get users with token', async () => {
            const res = await request.get('/users').set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
        })

        it('GetOne user with token', async () => {
            const res = await request.get('/users/1').set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
        })

        it('GetOne user (value) without token', async () => {
            const res = await request
                .get(`/users/${user_id}`)
                .set('Authorization', `Bearer ${token}`)
            expect(res.body).toEqual({
                id: user_id,
                email: user_test.email,
                username: user_test.username
            })        
        })

        it('Add user with Token (User) -It doesn\'t require token- ', async () => {
            const res = await request.post('/users/add').send(user_test)
            user_id = res.body.id
            expect(res.status).toBe(200)
        })
    })
    describe('AFTER ALL',()=>{
        afterAll(()=>{
            it('Delete method ( It requires token )', async ()=>{
                const res = await request.delete(`/users/${user_id}`).set('Authorization', `Bearer ${token}`)
                expect(res.status).toBe(200)
            })
        })
    })
})
