import { userType } from '../../interfaces/user.interface'
import usersClass from '../../models/users.model'

describe('User Methods Is Defined', () => {
    it('Get All method is defiend', () => {
        expect(usersClass.Get).toBeDefined()
    })

    it('Get one method is defiend', () => {
        expect(usersClass.GetOne).toBeDefined()
    })

    it('Insert method is defiend', () => {
        expect(usersClass.Insert).toBeDefined()
    })

    it('Update method is defiend', () => {
        expect(usersClass.update).toBeDefined()
    })

    it('Delete All method is defiend', () => {
        expect(usersClass.delete).toBeDefined()
    })
})
// →→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→
const TestUser = {
    username: 'test',
    password: '123456',
    email: 'test@test.com'
}
const getUser = {
    username: 'test',
    email: 'test@test.com'
}
let user_id = ''


describe('CRUD User Models', () => {
    
    it('Add New User Is Checked', async () => {
        const user = await usersClass.Insert(TestUser.username, TestUser.password, TestUser.email)
        user_id = await user.id
        expect(user).toEqual({id: user_id, ...getUser})
    })

    it('Get User', async () => {
        const user = await usersClass.GetOne(user_id)
        expect(user).toEqual({id: user_id, ...getUser})
    })

    it('Update User', async () => {
        const user = await usersClass.update(user_id, 'new-user', '', 'user@gmail.com')
        expect(user).toEqual({id: user_id, username: 'new-user', email: 'user@gmail.com'})
    })

})


describe('After All',()=>{
    afterAll(() => {
        it('Delete User', async () => {
            const user: userType[] = await usersClass.delete(user_id)
            expect(user).toEqual([getUser])
        })
    })
})
