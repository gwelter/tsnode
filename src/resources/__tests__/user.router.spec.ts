import { userRouter } from '../user.router'

describe('userRouter router', (): void => {
  test('should have crud routes', (): void => {
    const routes = [
      { path: '/', method: 'get' },
      { path: '/:id', method: 'get' },
      { path: '/:id', method: 'delete' },
      { path: '/:id', method: 'put' },
      { path: '/', method: 'post' }
    ]

    routes.forEach((route): void => {
      const match = userRouter.stack.find(
        (s): {
          route: {
            path:string;
            methods: []
          }
        } => s.route.path === route.path && s.route.methods[route.method])
      expect(match).toBeTruthy()
    })
  })
})
