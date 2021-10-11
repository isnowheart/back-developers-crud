import ApiFactory from "../../../../factories/ApiFactory"
import Provider from '../../../../../src/domains/developers/Provider'
import DeveloperFactory from "../../../../factories/DeveloperFactory"
import { Connection, createConnection } from "typeorm"
import { INestApplication } from "@nestjs/common"
import { Developer } from "../../../../../src/entities/Developer"
import { DevelopersController } from  "../../../../../src/domains/developers/DevelopersController"
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

it('Should delete an Developer', async () => {
  const response = await request(api.getHttpServer()).delete(`/developers/${developer.id}`)
  expect(response.status).toBe(204)
  expect(response.body).toEqual({})
})

it('Should return a not found developer error', async () => {
  const response = await request(api.getHttpServer()).delete(`/developers/${developer.id}123`)

  expect(response.status).toBe(404)
  expect(response.body).toHaveProperty('statusCode')
  expect(response.body.statusCode).toEqual(response.status)
  expect(response.body).toHaveProperty('message')
  expect(response.body.message).toEqual('Developer not found.')
  expect(response.body).toHaveProperty('error')
  expect(response.body.error).toEqual('Not Found')
})
