import type { Config } from '@jest/types';
import { exec } from 'node:child_process';
import dotenv from 'dotenv';
import NodeEnvironment from 'jest-environment-node';
import { Client } from 'pg';
import util from 'node:util';
import crypto from 'node:crypto';
import { prisma } from './../src/instances/prisma';

dotenv.config({ path: '.env.testing' });

const execSync = util.promisify(exec);

const prismaBinary = './node_modules/.bin/prisma';

export default class PrismaTestEnvironment extends NodeEnvironment {
  private schema: string;
  private connectionString: string;

  constructor(globalConfig: any, projectConfig: any) {
    super(globalConfig, projectConfig);

    const dbUser = process.env.DATABASE_USER;
    const dbPass = process.env.DATABASE_PASS;
    const dbHost = process.env.DATABASE_HOST;
    const dbPort = process.env.DATABASE_PORT;
    const dbName = process.env.DATABASE_NAME;

    this.schema = `test_${crypto.randomUUID()}`;
    this.connectionString = `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?schema=${this.schema}&pool_timeout=15`
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;

    await execSync(`npx prisma migrate dev`);
    // await prisma.user.create({
    //   data: {
    //     driver_license: 'admin',
    //     email: 'admin',
    //     name: 'admin',
    //     password: 'x',
    //     avatar: 'x',
    //     id: '41515',
    //     isAdmin: true
    //   }
    // })
    console.log('TESTEEEEEEEEEEEEEEEEEEEEEE', process.env.DATABASE_URL)
    console.log('TESTEEEEEEEEEEEEEEEEEEEEEE', this.global.process.env.DATABASE_URL)

    return super.setup();
  }

  async teardown() {
    const client = new Client({
      connectionString: this.connectionString,
    });

    await client.connect();
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
    await client.end();
  }
}