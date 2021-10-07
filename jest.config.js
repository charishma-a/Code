module.exports = {
  roots: ['<rootDir>'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  testPathIgnorePatterns: [
    '<rootDir>[/\\\\](node_modules|.next|cypress)[/\\\\]',
  ],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  moduleDirectories: ['node_modules', 'test', __dirname],
  moduleNameMapper: {
    '@/test/(.*)': '<rootDir>/test/$1',
    '@/common/(.*)': '<rootDir>/src/common/$1',
    '@/components/(.*)': '<rootDir>/src/components/$1',
    '@/constants/(.*)': '<rootDir>/src/constants/$1',
    '@/data/(.*)': '<rootDir>/src/data/$1',
    '@/fixtures/(.*)': '<rootDir>/src/fixtures/$1',
    '@/generated/(.*)': '<rootDir>/src/generated/$1',
    '@/graphql/(.*)': '<rootDir>/src/graphql/$1',
    '@/lib/(.*)': '<rootDir>/src/lib/$1',
    '@/pages/(.*)': '<rootDir>/src/pages/$1',
    '@/store/(.*)': '<rootDir>/src/store/$1',
    '@/styles/(.*)': '<rootDir>/src/styles/$1',
    '@/utils/(.*)': '<rootDir>/src/utils/$1',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
  },
}
