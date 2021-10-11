import ApiFactory from "../../../../factories/ApiFactory"
import Provider  from "../../../../../src/domains/developers/Provider"
import DeveloperFactory from "../../../../factories/DeveloperFactory"
import { Connection, createConnection } from "typeorm"
import { INestApplication } from "@nestjs/common"
import { Developer } from "../../../../../src/entities/Developer"
import { DevelopersController } from  '../../../../../src/domains/developers/DevelopersController'
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

it('Should return developers List', async () => {
  const response = await request(api.getHttpServer()).get('/developers')
  expect(response.status).toBe(200)
  expect(response.body).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: developer.id, name: developer.name, gender: developer.gender, 
        age: developer.age, hobby: developer.hobby, birthdate: developer.birthdate
      })
    ])
  )
})