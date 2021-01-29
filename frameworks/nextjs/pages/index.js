"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getStaticProps = void 0;
var react_1 = __importDefault(require("react"));
var head_1 = __importDefault(require("next/head"));
var nav_1 = __importDefault(require("../components/nav"));
var client_1 = require("@prisma/client");
function getStaticProps() {
    return __awaiter(this, void 0, void 0, function () {
        var client;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    client = new client_1.PrismaClient();
                    return [4 /*yield*/, client.user.deleteMany({})];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, client.user.create({
                            data: {
                                email: 'alice@prisma.io',
                                name: 'Alice'
                            }
                        })];
                case 2:
                    _c.sent();
                    _a = {};
                    _b = {};
                    return [4 /*yield*/, client.user.findMany()];
                case 3: return [2 /*return*/, (_a.props = (_b.users = _c.sent(),
                        _b),
                        _a.revalidate = 5,
                        _a)];
            }
        });
    });
}
exports.getStaticProps = getStaticProps;
var Home = function (props) { return (<div>
    <head_1["default"]>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico"/>
    </head_1["default"]>

    <nav_1["default"] />

    <div className="hero">
      <h1 className="title">Welcome to Next.js!</h1>
      <div className="description">
        {props.users.map(function (u) { return (<div key={u.id}>
            Name: {u.name}
            Age: {u.age}
          </div>); })}
        To get started, edit <code>pages/index.js</code> and save to reload.
      </div>

      <div className="row">
        <a href="https://nextjs.org/docs" className="card">
          <h3>Documentation &rarr;</h3>
          <p>Learn more about Next.js in the documentation.</p>
        </a>
        <a href="https://nextjs.org/learn" className="card">
          <h3>Next.js Learn &rarr;</h3>
          <p>Learn about Next.js by following an interactive tutorial!</p>
        </a>
        <a href="https://github.com/zeit/next.js/tree/master/examples" className="card">
          <h3>Examples &rarr;</h3>
          <p>Find other example boilerplates on the Next.js GitHub.</p>
        </a>
      </div>
    </div>

    <style jsx>{"\n      .hero {\n        width: 100%;\n        color: #333;\n      }\n      .title {\n        margin: 0;\n        width: 100%;\n        padding-top: 80px;\n        line-height: 1.15;\n        font-size: 48px;\n      }\n      .title,\n      .description {\n        text-align: center;\n      }\n      .row {\n        max-width: 880px;\n        margin: 80px auto 40px;\n        display: flex;\n        flex-direction: row;\n        justify-content: space-around;\n      }\n      .card {\n        padding: 18px 18px 24px;\n        width: 220px;\n        text-align: left;\n        text-decoration: none;\n        color: #434343;\n        border: 1px solid #9b9b9b;\n      }\n      .card:hover {\n        border-color: #067df7;\n      }\n      .card h3 {\n        margin: 0;\n        color: #067df7;\n        font-size: 18px;\n      }\n      .card p {\n        margin: 0;\n        padding: 12px 0 0;\n        font-size: 13px;\n        color: #333;\n      }\n    "}</style>
  </div>); };
exports["default"] = Home;
