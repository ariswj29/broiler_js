import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class UsersController {
  public async index(ctx: HttpContextContract) {
    return [
      {
        id: 1,
        title: 'Hello world',
      },
      {
        id: 2,
        title: 'Hello universe',
      },
    ]
  }
  public async indexDatabase(ctx: HttpContextContract) {
    const users = await Database.query()
      .from('users')
      .select('id', 'name', 'email', 'created_at', 'updated_at')
    return [users, ctx.request.input('aris')]
  }

  public async login({ auth, request, response }) {
    const email = request.input('email')
    const password = request.input('password')
    try {
      const token = await auth.use('api').attempt(email, password)
      return token
    } catch {
      return response.unauthorized('Invalid credentials')
    }
  }
}
