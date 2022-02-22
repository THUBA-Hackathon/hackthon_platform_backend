const {
    override,
    fixBabelImports,
    addWebpackAlias,
    addDecoratorsLegacy,
} = require("customize-cra");
const path = require("path");
const rewirePostcss = require("react-app-rewire-postcss");
const px2rem = require("postcss-px2rem-exclude");
module.exports = override(
    // fixBabelImports("import", {
    //     libraryName: "@mui/material",
    //     style: "css",
    // }),
    addWebpackAlias({
        "@": path.resolve(__dirname, "src"),
    }),
    addDecoratorsLegacy(),
    (config, env) => {
        // 重写postcss
        rewirePostcss(config, {
            plugins: () => [
                require("postcss-flexbugs-fixes"),
                require("postcss-preset-env")({
                    autoprefixer: {
                        flexbox: "no-2009",
                    },
                    stage: 3,
                }),
                //关键:设置px2rem
                px2rem({
                    remUnit: 37.5,//这里最开始写的是75，但是antd的样式变的可小，查询后看人家设置的是37.5，然后试了下确实好了
                    exclude: /node-modules/i,
                }),
            ],
        });

        return config;
    }
);