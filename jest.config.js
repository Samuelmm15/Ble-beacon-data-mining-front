// jest.config.js
// eslint-disable-next-line import/no-anonymous-default-export
// jest.config.js
module.exports = {
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  testEnvironment: "node",
  roots: ["./src"],
  testPathIgnorePatterns: ["./src/streamingPlatformIcons"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node",
    "lcov",
    "clover",
    "text",
  ],
  testRetry: 3,
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|svg|ico)$": "identity-obj-proxy",
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  collectCoverage: true,
  coverageReporters: ["lcov"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.test.{js,jsx,ts,tsx}",
  ],
  coverageThreshold: {
    global: {
      branches: 4,
      functions: 14,
      lines: 24,
      statements: 28,
    },
  },
};
