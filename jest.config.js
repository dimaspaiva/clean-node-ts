module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/main/**/*.ts",
  ],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  coveragePathIgnorePatterns: ["/node_modules/", ".+\\.d.ts$"],
  preset: "@shelf/jest-mongodb",
};
