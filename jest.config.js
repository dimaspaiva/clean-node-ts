module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  collectCoverageFrom: ["**/*.ts"],
  coveragePathIgnorePatterns: ["/node_modules/", ".+\\.d.ts$"],
  preset: '@shelf/jest-mongodb',
};
