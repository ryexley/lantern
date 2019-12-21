module.exports = {
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
    "^.+\\.(js|jsx)?$": "babel-jest"
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: [
    "<rootDir>/(tests/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))"
  ],
  testURL: "http://localhost/",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/{!(routes.js),}.(js|vue)"],
  coverageReporters: ["text-summary", "lcov"],
  setupFilesAfterEnv: ["jest-extended"],
  clearMocks: true
}
