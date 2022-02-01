module.exports = {
    devtool: 'none',
    target: "webworker",
    entry: "./src/index.ts",
    resolve: { alias: { '@prisma/client$': require.resolve('@prisma/client') } },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
            },
        ],
    },
}