var path = require("path");
var webpack = require("webpack");


var resolverPlugin = new webpack.ResolverPlugin(
  new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
);

var normalBulidConfig = {
  output: {
    filename: "sf-log.js",
    library: ["sfLog"],
    libraryTarget: "umd"
  },
  resolve: {
    root: [path.join(__dirname, "bower_components"), path.join(__dirname, 'app_components')]
  },
  externals: [
    "jQuery"
  ],
  plugins: [
    resolverPlugin
  ]
};

var minBuildConfig = {
  output: {
    filename: "sf-log.min.js",
    library: ["sfLog"],
    libraryTarget: "umd"
  },
  resolve: {
    root: [path.join(__dirname, "bower_components"), path.join(__dirname, 'app_components')]
  },
  externals: [
    "jQuery"
  ],
  plugins: [
    resolverPlugin,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      }
    })
  ]
}

module.exports = {
  normalBuildConfig: normalBulidConfig,
  minBuildConfig: minBuildConfig
}
