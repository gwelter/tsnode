module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json'
    }
  },
  verbose: true,
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'ts', 'tsx'],
  preset: 'ts-jest',
  testMatch: null,
  setupFilesAfterEnv: ['<rootDir>/test-db-setup.ts']
}
