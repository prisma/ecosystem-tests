"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var head_1 = __importDefault(require("next/head"));
var browser_build_1 = require("../components/browser-build");
var Home = function () { return (<div>
    <head_1["default"]>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico"/>
    </head_1["default"]>
    <browser_build_1.BrowserBuild />
  </div>); };
exports["default"] = Home;
