import { Developer } from "../../src/entities/Developer"
import * as faker from "faker"
import Validation from '../../src/domains/developers/shared/Validation'

type CreateDeveloperParams = {
  name?: string
  gender?: string
  age?: number
  hobby?: string
  birthdate?: string
}

async function create(params?:CreateDeveloperParams):Promise<Developer> {
  const date = faker.date.past(100).toISOString().split('T')[0]

  const developer = Developer.create({ 
    name: faker.name.firstName(),
    gender: 'f'.toUpperCase(),
    age: Validation.calcAge(date),
    hobby: faker.hacker.phrase(),
    birthdate: date,
    ...params
  })
  
  return developer.save()
}

export default { create }

