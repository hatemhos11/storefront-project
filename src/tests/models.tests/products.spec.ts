import productsClass from '../../models/products.model'
import usersClass from '../../models/users.model'

describe('Products Methods Is Defined', () => {
    it('Get All method is defiend', () => {
        expect(productsClass.Get).toBeDefined()
    })

    it('Get one method is defiend', () => {
        expect(productsClass.GetOne).toBeDefined()
    })

    it('Insert method is defiend', () => {
        expect(productsClass.Insert).toBeDefined()
    })

    it('Delete All method is defiend', () => {
        expect(productsClass.delete).toBeDefined()
    })
})

// →→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→


const ExpectedProduct = {
    name: 'product-name',
    price: 333,
    quantity: 425
}
let user_id = ''
let product_id = ''

beforeAll( async()=>{
    const user = await usersClass.Insert('test', 'test_password', "test@test.com")
    user_id = user.id
})


describe('CRUD product Models', () => {
    
    it('Add New product Is Checked', async () => {
        const product = await productsClass.Insert( ExpectedProduct.name , ExpectedProduct.price, ExpectedProduct.quantity)
        product_id = await product.id

        expect(product).toEqual({ id: product_id, ...ExpectedProduct})
    })

    it('Get product', async () => {
        const product = await productsClass.GetOne(product_id)
        expect(product).toEqual({id: product_id, ...ExpectedProduct})
    })
    
    describe("After All", () => {
        afterAll(() => {
            it('Delete product', async () => {
                const product = await productsClass.delete(product_id)
                expect(product).toEqual({})
            });
        })
    })
})
