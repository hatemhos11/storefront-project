import orderClass from '../../models/orders.model'
import usersClass from '../../models/users.model'

describe('Orders Methods Is Defined', () => {
    it('Get All method is defiend', () => {
        expect(orderClass.Get).toBeDefined()
    })

    it('Get one method is defiend', () => {
        expect(orderClass.GetOne).toBeDefined()
    })

    it('Insert method is defiend', () => {
        expect(orderClass.Insert).toBeDefined()
    })

    it('Delete All method is defiend', () => {
        expect(orderClass.delete).toBeDefined()
    })
})
// →→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→

const TestOrder = {
    status: 'active'
}
const ExpectedOrder = {
    status: 'active'
}
let user_id = ''
let order_id = ''

beforeAll( async()=>{
    const user = await usersClass.Insert('test', 'test_password', "test@test.com")
    user_id = user.id
})


describe('CRUD Order Models', () => {
    
    it('Add New Order Is Checked', async () => {
        const order = await orderClass.Insert(user_id, 'active')
        order_id = await order.id
        expect(order).toEqual({ id: order_id, ...ExpectedOrder})
    })

    it('Get order', async () => {
        const order = await orderClass.GetOne(order_id, user_id)
        expect(order).toEqual({id: order_id, ...ExpectedOrder})
    })
    
    describe("After All", () => {
        afterAll(() => {
            it('Delete order', async () => {
                const order = await orderClass.delete(order_id, user_id)
                expect(order).toEqual({})
            });
        })
    })
})
