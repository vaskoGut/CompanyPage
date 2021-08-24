const { defaults } = require('jest-config');

module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['./config/test/setupTest.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': 'jest-transform-file',
  },
  moduleNameMapper: {
    '@/data/(.*)': '<rootDir>/data/$1',
    '@/theme': '<rootDir>/theme',
    '@/utils': '<rootDir>/utils',
    '@/lib/(.*)': '<rootDir>/lib/$1',
    '@/queries/(.*)': '<rootDir>/lib/queries/$1',
    '@/pages': '<rootDir>/pages',
    '@/public/(.*)': '<rootDir>/public/$1',
    '@/components/(.*)': '<rootDir>/components/$1',
    '@/components/styles/(.*)': '<rootDir>/components/styles/$1',
    '@/test/util/(.*)': '<rootDir>/test/util/$1',
  },
};
