require("dotenv").config()

module.exports = api => {
    api.cache(true);
    const presets = [
        ["@babel/preset-env", {
            modules: "commonjs",
            useBuiltIns: "entry",
            corejs: 3,
            targets: { browsers: ["last 2 versions"] },
        }],
        "@babel/preset-react",
    ]

    const plugins = [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-proposal-export-namespace-from",
        "@babel/plugin-proposal-throw-expressions",
        "@babel/plugin-syntax-dynamic-import",
    ]

    return {
        presets,
        plugins,
    }
}
