module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(css|less)$': 'identity-obj-proxy'
    },
    collectCoverage: true,
    // 覆盖文件范围（目前前端单元测试不关注覆盖率，所以这里暂时为空）
    collectCoverageFrom: []
}
