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

  public async get({request}) {
    const page = request.input('page', 1)
    const limit = 10

    const data = await Database.from('users').paginate(page, limit)

    return data
  }

  public async store({ request , response }: HttpContextContract) {
    const input = request.only(['email', 'password'])
    try {
      const users = await User.create(input)

      return response.status(200).json({ code: 200, status: 'success', data: users })
    } catch (err) {
      return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  public async show({ params }) {
    const data = User.find(params.id)
    return data
  }

  public async update({ params, request, response }: HttpContextContract) {
    const input = request.only(['email', 'password'])
    try {
      const users = await User.findBy('id', params.id)
      users?.merge(input)

      await users?.save()

      return response.status(200).json({ code: 200, status: 'success', data: users })
    } catch (err) {
      return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const user = await User.findBy('id', params.id)
      await user?.delete()

      return response.status(200).json({ code: 200, status: 'success', message: 'Data has been deleted' })
    } catch (err) {
      return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }
}
