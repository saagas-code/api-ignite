import jestConfig from "./jest.config"

export default {
  ...jestConfig,
  testEnvironment: './prisma/prisma-test-environment.ts',
  // bail: true,
  // clearMocks: true,
  coverageProvider: "v8",
  preset: "ts-jest",
  testRegex: '.test.ts$'
}