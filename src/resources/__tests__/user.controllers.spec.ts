import request from 'supertest'
import { app } from '../../server'
// import { getOne, getMany } from '../user.controllers'
import { User } from '../user.model'

describe('user controllers', (): void => {
  describe('getOne', (): void => {
    it('should return a user bi its id', async (): Promise<void> => {
      const user = await User.create({
        firstName: 'Nemo',
        lastName: 'Nemo',
        email: 'nemo@nemo.com'
      })

      const response = await request(app)
        .get(`/api/user/${user._id}`)
        .set('Accept', 'application/json')

      expect(response.status).toBe(200)
      expect(response.body.data.firstName).toEqual(user.firstName)
    })
  })
})
