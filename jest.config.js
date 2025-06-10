/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transformIgnorePatterns: [
    "/node_modules/(?!@tanstack|@testing-library).+\\.js$",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

module.exports = config;
