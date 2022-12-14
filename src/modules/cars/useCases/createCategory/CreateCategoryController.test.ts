import {app} from "../../../../app"
import request from "supertest"
import { prisma } from './../../../../instances/prisma';
import {v4 as uuid} from "uuid"
import { hash } from 'bcrypt';
import { AppError } from './../../../../errors/AppError';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient()

let adminToken = ''
let userToken = ''

describe("Create Category Controller", () => {


  beforeAll(async () => {
    const admin = uuid()
    const user = uuid()
    const password = await hash("admin", 10)

    await client.user.create({
      data: {
        driver_license: 'admin',
        email: 'admin',
        name: 'admin',
        password: password,
        avatar: 'x',
        id: admin,
        isAdmin: true
      }
    })

    await client.user.create({
      data: {
        driver_license: 'user',
        email: 'user',
        name: 'user',
        password: password,
        avatar: 'x',
        id: user,
        isAdmin: false
      }
    })

    let responseAdminToken = await request(app).post("/sessions")
    .send({
      email: "admin",
      password: 'admin'
    })

    let responseUserToken = await request(app).post("/sessions")
    .send({
      emal: "user",
      password: "admin"
    })

    adminToken = responseAdminToken.body.token
    userToken = responseUserToken.body.token
    await client.$disconnect()
  })

  it("should be able to create a new category as admin", async () => {
    
    const response = await request(app).post("/categories")
    .send({
      name: "Category Supertest2", 
      description: "Category Supertests2",
    }).set({
      Authorization: `Bearer ${adminToken}`
    })


    expect(response.status).toBe(201);
  })

  it("should not be able to create a new category as normal user", async () => {
    
    const response = await request(app).post("/categories")
    .send({
      name: "Category Supertest2", 
      description: "Category Supertests2",
    }).set({
      Authorization: `Bearer ${userToken}`
    })

    expect(response.status).toBe(400);
  })

  // it("should not be able to create a new category without a token", async () => {
    
  //   const response = await request(app).post("/categories")
  //   .send({
  //     name: "Category Supertest2", 
  //     description: "Category Supertests2",
  //   })

  //   expect(response.status).toBe(401);
  // })

  it("should not  be able to create a exists category", async () => {
    await request(app).post("/categories")
    .send({
      name: "Category Supertest Exists", 
      description: "Category Supertests Exists",
    }).set({ Authorization: `Bearer ${adminToken}` })

    const response = await request(app).post("/categories")
    .send({
      name: "Category Supertest Exists", 
      description: "Category Supertests Exists",
    }).set({ Authorization: `Bearer ${adminToken}` })

    
    expect(response.status).toBe(400);
  })

  afterAll(async () => {
    await client.user.deleteMany()
    await client.$disconnect()
  })

})