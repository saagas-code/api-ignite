import {app} from "../../../../app"
import request from "supertest"
import { prisma } from './../../../../instances/prisma';
import {v4 as uuid} from "uuid"
import { hash } from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient()

describe("Authenticate one User Controller", () => {

  beforeEach(async () => {
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
    await client.$disconnect()

  })

  it("should be able to authenticate byself", async () => {
    
    const response = await request(app).post("/sessions")
    .send({
      email: "admin", 
      password: "admin",
    })

    expect(response.status).toBe(200);
    // expect(response.body).toHaveProperty("token")
    // expect(response.body).toHaveProperty("refresh_token")
    // expect(response.body).toHaveProperty("user")
    // expect(response.body.user.email).toEqual("admin")
    // expect(response.body.user.name).toEqual("admin")
  })

  // it("should not  be able to create a exists category", async () => {
  //   await request(app).post("/categories")
  //   .send({
  //     name: "Category Supertest Exists", 
  //     description: "Category Supertests Exists",
  //   }).set({ Authorization: `Bearer ${token}` })

  //   const response = await request(app).post("/categories")
  //   .send({
  //     name: "Category Supertest Exists", 
  //     description: "Category Supertests Exists",
  //   }).set({ Authorization: `Bearer ${token}` })

    
  //   expect(response.status).toBe(400);
  // })

  afterAll(async () => {
    await client.user.deleteMany()
    await client.$disconnect()
  })

})