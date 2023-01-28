import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from '../../Models/Product'
import Sale from '../../Models/Sale'
import User from '../../Models/User'

export default class SalesController {
  public async index({}: HttpContextContract) {
    const sales = await Sale.all()

    return sales
  }

  public async create({ request }: HttpContextContract) {
    const { userId, productId, quantity } = request.only(['userId', 'productId', 'quantity'])

    if (!userId || !productId || !quantity) {
      return { error: 'Missing data' }
    }

    const user = await User.findOrFail(userId)

    if (!user) {
      return { error: 'User not found' }
    }

    const product = await Product.findOrFail(productId)

    if (!product) {
      return { error: 'Product not found' }
    }

    if (product.quantity < quantity) {
      return { error: 'Insufficient quantity' }
    } else {
      product.quantity -= quantity
      await product.save()
    }

    const sale = {
      userId,
      productId,
      userName: user.name,
      productName: product.name,
      quantity,
      productPrice: product.price,
      totalPrice: product.price * quantity,
    }

    await Sale.create(sale)

    return { message: 'Sale created' }
  }

  public async show({ request }: HttpContextContract) {
    const { id } = request.params()

    const sale = await Sale.findOrFail(id)

    return sale
  }

  public async destroy({ request }: HttpContextContract) {
    const { id } = request.params()

    const sale = await Sale.findOrFail(id)

    await sale.delete()

    return { message: 'Sale deleted' }
  }
}
