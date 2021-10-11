import { Developer } from "../../src/entities/Developer"
import * as faker from "faker"
import { calcAge } from '../../src/domains/developers/shared/DeveloperParams'

type CreateDeveloperParams = {
  name?: string
  gender?: string
  age?: number
  hobby?: string
  birthdate?: string
}

async function create(params?:CreateDeveloperParams):Promise<Developer> {
  const date = faker.date.past(100).toISOString().slice(0, 10)

  const developer = Developer.create({ 
    name: faker.name.firstName(),
    gender: faker.random.alpha().toUpperCase(),
    age: calcAge(date),
    hobby: faker.hacker.phrase(),
    birthdate: date,
    ...params
  })
  
  return developer.save()
}

export default { create }

