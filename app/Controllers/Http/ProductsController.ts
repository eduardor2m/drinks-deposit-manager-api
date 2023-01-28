import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from '../../Models/Product'

export default class ProductsController {
  public async index({}: HttpContextContract) {
    const allProducts = await Product.all()

    return allProducts
  }

  public async create({ request }: HttpContextContract) {
    const data = request.only(['name', 'category', 'description', 'price', 'image', 'quantity'])

    if (
      !data.name ||
      !data.category ||
      !data.description ||
      !data.price ||
      !data.image ||
      !data.quantity
    ) {
      return { error: 'Missing data' }
    }

    const product = {
      name: data.name,
      category: data.category,
      description: data.description,
      price: data.price,
      image: data.image,
      quantity: data.quantity,
    }

    const productSave = await Product.create(product)

    return productSave
  }

  public async show({ request }: HttpContextContract) {
    const { id } = request.params()

    const product = await Product.findOrFail(id)

    return product
  }

  public async update({ request }: HttpContextContract) {
    const { id } = request.params()
    const { name, category, description, price, image, quantity } = request.only([
      'name',
      'category',
      'description',
      'price',
      'image',
      'quantity',
    ])

    if (!name && !category && !description && !price && !image && !quantity) {
      return { error: 'Missing data' }
    }

    const product = await Product.findOrFail(id)

    if (name) {
      product.name = name
    } else if (category) {
      product.category = category
    } else if (description) {
      product.description = description
    } else if (price) {
      product.price = price
    } else if (image) {
      product.image = image
    } else if (quantity) {
      product.quantity = quantity
    }

    await product.save()

    return { message: 'Product updated' }
  }

  public async destroy({ request }: HttpContextContract) {
    const { id } = request.params()

    const product = await Product.findOrFail(id)

    await product.delete()

    return { message: 'Product deleted' }
  }
}
