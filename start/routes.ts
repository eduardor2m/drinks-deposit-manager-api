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

Route.group(() => {
  Route.group(() => {
    Route.get('/', 'UsersController.index') // /api/v1/users
    Route.post('/', 'UsersController.create') // /api/v1/posts
    Route.get('/:id', 'UsersController.show') // /api/v1/users/1
    Route.put('/:id', 'UsersController.edit') // /api/v1/users/1
    Route.post('/:id', 'UsersController.update') // /api/v1/users/1
    Route.delete('/:id', 'UsersController.destroy') // /api/v1/users/1
  }).prefix('/users')
  Route.group(() => {
    Route.get('/', 'ProductsController.index') // /api/v1/posts
    Route.post('/', 'ProductsController.create') // /api/v1/posts
    Route.get('/:id', 'ProductsController.show') // /api/v1/posts/1
    Route.post('/:id', 'ProductsController.update') // /api/v1/posts/1
    Route.delete('/:id', 'ProductsController.destroy') // /api/v1/posts/1
  }).prefix('/products')
  Route.group(() => {
    Route.get('/', 'SalesController.index') // /api/v1/posts
    Route.post('/', 'SalesController.create') // /api/v1/posts
    Route.get('/:id', 'SalesController.show') // /api/v1/posts/1
    Route.delete('/:id', 'SalesController.destroy') // /api/v1/posts/1
  }).prefix('/sales')
})
  .prefix('/api/v1')
  .middleware('auth')
