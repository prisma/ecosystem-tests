module.exports = {
    devtool: 'none',
    target: "webworker",
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
            },
        ],
    },
}