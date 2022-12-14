import {app} from "../../../../app"
import request from "supertest"
import { prisma } from './../../../../instances/prisma';
import {v4 as uuid} from "uuid"
import { hash } from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient()
let token = ''

describe("List Categories Controller", () => {

  beforeAll(async () => {
    const id = uuid()
    const password = await hash("admin", 10)

    await client.user.create({
      data: {
        driver_license: 'admin',
        email: 'admin',
        name: 'admin',
        password: password,
        avatar: 'x',
        id: id,
        isAdmin: true
      }
    })

    let responseToken = await request(app).post("/sessions")
    .send({
      email: "admin",
      password: 'admin'
    })

    token = responseToken.body.token
    await client.$disconnect()
  })

  it("should be able to list a all categories", async () => {
    
    await request(app).post("/categories")
    .send({
      name: "Category Supertests2", 
      description: "Category Supertests2",
    }).set({ Authorization: `Bearer ${token}` })

    const response = await request(app).get("/categories");
    
    expect(response.status).toBe(201);
    expect(response.body.categories[0]).toHaveProperty("id")
    expect(response.body.categories[0].name).toEqual("Category Supertests2")
    expect(response.body.categories[0].description).toEqual("Category Supertests2")
  })

  afterAll(async () => {
    await client.user.deleteMany()
    await client.$disconnect()
  })

})