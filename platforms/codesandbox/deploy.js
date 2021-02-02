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
var node_fetch_1 = __importDefault(require("node-fetch"));
var fs_1 = __importDefault(require("fs"));
var puppeteer_1 = __importDefault(require("puppeteer"));
function getBinaries() {
    return [];
}
function getEncoding(file) {
    var binaries = getBinaries();
    return binaries.includes(file) ? 'binary' : 'utf-8';
}
function isBinary(file) {
    var binaries = getBinaries();
    return binaries.includes(file);
}
function fetchWithPuppeteer(endpoint) {
    return __awaiter(this, void 0, void 0, function () {
        var options, browser, page, screenshot, r, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = __assign({}, (process.env.CI === '1' && {
                        executablePath: 'google-chrome-unstable'
                    }));
                    console.log(options);
                    return [4 /*yield*/, puppeteer_1["default"].launch(options)];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    return [4 /*yield*/, page.setDefaultNavigationTimeout(0)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.goto(endpoint)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, page.waitFor(10000)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, page.screenshot()];
                case 6:
                    screenshot = _a.sent();
                    fs_1["default"].writeFileSync('image.png', screenshot);
                    return [4 /*yield*/, browser.close()];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, node_fetch_1["default"](endpoint)];
                case 8:
                    r = _a.sent();
                    _a.label = 9;
                case 9:
                    _a.trys.push([9, 11, , 12]);
                    return [4 /*yield*/, r.json()];
                case 10:
                    _a.sent();
                    return [2 /*return*/, true];
                case 11:
                    e_1 = _a.sent();
                    throw new Error(e_1);
                case 12: return [2 /*return*/];
            }
        });
    });
}
function sleep(seconds) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    setTimeout(function () {
                        resolve(false);
                    }, seconds * 1000);
                })];
        });
    });
}
var attempts = 0;
function ensureSandbox(endpoint) {
    return __awaiter(this, void 0, void 0, function () {
        var e_2, sleepTime;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    attempts += 1;
                    console.log("Attempt: " + attempts);
                    if (attempts > 60) {
                        return [2 /*return*/, false];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 5]);
                    return [4 /*yield*/, fetchWithPuppeteer(endpoint)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, true];
                case 3:
                    e_2 = _a.sent();
                    console.log(e_2);
                    sleepTime = 5;
                    console.log("Sleeping for " + sleepTime + " sec");
                    return [4 /*yield*/, sleep(sleepTime)];
                case 4:
                    _a.sent();
                    console.log("Retrying");
                    return [2 /*return*/, ensureSandbox(endpoint)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var relevantFilePaths, files, r, data, json, endpoint, r_1, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    relevantFilePaths = [
                        'src/index.js',
                        'prisma/schema.prisma',
                        'prisma/.env',
                        'package.json',
                        'yarn.lock',
                    ];
                    files = relevantFilePaths
                        .map(function (filePath) {
                        return {
                            filePath: filePath,
                            content: fs_1["default"].readFileSync(filePath, {
                                encoding: getEncoding(filePath)
                            }),
                            isBinary: isBinary(filePath)
                        };
                    })
                        .reduce(function (files, file) {
                        var _a;
                        return __assign(__assign({}, files), (_a = {}, _a["" + file.filePath] = {
                            content: file.content,
                            isBinary: file.isBinary
                        }, _a));
                    }, {});
                    r = node_fetch_1["default"]('https://codesandbox.io/api/v1/sandboxes/define?json=1', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            files: files
                        })
                    });
                    return [4 /*yield*/, r];
                case 1:
                    data = _a.sent();
                    return [4 /*yield*/, data.json()];
                case 2:
                    json = _a.sent();
                    fs_1["default"].writeFileSync('sandbox_id', json.sandbox_id);
                    endpoint = "https://" + json.sandbox_id + ".sse.codesandbox.io/";
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, ensureSandbox(endpoint)];
                case 4:
                    r_1 = _a.sent();
                    if (!Boolean(r_1)) {
                        // Log is fine, no need for an exit code as sh test.sh will fail anyways.
                        console.log('Failed to ensure sandbox');
                    }
                    return [3 /*break*/, 6];
                case 5:
                    e_3 = _a.sent();
                    throw new Error(e_3);
                case 6: return [2 /*return*/];
            }
        });
    });
}
main();
