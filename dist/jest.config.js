"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    testEnvironment: 'node',
    maxWorkers: 1,
    preset: 'ts-jest',
    verbose: true,
    setupFilesAfterEnv: ['./src/config/setupTests.ts'],
    testTimeout: 12000,
};
exports.default = config;
