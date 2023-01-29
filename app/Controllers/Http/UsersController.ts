import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import User from '../../Models/User'

export default class UsersController {
  public async index({}: HttpContextContract) {
    const users = await User.all()

    return users
  }

  public async create({ request }: HttpContextContract) {
    const data = request.only(['name', 'email', 'password'])

    if (!data.name || !data.email || !data.password) {
      return { error: 'Missing data' }
    }

    const userExists = await User.findBy('email', data.email)

    if (userExists) {
      return { error: 'User already exists' }
    }

    const password = await Hash.make(data.password)

    const user = {
      name: data.name,
      email: data.email,
      password,
    }

    const userSave = await User.create(user)

    return userSave
  }

  public async edit({ request }: HttpContextContract) {
    const { id } = request.params()
    const { password } = request.only(['password'])

    if (!password) {
      return { error: 'Missing data' }
    }

    const user = await User.findOrFail(id)

    user.password = password

    await user
      .save()
      .then(() => {
        return { message: 'Password updated' }
      })
      .catch(() => {
        return { error: 'Error updating password' }
      })
  }

  public async update({ request }: HttpContextContract) {
    const { id } = request.params()
    const { name, email } = request.only(['name', 'email'])

    if (!name && !email) {
      return { error: 'Missing data' }
    }

    const user = await User.findOrFail(id)

    if (name) {
      user.name = name
    } else if (email) {
      user.email = email
    }

    await user
      .save()
      .then(() => {
        return { message: 'User updated' }
      })
      .catch(() => {
        return { error: 'Error updating user' }
      })
  }

  public async destroy({ request }: HttpContextContract) {
    const { id } = request.params()

    const user = await User.findOrFail(id)

    await user.delete()

    return { message: 'User deleted' }
  }
}
