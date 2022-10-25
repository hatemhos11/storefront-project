import ordersClass from '../../models/orders.model'
import productsClass from '../../models/products.model'
import productsOrderClass from '../../models/productsOrder.model'
import usersClass from '../../models/users.model'


describe('productsOrder Methods Is Defined', () => {
    it('Get All method is defiend', () => {
        expect(productsOrderClass.Get).toBeDefined()
    })

    it('Get one method is defiend', () => {
        expect(productsOrderClass.GetOne).toBeDefined()
    })

    it('Insert method is defiend', () => {
        expect(productsOrderClass.Insert).toBeDefined()
    })

    it('Update method is defiend', () => {
        expect(productsOrderClass.update).toBeDefined()
    })

    it('Delete All method is defiend', () => {
        expect(productsOrderClass.delete).toBeDefined()
    })
})

// →→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→

const ExpectedProductsOrder = {
    order_id: 0,
    product_id: 0,
    quantity: 232
}
let productsOrder_id = 0
let user_id = ''

beforeAll( async () => {
    const user = await usersClass.Insert('test', 'test_password', "test@test.com")
    const product = await productsClass.Insert('test-product', 333, 23)
    user_id = await user.id
    const order = await ordersClass.Insert(user_id, 'active')
    ExpectedProductsOrder.product_id = +product.id
    ExpectedProductsOrder.order_id = +order.id
})


describe('CRUD productsOrder Models', () => {

    it('Add New productsOrder Is Checked', async () => {        
        const productsOrder = await productsOrderClass.Insert( 
            +ExpectedProductsOrder.product_id, 
            +ExpectedProductsOrder.order_id,
            +ExpectedProductsOrder.quantity
        )
        productsOrder_id = await productsOrder.id

        expect(productsOrder).toEqual({
            id: productsOrder_id, 
            order_id: ExpectedProductsOrder.order_id.toString(),
            product_id: ExpectedProductsOrder.product_id.toString(),
            quantity: ExpectedProductsOrder.quantity
        })
    })

    it('Get productsOrder', async () => {
        const productsOrder = await productsOrderClass.GetOne(
            ExpectedProductsOrder.order_id,
            ExpectedProductsOrder.product_id
        )
        expect(productsOrder).toEqual({
            id: productsOrder_id, 
            order_id: ExpectedProductsOrder.order_id.toString(),
            product_id: ExpectedProductsOrder.product_id.toString(),
            quantity: ExpectedProductsOrder.quantity
        })
    })
    
    describe("After All", () => {
        afterAll(() => {
            it('Delete productsOrder', async () => {
                const productsOrder = await productsOrderClass.delete(
                    ExpectedProductsOrder.order_id, 
                    ExpectedProductsOrder.product_id
                )
                expect(productsOrder).toEqual({})
            });
        })
    })
})
