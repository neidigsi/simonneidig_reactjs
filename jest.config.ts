import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "json", "lcov", "cobertura"],
  setupFilesAfterEnv: ["<rootDir>/app/setupTests.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    // TanStack Table v9 ships ESM-only, so it must be transformed for Jest (CJS)
    "^.+\\.(js|jsx|mjs|cjs)$": ["ts-jest", { tsconfig: { allowJs: true } }],
  },
  // Transform ESM-only TanStack packages inside node_modules, ignore the rest
  transformIgnorePatterns: ["/node_modules/(?!@tanstack/)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/app/$1",
    "^react-router$": "<rootDir>/app/testUtils/reactRouterStub.tsx",
  },
  reporters: [
    "default",
    [
      "jest-junit",
      { outputDirectory: "./test-results", outputName: "results.xml" },
    ],
  ],
};

export default config;
