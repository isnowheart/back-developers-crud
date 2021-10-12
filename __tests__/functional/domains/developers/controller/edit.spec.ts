import ApiFactory from "../../../../factories/ApiFactory"
import Provider from "../../../../../src/domains/developers/Provider"
import DeveloperFactory from "../../../../factories/DeveloperFactory"
import { Connection, createConnection } from "typeorm"
import { INestApplication } from "@nestjs/common"
import { Developer } from "../../../../../src/entities/Developer"
import { DevelopersController } from  "../../../../../src/domains/developers/DevelopersController"
import * as faker from 'faker'
import * as request from 'supertest'

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

it('Should update and return Developer', async () => {
  const params = { 
    name: faker.name.firstName(),
    gender: 'm'.toUpperCase(),
    hobby: faker.hacker.phrase(),
    birthdate: faker.date.past(100).toISOString().slice(0, 10),
  }
  const response = await request(api.getHttpServer()).put(`/developers/${developer.id}`).send(params)
  expect(response.status).toBe(200)
  expect(response.body).toEqual(
    expect.objectContaining({ name: params.name, gender: params.gender, hobby: params.hobby, birthdate: params.birthdate })
  )
  const storedDeveloper = await Developer.findOne(developer.id)
  expect(response.body).toEqual(
    expect.objectContaining({ name: storedDeveloper.name, gender: storedDeveloper.gender, 
      age: storedDeveloper.age, hobby: storedDeveloper.hobby, birthdate: storedDeveloper.birthdate 
    }),
  )
})

it('Should return a not found developer error', async () => {
  const params = {
    name: faker.name.firstName(),
    gender: faker.name.gender(),
    hobby: faker.hacker.phrase(),
    birthdate: faker.date.past(100).toDateString(),
  }
  const response = await request(api.getHttpServer()).put(`/developers/${developer.id}123`).send(params)
  expect(response.status).toBe(404)
  expect(response.body).toHaveProperty('statusCode')
  expect(response.body.statusCode).toEqual(response.status)
  expect(response.body).toHaveProperty('message')
  expect(response.body.message).toEqual('Developer not found.')
  expect(response.body).toHaveProperty('error')
  expect(response.body.error).toEqual('Not Found')
})