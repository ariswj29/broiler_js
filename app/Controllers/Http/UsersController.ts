import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

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

    // Lookup user manually
    const user = await User.query()
      .where('email', email)
      // .where('tenant_id', getTenantIdFromSomewhere)
      // .whereNull('is_deleted')
      .firstOrFail()
    // Verify password
    if (!(await Hash.verify(user.password, password))) {
      return response.unauthorized('Invalid credentials')
    }
    // Generate token
    // const token = await auth.use('api').generate(user)
    const jwt = await auth.use('jwt').generate(user)
    return { user, jwt }
  }
}
