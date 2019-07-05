import request from 'supertest'
import { app } from '../../server'
import { User } from '../register.model'

describe('user controllers', (): void => {
  describe('getOne', (): void => {
    it('should a user by object id', async (): Promise<void> => {
      const user = await User.create({
        firstName: 'Nemo',
        lastName: 'Nemo',
        email: 'nemo@nemo.com'
      })

      const response = await request(app).get(`/api/user/${user._id}`)

      expect(response.status).toBe(200)
      expect(response.body.data.firstName).toEqual(user.firstName)
    })
  })

  describe('getMany', (): void => {
    it('should get all users in the DB', async (): Promise<void> => {
      const usersToCreate = [
        {
          firstName: 'Nemo',
          lastName: 'Nemo',
          email: 'nemo@nemo.com'
        },
        {
          firstName: 'Nemo1',
          lastName: 'Nemo1',
          email: 'nemo1@nemo.com'
        },
        {
          firstName: 'Nemo3',
          lastName: 'Nemo3',
          email: 'nemo3@nemo.com'
        }
      ]
      const users = await User.create(usersToCreate)
      const response = await request(app).get('/api/user')

      expect(response.status).toBe(200)
      expect(response.body.data).toHaveLength(users.length)
    })
  })

  describe('createOne', (): void => {
    it('should create a user', async (): Promise<void> => {
      const userConfig = {
        firstName: 'Nemo',
        lastName: 'Nemo',
        email: 'nemo@nemo.com'
      }
      const response = await request(app).post('/api/user').send(userConfig)
      const { _id, firstName } = response.body.data

      expect(response.status).toBe(201)
      expect(firstName).toEqual(userConfig.firstName)

      const match = await User.findById(_id).exec()
      expect(match.id).toBe(_id)
    })
  })

  describe('removeOne', (): void => {
    it('remove user by id', async (): Promise<void> => {
      const { _id } = await User.create({
        firstName: 'Nemo',
        lastName: 'Nemo',
        email: 'nemo@nemo.com'
      })
      await request(app).delete(`/api/user/${_id}`)

      const match = await User.findById(_id).exec()
      expect(match).toBe(null)
    })
  })

  describe('updateOne', (): void => {
    it('update user by id', async (): Promise<void> => {
      const { _id } = await User.create({
        firstName: 'Nemo',
        lastName: 'Nemo',
        email: 'nemo@nemo.com'
      })
      const newEmail = 'new@email.com'

      const response = await request(app).put(`/api/user/${_id}`).send({ email: newEmail })
      const user = response.body.data

      expect(response.status).toBe(200)
      expect(user.email).toEqual(newEmail)
      expect(`${_id}`).toEqual(user._id)
    })
  })
})
