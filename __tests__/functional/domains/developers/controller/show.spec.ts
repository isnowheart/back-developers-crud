import { INestApplication } from "@nestjs/common"
import * as request from 'supertest'
import { Connection, createConnection } from "typeorm"
import { Developer } from "../../../../../src/entities/Developer"
import { DevelopersController } from  "../../../../../src/domains/developers/DevelopersController"
import Provider from "../../../../../src/domains/developers/Provider"
import ApiFactory from "../../../../factories/ApiFactory"
import DeveloperFactory from "../../../../factories/DeveloperFactory"

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

it('Should return an Developer per ID', async () => {
  const response = await request(api.getHttpServer()).get(`/developers/${developer.id}`)
  expect(response.status).toBe(200)
  expect(response.body).toEqual(
    expect.objectContaining({ 
      id: developer.id, name: developer.name, gender: developer.gender, 
      age: developer.age, hobby: developer.hobby, birthdate: developer.birthdate
    })
  )
})

it('Should return a not found developer error', async () => {
  const response = await request(api.getHttpServer()).get(`/developers/${developer.id}123`)

  expect(response.status).toBe(404)
  expect(response.body).toHaveProperty('statusCode')
  expect(response.body.statusCode).toEqual(response.status)
  expect(response.body).toHaveProperty('message')
  expect(response.body.message).toEqual('Developer not found.')
  expect(response.body).toHaveProperty('error')
  expect(response.body.error).toEqual('Not Found')
})