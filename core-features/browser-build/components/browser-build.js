"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.BrowserBuild = void 0;
var client_1 = require("@prisma/client");
var react_1 = __importDefault(require("react"));
var test = __assign({}, client_1.Prisma);
delete test['dmmf'];
var BrowserBuild = function () {
    var _a = react_1["default"].useState(), err = _a[0], setErr = _a[1];
    var decimal = new client_1.Prisma.Decimal(0.213213);
    react_1["default"].useEffect(function () {
        try {
            var client = new client_1.PrismaClient();
        }
        catch (err) {
            console.log(err);
            setErr(err.message);
        }
    }, []);
    return (<div style={{ textAlign: 'left', margin: 'auto', maxWidth: 700, padding: 10 }}>
      <h2>Prisma Browser Build Test</h2>
      <strong>Error Test:</strong> {err}
      <br />
      <br />
      <strong>Decimal Test:</strong> {JSON.stringify(decimal.squareRoot())}
      <br />
      <br />
      <strong>Browser Test:</strong>
      {<div><pre>{JSON.stringify(test, null, 2)}</pre></div>}
    </div>);
};
exports.BrowserBuild = BrowserBuild;
