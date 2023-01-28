interface User {
  id: string
  name: string
  email: string
  password: string
}

export default class UserModel {
  public id: string
  public name: string
  public email: string
  public password: string

  constructor({ id, name, email, password }: User) {
    this.id = id
    this.name = name
    this.email = email
    this.password = password
  }
}
