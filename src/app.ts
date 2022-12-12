import "reflect-metadata";
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger.json'
import "./shared/container"
import { router } from './routes';
import { multerErrorHandler } from './config/multerErrorHandler';
import { appErrorHandler } from './errors/appErrorHandler';

dotenv.config()
export const app = express();

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.urlencoded({ extended: true }))

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router);

app.use(appErrorHandler)
app.use(multerErrorHandler)



