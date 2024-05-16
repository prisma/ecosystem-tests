module.exports = {
    mode: 'production',
    output: {
        library: 'prismaTest',
        libraryTarget: 'umd',
        filename: 'prismaTest.js',
        globalObject: 'globalThis'
    }
}