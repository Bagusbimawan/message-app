const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
  moduleNameMapping: {
    '^@messaging/types$': '<rootDir>/../../shared/types/src',
    '^@messaging/types/(.*)$': '<rootDir>/../../shared/types/src/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/__tests__/**/*.test.{ts,tsx}'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
};

module.exports = createJestConfig(config);