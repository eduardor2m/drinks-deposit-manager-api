import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

interface User {
  id: string
  name: string
  email: string
  password: string
}

export default class UsersController {
  public async index({}: HttpContextContract) {
    return [
      {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
      },
    ]
  }

  public async create({ request }: HttpContextContract) {
    const data = request.only(['name', 'email', 'password'])

    if (!data.name || !data.email || !data.password) {
      return { error: 'Missing data' }
    }

    const user: User = {
      id: String(new Date().getTime() + Math.random()),
      name: data.name,
      email: data.email,
      password: data.password,
    }

    return user
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
