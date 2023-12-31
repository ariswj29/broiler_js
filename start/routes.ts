/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('users', 'UsersController.index')
Route.get('usersDatabase', 'UsersController.indexDatabase')
Route.get('user-count', 'UsersController.getCount')
Route.get('user', 'UsersController.get')
Route.post('user', 'UsersController.store')
Route.get('user/:id', 'UsersController.show')
Route.put('user/:id', 'UsersController.update')
Route.delete('user/:id', 'UsersController.destroy')
Route.post('login', 'UsersController.login')

Route.get('/', async () => {
  return { hello: 'world' }
})
