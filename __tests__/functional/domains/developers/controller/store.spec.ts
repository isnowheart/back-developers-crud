import { INestApplication } from "@nestjs/common"
import * as faker from 'faker'
import * as request from 'supertest'
import { Connection, createConnection } from "typeorm"
import { Developer } from "../../../../../src/entities/Developer"
import { DevelopersController } from  "../../../../../src/domains/developers/DevelopersController"
import ApiFactory from "../../../../factories/ApiFactory"
import Provider from "../../../../../src/domains/developers/Provider"
import DeveloperFactory from "../../../../factories/DeveloperFactory"
import calcAge from '../../../../../src/domains/developers/shared/DeveloperCalcAge'

let connection:Connection
let api:INestApplication
let developer: Developer

beforeAll(async () => {
  connection = await createConnection()
  api = await ApiFactory.create({providers:[Provider], controllers:[DevelopersController]})
  await api.init()
  developer = await DeveloperFactory.create()
})

afterAll(async () => {
  await connection.close()
})

it('Should return a Developer', async () => {
  const date = faker.date.past(100).toISOString().slice(0, 10)
  const params = { 
    name: faker.name.firstName(),
    age: calcAge(date),
    gender: 'm'.toUpperCase(),
    hobby: faker.hacker.phrase(),
    birthdate: date.slice(0, 10),
  }
  const response = await request(api.getHttpServer()).post('/developers').send(params)
  expect(response.status).toBe(201)
  expect(response.body).toEqual(
    expect.objectContaining({ name: params.name, gender: params.gender, age: params.age,
      hobby: params.hobby, birthdate: params.birthdate
    })
  )

  const storedDeveloper = await Developer.findOne(response.body.id)
  expect(response.body).toEqual(
    expect.objectContaining({ id: storedDeveloper.id, name: storedDeveloper.name, gender: storedDeveloper.gender,
      age: storedDeveloper.age, hobby: storedDeveloper.hobby, birthdate: storedDeveloper.birthdate
    }),
  )
})
  
it('Should return a bad request error if not sending a valid gender f/m', async () => {
  const date = faker.date.past(100).toISOString().slice(0, 10)
  const params = { 
    name: faker.name.firstName(),
    age: calcAge(date),
    gender: faker.random.alpha().toUpperCase(),
    hobby: faker.hacker.phrase(),
    birthdate: date.slice(0, 10),
  }
  const response = await request(api.getHttpServer()).post('/developers').send(params)
  expect(response.status).toBe(400)
  expect(response.body).toHaveProperty('response')
  expect(response.status).toBe(400)
  expect(response.body).toHaveProperty('response')
  expect(response.body.response).toEqual(
    expect.objectContaining({
      statusCode: 400,
      message: 'Gender must be F or M.',
      error: 'Bad Request'
    }),
  )
})
  
it('Should return a bad request error if not sending a valid birth date', async () => {
  const params = {
    name: faker.name.firstName(),
    gender: faker.name.gender(),
    hobby: faker.hacker.phrase(),
    birthdate: faker.date.future().toDateString()
  }
  
  const response = await request(api.getHttpServer()).post('/developers').send(params)
  expect(response.status).toBe(400)
  expect(response.body).toHaveProperty('response')
  expect(response.status).toBe(400)
  expect(response.body).toHaveProperty('response')
  expect(response.body.response).toEqual(
    expect.objectContaining({
      statusCode: 400,
      message: 'Birth date must be a valid date.',
      error: 'Bad Request'
    }),
  )
})