import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Sale extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({})
  public userId: number

  @column({})
  public productId: number

  @column({})
  public userName: string

  @column({})
  public productName: string

  @column({})
  public productPrice: number

  @column({})
  public quantity: number

  @column({})
  public totalPrice: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
