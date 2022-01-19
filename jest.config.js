module.exports = {
	moduleNameMapper: {
		'src/(.*)': '<rootDir>/src/$1',
		'\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/CSSStub.js',
		'\\.svg$': '<rootDir>/__mocks__/svgrMock.js'
	},
	setupFilesAfterEnv: ['<rootDir>/src/setupTests.js']
}
