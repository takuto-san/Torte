/* eslint-disable import/no-default-export */
import type { Config } from 'jest';
import jestConfig from '../jest.config';

// https://github.com/nestjs/graphql/issues/810#issuecomment-618308354
const e2eJestConfig: Config = {
  ...jestConfig,
  rootDir: '.',
  testMatch: ['**/e2e/**/*.+(spec|test).[tj]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.e2e.json',
        // https://kulshekhar.github.io/ts-jest/docs/getting-started/options/astTransformers
        astTransformers: {
          before: ['<rootDir>/jest.e2e.transformer.ts'],
        },
      },
    ],
  },
  moduleNameMapper: {
    '#(.*)': '<rootDir>/../src/$1',
  },
};

export default e2eJestConfig;
