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
}
