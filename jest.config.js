module.exports = {
    moduleFileExtensions: [
        'js',
        'json',
        'ts'
    ],
    roots: ['<rootDir>/src'],
    testRegex: '.spec.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest'
    },
    coverageDirectory: './coverage',
    testEnvironment: 'node',
    globalSetup: './test/setup.ts',
    globalTeardown: './test/teardown.ts',
    testEnvironment: './test/mongo-environment.ts',
}
