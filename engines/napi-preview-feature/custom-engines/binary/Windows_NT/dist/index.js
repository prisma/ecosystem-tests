var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (callback, module2) => () => {
  if (!module2) {
    module2 = {exports: {}};
    callback(module2.exports, module2);
  }
  return module2.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __exportStar = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  if (module2 && module2.__esModule)
    return module2;
  return __exportStar(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", {value: module2, enumerable: true})), module2);
};

// ../../node_modules/.pnpm/has-flag@4.0.0/node_modules/has-flag/index.js
var require_has_flag = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = (flag, argv = process.argv) => {
    const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
    const position = argv.indexOf(prefix + flag);
    const terminatorPosition = argv.indexOf("--");
    return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
  };
});

// ../../node_modules/.pnpm/supports-color@7.2.0/node_modules/supports-color/index.js
var require_supports_color = __commonJS((exports2, module2) => {
  "use strict";
  var os = require("os");
  var tty = require("tty");
  var hasFlag = require_has_flag();
  var {env} = process;
  var forceColor;
  if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
    forceColor = 0;
  } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
    forceColor = 1;
  }
  if ("FORCE_COLOR" in env) {
    if (env.FORCE_COLOR === "true") {
      forceColor = 1;
    } else if (env.FORCE_COLOR === "false") {
      forceColor = 0;
    } else {
      forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
    }
  }
  function translateLevel(level) {
    if (level === 0) {
      return false;
    }
    return {
      level,
      hasBasic: true,
      has256: level >= 2,
      has16m: level >= 3
    };
  }
  function supportsColor(haveStream, streamIsTTY) {
    if (forceColor === 0) {
      return 0;
    }
    if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
      return 3;
    }
    if (hasFlag("color=256")) {
      return 2;
    }
    if (haveStream && !streamIsTTY && forceColor === void 0) {
      return 0;
    }
    const min = forceColor || 0;
    if (env.TERM === "dumb") {
      return min;
    }
    if (process.platform === "win32") {
      const osRelease = os.release().split(".");
      if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
        return Number(osRelease[2]) >= 14931 ? 3 : 2;
      }
      return 1;
    }
    if ("CI" in env) {
      if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
        return 1;
      }
      return min;
    }
    if ("TEAMCITY_VERSION" in env) {
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
    }
    if (env.COLORTERM === "truecolor") {
      return 3;
    }
    if ("TERM_PROGRAM" in env) {
      const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (env.TERM_PROGRAM) {
        case "iTerm.app":
          return version >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    if (/-256(color)?$/i.test(env.TERM)) {
      return 2;
    }
    if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
      return 1;
    }
    if ("COLORTERM" in env) {
      return 1;
    }
    return min;
  }
  function getSupportLevel(stream) {
    const level = supportsColor(stream, stream && stream.isTTY);
    return translateLevel(level);
  }
  module2.exports = {
    supportsColor: getSupportLevel,
    stdout: translateLevel(supportsColor(true, tty.isatty(1))),
    stderr: translateLevel(supportsColor(true, tty.isatty(2)))
  };
});

// ../../node_modules/.pnpm/ms@2.1.3/node_modules/ms/index.js
var require_ms = __commonJS((exports2, module2) => {
  var s = 1e3;
  var m = s * 60;
  var h = m * 60;
  var d = h * 24;
  var w = d * 7;
  var y = d * 365.25;
  module2.exports = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === "string" && val.length > 0) {
      return parse(val);
    } else if (type === "number" && isFinite(val)) {
      return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
  };
  function parse(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || "ms").toLowerCase();
    switch (type) {
      case "years":
      case "year":
      case "yrs":
      case "yr":
      case "y":
        return n * y;
      case "weeks":
      case "week":
      case "w":
        return n * w;
      case "days":
      case "day":
      case "d":
        return n * d;
      case "hours":
      case "hour":
      case "hrs":
      case "hr":
      case "h":
        return n * h;
      case "minutes":
      case "minute":
      case "mins":
      case "min":
      case "m":
        return n * m;
      case "seconds":
      case "second":
      case "secs":
      case "sec":
      case "s":
        return n * s;
      case "milliseconds":
      case "millisecond":
      case "msecs":
      case "msec":
      case "ms":
        return n;
      default:
        return void 0;
    }
  }
  function fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
      return Math.round(ms / d) + "d";
    }
    if (msAbs >= h) {
      return Math.round(ms / h) + "h";
    }
    if (msAbs >= m) {
      return Math.round(ms / m) + "m";
    }
    if (msAbs >= s) {
      return Math.round(ms / s) + "s";
    }
    return ms + "ms";
  }
  function fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
      return plural(ms, msAbs, d, "day");
    }
    if (msAbs >= h) {
      return plural(ms, msAbs, h, "hour");
    }
    if (msAbs >= m) {
      return plural(ms, msAbs, m, "minute");
    }
    if (msAbs >= s) {
      return plural(ms, msAbs, s, "second");
    }
    return ms + " ms";
  }
  function plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
  }
});

// ../../node_modules/.pnpm/@prisma/debug@2.24.1/node_modules/@prisma/debug/dist/common.js
var require_common = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.setup = void 0;
  function setup(env) {
    const createDebug = (namespace, logger) => {
      let prevTime;
      let enableOverride = null;
      let namespacesCache;
      let enabledCache;
      const debug3 = (...args) => {
        const self = debug3;
        const curr = Number(new Date());
        const ms = curr - (prevTime || curr);
        self.diff = ms;
        self.prev = prevTime;
        self.curr = curr;
        prevTime = curr;
        args[0] = createDebug.coerce(args[0]);
        if (typeof args[0] !== "string") {
          args.unshift("%O");
        }
        let index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
          if (match === "%%") {
            return "%";
          }
          index++;
          const formatter = createDebug.formatters[format];
          if (typeof formatter === "function") {
            const val = args[index];
            match = formatter.call(self, val);
            args.splice(index, 1);
            index--;
          }
          return match;
        });
        createDebug.formatArgs.call(self, args);
        if (logger && typeof logger === "function") {
          logger.apply(self, args);
        }
        if (debug3.enabled) {
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
      };
      debug3.namespace = namespace;
      debug3.useColors = createDebug.useColors();
      debug3.color = createDebug.selectColor(namespace);
      debug3.extend = extend;
      debug3.destroy = createDebug.destroy;
      Object.defineProperty(debug3, "enabled", {
        enumerable: true,
        configurable: false,
        get: () => {
          if (enableOverride !== null) {
            return enableOverride;
          }
          if (namespacesCache !== createDebug.namespaces) {
            namespacesCache = createDebug.namespaces;
            enabledCache = createDebug.enabled(namespace);
          }
          return enabledCache;
        },
        set: (v) => {
          enableOverride = v;
        }
      });
      if (typeof createDebug.init === "function") {
        createDebug.init(debug3);
      }
      return debug3;
    };
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = require_ms();
    createDebug.destroy = destroy;
    Object.keys(env).forEach((key) => {
      createDebug[key] = env[key];
    });
    createDebug.names = [];
    createDebug.skips = [];
    createDebug.formatters = {};
    function selectColor(namespace) {
      let hash = 0;
      for (let i = 0; i < namespace.length; i++) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0;
      }
      return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
    }
    createDebug.selectColor = selectColor;
    function extend(namespace, delimiter) {
      const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
      newDebug.log = this.log;
      return newDebug;
    }
    function enable(namespaces) {
      createDebug.save(namespaces);
      createDebug.namespaces = namespaces;
      createDebug.names = [];
      createDebug.skips = [];
      let i;
      const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
      const len = split.length;
      for (i = 0; i < len; i++) {
        if (!split[i]) {
          continue;
        }
        namespaces = split[i].replace(/\*/g, ".*?");
        if (namespaces[0] === "-") {
          createDebug.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
        } else {
          createDebug.names.push(new RegExp("^" + namespaces + "$"));
        }
      }
    }
    function disable() {
      const namespaces = [
        ...createDebug.names.map(toNamespace),
        ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
      ].join(",");
      createDebug.enable("");
      return namespaces;
    }
    function enabled(name) {
      if (name[name.length - 1] === "*") {
        return true;
      }
      let i;
      let len;
      for (i = 0, len = createDebug.skips.length; i < len; i++) {
        if (createDebug.skips[i].test(name)) {
          return false;
        }
      }
      for (i = 0, len = createDebug.names.length; i < len; i++) {
        if (createDebug.names[i].test(name)) {
          return true;
        }
      }
      return false;
    }
    function toNamespace(regexp) {
      return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
    }
    function coerce(val) {
      if (val instanceof Error) {
        return val.stack || val.message;
      }
      return val;
    }
    function destroy() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    createDebug.enable(createDebug.load());
    return createDebug;
  }
  exports2.setup = setup;
});

// ../../node_modules/.pnpm/@prisma/debug@2.24.1/node_modules/@prisma/debug/dist/node.js
var require_node = __commonJS((exports2, module2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var tty = require("tty");
  var util = require("util");
  exports2.init = init;
  exports2.log = log;
  exports2.formatArgs = formatArgs;
  exports2.save = save;
  exports2.load = load;
  exports2.useColors = useColors;
  exports2.destroy = util.deprecate(() => {
  }, "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  exports2.colors = [6, 2, 3, 4, 5, 1];
  try {
    const supportsColor = require_supports_color();
    if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
      exports2.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ];
    }
  } catch (error) {
  }
  exports2.inspectOpts = Object.keys(process.env).filter((key) => {
    return /^debug_/i.test(key);
  }).reduce((obj, key) => {
    const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
      return k.toUpperCase();
    });
    let val = process.env[key];
    if (/^(yes|on|true|enabled)$/i.test(val)) {
      val = true;
    } else if (/^(no|off|false|disabled)$/i.test(val)) {
      val = false;
    } else if (val === "null") {
      val = null;
    } else {
      val = Number(val);
    }
    obj[prop] = val;
    return obj;
  }, {});
  function useColors() {
    return "colors" in exports2.inspectOpts ? Boolean(exports2.inspectOpts.colors) : tty.isatty(process.stderr.fd);
  }
  function formatArgs(args) {
    const {namespace: name, useColors: useColors2} = this;
    if (useColors2) {
      const c = this.color;
      const colorCode = "[3" + (c < 8 ? c : "8;5;" + c);
      const prefix = `  ${colorCode};1m${name} [0m`;
      args[0] = prefix + args[0].split("\n").join("\n" + prefix);
      args.push(colorCode + "m+" + module2.exports.humanize(this.diff) + "[0m");
    } else {
      args[0] = getDate() + name + " " + args[0];
    }
  }
  function getDate() {
    if (exports2.inspectOpts.hideDate) {
      return "";
    }
    return new Date().toISOString() + " ";
  }
  function log(...args) {
    return process.stderr.write(util.format(...args) + "\n");
  }
  function save(namespaces) {
    if (namespaces) {
      process.env.DEBUG = namespaces;
    } else {
      delete process.env.DEBUG;
    }
  }
  function load() {
    return process.env.DEBUG;
  }
  function init(debug3) {
    debug3.inspectOpts = {};
    const keys = Object.keys(exports2.inspectOpts);
    for (let i = 0; i < keys.length; i++) {
      debug3.inspectOpts[keys[i]] = exports2.inspectOpts[keys[i]];
    }
  }
  var common_1 = require_common();
  var mod = common_1.setup(exports2);
  module2.exports = mod;
  exports2.default = mod;
  var {formatters} = mod;
  formatters.o = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
  };
  formatters.O = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts);
  };
});

// ../../node_modules/.pnpm/@prisma/debug@2.24.1/node_modules/@prisma/debug/dist/index.js
var require_dist = __commonJS((exports2) => {
  "use strict";
  var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.getLogs = exports2.Debug = void 0;
  var node_1 = __importDefault2(require_node());
  var cache = [];
  var MAX_LOGS = 100;
  function Debug2(namespace) {
    const debug3 = node_1.default(namespace, (...args) => {
      cache.push(args);
      if (cache.length > MAX_LOGS) {
        cache.shift();
      }
    });
    return debug3;
  }
  exports2.default = Debug2;
  exports2.Debug = Debug2;
  Debug2.enable = (namespace) => {
    node_1.default.enable(namespace);
  };
  Debug2.enabled = (namespace) => node_1.default.enabled(namespace);
  function getLogs(numChars = 7500) {
    const output = cache.map((c) => c.map((item) => {
      if (typeof item === "string") {
        return item;
      }
      return JSON.stringify(item);
    }).join("  ")).join("\n");
    if (output.length < numChars) {
      return output;
    }
    return output.slice(-numChars);
  }
  exports2.getLogs = getLogs;
});

// ../engines-version/package.json
var require_package = __commonJS((exports2, module2) => {
  module2.exports = {
    name: "@prisma/engines-version",
    version: "2.25.0-36.c838e79f39885bc8e1611849b1eb28b5bb5bc922",
    main: "index.js",
    types: "index.d.ts",
    license: "Apache-2.0",
    author: "Tim Suchanek <suchanek@prisma.io>",
    prisma: {
      enginesVersion: "c838e79f39885bc8e1611849b1eb28b5bb5bc922"
    },
    devDependencies: {
      "@types/node": "14.17.3",
      typescript: "4.3.2"
    },
    scripts: {
      build: "tsc -d",
      prepublishOnly: "tsc -d",
      publish: "echo $GITHUB_CONTEXT"
    },
    files: [
      "index.js",
      "index.d.ts"
    ]
  };
});

// ../engines-version/index.js
var require_engines_version = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.enginesVersion = void 0;
  exports2.enginesVersion = require_package().prisma.enginesVersion;
});

// ../../node_modules/.pnpm/@prisma/get-platform@2.24.1/node_modules/@prisma/get-platform/dist/getNapiName.js
var require_getNapiName = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.getNapiName = exports2.NAPI_QUERY_ENGINE_URL_BASE = void 0;
  exports2.NAPI_QUERY_ENGINE_URL_BASE = "libquery_engine_napi";
  function getNapiName(platform, type) {
    const isUrl = type === "url";
    if (platform.includes("windows")) {
      return isUrl ? `query_engine_napi.dll.node` : `query_engine_napi-${platform}.dll.node`;
    } else if (platform.includes("linux") || platform.includes("debian") || platform.includes("rhel")) {
      return isUrl ? `${exports2.NAPI_QUERY_ENGINE_URL_BASE}.so.node` : `${exports2.NAPI_QUERY_ENGINE_URL_BASE}-${platform}.so.node`;
    } else if (platform.includes("darwin")) {
      return isUrl ? `${exports2.NAPI_QUERY_ENGINE_URL_BASE}.dylib.node` : `${exports2.NAPI_QUERY_ENGINE_URL_BASE}-${platform}.dylib.node`;
    } else {
      throw new Error(`NAPI is currently not supported on your platform: ${platform}`);
    }
  }
  exports2.getNapiName = getNapiName;
});

// ../../node_modules/.pnpm/@prisma/get-platform@2.24.1/node_modules/@prisma/get-platform/dist/getPlatform.js
var require_getPlatform = __commonJS((exports2) => {
  "use strict";
  var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.getPlatform = exports2.getOpenSSLVersion = exports2.parseOpenSSLVersion = exports2.resolveDistro = exports2.parseDistro = exports2.getos = void 0;
  var child_process_1 = require("child_process");
  var fs_12 = __importDefault2(require("fs"));
  var os_1 = __importDefault2(require("os"));
  var util_12 = require("util");
  var readFile2 = util_12.promisify(fs_12.default.readFile);
  var exists2 = util_12.promisify(fs_12.default.exists);
  async function getos() {
    const platform = os_1.default.platform();
    const arch = process.arch;
    if (platform === "freebsd") {
      const version = await gracefulExec(`freebsd-version`);
      if (version && version.trim().length > 0) {
        const regex = /^(\d+)\.?/;
        const match = regex.exec(version);
        if (match) {
          return {
            platform: "freebsd",
            distro: `freebsd${match[1]}`,
            arch
          };
        }
      }
    }
    if (platform !== "linux") {
      return {
        platform,
        arch
      };
    }
    return {
      platform: "linux",
      libssl: await getOpenSSLVersion(),
      distro: await resolveDistro(),
      arch
    };
  }
  exports2.getos = getos;
  function parseDistro(input) {
    const idRegex = /^ID="?([^"\n]*)"?$/im;
    const idLikeRegex = /^ID_LIKE="?([^"\n]*)"?$/im;
    const idMatch = idRegex.exec(input);
    const id = idMatch && idMatch[1] && idMatch[1].toLowerCase() || "";
    const idLikeMatch = idLikeRegex.exec(input);
    const idLike = idLikeMatch && idLikeMatch[1] && idLikeMatch[1].toLowerCase() || "";
    if (id === "raspbian") {
      return "arm";
    }
    if (id === "nixos") {
      return "nixos";
    }
    if (idLike.includes("centos") || idLike.includes("fedora") || idLike.includes("rhel") || id === "fedora") {
      return "rhel";
    }
    if (idLike.includes("debian") || idLike.includes("ubuntu") || id === "debian") {
      return "debian";
    }
    return;
  }
  exports2.parseDistro = parseDistro;
  async function resolveDistro() {
    const osReleaseFile = "/etc/os-release";
    const alpineReleaseFile = "/etc/alpine-release";
    if (await exists2(alpineReleaseFile)) {
      return "musl";
    } else if (await exists2(osReleaseFile)) {
      return parseDistro(await readFile2(osReleaseFile, "utf-8"));
    } else {
      return;
    }
  }
  exports2.resolveDistro = resolveDistro;
  function parseOpenSSLVersion(input) {
    const match = /^OpenSSL\s(\d+\.\d+)\.\d+/.exec(input);
    if (match) {
      return match[1] + ".x";
    }
    return;
  }
  exports2.parseOpenSSLVersion = parseOpenSSLVersion;
  async function getOpenSSLVersion() {
    const [version, ls] = await Promise.all([
      gracefulExec(`openssl version -v`),
      gracefulExec(`
      ls -l /lib64 | grep ssl;
      ls -l /usr/lib64 | grep ssl;
    `)
    ]);
    if (version) {
      const v = parseOpenSSLVersion(version);
      if (v) {
        return v;
      }
    }
    if (ls) {
      const match = /libssl\.so\.(\d+\.\d+)\.\d+/.exec(ls);
      if (match) {
        return match[1] + ".x";
      }
    }
    return void 0;
  }
  exports2.getOpenSSLVersion = getOpenSSLVersion;
  async function gracefulExec(cmd) {
    return new Promise((resolve) => {
      try {
        child_process_1.exec(cmd, (err, stdout) => {
          resolve(String(stdout));
        });
      } catch (e) {
        resolve(void 0);
        return void 0;
      }
    });
  }
  async function getPlatform() {
    const {platform, libssl, distro, arch} = await getos();
    if (platform === "darwin") {
      return "darwin";
    }
    if (platform === "win32") {
      return "windows";
    }
    if (platform === "freebsd") {
      return distro;
    }
    if (platform === "openbsd") {
      return "openbsd";
    }
    if (platform === "netbsd") {
      return "netbsd";
    }
    if (platform === "linux" && arch === "arm64") {
      return `linux-arm-openssl-${libssl}`;
    }
    if (platform === "linux" && distro === "nixos") {
      return "linux-nixos";
    }
    if (platform === "linux" && distro === "musl") {
      return "linux-musl";
    }
    if (platform === "linux" && distro && libssl) {
      return distro + "-openssl-" + libssl;
    }
    if (libssl) {
      return "debian-openssl-" + libssl;
    }
    if (distro) {
      return distro + "-openssl-1.1.x";
    }
    return "debian-openssl-1.1.x";
  }
  exports2.getPlatform = getPlatform;
});

// ../../node_modules/.pnpm/@prisma/get-platform@2.24.1/node_modules/@prisma/get-platform/dist/platforms.js
var require_platforms = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.platforms = void 0;
  exports2.platforms = [
    "darwin",
    "debian-openssl-1.0.x",
    "debian-openssl-1.1.x",
    "rhel-openssl-1.0.x",
    "rhel-openssl-1.1.x",
    "linux-arm-openssl-1.1.x",
    "linux-arm-openssl-1.0.x",
    "linux-musl",
    "linux-nixos",
    "windows",
    "freebsd11",
    "freebsd12",
    "openbsd",
    "netbsd",
    "arm"
  ];
});

// ../../node_modules/.pnpm/@prisma/get-platform@2.24.1/node_modules/@prisma/get-platform/dist/index.js
var require_dist2 = __commonJS((exports2) => {
  "use strict";
  var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    Object.defineProperty(o, k2, {enumerable: true, get: function() {
      return m[k];
    }});
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar2 = exports2 && exports2.__exportStar || function(m, exports3) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
        __createBinding(exports3, m, p);
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.platforms = exports2.getPlatform = exports2.getos = void 0;
  __exportStar2(require_getNapiName(), exports2);
  var getPlatform_1 = require_getPlatform();
  Object.defineProperty(exports2, "getos", {enumerable: true, get: function() {
    return getPlatform_1.getos;
  }});
  Object.defineProperty(exports2, "getPlatform", {enumerable: true, get: function() {
    return getPlatform_1.getPlatform;
  }});
  var platforms_1 = require_platforms();
  Object.defineProperty(exports2, "platforms", {enumerable: true, get: function() {
    return platforms_1.platforms;
  }});
});

// ../../node_modules/.pnpm/color-name@1.1.4/node_modules/color-name/index.js
var require_color_name = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = {
    aliceblue: [240, 248, 255],
    antiquewhite: [250, 235, 215],
    aqua: [0, 255, 255],
    aquamarine: [127, 255, 212],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    bisque: [255, 228, 196],
    black: [0, 0, 0],
    blanchedalmond: [255, 235, 205],
    blue: [0, 0, 255],
    blueviolet: [138, 43, 226],
    brown: [165, 42, 42],
    burlywood: [222, 184, 135],
    cadetblue: [95, 158, 160],
    chartreuse: [127, 255, 0],
    chocolate: [210, 105, 30],
    coral: [255, 127, 80],
    cornflowerblue: [100, 149, 237],
    cornsilk: [255, 248, 220],
    crimson: [220, 20, 60],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgoldenrod: [184, 134, 11],
    darkgray: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkgrey: [169, 169, 169],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkseagreen: [143, 188, 143],
    darkslateblue: [72, 61, 139],
    darkslategray: [47, 79, 79],
    darkslategrey: [47, 79, 79],
    darkturquoise: [0, 206, 209],
    darkviolet: [148, 0, 211],
    deeppink: [255, 20, 147],
    deepskyblue: [0, 191, 255],
    dimgray: [105, 105, 105],
    dimgrey: [105, 105, 105],
    dodgerblue: [30, 144, 255],
    firebrick: [178, 34, 34],
    floralwhite: [255, 250, 240],
    forestgreen: [34, 139, 34],
    fuchsia: [255, 0, 255],
    gainsboro: [220, 220, 220],
    ghostwhite: [248, 248, 255],
    gold: [255, 215, 0],
    goldenrod: [218, 165, 32],
    gray: [128, 128, 128],
    green: [0, 128, 0],
    greenyellow: [173, 255, 47],
    grey: [128, 128, 128],
    honeydew: [240, 255, 240],
    hotpink: [255, 105, 180],
    indianred: [205, 92, 92],
    indigo: [75, 0, 130],
    ivory: [255, 255, 240],
    khaki: [240, 230, 140],
    lavender: [230, 230, 250],
    lavenderblush: [255, 240, 245],
    lawngreen: [124, 252, 0],
    lemonchiffon: [255, 250, 205],
    lightblue: [173, 216, 230],
    lightcoral: [240, 128, 128],
    lightcyan: [224, 255, 255],
    lightgoldenrodyellow: [250, 250, 210],
    lightgray: [211, 211, 211],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightsalmon: [255, 160, 122],
    lightseagreen: [32, 178, 170],
    lightskyblue: [135, 206, 250],
    lightslategray: [119, 136, 153],
    lightslategrey: [119, 136, 153],
    lightsteelblue: [176, 196, 222],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    limegreen: [50, 205, 50],
    linen: [250, 240, 230],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    mediumaquamarine: [102, 205, 170],
    mediumblue: [0, 0, 205],
    mediumorchid: [186, 85, 211],
    mediumpurple: [147, 112, 219],
    mediumseagreen: [60, 179, 113],
    mediumslateblue: [123, 104, 238],
    mediumspringgreen: [0, 250, 154],
    mediumturquoise: [72, 209, 204],
    mediumvioletred: [199, 21, 133],
    midnightblue: [25, 25, 112],
    mintcream: [245, 255, 250],
    mistyrose: [255, 228, 225],
    moccasin: [255, 228, 181],
    navajowhite: [255, 222, 173],
    navy: [0, 0, 128],
    oldlace: [253, 245, 230],
    olive: [128, 128, 0],
    olivedrab: [107, 142, 35],
    orange: [255, 165, 0],
    orangered: [255, 69, 0],
    orchid: [218, 112, 214],
    palegoldenrod: [238, 232, 170],
    palegreen: [152, 251, 152],
    paleturquoise: [175, 238, 238],
    palevioletred: [219, 112, 147],
    papayawhip: [255, 239, 213],
    peachpuff: [255, 218, 185],
    peru: [205, 133, 63],
    pink: [255, 192, 203],
    plum: [221, 160, 221],
    powderblue: [176, 224, 230],
    purple: [128, 0, 128],
    rebeccapurple: [102, 51, 153],
    red: [255, 0, 0],
    rosybrown: [188, 143, 143],
    royalblue: [65, 105, 225],
    saddlebrown: [139, 69, 19],
    salmon: [250, 128, 114],
    sandybrown: [244, 164, 96],
    seagreen: [46, 139, 87],
    seashell: [255, 245, 238],
    sienna: [160, 82, 45],
    silver: [192, 192, 192],
    skyblue: [135, 206, 235],
    slateblue: [106, 90, 205],
    slategray: [112, 128, 144],
    slategrey: [112, 128, 144],
    snow: [255, 250, 250],
    springgreen: [0, 255, 127],
    steelblue: [70, 130, 180],
    tan: [210, 180, 140],
    teal: [0, 128, 128],
    thistle: [216, 191, 216],
    tomato: [255, 99, 71],
    turquoise: [64, 224, 208],
    violet: [238, 130, 238],
    wheat: [245, 222, 179],
    white: [255, 255, 255],
    whitesmoke: [245, 245, 245],
    yellow: [255, 255, 0],
    yellowgreen: [154, 205, 50]
  };
});

// ../../node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/conversions.js
var require_conversions = __commonJS((exports2, module2) => {
  var cssKeywords = require_color_name();
  var reverseKeywords = {};
  for (const key of Object.keys(cssKeywords)) {
    reverseKeywords[cssKeywords[key]] = key;
  }
  var convert = {
    rgb: {channels: 3, labels: "rgb"},
    hsl: {channels: 3, labels: "hsl"},
    hsv: {channels: 3, labels: "hsv"},
    hwb: {channels: 3, labels: "hwb"},
    cmyk: {channels: 4, labels: "cmyk"},
    xyz: {channels: 3, labels: "xyz"},
    lab: {channels: 3, labels: "lab"},
    lch: {channels: 3, labels: "lch"},
    hex: {channels: 1, labels: ["hex"]},
    keyword: {channels: 1, labels: ["keyword"]},
    ansi16: {channels: 1, labels: ["ansi16"]},
    ansi256: {channels: 1, labels: ["ansi256"]},
    hcg: {channels: 3, labels: ["h", "c", "g"]},
    apple: {channels: 3, labels: ["r16", "g16", "b16"]},
    gray: {channels: 1, labels: ["gray"]}
  };
  module2.exports = convert;
  for (const model of Object.keys(convert)) {
    if (!("channels" in convert[model])) {
      throw new Error("missing channels property: " + model);
    }
    if (!("labels" in convert[model])) {
      throw new Error("missing channel labels property: " + model);
    }
    if (convert[model].labels.length !== convert[model].channels) {
      throw new Error("channel and label counts mismatch: " + model);
    }
    const {channels, labels} = convert[model];
    delete convert[model].channels;
    delete convert[model].labels;
    Object.defineProperty(convert[model], "channels", {value: channels});
    Object.defineProperty(convert[model], "labels", {value: labels});
  }
  convert.rgb.hsl = function(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const delta = max - min;
    let h;
    let s;
    if (max === min) {
      h = 0;
    } else if (r === max) {
      h = (g - b) / delta;
    } else if (g === max) {
      h = 2 + (b - r) / delta;
    } else if (b === max) {
      h = 4 + (r - g) / delta;
    }
    h = Math.min(h * 60, 360);
    if (h < 0) {
      h += 360;
    }
    const l = (min + max) / 2;
    if (max === min) {
      s = 0;
    } else if (l <= 0.5) {
      s = delta / (max + min);
    } else {
      s = delta / (2 - max - min);
    }
    return [h, s * 100, l * 100];
  };
  convert.rgb.hsv = function(rgb) {
    let rdif;
    let gdif;
    let bdif;
    let h;
    let s;
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const v = Math.max(r, g, b);
    const diff = v - Math.min(r, g, b);
    const diffc = function(c) {
      return (v - c) / 6 / diff + 1 / 2;
    };
    if (diff === 0) {
      h = 0;
      s = 0;
    } else {
      s = diff / v;
      rdif = diffc(r);
      gdif = diffc(g);
      bdif = diffc(b);
      if (r === v) {
        h = bdif - gdif;
      } else if (g === v) {
        h = 1 / 3 + rdif - bdif;
      } else if (b === v) {
        h = 2 / 3 + gdif - rdif;
      }
      if (h < 0) {
        h += 1;
      } else if (h > 1) {
        h -= 1;
      }
    }
    return [
      h * 360,
      s * 100,
      v * 100
    ];
  };
  convert.rgb.hwb = function(rgb) {
    const r = rgb[0];
    const g = rgb[1];
    let b = rgb[2];
    const h = convert.rgb.hsl(rgb)[0];
    const w = 1 / 255 * Math.min(r, Math.min(g, b));
    b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
    return [h, w * 100, b * 100];
  };
  convert.rgb.cmyk = function(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const k = Math.min(1 - r, 1 - g, 1 - b);
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;
    return [c * 100, m * 100, y * 100, k * 100];
  };
  function comparativeDistance(x, y) {
    return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
  }
  convert.rgb.keyword = function(rgb) {
    const reversed = reverseKeywords[rgb];
    if (reversed) {
      return reversed;
    }
    let currentClosestDistance = Infinity;
    let currentClosestKeyword;
    for (const keyword of Object.keys(cssKeywords)) {
      const value = cssKeywords[keyword];
      const distance = comparativeDistance(rgb, value);
      if (distance < currentClosestDistance) {
        currentClosestDistance = distance;
        currentClosestKeyword = keyword;
      }
    }
    return currentClosestKeyword;
  };
  convert.keyword.rgb = function(keyword) {
    return cssKeywords[keyword];
  };
  convert.rgb.xyz = function(rgb) {
    let r = rgb[0] / 255;
    let g = rgb[1] / 255;
    let b = rgb[2] / 255;
    r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
    g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
    b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;
    const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
    const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
    const z = r * 0.0193 + g * 0.1192 + b * 0.9505;
    return [x * 100, y * 100, z * 100];
  };
  convert.rgb.lab = function(rgb) {
    const xyz = convert.rgb.xyz(rgb);
    let x = xyz[0];
    let y = xyz[1];
    let z = xyz[2];
    x /= 95.047;
    y /= 100;
    z /= 108.883;
    x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
    y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
    z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
    const l = 116 * y - 16;
    const a = 500 * (x - y);
    const b = 200 * (y - z);
    return [l, a, b];
  };
  convert.hsl.rgb = function(hsl) {
    const h = hsl[0] / 360;
    const s = hsl[1] / 100;
    const l = hsl[2] / 100;
    let t2;
    let t3;
    let val;
    if (s === 0) {
      val = l * 255;
      return [val, val, val];
    }
    if (l < 0.5) {
      t2 = l * (1 + s);
    } else {
      t2 = l + s - l * s;
    }
    const t1 = 2 * l - t2;
    const rgb = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
      t3 = h + 1 / 3 * -(i - 1);
      if (t3 < 0) {
        t3++;
      }
      if (t3 > 1) {
        t3--;
      }
      if (6 * t3 < 1) {
        val = t1 + (t2 - t1) * 6 * t3;
      } else if (2 * t3 < 1) {
        val = t2;
      } else if (3 * t3 < 2) {
        val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
      } else {
        val = t1;
      }
      rgb[i] = val * 255;
    }
    return rgb;
  };
  convert.hsl.hsv = function(hsl) {
    const h = hsl[0];
    let s = hsl[1] / 100;
    let l = hsl[2] / 100;
    let smin = s;
    const lmin = Math.max(l, 0.01);
    l *= 2;
    s *= l <= 1 ? l : 2 - l;
    smin *= lmin <= 1 ? lmin : 2 - lmin;
    const v = (l + s) / 2;
    const sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
    return [h, sv * 100, v * 100];
  };
  convert.hsv.rgb = function(hsv) {
    const h = hsv[0] / 60;
    const s = hsv[1] / 100;
    let v = hsv[2] / 100;
    const hi = Math.floor(h) % 6;
    const f = h - Math.floor(h);
    const p = 255 * v * (1 - s);
    const q = 255 * v * (1 - s * f);
    const t = 255 * v * (1 - s * (1 - f));
    v *= 255;
    switch (hi) {
      case 0:
        return [v, t, p];
      case 1:
        return [q, v, p];
      case 2:
        return [p, v, t];
      case 3:
        return [p, q, v];
      case 4:
        return [t, p, v];
      case 5:
        return [v, p, q];
    }
  };
  convert.hsv.hsl = function(hsv) {
    const h = hsv[0];
    const s = hsv[1] / 100;
    const v = hsv[2] / 100;
    const vmin = Math.max(v, 0.01);
    let sl;
    let l;
    l = (2 - s) * v;
    const lmin = (2 - s) * vmin;
    sl = s * vmin;
    sl /= lmin <= 1 ? lmin : 2 - lmin;
    sl = sl || 0;
    l /= 2;
    return [h, sl * 100, l * 100];
  };
  convert.hwb.rgb = function(hwb) {
    const h = hwb[0] / 360;
    let wh = hwb[1] / 100;
    let bl = hwb[2] / 100;
    const ratio = wh + bl;
    let f;
    if (ratio > 1) {
      wh /= ratio;
      bl /= ratio;
    }
    const i = Math.floor(6 * h);
    const v = 1 - bl;
    f = 6 * h - i;
    if ((i & 1) !== 0) {
      f = 1 - f;
    }
    const n = wh + f * (v - wh);
    let r;
    let g;
    let b;
    switch (i) {
      default:
      case 6:
      case 0:
        r = v;
        g = n;
        b = wh;
        break;
      case 1:
        r = n;
        g = v;
        b = wh;
        break;
      case 2:
        r = wh;
        g = v;
        b = n;
        break;
      case 3:
        r = wh;
        g = n;
        b = v;
        break;
      case 4:
        r = n;
        g = wh;
        b = v;
        break;
      case 5:
        r = v;
        g = wh;
        b = n;
        break;
    }
    return [r * 255, g * 255, b * 255];
  };
  convert.cmyk.rgb = function(cmyk) {
    const c = cmyk[0] / 100;
    const m = cmyk[1] / 100;
    const y = cmyk[2] / 100;
    const k = cmyk[3] / 100;
    const r = 1 - Math.min(1, c * (1 - k) + k);
    const g = 1 - Math.min(1, m * (1 - k) + k);
    const b = 1 - Math.min(1, y * (1 - k) + k);
    return [r * 255, g * 255, b * 255];
  };
  convert.xyz.rgb = function(xyz) {
    const x = xyz[0] / 100;
    const y = xyz[1] / 100;
    const z = xyz[2] / 100;
    let r;
    let g;
    let b;
    r = x * 3.2406 + y * -1.5372 + z * -0.4986;
    g = x * -0.9689 + y * 1.8758 + z * 0.0415;
    b = x * 0.0557 + y * -0.204 + z * 1.057;
    r = r > 31308e-7 ? 1.055 * r ** (1 / 2.4) - 0.055 : r * 12.92;
    g = g > 31308e-7 ? 1.055 * g ** (1 / 2.4) - 0.055 : g * 12.92;
    b = b > 31308e-7 ? 1.055 * b ** (1 / 2.4) - 0.055 : b * 12.92;
    r = Math.min(Math.max(0, r), 1);
    g = Math.min(Math.max(0, g), 1);
    b = Math.min(Math.max(0, b), 1);
    return [r * 255, g * 255, b * 255];
  };
  convert.xyz.lab = function(xyz) {
    let x = xyz[0];
    let y = xyz[1];
    let z = xyz[2];
    x /= 95.047;
    y /= 100;
    z /= 108.883;
    x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
    y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
    z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
    const l = 116 * y - 16;
    const a = 500 * (x - y);
    const b = 200 * (y - z);
    return [l, a, b];
  };
  convert.lab.xyz = function(lab) {
    const l = lab[0];
    const a = lab[1];
    const b = lab[2];
    let x;
    let y;
    let z;
    y = (l + 16) / 116;
    x = a / 500 + y;
    z = y - b / 200;
    const y2 = y ** 3;
    const x2 = x ** 3;
    const z2 = z ** 3;
    y = y2 > 8856e-6 ? y2 : (y - 16 / 116) / 7.787;
    x = x2 > 8856e-6 ? x2 : (x - 16 / 116) / 7.787;
    z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
    x *= 95.047;
    y *= 100;
    z *= 108.883;
    return [x, y, z];
  };
  convert.lab.lch = function(lab) {
    const l = lab[0];
    const a = lab[1];
    const b = lab[2];
    let h;
    const hr = Math.atan2(b, a);
    h = hr * 360 / 2 / Math.PI;
    if (h < 0) {
      h += 360;
    }
    const c = Math.sqrt(a * a + b * b);
    return [l, c, h];
  };
  convert.lch.lab = function(lch) {
    const l = lch[0];
    const c = lch[1];
    const h = lch[2];
    const hr = h / 360 * 2 * Math.PI;
    const a = c * Math.cos(hr);
    const b = c * Math.sin(hr);
    return [l, a, b];
  };
  convert.rgb.ansi16 = function(args, saturation = null) {
    const [r, g, b] = args;
    let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation;
    value = Math.round(value / 50);
    if (value === 0) {
      return 30;
    }
    let ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
    if (value === 2) {
      ansi += 60;
    }
    return ansi;
  };
  convert.hsv.ansi16 = function(args) {
    return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
  };
  convert.rgb.ansi256 = function(args) {
    const r = args[0];
    const g = args[1];
    const b = args[2];
    if (r === g && g === b) {
      if (r < 8) {
        return 16;
      }
      if (r > 248) {
        return 231;
      }
      return Math.round((r - 8) / 247 * 24) + 232;
    }
    const ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
    return ansi;
  };
  convert.ansi16.rgb = function(args) {
    let color = args % 10;
    if (color === 0 || color === 7) {
      if (args > 50) {
        color += 3.5;
      }
      color = color / 10.5 * 255;
      return [color, color, color];
    }
    const mult = (~~(args > 50) + 1) * 0.5;
    const r = (color & 1) * mult * 255;
    const g = (color >> 1 & 1) * mult * 255;
    const b = (color >> 2 & 1) * mult * 255;
    return [r, g, b];
  };
  convert.ansi256.rgb = function(args) {
    if (args >= 232) {
      const c = (args - 232) * 10 + 8;
      return [c, c, c];
    }
    args -= 16;
    let rem;
    const r = Math.floor(args / 36) / 5 * 255;
    const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
    const b = rem % 6 / 5 * 255;
    return [r, g, b];
  };
  convert.rgb.hex = function(args) {
    const integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
    const string = integer.toString(16).toUpperCase();
    return "000000".substring(string.length) + string;
  };
  convert.hex.rgb = function(args) {
    const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
    if (!match) {
      return [0, 0, 0];
    }
    let colorString = match[0];
    if (match[0].length === 3) {
      colorString = colorString.split("").map((char) => {
        return char + char;
      }).join("");
    }
    const integer = parseInt(colorString, 16);
    const r = integer >> 16 & 255;
    const g = integer >> 8 & 255;
    const b = integer & 255;
    return [r, g, b];
  };
  convert.rgb.hcg = function(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const max = Math.max(Math.max(r, g), b);
    const min = Math.min(Math.min(r, g), b);
    const chroma = max - min;
    let grayscale;
    let hue;
    if (chroma < 1) {
      grayscale = min / (1 - chroma);
    } else {
      grayscale = 0;
    }
    if (chroma <= 0) {
      hue = 0;
    } else if (max === r) {
      hue = (g - b) / chroma % 6;
    } else if (max === g) {
      hue = 2 + (b - r) / chroma;
    } else {
      hue = 4 + (r - g) / chroma;
    }
    hue /= 6;
    hue %= 1;
    return [hue * 360, chroma * 100, grayscale * 100];
  };
  convert.hsl.hcg = function(hsl) {
    const s = hsl[1] / 100;
    const l = hsl[2] / 100;
    const c = l < 0.5 ? 2 * s * l : 2 * s * (1 - l);
    let f = 0;
    if (c < 1) {
      f = (l - 0.5 * c) / (1 - c);
    }
    return [hsl[0], c * 100, f * 100];
  };
  convert.hsv.hcg = function(hsv) {
    const s = hsv[1] / 100;
    const v = hsv[2] / 100;
    const c = s * v;
    let f = 0;
    if (c < 1) {
      f = (v - c) / (1 - c);
    }
    return [hsv[0], c * 100, f * 100];
  };
  convert.hcg.rgb = function(hcg) {
    const h = hcg[0] / 360;
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    if (c === 0) {
      return [g * 255, g * 255, g * 255];
    }
    const pure = [0, 0, 0];
    const hi = h % 1 * 6;
    const v = hi % 1;
    const w = 1 - v;
    let mg = 0;
    switch (Math.floor(hi)) {
      case 0:
        pure[0] = 1;
        pure[1] = v;
        pure[2] = 0;
        break;
      case 1:
        pure[0] = w;
        pure[1] = 1;
        pure[2] = 0;
        break;
      case 2:
        pure[0] = 0;
        pure[1] = 1;
        pure[2] = v;
        break;
      case 3:
        pure[0] = 0;
        pure[1] = w;
        pure[2] = 1;
        break;
      case 4:
        pure[0] = v;
        pure[1] = 0;
        pure[2] = 1;
        break;
      default:
        pure[0] = 1;
        pure[1] = 0;
        pure[2] = w;
    }
    mg = (1 - c) * g;
    return [
      (c * pure[0] + mg) * 255,
      (c * pure[1] + mg) * 255,
      (c * pure[2] + mg) * 255
    ];
  };
  convert.hcg.hsv = function(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    const v = c + g * (1 - c);
    let f = 0;
    if (v > 0) {
      f = c / v;
    }
    return [hcg[0], f * 100, v * 100];
  };
  convert.hcg.hsl = function(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    const l = g * (1 - c) + 0.5 * c;
    let s = 0;
    if (l > 0 && l < 0.5) {
      s = c / (2 * l);
    } else if (l >= 0.5 && l < 1) {
      s = c / (2 * (1 - l));
    }
    return [hcg[0], s * 100, l * 100];
  };
  convert.hcg.hwb = function(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    const v = c + g * (1 - c);
    return [hcg[0], (v - c) * 100, (1 - v) * 100];
  };
  convert.hwb.hcg = function(hwb) {
    const w = hwb[1] / 100;
    const b = hwb[2] / 100;
    const v = 1 - b;
    const c = v - w;
    let g = 0;
    if (c < 1) {
      g = (v - c) / (1 - c);
    }
    return [hwb[0], c * 100, g * 100];
  };
  convert.apple.rgb = function(apple) {
    return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
  };
  convert.rgb.apple = function(rgb) {
    return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
  };
  convert.gray.rgb = function(args) {
    return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
  };
  convert.gray.hsl = function(args) {
    return [0, 0, args[0]];
  };
  convert.gray.hsv = convert.gray.hsl;
  convert.gray.hwb = function(gray) {
    return [0, 100, gray[0]];
  };
  convert.gray.cmyk = function(gray) {
    return [0, 0, 0, gray[0]];
  };
  convert.gray.lab = function(gray) {
    return [gray[0], 0, 0];
  };
  convert.gray.hex = function(gray) {
    const val = Math.round(gray[0] / 100 * 255) & 255;
    const integer = (val << 16) + (val << 8) + val;
    const string = integer.toString(16).toUpperCase();
    return "000000".substring(string.length) + string;
  };
  convert.rgb.gray = function(rgb) {
    const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
    return [val / 255 * 100];
  };
});

// ../../node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/route.js
var require_route = __commonJS((exports2, module2) => {
  var conversions = require_conversions();
  function buildGraph() {
    const graph = {};
    const models = Object.keys(conversions);
    for (let len = models.length, i = 0; i < len; i++) {
      graph[models[i]] = {
        distance: -1,
        parent: null
      };
    }
    return graph;
  }
  function deriveBFS(fromModel) {
    const graph = buildGraph();
    const queue = [fromModel];
    graph[fromModel].distance = 0;
    while (queue.length) {
      const current = queue.pop();
      const adjacents = Object.keys(conversions[current]);
      for (let len = adjacents.length, i = 0; i < len; i++) {
        const adjacent = adjacents[i];
        const node = graph[adjacent];
        if (node.distance === -1) {
          node.distance = graph[current].distance + 1;
          node.parent = current;
          queue.unshift(adjacent);
        }
      }
    }
    return graph;
  }
  function link(from, to) {
    return function(args) {
      return to(from(args));
    };
  }
  function wrapConversion(toModel, graph) {
    const path2 = [graph[toModel].parent, toModel];
    let fn = conversions[graph[toModel].parent][toModel];
    let cur = graph[toModel].parent;
    while (graph[cur].parent) {
      path2.unshift(graph[cur].parent);
      fn = link(conversions[graph[cur].parent][cur], fn);
      cur = graph[cur].parent;
    }
    fn.conversion = path2;
    return fn;
  }
  module2.exports = function(fromModel) {
    const graph = deriveBFS(fromModel);
    const conversion = {};
    const models = Object.keys(graph);
    for (let len = models.length, i = 0; i < len; i++) {
      const toModel = models[i];
      const node = graph[toModel];
      if (node.parent === null) {
        continue;
      }
      conversion[toModel] = wrapConversion(toModel, graph);
    }
    return conversion;
  };
});

// ../../node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/index.js
var require_color_convert = __commonJS((exports2, module2) => {
  var conversions = require_conversions();
  var route = require_route();
  var convert = {};
  var models = Object.keys(conversions);
  function wrapRaw(fn) {
    const wrappedFn = function(...args) {
      const arg0 = args[0];
      if (arg0 === void 0 || arg0 === null) {
        return arg0;
      }
      if (arg0.length > 1) {
        args = arg0;
      }
      return fn(args);
    };
    if ("conversion" in fn) {
      wrappedFn.conversion = fn.conversion;
    }
    return wrappedFn;
  }
  function wrapRounded(fn) {
    const wrappedFn = function(...args) {
      const arg0 = args[0];
      if (arg0 === void 0 || arg0 === null) {
        return arg0;
      }
      if (arg0.length > 1) {
        args = arg0;
      }
      const result = fn(args);
      if (typeof result === "object") {
        for (let len = result.length, i = 0; i < len; i++) {
          result[i] = Math.round(result[i]);
        }
      }
      return result;
    };
    if ("conversion" in fn) {
      wrappedFn.conversion = fn.conversion;
    }
    return wrappedFn;
  }
  models.forEach((fromModel) => {
    convert[fromModel] = {};
    Object.defineProperty(convert[fromModel], "channels", {value: conversions[fromModel].channels});
    Object.defineProperty(convert[fromModel], "labels", {value: conversions[fromModel].labels});
    const routes = route(fromModel);
    const routeModels = Object.keys(routes);
    routeModels.forEach((toModel) => {
      const fn = routes[toModel];
      convert[fromModel][toModel] = wrapRounded(fn);
      convert[fromModel][toModel].raw = wrapRaw(fn);
    });
  });
  module2.exports = convert;
});

// ../../node_modules/.pnpm/ansi-styles@4.3.0/node_modules/ansi-styles/index.js
var require_ansi_styles = __commonJS((exports2, module2) => {
  "use strict";
  var wrapAnsi16 = (fn, offset) => (...args) => {
    const code = fn(...args);
    return `[${code + offset}m`;
  };
  var wrapAnsi256 = (fn, offset) => (...args) => {
    const code = fn(...args);
    return `[${38 + offset};5;${code}m`;
  };
  var wrapAnsi16m = (fn, offset) => (...args) => {
    const rgb = fn(...args);
    return `[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
  };
  var ansi2ansi = (n) => n;
  var rgb2rgb = (r, g, b) => [r, g, b];
  var setLazyProperty = (object, property, get) => {
    Object.defineProperty(object, property, {
      get: () => {
        const value = get();
        Object.defineProperty(object, property, {
          value,
          enumerable: true,
          configurable: true
        });
        return value;
      },
      enumerable: true,
      configurable: true
    });
  };
  var colorConvert;
  var makeDynamicStyles = (wrap, targetSpace, identity, isBackground) => {
    if (colorConvert === void 0) {
      colorConvert = require_color_convert();
    }
    const offset = isBackground ? 10 : 0;
    const styles = {};
    for (const [sourceSpace, suite] of Object.entries(colorConvert)) {
      const name = sourceSpace === "ansi16" ? "ansi" : sourceSpace;
      if (sourceSpace === targetSpace) {
        styles[name] = wrap(identity, offset);
      } else if (typeof suite === "object") {
        styles[name] = wrap(suite[targetSpace], offset);
      }
    }
    return styles;
  };
  function assembleStyles() {
    const codes = new Map();
    const styles = {
      modifier: {
        reset: [0, 0],
        bold: [1, 22],
        dim: [2, 22],
        italic: [3, 23],
        underline: [4, 24],
        inverse: [7, 27],
        hidden: [8, 28],
        strikethrough: [9, 29]
      },
      color: {
        black: [30, 39],
        red: [31, 39],
        green: [32, 39],
        yellow: [33, 39],
        blue: [34, 39],
        magenta: [35, 39],
        cyan: [36, 39],
        white: [37, 39],
        blackBright: [90, 39],
        redBright: [91, 39],
        greenBright: [92, 39],
        yellowBright: [93, 39],
        blueBright: [94, 39],
        magentaBright: [95, 39],
        cyanBright: [96, 39],
        whiteBright: [97, 39]
      },
      bgColor: {
        bgBlack: [40, 49],
        bgRed: [41, 49],
        bgGreen: [42, 49],
        bgYellow: [43, 49],
        bgBlue: [44, 49],
        bgMagenta: [45, 49],
        bgCyan: [46, 49],
        bgWhite: [47, 49],
        bgBlackBright: [100, 49],
        bgRedBright: [101, 49],
        bgGreenBright: [102, 49],
        bgYellowBright: [103, 49],
        bgBlueBright: [104, 49],
        bgMagentaBright: [105, 49],
        bgCyanBright: [106, 49],
        bgWhiteBright: [107, 49]
      }
    };
    styles.color.gray = styles.color.blackBright;
    styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
    styles.color.grey = styles.color.blackBright;
    styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;
    for (const [groupName, group] of Object.entries(styles)) {
      for (const [styleName, style] of Object.entries(group)) {
        styles[styleName] = {
          open: `[${style[0]}m`,
          close: `[${style[1]}m`
        };
        group[styleName] = styles[styleName];
        codes.set(style[0], style[1]);
      }
      Object.defineProperty(styles, groupName, {
        value: group,
        enumerable: false
      });
    }
    Object.defineProperty(styles, "codes", {
      value: codes,
      enumerable: false
    });
    styles.color.close = "[39m";
    styles.bgColor.close = "[49m";
    setLazyProperty(styles.color, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, false));
    setLazyProperty(styles.color, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, false));
    setLazyProperty(styles.color, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, false));
    setLazyProperty(styles.bgColor, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, true));
    setLazyProperty(styles.bgColor, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, true));
    setLazyProperty(styles.bgColor, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, true));
    return styles;
  }
  Object.defineProperty(module2, "exports", {
    enumerable: true,
    get: assembleStyles
  });
});

// ../../node_modules/.pnpm/chalk@4.1.1/node_modules/chalk/source/util.js
var require_util = __commonJS((exports2, module2) => {
  "use strict";
  var stringReplaceAll = (string, substring, replacer) => {
    let index = string.indexOf(substring);
    if (index === -1) {
      return string;
    }
    const substringLength = substring.length;
    let endIndex = 0;
    let returnValue = "";
    do {
      returnValue += string.substr(endIndex, index - endIndex) + substring + replacer;
      endIndex = index + substringLength;
      index = string.indexOf(substring, endIndex);
    } while (index !== -1);
    returnValue += string.substr(endIndex);
    return returnValue;
  };
  var stringEncaseCRLFWithFirstIndex = (string, prefix, postfix, index) => {
    let endIndex = 0;
    let returnValue = "";
    do {
      const gotCR = string[index - 1] === "\r";
      returnValue += string.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
      endIndex = index + 1;
      index = string.indexOf("\n", endIndex);
    } while (index !== -1);
    returnValue += string.substr(endIndex);
    return returnValue;
  };
  module2.exports = {
    stringReplaceAll,
    stringEncaseCRLFWithFirstIndex
  };
});

// ../../node_modules/.pnpm/chalk@4.1.1/node_modules/chalk/source/templates.js
var require_templates = __commonJS((exports2, module2) => {
  "use strict";
  var TEMPLATE_REGEX = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
  var STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
  var STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
  var ESCAPE_REGEX = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi;
  var ESCAPES = new Map([
    ["n", "\n"],
    ["r", "\r"],
    ["t", "	"],
    ["b", "\b"],
    ["f", "\f"],
    ["v", "\v"],
    ["0", "\0"],
    ["\\", "\\"],
    ["e", ""],
    ["a", "\x07"]
  ]);
  function unescape(c) {
    const u = c[0] === "u";
    const bracket = c[1] === "{";
    if (u && !bracket && c.length === 5 || c[0] === "x" && c.length === 3) {
      return String.fromCharCode(parseInt(c.slice(1), 16));
    }
    if (u && bracket) {
      return String.fromCodePoint(parseInt(c.slice(2, -1), 16));
    }
    return ESCAPES.get(c) || c;
  }
  function parseArguments(name, arguments_) {
    const results = [];
    const chunks = arguments_.trim().split(/\s*,\s*/g);
    let matches;
    for (const chunk of chunks) {
      const number = Number(chunk);
      if (!Number.isNaN(number)) {
        results.push(number);
      } else if (matches = chunk.match(STRING_REGEX)) {
        results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, character) => escape ? unescape(escape) : character));
      } else {
        throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
      }
    }
    return results;
  }
  function parseStyle(style) {
    STYLE_REGEX.lastIndex = 0;
    const results = [];
    let matches;
    while ((matches = STYLE_REGEX.exec(style)) !== null) {
      const name = matches[1];
      if (matches[2]) {
        const args = parseArguments(name, matches[2]);
        results.push([name].concat(args));
      } else {
        results.push([name]);
      }
    }
    return results;
  }
  function buildStyle(chalk, styles) {
    const enabled = {};
    for (const layer of styles) {
      for (const style of layer.styles) {
        enabled[style[0]] = layer.inverse ? null : style.slice(1);
      }
    }
    let current = chalk;
    for (const [styleName, styles2] of Object.entries(enabled)) {
      if (!Array.isArray(styles2)) {
        continue;
      }
      if (!(styleName in current)) {
        throw new Error(`Unknown Chalk style: ${styleName}`);
      }
      current = styles2.length > 0 ? current[styleName](...styles2) : current[styleName];
    }
    return current;
  }
  module2.exports = (chalk, temporary) => {
    const styles = [];
    const chunks = [];
    let chunk = [];
    temporary.replace(TEMPLATE_REGEX, (m, escapeCharacter, inverse, style, close, character) => {
      if (escapeCharacter) {
        chunk.push(unescape(escapeCharacter));
      } else if (style) {
        const string = chunk.join("");
        chunk = [];
        chunks.push(styles.length === 0 ? string : buildStyle(chalk, styles)(string));
        styles.push({inverse, styles: parseStyle(style)});
      } else if (close) {
        if (styles.length === 0) {
          throw new Error("Found extraneous } in Chalk template literal");
        }
        chunks.push(buildStyle(chalk, styles)(chunk.join("")));
        chunk = [];
        styles.pop();
      } else {
        chunk.push(character);
      }
    });
    chunks.push(chunk.join(""));
    if (styles.length > 0) {
      const errMessage = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? "" : "s"} (\`}\`)`;
      throw new Error(errMessage);
    }
    return chunks.join("");
  };
});

// ../../node_modules/.pnpm/chalk@4.1.1/node_modules/chalk/source/index.js
var require_source = __commonJS((exports2, module2) => {
  "use strict";
  var ansiStyles = require_ansi_styles();
  var {stdout: stdoutColor, stderr: stderrColor} = require_supports_color();
  var {
    stringReplaceAll,
    stringEncaseCRLFWithFirstIndex
  } = require_util();
  var {isArray} = Array;
  var levelMapping = [
    "ansi",
    "ansi",
    "ansi256",
    "ansi16m"
  ];
  var styles = Object.create(null);
  var applyOptions = (object, options = {}) => {
    if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
      throw new Error("The `level` option should be an integer from 0 to 3");
    }
    const colorLevel = stdoutColor ? stdoutColor.level : 0;
    object.level = options.level === void 0 ? colorLevel : options.level;
  };
  var ChalkClass = class {
    constructor(options) {
      return chalkFactory(options);
    }
  };
  var chalkFactory = (options) => {
    const chalk2 = {};
    applyOptions(chalk2, options);
    chalk2.template = (...arguments_) => chalkTag(chalk2.template, ...arguments_);
    Object.setPrototypeOf(chalk2, Chalk.prototype);
    Object.setPrototypeOf(chalk2.template, chalk2);
    chalk2.template.constructor = () => {
      throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.");
    };
    chalk2.template.Instance = ChalkClass;
    return chalk2.template;
  };
  function Chalk(options) {
    return chalkFactory(options);
  }
  for (const [styleName, style] of Object.entries(ansiStyles)) {
    styles[styleName] = {
      get() {
        const builder = createBuilder(this, createStyler(style.open, style.close, this._styler), this._isEmpty);
        Object.defineProperty(this, styleName, {value: builder});
        return builder;
      }
    };
  }
  styles.visible = {
    get() {
      const builder = createBuilder(this, this._styler, true);
      Object.defineProperty(this, "visible", {value: builder});
      return builder;
    }
  };
  var usedModels = ["rgb", "hex", "keyword", "hsl", "hsv", "hwb", "ansi", "ansi256"];
  for (const model of usedModels) {
    styles[model] = {
      get() {
        const {level} = this;
        return function(...arguments_) {
          const styler = createStyler(ansiStyles.color[levelMapping[level]][model](...arguments_), ansiStyles.color.close, this._styler);
          return createBuilder(this, styler, this._isEmpty);
        };
      }
    };
  }
  for (const model of usedModels) {
    const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
    styles[bgModel] = {
      get() {
        const {level} = this;
        return function(...arguments_) {
          const styler = createStyler(ansiStyles.bgColor[levelMapping[level]][model](...arguments_), ansiStyles.bgColor.close, this._styler);
          return createBuilder(this, styler, this._isEmpty);
        };
      }
    };
  }
  var proto = Object.defineProperties(() => {
  }, {
    ...styles,
    level: {
      enumerable: true,
      get() {
        return this._generator.level;
      },
      set(level) {
        this._generator.level = level;
      }
    }
  });
  var createStyler = (open, close, parent) => {
    let openAll;
    let closeAll;
    if (parent === void 0) {
      openAll = open;
      closeAll = close;
    } else {
      openAll = parent.openAll + open;
      closeAll = close + parent.closeAll;
    }
    return {
      open,
      close,
      openAll,
      closeAll,
      parent
    };
  };
  var createBuilder = (self, _styler, _isEmpty) => {
    const builder = (...arguments_) => {
      if (isArray(arguments_[0]) && isArray(arguments_[0].raw)) {
        return applyStyle(builder, chalkTag(builder, ...arguments_));
      }
      return applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
    };
    Object.setPrototypeOf(builder, proto);
    builder._generator = self;
    builder._styler = _styler;
    builder._isEmpty = _isEmpty;
    return builder;
  };
  var applyStyle = (self, string) => {
    if (self.level <= 0 || !string) {
      return self._isEmpty ? "" : string;
    }
    let styler = self._styler;
    if (styler === void 0) {
      return string;
    }
    const {openAll, closeAll} = styler;
    if (string.indexOf("") !== -1) {
      while (styler !== void 0) {
        string = stringReplaceAll(string, styler.close, styler.open);
        styler = styler.parent;
      }
    }
    const lfIndex = string.indexOf("\n");
    if (lfIndex !== -1) {
      string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
    }
    return openAll + string + closeAll;
  };
  var template;
  var chalkTag = (chalk2, ...strings) => {
    const [firstString] = strings;
    if (!isArray(firstString) || !isArray(firstString.raw)) {
      return strings.join(" ");
    }
    const arguments_ = strings.slice(1);
    const parts = [firstString.raw[0]];
    for (let i = 1; i < firstString.length; i++) {
      parts.push(String(arguments_[i - 1]).replace(/[{}\\]/g, "\\$&"), String(firstString.raw[i]));
    }
    if (template === void 0) {
      template = require_templates();
    }
    return template(chalk2, parts.join(""));
  };
  Object.defineProperties(Chalk.prototype, styles);
  var chalk = Chalk();
  chalk.supportsColor = stdoutColor;
  chalk.stderr = Chalk({level: stderrColor ? stderrColor.level : 0});
  chalk.stderr.supportsColor = stderrColor;
  module2.exports = chalk;
});

// ../../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/windows.js
var require_windows = __commonJS((exports2, module2) => {
  module2.exports = isexe;
  isexe.sync = sync;
  var fs = require("fs");
  function checkPathExt(path2, options) {
    var pathext = options.pathExt !== void 0 ? options.pathExt : process.env.PATHEXT;
    if (!pathext) {
      return true;
    }
    pathext = pathext.split(";");
    if (pathext.indexOf("") !== -1) {
      return true;
    }
    for (var i = 0; i < pathext.length; i++) {
      var p = pathext[i].toLowerCase();
      if (p && path2.substr(-p.length).toLowerCase() === p) {
        return true;
      }
    }
    return false;
  }
  function checkStat(stat, path2, options) {
    if (!stat.isSymbolicLink() && !stat.isFile()) {
      return false;
    }
    return checkPathExt(path2, options);
  }
  function isexe(path2, options, cb) {
    fs.stat(path2, function(er, stat) {
      cb(er, er ? false : checkStat(stat, path2, options));
    });
  }
  function sync(path2, options) {
    return checkStat(fs.statSync(path2), path2, options);
  }
});

// ../../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/mode.js
var require_mode = __commonJS((exports2, module2) => {
  module2.exports = isexe;
  isexe.sync = sync;
  var fs = require("fs");
  function isexe(path2, options, cb) {
    fs.stat(path2, function(er, stat) {
      cb(er, er ? false : checkStat(stat, options));
    });
  }
  function sync(path2, options) {
    return checkStat(fs.statSync(path2), options);
  }
  function checkStat(stat, options) {
    return stat.isFile() && checkMode(stat, options);
  }
  function checkMode(stat, options) {
    var mod = stat.mode;
    var uid = stat.uid;
    var gid = stat.gid;
    var myUid = options.uid !== void 0 ? options.uid : process.getuid && process.getuid();
    var myGid = options.gid !== void 0 ? options.gid : process.getgid && process.getgid();
    var u = parseInt("100", 8);
    var g = parseInt("010", 8);
    var o = parseInt("001", 8);
    var ug = u | g;
    var ret = mod & o || mod & g && gid === myGid || mod & u && uid === myUid || mod & ug && myUid === 0;
    return ret;
  }
});

// ../../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/index.js
var require_isexe = __commonJS((exports2, module2) => {
  var fs = require("fs");
  var core;
  if (process.platform === "win32" || global.TESTING_WINDOWS) {
    core = require_windows();
  } else {
    core = require_mode();
  }
  module2.exports = isexe;
  isexe.sync = sync;
  function isexe(path2, options, cb) {
    if (typeof options === "function") {
      cb = options;
      options = {};
    }
    if (!cb) {
      if (typeof Promise !== "function") {
        throw new TypeError("callback not provided");
      }
      return new Promise(function(resolve, reject) {
        isexe(path2, options || {}, function(er, is) {
          if (er) {
            reject(er);
          } else {
            resolve(is);
          }
        });
      });
    }
    core(path2, options || {}, function(er, is) {
      if (er) {
        if (er.code === "EACCES" || options && options.ignoreErrors) {
          er = null;
          is = false;
        }
      }
      cb(er, is);
    });
  }
  function sync(path2, options) {
    try {
      return core.sync(path2, options || {});
    } catch (er) {
      if (options && options.ignoreErrors || er.code === "EACCES") {
        return false;
      } else {
        throw er;
      }
    }
  }
});

// ../../node_modules/.pnpm/which@2.0.2/node_modules/which/which.js
var require_which = __commonJS((exports2, module2) => {
  var isWindows = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys";
  var path2 = require("path");
  var COLON = isWindows ? ";" : ":";
  var isexe = require_isexe();
  var getNotFoundError = (cmd) => Object.assign(new Error(`not found: ${cmd}`), {code: "ENOENT"});
  var getPathInfo = (cmd, opt) => {
    const colon = opt.colon || COLON;
    const pathEnv = cmd.match(/\//) || isWindows && cmd.match(/\\/) ? [""] : [
      ...isWindows ? [process.cwd()] : [],
      ...(opt.path || process.env.PATH || "").split(colon)
    ];
    const pathExtExe = isWindows ? opt.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "";
    const pathExt = isWindows ? pathExtExe.split(colon) : [""];
    if (isWindows) {
      if (cmd.indexOf(".") !== -1 && pathExt[0] !== "")
        pathExt.unshift("");
    }
    return {
      pathEnv,
      pathExt,
      pathExtExe
    };
  };
  var which = (cmd, opt, cb) => {
    if (typeof opt === "function") {
      cb = opt;
      opt = {};
    }
    if (!opt)
      opt = {};
    const {pathEnv, pathExt, pathExtExe} = getPathInfo(cmd, opt);
    const found = [];
    const step = (i) => new Promise((resolve, reject) => {
      if (i === pathEnv.length)
        return opt.all && found.length ? resolve(found) : reject(getNotFoundError(cmd));
      const ppRaw = pathEnv[i];
      const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
      const pCmd = path2.join(pathPart, cmd);
      const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
      resolve(subStep(p, i, 0));
    });
    const subStep = (p, i, ii) => new Promise((resolve, reject) => {
      if (ii === pathExt.length)
        return resolve(step(i + 1));
      const ext = pathExt[ii];
      isexe(p + ext, {pathExt: pathExtExe}, (er, is) => {
        if (!er && is) {
          if (opt.all)
            found.push(p + ext);
          else
            return resolve(p + ext);
        }
        return resolve(subStep(p, i, ii + 1));
      });
    });
    return cb ? step(0).then((res) => cb(null, res), cb) : step(0);
  };
  var whichSync = (cmd, opt) => {
    opt = opt || {};
    const {pathEnv, pathExt, pathExtExe} = getPathInfo(cmd, opt);
    const found = [];
    for (let i = 0; i < pathEnv.length; i++) {
      const ppRaw = pathEnv[i];
      const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
      const pCmd = path2.join(pathPart, cmd);
      const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
      for (let j = 0; j < pathExt.length; j++) {
        const cur = p + pathExt[j];
        try {
          const is = isexe.sync(cur, {pathExt: pathExtExe});
          if (is) {
            if (opt.all)
              found.push(cur);
            else
              return cur;
          }
        } catch (ex) {
        }
      }
    }
    if (opt.all && found.length)
      return found;
    if (opt.nothrow)
      return null;
    throw getNotFoundError(cmd);
  };
  module2.exports = which;
  which.sync = whichSync;
});

// ../../node_modules/.pnpm/path-key@3.1.1/node_modules/path-key/index.js
var require_path_key = __commonJS((exports2, module2) => {
  "use strict";
  var pathKey = (options = {}) => {
    const environment = options.env || process.env;
    const platform = options.platform || process.platform;
    if (platform !== "win32") {
      return "PATH";
    }
    return Object.keys(environment).reverse().find((key) => key.toUpperCase() === "PATH") || "Path";
  };
  module2.exports = pathKey;
  module2.exports.default = pathKey;
});

// ../../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/util/resolveCommand.js
var require_resolveCommand = __commonJS((exports2, module2) => {
  "use strict";
  var path2 = require("path");
  var which = require_which();
  var getPathKey = require_path_key();
  function resolveCommandAttempt(parsed, withoutPathExt) {
    const env = parsed.options.env || process.env;
    const cwd = process.cwd();
    const hasCustomCwd = parsed.options.cwd != null;
    const shouldSwitchCwd = hasCustomCwd && process.chdir !== void 0 && !process.chdir.disabled;
    if (shouldSwitchCwd) {
      try {
        process.chdir(parsed.options.cwd);
      } catch (err) {
      }
    }
    let resolved;
    try {
      resolved = which.sync(parsed.command, {
        path: env[getPathKey({env})],
        pathExt: withoutPathExt ? path2.delimiter : void 0
      });
    } catch (e) {
    } finally {
      if (shouldSwitchCwd) {
        process.chdir(cwd);
      }
    }
    if (resolved) {
      resolved = path2.resolve(hasCustomCwd ? parsed.options.cwd : "", resolved);
    }
    return resolved;
  }
  function resolveCommand(parsed) {
    return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true);
  }
  module2.exports = resolveCommand;
});

// ../../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/util/escape.js
var require_escape = __commonJS((exports2, module2) => {
  "use strict";
  var metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;
  function escapeCommand(arg) {
    arg = arg.replace(metaCharsRegExp, "^$1");
    return arg;
  }
  function escapeArgument(arg, doubleEscapeMetaChars) {
    arg = `${arg}`;
    arg = arg.replace(/(\\*)"/g, '$1$1\\"');
    arg = arg.replace(/(\\*)$/, "$1$1");
    arg = `"${arg}"`;
    arg = arg.replace(metaCharsRegExp, "^$1");
    if (doubleEscapeMetaChars) {
      arg = arg.replace(metaCharsRegExp, "^$1");
    }
    return arg;
  }
  module2.exports.command = escapeCommand;
  module2.exports.argument = escapeArgument;
});

// ../../node_modules/.pnpm/shebang-regex@3.0.0/node_modules/shebang-regex/index.js
var require_shebang_regex = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = /^#!(.*)/;
});

// ../../node_modules/.pnpm/shebang-command@2.0.0/node_modules/shebang-command/index.js
var require_shebang_command = __commonJS((exports2, module2) => {
  "use strict";
  var shebangRegex = require_shebang_regex();
  module2.exports = (string = "") => {
    const match = string.match(shebangRegex);
    if (!match) {
      return null;
    }
    const [path2, argument] = match[0].replace(/#! ?/, "").split(" ");
    const binary = path2.split("/").pop();
    if (binary === "env") {
      return argument;
    }
    return argument ? `${binary} ${argument}` : binary;
  };
});

// ../../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/util/readShebang.js
var require_readShebang = __commonJS((exports2, module2) => {
  "use strict";
  var fs = require("fs");
  var shebangCommand = require_shebang_command();
  function readShebang(command) {
    const size = 150;
    const buffer = Buffer.alloc(size);
    let fd;
    try {
      fd = fs.openSync(command, "r");
      fs.readSync(fd, buffer, 0, size, 0);
      fs.closeSync(fd);
    } catch (e) {
    }
    return shebangCommand(buffer.toString());
  }
  module2.exports = readShebang;
});

// ../../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/parse.js
var require_parse = __commonJS((exports2, module2) => {
  "use strict";
  var path2 = require("path");
  var resolveCommand = require_resolveCommand();
  var escape = require_escape();
  var readShebang = require_readShebang();
  var isWin = process.platform === "win32";
  var isExecutableRegExp = /\.(?:com|exe)$/i;
  var isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
  function detectShebang(parsed) {
    parsed.file = resolveCommand(parsed);
    const shebang = parsed.file && readShebang(parsed.file);
    if (shebang) {
      parsed.args.unshift(parsed.file);
      parsed.command = shebang;
      return resolveCommand(parsed);
    }
    return parsed.file;
  }
  function parseNonShell(parsed) {
    if (!isWin) {
      return parsed;
    }
    const commandFile = detectShebang(parsed);
    const needsShell = !isExecutableRegExp.test(commandFile);
    if (parsed.options.forceShell || needsShell) {
      const needsDoubleEscapeMetaChars = isCmdShimRegExp.test(commandFile);
      parsed.command = path2.normalize(parsed.command);
      parsed.command = escape.command(parsed.command);
      parsed.args = parsed.args.map((arg) => escape.argument(arg, needsDoubleEscapeMetaChars));
      const shellCommand = [parsed.command].concat(parsed.args).join(" ");
      parsed.args = ["/d", "/s", "/c", `"${shellCommand}"`];
      parsed.command = process.env.comspec || "cmd.exe";
      parsed.options.windowsVerbatimArguments = true;
    }
    return parsed;
  }
  function parse(command, args, options) {
    if (args && !Array.isArray(args)) {
      options = args;
      args = null;
    }
    args = args ? args.slice(0) : [];
    options = Object.assign({}, options);
    const parsed = {
      command,
      args,
      options,
      file: void 0,
      original: {
        command,
        args
      }
    };
    return options.shell ? parsed : parseNonShell(parsed);
  }
  module2.exports = parse;
});

// ../../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/enoent.js
var require_enoent = __commonJS((exports2, module2) => {
  "use strict";
  var isWin = process.platform === "win32";
  function notFoundError(original, syscall) {
    return Object.assign(new Error(`${syscall} ${original.command} ENOENT`), {
      code: "ENOENT",
      errno: "ENOENT",
      syscall: `${syscall} ${original.command}`,
      path: original.command,
      spawnargs: original.args
    });
  }
  function hookChildProcess(cp, parsed) {
    if (!isWin) {
      return;
    }
    const originalEmit = cp.emit;
    cp.emit = function(name, arg1) {
      if (name === "exit") {
        const err = verifyENOENT(arg1, parsed, "spawn");
        if (err) {
          return originalEmit.call(cp, "error", err);
        }
      }
      return originalEmit.apply(cp, arguments);
    };
  }
  function verifyENOENT(status, parsed) {
    if (isWin && status === 1 && !parsed.file) {
      return notFoundError(parsed.original, "spawn");
    }
    return null;
  }
  function verifyENOENTSync(status, parsed) {
    if (isWin && status === 1 && !parsed.file) {
      return notFoundError(parsed.original, "spawnSync");
    }
    return null;
  }
  module2.exports = {
    hookChildProcess,
    verifyENOENT,
    verifyENOENTSync,
    notFoundError
  };
});

// ../../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/index.js
var require_cross_spawn = __commonJS((exports2, module2) => {
  "use strict";
  var cp = require("child_process");
  var parse = require_parse();
  var enoent = require_enoent();
  function spawn(command, args, options) {
    const parsed = parse(command, args, options);
    const spawned = cp.spawn(parsed.command, parsed.args, parsed.options);
    enoent.hookChildProcess(spawned, parsed);
    return spawned;
  }
  function spawnSync(command, args, options) {
    const parsed = parse(command, args, options);
    const result = cp.spawnSync(parsed.command, parsed.args, parsed.options);
    result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);
    return result;
  }
  module2.exports = spawn;
  module2.exports.spawn = spawn;
  module2.exports.sync = spawnSync;
  module2.exports._parse = parse;
  module2.exports._enoent = enoent;
});

// ../../node_modules/.pnpm/strip-final-newline@2.0.0/node_modules/strip-final-newline/index.js
var require_strip_final_newline = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = (input) => {
    const LF = typeof input === "string" ? "\n" : "\n".charCodeAt();
    const CR = typeof input === "string" ? "\r" : "\r".charCodeAt();
    if (input[input.length - 1] === LF) {
      input = input.slice(0, input.length - 1);
    }
    if (input[input.length - 1] === CR) {
      input = input.slice(0, input.length - 1);
    }
    return input;
  };
});

// ../../node_modules/.pnpm/npm-run-path@4.0.1/node_modules/npm-run-path/index.js
var require_npm_run_path = __commonJS((exports2, module2) => {
  "use strict";
  var path2 = require("path");
  var pathKey = require_path_key();
  var npmRunPath = (options) => {
    options = {
      cwd: process.cwd(),
      path: process.env[pathKey()],
      execPath: process.execPath,
      ...options
    };
    let previous;
    let cwdPath = path2.resolve(options.cwd);
    const result = [];
    while (previous !== cwdPath) {
      result.push(path2.join(cwdPath, "node_modules/.bin"));
      previous = cwdPath;
      cwdPath = path2.resolve(cwdPath, "..");
    }
    const execPathDir = path2.resolve(options.cwd, options.execPath, "..");
    result.push(execPathDir);
    return result.concat(options.path).join(path2.delimiter);
  };
  module2.exports = npmRunPath;
  module2.exports.default = npmRunPath;
  module2.exports.env = (options) => {
    options = {
      env: process.env,
      ...options
    };
    const env = {...options.env};
    const path3 = pathKey({env});
    options.path = env[path3];
    env[path3] = module2.exports(options);
    return env;
  };
});

// ../../node_modules/.pnpm/mimic-fn@2.1.0/node_modules/mimic-fn/index.js
var require_mimic_fn = __commonJS((exports2, module2) => {
  "use strict";
  var mimicFn = (to, from) => {
    for (const prop of Reflect.ownKeys(from)) {
      Object.defineProperty(to, prop, Object.getOwnPropertyDescriptor(from, prop));
    }
    return to;
  };
  module2.exports = mimicFn;
  module2.exports.default = mimicFn;
});

// ../../node_modules/.pnpm/onetime@5.1.2/node_modules/onetime/index.js
var require_onetime = __commonJS((exports2, module2) => {
  "use strict";
  var mimicFn = require_mimic_fn();
  var calledFunctions = new WeakMap();
  var onetime = (function_, options = {}) => {
    if (typeof function_ !== "function") {
      throw new TypeError("Expected a function");
    }
    let returnValue;
    let callCount = 0;
    const functionName = function_.displayName || function_.name || "<anonymous>";
    const onetime2 = function(...arguments_) {
      calledFunctions.set(onetime2, ++callCount);
      if (callCount === 1) {
        returnValue = function_.apply(this, arguments_);
        function_ = null;
      } else if (options.throw === true) {
        throw new Error(`Function \`${functionName}\` can only be called once`);
      }
      return returnValue;
    };
    mimicFn(onetime2, function_);
    calledFunctions.set(onetime2, callCount);
    return onetime2;
  };
  module2.exports = onetime;
  module2.exports.default = onetime;
  module2.exports.callCount = (function_) => {
    if (!calledFunctions.has(function_)) {
      throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
    }
    return calledFunctions.get(function_);
  };
});

// ../../node_modules/.pnpm/human-signals@2.1.0/node_modules/human-signals/build/src/core.js
var require_core = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.SIGNALS = void 0;
  var SIGNALS = [
    {
      name: "SIGHUP",
      number: 1,
      action: "terminate",
      description: "Terminal closed",
      standard: "posix"
    },
    {
      name: "SIGINT",
      number: 2,
      action: "terminate",
      description: "User interruption with CTRL-C",
      standard: "ansi"
    },
    {
      name: "SIGQUIT",
      number: 3,
      action: "core",
      description: "User interruption with CTRL-\\",
      standard: "posix"
    },
    {
      name: "SIGILL",
      number: 4,
      action: "core",
      description: "Invalid machine instruction",
      standard: "ansi"
    },
    {
      name: "SIGTRAP",
      number: 5,
      action: "core",
      description: "Debugger breakpoint",
      standard: "posix"
    },
    {
      name: "SIGABRT",
      number: 6,
      action: "core",
      description: "Aborted",
      standard: "ansi"
    },
    {
      name: "SIGIOT",
      number: 6,
      action: "core",
      description: "Aborted",
      standard: "bsd"
    },
    {
      name: "SIGBUS",
      number: 7,
      action: "core",
      description: "Bus error due to misaligned, non-existing address or paging error",
      standard: "bsd"
    },
    {
      name: "SIGEMT",
      number: 7,
      action: "terminate",
      description: "Command should be emulated but is not implemented",
      standard: "other"
    },
    {
      name: "SIGFPE",
      number: 8,
      action: "core",
      description: "Floating point arithmetic error",
      standard: "ansi"
    },
    {
      name: "SIGKILL",
      number: 9,
      action: "terminate",
      description: "Forced termination",
      standard: "posix",
      forced: true
    },
    {
      name: "SIGUSR1",
      number: 10,
      action: "terminate",
      description: "Application-specific signal",
      standard: "posix"
    },
    {
      name: "SIGSEGV",
      number: 11,
      action: "core",
      description: "Segmentation fault",
      standard: "ansi"
    },
    {
      name: "SIGUSR2",
      number: 12,
      action: "terminate",
      description: "Application-specific signal",
      standard: "posix"
    },
    {
      name: "SIGPIPE",
      number: 13,
      action: "terminate",
      description: "Broken pipe or socket",
      standard: "posix"
    },
    {
      name: "SIGALRM",
      number: 14,
      action: "terminate",
      description: "Timeout or timer",
      standard: "posix"
    },
    {
      name: "SIGTERM",
      number: 15,
      action: "terminate",
      description: "Termination",
      standard: "ansi"
    },
    {
      name: "SIGSTKFLT",
      number: 16,
      action: "terminate",
      description: "Stack is empty or overflowed",
      standard: "other"
    },
    {
      name: "SIGCHLD",
      number: 17,
      action: "ignore",
      description: "Child process terminated, paused or unpaused",
      standard: "posix"
    },
    {
      name: "SIGCLD",
      number: 17,
      action: "ignore",
      description: "Child process terminated, paused or unpaused",
      standard: "other"
    },
    {
      name: "SIGCONT",
      number: 18,
      action: "unpause",
      description: "Unpaused",
      standard: "posix",
      forced: true
    },
    {
      name: "SIGSTOP",
      number: 19,
      action: "pause",
      description: "Paused",
      standard: "posix",
      forced: true
    },
    {
      name: "SIGTSTP",
      number: 20,
      action: "pause",
      description: 'Paused using CTRL-Z or "suspend"',
      standard: "posix"
    },
    {
      name: "SIGTTIN",
      number: 21,
      action: "pause",
      description: "Background process cannot read terminal input",
      standard: "posix"
    },
    {
      name: "SIGBREAK",
      number: 21,
      action: "terminate",
      description: "User interruption with CTRL-BREAK",
      standard: "other"
    },
    {
      name: "SIGTTOU",
      number: 22,
      action: "pause",
      description: "Background process cannot write to terminal output",
      standard: "posix"
    },
    {
      name: "SIGURG",
      number: 23,
      action: "ignore",
      description: "Socket received out-of-band data",
      standard: "bsd"
    },
    {
      name: "SIGXCPU",
      number: 24,
      action: "core",
      description: "Process timed out",
      standard: "bsd"
    },
    {
      name: "SIGXFSZ",
      number: 25,
      action: "core",
      description: "File too big",
      standard: "bsd"
    },
    {
      name: "SIGVTALRM",
      number: 26,
      action: "terminate",
      description: "Timeout or timer",
      standard: "bsd"
    },
    {
      name: "SIGPROF",
      number: 27,
      action: "terminate",
      description: "Timeout or timer",
      standard: "bsd"
    },
    {
      name: "SIGWINCH",
      number: 28,
      action: "ignore",
      description: "Terminal window size changed",
      standard: "bsd"
    },
    {
      name: "SIGIO",
      number: 29,
      action: "terminate",
      description: "I/O is available",
      standard: "other"
    },
    {
      name: "SIGPOLL",
      number: 29,
      action: "terminate",
      description: "Watched event",
      standard: "other"
    },
    {
      name: "SIGINFO",
      number: 29,
      action: "ignore",
      description: "Request for process information",
      standard: "other"
    },
    {
      name: "SIGPWR",
      number: 30,
      action: "terminate",
      description: "Device running out of power",
      standard: "systemv"
    },
    {
      name: "SIGSYS",
      number: 31,
      action: "core",
      description: "Invalid system call",
      standard: "other"
    },
    {
      name: "SIGUNUSED",
      number: 31,
      action: "terminate",
      description: "Invalid system call",
      standard: "other"
    }
  ];
  exports2.SIGNALS = SIGNALS;
});

// ../../node_modules/.pnpm/human-signals@2.1.0/node_modules/human-signals/build/src/realtime.js
var require_realtime = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.SIGRTMAX = exports2.getRealtimeSignals = void 0;
  var getRealtimeSignals = function() {
    const length = SIGRTMAX - SIGRTMIN + 1;
    return Array.from({length}, getRealtimeSignal);
  };
  exports2.getRealtimeSignals = getRealtimeSignals;
  var getRealtimeSignal = function(value, index) {
    return {
      name: `SIGRT${index + 1}`,
      number: SIGRTMIN + index,
      action: "terminate",
      description: "Application-specific signal (realtime)",
      standard: "posix"
    };
  };
  var SIGRTMIN = 34;
  var SIGRTMAX = 64;
  exports2.SIGRTMAX = SIGRTMAX;
});

// ../../node_modules/.pnpm/human-signals@2.1.0/node_modules/human-signals/build/src/signals.js
var require_signals = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.getSignals = void 0;
  var _os = require("os");
  var _core = require_core();
  var _realtime = require_realtime();
  var getSignals = function() {
    const realtimeSignals = (0, _realtime.getRealtimeSignals)();
    const signals = [..._core.SIGNALS, ...realtimeSignals].map(normalizeSignal);
    return signals;
  };
  exports2.getSignals = getSignals;
  var normalizeSignal = function({
    name,
    number: defaultNumber,
    description,
    action,
    forced = false,
    standard
  }) {
    const {
      signals: {[name]: constantSignal}
    } = _os.constants;
    const supported = constantSignal !== void 0;
    const number = supported ? constantSignal : defaultNumber;
    return {name, number, description, supported, action, forced, standard};
  };
});

// ../../node_modules/.pnpm/human-signals@2.1.0/node_modules/human-signals/build/src/main.js
var require_main = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.signalsByNumber = exports2.signalsByName = void 0;
  var _os = require("os");
  var _signals = require_signals();
  var _realtime = require_realtime();
  var getSignalsByName = function() {
    const signals = (0, _signals.getSignals)();
    return signals.reduce(getSignalByName, {});
  };
  var getSignalByName = function(signalByNameMemo, {name, number, description, supported, action, forced, standard}) {
    return {
      ...signalByNameMemo,
      [name]: {name, number, description, supported, action, forced, standard}
    };
  };
  var signalsByName = getSignalsByName();
  exports2.signalsByName = signalsByName;
  var getSignalsByNumber = function() {
    const signals = (0, _signals.getSignals)();
    const length = _realtime.SIGRTMAX + 1;
    const signalsA = Array.from({length}, (value, number) => getSignalByNumber(number, signals));
    return Object.assign({}, ...signalsA);
  };
  var getSignalByNumber = function(number, signals) {
    const signal = findSignalByNumber(number, signals);
    if (signal === void 0) {
      return {};
    }
    const {name, description, supported, action, forced, standard} = signal;
    return {
      [number]: {
        name,
        number,
        description,
        supported,
        action,
        forced,
        standard
      }
    };
  };
  var findSignalByNumber = function(number, signals) {
    const signal = signals.find(({name}) => _os.constants.signals[name] === number);
    if (signal !== void 0) {
      return signal;
    }
    return signals.find((signalA) => signalA.number === number);
  };
  var signalsByNumber = getSignalsByNumber();
  exports2.signalsByNumber = signalsByNumber;
});

// ../../node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/error.js
var require_error = __commonJS((exports2, module2) => {
  "use strict";
  var {signalsByName} = require_main();
  var getErrorPrefix = ({timedOut, timeout, errorCode, signal, signalDescription, exitCode, isCanceled}) => {
    if (timedOut) {
      return `timed out after ${timeout} milliseconds`;
    }
    if (isCanceled) {
      return "was canceled";
    }
    if (errorCode !== void 0) {
      return `failed with ${errorCode}`;
    }
    if (signal !== void 0) {
      return `was killed with ${signal} (${signalDescription})`;
    }
    if (exitCode !== void 0) {
      return `failed with exit code ${exitCode}`;
    }
    return "failed";
  };
  var makeError = ({
    stdout,
    stderr,
    all,
    error,
    signal,
    exitCode,
    command,
    escapedCommand,
    timedOut,
    isCanceled,
    killed,
    parsed: {options: {timeout}}
  }) => {
    exitCode = exitCode === null ? void 0 : exitCode;
    signal = signal === null ? void 0 : signal;
    const signalDescription = signal === void 0 ? void 0 : signalsByName[signal].description;
    const errorCode = error && error.code;
    const prefix = getErrorPrefix({timedOut, timeout, errorCode, signal, signalDescription, exitCode, isCanceled});
    const execaMessage = `Command ${prefix}: ${command}`;
    const isError = Object.prototype.toString.call(error) === "[object Error]";
    const shortMessage = isError ? `${execaMessage}
${error.message}` : execaMessage;
    const message = [shortMessage, stderr, stdout].filter(Boolean).join("\n");
    if (isError) {
      error.originalMessage = error.message;
      error.message = message;
    } else {
      error = new Error(message);
    }
    error.shortMessage = shortMessage;
    error.command = command;
    error.escapedCommand = escapedCommand;
    error.exitCode = exitCode;
    error.signal = signal;
    error.signalDescription = signalDescription;
    error.stdout = stdout;
    error.stderr = stderr;
    if (all !== void 0) {
      error.all = all;
    }
    if ("bufferedData" in error) {
      delete error.bufferedData;
    }
    error.failed = true;
    error.timedOut = Boolean(timedOut);
    error.isCanceled = isCanceled;
    error.killed = killed && !timedOut;
    return error;
  };
  module2.exports = makeError;
});

// ../../node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/stdio.js
var require_stdio = __commonJS((exports2, module2) => {
  "use strict";
  var aliases = ["stdin", "stdout", "stderr"];
  var hasAlias = (options) => aliases.some((alias) => options[alias] !== void 0);
  var normalizeStdio = (options) => {
    if (!options) {
      return;
    }
    const {stdio} = options;
    if (stdio === void 0) {
      return aliases.map((alias) => options[alias]);
    }
    if (hasAlias(options)) {
      throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${aliases.map((alias) => `\`${alias}\``).join(", ")}`);
    }
    if (typeof stdio === "string") {
      return stdio;
    }
    if (!Array.isArray(stdio)) {
      throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof stdio}\``);
    }
    const length = Math.max(stdio.length, aliases.length);
    return Array.from({length}, (value, index) => stdio[index]);
  };
  module2.exports = normalizeStdio;
  module2.exports.node = (options) => {
    const stdio = normalizeStdio(options);
    if (stdio === "ipc") {
      return "ipc";
    }
    if (stdio === void 0 || typeof stdio === "string") {
      return [stdio, stdio, stdio, "ipc"];
    }
    if (stdio.includes("ipc")) {
      return stdio;
    }
    return [...stdio, "ipc"];
  };
});

// ../../node_modules/.pnpm/signal-exit@3.0.3/node_modules/signal-exit/signals.js
var require_signals2 = __commonJS((exports2, module2) => {
  module2.exports = [
    "SIGABRT",
    "SIGALRM",
    "SIGHUP",
    "SIGINT",
    "SIGTERM"
  ];
  if (process.platform !== "win32") {
    module2.exports.push("SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
  }
  if (process.platform === "linux") {
    module2.exports.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED");
  }
});

// ../../node_modules/.pnpm/signal-exit@3.0.3/node_modules/signal-exit/index.js
var require_signal_exit = __commonJS((exports2, module2) => {
  var assert = require("assert");
  var signals = require_signals2();
  var isWin = /^win/i.test(process.platform);
  var EE = require("events");
  if (typeof EE !== "function") {
    EE = EE.EventEmitter;
  }
  var emitter;
  if (process.__signal_exit_emitter__) {
    emitter = process.__signal_exit_emitter__;
  } else {
    emitter = process.__signal_exit_emitter__ = new EE();
    emitter.count = 0;
    emitter.emitted = {};
  }
  if (!emitter.infinite) {
    emitter.setMaxListeners(Infinity);
    emitter.infinite = true;
  }
  module2.exports = function(cb, opts) {
    assert.equal(typeof cb, "function", "a callback must be provided for exit handler");
    if (loaded === false) {
      load();
    }
    var ev = "exit";
    if (opts && opts.alwaysLast) {
      ev = "afterexit";
    }
    var remove = function() {
      emitter.removeListener(ev, cb);
      if (emitter.listeners("exit").length === 0 && emitter.listeners("afterexit").length === 0) {
        unload();
      }
    };
    emitter.on(ev, cb);
    return remove;
  };
  module2.exports.unload = unload;
  function unload() {
    if (!loaded) {
      return;
    }
    loaded = false;
    signals.forEach(function(sig) {
      try {
        process.removeListener(sig, sigListeners[sig]);
      } catch (er) {
      }
    });
    process.emit = originalProcessEmit;
    process.reallyExit = originalProcessReallyExit;
    emitter.count -= 1;
  }
  function emit(event, code, signal) {
    if (emitter.emitted[event]) {
      return;
    }
    emitter.emitted[event] = true;
    emitter.emit(event, code, signal);
  }
  var sigListeners = {};
  signals.forEach(function(sig) {
    sigListeners[sig] = function listener() {
      var listeners = process.listeners(sig);
      if (listeners.length === emitter.count) {
        unload();
        emit("exit", null, sig);
        emit("afterexit", null, sig);
        if (isWin && sig === "SIGHUP") {
          sig = "SIGINT";
        }
        process.kill(process.pid, sig);
      }
    };
  });
  module2.exports.signals = function() {
    return signals;
  };
  module2.exports.load = load;
  var loaded = false;
  function load() {
    if (loaded) {
      return;
    }
    loaded = true;
    emitter.count += 1;
    signals = signals.filter(function(sig) {
      try {
        process.on(sig, sigListeners[sig]);
        return true;
      } catch (er) {
        return false;
      }
    });
    process.emit = processEmit;
    process.reallyExit = processReallyExit;
  }
  var originalProcessReallyExit = process.reallyExit;
  function processReallyExit(code) {
    process.exitCode = code || 0;
    emit("exit", process.exitCode, null);
    emit("afterexit", process.exitCode, null);
    originalProcessReallyExit.call(process, process.exitCode);
  }
  var originalProcessEmit = process.emit;
  function processEmit(ev, arg) {
    if (ev === "exit") {
      if (arg !== void 0) {
        process.exitCode = arg;
      }
      var ret = originalProcessEmit.apply(this, arguments);
      emit("exit", process.exitCode, null);
      emit("afterexit", process.exitCode, null);
      return ret;
    } else {
      return originalProcessEmit.apply(this, arguments);
    }
  }
});

// ../../node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/kill.js
var require_kill = __commonJS((exports2, module2) => {
  "use strict";
  var os = require("os");
  var onExit = require_signal_exit();
  var DEFAULT_FORCE_KILL_TIMEOUT = 1e3 * 5;
  var spawnedKill = (kill, signal = "SIGTERM", options = {}) => {
    const killResult = kill(signal);
    setKillTimeout(kill, signal, options, killResult);
    return killResult;
  };
  var setKillTimeout = (kill, signal, options, killResult) => {
    if (!shouldForceKill(signal, options, killResult)) {
      return;
    }
    const timeout = getForceKillAfterTimeout(options);
    const t = setTimeout(() => {
      kill("SIGKILL");
    }, timeout);
    if (t.unref) {
      t.unref();
    }
  };
  var shouldForceKill = (signal, {forceKillAfterTimeout}, killResult) => {
    return isSigterm(signal) && forceKillAfterTimeout !== false && killResult;
  };
  var isSigterm = (signal) => {
    return signal === os.constants.signals.SIGTERM || typeof signal === "string" && signal.toUpperCase() === "SIGTERM";
  };
  var getForceKillAfterTimeout = ({forceKillAfterTimeout = true}) => {
    if (forceKillAfterTimeout === true) {
      return DEFAULT_FORCE_KILL_TIMEOUT;
    }
    if (!Number.isFinite(forceKillAfterTimeout) || forceKillAfterTimeout < 0) {
      throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${forceKillAfterTimeout}\` (${typeof forceKillAfterTimeout})`);
    }
    return forceKillAfterTimeout;
  };
  var spawnedCancel = (spawned, context) => {
    const killResult = spawned.kill();
    if (killResult) {
      context.isCanceled = true;
    }
  };
  var timeoutKill = (spawned, signal, reject) => {
    spawned.kill(signal);
    reject(Object.assign(new Error("Timed out"), {timedOut: true, signal}));
  };
  var setupTimeout = (spawned, {timeout, killSignal = "SIGTERM"}, spawnedPromise) => {
    if (timeout === 0 || timeout === void 0) {
      return spawnedPromise;
    }
    let timeoutId;
    const timeoutPromise = new Promise((resolve, reject) => {
      timeoutId = setTimeout(() => {
        timeoutKill(spawned, killSignal, reject);
      }, timeout);
    });
    const safeSpawnedPromise = spawnedPromise.finally(() => {
      clearTimeout(timeoutId);
    });
    return Promise.race([timeoutPromise, safeSpawnedPromise]);
  };
  var validateTimeout = ({timeout}) => {
    if (timeout !== void 0 && (!Number.isFinite(timeout) || timeout < 0)) {
      throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${timeout}\` (${typeof timeout})`);
    }
  };
  var setExitHandler = async (spawned, {cleanup, detached}, timedPromise) => {
    if (!cleanup || detached) {
      return timedPromise;
    }
    const removeExitHandler = onExit(() => {
      spawned.kill();
    });
    return timedPromise.finally(() => {
      removeExitHandler();
    });
  };
  module2.exports = {
    spawnedKill,
    spawnedCancel,
    setupTimeout,
    validateTimeout,
    setExitHandler
  };
});

// ../../node_modules/.pnpm/is-stream@2.0.0/node_modules/is-stream/index.js
var require_is_stream = __commonJS((exports2, module2) => {
  "use strict";
  var isStream = (stream) => stream !== null && typeof stream === "object" && typeof stream.pipe === "function";
  isStream.writable = (stream) => isStream(stream) && stream.writable !== false && typeof stream._write === "function" && typeof stream._writableState === "object";
  isStream.readable = (stream) => isStream(stream) && stream.readable !== false && typeof stream._read === "function" && typeof stream._readableState === "object";
  isStream.duplex = (stream) => isStream.writable(stream) && isStream.readable(stream);
  isStream.transform = (stream) => isStream.duplex(stream) && typeof stream._transform === "function" && typeof stream._transformState === "object";
  module2.exports = isStream;
});

// ../../node_modules/.pnpm/get-stream@6.0.0/node_modules/get-stream/buffer-stream.js
var require_buffer_stream = __commonJS((exports2, module2) => {
  "use strict";
  var {PassThrough: PassThroughStream} = require("stream");
  module2.exports = (options) => {
    options = {...options};
    const {array} = options;
    let {encoding} = options;
    const isBuffer = encoding === "buffer";
    let objectMode = false;
    if (array) {
      objectMode = !(encoding || isBuffer);
    } else {
      encoding = encoding || "utf8";
    }
    if (isBuffer) {
      encoding = null;
    }
    const stream = new PassThroughStream({objectMode});
    if (encoding) {
      stream.setEncoding(encoding);
    }
    let length = 0;
    const chunks = [];
    stream.on("data", (chunk) => {
      chunks.push(chunk);
      if (objectMode) {
        length = chunks.length;
      } else {
        length += chunk.length;
      }
    });
    stream.getBufferedValue = () => {
      if (array) {
        return chunks;
      }
      return isBuffer ? Buffer.concat(chunks, length) : chunks.join("");
    };
    stream.getBufferedLength = () => length;
    return stream;
  };
});

// ../../node_modules/.pnpm/get-stream@6.0.0/node_modules/get-stream/index.js
var require_get_stream = __commonJS((exports2, module2) => {
  "use strict";
  var {constants: BufferConstants} = require("buffer");
  var stream = require("stream");
  var {promisify} = require("util");
  var bufferStream = require_buffer_stream();
  var streamPipelinePromisified = promisify(stream.pipeline);
  var MaxBufferError = class extends Error {
    constructor() {
      super("maxBuffer exceeded");
      this.name = "MaxBufferError";
    }
  };
  async function getStream(inputStream, options) {
    if (!inputStream) {
      throw new Error("Expected a stream");
    }
    options = {
      maxBuffer: Infinity,
      ...options
    };
    const {maxBuffer} = options;
    const stream2 = bufferStream(options);
    await new Promise((resolve, reject) => {
      const rejectPromise = (error) => {
        if (error && stream2.getBufferedLength() <= BufferConstants.MAX_LENGTH) {
          error.bufferedData = stream2.getBufferedValue();
        }
        reject(error);
      };
      (async () => {
        try {
          await streamPipelinePromisified(inputStream, stream2);
          resolve();
        } catch (error) {
          rejectPromise(error);
        }
      })();
      stream2.on("data", () => {
        if (stream2.getBufferedLength() > maxBuffer) {
          rejectPromise(new MaxBufferError());
        }
      });
    });
    return stream2.getBufferedValue();
  }
  module2.exports = getStream;
  module2.exports.buffer = (stream2, options) => getStream(stream2, {...options, encoding: "buffer"});
  module2.exports.array = (stream2, options) => getStream(stream2, {...options, array: true});
  module2.exports.MaxBufferError = MaxBufferError;
});

// ../../node_modules/.pnpm/merge-stream@2.0.0/node_modules/merge-stream/index.js
var require_merge_stream = __commonJS((exports2, module2) => {
  "use strict";
  var {PassThrough} = require("stream");
  module2.exports = function() {
    var sources = [];
    var output = new PassThrough({objectMode: true});
    output.setMaxListeners(0);
    output.add = add;
    output.isEmpty = isEmpty;
    output.on("unpipe", remove);
    Array.prototype.slice.call(arguments).forEach(add);
    return output;
    function add(source) {
      if (Array.isArray(source)) {
        source.forEach(add);
        return this;
      }
      sources.push(source);
      source.once("end", remove.bind(null, source));
      source.once("error", output.emit.bind(output, "error"));
      source.pipe(output, {end: false});
      return this;
    }
    function isEmpty() {
      return sources.length == 0;
    }
    function remove(source) {
      sources = sources.filter(function(it) {
        return it !== source;
      });
      if (!sources.length && output.readable) {
        output.end();
      }
    }
  };
});

// ../../node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/stream.js
var require_stream = __commonJS((exports2, module2) => {
  "use strict";
  var isStream = require_is_stream();
  var getStream = require_get_stream();
  var mergeStream = require_merge_stream();
  var handleInput = (spawned, input) => {
    if (input === void 0 || spawned.stdin === void 0) {
      return;
    }
    if (isStream(input)) {
      input.pipe(spawned.stdin);
    } else {
      spawned.stdin.end(input);
    }
  };
  var makeAllStream = (spawned, {all}) => {
    if (!all || !spawned.stdout && !spawned.stderr) {
      return;
    }
    const mixed = mergeStream();
    if (spawned.stdout) {
      mixed.add(spawned.stdout);
    }
    if (spawned.stderr) {
      mixed.add(spawned.stderr);
    }
    return mixed;
  };
  var getBufferedData = async (stream, streamPromise) => {
    if (!stream) {
      return;
    }
    stream.destroy();
    try {
      return await streamPromise;
    } catch (error) {
      return error.bufferedData;
    }
  };
  var getStreamPromise = (stream, {encoding, buffer, maxBuffer}) => {
    if (!stream || !buffer) {
      return;
    }
    if (encoding) {
      return getStream(stream, {encoding, maxBuffer});
    }
    return getStream.buffer(stream, {maxBuffer});
  };
  var getSpawnedResult = async ({stdout, stderr, all}, {encoding, buffer, maxBuffer}, processDone) => {
    const stdoutPromise = getStreamPromise(stdout, {encoding, buffer, maxBuffer});
    const stderrPromise = getStreamPromise(stderr, {encoding, buffer, maxBuffer});
    const allPromise = getStreamPromise(all, {encoding, buffer, maxBuffer: maxBuffer * 2});
    try {
      return await Promise.all([processDone, stdoutPromise, stderrPromise, allPromise]);
    } catch (error) {
      return Promise.all([
        {error, signal: error.signal, timedOut: error.timedOut},
        getBufferedData(stdout, stdoutPromise),
        getBufferedData(stderr, stderrPromise),
        getBufferedData(all, allPromise)
      ]);
    }
  };
  var validateInputSync = ({input}) => {
    if (isStream(input)) {
      throw new TypeError("The `input` option cannot be a stream in sync mode");
    }
  };
  module2.exports = {
    handleInput,
    makeAllStream,
    getSpawnedResult,
    validateInputSync
  };
});

// ../../node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/promise.js
var require_promise = __commonJS((exports2, module2) => {
  "use strict";
  var nativePromisePrototype = (async () => {
  })().constructor.prototype;
  var descriptors = ["then", "catch", "finally"].map((property) => [
    property,
    Reflect.getOwnPropertyDescriptor(nativePromisePrototype, property)
  ]);
  var mergePromise = (spawned, promise) => {
    for (const [property, descriptor] of descriptors) {
      const value = typeof promise === "function" ? (...args) => Reflect.apply(descriptor.value, promise(), args) : descriptor.value.bind(promise);
      Reflect.defineProperty(spawned, property, {...descriptor, value});
    }
    return spawned;
  };
  var getSpawnedPromise = (spawned) => {
    return new Promise((resolve, reject) => {
      spawned.on("exit", (exitCode, signal) => {
        resolve({exitCode, signal});
      });
      spawned.on("error", (error) => {
        reject(error);
      });
      if (spawned.stdin) {
        spawned.stdin.on("error", (error) => {
          reject(error);
        });
      }
    });
  };
  module2.exports = {
    mergePromise,
    getSpawnedPromise
  };
});

// ../../node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/command.js
var require_command = __commonJS((exports2, module2) => {
  "use strict";
  var normalizeArgs = (file, args = []) => {
    if (!Array.isArray(args)) {
      return [file];
    }
    return [file, ...args];
  };
  var NO_ESCAPE_REGEXP = /^[\w.-]+$/;
  var DOUBLE_QUOTES_REGEXP = /"/g;
  var escapeArg = (arg) => {
    if (typeof arg !== "string" || NO_ESCAPE_REGEXP.test(arg)) {
      return arg;
    }
    return `"${arg.replace(DOUBLE_QUOTES_REGEXP, '\\"')}"`;
  };
  var joinCommand = (file, args) => {
    return normalizeArgs(file, args).join(" ");
  };
  var getEscapedCommand = (file, args) => {
    return normalizeArgs(file, args).map((arg) => escapeArg(arg)).join(" ");
  };
  var SPACES_REGEXP = / +/g;
  var parseCommand = (command) => {
    const tokens = [];
    for (const token of command.trim().split(SPACES_REGEXP)) {
      const previousToken = tokens[tokens.length - 1];
      if (previousToken && previousToken.endsWith("\\")) {
        tokens[tokens.length - 1] = `${previousToken.slice(0, -1)} ${token}`;
      } else {
        tokens.push(token);
      }
    }
    return tokens;
  };
  module2.exports = {
    joinCommand,
    getEscapedCommand,
    parseCommand
  };
});

// ../../node_modules/.pnpm/execa@5.1.1/node_modules/execa/index.js
var require_execa = __commonJS((exports2, module2) => {
  "use strict";
  var path2 = require("path");
  var childProcess = require("child_process");
  var crossSpawn = require_cross_spawn();
  var stripFinalNewline = require_strip_final_newline();
  var npmRunPath = require_npm_run_path();
  var onetime = require_onetime();
  var makeError = require_error();
  var normalizeStdio = require_stdio();
  var {spawnedKill, spawnedCancel, setupTimeout, validateTimeout, setExitHandler} = require_kill();
  var {handleInput, getSpawnedResult, makeAllStream, validateInputSync} = require_stream();
  var {mergePromise, getSpawnedPromise} = require_promise();
  var {joinCommand, parseCommand, getEscapedCommand} = require_command();
  var DEFAULT_MAX_BUFFER = 1e3 * 1e3 * 100;
  var getEnv = ({env: envOption, extendEnv, preferLocal, localDir, execPath}) => {
    const env = extendEnv ? {...process.env, ...envOption} : envOption;
    if (preferLocal) {
      return npmRunPath.env({env, cwd: localDir, execPath});
    }
    return env;
  };
  var handleArguments = (file, args, options = {}) => {
    const parsed = crossSpawn._parse(file, args, options);
    file = parsed.command;
    args = parsed.args;
    options = parsed.options;
    options = {
      maxBuffer: DEFAULT_MAX_BUFFER,
      buffer: true,
      stripFinalNewline: true,
      extendEnv: true,
      preferLocal: false,
      localDir: options.cwd || process.cwd(),
      execPath: process.execPath,
      encoding: "utf8",
      reject: true,
      cleanup: true,
      all: false,
      windowsHide: true,
      ...options
    };
    options.env = getEnv(options);
    options.stdio = normalizeStdio(options);
    if (process.platform === "win32" && path2.basename(file, ".exe") === "cmd") {
      args.unshift("/q");
    }
    return {file, args, options, parsed};
  };
  var handleOutput = (options, value, error) => {
    if (typeof value !== "string" && !Buffer.isBuffer(value)) {
      return error === void 0 ? void 0 : "";
    }
    if (options.stripFinalNewline) {
      return stripFinalNewline(value);
    }
    return value;
  };
  var execa = (file, args, options) => {
    const parsed = handleArguments(file, args, options);
    const command = joinCommand(file, args);
    const escapedCommand = getEscapedCommand(file, args);
    validateTimeout(parsed.options);
    let spawned;
    try {
      spawned = childProcess.spawn(parsed.file, parsed.args, parsed.options);
    } catch (error) {
      const dummySpawned = new childProcess.ChildProcess();
      const errorPromise = Promise.reject(makeError({
        error,
        stdout: "",
        stderr: "",
        all: "",
        command,
        escapedCommand,
        parsed,
        timedOut: false,
        isCanceled: false,
        killed: false
      }));
      return mergePromise(dummySpawned, errorPromise);
    }
    const spawnedPromise = getSpawnedPromise(spawned);
    const timedPromise = setupTimeout(spawned, parsed.options, spawnedPromise);
    const processDone = setExitHandler(spawned, parsed.options, timedPromise);
    const context = {isCanceled: false};
    spawned.kill = spawnedKill.bind(null, spawned.kill.bind(spawned));
    spawned.cancel = spawnedCancel.bind(null, spawned, context);
    const handlePromise = async () => {
      const [{error, exitCode, signal, timedOut}, stdoutResult, stderrResult, allResult] = await getSpawnedResult(spawned, parsed.options, processDone);
      const stdout = handleOutput(parsed.options, stdoutResult);
      const stderr = handleOutput(parsed.options, stderrResult);
      const all = handleOutput(parsed.options, allResult);
      if (error || exitCode !== 0 || signal !== null) {
        const returnedError = makeError({
          error,
          exitCode,
          signal,
          stdout,
          stderr,
          all,
          command,
          escapedCommand,
          parsed,
          timedOut,
          isCanceled: context.isCanceled,
          killed: spawned.killed
        });
        if (!parsed.options.reject) {
          return returnedError;
        }
        throw returnedError;
      }
      return {
        command,
        escapedCommand,
        exitCode: 0,
        stdout,
        stderr,
        all,
        failed: false,
        timedOut: false,
        isCanceled: false,
        killed: false
      };
    };
    const handlePromiseOnce = onetime(handlePromise);
    handleInput(spawned, parsed.options.input);
    spawned.all = makeAllStream(spawned, parsed.options);
    return mergePromise(spawned, handlePromiseOnce);
  };
  module2.exports = execa;
  module2.exports.sync = (file, args, options) => {
    const parsed = handleArguments(file, args, options);
    const command = joinCommand(file, args);
    const escapedCommand = getEscapedCommand(file, args);
    validateInputSync(parsed.options);
    let result;
    try {
      result = childProcess.spawnSync(parsed.file, parsed.args, parsed.options);
    } catch (error) {
      throw makeError({
        error,
        stdout: "",
        stderr: "",
        all: "",
        command,
        escapedCommand,
        parsed,
        timedOut: false,
        isCanceled: false,
        killed: false
      });
    }
    const stdout = handleOutput(parsed.options, result.stdout, result.error);
    const stderr = handleOutput(parsed.options, result.stderr, result.error);
    if (result.error || result.status !== 0 || result.signal !== null) {
      const error = makeError({
        stdout,
        stderr,
        error: result.error,
        signal: result.signal,
        exitCode: result.status,
        command,
        escapedCommand,
        parsed,
        timedOut: result.error && result.error.code === "ETIMEDOUT",
        isCanceled: false,
        killed: result.signal !== null
      });
      if (!parsed.options.reject) {
        return error;
      }
      throw error;
    }
    return {
      command,
      escapedCommand,
      exitCode: 0,
      stdout,
      stderr,
      failed: false,
      timedOut: false,
      isCanceled: false,
      killed: false
    };
  };
  module2.exports.command = (command, options) => {
    const [file, ...args] = parseCommand(command);
    return execa(file, args, options);
  };
  module2.exports.commandSync = (command, options) => {
    const [file, ...args] = parseCommand(command);
    return execa.sync(file, args, options);
  };
  module2.exports.node = (scriptPath, args, options = {}) => {
    if (args && !Array.isArray(args) && typeof args === "object") {
      options = args;
      args = [];
    }
    const stdio = normalizeStdio.node(options);
    const defaultExecArgv = process.execArgv.filter((arg) => !arg.startsWith("--inspect"));
    const {
      nodePath = process.execPath,
      nodeOptions = defaultExecArgv
    } = options;
    return execa(nodePath, [
      ...nodeOptions,
      scriptPath,
      ...Array.isArray(args) ? args : []
    ], {
      ...options,
      stdin: void 0,
      stdout: void 0,
      stderr: void 0,
      stdio,
      shell: false
    });
  };
});

// ../../node_modules/.pnpm/semver@6.3.0/node_modules/semver/semver.js
var require_semver = __commonJS((exports2, module2) => {
  exports2 = module2.exports = SemVer;
  var debug3;
  if (typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
    debug3 = function() {
      var args = Array.prototype.slice.call(arguments, 0);
      args.unshift("SEMVER");
      console.log.apply(console, args);
    };
  } else {
    debug3 = function() {
    };
  }
  exports2.SEMVER_SPEC_VERSION = "2.0.0";
  var MAX_LENGTH = 256;
  var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
  var MAX_SAFE_COMPONENT_LENGTH = 16;
  var re = exports2.re = [];
  var src = exports2.src = [];
  var t = exports2.tokens = {};
  var R = 0;
  function tok(n) {
    t[n] = R++;
  }
  tok("NUMERICIDENTIFIER");
  src[t.NUMERICIDENTIFIER] = "0|[1-9]\\d*";
  tok("NUMERICIDENTIFIERLOOSE");
  src[t.NUMERICIDENTIFIERLOOSE] = "[0-9]+";
  tok("NONNUMERICIDENTIFIER");
  src[t.NONNUMERICIDENTIFIER] = "\\d*[a-zA-Z-][a-zA-Z0-9-]*";
  tok("MAINVERSION");
  src[t.MAINVERSION] = "(" + src[t.NUMERICIDENTIFIER] + ")\\.(" + src[t.NUMERICIDENTIFIER] + ")\\.(" + src[t.NUMERICIDENTIFIER] + ")";
  tok("MAINVERSIONLOOSE");
  src[t.MAINVERSIONLOOSE] = "(" + src[t.NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[t.NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[t.NUMERICIDENTIFIERLOOSE] + ")";
  tok("PRERELEASEIDENTIFIER");
  src[t.PRERELEASEIDENTIFIER] = "(?:" + src[t.NUMERICIDENTIFIER] + "|" + src[t.NONNUMERICIDENTIFIER] + ")";
  tok("PRERELEASEIDENTIFIERLOOSE");
  src[t.PRERELEASEIDENTIFIERLOOSE] = "(?:" + src[t.NUMERICIDENTIFIERLOOSE] + "|" + src[t.NONNUMERICIDENTIFIER] + ")";
  tok("PRERELEASE");
  src[t.PRERELEASE] = "(?:-(" + src[t.PRERELEASEIDENTIFIER] + "(?:\\." + src[t.PRERELEASEIDENTIFIER] + ")*))";
  tok("PRERELEASELOOSE");
  src[t.PRERELEASELOOSE] = "(?:-?(" + src[t.PRERELEASEIDENTIFIERLOOSE] + "(?:\\." + src[t.PRERELEASEIDENTIFIERLOOSE] + ")*))";
  tok("BUILDIDENTIFIER");
  src[t.BUILDIDENTIFIER] = "[0-9A-Za-z-]+";
  tok("BUILD");
  src[t.BUILD] = "(?:\\+(" + src[t.BUILDIDENTIFIER] + "(?:\\." + src[t.BUILDIDENTIFIER] + ")*))";
  tok("FULL");
  tok("FULLPLAIN");
  src[t.FULLPLAIN] = "v?" + src[t.MAINVERSION] + src[t.PRERELEASE] + "?" + src[t.BUILD] + "?";
  src[t.FULL] = "^" + src[t.FULLPLAIN] + "$";
  tok("LOOSEPLAIN");
  src[t.LOOSEPLAIN] = "[v=\\s]*" + src[t.MAINVERSIONLOOSE] + src[t.PRERELEASELOOSE] + "?" + src[t.BUILD] + "?";
  tok("LOOSE");
  src[t.LOOSE] = "^" + src[t.LOOSEPLAIN] + "$";
  tok("GTLT");
  src[t.GTLT] = "((?:<|>)?=?)";
  tok("XRANGEIDENTIFIERLOOSE");
  src[t.XRANGEIDENTIFIERLOOSE] = src[t.NUMERICIDENTIFIERLOOSE] + "|x|X|\\*";
  tok("XRANGEIDENTIFIER");
  src[t.XRANGEIDENTIFIER] = src[t.NUMERICIDENTIFIER] + "|x|X|\\*";
  tok("XRANGEPLAIN");
  src[t.XRANGEPLAIN] = "[v=\\s]*(" + src[t.XRANGEIDENTIFIER] + ")(?:\\.(" + src[t.XRANGEIDENTIFIER] + ")(?:\\.(" + src[t.XRANGEIDENTIFIER] + ")(?:" + src[t.PRERELEASE] + ")?" + src[t.BUILD] + "?)?)?";
  tok("XRANGEPLAINLOOSE");
  src[t.XRANGEPLAINLOOSE] = "[v=\\s]*(" + src[t.XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[t.XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[t.XRANGEIDENTIFIERLOOSE] + ")(?:" + src[t.PRERELEASELOOSE] + ")?" + src[t.BUILD] + "?)?)?";
  tok("XRANGE");
  src[t.XRANGE] = "^" + src[t.GTLT] + "\\s*" + src[t.XRANGEPLAIN] + "$";
  tok("XRANGELOOSE");
  src[t.XRANGELOOSE] = "^" + src[t.GTLT] + "\\s*" + src[t.XRANGEPLAINLOOSE] + "$";
  tok("COERCE");
  src[t.COERCE] = "(^|[^\\d])(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "})(?:\\.(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "}))?(?:\\.(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "}))?(?:$|[^\\d])";
  tok("COERCERTL");
  re[t.COERCERTL] = new RegExp(src[t.COERCE], "g");
  tok("LONETILDE");
  src[t.LONETILDE] = "(?:~>?)";
  tok("TILDETRIM");
  src[t.TILDETRIM] = "(\\s*)" + src[t.LONETILDE] + "\\s+";
  re[t.TILDETRIM] = new RegExp(src[t.TILDETRIM], "g");
  var tildeTrimReplace = "$1~";
  tok("TILDE");
  src[t.TILDE] = "^" + src[t.LONETILDE] + src[t.XRANGEPLAIN] + "$";
  tok("TILDELOOSE");
  src[t.TILDELOOSE] = "^" + src[t.LONETILDE] + src[t.XRANGEPLAINLOOSE] + "$";
  tok("LONECARET");
  src[t.LONECARET] = "(?:\\^)";
  tok("CARETTRIM");
  src[t.CARETTRIM] = "(\\s*)" + src[t.LONECARET] + "\\s+";
  re[t.CARETTRIM] = new RegExp(src[t.CARETTRIM], "g");
  var caretTrimReplace = "$1^";
  tok("CARET");
  src[t.CARET] = "^" + src[t.LONECARET] + src[t.XRANGEPLAIN] + "$";
  tok("CARETLOOSE");
  src[t.CARETLOOSE] = "^" + src[t.LONECARET] + src[t.XRANGEPLAINLOOSE] + "$";
  tok("COMPARATORLOOSE");
  src[t.COMPARATORLOOSE] = "^" + src[t.GTLT] + "\\s*(" + src[t.LOOSEPLAIN] + ")$|^$";
  tok("COMPARATOR");
  src[t.COMPARATOR] = "^" + src[t.GTLT] + "\\s*(" + src[t.FULLPLAIN] + ")$|^$";
  tok("COMPARATORTRIM");
  src[t.COMPARATORTRIM] = "(\\s*)" + src[t.GTLT] + "\\s*(" + src[t.LOOSEPLAIN] + "|" + src[t.XRANGEPLAIN] + ")";
  re[t.COMPARATORTRIM] = new RegExp(src[t.COMPARATORTRIM], "g");
  var comparatorTrimReplace = "$1$2$3";
  tok("HYPHENRANGE");
  src[t.HYPHENRANGE] = "^\\s*(" + src[t.XRANGEPLAIN] + ")\\s+-\\s+(" + src[t.XRANGEPLAIN] + ")\\s*$";
  tok("HYPHENRANGELOOSE");
  src[t.HYPHENRANGELOOSE] = "^\\s*(" + src[t.XRANGEPLAINLOOSE] + ")\\s+-\\s+(" + src[t.XRANGEPLAINLOOSE] + ")\\s*$";
  tok("STAR");
  src[t.STAR] = "(<|>)?=?\\s*\\*";
  for (var i = 0; i < R; i++) {
    debug3(i, src[i]);
    if (!re[i]) {
      re[i] = new RegExp(src[i]);
    }
  }
  exports2.parse = parse;
  function parse(version, options) {
    if (!options || typeof options !== "object") {
      options = {
        loose: !!options,
        includePrerelease: false
      };
    }
    if (version instanceof SemVer) {
      return version;
    }
    if (typeof version !== "string") {
      return null;
    }
    if (version.length > MAX_LENGTH) {
      return null;
    }
    var r = options.loose ? re[t.LOOSE] : re[t.FULL];
    if (!r.test(version)) {
      return null;
    }
    try {
      return new SemVer(version, options);
    } catch (er) {
      return null;
    }
  }
  exports2.valid = valid;
  function valid(version, options) {
    var v = parse(version, options);
    return v ? v.version : null;
  }
  exports2.clean = clean;
  function clean(version, options) {
    var s = parse(version.trim().replace(/^[=v]+/, ""), options);
    return s ? s.version : null;
  }
  exports2.SemVer = SemVer;
  function SemVer(version, options) {
    if (!options || typeof options !== "object") {
      options = {
        loose: !!options,
        includePrerelease: false
      };
    }
    if (version instanceof SemVer) {
      if (version.loose === options.loose) {
        return version;
      } else {
        version = version.version;
      }
    } else if (typeof version !== "string") {
      throw new TypeError("Invalid Version: " + version);
    }
    if (version.length > MAX_LENGTH) {
      throw new TypeError("version is longer than " + MAX_LENGTH + " characters");
    }
    if (!(this instanceof SemVer)) {
      return new SemVer(version, options);
    }
    debug3("SemVer", version, options);
    this.options = options;
    this.loose = !!options.loose;
    var m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
    if (!m) {
      throw new TypeError("Invalid Version: " + version);
    }
    this.raw = version;
    this.major = +m[1];
    this.minor = +m[2];
    this.patch = +m[3];
    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
      throw new TypeError("Invalid major version");
    }
    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
      throw new TypeError("Invalid minor version");
    }
    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
      throw new TypeError("Invalid patch version");
    }
    if (!m[4]) {
      this.prerelease = [];
    } else {
      this.prerelease = m[4].split(".").map(function(id) {
        if (/^[0-9]+$/.test(id)) {
          var num = +id;
          if (num >= 0 && num < MAX_SAFE_INTEGER) {
            return num;
          }
        }
        return id;
      });
    }
    this.build = m[5] ? m[5].split(".") : [];
    this.format();
  }
  SemVer.prototype.format = function() {
    this.version = this.major + "." + this.minor + "." + this.patch;
    if (this.prerelease.length) {
      this.version += "-" + this.prerelease.join(".");
    }
    return this.version;
  };
  SemVer.prototype.toString = function() {
    return this.version;
  };
  SemVer.prototype.compare = function(other) {
    debug3("SemVer.compare", this.version, this.options, other);
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    return this.compareMain(other) || this.comparePre(other);
  };
  SemVer.prototype.compareMain = function(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
  };
  SemVer.prototype.comparePre = function(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    if (this.prerelease.length && !other.prerelease.length) {
      return -1;
    } else if (!this.prerelease.length && other.prerelease.length) {
      return 1;
    } else if (!this.prerelease.length && !other.prerelease.length) {
      return 0;
    }
    var i2 = 0;
    do {
      var a = this.prerelease[i2];
      var b = other.prerelease[i2];
      debug3("prerelease compare", i2, a, b);
      if (a === void 0 && b === void 0) {
        return 0;
      } else if (b === void 0) {
        return 1;
      } else if (a === void 0) {
        return -1;
      } else if (a === b) {
        continue;
      } else {
        return compareIdentifiers(a, b);
      }
    } while (++i2);
  };
  SemVer.prototype.compareBuild = function(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    var i2 = 0;
    do {
      var a = this.build[i2];
      var b = other.build[i2];
      debug3("prerelease compare", i2, a, b);
      if (a === void 0 && b === void 0) {
        return 0;
      } else if (b === void 0) {
        return 1;
      } else if (a === void 0) {
        return -1;
      } else if (a === b) {
        continue;
      } else {
        return compareIdentifiers(a, b);
      }
    } while (++i2);
  };
  SemVer.prototype.inc = function(release, identifier) {
    switch (release) {
      case "premajor":
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor = 0;
        this.major++;
        this.inc("pre", identifier);
        break;
      case "preminor":
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor++;
        this.inc("pre", identifier);
        break;
      case "prepatch":
        this.prerelease.length = 0;
        this.inc("patch", identifier);
        this.inc("pre", identifier);
        break;
      case "prerelease":
        if (this.prerelease.length === 0) {
          this.inc("patch", identifier);
        }
        this.inc("pre", identifier);
        break;
      case "major":
        if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
          this.major++;
        }
        this.minor = 0;
        this.patch = 0;
        this.prerelease = [];
        break;
      case "minor":
        if (this.patch !== 0 || this.prerelease.length === 0) {
          this.minor++;
        }
        this.patch = 0;
        this.prerelease = [];
        break;
      case "patch":
        if (this.prerelease.length === 0) {
          this.patch++;
        }
        this.prerelease = [];
        break;
      case "pre":
        if (this.prerelease.length === 0) {
          this.prerelease = [0];
        } else {
          var i2 = this.prerelease.length;
          while (--i2 >= 0) {
            if (typeof this.prerelease[i2] === "number") {
              this.prerelease[i2]++;
              i2 = -2;
            }
          }
          if (i2 === -1) {
            this.prerelease.push(0);
          }
        }
        if (identifier) {
          if (this.prerelease[0] === identifier) {
            if (isNaN(this.prerelease[1])) {
              this.prerelease = [identifier, 0];
            }
          } else {
            this.prerelease = [identifier, 0];
          }
        }
        break;
      default:
        throw new Error("invalid increment argument: " + release);
    }
    this.format();
    this.raw = this.version;
    return this;
  };
  exports2.inc = inc;
  function inc(version, release, loose, identifier) {
    if (typeof loose === "string") {
      identifier = loose;
      loose = void 0;
    }
    try {
      return new SemVer(version, loose).inc(release, identifier).version;
    } catch (er) {
      return null;
    }
  }
  exports2.diff = diff;
  function diff(version1, version2) {
    if (eq(version1, version2)) {
      return null;
    } else {
      var v1 = parse(version1);
      var v2 = parse(version2);
      var prefix = "";
      if (v1.prerelease.length || v2.prerelease.length) {
        prefix = "pre";
        var defaultResult = "prerelease";
      }
      for (var key in v1) {
        if (key === "major" || key === "minor" || key === "patch") {
          if (v1[key] !== v2[key]) {
            return prefix + key;
          }
        }
      }
      return defaultResult;
    }
  }
  exports2.compareIdentifiers = compareIdentifiers;
  var numeric = /^[0-9]+$/;
  function compareIdentifiers(a, b) {
    var anum = numeric.test(a);
    var bnum = numeric.test(b);
    if (anum && bnum) {
      a = +a;
      b = +b;
    }
    return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
  }
  exports2.rcompareIdentifiers = rcompareIdentifiers;
  function rcompareIdentifiers(a, b) {
    return compareIdentifiers(b, a);
  }
  exports2.major = major;
  function major(a, loose) {
    return new SemVer(a, loose).major;
  }
  exports2.minor = minor;
  function minor(a, loose) {
    return new SemVer(a, loose).minor;
  }
  exports2.patch = patch;
  function patch(a, loose) {
    return new SemVer(a, loose).patch;
  }
  exports2.compare = compare;
  function compare(a, b, loose) {
    return new SemVer(a, loose).compare(new SemVer(b, loose));
  }
  exports2.compareLoose = compareLoose;
  function compareLoose(a, b) {
    return compare(a, b, true);
  }
  exports2.compareBuild = compareBuild;
  function compareBuild(a, b, loose) {
    var versionA = new SemVer(a, loose);
    var versionB = new SemVer(b, loose);
    return versionA.compare(versionB) || versionA.compareBuild(versionB);
  }
  exports2.rcompare = rcompare;
  function rcompare(a, b, loose) {
    return compare(b, a, loose);
  }
  exports2.sort = sort;
  function sort(list, loose) {
    return list.sort(function(a, b) {
      return exports2.compareBuild(a, b, loose);
    });
  }
  exports2.rsort = rsort;
  function rsort(list, loose) {
    return list.sort(function(a, b) {
      return exports2.compareBuild(b, a, loose);
    });
  }
  exports2.gt = gt;
  function gt(a, b, loose) {
    return compare(a, b, loose) > 0;
  }
  exports2.lt = lt;
  function lt(a, b, loose) {
    return compare(a, b, loose) < 0;
  }
  exports2.eq = eq;
  function eq(a, b, loose) {
    return compare(a, b, loose) === 0;
  }
  exports2.neq = neq;
  function neq(a, b, loose) {
    return compare(a, b, loose) !== 0;
  }
  exports2.gte = gte;
  function gte(a, b, loose) {
    return compare(a, b, loose) >= 0;
  }
  exports2.lte = lte;
  function lte(a, b, loose) {
    return compare(a, b, loose) <= 0;
  }
  exports2.cmp = cmp;
  function cmp(a, op, b, loose) {
    switch (op) {
      case "===":
        if (typeof a === "object")
          a = a.version;
        if (typeof b === "object")
          b = b.version;
        return a === b;
      case "!==":
        if (typeof a === "object")
          a = a.version;
        if (typeof b === "object")
          b = b.version;
        return a !== b;
      case "":
      case "=":
      case "==":
        return eq(a, b, loose);
      case "!=":
        return neq(a, b, loose);
      case ">":
        return gt(a, b, loose);
      case ">=":
        return gte(a, b, loose);
      case "<":
        return lt(a, b, loose);
      case "<=":
        return lte(a, b, loose);
      default:
        throw new TypeError("Invalid operator: " + op);
    }
  }
  exports2.Comparator = Comparator;
  function Comparator(comp, options) {
    if (!options || typeof options !== "object") {
      options = {
        loose: !!options,
        includePrerelease: false
      };
    }
    if (comp instanceof Comparator) {
      if (comp.loose === !!options.loose) {
        return comp;
      } else {
        comp = comp.value;
      }
    }
    if (!(this instanceof Comparator)) {
      return new Comparator(comp, options);
    }
    debug3("comparator", comp, options);
    this.options = options;
    this.loose = !!options.loose;
    this.parse(comp);
    if (this.semver === ANY) {
      this.value = "";
    } else {
      this.value = this.operator + this.semver.version;
    }
    debug3("comp", this);
  }
  var ANY = {};
  Comparator.prototype.parse = function(comp) {
    var r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
    var m = comp.match(r);
    if (!m) {
      throw new TypeError("Invalid comparator: " + comp);
    }
    this.operator = m[1] !== void 0 ? m[1] : "";
    if (this.operator === "=") {
      this.operator = "";
    }
    if (!m[2]) {
      this.semver = ANY;
    } else {
      this.semver = new SemVer(m[2], this.options.loose);
    }
  };
  Comparator.prototype.toString = function() {
    return this.value;
  };
  Comparator.prototype.test = function(version) {
    debug3("Comparator.test", version, this.options.loose);
    if (this.semver === ANY || version === ANY) {
      return true;
    }
    if (typeof version === "string") {
      try {
        version = new SemVer(version, this.options);
      } catch (er) {
        return false;
      }
    }
    return cmp(version, this.operator, this.semver, this.options);
  };
  Comparator.prototype.intersects = function(comp, options) {
    if (!(comp instanceof Comparator)) {
      throw new TypeError("a Comparator is required");
    }
    if (!options || typeof options !== "object") {
      options = {
        loose: !!options,
        includePrerelease: false
      };
    }
    var rangeTmp;
    if (this.operator === "") {
      if (this.value === "") {
        return true;
      }
      rangeTmp = new Range(comp.value, options);
      return satisfies(this.value, rangeTmp, options);
    } else if (comp.operator === "") {
      if (comp.value === "") {
        return true;
      }
      rangeTmp = new Range(this.value, options);
      return satisfies(comp.semver, rangeTmp, options);
    }
    var sameDirectionIncreasing = (this.operator === ">=" || this.operator === ">") && (comp.operator === ">=" || comp.operator === ">");
    var sameDirectionDecreasing = (this.operator === "<=" || this.operator === "<") && (comp.operator === "<=" || comp.operator === "<");
    var sameSemVer = this.semver.version === comp.semver.version;
    var differentDirectionsInclusive = (this.operator === ">=" || this.operator === "<=") && (comp.operator === ">=" || comp.operator === "<=");
    var oppositeDirectionsLessThan = cmp(this.semver, "<", comp.semver, options) && ((this.operator === ">=" || this.operator === ">") && (comp.operator === "<=" || comp.operator === "<"));
    var oppositeDirectionsGreaterThan = cmp(this.semver, ">", comp.semver, options) && ((this.operator === "<=" || this.operator === "<") && (comp.operator === ">=" || comp.operator === ">"));
    return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
  };
  exports2.Range = Range;
  function Range(range, options) {
    if (!options || typeof options !== "object") {
      options = {
        loose: !!options,
        includePrerelease: false
      };
    }
    if (range instanceof Range) {
      if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
        return range;
      } else {
        return new Range(range.raw, options);
      }
    }
    if (range instanceof Comparator) {
      return new Range(range.value, options);
    }
    if (!(this instanceof Range)) {
      return new Range(range, options);
    }
    this.options = options;
    this.loose = !!options.loose;
    this.includePrerelease = !!options.includePrerelease;
    this.raw = range;
    this.set = range.split(/\s*\|\|\s*/).map(function(range2) {
      return this.parseRange(range2.trim());
    }, this).filter(function(c) {
      return c.length;
    });
    if (!this.set.length) {
      throw new TypeError("Invalid SemVer Range: " + range);
    }
    this.format();
  }
  Range.prototype.format = function() {
    this.range = this.set.map(function(comps) {
      return comps.join(" ").trim();
    }).join("||").trim();
    return this.range;
  };
  Range.prototype.toString = function() {
    return this.range;
  };
  Range.prototype.parseRange = function(range) {
    var loose = this.options.loose;
    range = range.trim();
    var hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
    range = range.replace(hr, hyphenReplace);
    debug3("hyphen replace", range);
    range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
    debug3("comparator trim", range, re[t.COMPARATORTRIM]);
    range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
    range = range.replace(re[t.CARETTRIM], caretTrimReplace);
    range = range.split(/\s+/).join(" ");
    var compRe = loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
    var set = range.split(" ").map(function(comp) {
      return parseComparator(comp, this.options);
    }, this).join(" ").split(/\s+/);
    if (this.options.loose) {
      set = set.filter(function(comp) {
        return !!comp.match(compRe);
      });
    }
    set = set.map(function(comp) {
      return new Comparator(comp, this.options);
    }, this);
    return set;
  };
  Range.prototype.intersects = function(range, options) {
    if (!(range instanceof Range)) {
      throw new TypeError("a Range is required");
    }
    return this.set.some(function(thisComparators) {
      return isSatisfiable(thisComparators, options) && range.set.some(function(rangeComparators) {
        return isSatisfiable(rangeComparators, options) && thisComparators.every(function(thisComparator) {
          return rangeComparators.every(function(rangeComparator) {
            return thisComparator.intersects(rangeComparator, options);
          });
        });
      });
    });
  };
  function isSatisfiable(comparators, options) {
    var result = true;
    var remainingComparators = comparators.slice();
    var testComparator = remainingComparators.pop();
    while (result && remainingComparators.length) {
      result = remainingComparators.every(function(otherComparator) {
        return testComparator.intersects(otherComparator, options);
      });
      testComparator = remainingComparators.pop();
    }
    return result;
  }
  exports2.toComparators = toComparators;
  function toComparators(range, options) {
    return new Range(range, options).set.map(function(comp) {
      return comp.map(function(c) {
        return c.value;
      }).join(" ").trim().split(" ");
    });
  }
  function parseComparator(comp, options) {
    debug3("comp", comp, options);
    comp = replaceCarets(comp, options);
    debug3("caret", comp);
    comp = replaceTildes(comp, options);
    debug3("tildes", comp);
    comp = replaceXRanges(comp, options);
    debug3("xrange", comp);
    comp = replaceStars(comp, options);
    debug3("stars", comp);
    return comp;
  }
  function isX(id) {
    return !id || id.toLowerCase() === "x" || id === "*";
  }
  function replaceTildes(comp, options) {
    return comp.trim().split(/\s+/).map(function(comp2) {
      return replaceTilde(comp2, options);
    }).join(" ");
  }
  function replaceTilde(comp, options) {
    var r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
    return comp.replace(r, function(_, M, m, p, pr) {
      debug3("tilde", comp, _, M, m, p, pr);
      var ret;
      if (isX(M)) {
        ret = "";
      } else if (isX(m)) {
        ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
      } else if (isX(p)) {
        ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
      } else if (pr) {
        debug3("replaceTilde pr", pr);
        ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0";
      } else {
        ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
      }
      debug3("tilde return", ret);
      return ret;
    });
  }
  function replaceCarets(comp, options) {
    return comp.trim().split(/\s+/).map(function(comp2) {
      return replaceCaret(comp2, options);
    }).join(" ");
  }
  function replaceCaret(comp, options) {
    debug3("caret", comp, options);
    var r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
    return comp.replace(r, function(_, M, m, p, pr) {
      debug3("caret", comp, _, M, m, p, pr);
      var ret;
      if (isX(M)) {
        ret = "";
      } else if (isX(m)) {
        ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
      } else if (isX(p)) {
        if (M === "0") {
          ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
        } else {
          ret = ">=" + M + "." + m + ".0 <" + (+M + 1) + ".0.0";
        }
      } else if (pr) {
        debug3("replaceCaret pr", pr);
        if (M === "0") {
          if (m === "0") {
            ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + m + "." + (+p + 1);
          } else {
            ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0";
          }
        } else {
          ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + (+M + 1) + ".0.0";
        }
      } else {
        debug3("no pr");
        if (M === "0") {
          if (m === "0") {
            ret = ">=" + M + "." + m + "." + p + " <" + M + "." + m + "." + (+p + 1);
          } else {
            ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
          }
        } else {
          ret = ">=" + M + "." + m + "." + p + " <" + (+M + 1) + ".0.0";
        }
      }
      debug3("caret return", ret);
      return ret;
    });
  }
  function replaceXRanges(comp, options) {
    debug3("replaceXRanges", comp, options);
    return comp.split(/\s+/).map(function(comp2) {
      return replaceXRange(comp2, options);
    }).join(" ");
  }
  function replaceXRange(comp, options) {
    comp = comp.trim();
    var r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
    return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
      debug3("xRange", comp, ret, gtlt, M, m, p, pr);
      var xM = isX(M);
      var xm = xM || isX(m);
      var xp = xm || isX(p);
      var anyX = xp;
      if (gtlt === "=" && anyX) {
        gtlt = "";
      }
      pr = options.includePrerelease ? "-0" : "";
      if (xM) {
        if (gtlt === ">" || gtlt === "<") {
          ret = "<0.0.0-0";
        } else {
          ret = "*";
        }
      } else if (gtlt && anyX) {
        if (xm) {
          m = 0;
        }
        p = 0;
        if (gtlt === ">") {
          gtlt = ">=";
          if (xm) {
            M = +M + 1;
            m = 0;
            p = 0;
          } else {
            m = +m + 1;
            p = 0;
          }
        } else if (gtlt === "<=") {
          gtlt = "<";
          if (xm) {
            M = +M + 1;
          } else {
            m = +m + 1;
          }
        }
        ret = gtlt + M + "." + m + "." + p + pr;
      } else if (xm) {
        ret = ">=" + M + ".0.0" + pr + " <" + (+M + 1) + ".0.0" + pr;
      } else if (xp) {
        ret = ">=" + M + "." + m + ".0" + pr + " <" + M + "." + (+m + 1) + ".0" + pr;
      }
      debug3("xRange return", ret);
      return ret;
    });
  }
  function replaceStars(comp, options) {
    debug3("replaceStars", comp, options);
    return comp.trim().replace(re[t.STAR], "");
  }
  function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {
    if (isX(fM)) {
      from = "";
    } else if (isX(fm)) {
      from = ">=" + fM + ".0.0";
    } else if (isX(fp)) {
      from = ">=" + fM + "." + fm + ".0";
    } else {
      from = ">=" + from;
    }
    if (isX(tM)) {
      to = "";
    } else if (isX(tm)) {
      to = "<" + (+tM + 1) + ".0.0";
    } else if (isX(tp)) {
      to = "<" + tM + "." + (+tm + 1) + ".0";
    } else if (tpr) {
      to = "<=" + tM + "." + tm + "." + tp + "-" + tpr;
    } else {
      to = "<=" + to;
    }
    return (from + " " + to).trim();
  }
  Range.prototype.test = function(version) {
    if (!version) {
      return false;
    }
    if (typeof version === "string") {
      try {
        version = new SemVer(version, this.options);
      } catch (er) {
        return false;
      }
    }
    for (var i2 = 0; i2 < this.set.length; i2++) {
      if (testSet(this.set[i2], version, this.options)) {
        return true;
      }
    }
    return false;
  };
  function testSet(set, version, options) {
    for (var i2 = 0; i2 < set.length; i2++) {
      if (!set[i2].test(version)) {
        return false;
      }
    }
    if (version.prerelease.length && !options.includePrerelease) {
      for (i2 = 0; i2 < set.length; i2++) {
        debug3(set[i2].semver);
        if (set[i2].semver === ANY) {
          continue;
        }
        if (set[i2].semver.prerelease.length > 0) {
          var allowed = set[i2].semver;
          if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
            return true;
          }
        }
      }
      return false;
    }
    return true;
  }
  exports2.satisfies = satisfies;
  function satisfies(version, range, options) {
    try {
      range = new Range(range, options);
    } catch (er) {
      return false;
    }
    return range.test(version);
  }
  exports2.maxSatisfying = maxSatisfying;
  function maxSatisfying(versions, range, options) {
    var max = null;
    var maxSV = null;
    try {
      var rangeObj = new Range(range, options);
    } catch (er) {
      return null;
    }
    versions.forEach(function(v) {
      if (rangeObj.test(v)) {
        if (!max || maxSV.compare(v) === -1) {
          max = v;
          maxSV = new SemVer(max, options);
        }
      }
    });
    return max;
  }
  exports2.minSatisfying = minSatisfying;
  function minSatisfying(versions, range, options) {
    var min = null;
    var minSV = null;
    try {
      var rangeObj = new Range(range, options);
    } catch (er) {
      return null;
    }
    versions.forEach(function(v) {
      if (rangeObj.test(v)) {
        if (!min || minSV.compare(v) === 1) {
          min = v;
          minSV = new SemVer(min, options);
        }
      }
    });
    return min;
  }
  exports2.minVersion = minVersion;
  function minVersion(range, loose) {
    range = new Range(range, loose);
    var minver = new SemVer("0.0.0");
    if (range.test(minver)) {
      return minver;
    }
    minver = new SemVer("0.0.0-0");
    if (range.test(minver)) {
      return minver;
    }
    minver = null;
    for (var i2 = 0; i2 < range.set.length; ++i2) {
      var comparators = range.set[i2];
      comparators.forEach(function(comparator) {
        var compver = new SemVer(comparator.semver.version);
        switch (comparator.operator) {
          case ">":
            if (compver.prerelease.length === 0) {
              compver.patch++;
            } else {
              compver.prerelease.push(0);
            }
            compver.raw = compver.format();
          case "":
          case ">=":
            if (!minver || gt(minver, compver)) {
              minver = compver;
            }
            break;
          case "<":
          case "<=":
            break;
          default:
            throw new Error("Unexpected operation: " + comparator.operator);
        }
      });
    }
    if (minver && range.test(minver)) {
      return minver;
    }
    return null;
  }
  exports2.validRange = validRange;
  function validRange(range, options) {
    try {
      return new Range(range, options).range || "*";
    } catch (er) {
      return null;
    }
  }
  exports2.ltr = ltr;
  function ltr(version, range, options) {
    return outside(version, range, "<", options);
  }
  exports2.gtr = gtr;
  function gtr(version, range, options) {
    return outside(version, range, ">", options);
  }
  exports2.outside = outside;
  function outside(version, range, hilo, options) {
    version = new SemVer(version, options);
    range = new Range(range, options);
    var gtfn, ltefn, ltfn, comp, ecomp;
    switch (hilo) {
      case ">":
        gtfn = gt;
        ltefn = lte;
        ltfn = lt;
        comp = ">";
        ecomp = ">=";
        break;
      case "<":
        gtfn = lt;
        ltefn = gte;
        ltfn = gt;
        comp = "<";
        ecomp = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (satisfies(version, range, options)) {
      return false;
    }
    for (var i2 = 0; i2 < range.set.length; ++i2) {
      var comparators = range.set[i2];
      var high = null;
      var low = null;
      comparators.forEach(function(comparator) {
        if (comparator.semver === ANY) {
          comparator = new Comparator(">=0.0.0");
        }
        high = high || comparator;
        low = low || comparator;
        if (gtfn(comparator.semver, high.semver, options)) {
          high = comparator;
        } else if (ltfn(comparator.semver, low.semver, options)) {
          low = comparator;
        }
      });
      if (high.operator === comp || high.operator === ecomp) {
        return false;
      }
      if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
        return false;
      } else if (low.operator === ecomp && ltfn(version, low.semver)) {
        return false;
      }
    }
    return true;
  }
  exports2.prerelease = prerelease;
  function prerelease(version, options) {
    var parsed = parse(version, options);
    return parsed && parsed.prerelease.length ? parsed.prerelease : null;
  }
  exports2.intersects = intersects;
  function intersects(r1, r2, options) {
    r1 = new Range(r1, options);
    r2 = new Range(r2, options);
    return r1.intersects(r2);
  }
  exports2.coerce = coerce;
  function coerce(version, options) {
    if (version instanceof SemVer) {
      return version;
    }
    if (typeof version === "number") {
      version = String(version);
    }
    if (typeof version !== "string") {
      return null;
    }
    options = options || {};
    var match = null;
    if (!options.rtl) {
      match = version.match(re[t.COERCE]);
    } else {
      var next;
      while ((next = re[t.COERCERTL].exec(version)) && (!match || match.index + match[0].length !== version.length)) {
        if (!match || next.index + next[0].length !== match.index + match[0].length) {
          match = next;
        }
        re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
      }
      re[t.COERCERTL].lastIndex = -1;
    }
    if (match === null) {
      return null;
    }
    return parse(match[2] + "." + (match[3] || "0") + "." + (match[4] || "0"), options);
  }
});

// ../../node_modules/.pnpm/make-dir@3.1.0/node_modules/make-dir/index.js
var require_make_dir = __commonJS((exports2, module2) => {
  "use strict";
  var fs = require("fs");
  var path2 = require("path");
  var {promisify} = require("util");
  var semver = require_semver();
  var useNativeRecursiveOption = semver.satisfies(process.version, ">=10.12.0");
  var checkPath = (pth) => {
    if (process.platform === "win32") {
      const pathHasInvalidWinCharacters = /[<>:"|?*]/.test(pth.replace(path2.parse(pth).root, ""));
      if (pathHasInvalidWinCharacters) {
        const error = new Error(`Path contains invalid characters: ${pth}`);
        error.code = "EINVAL";
        throw error;
      }
    }
  };
  var processOptions = (options) => {
    const defaults = {
      mode: 511,
      fs
    };
    return {
      ...defaults,
      ...options
    };
  };
  var permissionError = (pth) => {
    const error = new Error(`operation not permitted, mkdir '${pth}'`);
    error.code = "EPERM";
    error.errno = -4048;
    error.path = pth;
    error.syscall = "mkdir";
    return error;
  };
  var makeDir = async (input, options) => {
    checkPath(input);
    options = processOptions(options);
    const mkdir = promisify(options.fs.mkdir);
    const stat = promisify(options.fs.stat);
    if (useNativeRecursiveOption && options.fs.mkdir === fs.mkdir) {
      const pth = path2.resolve(input);
      await mkdir(pth, {
        mode: options.mode,
        recursive: true
      });
      return pth;
    }
    const make = async (pth) => {
      try {
        await mkdir(pth, options.mode);
        return pth;
      } catch (error) {
        if (error.code === "EPERM") {
          throw error;
        }
        if (error.code === "ENOENT") {
          if (path2.dirname(pth) === pth) {
            throw permissionError(pth);
          }
          if (error.message.includes("null bytes")) {
            throw error;
          }
          await make(path2.dirname(pth));
          return make(pth);
        }
        try {
          const stats = await stat(pth);
          if (!stats.isDirectory()) {
            throw new Error("The path is not a directory");
          }
        } catch (_) {
          throw error;
        }
        return pth;
      }
    };
    return make(path2.resolve(input));
  };
  module2.exports = makeDir;
  module2.exports.sync = (input, options) => {
    checkPath(input);
    options = processOptions(options);
    if (useNativeRecursiveOption && options.fs.mkdirSync === fs.mkdirSync) {
      const pth = path2.resolve(input);
      fs.mkdirSync(pth, {
        mode: options.mode,
        recursive: true
      });
      return pth;
    }
    const make = (pth) => {
      try {
        options.fs.mkdirSync(pth, options.mode);
      } catch (error) {
        if (error.code === "EPERM") {
          throw error;
        }
        if (error.code === "ENOENT") {
          if (path2.dirname(pth) === pth) {
            throw permissionError(pth);
          }
          if (error.message.includes("null bytes")) {
            throw error;
          }
          make(path2.dirname(pth));
          return make(pth);
        }
        try {
          if (!options.fs.statSync(pth).isDirectory()) {
            throw new Error("The path is not a directory");
          }
        } catch (_) {
          throw error;
        }
      }
      return pth;
    };
    return make(path2.resolve(input));
  };
});

// ../../node_modules/.pnpm/indent-string@4.0.0/node_modules/indent-string/index.js
var require_indent_string = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = (string, count = 1, options) => {
    options = {
      indent: " ",
      includeEmptyLines: false,
      ...options
    };
    if (typeof string !== "string") {
      throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof string}\``);
    }
    if (typeof count !== "number") {
      throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof count}\``);
    }
    if (typeof options.indent !== "string") {
      throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof options.indent}\``);
    }
    if (count === 0) {
      return string;
    }
    const regex = options.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
    return string.replace(regex, options.indent.repeat(count));
  };
});

// ../../node_modules/.pnpm/clean-stack@2.2.0/node_modules/clean-stack/index.js
var require_clean_stack = __commonJS((exports2, module2) => {
  "use strict";
  var os = require("os");
  var extractPathRegex = /\s+at.*(?:\(|\s)(.*)\)?/;
  var pathRegex = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:babel-polyfill|pirates)\/.*)?\w+)\.js:\d+:\d+)|native)/;
  var homeDir = typeof os.homedir === "undefined" ? "" : os.homedir();
  module2.exports = (stack, options) => {
    options = Object.assign({pretty: false}, options);
    return stack.replace(/\\/g, "/").split("\n").filter((line) => {
      const pathMatches = line.match(extractPathRegex);
      if (pathMatches === null || !pathMatches[1]) {
        return true;
      }
      const match = pathMatches[1];
      if (match.includes(".app/Contents/Resources/electron.asar") || match.includes(".app/Contents/Resources/default_app.asar")) {
        return false;
      }
      return !pathRegex.test(match);
    }).filter((line) => line.trim() !== "").map((line) => {
      if (options.pretty) {
        return line.replace(extractPathRegex, (m, p1) => m.replace(p1, p1.replace(homeDir, "~")));
      }
      return line;
    }).join("\n");
  };
});

// ../../node_modules/.pnpm/aggregate-error@3.1.0/node_modules/aggregate-error/index.js
var require_aggregate_error = __commonJS((exports2, module2) => {
  "use strict";
  var indentString = require_indent_string();
  var cleanStack = require_clean_stack();
  var cleanInternalStack = (stack) => stack.replace(/\s+at .*aggregate-error\/index.js:\d+:\d+\)?/g, "");
  var AggregateError = class extends Error {
    constructor(errors) {
      if (!Array.isArray(errors)) {
        throw new TypeError(`Expected input to be an Array, got ${typeof errors}`);
      }
      errors = [...errors].map((error) => {
        if (error instanceof Error) {
          return error;
        }
        if (error !== null && typeof error === "object") {
          return Object.assign(new Error(error.message), error);
        }
        return new Error(error);
      });
      let message = errors.map((error) => {
        return typeof error.stack === "string" ? cleanInternalStack(cleanStack(error.stack)) : String(error);
      }).join("\n");
      message = "\n" + indentString(message, 4);
      super(message);
      this.name = "AggregateError";
      Object.defineProperty(this, "_errors", {value: errors});
    }
    *[Symbol.iterator]() {
      for (const error of this._errors) {
        yield error;
      }
    }
  };
  module2.exports = AggregateError;
});

// ../../node_modules/.pnpm/p-map@4.0.0/node_modules/p-map/index.js
var require_p_map = __commonJS((exports2, module2) => {
  "use strict";
  var AggregateError = require_aggregate_error();
  module2.exports = async (iterable, mapper, {
    concurrency = Infinity,
    stopOnError = true
  } = {}) => {
    return new Promise((resolve, reject) => {
      if (typeof mapper !== "function") {
        throw new TypeError("Mapper function is required");
      }
      if (!((Number.isSafeInteger(concurrency) || concurrency === Infinity) && concurrency >= 1)) {
        throw new TypeError(`Expected \`concurrency\` to be an integer from 1 and up or \`Infinity\`, got \`${concurrency}\` (${typeof concurrency})`);
      }
      const result = [];
      const errors = [];
      const iterator = iterable[Symbol.iterator]();
      let isRejected = false;
      let isIterableDone = false;
      let resolvingCount = 0;
      let currentIndex = 0;
      const next = () => {
        if (isRejected) {
          return;
        }
        const nextItem = iterator.next();
        const index = currentIndex;
        currentIndex++;
        if (nextItem.done) {
          isIterableDone = true;
          if (resolvingCount === 0) {
            if (!stopOnError && errors.length !== 0) {
              reject(new AggregateError(errors));
            } else {
              resolve(result);
            }
          }
          return;
        }
        resolvingCount++;
        (async () => {
          try {
            const element = await nextItem.value;
            result[index] = await mapper(element, index);
            resolvingCount--;
            next();
          } catch (error) {
            if (stopOnError) {
              isRejected = true;
              reject(error);
            } else {
              errors.push(error);
              resolvingCount--;
              next();
            }
          }
        })();
      };
      for (let i = 0; i < concurrency; i++) {
        next();
        if (isIterableDone) {
          break;
        }
      }
    });
  };
});

// ../../node_modules/.pnpm/p-filter@2.1.0/node_modules/p-filter/index.js
var require_p_filter = __commonJS((exports2, module2) => {
  "use strict";
  var pMap = require_p_map();
  var pFilter = async (iterable, filterer, options) => {
    const values = await pMap(iterable, (element, index) => Promise.all([filterer(element, index), element]), options);
    return values.filter((value) => Boolean(value[0])).map((value) => value[1]);
  };
  module2.exports = pFilter;
  module2.exports.default = pFilter;
});

// ../../node_modules/.pnpm/temp-dir@2.0.0/node_modules/temp-dir/index.js
var require_temp_dir = __commonJS((exports2, module2) => {
  "use strict";
  var fs = require("fs");
  var os = require("os");
  var tempDirectorySymbol = Symbol.for("__RESOLVED_TEMP_DIRECTORY__");
  if (!global[tempDirectorySymbol]) {
    Object.defineProperty(global, tempDirectorySymbol, {
      value: fs.realpathSync(os.tmpdir())
    });
  }
  module2.exports = global[tempDirectorySymbol];
});

// ../../node_modules/.pnpm/@prisma/fetch-engine@2.24.1/node_modules/@prisma/fetch-engine/dist/chmod.js
var require_chmod = __commonJS((exports2) => {
  "use strict";
  var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    Object.defineProperty(o, k2, {enumerable: true, get: function() {
      return m[k];
    }});
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {enumerable: true, value: v});
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var fs = __importStar(require("fs"));
  function default_1(file) {
    const s = fs.statSync(file);
    const newMode = s.mode | 64 | 8 | 1;
    if (s.mode === newMode)
      return;
    const base8 = newMode.toString(8).slice(-3);
    fs.chmodSync(file, base8);
  }
  exports2.default = default_1;
});

// ../../node_modules/.pnpm/commondir@1.0.1/node_modules/commondir/index.js
var require_commondir = __commonJS((exports2, module2) => {
  var path2 = require("path");
  module2.exports = function(basedir, relfiles) {
    if (relfiles) {
      var files = relfiles.map(function(r) {
        return path2.resolve(basedir, r);
      });
    } else {
      var files = basedir;
    }
    var res = files.slice(1).reduce(function(ps, file) {
      if (!file.match(/^([A-Za-z]:)?\/|\\/)) {
        throw new Error("relative path without a basedir");
      }
      var xs = file.split(/\/+|\\+/);
      for (var i = 0; ps[i] === xs[i] && i < Math.min(ps.length, xs.length); i++)
        ;
      return ps.slice(0, i);
    }, files[0].split(/\/+|\\+/));
    return res.length > 1 ? res.join("/") : "/";
  };
});

// ../../node_modules/.pnpm/yocto-queue@0.1.0/node_modules/yocto-queue/index.js
var require_yocto_queue = __commonJS((exports2, module2) => {
  var Node = class {
    constructor(value) {
      this.value = value;
      this.next = void 0;
    }
  };
  var Queue = class {
    constructor() {
      this.clear();
    }
    enqueue(value) {
      const node = new Node(value);
      if (this._head) {
        this._tail.next = node;
        this._tail = node;
      } else {
        this._head = node;
        this._tail = node;
      }
      this._size++;
    }
    dequeue() {
      const current = this._head;
      if (!current) {
        return;
      }
      this._head = this._head.next;
      this._size--;
      return current.value;
    }
    clear() {
      this._head = void 0;
      this._tail = void 0;
      this._size = 0;
    }
    get size() {
      return this._size;
    }
    *[Symbol.iterator]() {
      let current = this._head;
      while (current) {
        yield current.value;
        current = current.next;
      }
    }
  };
  module2.exports = Queue;
});

// ../../node_modules/.pnpm/p-limit@3.1.0/node_modules/p-limit/index.js
var require_p_limit = __commonJS((exports2, module2) => {
  "use strict";
  var Queue = require_yocto_queue();
  var pLimit = (concurrency) => {
    if (!((Number.isInteger(concurrency) || concurrency === Infinity) && concurrency > 0)) {
      throw new TypeError("Expected `concurrency` to be a number from 1 and up");
    }
    const queue = new Queue();
    let activeCount = 0;
    const next = () => {
      activeCount--;
      if (queue.size > 0) {
        queue.dequeue()();
      }
    };
    const run = async (fn, resolve, ...args) => {
      activeCount++;
      const result = (async () => fn(...args))();
      resolve(result);
      try {
        await result;
      } catch (e) {
      }
      next();
    };
    const enqueue = (fn, resolve, ...args) => {
      queue.enqueue(run.bind(null, fn, resolve, ...args));
      (async () => {
        await Promise.resolve();
        if (activeCount < concurrency && queue.size > 0) {
          queue.dequeue()();
        }
      })();
    };
    const generator = (fn, ...args) => new Promise((resolve) => {
      enqueue(fn, resolve, ...args);
    });
    Object.defineProperties(generator, {
      activeCount: {
        get: () => activeCount
      },
      pendingCount: {
        get: () => queue.size
      },
      clearQueue: {
        value: () => {
          queue.clear();
        }
      }
    });
    return generator;
  };
  module2.exports = pLimit;
});

// ../../node_modules/.pnpm/p-locate@5.0.0/node_modules/p-locate/index.js
var require_p_locate = __commonJS((exports2, module2) => {
  "use strict";
  var pLimit = require_p_limit();
  var EndError = class extends Error {
    constructor(value) {
      super();
      this.value = value;
    }
  };
  var testElement = async (element, tester) => tester(await element);
  var finder = async (element) => {
    const values = await Promise.all(element);
    if (values[1] === true) {
      throw new EndError(values[0]);
    }
    return false;
  };
  var pLocate = async (iterable, tester, options) => {
    options = {
      concurrency: Infinity,
      preserveOrder: true,
      ...options
    };
    const limit = pLimit(options.concurrency);
    const items = [...iterable].map((element) => [element, limit(testElement, element, tester)]);
    const checkLimit = pLimit(options.preserveOrder ? 1 : Infinity);
    try {
      await Promise.all(items.map((element) => checkLimit(finder, element)));
    } catch (error) {
      if (error instanceof EndError) {
        return error.value;
      }
      throw error;
    }
  };
  module2.exports = pLocate;
});

// ../../node_modules/.pnpm/locate-path@6.0.0/node_modules/locate-path/index.js
var require_locate_path = __commonJS((exports2, module2) => {
  "use strict";
  var path2 = require("path");
  var fs = require("fs");
  var {promisify} = require("util");
  var pLocate = require_p_locate();
  var fsStat = promisify(fs.stat);
  var fsLStat = promisify(fs.lstat);
  var typeMappings = {
    directory: "isDirectory",
    file: "isFile"
  };
  function checkType({type}) {
    if (type in typeMappings) {
      return;
    }
    throw new Error(`Invalid type specified: ${type}`);
  }
  var matchType = (type, stat) => type === void 0 || stat[typeMappings[type]]();
  module2.exports = async (paths, options) => {
    options = {
      cwd: process.cwd(),
      type: "file",
      allowSymlinks: true,
      ...options
    };
    checkType(options);
    const statFn = options.allowSymlinks ? fsStat : fsLStat;
    return pLocate(paths, async (path_) => {
      try {
        const stat = await statFn(path2.resolve(options.cwd, path_));
        return matchType(options.type, stat);
      } catch (e) {
        return false;
      }
    }, options);
  };
  module2.exports.sync = (paths, options) => {
    options = {
      cwd: process.cwd(),
      allowSymlinks: true,
      type: "file",
      ...options
    };
    checkType(options);
    const statFn = options.allowSymlinks ? fs.statSync : fs.lstatSync;
    for (const path_ of paths) {
      try {
        const stat = statFn(path2.resolve(options.cwd, path_));
        if (matchType(options.type, stat)) {
          return path_;
        }
      } catch (e) {
      }
    }
  };
});

// ../../node_modules/.pnpm/path-exists@4.0.0/node_modules/path-exists/index.js
var require_path_exists = __commonJS((exports2, module2) => {
  "use strict";
  var fs = require("fs");
  var {promisify} = require("util");
  var pAccess = promisify(fs.access);
  module2.exports = async (path2) => {
    try {
      await pAccess(path2);
      return true;
    } catch (_) {
      return false;
    }
  };
  module2.exports.sync = (path2) => {
    try {
      fs.accessSync(path2);
      return true;
    } catch (_) {
      return false;
    }
  };
});

// ../../node_modules/.pnpm/find-up@5.0.0/node_modules/find-up/index.js
var require_find_up = __commonJS((exports2, module2) => {
  "use strict";
  var path2 = require("path");
  var locatePath = require_locate_path();
  var pathExists = require_path_exists();
  var stop = Symbol("findUp.stop");
  module2.exports = async (name, options = {}) => {
    let directory = path2.resolve(options.cwd || "");
    const {root} = path2.parse(directory);
    const paths = [].concat(name);
    const runMatcher = async (locateOptions) => {
      if (typeof name !== "function") {
        return locatePath(paths, locateOptions);
      }
      const foundPath = await name(locateOptions.cwd);
      if (typeof foundPath === "string") {
        return locatePath([foundPath], locateOptions);
      }
      return foundPath;
    };
    while (true) {
      const foundPath = await runMatcher({...options, cwd: directory});
      if (foundPath === stop) {
        return;
      }
      if (foundPath) {
        return path2.resolve(directory, foundPath);
      }
      if (directory === root) {
        return;
      }
      directory = path2.dirname(directory);
    }
  };
  module2.exports.sync = (name, options = {}) => {
    let directory = path2.resolve(options.cwd || "");
    const {root} = path2.parse(directory);
    const paths = [].concat(name);
    const runMatcher = (locateOptions) => {
      if (typeof name !== "function") {
        return locatePath.sync(paths, locateOptions);
      }
      const foundPath = name(locateOptions.cwd);
      if (typeof foundPath === "string") {
        return locatePath.sync([foundPath], locateOptions);
      }
      return foundPath;
    };
    while (true) {
      const foundPath = runMatcher({...options, cwd: directory});
      if (foundPath === stop) {
        return;
      }
      if (foundPath) {
        return path2.resolve(directory, foundPath);
      }
      if (directory === root) {
        return;
      }
      directory = path2.dirname(directory);
    }
  };
  module2.exports.exists = pathExists;
  module2.exports.sync.exists = pathExists.sync;
  module2.exports.stop = stop;
});

// ../../node_modules/.pnpm/pkg-dir@5.0.0/node_modules/pkg-dir/index.js
var require_pkg_dir = __commonJS((exports2, module2) => {
  "use strict";
  var path2 = require("path");
  var findUp = require_find_up();
  var pkgDir = async (cwd) => {
    const filePath = await findUp("package.json", {cwd});
    return filePath && path2.dirname(filePath);
  };
  module2.exports = pkgDir;
  module2.exports.sync = (cwd) => {
    const filePath = findUp.sync("package.json", {cwd});
    return filePath && path2.dirname(filePath);
  };
});

// ../../node_modules/.pnpm/find-cache-dir@3.3.1/node_modules/find-cache-dir/index.js
var require_find_cache_dir = __commonJS((exports2, module2) => {
  "use strict";
  var path2 = require("path");
  var fs = require("fs");
  var commonDir = require_commondir();
  var pkgDir = require_pkg_dir();
  var makeDir = require_make_dir();
  var {env, cwd} = process;
  var isWritable = (path3) => {
    try {
      fs.accessSync(path3, fs.constants.W_OK);
      return true;
    } catch (_) {
      return false;
    }
  };
  function useDirectory(directory, options) {
    if (options.create) {
      makeDir.sync(directory);
    }
    if (options.thunk) {
      return (...arguments_) => path2.join(directory, ...arguments_);
    }
    return directory;
  }
  function getNodeModuleDirectory(directory) {
    const nodeModules = path2.join(directory, "node_modules");
    if (!isWritable(nodeModules) && (fs.existsSync(nodeModules) || !isWritable(path2.join(directory)))) {
      return;
    }
    return nodeModules;
  }
  module2.exports = (options = {}) => {
    if (env.CACHE_DIR && !["true", "false", "1", "0"].includes(env.CACHE_DIR)) {
      return useDirectory(path2.join(env.CACHE_DIR, "find-cache-dir"), options);
    }
    let {cwd: directory = cwd()} = options;
    if (options.files) {
      directory = commonDir(directory, options.files);
    }
    directory = pkgDir.sync(directory);
    if (!directory) {
      return;
    }
    const nodeModules = getNodeModuleDirectory(directory);
    if (!nodeModules) {
      return void 0;
    }
    return useDirectory(path2.join(directory, "node_modules", ".cache", options.name), options);
  };
});

// ../../node_modules/.pnpm/@prisma/fetch-engine@2.24.1/node_modules/@prisma/fetch-engine/dist/util.js
var require_util2 = __commonJS((exports2) => {
  "use strict";
  var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.getDownloadUrl = exports2.getCacheDir = exports2.getRootCacheDir = void 0;
  var debug_12 = __importDefault2(require_dist());
  var get_platform_12 = require_dist2();
  var find_cache_dir_1 = __importDefault2(require_find_cache_dir());
  var fs_12 = __importDefault2(require("fs"));
  var make_dir_12 = __importDefault2(require_make_dir());
  var os_1 = __importDefault2(require("os"));
  var path_12 = __importDefault2(require("path"));
  var download_1 = require_download();
  var debug3 = debug_12.default("prisma:cache-dir");
  async function getRootCacheDir() {
    if (os_1.default.platform() === "win32") {
      const cacheDir = find_cache_dir_1.default({name: "prisma", create: true});
      if (cacheDir) {
        return cacheDir;
      }
      if (process.env.APPDATA) {
        return path_12.default.join(process.env.APPDATA, "Prisma");
      }
    }
    if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
      try {
        await make_dir_12.default(`/tmp/prisma-download`);
        return `/tmp/prisma-download`;
      } catch (e) {
        return null;
      }
    }
    return path_12.default.join(os_1.default.homedir(), ".cache/prisma");
  }
  exports2.getRootCacheDir = getRootCacheDir;
  async function getCacheDir(channel2, version, platform) {
    const rootCacheDir = await getRootCacheDir();
    if (!rootCacheDir) {
      return null;
    }
    const cacheDir = path_12.default.join(rootCacheDir, channel2, version, platform);
    try {
      if (!fs_12.default.existsSync(cacheDir)) {
        await make_dir_12.default(cacheDir);
      }
    } catch (e) {
      debug3("The following error is being caught and just there for debugging:");
      debug3(e);
      return null;
    }
    return cacheDir;
  }
  exports2.getCacheDir = getCacheDir;
  function getDownloadUrl(channel2, version, platform, binaryName, extension = ".gz") {
    const baseUrl = process.env.PRISMA_BINARIES_MIRROR || "https://binaries.prisma.sh";
    const finalExtension = platform === "windows" && download_1.EngineTypes.libqueryEngineNapi !== binaryName ? `.exe${extension}` : extension;
    if (binaryName === download_1.EngineTypes.libqueryEngineNapi) {
      binaryName = get_platform_12.getNapiName(platform, "url");
    }
    return `${baseUrl}/${channel2}/${version}/${platform}/${binaryName}${finalExtension}`;
  }
  exports2.getDownloadUrl = getDownloadUrl;
});

// ../../node_modules/.pnpm/fs.realpath@1.0.0/node_modules/fs.realpath/old.js
var require_old = __commonJS((exports2) => {
  var pathModule = require("path");
  var isWindows = process.platform === "win32";
  var fs = require("fs");
  var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);
  function rethrow() {
    var callback;
    if (DEBUG) {
      var backtrace = new Error();
      callback = debugCallback;
    } else
      callback = missingCallback;
    return callback;
    function debugCallback(err) {
      if (err) {
        backtrace.message = err.message;
        err = backtrace;
        missingCallback(err);
      }
    }
    function missingCallback(err) {
      if (err) {
        if (process.throwDeprecation)
          throw err;
        else if (!process.noDeprecation) {
          var msg = "fs: missing callback " + (err.stack || err.message);
          if (process.traceDeprecation)
            console.trace(msg);
          else
            console.error(msg);
        }
      }
    }
  }
  function maybeCallback(cb) {
    return typeof cb === "function" ? cb : rethrow();
  }
  var normalize = pathModule.normalize;
  if (isWindows) {
    nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
  } else {
    nextPartRe = /(.*?)(?:[\/]+|$)/g;
  }
  var nextPartRe;
  if (isWindows) {
    splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
  } else {
    splitRootRe = /^[\/]*/;
  }
  var splitRootRe;
  exports2.realpathSync = function realpathSync(p, cache) {
    p = pathModule.resolve(p);
    if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
      return cache[p];
    }
    var original = p, seenLinks = {}, knownHard = {};
    var pos;
    var current;
    var base;
    var previous;
    start();
    function start() {
      var m = splitRootRe.exec(p);
      pos = m[0].length;
      current = m[0];
      base = m[0];
      previous = "";
      if (isWindows && !knownHard[base]) {
        fs.lstatSync(base);
        knownHard[base] = true;
      }
    }
    while (pos < p.length) {
      nextPartRe.lastIndex = pos;
      var result = nextPartRe.exec(p);
      previous = current;
      current += result[0];
      base = previous + result[1];
      pos = nextPartRe.lastIndex;
      if (knownHard[base] || cache && cache[base] === base) {
        continue;
      }
      var resolvedLink;
      if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
        resolvedLink = cache[base];
      } else {
        var stat = fs.lstatSync(base);
        if (!stat.isSymbolicLink()) {
          knownHard[base] = true;
          if (cache)
            cache[base] = base;
          continue;
        }
        var linkTarget = null;
        if (!isWindows) {
          var id = stat.dev.toString(32) + ":" + stat.ino.toString(32);
          if (seenLinks.hasOwnProperty(id)) {
            linkTarget = seenLinks[id];
          }
        }
        if (linkTarget === null) {
          fs.statSync(base);
          linkTarget = fs.readlinkSync(base);
        }
        resolvedLink = pathModule.resolve(previous, linkTarget);
        if (cache)
          cache[base] = resolvedLink;
        if (!isWindows)
          seenLinks[id] = linkTarget;
      }
      p = pathModule.resolve(resolvedLink, p.slice(pos));
      start();
    }
    if (cache)
      cache[original] = p;
    return p;
  };
  exports2.realpath = function realpath(p, cache, cb) {
    if (typeof cb !== "function") {
      cb = maybeCallback(cache);
      cache = null;
    }
    p = pathModule.resolve(p);
    if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
      return process.nextTick(cb.bind(null, null, cache[p]));
    }
    var original = p, seenLinks = {}, knownHard = {};
    var pos;
    var current;
    var base;
    var previous;
    start();
    function start() {
      var m = splitRootRe.exec(p);
      pos = m[0].length;
      current = m[0];
      base = m[0];
      previous = "";
      if (isWindows && !knownHard[base]) {
        fs.lstat(base, function(err) {
          if (err)
            return cb(err);
          knownHard[base] = true;
          LOOP();
        });
      } else {
        process.nextTick(LOOP);
      }
    }
    function LOOP() {
      if (pos >= p.length) {
        if (cache)
          cache[original] = p;
        return cb(null, p);
      }
      nextPartRe.lastIndex = pos;
      var result = nextPartRe.exec(p);
      previous = current;
      current += result[0];
      base = previous + result[1];
      pos = nextPartRe.lastIndex;
      if (knownHard[base] || cache && cache[base] === base) {
        return process.nextTick(LOOP);
      }
      if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
        return gotResolvedLink(cache[base]);
      }
      return fs.lstat(base, gotStat);
    }
    function gotStat(err, stat) {
      if (err)
        return cb(err);
      if (!stat.isSymbolicLink()) {
        knownHard[base] = true;
        if (cache)
          cache[base] = base;
        return process.nextTick(LOOP);
      }
      if (!isWindows) {
        var id = stat.dev.toString(32) + ":" + stat.ino.toString(32);
        if (seenLinks.hasOwnProperty(id)) {
          return gotTarget(null, seenLinks[id], base);
        }
      }
      fs.stat(base, function(err2) {
        if (err2)
          return cb(err2);
        fs.readlink(base, function(err3, target) {
          if (!isWindows)
            seenLinks[id] = target;
          gotTarget(err3, target);
        });
      });
    }
    function gotTarget(err, target, base2) {
      if (err)
        return cb(err);
      var resolvedLink = pathModule.resolve(previous, target);
      if (cache)
        cache[base2] = resolvedLink;
      gotResolvedLink(resolvedLink);
    }
    function gotResolvedLink(resolvedLink) {
      p = pathModule.resolve(resolvedLink, p.slice(pos));
      start();
    }
  };
});

// ../../node_modules/.pnpm/fs.realpath@1.0.0/node_modules/fs.realpath/index.js
var require_fs = __commonJS((exports2, module2) => {
  module2.exports = realpath;
  realpath.realpath = realpath;
  realpath.sync = realpathSync;
  realpath.realpathSync = realpathSync;
  realpath.monkeypatch = monkeypatch;
  realpath.unmonkeypatch = unmonkeypatch;
  var fs = require("fs");
  var origRealpath = fs.realpath;
  var origRealpathSync = fs.realpathSync;
  var version = process.version;
  var ok = /^v[0-5]\./.test(version);
  var old = require_old();
  function newError(er) {
    return er && er.syscall === "realpath" && (er.code === "ELOOP" || er.code === "ENOMEM" || er.code === "ENAMETOOLONG");
  }
  function realpath(p, cache, cb) {
    if (ok) {
      return origRealpath(p, cache, cb);
    }
    if (typeof cache === "function") {
      cb = cache;
      cache = null;
    }
    origRealpath(p, cache, function(er, result) {
      if (newError(er)) {
        old.realpath(p, cache, cb);
      } else {
        cb(er, result);
      }
    });
  }
  function realpathSync(p, cache) {
    if (ok) {
      return origRealpathSync(p, cache);
    }
    try {
      return origRealpathSync(p, cache);
    } catch (er) {
      if (newError(er)) {
        return old.realpathSync(p, cache);
      } else {
        throw er;
      }
    }
  }
  function monkeypatch() {
    fs.realpath = realpath;
    fs.realpathSync = realpathSync;
  }
  function unmonkeypatch() {
    fs.realpath = origRealpath;
    fs.realpathSync = origRealpathSync;
  }
});

// ../../node_modules/.pnpm/concat-map@0.0.1/node_modules/concat-map/index.js
var require_concat_map = __commonJS((exports2, module2) => {
  module2.exports = function(xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
      var x = fn(xs[i], i);
      if (isArray(x))
        res.push.apply(res, x);
      else
        res.push(x);
    }
    return res;
  };
  var isArray = Array.isArray || function(xs) {
    return Object.prototype.toString.call(xs) === "[object Array]";
  };
});

// ../../node_modules/.pnpm/balanced-match@1.0.0/node_modules/balanced-match/index.js
var require_balanced_match = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = balanced;
  function balanced(a, b, str) {
    if (a instanceof RegExp)
      a = maybeMatch(a, str);
    if (b instanceof RegExp)
      b = maybeMatch(b, str);
    var r = range(a, b, str);
    return r && {
      start: r[0],
      end: r[1],
      pre: str.slice(0, r[0]),
      body: str.slice(r[0] + a.length, r[1]),
      post: str.slice(r[1] + b.length)
    };
  }
  function maybeMatch(reg, str) {
    var m = str.match(reg);
    return m ? m[0] : null;
  }
  balanced.range = range;
  function range(a, b, str) {
    var begs, beg, left, right, result;
    var ai = str.indexOf(a);
    var bi = str.indexOf(b, ai + 1);
    var i = ai;
    if (ai >= 0 && bi > 0) {
      begs = [];
      left = str.length;
      while (i >= 0 && !result) {
        if (i == ai) {
          begs.push(i);
          ai = str.indexOf(a, i + 1);
        } else if (begs.length == 1) {
          result = [begs.pop(), bi];
        } else {
          beg = begs.pop();
          if (beg < left) {
            left = beg;
            right = bi;
          }
          bi = str.indexOf(b, i + 1);
        }
        i = ai < bi && ai >= 0 ? ai : bi;
      }
      if (begs.length) {
        result = [left, right];
      }
    }
    return result;
  }
});

// ../../node_modules/.pnpm/brace-expansion@1.1.11/node_modules/brace-expansion/index.js
var require_brace_expansion = __commonJS((exports2, module2) => {
  var concatMap = require_concat_map();
  var balanced = require_balanced_match();
  module2.exports = expandTop;
  var escSlash = "\0SLASH" + Math.random() + "\0";
  var escOpen = "\0OPEN" + Math.random() + "\0";
  var escClose = "\0CLOSE" + Math.random() + "\0";
  var escComma = "\0COMMA" + Math.random() + "\0";
  var escPeriod = "\0PERIOD" + Math.random() + "\0";
  function numeric(str) {
    return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
  }
  function escapeBraces(str) {
    return str.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod);
  }
  function unescapeBraces(str) {
    return str.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".");
  }
  function parseCommaParts(str) {
    if (!str)
      return [""];
    var parts = [];
    var m = balanced("{", "}", str);
    if (!m)
      return str.split(",");
    var pre = m.pre;
    var body = m.body;
    var post = m.post;
    var p = pre.split(",");
    p[p.length - 1] += "{" + body + "}";
    var postParts = parseCommaParts(post);
    if (post.length) {
      p[p.length - 1] += postParts.shift();
      p.push.apply(p, postParts);
    }
    parts.push.apply(parts, p);
    return parts;
  }
  function expandTop(str) {
    if (!str)
      return [];
    if (str.substr(0, 2) === "{}") {
      str = "\\{\\}" + str.substr(2);
    }
    return expand(escapeBraces(str), true).map(unescapeBraces);
  }
  function embrace(str) {
    return "{" + str + "}";
  }
  function isPadded(el) {
    return /^-?0\d/.test(el);
  }
  function lte(i, y) {
    return i <= y;
  }
  function gte(i, y) {
    return i >= y;
  }
  function expand(str, isTop) {
    var expansions = [];
    var m = balanced("{", "}", str);
    if (!m || /\$$/.test(m.pre))
      return [str];
    var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
    var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
    var isSequence = isNumericSequence || isAlphaSequence;
    var isOptions = m.body.indexOf(",") >= 0;
    if (!isSequence && !isOptions) {
      if (m.post.match(/,.*\}/)) {
        str = m.pre + "{" + m.body + escClose + m.post;
        return expand(str);
      }
      return [str];
    }
    var n;
    if (isSequence) {
      n = m.body.split(/\.\./);
    } else {
      n = parseCommaParts(m.body);
      if (n.length === 1) {
        n = expand(n[0], false).map(embrace);
        if (n.length === 1) {
          var post = m.post.length ? expand(m.post, false) : [""];
          return post.map(function(p) {
            return m.pre + n[0] + p;
          });
        }
      }
    }
    var pre = m.pre;
    var post = m.post.length ? expand(m.post, false) : [""];
    var N;
    if (isSequence) {
      var x = numeric(n[0]);
      var y = numeric(n[1]);
      var width = Math.max(n[0].length, n[1].length);
      var incr = n.length == 3 ? Math.abs(numeric(n[2])) : 1;
      var test = lte;
      var reverse = y < x;
      if (reverse) {
        incr *= -1;
        test = gte;
      }
      var pad = n.some(isPadded);
      N = [];
      for (var i = x; test(i, y); i += incr) {
        var c;
        if (isAlphaSequence) {
          c = String.fromCharCode(i);
          if (c === "\\")
            c = "";
        } else {
          c = String(i);
          if (pad) {
            var need = width - c.length;
            if (need > 0) {
              var z = new Array(need + 1).join("0");
              if (i < 0)
                c = "-" + z + c.slice(1);
              else
                c = z + c;
            }
          }
        }
        N.push(c);
      }
    } else {
      N = concatMap(n, function(el) {
        return expand(el, false);
      });
    }
    for (var j = 0; j < N.length; j++) {
      for (var k = 0; k < post.length; k++) {
        var expansion = pre + N[j] + post[k];
        if (!isTop || isSequence || expansion)
          expansions.push(expansion);
      }
    }
    return expansions;
  }
});

// ../../node_modules/.pnpm/minimatch@3.0.4/node_modules/minimatch/minimatch.js
var require_minimatch = __commonJS((exports2, module2) => {
  module2.exports = minimatch;
  minimatch.Minimatch = Minimatch;
  var path2 = {sep: "/"};
  try {
    path2 = require("path");
  } catch (er) {
  }
  var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {};
  var expand = require_brace_expansion();
  var plTypes = {
    "!": {open: "(?:(?!(?:", close: "))[^/]*?)"},
    "?": {open: "(?:", close: ")?"},
    "+": {open: "(?:", close: ")+"},
    "*": {open: "(?:", close: ")*"},
    "@": {open: "(?:", close: ")"}
  };
  var qmark = "[^/]";
  var star = qmark + "*?";
  var twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
  var twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
  var reSpecials = charSet("().*{}+?[]^$\\!");
  function charSet(s) {
    return s.split("").reduce(function(set, c) {
      set[c] = true;
      return set;
    }, {});
  }
  var slashSplit = /\/+/;
  minimatch.filter = filter;
  function filter(pattern, options) {
    options = options || {};
    return function(p, i, list) {
      return minimatch(p, pattern, options);
    };
  }
  function ext(a, b) {
    a = a || {};
    b = b || {};
    var t = {};
    Object.keys(b).forEach(function(k) {
      t[k] = b[k];
    });
    Object.keys(a).forEach(function(k) {
      t[k] = a[k];
    });
    return t;
  }
  minimatch.defaults = function(def) {
    if (!def || !Object.keys(def).length)
      return minimatch;
    var orig = minimatch;
    var m = function minimatch2(p, pattern, options) {
      return orig.minimatch(p, pattern, ext(def, options));
    };
    m.Minimatch = function Minimatch2(pattern, options) {
      return new orig.Minimatch(pattern, ext(def, options));
    };
    return m;
  };
  Minimatch.defaults = function(def) {
    if (!def || !Object.keys(def).length)
      return Minimatch;
    return minimatch.defaults(def).Minimatch;
  };
  function minimatch(p, pattern, options) {
    if (typeof pattern !== "string") {
      throw new TypeError("glob pattern string required");
    }
    if (!options)
      options = {};
    if (!options.nocomment && pattern.charAt(0) === "#") {
      return false;
    }
    if (pattern.trim() === "")
      return p === "";
    return new Minimatch(pattern, options).match(p);
  }
  function Minimatch(pattern, options) {
    if (!(this instanceof Minimatch)) {
      return new Minimatch(pattern, options);
    }
    if (typeof pattern !== "string") {
      throw new TypeError("glob pattern string required");
    }
    if (!options)
      options = {};
    pattern = pattern.trim();
    if (path2.sep !== "/") {
      pattern = pattern.split(path2.sep).join("/");
    }
    this.options = options;
    this.set = [];
    this.pattern = pattern;
    this.regexp = null;
    this.negate = false;
    this.comment = false;
    this.empty = false;
    this.make();
  }
  Minimatch.prototype.debug = function() {
  };
  Minimatch.prototype.make = make;
  function make() {
    if (this._made)
      return;
    var pattern = this.pattern;
    var options = this.options;
    if (!options.nocomment && pattern.charAt(0) === "#") {
      this.comment = true;
      return;
    }
    if (!pattern) {
      this.empty = true;
      return;
    }
    this.parseNegate();
    var set = this.globSet = this.braceExpand();
    if (options.debug)
      this.debug = console.error;
    this.debug(this.pattern, set);
    set = this.globParts = set.map(function(s) {
      return s.split(slashSplit);
    });
    this.debug(this.pattern, set);
    set = set.map(function(s, si, set2) {
      return s.map(this.parse, this);
    }, this);
    this.debug(this.pattern, set);
    set = set.filter(function(s) {
      return s.indexOf(false) === -1;
    });
    this.debug(this.pattern, set);
    this.set = set;
  }
  Minimatch.prototype.parseNegate = parseNegate;
  function parseNegate() {
    var pattern = this.pattern;
    var negate = false;
    var options = this.options;
    var negateOffset = 0;
    if (options.nonegate)
      return;
    for (var i = 0, l = pattern.length; i < l && pattern.charAt(i) === "!"; i++) {
      negate = !negate;
      negateOffset++;
    }
    if (negateOffset)
      this.pattern = pattern.substr(negateOffset);
    this.negate = negate;
  }
  minimatch.braceExpand = function(pattern, options) {
    return braceExpand(pattern, options);
  };
  Minimatch.prototype.braceExpand = braceExpand;
  function braceExpand(pattern, options) {
    if (!options) {
      if (this instanceof Minimatch) {
        options = this.options;
      } else {
        options = {};
      }
    }
    pattern = typeof pattern === "undefined" ? this.pattern : pattern;
    if (typeof pattern === "undefined") {
      throw new TypeError("undefined pattern");
    }
    if (options.nobrace || !pattern.match(/\{.*\}/)) {
      return [pattern];
    }
    return expand(pattern);
  }
  Minimatch.prototype.parse = parse;
  var SUBPARSE = {};
  function parse(pattern, isSub) {
    if (pattern.length > 1024 * 64) {
      throw new TypeError("pattern is too long");
    }
    var options = this.options;
    if (!options.noglobstar && pattern === "**")
      return GLOBSTAR;
    if (pattern === "")
      return "";
    var re = "";
    var hasMagic = !!options.nocase;
    var escaping = false;
    var patternListStack = [];
    var negativeLists = [];
    var stateChar;
    var inClass = false;
    var reClassStart = -1;
    var classStart = -1;
    var patternStart = pattern.charAt(0) === "." ? "" : options.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)";
    var self = this;
    function clearStateChar() {
      if (stateChar) {
        switch (stateChar) {
          case "*":
            re += star;
            hasMagic = true;
            break;
          case "?":
            re += qmark;
            hasMagic = true;
            break;
          default:
            re += "\\" + stateChar;
            break;
        }
        self.debug("clearStateChar %j %j", stateChar, re);
        stateChar = false;
      }
    }
    for (var i = 0, len = pattern.length, c; i < len && (c = pattern.charAt(i)); i++) {
      this.debug("%s	%s %s %j", pattern, i, re, c);
      if (escaping && reSpecials[c]) {
        re += "\\" + c;
        escaping = false;
        continue;
      }
      switch (c) {
        case "/":
          return false;
        case "\\":
          clearStateChar();
          escaping = true;
          continue;
        case "?":
        case "*":
        case "+":
        case "@":
        case "!":
          this.debug("%s	%s %s %j <-- stateChar", pattern, i, re, c);
          if (inClass) {
            this.debug("  in class");
            if (c === "!" && i === classStart + 1)
              c = "^";
            re += c;
            continue;
          }
          self.debug("call clearStateChar %j", stateChar);
          clearStateChar();
          stateChar = c;
          if (options.noext)
            clearStateChar();
          continue;
        case "(":
          if (inClass) {
            re += "(";
            continue;
          }
          if (!stateChar) {
            re += "\\(";
            continue;
          }
          patternListStack.push({
            type: stateChar,
            start: i - 1,
            reStart: re.length,
            open: plTypes[stateChar].open,
            close: plTypes[stateChar].close
          });
          re += stateChar === "!" ? "(?:(?!(?:" : "(?:";
          this.debug("plType %j %j", stateChar, re);
          stateChar = false;
          continue;
        case ")":
          if (inClass || !patternListStack.length) {
            re += "\\)";
            continue;
          }
          clearStateChar();
          hasMagic = true;
          var pl = patternListStack.pop();
          re += pl.close;
          if (pl.type === "!") {
            negativeLists.push(pl);
          }
          pl.reEnd = re.length;
          continue;
        case "|":
          if (inClass || !patternListStack.length || escaping) {
            re += "\\|";
            escaping = false;
            continue;
          }
          clearStateChar();
          re += "|";
          continue;
        case "[":
          clearStateChar();
          if (inClass) {
            re += "\\" + c;
            continue;
          }
          inClass = true;
          classStart = i;
          reClassStart = re.length;
          re += c;
          continue;
        case "]":
          if (i === classStart + 1 || !inClass) {
            re += "\\" + c;
            escaping = false;
            continue;
          }
          if (inClass) {
            var cs = pattern.substring(classStart + 1, i);
            try {
              RegExp("[" + cs + "]");
            } catch (er) {
              var sp = this.parse(cs, SUBPARSE);
              re = re.substr(0, reClassStart) + "\\[" + sp[0] + "\\]";
              hasMagic = hasMagic || sp[1];
              inClass = false;
              continue;
            }
          }
          hasMagic = true;
          inClass = false;
          re += c;
          continue;
        default:
          clearStateChar();
          if (escaping) {
            escaping = false;
          } else if (reSpecials[c] && !(c === "^" && inClass)) {
            re += "\\";
          }
          re += c;
      }
    }
    if (inClass) {
      cs = pattern.substr(classStart + 1);
      sp = this.parse(cs, SUBPARSE);
      re = re.substr(0, reClassStart) + "\\[" + sp[0];
      hasMagic = hasMagic || sp[1];
    }
    for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
      var tail = re.slice(pl.reStart + pl.open.length);
      this.debug("setting tail", re, pl);
      tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function(_, $1, $2) {
        if (!$2) {
          $2 = "\\";
        }
        return $1 + $1 + $2 + "|";
      });
      this.debug("tail=%j\n   %s", tail, tail, pl, re);
      var t = pl.type === "*" ? star : pl.type === "?" ? qmark : "\\" + pl.type;
      hasMagic = true;
      re = re.slice(0, pl.reStart) + t + "\\(" + tail;
    }
    clearStateChar();
    if (escaping) {
      re += "\\\\";
    }
    var addPatternStart = false;
    switch (re.charAt(0)) {
      case ".":
      case "[":
      case "(":
        addPatternStart = true;
    }
    for (var n = negativeLists.length - 1; n > -1; n--) {
      var nl = negativeLists[n];
      var nlBefore = re.slice(0, nl.reStart);
      var nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
      var nlLast = re.slice(nl.reEnd - 8, nl.reEnd);
      var nlAfter = re.slice(nl.reEnd);
      nlLast += nlAfter;
      var openParensBefore = nlBefore.split("(").length - 1;
      var cleanAfter = nlAfter;
      for (i = 0; i < openParensBefore; i++) {
        cleanAfter = cleanAfter.replace(/\)[+*?]?/, "");
      }
      nlAfter = cleanAfter;
      var dollar = "";
      if (nlAfter === "" && isSub !== SUBPARSE) {
        dollar = "$";
      }
      var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast;
      re = newRe;
    }
    if (re !== "" && hasMagic) {
      re = "(?=.)" + re;
    }
    if (addPatternStart) {
      re = patternStart + re;
    }
    if (isSub === SUBPARSE) {
      return [re, hasMagic];
    }
    if (!hasMagic) {
      return globUnescape(pattern);
    }
    var flags = options.nocase ? "i" : "";
    try {
      var regExp = new RegExp("^" + re + "$", flags);
    } catch (er) {
      return new RegExp("$.");
    }
    regExp._glob = pattern;
    regExp._src = re;
    return regExp;
  }
  minimatch.makeRe = function(pattern, options) {
    return new Minimatch(pattern, options || {}).makeRe();
  };
  Minimatch.prototype.makeRe = makeRe;
  function makeRe() {
    if (this.regexp || this.regexp === false)
      return this.regexp;
    var set = this.set;
    if (!set.length) {
      this.regexp = false;
      return this.regexp;
    }
    var options = this.options;
    var twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
    var flags = options.nocase ? "i" : "";
    var re = set.map(function(pattern) {
      return pattern.map(function(p) {
        return p === GLOBSTAR ? twoStar : typeof p === "string" ? regExpEscape(p) : p._src;
      }).join("\\/");
    }).join("|");
    re = "^(?:" + re + ")$";
    if (this.negate)
      re = "^(?!" + re + ").*$";
    try {
      this.regexp = new RegExp(re, flags);
    } catch (ex) {
      this.regexp = false;
    }
    return this.regexp;
  }
  minimatch.match = function(list, pattern, options) {
    options = options || {};
    var mm = new Minimatch(pattern, options);
    list = list.filter(function(f) {
      return mm.match(f);
    });
    if (mm.options.nonull && !list.length) {
      list.push(pattern);
    }
    return list;
  };
  Minimatch.prototype.match = match;
  function match(f, partial) {
    this.debug("match", f, this.pattern);
    if (this.comment)
      return false;
    if (this.empty)
      return f === "";
    if (f === "/" && partial)
      return true;
    var options = this.options;
    if (path2.sep !== "/") {
      f = f.split(path2.sep).join("/");
    }
    f = f.split(slashSplit);
    this.debug(this.pattern, "split", f);
    var set = this.set;
    this.debug(this.pattern, "set", set);
    var filename;
    var i;
    for (i = f.length - 1; i >= 0; i--) {
      filename = f[i];
      if (filename)
        break;
    }
    for (i = 0; i < set.length; i++) {
      var pattern = set[i];
      var file = f;
      if (options.matchBase && pattern.length === 1) {
        file = [filename];
      }
      var hit = this.matchOne(file, pattern, partial);
      if (hit) {
        if (options.flipNegate)
          return true;
        return !this.negate;
      }
    }
    if (options.flipNegate)
      return false;
    return this.negate;
  }
  Minimatch.prototype.matchOne = function(file, pattern, partial) {
    var options = this.options;
    this.debug("matchOne", {this: this, file, pattern});
    this.debug("matchOne", file.length, pattern.length);
    for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
      this.debug("matchOne loop");
      var p = pattern[pi];
      var f = file[fi];
      this.debug(pattern, p, f);
      if (p === false)
        return false;
      if (p === GLOBSTAR) {
        this.debug("GLOBSTAR", [pattern, p, f]);
        var fr = fi;
        var pr = pi + 1;
        if (pr === pl) {
          this.debug("** at the end");
          for (; fi < fl; fi++) {
            if (file[fi] === "." || file[fi] === ".." || !options.dot && file[fi].charAt(0) === ".")
              return false;
          }
          return true;
        }
        while (fr < fl) {
          var swallowee = file[fr];
          this.debug("\nglobstar while", file, fr, pattern, pr, swallowee);
          if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
            this.debug("globstar found match!", fr, fl, swallowee);
            return true;
          } else {
            if (swallowee === "." || swallowee === ".." || !options.dot && swallowee.charAt(0) === ".") {
              this.debug("dot detected!", file, fr, pattern, pr);
              break;
            }
            this.debug("globstar swallow a segment, and continue");
            fr++;
          }
        }
        if (partial) {
          this.debug("\n>>> no match, partial?", file, fr, pattern, pr);
          if (fr === fl)
            return true;
        }
        return false;
      }
      var hit;
      if (typeof p === "string") {
        if (options.nocase) {
          hit = f.toLowerCase() === p.toLowerCase();
        } else {
          hit = f === p;
        }
        this.debug("string match", p, f, hit);
      } else {
        hit = f.match(p);
        this.debug("pattern match", p, f, hit);
      }
      if (!hit)
        return false;
    }
    if (fi === fl && pi === pl) {
      return true;
    } else if (fi === fl) {
      return partial;
    } else if (pi === pl) {
      var emptyFileEnd = fi === fl - 1 && file[fi] === "";
      return emptyFileEnd;
    }
    throw new Error("wtf?");
  };
  function globUnescape(s) {
    return s.replace(/\\(.)/g, "$1");
  }
  function regExpEscape(s) {
    return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
});

// ../../node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS((exports2, module2) => {
  if (typeof Object.create === "function") {
    module2.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      }
    };
  } else {
    module2.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
    };
  }
});

// ../../node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits.js
var require_inherits = __commonJS((exports2, module2) => {
  try {
    util = require("util");
    if (typeof util.inherits !== "function")
      throw "";
    module2.exports = util.inherits;
  } catch (e) {
    module2.exports = require_inherits_browser();
  }
  var util;
});

// ../../node_modules/.pnpm/path-is-absolute@1.0.1/node_modules/path-is-absolute/index.js
var require_path_is_absolute = __commonJS((exports2, module2) => {
  "use strict";
  function posix(path2) {
    return path2.charAt(0) === "/";
  }
  function win32(path2) {
    var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
    var result = splitDeviceRe.exec(path2);
    var device = result[1] || "";
    var isUnc = Boolean(device && device.charAt(1) !== ":");
    return Boolean(result[2] || isUnc);
  }
  module2.exports = process.platform === "win32" ? win32 : posix;
  module2.exports.posix = posix;
  module2.exports.win32 = win32;
});

// ../../node_modules/.pnpm/glob@7.1.6/node_modules/glob/common.js
var require_common2 = __commonJS((exports2) => {
  exports2.alphasort = alphasort;
  exports2.alphasorti = alphasorti;
  exports2.setopts = setopts;
  exports2.ownProp = ownProp;
  exports2.makeAbs = makeAbs;
  exports2.finish = finish;
  exports2.mark = mark;
  exports2.isIgnored = isIgnored;
  exports2.childrenIgnored = childrenIgnored;
  function ownProp(obj, field) {
    return Object.prototype.hasOwnProperty.call(obj, field);
  }
  var path2 = require("path");
  var minimatch = require_minimatch();
  var isAbsolute = require_path_is_absolute();
  var Minimatch = minimatch.Minimatch;
  function alphasorti(a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  }
  function alphasort(a, b) {
    return a.localeCompare(b);
  }
  function setupIgnores(self, options) {
    self.ignore = options.ignore || [];
    if (!Array.isArray(self.ignore))
      self.ignore = [self.ignore];
    if (self.ignore.length) {
      self.ignore = self.ignore.map(ignoreMap);
    }
  }
  function ignoreMap(pattern) {
    var gmatcher = null;
    if (pattern.slice(-3) === "/**") {
      var gpattern = pattern.replace(/(\/\*\*)+$/, "");
      gmatcher = new Minimatch(gpattern, {dot: true});
    }
    return {
      matcher: new Minimatch(pattern, {dot: true}),
      gmatcher
    };
  }
  function setopts(self, pattern, options) {
    if (!options)
      options = {};
    if (options.matchBase && pattern.indexOf("/") === -1) {
      if (options.noglobstar) {
        throw new Error("base matching requires globstar");
      }
      pattern = "**/" + pattern;
    }
    self.silent = !!options.silent;
    self.pattern = pattern;
    self.strict = options.strict !== false;
    self.realpath = !!options.realpath;
    self.realpathCache = options.realpathCache || Object.create(null);
    self.follow = !!options.follow;
    self.dot = !!options.dot;
    self.mark = !!options.mark;
    self.nodir = !!options.nodir;
    if (self.nodir)
      self.mark = true;
    self.sync = !!options.sync;
    self.nounique = !!options.nounique;
    self.nonull = !!options.nonull;
    self.nosort = !!options.nosort;
    self.nocase = !!options.nocase;
    self.stat = !!options.stat;
    self.noprocess = !!options.noprocess;
    self.absolute = !!options.absolute;
    self.maxLength = options.maxLength || Infinity;
    self.cache = options.cache || Object.create(null);
    self.statCache = options.statCache || Object.create(null);
    self.symlinks = options.symlinks || Object.create(null);
    setupIgnores(self, options);
    self.changedCwd = false;
    var cwd = process.cwd();
    if (!ownProp(options, "cwd"))
      self.cwd = cwd;
    else {
      self.cwd = path2.resolve(options.cwd);
      self.changedCwd = self.cwd !== cwd;
    }
    self.root = options.root || path2.resolve(self.cwd, "/");
    self.root = path2.resolve(self.root);
    if (process.platform === "win32")
      self.root = self.root.replace(/\\/g, "/");
    self.cwdAbs = isAbsolute(self.cwd) ? self.cwd : makeAbs(self, self.cwd);
    if (process.platform === "win32")
      self.cwdAbs = self.cwdAbs.replace(/\\/g, "/");
    self.nomount = !!options.nomount;
    options.nonegate = true;
    options.nocomment = true;
    self.minimatch = new Minimatch(pattern, options);
    self.options = self.minimatch.options;
  }
  function finish(self) {
    var nou = self.nounique;
    var all = nou ? [] : Object.create(null);
    for (var i = 0, l = self.matches.length; i < l; i++) {
      var matches = self.matches[i];
      if (!matches || Object.keys(matches).length === 0) {
        if (self.nonull) {
          var literal = self.minimatch.globSet[i];
          if (nou)
            all.push(literal);
          else
            all[literal] = true;
        }
      } else {
        var m = Object.keys(matches);
        if (nou)
          all.push.apply(all, m);
        else
          m.forEach(function(m2) {
            all[m2] = true;
          });
      }
    }
    if (!nou)
      all = Object.keys(all);
    if (!self.nosort)
      all = all.sort(self.nocase ? alphasorti : alphasort);
    if (self.mark) {
      for (var i = 0; i < all.length; i++) {
        all[i] = self._mark(all[i]);
      }
      if (self.nodir) {
        all = all.filter(function(e) {
          var notDir = !/\/$/.test(e);
          var c = self.cache[e] || self.cache[makeAbs(self, e)];
          if (notDir && c)
            notDir = c !== "DIR" && !Array.isArray(c);
          return notDir;
        });
      }
    }
    if (self.ignore.length)
      all = all.filter(function(m2) {
        return !isIgnored(self, m2);
      });
    self.found = all;
  }
  function mark(self, p) {
    var abs = makeAbs(self, p);
    var c = self.cache[abs];
    var m = p;
    if (c) {
      var isDir = c === "DIR" || Array.isArray(c);
      var slash = p.slice(-1) === "/";
      if (isDir && !slash)
        m += "/";
      else if (!isDir && slash)
        m = m.slice(0, -1);
      if (m !== p) {
        var mabs = makeAbs(self, m);
        self.statCache[mabs] = self.statCache[abs];
        self.cache[mabs] = self.cache[abs];
      }
    }
    return m;
  }
  function makeAbs(self, f) {
    var abs = f;
    if (f.charAt(0) === "/") {
      abs = path2.join(self.root, f);
    } else if (isAbsolute(f) || f === "") {
      abs = f;
    } else if (self.changedCwd) {
      abs = path2.resolve(self.cwd, f);
    } else {
      abs = path2.resolve(f);
    }
    if (process.platform === "win32")
      abs = abs.replace(/\\/g, "/");
    return abs;
  }
  function isIgnored(self, path3) {
    if (!self.ignore.length)
      return false;
    return self.ignore.some(function(item) {
      return item.matcher.match(path3) || !!(item.gmatcher && item.gmatcher.match(path3));
    });
  }
  function childrenIgnored(self, path3) {
    if (!self.ignore.length)
      return false;
    return self.ignore.some(function(item) {
      return !!(item.gmatcher && item.gmatcher.match(path3));
    });
  }
});

// ../../node_modules/.pnpm/glob@7.1.6/node_modules/glob/sync.js
var require_sync = __commonJS((exports2, module2) => {
  module2.exports = globSync;
  globSync.GlobSync = GlobSync;
  var fs = require("fs");
  var rp = require_fs();
  var minimatch = require_minimatch();
  var Minimatch = minimatch.Minimatch;
  var Glob = require_glob().Glob;
  var util = require("util");
  var path2 = require("path");
  var assert = require("assert");
  var isAbsolute = require_path_is_absolute();
  var common = require_common2();
  var alphasort = common.alphasort;
  var alphasorti = common.alphasorti;
  var setopts = common.setopts;
  var ownProp = common.ownProp;
  var childrenIgnored = common.childrenIgnored;
  var isIgnored = common.isIgnored;
  function globSync(pattern, options) {
    if (typeof options === "function" || arguments.length === 3)
      throw new TypeError("callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167");
    return new GlobSync(pattern, options).found;
  }
  function GlobSync(pattern, options) {
    if (!pattern)
      throw new Error("must provide pattern");
    if (typeof options === "function" || arguments.length === 3)
      throw new TypeError("callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167");
    if (!(this instanceof GlobSync))
      return new GlobSync(pattern, options);
    setopts(this, pattern, options);
    if (this.noprocess)
      return this;
    var n = this.minimatch.set.length;
    this.matches = new Array(n);
    for (var i = 0; i < n; i++) {
      this._process(this.minimatch.set[i], i, false);
    }
    this._finish();
  }
  GlobSync.prototype._finish = function() {
    assert(this instanceof GlobSync);
    if (this.realpath) {
      var self = this;
      this.matches.forEach(function(matchset, index) {
        var set = self.matches[index] = Object.create(null);
        for (var p in matchset) {
          try {
            p = self._makeAbs(p);
            var real = rp.realpathSync(p, self.realpathCache);
            set[real] = true;
          } catch (er) {
            if (er.syscall === "stat")
              set[self._makeAbs(p)] = true;
            else
              throw er;
          }
        }
      });
    }
    common.finish(this);
  };
  GlobSync.prototype._process = function(pattern, index, inGlobStar) {
    assert(this instanceof GlobSync);
    var n = 0;
    while (typeof pattern[n] === "string") {
      n++;
    }
    var prefix;
    switch (n) {
      case pattern.length:
        this._processSimple(pattern.join("/"), index);
        return;
      case 0:
        prefix = null;
        break;
      default:
        prefix = pattern.slice(0, n).join("/");
        break;
    }
    var remain = pattern.slice(n);
    var read;
    if (prefix === null)
      read = ".";
    else if (isAbsolute(prefix) || isAbsolute(pattern.join("/"))) {
      if (!prefix || !isAbsolute(prefix))
        prefix = "/" + prefix;
      read = prefix;
    } else
      read = prefix;
    var abs = this._makeAbs(read);
    if (childrenIgnored(this, read))
      return;
    var isGlobStar = remain[0] === minimatch.GLOBSTAR;
    if (isGlobStar)
      this._processGlobStar(prefix, read, abs, remain, index, inGlobStar);
    else
      this._processReaddir(prefix, read, abs, remain, index, inGlobStar);
  };
  GlobSync.prototype._processReaddir = function(prefix, read, abs, remain, index, inGlobStar) {
    var entries = this._readdir(abs, inGlobStar);
    if (!entries)
      return;
    var pn = remain[0];
    var negate = !!this.minimatch.negate;
    var rawGlob = pn._glob;
    var dotOk = this.dot || rawGlob.charAt(0) === ".";
    var matchedEntries = [];
    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];
      if (e.charAt(0) !== "." || dotOk) {
        var m;
        if (negate && !prefix) {
          m = !e.match(pn);
        } else {
          m = e.match(pn);
        }
        if (m)
          matchedEntries.push(e);
      }
    }
    var len = matchedEntries.length;
    if (len === 0)
      return;
    if (remain.length === 1 && !this.mark && !this.stat) {
      if (!this.matches[index])
        this.matches[index] = Object.create(null);
      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];
        if (prefix) {
          if (prefix.slice(-1) !== "/")
            e = prefix + "/" + e;
          else
            e = prefix + e;
        }
        if (e.charAt(0) === "/" && !this.nomount) {
          e = path2.join(this.root, e);
        }
        this._emitMatch(index, e);
      }
      return;
    }
    remain.shift();
    for (var i = 0; i < len; i++) {
      var e = matchedEntries[i];
      var newPattern;
      if (prefix)
        newPattern = [prefix, e];
      else
        newPattern = [e];
      this._process(newPattern.concat(remain), index, inGlobStar);
    }
  };
  GlobSync.prototype._emitMatch = function(index, e) {
    if (isIgnored(this, e))
      return;
    var abs = this._makeAbs(e);
    if (this.mark)
      e = this._mark(e);
    if (this.absolute) {
      e = abs;
    }
    if (this.matches[index][e])
      return;
    if (this.nodir) {
      var c = this.cache[abs];
      if (c === "DIR" || Array.isArray(c))
        return;
    }
    this.matches[index][e] = true;
    if (this.stat)
      this._stat(e);
  };
  GlobSync.prototype._readdirInGlobStar = function(abs) {
    if (this.follow)
      return this._readdir(abs, false);
    var entries;
    var lstat;
    var stat;
    try {
      lstat = fs.lstatSync(abs);
    } catch (er) {
      if (er.code === "ENOENT") {
        return null;
      }
    }
    var isSym = lstat && lstat.isSymbolicLink();
    this.symlinks[abs] = isSym;
    if (!isSym && lstat && !lstat.isDirectory())
      this.cache[abs] = "FILE";
    else
      entries = this._readdir(abs, false);
    return entries;
  };
  GlobSync.prototype._readdir = function(abs, inGlobStar) {
    var entries;
    if (inGlobStar && !ownProp(this.symlinks, abs))
      return this._readdirInGlobStar(abs);
    if (ownProp(this.cache, abs)) {
      var c = this.cache[abs];
      if (!c || c === "FILE")
        return null;
      if (Array.isArray(c))
        return c;
    }
    try {
      return this._readdirEntries(abs, fs.readdirSync(abs));
    } catch (er) {
      this._readdirError(abs, er);
      return null;
    }
  };
  GlobSync.prototype._readdirEntries = function(abs, entries) {
    if (!this.mark && !this.stat) {
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (abs === "/")
          e = abs + e;
        else
          e = abs + "/" + e;
        this.cache[e] = true;
      }
    }
    this.cache[abs] = entries;
    return entries;
  };
  GlobSync.prototype._readdirError = function(f, er) {
    switch (er.code) {
      case "ENOTSUP":
      case "ENOTDIR":
        var abs = this._makeAbs(f);
        this.cache[abs] = "FILE";
        if (abs === this.cwdAbs) {
          var error = new Error(er.code + " invalid cwd " + this.cwd);
          error.path = this.cwd;
          error.code = er.code;
          throw error;
        }
        break;
      case "ENOENT":
      case "ELOOP":
      case "ENAMETOOLONG":
      case "UNKNOWN":
        this.cache[this._makeAbs(f)] = false;
        break;
      default:
        this.cache[this._makeAbs(f)] = false;
        if (this.strict)
          throw er;
        if (!this.silent)
          console.error("glob error", er);
        break;
    }
  };
  GlobSync.prototype._processGlobStar = function(prefix, read, abs, remain, index, inGlobStar) {
    var entries = this._readdir(abs, inGlobStar);
    if (!entries)
      return;
    var remainWithoutGlobStar = remain.slice(1);
    var gspref = prefix ? [prefix] : [];
    var noGlobStar = gspref.concat(remainWithoutGlobStar);
    this._process(noGlobStar, index, false);
    var len = entries.length;
    var isSym = this.symlinks[abs];
    if (isSym && inGlobStar)
      return;
    for (var i = 0; i < len; i++) {
      var e = entries[i];
      if (e.charAt(0) === "." && !this.dot)
        continue;
      var instead = gspref.concat(entries[i], remainWithoutGlobStar);
      this._process(instead, index, true);
      var below = gspref.concat(entries[i], remain);
      this._process(below, index, true);
    }
  };
  GlobSync.prototype._processSimple = function(prefix, index) {
    var exists2 = this._stat(prefix);
    if (!this.matches[index])
      this.matches[index] = Object.create(null);
    if (!exists2)
      return;
    if (prefix && isAbsolute(prefix) && !this.nomount) {
      var trail = /[\/\\]$/.test(prefix);
      if (prefix.charAt(0) === "/") {
        prefix = path2.join(this.root, prefix);
      } else {
        prefix = path2.resolve(this.root, prefix);
        if (trail)
          prefix += "/";
      }
    }
    if (process.platform === "win32")
      prefix = prefix.replace(/\\/g, "/");
    this._emitMatch(index, prefix);
  };
  GlobSync.prototype._stat = function(f) {
    var abs = this._makeAbs(f);
    var needDir = f.slice(-1) === "/";
    if (f.length > this.maxLength)
      return false;
    if (!this.stat && ownProp(this.cache, abs)) {
      var c = this.cache[abs];
      if (Array.isArray(c))
        c = "DIR";
      if (!needDir || c === "DIR")
        return c;
      if (needDir && c === "FILE")
        return false;
    }
    var exists2;
    var stat = this.statCache[abs];
    if (!stat) {
      var lstat;
      try {
        lstat = fs.lstatSync(abs);
      } catch (er) {
        if (er && (er.code === "ENOENT" || er.code === "ENOTDIR")) {
          this.statCache[abs] = false;
          return false;
        }
      }
      if (lstat && lstat.isSymbolicLink()) {
        try {
          stat = fs.statSync(abs);
        } catch (er) {
          stat = lstat;
        }
      } else {
        stat = lstat;
      }
    }
    this.statCache[abs] = stat;
    var c = true;
    if (stat)
      c = stat.isDirectory() ? "DIR" : "FILE";
    this.cache[abs] = this.cache[abs] || c;
    if (needDir && c === "FILE")
      return false;
    return c;
  };
  GlobSync.prototype._mark = function(p) {
    return common.mark(this, p);
  };
  GlobSync.prototype._makeAbs = function(f) {
    return common.makeAbs(this, f);
  };
});

// ../../node_modules/.pnpm/wrappy@1.0.2/node_modules/wrappy/wrappy.js
var require_wrappy = __commonJS((exports2, module2) => {
  module2.exports = wrappy;
  function wrappy(fn, cb) {
    if (fn && cb)
      return wrappy(fn)(cb);
    if (typeof fn !== "function")
      throw new TypeError("need wrapper function");
    Object.keys(fn).forEach(function(k) {
      wrapper[k] = fn[k];
    });
    return wrapper;
    function wrapper() {
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }
      var ret = fn.apply(this, args);
      var cb2 = args[args.length - 1];
      if (typeof ret === "function" && ret !== cb2) {
        Object.keys(cb2).forEach(function(k) {
          ret[k] = cb2[k];
        });
      }
      return ret;
    }
  }
});

// ../../node_modules/.pnpm/once@1.4.0/node_modules/once/once.js
var require_once = __commonJS((exports2, module2) => {
  var wrappy = require_wrappy();
  module2.exports = wrappy(once);
  module2.exports.strict = wrappy(onceStrict);
  once.proto = once(function() {
    Object.defineProperty(Function.prototype, "once", {
      value: function() {
        return once(this);
      },
      configurable: true
    });
    Object.defineProperty(Function.prototype, "onceStrict", {
      value: function() {
        return onceStrict(this);
      },
      configurable: true
    });
  });
  function once(fn) {
    var f = function() {
      if (f.called)
        return f.value;
      f.called = true;
      return f.value = fn.apply(this, arguments);
    };
    f.called = false;
    return f;
  }
  function onceStrict(fn) {
    var f = function() {
      if (f.called)
        throw new Error(f.onceError);
      f.called = true;
      return f.value = fn.apply(this, arguments);
    };
    var name = fn.name || "Function wrapped with `once`";
    f.onceError = name + " shouldn't be called more than once";
    f.called = false;
    return f;
  }
});

// ../../node_modules/.pnpm/inflight@1.0.6/node_modules/inflight/inflight.js
var require_inflight = __commonJS((exports2, module2) => {
  var wrappy = require_wrappy();
  var reqs = Object.create(null);
  var once = require_once();
  module2.exports = wrappy(inflight);
  function inflight(key, cb) {
    if (reqs[key]) {
      reqs[key].push(cb);
      return null;
    } else {
      reqs[key] = [cb];
      return makeres(key);
    }
  }
  function makeres(key) {
    return once(function RES() {
      var cbs = reqs[key];
      var len = cbs.length;
      var args = slice(arguments);
      try {
        for (var i = 0; i < len; i++) {
          cbs[i].apply(null, args);
        }
      } finally {
        if (cbs.length > len) {
          cbs.splice(0, len);
          process.nextTick(function() {
            RES.apply(null, args);
          });
        } else {
          delete reqs[key];
        }
      }
    });
  }
  function slice(args) {
    var length = args.length;
    var array = [];
    for (var i = 0; i < length; i++)
      array[i] = args[i];
    return array;
  }
});

// ../../node_modules/.pnpm/glob@7.1.6/node_modules/glob/glob.js
var require_glob = __commonJS((exports2, module2) => {
  module2.exports = glob;
  var fs = require("fs");
  var rp = require_fs();
  var minimatch = require_minimatch();
  var Minimatch = minimatch.Minimatch;
  var inherits = require_inherits();
  var EE = require("events").EventEmitter;
  var path2 = require("path");
  var assert = require("assert");
  var isAbsolute = require_path_is_absolute();
  var globSync = require_sync();
  var common = require_common2();
  var alphasort = common.alphasort;
  var alphasorti = common.alphasorti;
  var setopts = common.setopts;
  var ownProp = common.ownProp;
  var inflight = require_inflight();
  var util = require("util");
  var childrenIgnored = common.childrenIgnored;
  var isIgnored = common.isIgnored;
  var once = require_once();
  function glob(pattern, options, cb) {
    if (typeof options === "function")
      cb = options, options = {};
    if (!options)
      options = {};
    if (options.sync) {
      if (cb)
        throw new TypeError("callback provided to sync glob");
      return globSync(pattern, options);
    }
    return new Glob(pattern, options, cb);
  }
  glob.sync = globSync;
  var GlobSync = glob.GlobSync = globSync.GlobSync;
  glob.glob = glob;
  function extend(origin, add) {
    if (add === null || typeof add !== "object") {
      return origin;
    }
    var keys = Object.keys(add);
    var i = keys.length;
    while (i--) {
      origin[keys[i]] = add[keys[i]];
    }
    return origin;
  }
  glob.hasMagic = function(pattern, options_) {
    var options = extend({}, options_);
    options.noprocess = true;
    var g = new Glob(pattern, options);
    var set = g.minimatch.set;
    if (!pattern)
      return false;
    if (set.length > 1)
      return true;
    for (var j = 0; j < set[0].length; j++) {
      if (typeof set[0][j] !== "string")
        return true;
    }
    return false;
  };
  glob.Glob = Glob;
  inherits(Glob, EE);
  function Glob(pattern, options, cb) {
    if (typeof options === "function") {
      cb = options;
      options = null;
    }
    if (options && options.sync) {
      if (cb)
        throw new TypeError("callback provided to sync glob");
      return new GlobSync(pattern, options);
    }
    if (!(this instanceof Glob))
      return new Glob(pattern, options, cb);
    setopts(this, pattern, options);
    this._didRealPath = false;
    var n = this.minimatch.set.length;
    this.matches = new Array(n);
    if (typeof cb === "function") {
      cb = once(cb);
      this.on("error", cb);
      this.on("end", function(matches) {
        cb(null, matches);
      });
    }
    var self = this;
    this._processing = 0;
    this._emitQueue = [];
    this._processQueue = [];
    this.paused = false;
    if (this.noprocess)
      return this;
    if (n === 0)
      return done();
    var sync = true;
    for (var i = 0; i < n; i++) {
      this._process(this.minimatch.set[i], i, false, done);
    }
    sync = false;
    function done() {
      --self._processing;
      if (self._processing <= 0) {
        if (sync) {
          process.nextTick(function() {
            self._finish();
          });
        } else {
          self._finish();
        }
      }
    }
  }
  Glob.prototype._finish = function() {
    assert(this instanceof Glob);
    if (this.aborted)
      return;
    if (this.realpath && !this._didRealpath)
      return this._realpath();
    common.finish(this);
    this.emit("end", this.found);
  };
  Glob.prototype._realpath = function() {
    if (this._didRealpath)
      return;
    this._didRealpath = true;
    var n = this.matches.length;
    if (n === 0)
      return this._finish();
    var self = this;
    for (var i = 0; i < this.matches.length; i++)
      this._realpathSet(i, next);
    function next() {
      if (--n === 0)
        self._finish();
    }
  };
  Glob.prototype._realpathSet = function(index, cb) {
    var matchset = this.matches[index];
    if (!matchset)
      return cb();
    var found = Object.keys(matchset);
    var self = this;
    var n = found.length;
    if (n === 0)
      return cb();
    var set = this.matches[index] = Object.create(null);
    found.forEach(function(p, i) {
      p = self._makeAbs(p);
      rp.realpath(p, self.realpathCache, function(er, real) {
        if (!er)
          set[real] = true;
        else if (er.syscall === "stat")
          set[p] = true;
        else
          self.emit("error", er);
        if (--n === 0) {
          self.matches[index] = set;
          cb();
        }
      });
    });
  };
  Glob.prototype._mark = function(p) {
    return common.mark(this, p);
  };
  Glob.prototype._makeAbs = function(f) {
    return common.makeAbs(this, f);
  };
  Glob.prototype.abort = function() {
    this.aborted = true;
    this.emit("abort");
  };
  Glob.prototype.pause = function() {
    if (!this.paused) {
      this.paused = true;
      this.emit("pause");
    }
  };
  Glob.prototype.resume = function() {
    if (this.paused) {
      this.emit("resume");
      this.paused = false;
      if (this._emitQueue.length) {
        var eq = this._emitQueue.slice(0);
        this._emitQueue.length = 0;
        for (var i = 0; i < eq.length; i++) {
          var e = eq[i];
          this._emitMatch(e[0], e[1]);
        }
      }
      if (this._processQueue.length) {
        var pq = this._processQueue.slice(0);
        this._processQueue.length = 0;
        for (var i = 0; i < pq.length; i++) {
          var p = pq[i];
          this._processing--;
          this._process(p[0], p[1], p[2], p[3]);
        }
      }
    }
  };
  Glob.prototype._process = function(pattern, index, inGlobStar, cb) {
    assert(this instanceof Glob);
    assert(typeof cb === "function");
    if (this.aborted)
      return;
    this._processing++;
    if (this.paused) {
      this._processQueue.push([pattern, index, inGlobStar, cb]);
      return;
    }
    var n = 0;
    while (typeof pattern[n] === "string") {
      n++;
    }
    var prefix;
    switch (n) {
      case pattern.length:
        this._processSimple(pattern.join("/"), index, cb);
        return;
      case 0:
        prefix = null;
        break;
      default:
        prefix = pattern.slice(0, n).join("/");
        break;
    }
    var remain = pattern.slice(n);
    var read;
    if (prefix === null)
      read = ".";
    else if (isAbsolute(prefix) || isAbsolute(pattern.join("/"))) {
      if (!prefix || !isAbsolute(prefix))
        prefix = "/" + prefix;
      read = prefix;
    } else
      read = prefix;
    var abs = this._makeAbs(read);
    if (childrenIgnored(this, read))
      return cb();
    var isGlobStar = remain[0] === minimatch.GLOBSTAR;
    if (isGlobStar)
      this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb);
    else
      this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb);
  };
  Glob.prototype._processReaddir = function(prefix, read, abs, remain, index, inGlobStar, cb) {
    var self = this;
    this._readdir(abs, inGlobStar, function(er, entries) {
      return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
    });
  };
  Glob.prototype._processReaddir2 = function(prefix, read, abs, remain, index, inGlobStar, entries, cb) {
    if (!entries)
      return cb();
    var pn = remain[0];
    var negate = !!this.minimatch.negate;
    var rawGlob = pn._glob;
    var dotOk = this.dot || rawGlob.charAt(0) === ".";
    var matchedEntries = [];
    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];
      if (e.charAt(0) !== "." || dotOk) {
        var m;
        if (negate && !prefix) {
          m = !e.match(pn);
        } else {
          m = e.match(pn);
        }
        if (m)
          matchedEntries.push(e);
      }
    }
    var len = matchedEntries.length;
    if (len === 0)
      return cb();
    if (remain.length === 1 && !this.mark && !this.stat) {
      if (!this.matches[index])
        this.matches[index] = Object.create(null);
      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];
        if (prefix) {
          if (prefix !== "/")
            e = prefix + "/" + e;
          else
            e = prefix + e;
        }
        if (e.charAt(0) === "/" && !this.nomount) {
          e = path2.join(this.root, e);
        }
        this._emitMatch(index, e);
      }
      return cb();
    }
    remain.shift();
    for (var i = 0; i < len; i++) {
      var e = matchedEntries[i];
      var newPattern;
      if (prefix) {
        if (prefix !== "/")
          e = prefix + "/" + e;
        else
          e = prefix + e;
      }
      this._process([e].concat(remain), index, inGlobStar, cb);
    }
    cb();
  };
  Glob.prototype._emitMatch = function(index, e) {
    if (this.aborted)
      return;
    if (isIgnored(this, e))
      return;
    if (this.paused) {
      this._emitQueue.push([index, e]);
      return;
    }
    var abs = isAbsolute(e) ? e : this._makeAbs(e);
    if (this.mark)
      e = this._mark(e);
    if (this.absolute)
      e = abs;
    if (this.matches[index][e])
      return;
    if (this.nodir) {
      var c = this.cache[abs];
      if (c === "DIR" || Array.isArray(c))
        return;
    }
    this.matches[index][e] = true;
    var st = this.statCache[abs];
    if (st)
      this.emit("stat", e, st);
    this.emit("match", e);
  };
  Glob.prototype._readdirInGlobStar = function(abs, cb) {
    if (this.aborted)
      return;
    if (this.follow)
      return this._readdir(abs, false, cb);
    var lstatkey = "lstat\0" + abs;
    var self = this;
    var lstatcb = inflight(lstatkey, lstatcb_);
    if (lstatcb)
      fs.lstat(abs, lstatcb);
    function lstatcb_(er, lstat) {
      if (er && er.code === "ENOENT")
        return cb();
      var isSym = lstat && lstat.isSymbolicLink();
      self.symlinks[abs] = isSym;
      if (!isSym && lstat && !lstat.isDirectory()) {
        self.cache[abs] = "FILE";
        cb();
      } else
        self._readdir(abs, false, cb);
    }
  };
  Glob.prototype._readdir = function(abs, inGlobStar, cb) {
    if (this.aborted)
      return;
    cb = inflight("readdir\0" + abs + "\0" + inGlobStar, cb);
    if (!cb)
      return;
    if (inGlobStar && !ownProp(this.symlinks, abs))
      return this._readdirInGlobStar(abs, cb);
    if (ownProp(this.cache, abs)) {
      var c = this.cache[abs];
      if (!c || c === "FILE")
        return cb();
      if (Array.isArray(c))
        return cb(null, c);
    }
    var self = this;
    fs.readdir(abs, readdirCb(this, abs, cb));
  };
  function readdirCb(self, abs, cb) {
    return function(er, entries) {
      if (er)
        self._readdirError(abs, er, cb);
      else
        self._readdirEntries(abs, entries, cb);
    };
  }
  Glob.prototype._readdirEntries = function(abs, entries, cb) {
    if (this.aborted)
      return;
    if (!this.mark && !this.stat) {
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (abs === "/")
          e = abs + e;
        else
          e = abs + "/" + e;
        this.cache[e] = true;
      }
    }
    this.cache[abs] = entries;
    return cb(null, entries);
  };
  Glob.prototype._readdirError = function(f, er, cb) {
    if (this.aborted)
      return;
    switch (er.code) {
      case "ENOTSUP":
      case "ENOTDIR":
        var abs = this._makeAbs(f);
        this.cache[abs] = "FILE";
        if (abs === this.cwdAbs) {
          var error = new Error(er.code + " invalid cwd " + this.cwd);
          error.path = this.cwd;
          error.code = er.code;
          this.emit("error", error);
          this.abort();
        }
        break;
      case "ENOENT":
      case "ELOOP":
      case "ENAMETOOLONG":
      case "UNKNOWN":
        this.cache[this._makeAbs(f)] = false;
        break;
      default:
        this.cache[this._makeAbs(f)] = false;
        if (this.strict) {
          this.emit("error", er);
          this.abort();
        }
        if (!this.silent)
          console.error("glob error", er);
        break;
    }
    return cb();
  };
  Glob.prototype._processGlobStar = function(prefix, read, abs, remain, index, inGlobStar, cb) {
    var self = this;
    this._readdir(abs, inGlobStar, function(er, entries) {
      self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
    });
  };
  Glob.prototype._processGlobStar2 = function(prefix, read, abs, remain, index, inGlobStar, entries, cb) {
    if (!entries)
      return cb();
    var remainWithoutGlobStar = remain.slice(1);
    var gspref = prefix ? [prefix] : [];
    var noGlobStar = gspref.concat(remainWithoutGlobStar);
    this._process(noGlobStar, index, false, cb);
    var isSym = this.symlinks[abs];
    var len = entries.length;
    if (isSym && inGlobStar)
      return cb();
    for (var i = 0; i < len; i++) {
      var e = entries[i];
      if (e.charAt(0) === "." && !this.dot)
        continue;
      var instead = gspref.concat(entries[i], remainWithoutGlobStar);
      this._process(instead, index, true, cb);
      var below = gspref.concat(entries[i], remain);
      this._process(below, index, true, cb);
    }
    cb();
  };
  Glob.prototype._processSimple = function(prefix, index, cb) {
    var self = this;
    this._stat(prefix, function(er, exists2) {
      self._processSimple2(prefix, index, er, exists2, cb);
    });
  };
  Glob.prototype._processSimple2 = function(prefix, index, er, exists2, cb) {
    if (!this.matches[index])
      this.matches[index] = Object.create(null);
    if (!exists2)
      return cb();
    if (prefix && isAbsolute(prefix) && !this.nomount) {
      var trail = /[\/\\]$/.test(prefix);
      if (prefix.charAt(0) === "/") {
        prefix = path2.join(this.root, prefix);
      } else {
        prefix = path2.resolve(this.root, prefix);
        if (trail)
          prefix += "/";
      }
    }
    if (process.platform === "win32")
      prefix = prefix.replace(/\\/g, "/");
    this._emitMatch(index, prefix);
    cb();
  };
  Glob.prototype._stat = function(f, cb) {
    var abs = this._makeAbs(f);
    var needDir = f.slice(-1) === "/";
    if (f.length > this.maxLength)
      return cb();
    if (!this.stat && ownProp(this.cache, abs)) {
      var c = this.cache[abs];
      if (Array.isArray(c))
        c = "DIR";
      if (!needDir || c === "DIR")
        return cb(null, c);
      if (needDir && c === "FILE")
        return cb();
    }
    var exists2;
    var stat = this.statCache[abs];
    if (stat !== void 0) {
      if (stat === false)
        return cb(null, stat);
      else {
        var type = stat.isDirectory() ? "DIR" : "FILE";
        if (needDir && type === "FILE")
          return cb();
        else
          return cb(null, type, stat);
      }
    }
    var self = this;
    var statcb = inflight("stat\0" + abs, lstatcb_);
    if (statcb)
      fs.lstat(abs, statcb);
    function lstatcb_(er, lstat) {
      if (lstat && lstat.isSymbolicLink()) {
        return fs.stat(abs, function(er2, stat2) {
          if (er2)
            self._stat2(f, abs, null, lstat, cb);
          else
            self._stat2(f, abs, er2, stat2, cb);
        });
      } else {
        self._stat2(f, abs, er, lstat, cb);
      }
    }
  };
  Glob.prototype._stat2 = function(f, abs, er, stat, cb) {
    if (er && (er.code === "ENOENT" || er.code === "ENOTDIR")) {
      this.statCache[abs] = false;
      return cb();
    }
    var needDir = f.slice(-1) === "/";
    this.statCache[abs] = stat;
    if (abs.slice(-1) === "/" && stat && !stat.isDirectory())
      return cb(null, false, stat);
    var c = true;
    if (stat)
      c = stat.isDirectory() ? "DIR" : "FILE";
    this.cache[abs] = this.cache[abs] || c;
    if (needDir && c === "FILE")
      return cb();
    return cb(null, c, stat);
  };
});

// ../../node_modules/.pnpm/rimraf@3.0.2/node_modules/rimraf/rimraf.js
var require_rimraf = __commonJS((exports2, module2) => {
  var assert = require("assert");
  var path2 = require("path");
  var fs = require("fs");
  var glob = void 0;
  try {
    glob = require_glob();
  } catch (_err) {
  }
  var defaultGlobOpts = {
    nosort: true,
    silent: true
  };
  var timeout = 0;
  var isWindows = process.platform === "win32";
  var defaults = (options) => {
    const methods = [
      "unlink",
      "chmod",
      "stat",
      "lstat",
      "rmdir",
      "readdir"
    ];
    methods.forEach((m) => {
      options[m] = options[m] || fs[m];
      m = m + "Sync";
      options[m] = options[m] || fs[m];
    });
    options.maxBusyTries = options.maxBusyTries || 3;
    options.emfileWait = options.emfileWait || 1e3;
    if (options.glob === false) {
      options.disableGlob = true;
    }
    if (options.disableGlob !== true && glob === void 0) {
      throw Error("glob dependency not found, set `options.disableGlob = true` if intentional");
    }
    options.disableGlob = options.disableGlob || false;
    options.glob = options.glob || defaultGlobOpts;
  };
  var rimraf = (p, options, cb) => {
    if (typeof options === "function") {
      cb = options;
      options = {};
    }
    assert(p, "rimraf: missing path");
    assert.equal(typeof p, "string", "rimraf: path should be a string");
    assert.equal(typeof cb, "function", "rimraf: callback function required");
    assert(options, "rimraf: invalid options argument provided");
    assert.equal(typeof options, "object", "rimraf: options should be object");
    defaults(options);
    let busyTries = 0;
    let errState = null;
    let n = 0;
    const next = (er) => {
      errState = errState || er;
      if (--n === 0)
        cb(errState);
    };
    const afterGlob = (er, results) => {
      if (er)
        return cb(er);
      n = results.length;
      if (n === 0)
        return cb();
      results.forEach((p2) => {
        const CB = (er2) => {
          if (er2) {
            if ((er2.code === "EBUSY" || er2.code === "ENOTEMPTY" || er2.code === "EPERM") && busyTries < options.maxBusyTries) {
              busyTries++;
              return setTimeout(() => rimraf_(p2, options, CB), busyTries * 100);
            }
            if (er2.code === "EMFILE" && timeout < options.emfileWait) {
              return setTimeout(() => rimraf_(p2, options, CB), timeout++);
            }
            if (er2.code === "ENOENT")
              er2 = null;
          }
          timeout = 0;
          next(er2);
        };
        rimraf_(p2, options, CB);
      });
    };
    if (options.disableGlob || !glob.hasMagic(p))
      return afterGlob(null, [p]);
    options.lstat(p, (er, stat) => {
      if (!er)
        return afterGlob(null, [p]);
      glob(p, options.glob, afterGlob);
    });
  };
  var rimraf_ = (p, options, cb) => {
    assert(p);
    assert(options);
    assert(typeof cb === "function");
    options.lstat(p, (er, st) => {
      if (er && er.code === "ENOENT")
        return cb(null);
      if (er && er.code === "EPERM" && isWindows)
        fixWinEPERM(p, options, er, cb);
      if (st && st.isDirectory())
        return rmdir(p, options, er, cb);
      options.unlink(p, (er2) => {
        if (er2) {
          if (er2.code === "ENOENT")
            return cb(null);
          if (er2.code === "EPERM")
            return isWindows ? fixWinEPERM(p, options, er2, cb) : rmdir(p, options, er2, cb);
          if (er2.code === "EISDIR")
            return rmdir(p, options, er2, cb);
        }
        return cb(er2);
      });
    });
  };
  var fixWinEPERM = (p, options, er, cb) => {
    assert(p);
    assert(options);
    assert(typeof cb === "function");
    options.chmod(p, 438, (er2) => {
      if (er2)
        cb(er2.code === "ENOENT" ? null : er);
      else
        options.stat(p, (er3, stats) => {
          if (er3)
            cb(er3.code === "ENOENT" ? null : er);
          else if (stats.isDirectory())
            rmdir(p, options, er, cb);
          else
            options.unlink(p, cb);
        });
    });
  };
  var fixWinEPERMSync = (p, options, er) => {
    assert(p);
    assert(options);
    try {
      options.chmodSync(p, 438);
    } catch (er2) {
      if (er2.code === "ENOENT")
        return;
      else
        throw er;
    }
    let stats;
    try {
      stats = options.statSync(p);
    } catch (er3) {
      if (er3.code === "ENOENT")
        return;
      else
        throw er;
    }
    if (stats.isDirectory())
      rmdirSync(p, options, er);
    else
      options.unlinkSync(p);
  };
  var rmdir = (p, options, originalEr, cb) => {
    assert(p);
    assert(options);
    assert(typeof cb === "function");
    options.rmdir(p, (er) => {
      if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM"))
        rmkids(p, options, cb);
      else if (er && er.code === "ENOTDIR")
        cb(originalEr);
      else
        cb(er);
    });
  };
  var rmkids = (p, options, cb) => {
    assert(p);
    assert(options);
    assert(typeof cb === "function");
    options.readdir(p, (er, files) => {
      if (er)
        return cb(er);
      let n = files.length;
      if (n === 0)
        return options.rmdir(p, cb);
      let errState;
      files.forEach((f) => {
        rimraf(path2.join(p, f), options, (er2) => {
          if (errState)
            return;
          if (er2)
            return cb(errState = er2);
          if (--n === 0)
            options.rmdir(p, cb);
        });
      });
    });
  };
  var rimrafSync = (p, options) => {
    options = options || {};
    defaults(options);
    assert(p, "rimraf: missing path");
    assert.equal(typeof p, "string", "rimraf: path should be a string");
    assert(options, "rimraf: missing options");
    assert.equal(typeof options, "object", "rimraf: options should be object");
    let results;
    if (options.disableGlob || !glob.hasMagic(p)) {
      results = [p];
    } else {
      try {
        options.lstatSync(p);
        results = [p];
      } catch (er) {
        results = glob.sync(p, options.glob);
      }
    }
    if (!results.length)
      return;
    for (let i = 0; i < results.length; i++) {
      const p2 = results[i];
      let st;
      try {
        st = options.lstatSync(p2);
      } catch (er) {
        if (er.code === "ENOENT")
          return;
        if (er.code === "EPERM" && isWindows)
          fixWinEPERMSync(p2, options, er);
      }
      try {
        if (st && st.isDirectory())
          rmdirSync(p2, options, null);
        else
          options.unlinkSync(p2);
      } catch (er) {
        if (er.code === "ENOENT")
          return;
        if (er.code === "EPERM")
          return isWindows ? fixWinEPERMSync(p2, options, er) : rmdirSync(p2, options, er);
        if (er.code !== "EISDIR")
          throw er;
        rmdirSync(p2, options, er);
      }
    }
  };
  var rmdirSync = (p, options, originalEr) => {
    assert(p);
    assert(options);
    try {
      options.rmdirSync(p);
    } catch (er) {
      if (er.code === "ENOENT")
        return;
      if (er.code === "ENOTDIR")
        throw originalEr;
      if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")
        rmkidsSync(p, options);
    }
  };
  var rmkidsSync = (p, options) => {
    assert(p);
    assert(options);
    options.readdirSync(p).forEach((f) => rimrafSync(path2.join(p, f), options));
    const retries = isWindows ? 100 : 1;
    let i = 0;
    do {
      let threw = true;
      try {
        const ret = options.rmdirSync(p, options);
        threw = false;
        return ret;
      } finally {
        if (++i < retries && threw)
          continue;
      }
    } while (true);
  };
  module2.exports = rimraf;
  rimraf.sync = rimrafSync;
});

// ../../node_modules/.pnpm/@prisma/fetch-engine@2.24.1/node_modules/@prisma/fetch-engine/dist/cleanupCache.js
var require_cleanupCache = __commonJS((exports2) => {
  "use strict";
  var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.cleanupCache = void 0;
  var fs_12 = __importDefault2(require("fs"));
  var path_12 = __importDefault2(require("path"));
  var util_12 = require_util2();
  var rimraf_1 = __importDefault2(require_rimraf());
  var util_22 = require("util");
  var p_map_1 = __importDefault2(require_p_map());
  var debug_12 = __importDefault2(require_dist());
  var debug3 = debug_12.default("cleanupCache");
  var del = util_22.promisify(rimraf_1.default);
  var readdir = util_22.promisify(fs_12.default.readdir);
  var stat = util_22.promisify(fs_12.default.stat);
  async function cleanupCache(n = 5) {
    try {
      const rootCacheDir = await util_12.getRootCacheDir();
      if (!rootCacheDir) {
        debug3("no rootCacheDir found");
        return;
      }
      const channel2 = "master";
      const cacheDir = path_12.default.join(rootCacheDir, channel2);
      const dirs = await readdir(cacheDir);
      const dirsWithMeta = await Promise.all(dirs.map(async (dirName) => {
        const dir = path_12.default.join(cacheDir, dirName);
        const statResult = await stat(dir);
        return {
          dir,
          created: statResult.birthtime
        };
      }));
      dirsWithMeta.sort((a, b) => a.created < b.created ? 1 : -1);
      const dirsToRemove = dirsWithMeta.slice(n);
      await p_map_1.default(dirsToRemove, (dir) => del(dir.dir), {concurrency: 20});
    } catch (e) {
    }
  }
  exports2.cleanupCache = cleanupCache;
});

// ../../node_modules/.pnpm/retry@0.12.0/node_modules/retry/lib/retry_operation.js
var require_retry_operation = __commonJS((exports2, module2) => {
  function RetryOperation(timeouts, options) {
    if (typeof options === "boolean") {
      options = {forever: options};
    }
    this._originalTimeouts = JSON.parse(JSON.stringify(timeouts));
    this._timeouts = timeouts;
    this._options = options || {};
    this._maxRetryTime = options && options.maxRetryTime || Infinity;
    this._fn = null;
    this._errors = [];
    this._attempts = 1;
    this._operationTimeout = null;
    this._operationTimeoutCb = null;
    this._timeout = null;
    this._operationStart = null;
    if (this._options.forever) {
      this._cachedTimeouts = this._timeouts.slice(0);
    }
  }
  module2.exports = RetryOperation;
  RetryOperation.prototype.reset = function() {
    this._attempts = 1;
    this._timeouts = this._originalTimeouts;
  };
  RetryOperation.prototype.stop = function() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    this._timeouts = [];
    this._cachedTimeouts = null;
  };
  RetryOperation.prototype.retry = function(err) {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    if (!err) {
      return false;
    }
    var currentTime = new Date().getTime();
    if (err && currentTime - this._operationStart >= this._maxRetryTime) {
      this._errors.unshift(new Error("RetryOperation timeout occurred"));
      return false;
    }
    this._errors.push(err);
    var timeout = this._timeouts.shift();
    if (timeout === void 0) {
      if (this._cachedTimeouts) {
        this._errors.splice(this._errors.length - 1, this._errors.length);
        this._timeouts = this._cachedTimeouts.slice(0);
        timeout = this._timeouts.shift();
      } else {
        return false;
      }
    }
    var self = this;
    var timer = setTimeout(function() {
      self._attempts++;
      if (self._operationTimeoutCb) {
        self._timeout = setTimeout(function() {
          self._operationTimeoutCb(self._attempts);
        }, self._operationTimeout);
        if (self._options.unref) {
          self._timeout.unref();
        }
      }
      self._fn(self._attempts);
    }, timeout);
    if (this._options.unref) {
      timer.unref();
    }
    return true;
  };
  RetryOperation.prototype.attempt = function(fn, timeoutOps) {
    this._fn = fn;
    if (timeoutOps) {
      if (timeoutOps.timeout) {
        this._operationTimeout = timeoutOps.timeout;
      }
      if (timeoutOps.cb) {
        this._operationTimeoutCb = timeoutOps.cb;
      }
    }
    var self = this;
    if (this._operationTimeoutCb) {
      this._timeout = setTimeout(function() {
        self._operationTimeoutCb();
      }, self._operationTimeout);
    }
    this._operationStart = new Date().getTime();
    this._fn(this._attempts);
  };
  RetryOperation.prototype.try = function(fn) {
    console.log("Using RetryOperation.try() is deprecated");
    this.attempt(fn);
  };
  RetryOperation.prototype.start = function(fn) {
    console.log("Using RetryOperation.start() is deprecated");
    this.attempt(fn);
  };
  RetryOperation.prototype.start = RetryOperation.prototype.try;
  RetryOperation.prototype.errors = function() {
    return this._errors;
  };
  RetryOperation.prototype.attempts = function() {
    return this._attempts;
  };
  RetryOperation.prototype.mainError = function() {
    if (this._errors.length === 0) {
      return null;
    }
    var counts = {};
    var mainError = null;
    var mainErrorCount = 0;
    for (var i = 0; i < this._errors.length; i++) {
      var error = this._errors[i];
      var message = error.message;
      var count = (counts[message] || 0) + 1;
      counts[message] = count;
      if (count >= mainErrorCount) {
        mainError = error;
        mainErrorCount = count;
      }
    }
    return mainError;
  };
});

// ../../node_modules/.pnpm/retry@0.12.0/node_modules/retry/lib/retry.js
var require_retry = __commonJS((exports2) => {
  var RetryOperation = require_retry_operation();
  exports2.operation = function(options) {
    var timeouts = exports2.timeouts(options);
    return new RetryOperation(timeouts, {
      forever: options && options.forever,
      unref: options && options.unref,
      maxRetryTime: options && options.maxRetryTime
    });
  };
  exports2.timeouts = function(options) {
    if (options instanceof Array) {
      return [].concat(options);
    }
    var opts = {
      retries: 10,
      factor: 2,
      minTimeout: 1 * 1e3,
      maxTimeout: Infinity,
      randomize: false
    };
    for (var key in options) {
      opts[key] = options[key];
    }
    if (opts.minTimeout > opts.maxTimeout) {
      throw new Error("minTimeout is greater than maxTimeout");
    }
    var timeouts = [];
    for (var i = 0; i < opts.retries; i++) {
      timeouts.push(this.createTimeout(i, opts));
    }
    if (options && options.forever && !timeouts.length) {
      timeouts.push(this.createTimeout(i, opts));
    }
    timeouts.sort(function(a, b) {
      return a - b;
    });
    return timeouts;
  };
  exports2.createTimeout = function(attempt, opts) {
    var random = opts.randomize ? Math.random() + 1 : 1;
    var timeout = Math.round(random * opts.minTimeout * Math.pow(opts.factor, attempt));
    timeout = Math.min(timeout, opts.maxTimeout);
    return timeout;
  };
  exports2.wrap = function(obj, options, methods) {
    if (options instanceof Array) {
      methods = options;
      options = null;
    }
    if (!methods) {
      methods = [];
      for (var key in obj) {
        if (typeof obj[key] === "function") {
          methods.push(key);
        }
      }
    }
    for (var i = 0; i < methods.length; i++) {
      var method = methods[i];
      var original = obj[method];
      obj[method] = function retryWrapper(original2) {
        var op = exports2.operation(options);
        var args = Array.prototype.slice.call(arguments, 1);
        var callback = args.pop();
        args.push(function(err) {
          if (op.retry(err)) {
            return;
          }
          if (err) {
            arguments[0] = op.mainError();
          }
          callback.apply(this, arguments);
        });
        op.attempt(function() {
          original2.apply(obj, args);
        });
      }.bind(obj, original);
      obj[method].options = options;
    }
  };
});

// ../../node_modules/.pnpm/retry@0.12.0/node_modules/retry/index.js
var require_retry2 = __commonJS((exports2, module2) => {
  module2.exports = require_retry();
});

// ../../node_modules/.pnpm/p-retry@4.4.0/node_modules/p-retry/index.js
var require_p_retry = __commonJS((exports2, module2) => {
  "use strict";
  var retry = require_retry2();
  var networkErrorMsgs = [
    "Failed to fetch",
    "NetworkError when attempting to fetch resource",
    "The Internet connection appears to be offline"
  ];
  var AbortError = class extends Error {
    constructor(message) {
      super();
      if (message instanceof Error) {
        this.originalError = message;
        ({message} = message);
      } else {
        this.originalError = new Error(message);
        this.originalError.stack = this.stack;
      }
      this.name = "AbortError";
      this.message = message;
    }
  };
  var decorateErrorWithCounts = (error, attemptNumber, options) => {
    const retriesLeft = options.retries - (attemptNumber - 1);
    error.attemptNumber = attemptNumber;
    error.retriesLeft = retriesLeft;
    return error;
  };
  var isNetworkError = (errorMessage) => networkErrorMsgs.includes(errorMessage);
  var pRetry = (input, options) => new Promise((resolve, reject) => {
    options = {
      onFailedAttempt: () => {
      },
      retries: 10,
      ...options
    };
    const operation = retry.operation(options);
    operation.attempt(async (attemptNumber) => {
      try {
        resolve(await input(attemptNumber));
      } catch (error) {
        if (!(error instanceof Error)) {
          reject(new TypeError(`Non-error was thrown: "${error}". You should only throw errors.`));
          return;
        }
        if (error instanceof AbortError) {
          operation.stop();
          reject(error.originalError);
        } else if (error instanceof TypeError && !isNetworkError(error.message)) {
          operation.stop();
          reject(error);
        } else {
          decorateErrorWithCounts(error, attemptNumber, options);
          try {
            await options.onFailedAttempt(error);
          } catch (error2) {
            reject(error2);
            return;
          }
          if (!operation.retry(error)) {
            reject(operation.mainError());
          }
        }
      }
    });
  });
  module2.exports = pRetry;
  module2.exports.default = pRetry;
  module2.exports.AbortError = AbortError;
});

// ../../node_modules/.pnpm/node-fetch@2.6.1/node_modules/node-fetch/lib/index.mjs
var require_lib = __commonJS((exports2) => {
  __markAsModule(exports2);
  __export(exports2, {
    FetchError: () => FetchError,
    Headers: () => Headers,
    Request: () => Request,
    Response: () => Response,
    default: () => lib_default
  });
  var import_stream = __toModule(require("stream"));
  var import_http = __toModule(require("http"));
  var import_url = __toModule(require("url"));
  var import_https = __toModule(require("https"));
  var import_zlib = __toModule(require("zlib"));
  var Readable = import_stream.default.Readable;
  var BUFFER = Symbol("buffer");
  var TYPE = Symbol("type");
  var Blob = class {
    constructor() {
      this[TYPE] = "";
      const blobParts = arguments[0];
      const options = arguments[1];
      const buffers = [];
      let size = 0;
      if (blobParts) {
        const a = blobParts;
        const length = Number(a.length);
        for (let i = 0; i < length; i++) {
          const element = a[i];
          let buffer;
          if (element instanceof Buffer) {
            buffer = element;
          } else if (ArrayBuffer.isView(element)) {
            buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
          } else if (element instanceof ArrayBuffer) {
            buffer = Buffer.from(element);
          } else if (element instanceof Blob) {
            buffer = element[BUFFER];
          } else {
            buffer = Buffer.from(typeof element === "string" ? element : String(element));
          }
          size += buffer.length;
          buffers.push(buffer);
        }
      }
      this[BUFFER] = Buffer.concat(buffers);
      let type = options && options.type !== void 0 && String(options.type).toLowerCase();
      if (type && !/[^\u0020-\u007E]/.test(type)) {
        this[TYPE] = type;
      }
    }
    get size() {
      return this[BUFFER].length;
    }
    get type() {
      return this[TYPE];
    }
    text() {
      return Promise.resolve(this[BUFFER].toString());
    }
    arrayBuffer() {
      const buf = this[BUFFER];
      const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
      return Promise.resolve(ab);
    }
    stream() {
      const readable = new Readable();
      readable._read = function() {
      };
      readable.push(this[BUFFER]);
      readable.push(null);
      return readable;
    }
    toString() {
      return "[object Blob]";
    }
    slice() {
      const size = this.size;
      const start = arguments[0];
      const end = arguments[1];
      let relativeStart, relativeEnd;
      if (start === void 0) {
        relativeStart = 0;
      } else if (start < 0) {
        relativeStart = Math.max(size + start, 0);
      } else {
        relativeStart = Math.min(start, size);
      }
      if (end === void 0) {
        relativeEnd = size;
      } else if (end < 0) {
        relativeEnd = Math.max(size + end, 0);
      } else {
        relativeEnd = Math.min(end, size);
      }
      const span = Math.max(relativeEnd - relativeStart, 0);
      const buffer = this[BUFFER];
      const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
      const blob = new Blob([], {type: arguments[2]});
      blob[BUFFER] = slicedBuffer;
      return blob;
    }
  };
  Object.defineProperties(Blob.prototype, {
    size: {enumerable: true},
    type: {enumerable: true},
    slice: {enumerable: true}
  });
  Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
    value: "Blob",
    writable: false,
    enumerable: false,
    configurable: true
  });
  function FetchError(message, type, systemError) {
    Error.call(this, message);
    this.message = message;
    this.type = type;
    if (systemError) {
      this.code = this.errno = systemError.code;
    }
    Error.captureStackTrace(this, this.constructor);
  }
  FetchError.prototype = Object.create(Error.prototype);
  FetchError.prototype.constructor = FetchError;
  FetchError.prototype.name = "FetchError";
  var convert;
  try {
    convert = require("encoding").convert;
  } catch (e) {
  }
  var INTERNALS = Symbol("Body internals");
  var PassThrough = import_stream.default.PassThrough;
  function Body(body) {
    var _this = this;
    var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref$size = _ref.size;
    let size = _ref$size === void 0 ? 0 : _ref$size;
    var _ref$timeout = _ref.timeout;
    let timeout = _ref$timeout === void 0 ? 0 : _ref$timeout;
    if (body == null) {
      body = null;
    } else if (isURLSearchParams(body)) {
      body = Buffer.from(body.toString());
    } else if (isBlob(body))
      ;
    else if (Buffer.isBuffer(body))
      ;
    else if (Object.prototype.toString.call(body) === "[object ArrayBuffer]") {
      body = Buffer.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof import_stream.default)
      ;
    else {
      body = Buffer.from(String(body));
    }
    this[INTERNALS] = {
      body,
      disturbed: false,
      error: null
    };
    this.size = size;
    this.timeout = timeout;
    if (body instanceof import_stream.default) {
      body.on("error", function(err) {
        const error = err.name === "AbortError" ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, "system", err);
        _this[INTERNALS].error = error;
      });
    }
  }
  Body.prototype = {
    get body() {
      return this[INTERNALS].body;
    },
    get bodyUsed() {
      return this[INTERNALS].disturbed;
    },
    arrayBuffer() {
      return consumeBody.call(this).then(function(buf) {
        return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
      });
    },
    blob() {
      let ct = this.headers && this.headers.get("content-type") || "";
      return consumeBody.call(this).then(function(buf) {
        return Object.assign(new Blob([], {
          type: ct.toLowerCase()
        }), {
          [BUFFER]: buf
        });
      });
    },
    json() {
      var _this2 = this;
      return consumeBody.call(this).then(function(buffer) {
        try {
          return JSON.parse(buffer.toString());
        } catch (err) {
          return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, "invalid-json"));
        }
      });
    },
    text() {
      return consumeBody.call(this).then(function(buffer) {
        return buffer.toString();
      });
    },
    buffer() {
      return consumeBody.call(this);
    },
    textConverted() {
      var _this3 = this;
      return consumeBody.call(this).then(function(buffer) {
        return convertBody(buffer, _this3.headers);
      });
    }
  };
  Object.defineProperties(Body.prototype, {
    body: {enumerable: true},
    bodyUsed: {enumerable: true},
    arrayBuffer: {enumerable: true},
    blob: {enumerable: true},
    json: {enumerable: true},
    text: {enumerable: true}
  });
  Body.mixIn = function(proto) {
    for (const name of Object.getOwnPropertyNames(Body.prototype)) {
      if (!(name in proto)) {
        const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
        Object.defineProperty(proto, name, desc);
      }
    }
  };
  function consumeBody() {
    var _this4 = this;
    if (this[INTERNALS].disturbed) {
      return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
    }
    this[INTERNALS].disturbed = true;
    if (this[INTERNALS].error) {
      return Body.Promise.reject(this[INTERNALS].error);
    }
    let body = this.body;
    if (body === null) {
      return Body.Promise.resolve(Buffer.alloc(0));
    }
    if (isBlob(body)) {
      body = body.stream();
    }
    if (Buffer.isBuffer(body)) {
      return Body.Promise.resolve(body);
    }
    if (!(body instanceof import_stream.default)) {
      return Body.Promise.resolve(Buffer.alloc(0));
    }
    let accum = [];
    let accumBytes = 0;
    let abort = false;
    return new Body.Promise(function(resolve, reject) {
      let resTimeout;
      if (_this4.timeout) {
        resTimeout = setTimeout(function() {
          abort = true;
          reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, "body-timeout"));
        }, _this4.timeout);
      }
      body.on("error", function(err) {
        if (err.name === "AbortError") {
          abort = true;
          reject(err);
        } else {
          reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, "system", err));
        }
      });
      body.on("data", function(chunk) {
        if (abort || chunk === null) {
          return;
        }
        if (_this4.size && accumBytes + chunk.length > _this4.size) {
          abort = true;
          reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, "max-size"));
          return;
        }
        accumBytes += chunk.length;
        accum.push(chunk);
      });
      body.on("end", function() {
        if (abort) {
          return;
        }
        clearTimeout(resTimeout);
        try {
          resolve(Buffer.concat(accum, accumBytes));
        } catch (err) {
          reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, "system", err));
        }
      });
    });
  }
  function convertBody(buffer, headers) {
    if (typeof convert !== "function") {
      throw new Error("The package `encoding` must be installed to use the textConverted() function");
    }
    const ct = headers.get("content-type");
    let charset = "utf-8";
    let res, str;
    if (ct) {
      res = /charset=([^;]*)/i.exec(ct);
    }
    str = buffer.slice(0, 1024).toString();
    if (!res && str) {
      res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
    }
    if (!res && str) {
      res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);
      if (!res) {
        res = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(str);
        if (res) {
          res.pop();
        }
      }
      if (res) {
        res = /charset=(.*)/i.exec(res.pop());
      }
    }
    if (!res && str) {
      res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
    }
    if (res) {
      charset = res.pop();
      if (charset === "gb2312" || charset === "gbk") {
        charset = "gb18030";
      }
    }
    return convert(buffer, "UTF-8", charset).toString();
  }
  function isURLSearchParams(obj) {
    if (typeof obj !== "object" || typeof obj.append !== "function" || typeof obj.delete !== "function" || typeof obj.get !== "function" || typeof obj.getAll !== "function" || typeof obj.has !== "function" || typeof obj.set !== "function") {
      return false;
    }
    return obj.constructor.name === "URLSearchParams" || Object.prototype.toString.call(obj) === "[object URLSearchParams]" || typeof obj.sort === "function";
  }
  function isBlob(obj) {
    return typeof obj === "object" && typeof obj.arrayBuffer === "function" && typeof obj.type === "string" && typeof obj.stream === "function" && typeof obj.constructor === "function" && typeof obj.constructor.name === "string" && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
  }
  function clone(instance) {
    let p1, p2;
    let body = instance.body;
    if (instance.bodyUsed) {
      throw new Error("cannot clone body after it is used");
    }
    if (body instanceof import_stream.default && typeof body.getBoundary !== "function") {
      p1 = new PassThrough();
      p2 = new PassThrough();
      body.pipe(p1);
      body.pipe(p2);
      instance[INTERNALS].body = p1;
      body = p2;
    }
    return body;
  }
  function extractContentType(body) {
    if (body === null) {
      return null;
    } else if (typeof body === "string") {
      return "text/plain;charset=UTF-8";
    } else if (isURLSearchParams(body)) {
      return "application/x-www-form-urlencoded;charset=UTF-8";
    } else if (isBlob(body)) {
      return body.type || null;
    } else if (Buffer.isBuffer(body)) {
      return null;
    } else if (Object.prototype.toString.call(body) === "[object ArrayBuffer]") {
      return null;
    } else if (ArrayBuffer.isView(body)) {
      return null;
    } else if (typeof body.getBoundary === "function") {
      return `multipart/form-data;boundary=${body.getBoundary()}`;
    } else if (body instanceof import_stream.default) {
      return null;
    } else {
      return "text/plain;charset=UTF-8";
    }
  }
  function getTotalBytes(instance) {
    const body = instance.body;
    if (body === null) {
      return 0;
    } else if (isBlob(body)) {
      return body.size;
    } else if (Buffer.isBuffer(body)) {
      return body.length;
    } else if (body && typeof body.getLengthSync === "function") {
      if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || body.hasKnownLength && body.hasKnownLength()) {
        return body.getLengthSync();
      }
      return null;
    } else {
      return null;
    }
  }
  function writeToStream(dest, instance) {
    const body = instance.body;
    if (body === null) {
      dest.end();
    } else if (isBlob(body)) {
      body.stream().pipe(dest);
    } else if (Buffer.isBuffer(body)) {
      dest.write(body);
      dest.end();
    } else {
      body.pipe(dest);
    }
  }
  Body.Promise = global.Promise;
  var invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
  var invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;
  function validateName(name) {
    name = `${name}`;
    if (invalidTokenRegex.test(name) || name === "") {
      throw new TypeError(`${name} is not a legal HTTP header name`);
    }
  }
  function validateValue(value) {
    value = `${value}`;
    if (invalidHeaderCharRegex.test(value)) {
      throw new TypeError(`${value} is not a legal HTTP header value`);
    }
  }
  function find(map, name) {
    name = name.toLowerCase();
    for (const key in map) {
      if (key.toLowerCase() === name) {
        return key;
      }
    }
    return void 0;
  }
  var MAP = Symbol("map");
  var Headers = class {
    constructor() {
      let init = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
      this[MAP] = Object.create(null);
      if (init instanceof Headers) {
        const rawHeaders = init.raw();
        const headerNames = Object.keys(rawHeaders);
        for (const headerName of headerNames) {
          for (const value of rawHeaders[headerName]) {
            this.append(headerName, value);
          }
        }
        return;
      }
      if (init == null)
        ;
      else if (typeof init === "object") {
        const method = init[Symbol.iterator];
        if (method != null) {
          if (typeof method !== "function") {
            throw new TypeError("Header pairs must be iterable");
          }
          const pairs = [];
          for (const pair of init) {
            if (typeof pair !== "object" || typeof pair[Symbol.iterator] !== "function") {
              throw new TypeError("Each header pair must be iterable");
            }
            pairs.push(Array.from(pair));
          }
          for (const pair of pairs) {
            if (pair.length !== 2) {
              throw new TypeError("Each header pair must be a name/value tuple");
            }
            this.append(pair[0], pair[1]);
          }
        } else {
          for (const key of Object.keys(init)) {
            const value = init[key];
            this.append(key, value);
          }
        }
      } else {
        throw new TypeError("Provided initializer must be an object");
      }
    }
    get(name) {
      name = `${name}`;
      validateName(name);
      const key = find(this[MAP], name);
      if (key === void 0) {
        return null;
      }
      return this[MAP][key].join(", ");
    }
    forEach(callback) {
      let thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : void 0;
      let pairs = getHeaders(this);
      let i = 0;
      while (i < pairs.length) {
        var _pairs$i = pairs[i];
        const name = _pairs$i[0], value = _pairs$i[1];
        callback.call(thisArg, value, name, this);
        pairs = getHeaders(this);
        i++;
      }
    }
    set(name, value) {
      name = `${name}`;
      value = `${value}`;
      validateName(name);
      validateValue(value);
      const key = find(this[MAP], name);
      this[MAP][key !== void 0 ? key : name] = [value];
    }
    append(name, value) {
      name = `${name}`;
      value = `${value}`;
      validateName(name);
      validateValue(value);
      const key = find(this[MAP], name);
      if (key !== void 0) {
        this[MAP][key].push(value);
      } else {
        this[MAP][name] = [value];
      }
    }
    has(name) {
      name = `${name}`;
      validateName(name);
      return find(this[MAP], name) !== void 0;
    }
    delete(name) {
      name = `${name}`;
      validateName(name);
      const key = find(this[MAP], name);
      if (key !== void 0) {
        delete this[MAP][key];
      }
    }
    raw() {
      return this[MAP];
    }
    keys() {
      return createHeadersIterator(this, "key");
    }
    values() {
      return createHeadersIterator(this, "value");
    }
    [Symbol.iterator]() {
      return createHeadersIterator(this, "key+value");
    }
  };
  Headers.prototype.entries = Headers.prototype[Symbol.iterator];
  Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
    value: "Headers",
    writable: false,
    enumerable: false,
    configurable: true
  });
  Object.defineProperties(Headers.prototype, {
    get: {enumerable: true},
    forEach: {enumerable: true},
    set: {enumerable: true},
    append: {enumerable: true},
    has: {enumerable: true},
    delete: {enumerable: true},
    keys: {enumerable: true},
    values: {enumerable: true},
    entries: {enumerable: true}
  });
  function getHeaders(headers) {
    let kind = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "key+value";
    const keys = Object.keys(headers[MAP]).sort();
    return keys.map(kind === "key" ? function(k) {
      return k.toLowerCase();
    } : kind === "value" ? function(k) {
      return headers[MAP][k].join(", ");
    } : function(k) {
      return [k.toLowerCase(), headers[MAP][k].join(", ")];
    });
  }
  var INTERNAL = Symbol("internal");
  function createHeadersIterator(target, kind) {
    const iterator = Object.create(HeadersIteratorPrototype);
    iterator[INTERNAL] = {
      target,
      kind,
      index: 0
    };
    return iterator;
  }
  var HeadersIteratorPrototype = Object.setPrototypeOf({
    next() {
      if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
        throw new TypeError("Value of `this` is not a HeadersIterator");
      }
      var _INTERNAL = this[INTERNAL];
      const target = _INTERNAL.target, kind = _INTERNAL.kind, index = _INTERNAL.index;
      const values = getHeaders(target, kind);
      const len = values.length;
      if (index >= len) {
        return {
          value: void 0,
          done: true
        };
      }
      this[INTERNAL].index = index + 1;
      return {
        value: values[index],
        done: false
      };
    }
  }, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));
  Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
    value: "HeadersIterator",
    writable: false,
    enumerable: false,
    configurable: true
  });
  function exportNodeCompatibleHeaders(headers) {
    const obj = Object.assign({__proto__: null}, headers[MAP]);
    const hostHeaderKey = find(headers[MAP], "Host");
    if (hostHeaderKey !== void 0) {
      obj[hostHeaderKey] = obj[hostHeaderKey][0];
    }
    return obj;
  }
  function createHeadersLenient(obj) {
    const headers = new Headers();
    for (const name of Object.keys(obj)) {
      if (invalidTokenRegex.test(name)) {
        continue;
      }
      if (Array.isArray(obj[name])) {
        for (const val of obj[name]) {
          if (invalidHeaderCharRegex.test(val)) {
            continue;
          }
          if (headers[MAP][name] === void 0) {
            headers[MAP][name] = [val];
          } else {
            headers[MAP][name].push(val);
          }
        }
      } else if (!invalidHeaderCharRegex.test(obj[name])) {
        headers[MAP][name] = [obj[name]];
      }
    }
    return headers;
  }
  var INTERNALS$1 = Symbol("Response internals");
  var STATUS_CODES = import_http.default.STATUS_CODES;
  var Response = class {
    constructor() {
      let body = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
      let opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      Body.call(this, body, opts);
      const status = opts.status || 200;
      const headers = new Headers(opts.headers);
      if (body != null && !headers.has("Content-Type")) {
        const contentType = extractContentType(body);
        if (contentType) {
          headers.append("Content-Type", contentType);
        }
      }
      this[INTERNALS$1] = {
        url: opts.url,
        status,
        statusText: opts.statusText || STATUS_CODES[status],
        headers,
        counter: opts.counter
      };
    }
    get url() {
      return this[INTERNALS$1].url || "";
    }
    get status() {
      return this[INTERNALS$1].status;
    }
    get ok() {
      return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
    }
    get redirected() {
      return this[INTERNALS$1].counter > 0;
    }
    get statusText() {
      return this[INTERNALS$1].statusText;
    }
    get headers() {
      return this[INTERNALS$1].headers;
    }
    clone() {
      return new Response(clone(this), {
        url: this.url,
        status: this.status,
        statusText: this.statusText,
        headers: this.headers,
        ok: this.ok,
        redirected: this.redirected
      });
    }
  };
  Body.mixIn(Response.prototype);
  Object.defineProperties(Response.prototype, {
    url: {enumerable: true},
    status: {enumerable: true},
    ok: {enumerable: true},
    redirected: {enumerable: true},
    statusText: {enumerable: true},
    headers: {enumerable: true},
    clone: {enumerable: true}
  });
  Object.defineProperty(Response.prototype, Symbol.toStringTag, {
    value: "Response",
    writable: false,
    enumerable: false,
    configurable: true
  });
  var INTERNALS$2 = Symbol("Request internals");
  var parse_url = import_url.default.parse;
  var format_url = import_url.default.format;
  var streamDestructionSupported = "destroy" in import_stream.default.Readable.prototype;
  function isRequest(input) {
    return typeof input === "object" && typeof input[INTERNALS$2] === "object";
  }
  function isAbortSignal(signal) {
    const proto = signal && typeof signal === "object" && Object.getPrototypeOf(signal);
    return !!(proto && proto.constructor.name === "AbortSignal");
  }
  var Request = class {
    constructor(input) {
      let init = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      let parsedURL;
      if (!isRequest(input)) {
        if (input && input.href) {
          parsedURL = parse_url(input.href);
        } else {
          parsedURL = parse_url(`${input}`);
        }
        input = {};
      } else {
        parsedURL = parse_url(input.url);
      }
      let method = init.method || input.method || "GET";
      method = method.toUpperCase();
      if ((init.body != null || isRequest(input) && input.body !== null) && (method === "GET" || method === "HEAD")) {
        throw new TypeError("Request with GET/HEAD method cannot have body");
      }
      let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;
      Body.call(this, inputBody, {
        timeout: init.timeout || input.timeout || 0,
        size: init.size || input.size || 0
      });
      const headers = new Headers(init.headers || input.headers || {});
      if (inputBody != null && !headers.has("Content-Type")) {
        const contentType = extractContentType(inputBody);
        if (contentType) {
          headers.append("Content-Type", contentType);
        }
      }
      let signal = isRequest(input) ? input.signal : null;
      if ("signal" in init)
        signal = init.signal;
      if (signal != null && !isAbortSignal(signal)) {
        throw new TypeError("Expected signal to be an instanceof AbortSignal");
      }
      this[INTERNALS$2] = {
        method,
        redirect: init.redirect || input.redirect || "follow",
        headers,
        parsedURL,
        signal
      };
      this.follow = init.follow !== void 0 ? init.follow : input.follow !== void 0 ? input.follow : 20;
      this.compress = init.compress !== void 0 ? init.compress : input.compress !== void 0 ? input.compress : true;
      this.counter = init.counter || input.counter || 0;
      this.agent = init.agent || input.agent;
    }
    get method() {
      return this[INTERNALS$2].method;
    }
    get url() {
      return format_url(this[INTERNALS$2].parsedURL);
    }
    get headers() {
      return this[INTERNALS$2].headers;
    }
    get redirect() {
      return this[INTERNALS$2].redirect;
    }
    get signal() {
      return this[INTERNALS$2].signal;
    }
    clone() {
      return new Request(this);
    }
  };
  Body.mixIn(Request.prototype);
  Object.defineProperty(Request.prototype, Symbol.toStringTag, {
    value: "Request",
    writable: false,
    enumerable: false,
    configurable: true
  });
  Object.defineProperties(Request.prototype, {
    method: {enumerable: true},
    url: {enumerable: true},
    headers: {enumerable: true},
    redirect: {enumerable: true},
    clone: {enumerable: true},
    signal: {enumerable: true}
  });
  function getNodeRequestOptions(request) {
    const parsedURL = request[INTERNALS$2].parsedURL;
    const headers = new Headers(request[INTERNALS$2].headers);
    if (!headers.has("Accept")) {
      headers.set("Accept", "*/*");
    }
    if (!parsedURL.protocol || !parsedURL.hostname) {
      throw new TypeError("Only absolute URLs are supported");
    }
    if (!/^https?:$/.test(parsedURL.protocol)) {
      throw new TypeError("Only HTTP(S) protocols are supported");
    }
    if (request.signal && request.body instanceof import_stream.default.Readable && !streamDestructionSupported) {
      throw new Error("Cancellation of streamed requests with AbortSignal is not supported in node < 8");
    }
    let contentLengthValue = null;
    if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
      contentLengthValue = "0";
    }
    if (request.body != null) {
      const totalBytes = getTotalBytes(request);
      if (typeof totalBytes === "number") {
        contentLengthValue = String(totalBytes);
      }
    }
    if (contentLengthValue) {
      headers.set("Content-Length", contentLengthValue);
    }
    if (!headers.has("User-Agent")) {
      headers.set("User-Agent", "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)");
    }
    if (request.compress && !headers.has("Accept-Encoding")) {
      headers.set("Accept-Encoding", "gzip,deflate");
    }
    let agent = request.agent;
    if (typeof agent === "function") {
      agent = agent(parsedURL);
    }
    if (!headers.has("Connection") && !agent) {
      headers.set("Connection", "close");
    }
    return Object.assign({}, parsedURL, {
      method: request.method,
      headers: exportNodeCompatibleHeaders(headers),
      agent
    });
  }
  function AbortError(message) {
    Error.call(this, message);
    this.type = "aborted";
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
  AbortError.prototype = Object.create(Error.prototype);
  AbortError.prototype.constructor = AbortError;
  AbortError.prototype.name = "AbortError";
  var PassThrough$1 = import_stream.default.PassThrough;
  var resolve_url = import_url.default.resolve;
  function fetch(url, opts) {
    if (!fetch.Promise) {
      throw new Error("native promise missing, set fetch.Promise to your favorite alternative");
    }
    Body.Promise = fetch.Promise;
    return new fetch.Promise(function(resolve, reject) {
      const request = new Request(url, opts);
      const options = getNodeRequestOptions(request);
      const send = (options.protocol === "https:" ? import_https.default : import_http.default).request;
      const signal = request.signal;
      let response = null;
      const abort = function abort2() {
        let error = new AbortError("The user aborted a request.");
        reject(error);
        if (request.body && request.body instanceof import_stream.default.Readable) {
          request.body.destroy(error);
        }
        if (!response || !response.body)
          return;
        response.body.emit("error", error);
      };
      if (signal && signal.aborted) {
        abort();
        return;
      }
      const abortAndFinalize = function abortAndFinalize2() {
        abort();
        finalize();
      };
      const req = send(options);
      let reqTimeout;
      if (signal) {
        signal.addEventListener("abort", abortAndFinalize);
      }
      function finalize() {
        req.abort();
        if (signal)
          signal.removeEventListener("abort", abortAndFinalize);
        clearTimeout(reqTimeout);
      }
      if (request.timeout) {
        req.once("socket", function(socket) {
          reqTimeout = setTimeout(function() {
            reject(new FetchError(`network timeout at: ${request.url}`, "request-timeout"));
            finalize();
          }, request.timeout);
        });
      }
      req.on("error", function(err) {
        reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, "system", err));
        finalize();
      });
      req.on("response", function(res) {
        clearTimeout(reqTimeout);
        const headers = createHeadersLenient(res.headers);
        if (fetch.isRedirect(res.statusCode)) {
          const location = headers.get("Location");
          const locationURL = location === null ? null : resolve_url(request.url, location);
          switch (request.redirect) {
            case "error":
              reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
              finalize();
              return;
            case "manual":
              if (locationURL !== null) {
                try {
                  headers.set("Location", locationURL);
                } catch (err) {
                  reject(err);
                }
              }
              break;
            case "follow":
              if (locationURL === null) {
                break;
              }
              if (request.counter >= request.follow) {
                reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
                finalize();
                return;
              }
              const requestOpts = {
                headers: new Headers(request.headers),
                follow: request.follow,
                counter: request.counter + 1,
                agent: request.agent,
                compress: request.compress,
                method: request.method,
                body: request.body,
                signal: request.signal,
                timeout: request.timeout,
                size: request.size
              };
              if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
                reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
                finalize();
                return;
              }
              if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === "POST") {
                requestOpts.method = "GET";
                requestOpts.body = void 0;
                requestOpts.headers.delete("content-length");
              }
              resolve(fetch(new Request(locationURL, requestOpts)));
              finalize();
              return;
          }
        }
        res.once("end", function() {
          if (signal)
            signal.removeEventListener("abort", abortAndFinalize);
        });
        let body = res.pipe(new PassThrough$1());
        const response_options = {
          url: request.url,
          status: res.statusCode,
          statusText: res.statusMessage,
          headers,
          size: request.size,
          timeout: request.timeout,
          counter: request.counter
        };
        const codings = headers.get("Content-Encoding");
        if (!request.compress || request.method === "HEAD" || codings === null || res.statusCode === 204 || res.statusCode === 304) {
          response = new Response(body, response_options);
          resolve(response);
          return;
        }
        const zlibOptions = {
          flush: import_zlib.default.Z_SYNC_FLUSH,
          finishFlush: import_zlib.default.Z_SYNC_FLUSH
        };
        if (codings == "gzip" || codings == "x-gzip") {
          body = body.pipe(import_zlib.default.createGunzip(zlibOptions));
          response = new Response(body, response_options);
          resolve(response);
          return;
        }
        if (codings == "deflate" || codings == "x-deflate") {
          const raw = res.pipe(new PassThrough$1());
          raw.once("data", function(chunk) {
            if ((chunk[0] & 15) === 8) {
              body = body.pipe(import_zlib.default.createInflate());
            } else {
              body = body.pipe(import_zlib.default.createInflateRaw());
            }
            response = new Response(body, response_options);
            resolve(response);
          });
          return;
        }
        if (codings == "br" && typeof import_zlib.default.createBrotliDecompress === "function") {
          body = body.pipe(import_zlib.default.createBrotliDecompress());
          response = new Response(body, response_options);
          resolve(response);
          return;
        }
        response = new Response(body, response_options);
        resolve(response);
      });
      writeToStream(req, request);
    });
  }
  fetch.isRedirect = function(code) {
    return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
  };
  fetch.Promise = global.Promise;
  var lib_default = fetch;
});

// ../../node_modules/.pnpm/debug@4.3.2/node_modules/debug/src/common.js
var require_common3 = __commonJS((exports2, module2) => {
  function setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = require_ms();
    createDebug.destroy = destroy;
    Object.keys(env).forEach((key) => {
      createDebug[key] = env[key];
    });
    createDebug.names = [];
    createDebug.skips = [];
    createDebug.formatters = {};
    function selectColor(namespace) {
      let hash = 0;
      for (let i = 0; i < namespace.length; i++) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0;
      }
      return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
    }
    createDebug.selectColor = selectColor;
    function createDebug(namespace) {
      let prevTime;
      let enableOverride = null;
      let namespacesCache;
      let enabledCache;
      function debug3(...args) {
        if (!debug3.enabled) {
          return;
        }
        const self = debug3;
        const curr = Number(new Date());
        const ms = curr - (prevTime || curr);
        self.diff = ms;
        self.prev = prevTime;
        self.curr = curr;
        prevTime = curr;
        args[0] = createDebug.coerce(args[0]);
        if (typeof args[0] !== "string") {
          args.unshift("%O");
        }
        let index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
          if (match === "%%") {
            return "%";
          }
          index++;
          const formatter = createDebug.formatters[format];
          if (typeof formatter === "function") {
            const val = args[index];
            match = formatter.call(self, val);
            args.splice(index, 1);
            index--;
          }
          return match;
        });
        createDebug.formatArgs.call(self, args);
        const logFn = self.log || createDebug.log;
        logFn.apply(self, args);
      }
      debug3.namespace = namespace;
      debug3.useColors = createDebug.useColors();
      debug3.color = createDebug.selectColor(namespace);
      debug3.extend = extend;
      debug3.destroy = createDebug.destroy;
      Object.defineProperty(debug3, "enabled", {
        enumerable: true,
        configurable: false,
        get: () => {
          if (enableOverride !== null) {
            return enableOverride;
          }
          if (namespacesCache !== createDebug.namespaces) {
            namespacesCache = createDebug.namespaces;
            enabledCache = createDebug.enabled(namespace);
          }
          return enabledCache;
        },
        set: (v) => {
          enableOverride = v;
        }
      });
      if (typeof createDebug.init === "function") {
        createDebug.init(debug3);
      }
      return debug3;
    }
    function extend(namespace, delimiter) {
      const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
      newDebug.log = this.log;
      return newDebug;
    }
    function enable(namespaces) {
      createDebug.save(namespaces);
      createDebug.namespaces = namespaces;
      createDebug.names = [];
      createDebug.skips = [];
      let i;
      const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
      const len = split.length;
      for (i = 0; i < len; i++) {
        if (!split[i]) {
          continue;
        }
        namespaces = split[i].replace(/\*/g, ".*?");
        if (namespaces[0] === "-") {
          createDebug.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
        } else {
          createDebug.names.push(new RegExp("^" + namespaces + "$"));
        }
      }
    }
    function disable() {
      const namespaces = [
        ...createDebug.names.map(toNamespace),
        ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
      ].join(",");
      createDebug.enable("");
      return namespaces;
    }
    function enabled(name) {
      if (name[name.length - 1] === "*") {
        return true;
      }
      let i;
      let len;
      for (i = 0, len = createDebug.skips.length; i < len; i++) {
        if (createDebug.skips[i].test(name)) {
          return false;
        }
      }
      for (i = 0, len = createDebug.names.length; i < len; i++) {
        if (createDebug.names[i].test(name)) {
          return true;
        }
      }
      return false;
    }
    function toNamespace(regexp) {
      return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
    }
    function coerce(val) {
      if (val instanceof Error) {
        return val.stack || val.message;
      }
      return val;
    }
    function destroy() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    createDebug.enable(createDebug.load());
    return createDebug;
  }
  module2.exports = setup;
});

// ../../node_modules/.pnpm/debug@4.3.2/node_modules/debug/src/browser.js
var require_browser = __commonJS((exports2, module2) => {
  exports2.formatArgs = formatArgs;
  exports2.save = save;
  exports2.load = load;
  exports2.useColors = useColors;
  exports2.storage = localstorage();
  exports2.destroy = (() => {
    let warned = false;
    return () => {
      if (!warned) {
        warned = true;
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
    };
  })();
  exports2.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
  ];
  function useColors() {
    if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
      return true;
    }
    if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
      return false;
    }
    return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function formatArgs(args) {
    args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
    if (!this.useColors) {
      return;
    }
    const c = "color: " + this.color;
    args.splice(1, 0, c, "color: inherit");
    let index = 0;
    let lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, (match) => {
      if (match === "%%") {
        return;
      }
      index++;
      if (match === "%c") {
        lastC = index;
      }
    });
    args.splice(lastC, 0, c);
  }
  exports2.log = console.debug || console.log || (() => {
  });
  function save(namespaces) {
    try {
      if (namespaces) {
        exports2.storage.setItem("debug", namespaces);
      } else {
        exports2.storage.removeItem("debug");
      }
    } catch (error) {
    }
  }
  function load() {
    let r;
    try {
      r = exports2.storage.getItem("debug");
    } catch (error) {
    }
    if (!r && typeof process !== "undefined" && "env" in process) {
      r = process.env.DEBUG;
    }
    return r;
  }
  function localstorage() {
    try {
      return localStorage;
    } catch (error) {
    }
  }
  module2.exports = require_common3()(exports2);
  var {formatters} = module2.exports;
  formatters.j = function(v) {
    try {
      return JSON.stringify(v);
    } catch (error) {
      return "[UnexpectedJSONParseError]: " + error.message;
    }
  };
});

// ../../node_modules/.pnpm/debug@4.3.2/node_modules/debug/src/node.js
var require_node2 = __commonJS((exports2, module2) => {
  var tty = require("tty");
  var util = require("util");
  exports2.init = init;
  exports2.log = log;
  exports2.formatArgs = formatArgs;
  exports2.save = save;
  exports2.load = load;
  exports2.useColors = useColors;
  exports2.destroy = util.deprecate(() => {
  }, "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  exports2.colors = [6, 2, 3, 4, 5, 1];
  try {
    const supportsColor = require_supports_color();
    if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
      exports2.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ];
    }
  } catch (error) {
  }
  exports2.inspectOpts = Object.keys(process.env).filter((key) => {
    return /^debug_/i.test(key);
  }).reduce((obj, key) => {
    const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
      return k.toUpperCase();
    });
    let val = process.env[key];
    if (/^(yes|on|true|enabled)$/i.test(val)) {
      val = true;
    } else if (/^(no|off|false|disabled)$/i.test(val)) {
      val = false;
    } else if (val === "null") {
      val = null;
    } else {
      val = Number(val);
    }
    obj[prop] = val;
    return obj;
  }, {});
  function useColors() {
    return "colors" in exports2.inspectOpts ? Boolean(exports2.inspectOpts.colors) : tty.isatty(process.stderr.fd);
  }
  function formatArgs(args) {
    const {namespace: name, useColors: useColors2} = this;
    if (useColors2) {
      const c = this.color;
      const colorCode = "[3" + (c < 8 ? c : "8;5;" + c);
      const prefix = `  ${colorCode};1m${name} [0m`;
      args[0] = prefix + args[0].split("\n").join("\n" + prefix);
      args.push(colorCode + "m+" + module2.exports.humanize(this.diff) + "[0m");
    } else {
      args[0] = getDate() + name + " " + args[0];
    }
  }
  function getDate() {
    if (exports2.inspectOpts.hideDate) {
      return "";
    }
    return new Date().toISOString() + " ";
  }
  function log(...args) {
    return process.stderr.write(util.format(...args) + "\n");
  }
  function save(namespaces) {
    if (namespaces) {
      process.env.DEBUG = namespaces;
    } else {
      delete process.env.DEBUG;
    }
  }
  function load() {
    return process.env.DEBUG;
  }
  function init(debug3) {
    debug3.inspectOpts = {};
    const keys = Object.keys(exports2.inspectOpts);
    for (let i = 0; i < keys.length; i++) {
      debug3.inspectOpts[keys[i]] = exports2.inspectOpts[keys[i]];
    }
  }
  module2.exports = require_common3()(exports2);
  var {formatters} = module2.exports;
  formatters.o = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
  };
  formatters.O = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts);
  };
});

// ../../node_modules/.pnpm/debug@4.3.2/node_modules/debug/src/index.js
var require_src = __commonJS((exports2, module2) => {
  if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
    module2.exports = require_browser();
  } else {
    module2.exports = require_node2();
  }
});

// ../../node_modules/.pnpm/agent-base@6.0.2/node_modules/agent-base/dist/src/promisify.js
var require_promisify = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  function promisify(fn) {
    return function(req, opts) {
      return new Promise((resolve, reject) => {
        fn.call(this, req, opts, (err, rtn) => {
          if (err) {
            reject(err);
          } else {
            resolve(rtn);
          }
        });
      });
    };
  }
  exports2.default = promisify;
});

// ../../node_modules/.pnpm/agent-base@6.0.2/node_modules/agent-base/dist/src/index.js
var require_src2 = __commonJS((exports2, module2) => {
  "use strict";
  var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  var events_1 = require("events");
  var debug_12 = __importDefault2(require_src());
  var promisify_1 = __importDefault2(require_promisify());
  var debug3 = debug_12.default("agent-base");
  function isAgent(v) {
    return Boolean(v) && typeof v.addRequest === "function";
  }
  function isSecureEndpoint() {
    const {stack} = new Error();
    if (typeof stack !== "string")
      return false;
    return stack.split("\n").some((l) => l.indexOf("(https.js:") !== -1 || l.indexOf("node:https:") !== -1);
  }
  function createAgent(callback, opts) {
    return new createAgent.Agent(callback, opts);
  }
  (function(createAgent2) {
    class Agent extends events_1.EventEmitter {
      constructor(callback, _opts) {
        super();
        let opts = _opts;
        if (typeof callback === "function") {
          this.callback = callback;
        } else if (callback) {
          opts = callback;
        }
        this.timeout = null;
        if (opts && typeof opts.timeout === "number") {
          this.timeout = opts.timeout;
        }
        this.maxFreeSockets = 1;
        this.maxSockets = 1;
        this.maxTotalSockets = Infinity;
        this.sockets = {};
        this.freeSockets = {};
        this.requests = {};
        this.options = {};
      }
      get defaultPort() {
        if (typeof this.explicitDefaultPort === "number") {
          return this.explicitDefaultPort;
        }
        return isSecureEndpoint() ? 443 : 80;
      }
      set defaultPort(v) {
        this.explicitDefaultPort = v;
      }
      get protocol() {
        if (typeof this.explicitProtocol === "string") {
          return this.explicitProtocol;
        }
        return isSecureEndpoint() ? "https:" : "http:";
      }
      set protocol(v) {
        this.explicitProtocol = v;
      }
      callback(req, opts, fn) {
        throw new Error('"agent-base" has no default implementation, you must subclass and override `callback()`');
      }
      addRequest(req, _opts) {
        const opts = Object.assign({}, _opts);
        if (typeof opts.secureEndpoint !== "boolean") {
          opts.secureEndpoint = isSecureEndpoint();
        }
        if (opts.host == null) {
          opts.host = "localhost";
        }
        if (opts.port == null) {
          opts.port = opts.secureEndpoint ? 443 : 80;
        }
        if (opts.protocol == null) {
          opts.protocol = opts.secureEndpoint ? "https:" : "http:";
        }
        if (opts.host && opts.path) {
          delete opts.path;
        }
        delete opts.agent;
        delete opts.hostname;
        delete opts._defaultAgent;
        delete opts.defaultPort;
        delete opts.createConnection;
        req._last = true;
        req.shouldKeepAlive = false;
        let timedOut = false;
        let timeoutId = null;
        const timeoutMs = opts.timeout || this.timeout;
        const onerror = (err) => {
          if (req._hadError)
            return;
          req.emit("error", err);
          req._hadError = true;
        };
        const ontimeout = () => {
          timeoutId = null;
          timedOut = true;
          const err = new Error(`A "socket" was not created for HTTP request before ${timeoutMs}ms`);
          err.code = "ETIMEOUT";
          onerror(err);
        };
        const callbackError = (err) => {
          if (timedOut)
            return;
          if (timeoutId !== null) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
          onerror(err);
        };
        const onsocket = (socket) => {
          if (timedOut)
            return;
          if (timeoutId != null) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
          if (isAgent(socket)) {
            debug3("Callback returned another Agent instance %o", socket.constructor.name);
            socket.addRequest(req, opts);
            return;
          }
          if (socket) {
            socket.once("free", () => {
              this.freeSocket(socket, opts);
            });
            req.onSocket(socket);
            return;
          }
          const err = new Error(`no Duplex stream was returned to agent-base for \`${req.method} ${req.path}\``);
          onerror(err);
        };
        if (typeof this.callback !== "function") {
          onerror(new Error("`callback` is not defined"));
          return;
        }
        if (!this.promisifiedCallback) {
          if (this.callback.length >= 3) {
            debug3("Converting legacy callback function to promise");
            this.promisifiedCallback = promisify_1.default(this.callback);
          } else {
            this.promisifiedCallback = this.callback;
          }
        }
        if (typeof timeoutMs === "number" && timeoutMs > 0) {
          timeoutId = setTimeout(ontimeout, timeoutMs);
        }
        if ("port" in opts && typeof opts.port !== "number") {
          opts.port = Number(opts.port);
        }
        try {
          debug3("Resolving socket for %o request: %o", opts.protocol, `${req.method} ${req.path}`);
          Promise.resolve(this.promisifiedCallback(req, opts)).then(onsocket, callbackError);
        } catch (err) {
          Promise.reject(err).catch(callbackError);
        }
      }
      freeSocket(socket, opts) {
        debug3("Freeing socket %o %o", socket.constructor.name, opts);
        socket.destroy();
      }
      destroy() {
        debug3("Destroying agent %o", this.constructor.name);
      }
    }
    createAgent2.Agent = Agent;
    createAgent2.prototype = createAgent2.Agent.prototype;
  })(createAgent || (createAgent = {}));
  module2.exports = createAgent;
});

// ../../node_modules/.pnpm/https-proxy-agent@5.0.0/node_modules/https-proxy-agent/dist/parse-proxy-response.js
var require_parse_proxy_response = __commonJS((exports2) => {
  "use strict";
  var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var debug_12 = __importDefault2(require_src());
  var debug3 = debug_12.default("https-proxy-agent:parse-proxy-response");
  function parseProxyResponse(socket) {
    return new Promise((resolve, reject) => {
      let buffersLength = 0;
      const buffers = [];
      function read() {
        const b = socket.read();
        if (b)
          ondata(b);
        else
          socket.once("readable", read);
      }
      function cleanup() {
        socket.removeListener("end", onend);
        socket.removeListener("error", onerror);
        socket.removeListener("close", onclose);
        socket.removeListener("readable", read);
      }
      function onclose(err) {
        debug3("onclose had error %o", err);
      }
      function onend() {
        debug3("onend");
      }
      function onerror(err) {
        cleanup();
        debug3("onerror %o", err);
        reject(err);
      }
      function ondata(b) {
        buffers.push(b);
        buffersLength += b.length;
        const buffered = Buffer.concat(buffers, buffersLength);
        const endOfHeaders = buffered.indexOf("\r\n\r\n");
        if (endOfHeaders === -1) {
          debug3("have not received end of HTTP headers yet...");
          read();
          return;
        }
        const firstLine = buffered.toString("ascii", 0, buffered.indexOf("\r\n"));
        const statusCode = +firstLine.split(" ")[1];
        debug3("got proxy server response: %o", firstLine);
        resolve({
          statusCode,
          buffered
        });
      }
      socket.on("error", onerror);
      socket.on("close", onclose);
      socket.on("end", onend);
      read();
    });
  }
  exports2.default = parseProxyResponse;
});

// ../../node_modules/.pnpm/https-proxy-agent@5.0.0/node_modules/https-proxy-agent/dist/agent.js
var require_agent = __commonJS((exports2) => {
  "use strict";
  var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var net_1 = __importDefault2(require("net"));
  var tls_1 = __importDefault2(require("tls"));
  var url_1 = __importDefault2(require("url"));
  var assert_1 = __importDefault2(require("assert"));
  var debug_12 = __importDefault2(require_src());
  var agent_base_1 = require_src2();
  var parse_proxy_response_1 = __importDefault2(require_parse_proxy_response());
  var debug3 = debug_12.default("https-proxy-agent:agent");
  var HttpsProxyAgent = class extends agent_base_1.Agent {
    constructor(_opts) {
      let opts;
      if (typeof _opts === "string") {
        opts = url_1.default.parse(_opts);
      } else {
        opts = _opts;
      }
      if (!opts) {
        throw new Error("an HTTP(S) proxy server `host` and `port` must be specified!");
      }
      debug3("creating new HttpsProxyAgent instance: %o", opts);
      super(opts);
      const proxy = Object.assign({}, opts);
      this.secureProxy = opts.secureProxy || isHTTPS(proxy.protocol);
      proxy.host = proxy.hostname || proxy.host;
      if (typeof proxy.port === "string") {
        proxy.port = parseInt(proxy.port, 10);
      }
      if (!proxy.port && proxy.host) {
        proxy.port = this.secureProxy ? 443 : 80;
      }
      if (this.secureProxy && !("ALPNProtocols" in proxy)) {
        proxy.ALPNProtocols = ["http 1.1"];
      }
      if (proxy.host && proxy.path) {
        delete proxy.path;
        delete proxy.pathname;
      }
      this.proxy = proxy;
    }
    callback(req, opts) {
      return __awaiter(this, void 0, void 0, function* () {
        const {proxy, secureProxy} = this;
        let socket;
        if (secureProxy) {
          debug3("Creating `tls.Socket`: %o", proxy);
          socket = tls_1.default.connect(proxy);
        } else {
          debug3("Creating `net.Socket`: %o", proxy);
          socket = net_1.default.connect(proxy);
        }
        const headers = Object.assign({}, proxy.headers);
        const hostname = `${opts.host}:${opts.port}`;
        let payload = `CONNECT ${hostname} HTTP/1.1\r
`;
        if (proxy.auth) {
          headers["Proxy-Authorization"] = `Basic ${Buffer.from(proxy.auth).toString("base64")}`;
        }
        let {host, port, secureEndpoint} = opts;
        if (!isDefaultPort(port, secureEndpoint)) {
          host += `:${port}`;
        }
        headers.Host = host;
        headers.Connection = "close";
        for (const name of Object.keys(headers)) {
          payload += `${name}: ${headers[name]}\r
`;
        }
        const proxyResponsePromise = parse_proxy_response_1.default(socket);
        socket.write(`${payload}\r
`);
        const {statusCode, buffered} = yield proxyResponsePromise;
        if (statusCode === 200) {
          req.once("socket", resume);
          if (opts.secureEndpoint) {
            const servername = opts.servername || opts.host;
            if (!servername) {
              throw new Error('Could not determine "servername"');
            }
            debug3("Upgrading socket connection to TLS");
            return tls_1.default.connect(Object.assign(Object.assign({}, omit(opts, "host", "hostname", "path", "port")), {
              socket,
              servername
            }));
          }
          return socket;
        }
        socket.destroy();
        const fakeSocket = new net_1.default.Socket();
        fakeSocket.readable = true;
        req.once("socket", (s) => {
          debug3("replaying proxy buffer for failed request");
          assert_1.default(s.listenerCount("data") > 0);
          s.push(buffered);
          s.push(null);
        });
        return fakeSocket;
      });
    }
  };
  exports2.default = HttpsProxyAgent;
  function resume(socket) {
    socket.resume();
  }
  function isDefaultPort(port, secure) {
    return Boolean(!secure && port === 80 || secure && port === 443);
  }
  function isHTTPS(protocol) {
    return typeof protocol === "string" ? /^https:?$/i.test(protocol) : false;
  }
  function omit(obj, ...keys) {
    const ret = {};
    let key;
    for (key in obj) {
      if (!keys.includes(key)) {
        ret[key] = obj[key];
      }
    }
    return ret;
  }
});

// ../../node_modules/.pnpm/https-proxy-agent@5.0.0/node_modules/https-proxy-agent/dist/index.js
var require_dist3 = __commonJS((exports2, module2) => {
  "use strict";
  var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  var agent_1 = __importDefault2(require_agent());
  function createHttpsProxyAgent(opts) {
    return new agent_1.default(opts);
  }
  (function(createHttpsProxyAgent2) {
    createHttpsProxyAgent2.HttpsProxyAgent = agent_1.default;
    createHttpsProxyAgent2.prototype = agent_1.default.prototype;
  })(createHttpsProxyAgent || (createHttpsProxyAgent = {}));
  module2.exports = createHttpsProxyAgent;
});

// ../../node_modules/.pnpm/@tootallnate/once@1.1.2/node_modules/@tootallnate/once/dist/index.js
var require_dist4 = __commonJS((exports2, module2) => {
  "use strict";
  function noop() {
  }
  function once(emitter, name) {
    const o = once.spread(emitter, name);
    const r = o.then((args) => args[0]);
    r.cancel = o.cancel;
    return r;
  }
  (function(once2) {
    function spread(emitter, name) {
      let c = null;
      const p = new Promise((resolve, reject) => {
        function cancel() {
          emitter.removeListener(name, onEvent);
          emitter.removeListener("error", onError);
          p.cancel = noop;
        }
        function onEvent(...args) {
          cancel();
          resolve(args);
        }
        function onError(err) {
          cancel();
          reject(err);
        }
        c = cancel;
        emitter.on(name, onEvent);
        emitter.on("error", onError);
      });
      if (!c) {
        throw new TypeError("Could not get `cancel()` function");
      }
      p.cancel = c;
      return p;
    }
    once2.spread = spread;
  })(once || (once = {}));
  module2.exports = once;
});

// ../../node_modules/.pnpm/http-proxy-agent@4.0.1/node_modules/http-proxy-agent/dist/agent.js
var require_agent2 = __commonJS((exports2) => {
  "use strict";
  var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var net_1 = __importDefault2(require("net"));
  var tls_1 = __importDefault2(require("tls"));
  var url_1 = __importDefault2(require("url"));
  var debug_12 = __importDefault2(require_src());
  var once_1 = __importDefault2(require_dist4());
  var agent_base_1 = require_src2();
  var debug3 = debug_12.default("http-proxy-agent");
  function isHTTPS(protocol) {
    return typeof protocol === "string" ? /^https:?$/i.test(protocol) : false;
  }
  var HttpProxyAgent = class extends agent_base_1.Agent {
    constructor(_opts) {
      let opts;
      if (typeof _opts === "string") {
        opts = url_1.default.parse(_opts);
      } else {
        opts = _opts;
      }
      if (!opts) {
        throw new Error("an HTTP(S) proxy server `host` and `port` must be specified!");
      }
      debug3("Creating new HttpProxyAgent instance: %o", opts);
      super(opts);
      const proxy = Object.assign({}, opts);
      this.secureProxy = opts.secureProxy || isHTTPS(proxy.protocol);
      proxy.host = proxy.hostname || proxy.host;
      if (typeof proxy.port === "string") {
        proxy.port = parseInt(proxy.port, 10);
      }
      if (!proxy.port && proxy.host) {
        proxy.port = this.secureProxy ? 443 : 80;
      }
      if (proxy.host && proxy.path) {
        delete proxy.path;
        delete proxy.pathname;
      }
      this.proxy = proxy;
    }
    callback(req, opts) {
      return __awaiter(this, void 0, void 0, function* () {
        const {proxy, secureProxy} = this;
        const parsed = url_1.default.parse(req.path);
        if (!parsed.protocol) {
          parsed.protocol = "http:";
        }
        if (!parsed.hostname) {
          parsed.hostname = opts.hostname || opts.host || null;
        }
        if (parsed.port == null && typeof opts.port) {
          parsed.port = String(opts.port);
        }
        if (parsed.port === "80") {
          delete parsed.port;
        }
        req.path = url_1.default.format(parsed);
        if (proxy.auth) {
          req.setHeader("Proxy-Authorization", `Basic ${Buffer.from(proxy.auth).toString("base64")}`);
        }
        let socket;
        if (secureProxy) {
          debug3("Creating `tls.Socket`: %o", proxy);
          socket = tls_1.default.connect(proxy);
        } else {
          debug3("Creating `net.Socket`: %o", proxy);
          socket = net_1.default.connect(proxy);
        }
        if (req._header) {
          let first;
          let endOfHeaders;
          debug3("Regenerating stored HTTP header string for request");
          req._header = null;
          req._implicitHeader();
          if (req.output && req.output.length > 0) {
            debug3("Patching connection write() output buffer with updated header");
            first = req.output[0];
            endOfHeaders = first.indexOf("\r\n\r\n") + 4;
            req.output[0] = req._header + first.substring(endOfHeaders);
            debug3("Output buffer: %o", req.output);
          } else if (req.outputData && req.outputData.length > 0) {
            debug3("Patching connection write() output buffer with updated header");
            first = req.outputData[0].data;
            endOfHeaders = first.indexOf("\r\n\r\n") + 4;
            req.outputData[0].data = req._header + first.substring(endOfHeaders);
            debug3("Output buffer: %o", req.outputData[0].data);
          }
        }
        yield once_1.default(socket, "connect");
        return socket;
      });
    }
  };
  exports2.default = HttpProxyAgent;
});

// ../../node_modules/.pnpm/http-proxy-agent@4.0.1/node_modules/http-proxy-agent/dist/index.js
var require_dist5 = __commonJS((exports2, module2) => {
  "use strict";
  var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  var agent_1 = __importDefault2(require_agent2());
  function createHttpProxyAgent(opts) {
    return new agent_1.default(opts);
  }
  (function(createHttpProxyAgent2) {
    createHttpProxyAgent2.HttpProxyAgent = agent_1.default;
    createHttpProxyAgent2.prototype = agent_1.default.prototype;
  })(createHttpProxyAgent || (createHttpProxyAgent = {}));
  module2.exports = createHttpProxyAgent;
});

// ../../node_modules/.pnpm/@prisma/fetch-engine@2.24.1/node_modules/@prisma/fetch-engine/dist/getProxyAgent.js
var require_getProxyAgent = __commonJS((exports2) => {
  "use strict";
  var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.getProxyAgent = void 0;
  var https_proxy_agent_1 = __importDefault2(require_dist3());
  var http_proxy_agent_1 = __importDefault2(require_dist5());
  var url_1 = __importDefault2(require("url"));
  function formatHostname(hostname) {
    return hostname.replace(/^\.*/, ".").toLowerCase();
  }
  function parseNoProxyZone(zone) {
    zone = zone.trim().toLowerCase();
    const zoneParts = zone.split(":", 2);
    const zoneHost = formatHostname(zoneParts[0]);
    const zonePort = zoneParts[1];
    const hasPort = zone.includes(":");
    return {hostname: zoneHost, port: zonePort, hasPort};
  }
  function uriInNoProxy(uri, noProxy) {
    const port = uri.port || (uri.protocol === "https:" ? "443" : "80");
    const hostname = formatHostname(uri.hostname);
    const noProxyList = noProxy.split(",");
    return noProxyList.map(parseNoProxyZone).some(function(noProxyZone) {
      const isMatchedAt = hostname.indexOf(noProxyZone.hostname);
      const hostnameMatched = isMatchedAt > -1 && isMatchedAt === hostname.length - noProxyZone.hostname.length;
      if (noProxyZone.hasPort) {
        return port === noProxyZone.port && hostnameMatched;
      }
      return hostnameMatched;
    });
  }
  function getProxyFromURI(uri) {
    const noProxy = process.env.NO_PROXY || process.env.no_proxy || "";
    if (noProxy === "*") {
      return null;
    }
    if (noProxy !== "" && uriInNoProxy(uri, noProxy)) {
      return null;
    }
    if (uri.protocol === "http:") {
      return process.env.HTTP_PROXY || process.env.http_proxy || null;
    }
    if (uri.protocol === "https:") {
      return process.env.HTTPS_PROXY || process.env.https_proxy || process.env.HTTP_PROXY || process.env.http_proxy || null;
    }
    return null;
  }
  function getProxyAgent(url) {
    const uri = url_1.default.parse(url);
    const proxy = getProxyFromURI(uri);
    if (!proxy) {
      return void 0;
    }
    if (uri.protocol === "http:") {
      return http_proxy_agent_1.default(proxy);
    }
    if (uri.protocol === "https:") {
      return https_proxy_agent_1.default(proxy);
    }
    return void 0;
  }
  exports2.getProxyAgent = getProxyAgent;
});

// ../../node_modules/.pnpm/crypto-random-string@2.0.0/node_modules/crypto-random-string/index.js
var require_crypto_random_string = __commonJS((exports2, module2) => {
  "use strict";
  var crypto = require("crypto");
  module2.exports = (length) => {
    if (!Number.isFinite(length)) {
      throw new TypeError("Expected a finite number");
    }
    return crypto.randomBytes(Math.ceil(length / 2)).toString("hex").slice(0, length);
  };
});

// ../../node_modules/.pnpm/unique-string@2.0.0/node_modules/unique-string/index.js
var require_unique_string = __commonJS((exports2, module2) => {
  "use strict";
  var cryptoRandomString = require_crypto_random_string();
  module2.exports = () => cryptoRandomString(32);
});

// ../../node_modules/.pnpm/array-union@2.1.0/node_modules/array-union/index.js
var require_array_union = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = (...arguments_) => {
    return [...new Set([].concat(...arguments_))];
  };
});

// ../../node_modules/.pnpm/merge2@1.4.1/node_modules/merge2/index.js
var require_merge2 = __commonJS((exports2, module2) => {
  "use strict";
  var Stream = require("stream");
  var PassThrough = Stream.PassThrough;
  var slice = Array.prototype.slice;
  module2.exports = merge2;
  function merge2() {
    const streamsQueue = [];
    const args = slice.call(arguments);
    let merging = false;
    let options = args[args.length - 1];
    if (options && !Array.isArray(options) && options.pipe == null) {
      args.pop();
    } else {
      options = {};
    }
    const doEnd = options.end !== false;
    const doPipeError = options.pipeError === true;
    if (options.objectMode == null) {
      options.objectMode = true;
    }
    if (options.highWaterMark == null) {
      options.highWaterMark = 64 * 1024;
    }
    const mergedStream = PassThrough(options);
    function addStream() {
      for (let i = 0, len = arguments.length; i < len; i++) {
        streamsQueue.push(pauseStreams(arguments[i], options));
      }
      mergeStream();
      return this;
    }
    function mergeStream() {
      if (merging) {
        return;
      }
      merging = true;
      let streams = streamsQueue.shift();
      if (!streams) {
        process.nextTick(endStream);
        return;
      }
      if (!Array.isArray(streams)) {
        streams = [streams];
      }
      let pipesCount = streams.length + 1;
      function next() {
        if (--pipesCount > 0) {
          return;
        }
        merging = false;
        mergeStream();
      }
      function pipe(stream) {
        function onend() {
          stream.removeListener("merge2UnpipeEnd", onend);
          stream.removeListener("end", onend);
          if (doPipeError) {
            stream.removeListener("error", onerror);
          }
          next();
        }
        function onerror(err) {
          mergedStream.emit("error", err);
        }
        if (stream._readableState.endEmitted) {
          return next();
        }
        stream.on("merge2UnpipeEnd", onend);
        stream.on("end", onend);
        if (doPipeError) {
          stream.on("error", onerror);
        }
        stream.pipe(mergedStream, {end: false});
        stream.resume();
      }
      for (let i = 0; i < streams.length; i++) {
        pipe(streams[i]);
      }
      next();
    }
    function endStream() {
      merging = false;
      mergedStream.emit("queueDrain");
      if (doEnd) {
        mergedStream.end();
      }
    }
    mergedStream.setMaxListeners(0);
    mergedStream.add = addStream;
    mergedStream.on("unpipe", function(stream) {
      stream.emit("merge2UnpipeEnd");
    });
    if (args.length) {
      addStream.apply(null, args);
    }
    return mergedStream;
  }
  function pauseStreams(streams, options) {
    if (!Array.isArray(streams)) {
      if (!streams._readableState && streams.pipe) {
        streams = streams.pipe(PassThrough(options));
      }
      if (!streams._readableState || !streams.pause || !streams.pipe) {
        throw new Error("Only readable stream can be merged.");
      }
      streams.pause();
    } else {
      for (let i = 0, len = streams.length; i < len; i++) {
        streams[i] = pauseStreams(streams[i], options);
      }
    }
    return streams;
  }
});

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/utils/array.js
var require_array = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.splitWhen = exports2.flatten = void 0;
  function flatten(items) {
    return items.reduce((collection, item) => [].concat(collection, item), []);
  }
  exports2.flatten = flatten;
  function splitWhen(items, predicate) {
    const result = [[]];
    let groupIndex = 0;
    for (const item of items) {
      if (predicate(item)) {
        groupIndex++;
        result[groupIndex] = [];
      } else {
        result[groupIndex].push(item);
      }
    }
    return result;
  }
  exports2.splitWhen = splitWhen;
});

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/utils/errno.js
var require_errno = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.isEnoentCodeError = void 0;
  function isEnoentCodeError(error) {
    return error.code === "ENOENT";
  }
  exports2.isEnoentCodeError = isEnoentCodeError;
});

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/utils/fs.js
var require_fs2 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.createDirentFromStats = void 0;
  var DirentFromStats = class {
    constructor(name, stats) {
      this.name = name;
      this.isBlockDevice = stats.isBlockDevice.bind(stats);
      this.isCharacterDevice = stats.isCharacterDevice.bind(stats);
      this.isDirectory = stats.isDirectory.bind(stats);
      this.isFIFO = stats.isFIFO.bind(stats);
      this.isFile = stats.isFile.bind(stats);
      this.isSocket = stats.isSocket.bind(stats);
      this.isSymbolicLink = stats.isSymbolicLink.bind(stats);
    }
  };
  function createDirentFromStats(name, stats) {
    return new DirentFromStats(name, stats);
  }
  exports2.createDirentFromStats = createDirentFromStats;
});

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/utils/path.js
var require_path = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.removeLeadingDotSegment = exports2.escape = exports2.makeAbsolute = exports2.unixify = void 0;
  var path2 = require("path");
  var LEADING_DOT_SEGMENT_CHARACTERS_COUNT = 2;
  var UNESCAPED_GLOB_SYMBOLS_RE = /(\\?)([()*?[\]{|}]|^!|[!+@](?=\())/g;
  function unixify(filepath) {
    return filepath.replace(/\\/g, "/");
  }
  exports2.unixify = unixify;
  function makeAbsolute(cwd, filepath) {
    return path2.resolve(cwd, filepath);
  }
  exports2.makeAbsolute = makeAbsolute;
  function escape(pattern) {
    return pattern.replace(UNESCAPED_GLOB_SYMBOLS_RE, "\\$2");
  }
  exports2.escape = escape;
  function removeLeadingDotSegment(entry) {
    if (entry.charAt(0) === ".") {
      const secondCharactery = entry.charAt(1);
      if (secondCharactery === "/" || secondCharactery === "\\") {
        return entry.slice(LEADING_DOT_SEGMENT_CHARACTERS_COUNT);
      }
    }
    return entry;
  }
  exports2.removeLeadingDotSegment = removeLeadingDotSegment;
});

// ../../node_modules/.pnpm/is-extglob@2.1.1/node_modules/is-extglob/index.js
var require_is_extglob = __commonJS((exports2, module2) => {
  /*!
   * is-extglob <https://github.com/jonschlinkert/is-extglob>
   *
   * Copyright (c) 2014-2016, Jon Schlinkert.
   * Licensed under the MIT License.
   */
  module2.exports = function isExtglob(str) {
    if (typeof str !== "string" || str === "") {
      return false;
    }
    var match;
    while (match = /(\\).|([@?!+*]\(.*\))/g.exec(str)) {
      if (match[2])
        return true;
      str = str.slice(match.index + match[0].length);
    }
    return false;
  };
});

// ../../node_modules/.pnpm/is-glob@4.0.1/node_modules/is-glob/index.js
var require_is_glob = __commonJS((exports2, module2) => {
  /*!
   * is-glob <https://github.com/jonschlinkert/is-glob>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   */
  var isExtglob = require_is_extglob();
  var chars = {"{": "}", "(": ")", "[": "]"};
  var strictRegex = /\\(.)|(^!|\*|[\].+)]\?|\[[^\\\]]+\]|\{[^\\}]+\}|\(\?[:!=][^\\)]+\)|\([^|]+\|[^\\)]+\))/;
  var relaxedRegex = /\\(.)|(^!|[*?{}()[\]]|\(\?)/;
  module2.exports = function isGlob(str, options) {
    if (typeof str !== "string" || str === "") {
      return false;
    }
    if (isExtglob(str)) {
      return true;
    }
    var regex = strictRegex;
    var match;
    if (options && options.strict === false) {
      regex = relaxedRegex;
    }
    while (match = regex.exec(str)) {
      if (match[2])
        return true;
      var idx = match.index + match[0].length;
      var open = match[1];
      var close = open ? chars[open] : null;
      if (open && close) {
        var n = str.indexOf(close, idx);
        if (n !== -1) {
          idx = n + 1;
        }
      }
      str = str.slice(idx);
    }
    return false;
  };
});

// ../../node_modules/.pnpm/glob-parent@5.1.2/node_modules/glob-parent/index.js
var require_glob_parent = __commonJS((exports2, module2) => {
  "use strict";
  var isGlob = require_is_glob();
  var pathPosixDirname = require("path").posix.dirname;
  var isWin32 = require("os").platform() === "win32";
  var slash = "/";
  var backslash = /\\/g;
  var enclosure = /[\{\[].*[\}\]]$/;
  var globby = /(^|[^\\])([\{\[]|\([^\)]+$)/;
  var escaped = /\\([\!\*\?\|\[\]\(\)\{\}])/g;
  module2.exports = function globParent(str, opts) {
    var options = Object.assign({flipBackslashes: true}, opts);
    if (options.flipBackslashes && isWin32 && str.indexOf(slash) < 0) {
      str = str.replace(backslash, slash);
    }
    if (enclosure.test(str)) {
      str += slash;
    }
    str += "a";
    do {
      str = pathPosixDirname(str);
    } while (isGlob(str) || globby.test(str));
    return str.replace(escaped, "$1");
  };
});

// ../../node_modules/.pnpm/braces@3.0.2/node_modules/braces/lib/utils.js
var require_utils = __commonJS((exports2) => {
  "use strict";
  exports2.isInteger = (num) => {
    if (typeof num === "number") {
      return Number.isInteger(num);
    }
    if (typeof num === "string" && num.trim() !== "") {
      return Number.isInteger(Number(num));
    }
    return false;
  };
  exports2.find = (node, type) => node.nodes.find((node2) => node2.type === type);
  exports2.exceedsLimit = (min, max, step = 1, limit) => {
    if (limit === false)
      return false;
    if (!exports2.isInteger(min) || !exports2.isInteger(max))
      return false;
    return (Number(max) - Number(min)) / Number(step) >= limit;
  };
  exports2.escapeNode = (block, n = 0, type) => {
    let node = block.nodes[n];
    if (!node)
      return;
    if (type && node.type === type || node.type === "open" || node.type === "close") {
      if (node.escaped !== true) {
        node.value = "\\" + node.value;
        node.escaped = true;
      }
    }
  };
  exports2.encloseBrace = (node) => {
    if (node.type !== "brace")
      return false;
    if (node.commas >> 0 + node.ranges >> 0 === 0) {
      node.invalid = true;
      return true;
    }
    return false;
  };
  exports2.isInvalidBrace = (block) => {
    if (block.type !== "brace")
      return false;
    if (block.invalid === true || block.dollar)
      return true;
    if (block.commas >> 0 + block.ranges >> 0 === 0) {
      block.invalid = true;
      return true;
    }
    if (block.open !== true || block.close !== true) {
      block.invalid = true;
      return true;
    }
    return false;
  };
  exports2.isOpenOrClose = (node) => {
    if (node.type === "open" || node.type === "close") {
      return true;
    }
    return node.open === true || node.close === true;
  };
  exports2.reduce = (nodes) => nodes.reduce((acc, node) => {
    if (node.type === "text")
      acc.push(node.value);
    if (node.type === "range")
      node.type = "text";
    return acc;
  }, []);
  exports2.flatten = (...args) => {
    const result = [];
    const flat = (arr) => {
      for (let i = 0; i < arr.length; i++) {
        let ele = arr[i];
        Array.isArray(ele) ? flat(ele, result) : ele !== void 0 && result.push(ele);
      }
      return result;
    };
    flat(args);
    return result;
  };
});

// ../../node_modules/.pnpm/braces@3.0.2/node_modules/braces/lib/stringify.js
var require_stringify = __commonJS((exports2, module2) => {
  "use strict";
  var utils = require_utils();
  module2.exports = (ast, options = {}) => {
    let stringify = (node, parent = {}) => {
      let invalidBlock = options.escapeInvalid && utils.isInvalidBrace(parent);
      let invalidNode = node.invalid === true && options.escapeInvalid === true;
      let output = "";
      if (node.value) {
        if ((invalidBlock || invalidNode) && utils.isOpenOrClose(node)) {
          return "\\" + node.value;
        }
        return node.value;
      }
      if (node.value) {
        return node.value;
      }
      if (node.nodes) {
        for (let child of node.nodes) {
          output += stringify(child);
        }
      }
      return output;
    };
    return stringify(ast);
  };
});

// ../../node_modules/.pnpm/is-number@7.0.0/node_modules/is-number/index.js
var require_is_number = __commonJS((exports2, module2) => {
  /*!
   * is-number <https://github.com/jonschlinkert/is-number>
   *
   * Copyright (c) 2014-present, Jon Schlinkert.
   * Released under the MIT License.
   */
  "use strict";
  module2.exports = function(num) {
    if (typeof num === "number") {
      return num - num === 0;
    }
    if (typeof num === "string" && num.trim() !== "") {
      return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
    }
    return false;
  };
});

// ../../node_modules/.pnpm/to-regex-range@5.0.1/node_modules/to-regex-range/index.js
var require_to_regex_range = __commonJS((exports2, module2) => {
  /*!
   * to-regex-range <https://github.com/micromatch/to-regex-range>
   *
   * Copyright (c) 2015-present, Jon Schlinkert.
   * Released under the MIT License.
   */
  "use strict";
  var isNumber = require_is_number();
  var toRegexRange = (min, max, options) => {
    if (isNumber(min) === false) {
      throw new TypeError("toRegexRange: expected the first argument to be a number");
    }
    if (max === void 0 || min === max) {
      return String(min);
    }
    if (isNumber(max) === false) {
      throw new TypeError("toRegexRange: expected the second argument to be a number.");
    }
    let opts = {relaxZeros: true, ...options};
    if (typeof opts.strictZeros === "boolean") {
      opts.relaxZeros = opts.strictZeros === false;
    }
    let relax = String(opts.relaxZeros);
    let shorthand = String(opts.shorthand);
    let capture = String(opts.capture);
    let wrap = String(opts.wrap);
    let cacheKey = min + ":" + max + "=" + relax + shorthand + capture + wrap;
    if (toRegexRange.cache.hasOwnProperty(cacheKey)) {
      return toRegexRange.cache[cacheKey].result;
    }
    let a = Math.min(min, max);
    let b = Math.max(min, max);
    if (Math.abs(a - b) === 1) {
      let result = min + "|" + max;
      if (opts.capture) {
        return `(${result})`;
      }
      if (opts.wrap === false) {
        return result;
      }
      return `(?:${result})`;
    }
    let isPadded = hasPadding(min) || hasPadding(max);
    let state = {min, max, a, b};
    let positives = [];
    let negatives = [];
    if (isPadded) {
      state.isPadded = isPadded;
      state.maxLen = String(state.max).length;
    }
    if (a < 0) {
      let newMin = b < 0 ? Math.abs(b) : 1;
      negatives = splitToPatterns(newMin, Math.abs(a), state, opts);
      a = state.a = 0;
    }
    if (b >= 0) {
      positives = splitToPatterns(a, b, state, opts);
    }
    state.negatives = negatives;
    state.positives = positives;
    state.result = collatePatterns(negatives, positives, opts);
    if (opts.capture === true) {
      state.result = `(${state.result})`;
    } else if (opts.wrap !== false && positives.length + negatives.length > 1) {
      state.result = `(?:${state.result})`;
    }
    toRegexRange.cache[cacheKey] = state;
    return state.result;
  };
  function collatePatterns(neg, pos, options) {
    let onlyNegative = filterPatterns(neg, pos, "-", false, options) || [];
    let onlyPositive = filterPatterns(pos, neg, "", false, options) || [];
    let intersected = filterPatterns(neg, pos, "-?", true, options) || [];
    let subpatterns = onlyNegative.concat(intersected).concat(onlyPositive);
    return subpatterns.join("|");
  }
  function splitToRanges(min, max) {
    let nines = 1;
    let zeros = 1;
    let stop = countNines(min, nines);
    let stops = new Set([max]);
    while (min <= stop && stop <= max) {
      stops.add(stop);
      nines += 1;
      stop = countNines(min, nines);
    }
    stop = countZeros(max + 1, zeros) - 1;
    while (min < stop && stop <= max) {
      stops.add(stop);
      zeros += 1;
      stop = countZeros(max + 1, zeros) - 1;
    }
    stops = [...stops];
    stops.sort(compare);
    return stops;
  }
  function rangeToPattern(start, stop, options) {
    if (start === stop) {
      return {pattern: start, count: [], digits: 0};
    }
    let zipped = zip(start, stop);
    let digits = zipped.length;
    let pattern = "";
    let count = 0;
    for (let i = 0; i < digits; i++) {
      let [startDigit, stopDigit] = zipped[i];
      if (startDigit === stopDigit) {
        pattern += startDigit;
      } else if (startDigit !== "0" || stopDigit !== "9") {
        pattern += toCharacterClass(startDigit, stopDigit, options);
      } else {
        count++;
      }
    }
    if (count) {
      pattern += options.shorthand === true ? "\\d" : "[0-9]";
    }
    return {pattern, count: [count], digits};
  }
  function splitToPatterns(min, max, tok, options) {
    let ranges = splitToRanges(min, max);
    let tokens = [];
    let start = min;
    let prev;
    for (let i = 0; i < ranges.length; i++) {
      let max2 = ranges[i];
      let obj = rangeToPattern(String(start), String(max2), options);
      let zeros = "";
      if (!tok.isPadded && prev && prev.pattern === obj.pattern) {
        if (prev.count.length > 1) {
          prev.count.pop();
        }
        prev.count.push(obj.count[0]);
        prev.string = prev.pattern + toQuantifier(prev.count);
        start = max2 + 1;
        continue;
      }
      if (tok.isPadded) {
        zeros = padZeros(max2, tok, options);
      }
      obj.string = zeros + obj.pattern + toQuantifier(obj.count);
      tokens.push(obj);
      start = max2 + 1;
      prev = obj;
    }
    return tokens;
  }
  function filterPatterns(arr, comparison, prefix, intersection, options) {
    let result = [];
    for (let ele of arr) {
      let {string} = ele;
      if (!intersection && !contains(comparison, "string", string)) {
        result.push(prefix + string);
      }
      if (intersection && contains(comparison, "string", string)) {
        result.push(prefix + string);
      }
    }
    return result;
  }
  function zip(a, b) {
    let arr = [];
    for (let i = 0; i < a.length; i++)
      arr.push([a[i], b[i]]);
    return arr;
  }
  function compare(a, b) {
    return a > b ? 1 : b > a ? -1 : 0;
  }
  function contains(arr, key, val) {
    return arr.some((ele) => ele[key] === val);
  }
  function countNines(min, len) {
    return Number(String(min).slice(0, -len) + "9".repeat(len));
  }
  function countZeros(integer, zeros) {
    return integer - integer % Math.pow(10, zeros);
  }
  function toQuantifier(digits) {
    let [start = 0, stop = ""] = digits;
    if (stop || start > 1) {
      return `{${start + (stop ? "," + stop : "")}}`;
    }
    return "";
  }
  function toCharacterClass(a, b, options) {
    return `[${a}${b - a === 1 ? "" : "-"}${b}]`;
  }
  function hasPadding(str) {
    return /^-?(0+)\d/.test(str);
  }
  function padZeros(value, tok, options) {
    if (!tok.isPadded) {
      return value;
    }
    let diff = Math.abs(tok.maxLen - String(value).length);
    let relax = options.relaxZeros !== false;
    switch (diff) {
      case 0:
        return "";
      case 1:
        return relax ? "0?" : "0";
      case 2:
        return relax ? "0{0,2}" : "00";
      default: {
        return relax ? `0{0,${diff}}` : `0{${diff}}`;
      }
    }
  }
  toRegexRange.cache = {};
  toRegexRange.clearCache = () => toRegexRange.cache = {};
  module2.exports = toRegexRange;
});

// ../../node_modules/.pnpm/fill-range@7.0.1/node_modules/fill-range/index.js
var require_fill_range = __commonJS((exports2, module2) => {
  /*!
   * fill-range <https://github.com/jonschlinkert/fill-range>
   *
   * Copyright (c) 2014-present, Jon Schlinkert.
   * Licensed under the MIT License.
   */
  "use strict";
  var util = require("util");
  var toRegexRange = require_to_regex_range();
  var isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
  var transform = (toNumber) => {
    return (value) => toNumber === true ? Number(value) : String(value);
  };
  var isValidValue = (value) => {
    return typeof value === "number" || typeof value === "string" && value !== "";
  };
  var isNumber = (num) => Number.isInteger(+num);
  var zeros = (input) => {
    let value = `${input}`;
    let index = -1;
    if (value[0] === "-")
      value = value.slice(1);
    if (value === "0")
      return false;
    while (value[++index] === "0")
      ;
    return index > 0;
  };
  var stringify = (start, end, options) => {
    if (typeof start === "string" || typeof end === "string") {
      return true;
    }
    return options.stringify === true;
  };
  var pad = (input, maxLength, toNumber) => {
    if (maxLength > 0) {
      let dash = input[0] === "-" ? "-" : "";
      if (dash)
        input = input.slice(1);
      input = dash + input.padStart(dash ? maxLength - 1 : maxLength, "0");
    }
    if (toNumber === false) {
      return String(input);
    }
    return input;
  };
  var toMaxLen = (input, maxLength) => {
    let negative = input[0] === "-" ? "-" : "";
    if (negative) {
      input = input.slice(1);
      maxLength--;
    }
    while (input.length < maxLength)
      input = "0" + input;
    return negative ? "-" + input : input;
  };
  var toSequence = (parts, options) => {
    parts.negatives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
    parts.positives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
    let prefix = options.capture ? "" : "?:";
    let positives = "";
    let negatives = "";
    let result;
    if (parts.positives.length) {
      positives = parts.positives.join("|");
    }
    if (parts.negatives.length) {
      negatives = `-(${prefix}${parts.negatives.join("|")})`;
    }
    if (positives && negatives) {
      result = `${positives}|${negatives}`;
    } else {
      result = positives || negatives;
    }
    if (options.wrap) {
      return `(${prefix}${result})`;
    }
    return result;
  };
  var toRange = (a, b, isNumbers, options) => {
    if (isNumbers) {
      return toRegexRange(a, b, {wrap: false, ...options});
    }
    let start = String.fromCharCode(a);
    if (a === b)
      return start;
    let stop = String.fromCharCode(b);
    return `[${start}-${stop}]`;
  };
  var toRegex = (start, end, options) => {
    if (Array.isArray(start)) {
      let wrap = options.wrap === true;
      let prefix = options.capture ? "" : "?:";
      return wrap ? `(${prefix}${start.join("|")})` : start.join("|");
    }
    return toRegexRange(start, end, options);
  };
  var rangeError = (...args) => {
    return new RangeError("Invalid range arguments: " + util.inspect(...args));
  };
  var invalidRange = (start, end, options) => {
    if (options.strictRanges === true)
      throw rangeError([start, end]);
    return [];
  };
  var invalidStep = (step, options) => {
    if (options.strictRanges === true) {
      throw new TypeError(`Expected step "${step}" to be a number`);
    }
    return [];
  };
  var fillNumbers = (start, end, step = 1, options = {}) => {
    let a = Number(start);
    let b = Number(end);
    if (!Number.isInteger(a) || !Number.isInteger(b)) {
      if (options.strictRanges === true)
        throw rangeError([start, end]);
      return [];
    }
    if (a === 0)
      a = 0;
    if (b === 0)
      b = 0;
    let descending = a > b;
    let startString = String(start);
    let endString = String(end);
    let stepString = String(step);
    step = Math.max(Math.abs(step), 1);
    let padded = zeros(startString) || zeros(endString) || zeros(stepString);
    let maxLen = padded ? Math.max(startString.length, endString.length, stepString.length) : 0;
    let toNumber = padded === false && stringify(start, end, options) === false;
    let format = options.transform || transform(toNumber);
    if (options.toRegex && step === 1) {
      return toRange(toMaxLen(start, maxLen), toMaxLen(end, maxLen), true, options);
    }
    let parts = {negatives: [], positives: []};
    let push = (num) => parts[num < 0 ? "negatives" : "positives"].push(Math.abs(num));
    let range = [];
    let index = 0;
    while (descending ? a >= b : a <= b) {
      if (options.toRegex === true && step > 1) {
        push(a);
      } else {
        range.push(pad(format(a, index), maxLen, toNumber));
      }
      a = descending ? a - step : a + step;
      index++;
    }
    if (options.toRegex === true) {
      return step > 1 ? toSequence(parts, options) : toRegex(range, null, {wrap: false, ...options});
    }
    return range;
  };
  var fillLetters = (start, end, step = 1, options = {}) => {
    if (!isNumber(start) && start.length > 1 || !isNumber(end) && end.length > 1) {
      return invalidRange(start, end, options);
    }
    let format = options.transform || ((val) => String.fromCharCode(val));
    let a = `${start}`.charCodeAt(0);
    let b = `${end}`.charCodeAt(0);
    let descending = a > b;
    let min = Math.min(a, b);
    let max = Math.max(a, b);
    if (options.toRegex && step === 1) {
      return toRange(min, max, false, options);
    }
    let range = [];
    let index = 0;
    while (descending ? a >= b : a <= b) {
      range.push(format(a, index));
      a = descending ? a - step : a + step;
      index++;
    }
    if (options.toRegex === true) {
      return toRegex(range, null, {wrap: false, options});
    }
    return range;
  };
  var fill = (start, end, step, options = {}) => {
    if (end == null && isValidValue(start)) {
      return [start];
    }
    if (!isValidValue(start) || !isValidValue(end)) {
      return invalidRange(start, end, options);
    }
    if (typeof step === "function") {
      return fill(start, end, 1, {transform: step});
    }
    if (isObject(step)) {
      return fill(start, end, 0, step);
    }
    let opts = {...options};
    if (opts.capture === true)
      opts.wrap = true;
    step = step || opts.step || 1;
    if (!isNumber(step)) {
      if (step != null && !isObject(step))
        return invalidStep(step, opts);
      return fill(start, end, 1, step);
    }
    if (isNumber(start) && isNumber(end)) {
      return fillNumbers(start, end, step, opts);
    }
    return fillLetters(start, end, Math.max(Math.abs(step), 1), opts);
  };
  module2.exports = fill;
});

// ../../node_modules/.pnpm/braces@3.0.2/node_modules/braces/lib/compile.js
var require_compile = __commonJS((exports2, module2) => {
  "use strict";
  var fill = require_fill_range();
  var utils = require_utils();
  var compile = (ast, options = {}) => {
    let walk = (node, parent = {}) => {
      let invalidBlock = utils.isInvalidBrace(parent);
      let invalidNode = node.invalid === true && options.escapeInvalid === true;
      let invalid = invalidBlock === true || invalidNode === true;
      let prefix = options.escapeInvalid === true ? "\\" : "";
      let output = "";
      if (node.isOpen === true) {
        return prefix + node.value;
      }
      if (node.isClose === true) {
        return prefix + node.value;
      }
      if (node.type === "open") {
        return invalid ? prefix + node.value : "(";
      }
      if (node.type === "close") {
        return invalid ? prefix + node.value : ")";
      }
      if (node.type === "comma") {
        return node.prev.type === "comma" ? "" : invalid ? node.value : "|";
      }
      if (node.value) {
        return node.value;
      }
      if (node.nodes && node.ranges > 0) {
        let args = utils.reduce(node.nodes);
        let range = fill(...args, {...options, wrap: false, toRegex: true});
        if (range.length !== 0) {
          return args.length > 1 && range.length > 1 ? `(${range})` : range;
        }
      }
      if (node.nodes) {
        for (let child of node.nodes) {
          output += walk(child, node);
        }
      }
      return output;
    };
    return walk(ast);
  };
  module2.exports = compile;
});

// ../../node_modules/.pnpm/braces@3.0.2/node_modules/braces/lib/expand.js
var require_expand = __commonJS((exports2, module2) => {
  "use strict";
  var fill = require_fill_range();
  var stringify = require_stringify();
  var utils = require_utils();
  var append = (queue = "", stash = "", enclose = false) => {
    let result = [];
    queue = [].concat(queue);
    stash = [].concat(stash);
    if (!stash.length)
      return queue;
    if (!queue.length) {
      return enclose ? utils.flatten(stash).map((ele) => `{${ele}}`) : stash;
    }
    for (let item of queue) {
      if (Array.isArray(item)) {
        for (let value of item) {
          result.push(append(value, stash, enclose));
        }
      } else {
        for (let ele of stash) {
          if (enclose === true && typeof ele === "string")
            ele = `{${ele}}`;
          result.push(Array.isArray(ele) ? append(item, ele, enclose) : item + ele);
        }
      }
    }
    return utils.flatten(result);
  };
  var expand = (ast, options = {}) => {
    let rangeLimit = options.rangeLimit === void 0 ? 1e3 : options.rangeLimit;
    let walk = (node, parent = {}) => {
      node.queue = [];
      let p = parent;
      let q = parent.queue;
      while (p.type !== "brace" && p.type !== "root" && p.parent) {
        p = p.parent;
        q = p.queue;
      }
      if (node.invalid || node.dollar) {
        q.push(append(q.pop(), stringify(node, options)));
        return;
      }
      if (node.type === "brace" && node.invalid !== true && node.nodes.length === 2) {
        q.push(append(q.pop(), ["{}"]));
        return;
      }
      if (node.nodes && node.ranges > 0) {
        let args = utils.reduce(node.nodes);
        if (utils.exceedsLimit(...args, options.step, rangeLimit)) {
          throw new RangeError("expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.");
        }
        let range = fill(...args, options);
        if (range.length === 0) {
          range = stringify(node, options);
        }
        q.push(append(q.pop(), range));
        node.nodes = [];
        return;
      }
      let enclose = utils.encloseBrace(node);
      let queue = node.queue;
      let block = node;
      while (block.type !== "brace" && block.type !== "root" && block.parent) {
        block = block.parent;
        queue = block.queue;
      }
      for (let i = 0; i < node.nodes.length; i++) {
        let child = node.nodes[i];
        if (child.type === "comma" && node.type === "brace") {
          if (i === 1)
            queue.push("");
          queue.push("");
          continue;
        }
        if (child.type === "close") {
          q.push(append(q.pop(), queue, enclose));
          continue;
        }
        if (child.value && child.type !== "open") {
          queue.push(append(queue.pop(), child.value));
          continue;
        }
        if (child.nodes) {
          walk(child, node);
        }
      }
      return queue;
    };
    return utils.flatten(walk(ast));
  };
  module2.exports = expand;
});

// ../../node_modules/.pnpm/braces@3.0.2/node_modules/braces/lib/constants.js
var require_constants = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = {
    MAX_LENGTH: 1024 * 64,
    CHAR_0: "0",
    CHAR_9: "9",
    CHAR_UPPERCASE_A: "A",
    CHAR_LOWERCASE_A: "a",
    CHAR_UPPERCASE_Z: "Z",
    CHAR_LOWERCASE_Z: "z",
    CHAR_LEFT_PARENTHESES: "(",
    CHAR_RIGHT_PARENTHESES: ")",
    CHAR_ASTERISK: "*",
    CHAR_AMPERSAND: "&",
    CHAR_AT: "@",
    CHAR_BACKSLASH: "\\",
    CHAR_BACKTICK: "`",
    CHAR_CARRIAGE_RETURN: "\r",
    CHAR_CIRCUMFLEX_ACCENT: "^",
    CHAR_COLON: ":",
    CHAR_COMMA: ",",
    CHAR_DOLLAR: "$",
    CHAR_DOT: ".",
    CHAR_DOUBLE_QUOTE: '"',
    CHAR_EQUAL: "=",
    CHAR_EXCLAMATION_MARK: "!",
    CHAR_FORM_FEED: "\f",
    CHAR_FORWARD_SLASH: "/",
    CHAR_HASH: "#",
    CHAR_HYPHEN_MINUS: "-",
    CHAR_LEFT_ANGLE_BRACKET: "<",
    CHAR_LEFT_CURLY_BRACE: "{",
    CHAR_LEFT_SQUARE_BRACKET: "[",
    CHAR_LINE_FEED: "\n",
    CHAR_NO_BREAK_SPACE: "\xA0",
    CHAR_PERCENT: "%",
    CHAR_PLUS: "+",
    CHAR_QUESTION_MARK: "?",
    CHAR_RIGHT_ANGLE_BRACKET: ">",
    CHAR_RIGHT_CURLY_BRACE: "}",
    CHAR_RIGHT_SQUARE_BRACKET: "]",
    CHAR_SEMICOLON: ";",
    CHAR_SINGLE_QUOTE: "'",
    CHAR_SPACE: " ",
    CHAR_TAB: "	",
    CHAR_UNDERSCORE: "_",
    CHAR_VERTICAL_LINE: "|",
    CHAR_ZERO_WIDTH_NOBREAK_SPACE: "\uFEFF"
  };
});

// ../../node_modules/.pnpm/braces@3.0.2/node_modules/braces/lib/parse.js
var require_parse2 = __commonJS((exports2, module2) => {
  "use strict";
  var stringify = require_stringify();
  var {
    MAX_LENGTH,
    CHAR_BACKSLASH,
    CHAR_BACKTICK,
    CHAR_COMMA,
    CHAR_DOT,
    CHAR_LEFT_PARENTHESES,
    CHAR_RIGHT_PARENTHESES,
    CHAR_LEFT_CURLY_BRACE,
    CHAR_RIGHT_CURLY_BRACE,
    CHAR_LEFT_SQUARE_BRACKET,
    CHAR_RIGHT_SQUARE_BRACKET,
    CHAR_DOUBLE_QUOTE,
    CHAR_SINGLE_QUOTE,
    CHAR_NO_BREAK_SPACE,
    CHAR_ZERO_WIDTH_NOBREAK_SPACE
  } = require_constants();
  var parse = (input, options = {}) => {
    if (typeof input !== "string") {
      throw new TypeError("Expected a string");
    }
    let opts = options || {};
    let max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
    if (input.length > max) {
      throw new SyntaxError(`Input length (${input.length}), exceeds max characters (${max})`);
    }
    let ast = {type: "root", input, nodes: []};
    let stack = [ast];
    let block = ast;
    let prev = ast;
    let brackets = 0;
    let length = input.length;
    let index = 0;
    let depth = 0;
    let value;
    let memo = {};
    const advance = () => input[index++];
    const push = (node) => {
      if (node.type === "text" && prev.type === "dot") {
        prev.type = "text";
      }
      if (prev && prev.type === "text" && node.type === "text") {
        prev.value += node.value;
        return;
      }
      block.nodes.push(node);
      node.parent = block;
      node.prev = prev;
      prev = node;
      return node;
    };
    push({type: "bos"});
    while (index < length) {
      block = stack[stack.length - 1];
      value = advance();
      if (value === CHAR_ZERO_WIDTH_NOBREAK_SPACE || value === CHAR_NO_BREAK_SPACE) {
        continue;
      }
      if (value === CHAR_BACKSLASH) {
        push({type: "text", value: (options.keepEscaping ? value : "") + advance()});
        continue;
      }
      if (value === CHAR_RIGHT_SQUARE_BRACKET) {
        push({type: "text", value: "\\" + value});
        continue;
      }
      if (value === CHAR_LEFT_SQUARE_BRACKET) {
        brackets++;
        let closed = true;
        let next;
        while (index < length && (next = advance())) {
          value += next;
          if (next === CHAR_LEFT_SQUARE_BRACKET) {
            brackets++;
            continue;
          }
          if (next === CHAR_BACKSLASH) {
            value += advance();
            continue;
          }
          if (next === CHAR_RIGHT_SQUARE_BRACKET) {
            brackets--;
            if (brackets === 0) {
              break;
            }
          }
        }
        push({type: "text", value});
        continue;
      }
      if (value === CHAR_LEFT_PARENTHESES) {
        block = push({type: "paren", nodes: []});
        stack.push(block);
        push({type: "text", value});
        continue;
      }
      if (value === CHAR_RIGHT_PARENTHESES) {
        if (block.type !== "paren") {
          push({type: "text", value});
          continue;
        }
        block = stack.pop();
        push({type: "text", value});
        block = stack[stack.length - 1];
        continue;
      }
      if (value === CHAR_DOUBLE_QUOTE || value === CHAR_SINGLE_QUOTE || value === CHAR_BACKTICK) {
        let open = value;
        let next;
        if (options.keepQuotes !== true) {
          value = "";
        }
        while (index < length && (next = advance())) {
          if (next === CHAR_BACKSLASH) {
            value += next + advance();
            continue;
          }
          if (next === open) {
            if (options.keepQuotes === true)
              value += next;
            break;
          }
          value += next;
        }
        push({type: "text", value});
        continue;
      }
      if (value === CHAR_LEFT_CURLY_BRACE) {
        depth++;
        let dollar = prev.value && prev.value.slice(-1) === "$" || block.dollar === true;
        let brace = {
          type: "brace",
          open: true,
          close: false,
          dollar,
          depth,
          commas: 0,
          ranges: 0,
          nodes: []
        };
        block = push(brace);
        stack.push(block);
        push({type: "open", value});
        continue;
      }
      if (value === CHAR_RIGHT_CURLY_BRACE) {
        if (block.type !== "brace") {
          push({type: "text", value});
          continue;
        }
        let type = "close";
        block = stack.pop();
        block.close = true;
        push({type, value});
        depth--;
        block = stack[stack.length - 1];
        continue;
      }
      if (value === CHAR_COMMA && depth > 0) {
        if (block.ranges > 0) {
          block.ranges = 0;
          let open = block.nodes.shift();
          block.nodes = [open, {type: "text", value: stringify(block)}];
        }
        push({type: "comma", value});
        block.commas++;
        continue;
      }
      if (value === CHAR_DOT && depth > 0 && block.commas === 0) {
        let siblings = block.nodes;
        if (depth === 0 || siblings.length === 0) {
          push({type: "text", value});
          continue;
        }
        if (prev.type === "dot") {
          block.range = [];
          prev.value += value;
          prev.type = "range";
          if (block.nodes.length !== 3 && block.nodes.length !== 5) {
            block.invalid = true;
            block.ranges = 0;
            prev.type = "text";
            continue;
          }
          block.ranges++;
          block.args = [];
          continue;
        }
        if (prev.type === "range") {
          siblings.pop();
          let before = siblings[siblings.length - 1];
          before.value += prev.value + value;
          prev = before;
          block.ranges--;
          continue;
        }
        push({type: "dot", value});
        continue;
      }
      push({type: "text", value});
    }
    do {
      block = stack.pop();
      if (block.type !== "root") {
        block.nodes.forEach((node) => {
          if (!node.nodes) {
            if (node.type === "open")
              node.isOpen = true;
            if (node.type === "close")
              node.isClose = true;
            if (!node.nodes)
              node.type = "text";
            node.invalid = true;
          }
        });
        let parent = stack[stack.length - 1];
        let index2 = parent.nodes.indexOf(block);
        parent.nodes.splice(index2, 1, ...block.nodes);
      }
    } while (stack.length > 0);
    push({type: "eos"});
    return ast;
  };
  module2.exports = parse;
});

// ../../node_modules/.pnpm/braces@3.0.2/node_modules/braces/index.js
var require_braces = __commonJS((exports2, module2) => {
  "use strict";
  var stringify = require_stringify();
  var compile = require_compile();
  var expand = require_expand();
  var parse = require_parse2();
  var braces = (input, options = {}) => {
    let output = [];
    if (Array.isArray(input)) {
      for (let pattern of input) {
        let result = braces.create(pattern, options);
        if (Array.isArray(result)) {
          output.push(...result);
        } else {
          output.push(result);
        }
      }
    } else {
      output = [].concat(braces.create(input, options));
    }
    if (options && options.expand === true && options.nodupes === true) {
      output = [...new Set(output)];
    }
    return output;
  };
  braces.parse = (input, options = {}) => parse(input, options);
  braces.stringify = (input, options = {}) => {
    if (typeof input === "string") {
      return stringify(braces.parse(input, options), options);
    }
    return stringify(input, options);
  };
  braces.compile = (input, options = {}) => {
    if (typeof input === "string") {
      input = braces.parse(input, options);
    }
    return compile(input, options);
  };
  braces.expand = (input, options = {}) => {
    if (typeof input === "string") {
      input = braces.parse(input, options);
    }
    let result = expand(input, options);
    if (options.noempty === true) {
      result = result.filter(Boolean);
    }
    if (options.nodupes === true) {
      result = [...new Set(result)];
    }
    return result;
  };
  braces.create = (input, options = {}) => {
    if (input === "" || input.length < 3) {
      return [input];
    }
    return options.expand !== true ? braces.compile(input, options) : braces.expand(input, options);
  };
  module2.exports = braces;
});

// ../../node_modules/.pnpm/picomatch@2.2.2/node_modules/picomatch/lib/constants.js
var require_constants2 = __commonJS((exports2, module2) => {
  "use strict";
  var path2 = require("path");
  var WIN_SLASH = "\\\\/";
  var WIN_NO_SLASH = `[^${WIN_SLASH}]`;
  var DOT_LITERAL = "\\.";
  var PLUS_LITERAL = "\\+";
  var QMARK_LITERAL = "\\?";
  var SLASH_LITERAL = "\\/";
  var ONE_CHAR = "(?=.)";
  var QMARK = "[^/]";
  var END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
  var START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
  var DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
  var NO_DOT = `(?!${DOT_LITERAL})`;
  var NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
  var NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
  var NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
  var QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
  var STAR = `${QMARK}*?`;
  var POSIX_CHARS = {
    DOT_LITERAL,
    PLUS_LITERAL,
    QMARK_LITERAL,
    SLASH_LITERAL,
    ONE_CHAR,
    QMARK,
    END_ANCHOR,
    DOTS_SLASH,
    NO_DOT,
    NO_DOTS,
    NO_DOT_SLASH,
    NO_DOTS_SLASH,
    QMARK_NO_DOT,
    STAR,
    START_ANCHOR
  };
  var WINDOWS_CHARS = {
    ...POSIX_CHARS,
    SLASH_LITERAL: `[${WIN_SLASH}]`,
    QMARK: WIN_NO_SLASH,
    STAR: `${WIN_NO_SLASH}*?`,
    DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
    NO_DOT: `(?!${DOT_LITERAL})`,
    NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
    NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
    NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
    QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
    START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
    END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
  };
  var POSIX_REGEX_SOURCE = {
    alnum: "a-zA-Z0-9",
    alpha: "a-zA-Z",
    ascii: "\\x00-\\x7F",
    blank: " \\t",
    cntrl: "\\x00-\\x1F\\x7F",
    digit: "0-9",
    graph: "\\x21-\\x7E",
    lower: "a-z",
    print: "\\x20-\\x7E ",
    punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
    space: " \\t\\r\\n\\v\\f",
    upper: "A-Z",
    word: "A-Za-z0-9_",
    xdigit: "A-Fa-f0-9"
  };
  module2.exports = {
    MAX_LENGTH: 1024 * 64,
    POSIX_REGEX_SOURCE,
    REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
    REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
    REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
    REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
    REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
    REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
    REPLACEMENTS: {
      "***": "*",
      "**/**": "**",
      "**/**/**": "**"
    },
    CHAR_0: 48,
    CHAR_9: 57,
    CHAR_UPPERCASE_A: 65,
    CHAR_LOWERCASE_A: 97,
    CHAR_UPPERCASE_Z: 90,
    CHAR_LOWERCASE_Z: 122,
    CHAR_LEFT_PARENTHESES: 40,
    CHAR_RIGHT_PARENTHESES: 41,
    CHAR_ASTERISK: 42,
    CHAR_AMPERSAND: 38,
    CHAR_AT: 64,
    CHAR_BACKWARD_SLASH: 92,
    CHAR_CARRIAGE_RETURN: 13,
    CHAR_CIRCUMFLEX_ACCENT: 94,
    CHAR_COLON: 58,
    CHAR_COMMA: 44,
    CHAR_DOT: 46,
    CHAR_DOUBLE_QUOTE: 34,
    CHAR_EQUAL: 61,
    CHAR_EXCLAMATION_MARK: 33,
    CHAR_FORM_FEED: 12,
    CHAR_FORWARD_SLASH: 47,
    CHAR_GRAVE_ACCENT: 96,
    CHAR_HASH: 35,
    CHAR_HYPHEN_MINUS: 45,
    CHAR_LEFT_ANGLE_BRACKET: 60,
    CHAR_LEFT_CURLY_BRACE: 123,
    CHAR_LEFT_SQUARE_BRACKET: 91,
    CHAR_LINE_FEED: 10,
    CHAR_NO_BREAK_SPACE: 160,
    CHAR_PERCENT: 37,
    CHAR_PLUS: 43,
    CHAR_QUESTION_MARK: 63,
    CHAR_RIGHT_ANGLE_BRACKET: 62,
    CHAR_RIGHT_CURLY_BRACE: 125,
    CHAR_RIGHT_SQUARE_BRACKET: 93,
    CHAR_SEMICOLON: 59,
    CHAR_SINGLE_QUOTE: 39,
    CHAR_SPACE: 32,
    CHAR_TAB: 9,
    CHAR_UNDERSCORE: 95,
    CHAR_VERTICAL_LINE: 124,
    CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
    SEP: path2.sep,
    extglobChars(chars) {
      return {
        "!": {type: "negate", open: "(?:(?!(?:", close: `))${chars.STAR})`},
        "?": {type: "qmark", open: "(?:", close: ")?"},
        "+": {type: "plus", open: "(?:", close: ")+"},
        "*": {type: "star", open: "(?:", close: ")*"},
        "@": {type: "at", open: "(?:", close: ")"}
      };
    },
    globChars(win32) {
      return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
    }
  };
});

// ../../node_modules/.pnpm/picomatch@2.2.2/node_modules/picomatch/lib/utils.js
var require_utils2 = __commonJS((exports2) => {
  "use strict";
  var path2 = require("path");
  var win32 = process.platform === "win32";
  var {
    REGEX_BACKSLASH,
    REGEX_REMOVE_BACKSLASH,
    REGEX_SPECIAL_CHARS,
    REGEX_SPECIAL_CHARS_GLOBAL
  } = require_constants2();
  exports2.isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
  exports2.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str);
  exports2.isRegexChar = (str) => str.length === 1 && exports2.hasRegexChars(str);
  exports2.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
  exports2.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, "/");
  exports2.removeBackslashes = (str) => {
    return str.replace(REGEX_REMOVE_BACKSLASH, (match) => {
      return match === "\\" ? "" : match;
    });
  };
  exports2.supportsLookbehinds = () => {
    const segs = process.version.slice(1).split(".").map(Number);
    if (segs.length === 3 && segs[0] >= 9 || segs[0] === 8 && segs[1] >= 10) {
      return true;
    }
    return false;
  };
  exports2.isWindows = (options) => {
    if (options && typeof options.windows === "boolean") {
      return options.windows;
    }
    return win32 === true || path2.sep === "\\";
  };
  exports2.escapeLast = (input, char, lastIdx) => {
    const idx = input.lastIndexOf(char, lastIdx);
    if (idx === -1)
      return input;
    if (input[idx - 1] === "\\")
      return exports2.escapeLast(input, char, idx - 1);
    return `${input.slice(0, idx)}\\${input.slice(idx)}`;
  };
  exports2.removePrefix = (input, state = {}) => {
    let output = input;
    if (output.startsWith("./")) {
      output = output.slice(2);
      state.prefix = "./";
    }
    return output;
  };
  exports2.wrapOutput = (input, state = {}, options = {}) => {
    const prepend = options.contains ? "" : "^";
    const append = options.contains ? "" : "$";
    let output = `${prepend}(?:${input})${append}`;
    if (state.negated === true) {
      output = `(?:^(?!${output}).*$)`;
    }
    return output;
  };
});

// ../../node_modules/.pnpm/picomatch@2.2.2/node_modules/picomatch/lib/scan.js
var require_scan = __commonJS((exports2, module2) => {
  "use strict";
  var utils = require_utils2();
  var {
    CHAR_ASTERISK,
    CHAR_AT,
    CHAR_BACKWARD_SLASH,
    CHAR_COMMA,
    CHAR_DOT,
    CHAR_EXCLAMATION_MARK,
    CHAR_FORWARD_SLASH,
    CHAR_LEFT_CURLY_BRACE,
    CHAR_LEFT_PARENTHESES,
    CHAR_LEFT_SQUARE_BRACKET,
    CHAR_PLUS,
    CHAR_QUESTION_MARK,
    CHAR_RIGHT_CURLY_BRACE,
    CHAR_RIGHT_PARENTHESES,
    CHAR_RIGHT_SQUARE_BRACKET
  } = require_constants2();
  var isPathSeparator = (code) => {
    return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
  };
  var depth = (token) => {
    if (token.isPrefix !== true) {
      token.depth = token.isGlobstar ? Infinity : 1;
    }
  };
  var scan = (input, options) => {
    const opts = options || {};
    const length = input.length - 1;
    const scanToEnd = opts.parts === true || opts.scanToEnd === true;
    const slashes = [];
    const tokens = [];
    const parts = [];
    let str = input;
    let index = -1;
    let start = 0;
    let lastIndex = 0;
    let isBrace = false;
    let isBracket = false;
    let isGlob = false;
    let isExtglob = false;
    let isGlobstar = false;
    let braceEscaped = false;
    let backslashes = false;
    let negated = false;
    let finished = false;
    let braces = 0;
    let prev;
    let code;
    let token = {value: "", depth: 0, isGlob: false};
    const eos = () => index >= length;
    const peek = () => str.charCodeAt(index + 1);
    const advance = () => {
      prev = code;
      return str.charCodeAt(++index);
    };
    while (index < length) {
      code = advance();
      let next;
      if (code === CHAR_BACKWARD_SLASH) {
        backslashes = token.backslashes = true;
        code = advance();
        if (code === CHAR_LEFT_CURLY_BRACE) {
          braceEscaped = true;
        }
        continue;
      }
      if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
        braces++;
        while (eos() !== true && (code = advance())) {
          if (code === CHAR_BACKWARD_SLASH) {
            backslashes = token.backslashes = true;
            advance();
            continue;
          }
          if (code === CHAR_LEFT_CURLY_BRACE) {
            braces++;
            continue;
          }
          if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
            isBrace = token.isBrace = true;
            isGlob = token.isGlob = true;
            finished = true;
            if (scanToEnd === true) {
              continue;
            }
            break;
          }
          if (braceEscaped !== true && code === CHAR_COMMA) {
            isBrace = token.isBrace = true;
            isGlob = token.isGlob = true;
            finished = true;
            if (scanToEnd === true) {
              continue;
            }
            break;
          }
          if (code === CHAR_RIGHT_CURLY_BRACE) {
            braces--;
            if (braces === 0) {
              braceEscaped = false;
              isBrace = token.isBrace = true;
              finished = true;
              break;
            }
          }
        }
        if (scanToEnd === true) {
          continue;
        }
        break;
      }
      if (code === CHAR_FORWARD_SLASH) {
        slashes.push(index);
        tokens.push(token);
        token = {value: "", depth: 0, isGlob: false};
        if (finished === true)
          continue;
        if (prev === CHAR_DOT && index === start + 1) {
          start += 2;
          continue;
        }
        lastIndex = index + 1;
        continue;
      }
      if (opts.noext !== true) {
        const isExtglobChar = code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK;
        if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
          isGlob = token.isGlob = true;
          isExtglob = token.isExtglob = true;
          finished = true;
          if (scanToEnd === true) {
            while (eos() !== true && (code = advance())) {
              if (code === CHAR_BACKWARD_SLASH) {
                backslashes = token.backslashes = true;
                code = advance();
                continue;
              }
              if (code === CHAR_RIGHT_PARENTHESES) {
                isGlob = token.isGlob = true;
                finished = true;
                break;
              }
            }
            continue;
          }
          break;
        }
      }
      if (code === CHAR_ASTERISK) {
        if (prev === CHAR_ASTERISK)
          isGlobstar = token.isGlobstar = true;
        isGlob = token.isGlob = true;
        finished = true;
        if (scanToEnd === true) {
          continue;
        }
        break;
      }
      if (code === CHAR_QUESTION_MARK) {
        isGlob = token.isGlob = true;
        finished = true;
        if (scanToEnd === true) {
          continue;
        }
        break;
      }
      if (code === CHAR_LEFT_SQUARE_BRACKET) {
        while (eos() !== true && (next = advance())) {
          if (next === CHAR_BACKWARD_SLASH) {
            backslashes = token.backslashes = true;
            advance();
            continue;
          }
          if (next === CHAR_RIGHT_SQUARE_BRACKET) {
            isBracket = token.isBracket = true;
            isGlob = token.isGlob = true;
            finished = true;
            if (scanToEnd === true) {
              continue;
            }
            break;
          }
        }
      }
      if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
        negated = token.negated = true;
        start++;
        continue;
      }
      if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
        isGlob = token.isGlob = true;
        if (scanToEnd === true) {
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_LEFT_PARENTHESES) {
              backslashes = token.backslashes = true;
              code = advance();
              continue;
            }
            if (code === CHAR_RIGHT_PARENTHESES) {
              finished = true;
              break;
            }
          }
          continue;
        }
        break;
      }
      if (isGlob === true) {
        finished = true;
        if (scanToEnd === true) {
          continue;
        }
        break;
      }
    }
    if (opts.noext === true) {
      isExtglob = false;
      isGlob = false;
    }
    let base = str;
    let prefix = "";
    let glob = "";
    if (start > 0) {
      prefix = str.slice(0, start);
      str = str.slice(start);
      lastIndex -= start;
    }
    if (base && isGlob === true && lastIndex > 0) {
      base = str.slice(0, lastIndex);
      glob = str.slice(lastIndex);
    } else if (isGlob === true) {
      base = "";
      glob = str;
    } else {
      base = str;
    }
    if (base && base !== "" && base !== "/" && base !== str) {
      if (isPathSeparator(base.charCodeAt(base.length - 1))) {
        base = base.slice(0, -1);
      }
    }
    if (opts.unescape === true) {
      if (glob)
        glob = utils.removeBackslashes(glob);
      if (base && backslashes === true) {
        base = utils.removeBackslashes(base);
      }
    }
    const state = {
      prefix,
      input,
      start,
      base,
      glob,
      isBrace,
      isBracket,
      isGlob,
      isExtglob,
      isGlobstar,
      negated
    };
    if (opts.tokens === true) {
      state.maxDepth = 0;
      if (!isPathSeparator(code)) {
        tokens.push(token);
      }
      state.tokens = tokens;
    }
    if (opts.parts === true || opts.tokens === true) {
      let prevIndex;
      for (let idx = 0; idx < slashes.length; idx++) {
        const n = prevIndex ? prevIndex + 1 : start;
        const i = slashes[idx];
        const value = input.slice(n, i);
        if (opts.tokens) {
          if (idx === 0 && start !== 0) {
            tokens[idx].isPrefix = true;
            tokens[idx].value = prefix;
          } else {
            tokens[idx].value = value;
          }
          depth(tokens[idx]);
          state.maxDepth += tokens[idx].depth;
        }
        if (idx !== 0 || value !== "") {
          parts.push(value);
        }
        prevIndex = i;
      }
      if (prevIndex && prevIndex + 1 < input.length) {
        const value = input.slice(prevIndex + 1);
        parts.push(value);
        if (opts.tokens) {
          tokens[tokens.length - 1].value = value;
          depth(tokens[tokens.length - 1]);
          state.maxDepth += tokens[tokens.length - 1].depth;
        }
      }
      state.slashes = slashes;
      state.parts = parts;
    }
    return state;
  };
  module2.exports = scan;
});

// ../../node_modules/.pnpm/picomatch@2.2.2/node_modules/picomatch/lib/parse.js
var require_parse3 = __commonJS((exports2, module2) => {
  "use strict";
  var constants = require_constants2();
  var utils = require_utils2();
  var {
    MAX_LENGTH,
    POSIX_REGEX_SOURCE,
    REGEX_NON_SPECIAL_CHARS,
    REGEX_SPECIAL_CHARS_BACKREF,
    REPLACEMENTS
  } = constants;
  var expandRange = (args, options) => {
    if (typeof options.expandRange === "function") {
      return options.expandRange(...args, options);
    }
    args.sort();
    const value = `[${args.join("-")}]`;
    try {
      new RegExp(value);
    } catch (ex) {
      return args.map((v) => utils.escapeRegex(v)).join("..");
    }
    return value;
  };
  var syntaxError = (type, char) => {
    return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
  };
  var parse = (input, options) => {
    if (typeof input !== "string") {
      throw new TypeError("Expected a string");
    }
    input = REPLACEMENTS[input] || input;
    const opts = {...options};
    const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
    let len = input.length;
    if (len > max) {
      throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
    }
    const bos = {type: "bos", value: "", output: opts.prepend || ""};
    const tokens = [bos];
    const capture = opts.capture ? "" : "?:";
    const win32 = utils.isWindows(options);
    const PLATFORM_CHARS = constants.globChars(win32);
    const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);
    const {
      DOT_LITERAL,
      PLUS_LITERAL,
      SLASH_LITERAL,
      ONE_CHAR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOT_SLASH,
      NO_DOTS_SLASH,
      QMARK,
      QMARK_NO_DOT,
      STAR,
      START_ANCHOR
    } = PLATFORM_CHARS;
    const globstar = (opts2) => {
      return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
    };
    const nodot = opts.dot ? "" : NO_DOT;
    const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
    let star = opts.bash === true ? globstar(opts) : STAR;
    if (opts.capture) {
      star = `(${star})`;
    }
    if (typeof opts.noext === "boolean") {
      opts.noextglob = opts.noext;
    }
    const state = {
      input,
      index: -1,
      start: 0,
      dot: opts.dot === true,
      consumed: "",
      output: "",
      prefix: "",
      backtrack: false,
      negated: false,
      brackets: 0,
      braces: 0,
      parens: 0,
      quotes: 0,
      globstar: false,
      tokens
    };
    input = utils.removePrefix(input, state);
    len = input.length;
    const extglobs = [];
    const braces = [];
    const stack = [];
    let prev = bos;
    let value;
    const eos = () => state.index === len - 1;
    const peek = state.peek = (n = 1) => input[state.index + n];
    const advance = state.advance = () => input[++state.index];
    const remaining = () => input.slice(state.index + 1);
    const consume = (value2 = "", num = 0) => {
      state.consumed += value2;
      state.index += num;
    };
    const append = (token) => {
      state.output += token.output != null ? token.output : token.value;
      consume(token.value);
    };
    const negate = () => {
      let count = 1;
      while (peek() === "!" && (peek(2) !== "(" || peek(3) === "?")) {
        advance();
        state.start++;
        count++;
      }
      if (count % 2 === 0) {
        return false;
      }
      state.negated = true;
      state.start++;
      return true;
    };
    const increment = (type) => {
      state[type]++;
      stack.push(type);
    };
    const decrement = (type) => {
      state[type]--;
      stack.pop();
    };
    const push = (tok) => {
      if (prev.type === "globstar") {
        const isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
        const isExtglob = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
        if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob) {
          state.output = state.output.slice(0, -prev.output.length);
          prev.type = "star";
          prev.value = "*";
          prev.output = star;
          state.output += prev.output;
        }
      }
      if (extglobs.length && tok.type !== "paren" && !EXTGLOB_CHARS[tok.value]) {
        extglobs[extglobs.length - 1].inner += tok.value;
      }
      if (tok.value || tok.output)
        append(tok);
      if (prev && prev.type === "text" && tok.type === "text") {
        prev.value += tok.value;
        prev.output = (prev.output || "") + tok.value;
        return;
      }
      tok.prev = prev;
      tokens.push(tok);
      prev = tok;
    };
    const extglobOpen = (type, value2) => {
      const token = {...EXTGLOB_CHARS[value2], conditions: 1, inner: ""};
      token.prev = prev;
      token.parens = state.parens;
      token.output = state.output;
      const output = (opts.capture ? "(" : "") + token.open;
      increment("parens");
      push({type, value: value2, output: state.output ? "" : ONE_CHAR});
      push({type: "paren", extglob: true, value: advance(), output});
      extglobs.push(token);
    };
    const extglobClose = (token) => {
      let output = token.close + (opts.capture ? ")" : "");
      if (token.type === "negate") {
        let extglobStar = star;
        if (token.inner && token.inner.length > 1 && token.inner.includes("/")) {
          extglobStar = globstar(opts);
        }
        if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
          output = token.close = `)$))${extglobStar}`;
        }
        if (token.prev.type === "bos" && eos()) {
          state.negatedExtglob = true;
        }
      }
      push({type: "paren", extglob: true, value, output});
      decrement("parens");
    };
    if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
      let backslashes = false;
      let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
        if (first === "\\") {
          backslashes = true;
          return m;
        }
        if (first === "?") {
          if (esc) {
            return esc + first + (rest ? QMARK.repeat(rest.length) : "");
          }
          if (index === 0) {
            return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : "");
          }
          return QMARK.repeat(chars.length);
        }
        if (first === ".") {
          return DOT_LITERAL.repeat(chars.length);
        }
        if (first === "*") {
          if (esc) {
            return esc + first + (rest ? star : "");
          }
          return star;
        }
        return esc ? m : `\\${m}`;
      });
      if (backslashes === true) {
        if (opts.unescape === true) {
          output = output.replace(/\\/g, "");
        } else {
          output = output.replace(/\\+/g, (m) => {
            return m.length % 2 === 0 ? "\\\\" : m ? "\\" : "";
          });
        }
      }
      if (output === input && opts.contains === true) {
        state.output = input;
        return state;
      }
      state.output = utils.wrapOutput(output, state, options);
      return state;
    }
    while (!eos()) {
      value = advance();
      if (value === "\0") {
        continue;
      }
      if (value === "\\") {
        const next = peek();
        if (next === "/" && opts.bash !== true) {
          continue;
        }
        if (next === "." || next === ";") {
          continue;
        }
        if (!next) {
          value += "\\";
          push({type: "text", value});
          continue;
        }
        const match = /^\\+/.exec(remaining());
        let slashes = 0;
        if (match && match[0].length > 2) {
          slashes = match[0].length;
          state.index += slashes;
          if (slashes % 2 !== 0) {
            value += "\\";
          }
        }
        if (opts.unescape === true) {
          value = advance() || "";
        } else {
          value += advance() || "";
        }
        if (state.brackets === 0) {
          push({type: "text", value});
          continue;
        }
      }
      if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
        if (opts.posix !== false && value === ":") {
          const inner = prev.value.slice(1);
          if (inner.includes("[")) {
            prev.posix = true;
            if (inner.includes(":")) {
              const idx = prev.value.lastIndexOf("[");
              const pre = prev.value.slice(0, idx);
              const rest2 = prev.value.slice(idx + 2);
              const posix = POSIX_REGEX_SOURCE[rest2];
              if (posix) {
                prev.value = pre + posix;
                state.backtrack = true;
                advance();
                if (!bos.output && tokens.indexOf(prev) === 1) {
                  bos.output = ONE_CHAR;
                }
                continue;
              }
            }
          }
        }
        if (value === "[" && peek() !== ":" || value === "-" && peek() === "]") {
          value = `\\${value}`;
        }
        if (value === "]" && (prev.value === "[" || prev.value === "[^")) {
          value = `\\${value}`;
        }
        if (opts.posix === true && value === "!" && prev.value === "[") {
          value = "^";
        }
        prev.value += value;
        append({value});
        continue;
      }
      if (state.quotes === 1 && value !== '"') {
        value = utils.escapeRegex(value);
        prev.value += value;
        append({value});
        continue;
      }
      if (value === '"') {
        state.quotes = state.quotes === 1 ? 0 : 1;
        if (opts.keepQuotes === true) {
          push({type: "text", value});
        }
        continue;
      }
      if (value === "(") {
        increment("parens");
        push({type: "paren", value});
        continue;
      }
      if (value === ")") {
        if (state.parens === 0 && opts.strictBrackets === true) {
          throw new SyntaxError(syntaxError("opening", "("));
        }
        const extglob = extglobs[extglobs.length - 1];
        if (extglob && state.parens === extglob.parens + 1) {
          extglobClose(extglobs.pop());
          continue;
        }
        push({type: "paren", value, output: state.parens ? ")" : "\\)"});
        decrement("parens");
        continue;
      }
      if (value === "[") {
        if (opts.nobracket === true || !remaining().includes("]")) {
          if (opts.nobracket !== true && opts.strictBrackets === true) {
            throw new SyntaxError(syntaxError("closing", "]"));
          }
          value = `\\${value}`;
        } else {
          increment("brackets");
        }
        push({type: "bracket", value});
        continue;
      }
      if (value === "]") {
        if (opts.nobracket === true || prev && prev.type === "bracket" && prev.value.length === 1) {
          push({type: "text", value, output: `\\${value}`});
          continue;
        }
        if (state.brackets === 0) {
          if (opts.strictBrackets === true) {
            throw new SyntaxError(syntaxError("opening", "["));
          }
          push({type: "text", value, output: `\\${value}`});
          continue;
        }
        decrement("brackets");
        const prevValue = prev.value.slice(1);
        if (prev.posix !== true && prevValue[0] === "^" && !prevValue.includes("/")) {
          value = `/${value}`;
        }
        prev.value += value;
        append({value});
        if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
          continue;
        }
        const escaped = utils.escapeRegex(prev.value);
        state.output = state.output.slice(0, -prev.value.length);
        if (opts.literalBrackets === true) {
          state.output += escaped;
          prev.value = escaped;
          continue;
        }
        prev.value = `(${capture}${escaped}|${prev.value})`;
        state.output += prev.value;
        continue;
      }
      if (value === "{" && opts.nobrace !== true) {
        increment("braces");
        const open = {
          type: "brace",
          value,
          output: "(",
          outputIndex: state.output.length,
          tokensIndex: state.tokens.length
        };
        braces.push(open);
        push(open);
        continue;
      }
      if (value === "}") {
        const brace = braces[braces.length - 1];
        if (opts.nobrace === true || !brace) {
          push({type: "text", value, output: value});
          continue;
        }
        let output = ")";
        if (brace.dots === true) {
          const arr = tokens.slice();
          const range = [];
          for (let i = arr.length - 1; i >= 0; i--) {
            tokens.pop();
            if (arr[i].type === "brace") {
              break;
            }
            if (arr[i].type !== "dots") {
              range.unshift(arr[i].value);
            }
          }
          output = expandRange(range, opts);
          state.backtrack = true;
        }
        if (brace.comma !== true && brace.dots !== true) {
          const out = state.output.slice(0, brace.outputIndex);
          const toks = state.tokens.slice(brace.tokensIndex);
          brace.value = brace.output = "\\{";
          value = output = "\\}";
          state.output = out;
          for (const t of toks) {
            state.output += t.output || t.value;
          }
        }
        push({type: "brace", value, output});
        decrement("braces");
        braces.pop();
        continue;
      }
      if (value === "|") {
        if (extglobs.length > 0) {
          extglobs[extglobs.length - 1].conditions++;
        }
        push({type: "text", value});
        continue;
      }
      if (value === ",") {
        let output = value;
        const brace = braces[braces.length - 1];
        if (brace && stack[stack.length - 1] === "braces") {
          brace.comma = true;
          output = "|";
        }
        push({type: "comma", value, output});
        continue;
      }
      if (value === "/") {
        if (prev.type === "dot" && state.index === state.start + 1) {
          state.start = state.index + 1;
          state.consumed = "";
          state.output = "";
          tokens.pop();
          prev = bos;
          continue;
        }
        push({type: "slash", value, output: SLASH_LITERAL});
        continue;
      }
      if (value === ".") {
        if (state.braces > 0 && prev.type === "dot") {
          if (prev.value === ".")
            prev.output = DOT_LITERAL;
          const brace = braces[braces.length - 1];
          prev.type = "dots";
          prev.output += value;
          prev.value += value;
          brace.dots = true;
          continue;
        }
        if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
          push({type: "text", value, output: DOT_LITERAL});
          continue;
        }
        push({type: "dot", value, output: DOT_LITERAL});
        continue;
      }
      if (value === "?") {
        const isGroup = prev && prev.value === "(";
        if (!isGroup && opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
          extglobOpen("qmark", value);
          continue;
        }
        if (prev && prev.type === "paren") {
          const next = peek();
          let output = value;
          if (next === "<" && !utils.supportsLookbehinds()) {
            throw new Error("Node.js v10 or higher is required for regex lookbehinds");
          }
          if (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) {
            output = `\\${value}`;
          }
          push({type: "text", value, output});
          continue;
        }
        if (opts.dot !== true && (prev.type === "slash" || prev.type === "bos")) {
          push({type: "qmark", value, output: QMARK_NO_DOT});
          continue;
        }
        push({type: "qmark", value, output: QMARK});
        continue;
      }
      if (value === "!") {
        if (opts.noextglob !== true && peek() === "(") {
          if (peek(2) !== "?" || !/[!=<:]/.test(peek(3))) {
            extglobOpen("negate", value);
            continue;
          }
        }
        if (opts.nonegate !== true && state.index === 0) {
          negate();
          continue;
        }
      }
      if (value === "+") {
        if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
          extglobOpen("plus", value);
          continue;
        }
        if (prev && prev.value === "(" || opts.regex === false) {
          push({type: "plus", value, output: PLUS_LITERAL});
          continue;
        }
        if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
          push({type: "plus", value});
          continue;
        }
        push({type: "plus", value: PLUS_LITERAL});
        continue;
      }
      if (value === "@") {
        if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
          push({type: "at", extglob: true, value, output: ""});
          continue;
        }
        push({type: "text", value});
        continue;
      }
      if (value !== "*") {
        if (value === "$" || value === "^") {
          value = `\\${value}`;
        }
        const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
        if (match) {
          value += match[0];
          state.index += match[0].length;
        }
        push({type: "text", value});
        continue;
      }
      if (prev && (prev.type === "globstar" || prev.star === true)) {
        prev.type = "star";
        prev.star = true;
        prev.value += value;
        prev.output = star;
        state.backtrack = true;
        state.globstar = true;
        consume(value);
        continue;
      }
      let rest = remaining();
      if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
        extglobOpen("star", value);
        continue;
      }
      if (prev.type === "star") {
        if (opts.noglobstar === true) {
          consume(value);
          continue;
        }
        const prior = prev.prev;
        const before = prior.prev;
        const isStart = prior.type === "slash" || prior.type === "bos";
        const afterStar = before && (before.type === "star" || before.type === "globstar");
        if (opts.bash === true && (!isStart || rest[0] && rest[0] !== "/")) {
          push({type: "star", value, output: ""});
          continue;
        }
        const isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace");
        const isExtglob = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
        if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob) {
          push({type: "star", value, output: ""});
          continue;
        }
        while (rest.slice(0, 3) === "/**") {
          const after = input[state.index + 4];
          if (after && after !== "/") {
            break;
          }
          rest = rest.slice(3);
          consume("/**", 3);
        }
        if (prior.type === "bos" && eos()) {
          prev.type = "globstar";
          prev.value += value;
          prev.output = globstar(opts);
          state.output = prev.output;
          state.globstar = true;
          consume(value);
          continue;
        }
        if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && eos()) {
          state.output = state.output.slice(0, -(prior.output + prev.output).length);
          prior.output = `(?:${prior.output}`;
          prev.type = "globstar";
          prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)");
          prev.value += value;
          state.globstar = true;
          state.output += prior.output + prev.output;
          consume(value);
          continue;
        }
        if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
          const end = rest[1] !== void 0 ? "|$" : "";
          state.output = state.output.slice(0, -(prior.output + prev.output).length);
          prior.output = `(?:${prior.output}`;
          prev.type = "globstar";
          prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
          prev.value += value;
          state.output += prior.output + prev.output;
          state.globstar = true;
          consume(value + advance());
          push({type: "slash", value: "/", output: ""});
          continue;
        }
        if (prior.type === "bos" && rest[0] === "/") {
          prev.type = "globstar";
          prev.value += value;
          prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
          state.output = prev.output;
          state.globstar = true;
          consume(value + advance());
          push({type: "slash", value: "/", output: ""});
          continue;
        }
        state.output = state.output.slice(0, -prev.output.length);
        prev.type = "globstar";
        prev.output = globstar(opts);
        prev.value += value;
        state.output += prev.output;
        state.globstar = true;
        consume(value);
        continue;
      }
      const token = {type: "star", value, output: star};
      if (opts.bash === true) {
        token.output = ".*?";
        if (prev.type === "bos" || prev.type === "slash") {
          token.output = nodot + token.output;
        }
        push(token);
        continue;
      }
      if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === true) {
        token.output = value;
        push(token);
        continue;
      }
      if (state.index === state.start || prev.type === "slash" || prev.type === "dot") {
        if (prev.type === "dot") {
          state.output += NO_DOT_SLASH;
          prev.output += NO_DOT_SLASH;
        } else if (opts.dot === true) {
          state.output += NO_DOTS_SLASH;
          prev.output += NO_DOTS_SLASH;
        } else {
          state.output += nodot;
          prev.output += nodot;
        }
        if (peek() !== "*") {
          state.output += ONE_CHAR;
          prev.output += ONE_CHAR;
        }
      }
      push(token);
    }
    while (state.brackets > 0) {
      if (opts.strictBrackets === true)
        throw new SyntaxError(syntaxError("closing", "]"));
      state.output = utils.escapeLast(state.output, "[");
      decrement("brackets");
    }
    while (state.parens > 0) {
      if (opts.strictBrackets === true)
        throw new SyntaxError(syntaxError("closing", ")"));
      state.output = utils.escapeLast(state.output, "(");
      decrement("parens");
    }
    while (state.braces > 0) {
      if (opts.strictBrackets === true)
        throw new SyntaxError(syntaxError("closing", "}"));
      state.output = utils.escapeLast(state.output, "{");
      decrement("braces");
    }
    if (opts.strictSlashes !== true && (prev.type === "star" || prev.type === "bracket")) {
      push({type: "maybe_slash", value: "", output: `${SLASH_LITERAL}?`});
    }
    if (state.backtrack === true) {
      state.output = "";
      for (const token of state.tokens) {
        state.output += token.output != null ? token.output : token.value;
        if (token.suffix) {
          state.output += token.suffix;
        }
      }
    }
    return state;
  };
  parse.fastpaths = (input, options) => {
    const opts = {...options};
    const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
    const len = input.length;
    if (len > max) {
      throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
    }
    input = REPLACEMENTS[input] || input;
    const win32 = utils.isWindows(options);
    const {
      DOT_LITERAL,
      SLASH_LITERAL,
      ONE_CHAR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOTS,
      NO_DOTS_SLASH,
      STAR,
      START_ANCHOR
    } = constants.globChars(win32);
    const nodot = opts.dot ? NO_DOTS : NO_DOT;
    const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
    const capture = opts.capture ? "" : "?:";
    const state = {negated: false, prefix: ""};
    let star = opts.bash === true ? ".*?" : STAR;
    if (opts.capture) {
      star = `(${star})`;
    }
    const globstar = (opts2) => {
      if (opts2.noglobstar === true)
        return star;
      return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
    };
    const create = (str) => {
      switch (str) {
        case "*":
          return `${nodot}${ONE_CHAR}${star}`;
        case ".*":
          return `${DOT_LITERAL}${ONE_CHAR}${star}`;
        case "*.*":
          return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
        case "*/*":
          return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;
        case "**":
          return nodot + globstar(opts);
        case "**/*":
          return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;
        case "**/*.*":
          return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
        case "**/.*":
          return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;
        default: {
          const match = /^(.*?)\.(\w+)$/.exec(str);
          if (!match)
            return;
          const source2 = create(match[1]);
          if (!source2)
            return;
          return source2 + DOT_LITERAL + match[2];
        }
      }
    };
    const output = utils.removePrefix(input, state);
    let source = create(output);
    if (source && opts.strictSlashes !== true) {
      source += `${SLASH_LITERAL}?`;
    }
    return source;
  };
  module2.exports = parse;
});

// ../../node_modules/.pnpm/picomatch@2.2.2/node_modules/picomatch/lib/picomatch.js
var require_picomatch = __commonJS((exports2, module2) => {
  "use strict";
  var path2 = require("path");
  var scan = require_scan();
  var parse = require_parse3();
  var utils = require_utils2();
  var constants = require_constants2();
  var isObject = (val) => val && typeof val === "object" && !Array.isArray(val);
  var picomatch = (glob, options, returnState = false) => {
    if (Array.isArray(glob)) {
      const fns = glob.map((input) => picomatch(input, options, returnState));
      const arrayMatcher = (str) => {
        for (const isMatch of fns) {
          const state2 = isMatch(str);
          if (state2)
            return state2;
        }
        return false;
      };
      return arrayMatcher;
    }
    const isState = isObject(glob) && glob.tokens && glob.input;
    if (glob === "" || typeof glob !== "string" && !isState) {
      throw new TypeError("Expected pattern to be a non-empty string");
    }
    const opts = options || {};
    const posix = utils.isWindows(options);
    const regex = isState ? picomatch.compileRe(glob, options) : picomatch.makeRe(glob, options, false, true);
    const state = regex.state;
    delete regex.state;
    let isIgnored = () => false;
    if (opts.ignore) {
      const ignoreOpts = {...options, ignore: null, onMatch: null, onResult: null};
      isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
    }
    const matcher = (input, returnObject = false) => {
      const {isMatch, match, output} = picomatch.test(input, regex, options, {glob, posix});
      const result = {glob, state, regex, posix, input, output, match, isMatch};
      if (typeof opts.onResult === "function") {
        opts.onResult(result);
      }
      if (isMatch === false) {
        result.isMatch = false;
        return returnObject ? result : false;
      }
      if (isIgnored(input)) {
        if (typeof opts.onIgnore === "function") {
          opts.onIgnore(result);
        }
        result.isMatch = false;
        return returnObject ? result : false;
      }
      if (typeof opts.onMatch === "function") {
        opts.onMatch(result);
      }
      return returnObject ? result : true;
    };
    if (returnState) {
      matcher.state = state;
    }
    return matcher;
  };
  picomatch.test = (input, regex, options, {glob, posix} = {}) => {
    if (typeof input !== "string") {
      throw new TypeError("Expected input to be a string");
    }
    if (input === "") {
      return {isMatch: false, output: ""};
    }
    const opts = options || {};
    const format = opts.format || (posix ? utils.toPosixSlashes : null);
    let match = input === glob;
    let output = match && format ? format(input) : input;
    if (match === false) {
      output = format ? format(input) : input;
      match = output === glob;
    }
    if (match === false || opts.capture === true) {
      if (opts.matchBase === true || opts.basename === true) {
        match = picomatch.matchBase(input, regex, options, posix);
      } else {
        match = regex.exec(output);
      }
    }
    return {isMatch: Boolean(match), match, output};
  };
  picomatch.matchBase = (input, glob, options, posix = utils.isWindows(options)) => {
    const regex = glob instanceof RegExp ? glob : picomatch.makeRe(glob, options);
    return regex.test(path2.basename(input));
  };
  picomatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);
  picomatch.parse = (pattern, options) => {
    if (Array.isArray(pattern))
      return pattern.map((p) => picomatch.parse(p, options));
    return parse(pattern, {...options, fastpaths: false});
  };
  picomatch.scan = (input, options) => scan(input, options);
  picomatch.compileRe = (parsed, options, returnOutput = false, returnState = false) => {
    if (returnOutput === true) {
      return parsed.output;
    }
    const opts = options || {};
    const prepend = opts.contains ? "" : "^";
    const append = opts.contains ? "" : "$";
    let source = `${prepend}(?:${parsed.output})${append}`;
    if (parsed && parsed.negated === true) {
      source = `^(?!${source}).*$`;
    }
    const regex = picomatch.toRegex(source, options);
    if (returnState === true) {
      regex.state = parsed;
    }
    return regex;
  };
  picomatch.makeRe = (input, options, returnOutput = false, returnState = false) => {
    if (!input || typeof input !== "string") {
      throw new TypeError("Expected a non-empty string");
    }
    const opts = options || {};
    let parsed = {negated: false, fastpaths: true};
    let prefix = "";
    let output;
    if (input.startsWith("./")) {
      input = input.slice(2);
      prefix = parsed.prefix = "./";
    }
    if (opts.fastpaths !== false && (input[0] === "." || input[0] === "*")) {
      output = parse.fastpaths(input, options);
    }
    if (output === void 0) {
      parsed = parse(input, options);
      parsed.prefix = prefix + (parsed.prefix || "");
    } else {
      parsed.output = output;
    }
    return picomatch.compileRe(parsed, options, returnOutput, returnState);
  };
  picomatch.toRegex = (source, options) => {
    try {
      const opts = options || {};
      return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
    } catch (err) {
      if (options && options.debug === true)
        throw err;
      return /$^/;
    }
  };
  picomatch.constants = constants;
  module2.exports = picomatch;
});

// ../../node_modules/.pnpm/picomatch@2.2.2/node_modules/picomatch/index.js
var require_picomatch2 = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = require_picomatch();
});

// ../../node_modules/.pnpm/micromatch@4.0.2/node_modules/micromatch/index.js
var require_micromatch = __commonJS((exports2, module2) => {
  "use strict";
  var util = require("util");
  var braces = require_braces();
  var picomatch = require_picomatch2();
  var utils = require_utils2();
  var isEmptyString = (val) => typeof val === "string" && (val === "" || val === "./");
  var micromatch = (list, patterns, options) => {
    patterns = [].concat(patterns);
    list = [].concat(list);
    let omit = new Set();
    let keep = new Set();
    let items = new Set();
    let negatives = 0;
    let onResult = (state) => {
      items.add(state.output);
      if (options && options.onResult) {
        options.onResult(state);
      }
    };
    for (let i = 0; i < patterns.length; i++) {
      let isMatch = picomatch(String(patterns[i]), {...options, onResult}, true);
      let negated = isMatch.state.negated || isMatch.state.negatedExtglob;
      if (negated)
        negatives++;
      for (let item of list) {
        let matched = isMatch(item, true);
        let match = negated ? !matched.isMatch : matched.isMatch;
        if (!match)
          continue;
        if (negated) {
          omit.add(matched.output);
        } else {
          omit.delete(matched.output);
          keep.add(matched.output);
        }
      }
    }
    let result = negatives === patterns.length ? [...items] : [...keep];
    let matches = result.filter((item) => !omit.has(item));
    if (options && matches.length === 0) {
      if (options.failglob === true) {
        throw new Error(`No matches found for "${patterns.join(", ")}"`);
      }
      if (options.nonull === true || options.nullglob === true) {
        return options.unescape ? patterns.map((p) => p.replace(/\\/g, "")) : patterns;
      }
    }
    return matches;
  };
  micromatch.match = micromatch;
  micromatch.matcher = (pattern, options) => picomatch(pattern, options);
  micromatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);
  micromatch.any = micromatch.isMatch;
  micromatch.not = (list, patterns, options = {}) => {
    patterns = [].concat(patterns).map(String);
    let result = new Set();
    let items = [];
    let onResult = (state) => {
      if (options.onResult)
        options.onResult(state);
      items.push(state.output);
    };
    let matches = micromatch(list, patterns, {...options, onResult});
    for (let item of items) {
      if (!matches.includes(item)) {
        result.add(item);
      }
    }
    return [...result];
  };
  micromatch.contains = (str, pattern, options) => {
    if (typeof str !== "string") {
      throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
    }
    if (Array.isArray(pattern)) {
      return pattern.some((p) => micromatch.contains(str, p, options));
    }
    if (typeof pattern === "string") {
      if (isEmptyString(str) || isEmptyString(pattern)) {
        return false;
      }
      if (str.includes(pattern) || str.startsWith("./") && str.slice(2).includes(pattern)) {
        return true;
      }
    }
    return micromatch.isMatch(str, pattern, {...options, contains: true});
  };
  micromatch.matchKeys = (obj, patterns, options) => {
    if (!utils.isObject(obj)) {
      throw new TypeError("Expected the first argument to be an object");
    }
    let keys = micromatch(Object.keys(obj), patterns, options);
    let res = {};
    for (let key of keys)
      res[key] = obj[key];
    return res;
  };
  micromatch.some = (list, patterns, options) => {
    let items = [].concat(list);
    for (let pattern of [].concat(patterns)) {
      let isMatch = picomatch(String(pattern), options);
      if (items.some((item) => isMatch(item))) {
        return true;
      }
    }
    return false;
  };
  micromatch.every = (list, patterns, options) => {
    let items = [].concat(list);
    for (let pattern of [].concat(patterns)) {
      let isMatch = picomatch(String(pattern), options);
      if (!items.every((item) => isMatch(item))) {
        return false;
      }
    }
    return true;
  };
  micromatch.all = (str, patterns, options) => {
    if (typeof str !== "string") {
      throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
    }
    return [].concat(patterns).every((p) => picomatch(p, options)(str));
  };
  micromatch.capture = (glob, input, options) => {
    let posix = utils.isWindows(options);
    let regex = picomatch.makeRe(String(glob), {...options, capture: true});
    let match = regex.exec(posix ? utils.toPosixSlashes(input) : input);
    if (match) {
      return match.slice(1).map((v) => v === void 0 ? "" : v);
    }
  };
  micromatch.makeRe = (...args) => picomatch.makeRe(...args);
  micromatch.scan = (...args) => picomatch.scan(...args);
  micromatch.parse = (patterns, options) => {
    let res = [];
    for (let pattern of [].concat(patterns || [])) {
      for (let str of braces(String(pattern), options)) {
        res.push(picomatch.parse(str, options));
      }
    }
    return res;
  };
  micromatch.braces = (pattern, options) => {
    if (typeof pattern !== "string")
      throw new TypeError("Expected a string");
    if (options && options.nobrace === true || !/\{.*\}/.test(pattern)) {
      return [pattern];
    }
    return braces(pattern, options);
  };
  micromatch.braceExpand = (pattern, options) => {
    if (typeof pattern !== "string")
      throw new TypeError("Expected a string");
    return micromatch.braces(pattern, {...options, expand: true});
  };
  module2.exports = micromatch;
});

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/utils/pattern.js
var require_pattern = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.matchAny = exports2.convertPatternsToRe = exports2.makeRe = exports2.getPatternParts = exports2.expandBraceExpansion = exports2.expandPatternsWithBraceExpansion = exports2.isAffectDepthOfReadingPattern = exports2.endsWithSlashGlobStar = exports2.hasGlobStar = exports2.getBaseDirectory = exports2.getPositivePatterns = exports2.getNegativePatterns = exports2.isPositivePattern = exports2.isNegativePattern = exports2.convertToNegativePattern = exports2.convertToPositivePattern = exports2.isDynamicPattern = exports2.isStaticPattern = void 0;
  var path2 = require("path");
  var globParent = require_glob_parent();
  var micromatch = require_micromatch();
  var picomatch = require_picomatch2();
  var GLOBSTAR = "**";
  var ESCAPE_SYMBOL = "\\";
  var COMMON_GLOB_SYMBOLS_RE = /[*?]|^!/;
  var REGEX_CHARACTER_CLASS_SYMBOLS_RE = /\[.*]/;
  var REGEX_GROUP_SYMBOLS_RE = /(?:^|[^!*+?@])\(.*\|.*\)/;
  var GLOB_EXTENSION_SYMBOLS_RE = /[!*+?@]\(.*\)/;
  var BRACE_EXPANSIONS_SYMBOLS_RE = /{.*(?:,|\.\.).*}/;
  function isStaticPattern(pattern, options = {}) {
    return !isDynamicPattern(pattern, options);
  }
  exports2.isStaticPattern = isStaticPattern;
  function isDynamicPattern(pattern, options = {}) {
    if (pattern === "") {
      return false;
    }
    if (options.caseSensitiveMatch === false || pattern.includes(ESCAPE_SYMBOL)) {
      return true;
    }
    if (COMMON_GLOB_SYMBOLS_RE.test(pattern) || REGEX_CHARACTER_CLASS_SYMBOLS_RE.test(pattern) || REGEX_GROUP_SYMBOLS_RE.test(pattern)) {
      return true;
    }
    if (options.extglob !== false && GLOB_EXTENSION_SYMBOLS_RE.test(pattern)) {
      return true;
    }
    if (options.braceExpansion !== false && BRACE_EXPANSIONS_SYMBOLS_RE.test(pattern)) {
      return true;
    }
    return false;
  }
  exports2.isDynamicPattern = isDynamicPattern;
  function convertToPositivePattern(pattern) {
    return isNegativePattern(pattern) ? pattern.slice(1) : pattern;
  }
  exports2.convertToPositivePattern = convertToPositivePattern;
  function convertToNegativePattern(pattern) {
    return "!" + pattern;
  }
  exports2.convertToNegativePattern = convertToNegativePattern;
  function isNegativePattern(pattern) {
    return pattern.startsWith("!") && pattern[1] !== "(";
  }
  exports2.isNegativePattern = isNegativePattern;
  function isPositivePattern(pattern) {
    return !isNegativePattern(pattern);
  }
  exports2.isPositivePattern = isPositivePattern;
  function getNegativePatterns(patterns) {
    return patterns.filter(isNegativePattern);
  }
  exports2.getNegativePatterns = getNegativePatterns;
  function getPositivePatterns(patterns) {
    return patterns.filter(isPositivePattern);
  }
  exports2.getPositivePatterns = getPositivePatterns;
  function getBaseDirectory(pattern) {
    return globParent(pattern, {flipBackslashes: false});
  }
  exports2.getBaseDirectory = getBaseDirectory;
  function hasGlobStar(pattern) {
    return pattern.includes(GLOBSTAR);
  }
  exports2.hasGlobStar = hasGlobStar;
  function endsWithSlashGlobStar(pattern) {
    return pattern.endsWith("/" + GLOBSTAR);
  }
  exports2.endsWithSlashGlobStar = endsWithSlashGlobStar;
  function isAffectDepthOfReadingPattern(pattern) {
    const basename = path2.basename(pattern);
    return endsWithSlashGlobStar(pattern) || isStaticPattern(basename);
  }
  exports2.isAffectDepthOfReadingPattern = isAffectDepthOfReadingPattern;
  function expandPatternsWithBraceExpansion(patterns) {
    return patterns.reduce((collection, pattern) => {
      return collection.concat(expandBraceExpansion(pattern));
    }, []);
  }
  exports2.expandPatternsWithBraceExpansion = expandPatternsWithBraceExpansion;
  function expandBraceExpansion(pattern) {
    return micromatch.braces(pattern, {
      expand: true,
      nodupes: true
    });
  }
  exports2.expandBraceExpansion = expandBraceExpansion;
  function getPatternParts(pattern, options) {
    let {parts} = picomatch.scan(pattern, Object.assign(Object.assign({}, options), {parts: true}));
    if (parts.length === 0) {
      parts = [pattern];
    }
    if (parts[0].startsWith("/")) {
      parts[0] = parts[0].slice(1);
      parts.unshift("");
    }
    return parts;
  }
  exports2.getPatternParts = getPatternParts;
  function makeRe(pattern, options) {
    return micromatch.makeRe(pattern, options);
  }
  exports2.makeRe = makeRe;
  function convertPatternsToRe(patterns, options) {
    return patterns.map((pattern) => makeRe(pattern, options));
  }
  exports2.convertPatternsToRe = convertPatternsToRe;
  function matchAny(entry, patternsRe) {
    return patternsRe.some((patternRe) => patternRe.test(entry));
  }
  exports2.matchAny = matchAny;
});

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/utils/stream.js
var require_stream2 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.merge = void 0;
  var merge2 = require_merge2();
  function merge(streams) {
    const mergedStream = merge2(streams);
    streams.forEach((stream) => {
      stream.once("error", (error) => mergedStream.emit("error", error));
    });
    mergedStream.once("close", () => propagateCloseEventToSources(streams));
    mergedStream.once("end", () => propagateCloseEventToSources(streams));
    return mergedStream;
  }
  exports2.merge = merge;
  function propagateCloseEventToSources(streams) {
    streams.forEach((stream) => stream.emit("close"));
  }
});

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/utils/string.js
var require_string = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.isEmpty = exports2.isString = void 0;
  function isString(input) {
    return typeof input === "string";
  }
  exports2.isString = isString;
  function isEmpty(input) {
    return input === "";
  }
  exports2.isEmpty = isEmpty;
});

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/utils/index.js
var require_utils3 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.string = exports2.stream = exports2.pattern = exports2.path = exports2.fs = exports2.errno = exports2.array = void 0;
  var array = require_array();
  exports2.array = array;
  var errno = require_errno();
  exports2.errno = errno;
  var fs = require_fs2();
  exports2.fs = fs;
  var path2 = require_path();
  exports2.path = path2;
  var pattern = require_pattern();
  exports2.pattern = pattern;
  var stream = require_stream2();
  exports2.stream = stream;
  var string = require_string();
  exports2.string = string;
});

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/managers/tasks.js
var require_tasks = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.convertPatternGroupToTask = exports2.convertPatternGroupsToTasks = exports2.groupPatternsByBaseDirectory = exports2.getNegativePatternsAsPositive = exports2.getPositivePatterns = exports2.convertPatternsToTasks = exports2.generate = void 0;
  var utils = require_utils3();
  function generate(patterns, settings) {
    const positivePatterns = getPositivePatterns(patterns);
    const negativePatterns = getNegativePatternsAsPositive(patterns, settings.ignore);
    const staticPatterns = positivePatterns.filter((pattern) => utils.pattern.isStaticPattern(pattern, settings));
    const dynamicPatterns = positivePatterns.filter((pattern) => utils.pattern.isDynamicPattern(pattern, settings));
    const staticTasks = convertPatternsToTasks(staticPatterns, negativePatterns, false);
    const dynamicTasks = convertPatternsToTasks(dynamicPatterns, negativePatterns, true);
    return staticTasks.concat(dynamicTasks);
  }
  exports2.generate = generate;
  function convertPatternsToTasks(positive, negative, dynamic) {
    const positivePatternsGroup = groupPatternsByBaseDirectory(positive);
    if ("." in positivePatternsGroup) {
      const task = convertPatternGroupToTask(".", positive, negative, dynamic);
      return [task];
    }
    return convertPatternGroupsToTasks(positivePatternsGroup, negative, dynamic);
  }
  exports2.convertPatternsToTasks = convertPatternsToTasks;
  function getPositivePatterns(patterns) {
    return utils.pattern.getPositivePatterns(patterns);
  }
  exports2.getPositivePatterns = getPositivePatterns;
  function getNegativePatternsAsPositive(patterns, ignore) {
    const negative = utils.pattern.getNegativePatterns(patterns).concat(ignore);
    const positive = negative.map(utils.pattern.convertToPositivePattern);
    return positive;
  }
  exports2.getNegativePatternsAsPositive = getNegativePatternsAsPositive;
  function groupPatternsByBaseDirectory(patterns) {
    const group = {};
    return patterns.reduce((collection, pattern) => {
      const base = utils.pattern.getBaseDirectory(pattern);
      if (base in collection) {
        collection[base].push(pattern);
      } else {
        collection[base] = [pattern];
      }
      return collection;
    }, group);
  }
  exports2.groupPatternsByBaseDirectory = groupPatternsByBaseDirectory;
  function convertPatternGroupsToTasks(positive, negative, dynamic) {
    return Object.keys(positive).map((base) => {
      return convertPatternGroupToTask(base, positive[base], negative, dynamic);
    });
  }
  exports2.convertPatternGroupsToTasks = convertPatternGroupsToTasks;
  function convertPatternGroupToTask(base, positive, negative, dynamic) {
    return {
      dynamic,
      positive,
      negative,
      base,
      patterns: [].concat(positive, negative.map(utils.pattern.convertToNegativePattern))
    };
  }
  exports2.convertPatternGroupToTask = convertPatternGroupToTask;
});

// ../../node_modules/.pnpm/@nodelib/fs.stat@2.0.4/node_modules/@nodelib/fs.stat/out/providers/async.js
var require_async = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.read = void 0;
  function read(path2, settings, callback) {
    settings.fs.lstat(path2, (lstatError, lstat) => {
      if (lstatError !== null) {
        return callFailureCallback(callback, lstatError);
      }
      if (!lstat.isSymbolicLink() || !settings.followSymbolicLink) {
        return callSuccessCallback(callback, lstat);
      }
      settings.fs.stat(path2, (statError, stat) => {
        if (statError !== null) {
          if (settings.throwErrorOnBrokenSymbolicLink) {
            return callFailureCallback(callback, statError);
          }
          return callSuccessCallback(callback, lstat);
        }
        if (settings.markSymbolicLink) {
          stat.isSymbolicLink = () => true;
        }
        callSuccessCallback(callback, stat);
      });
    });
  }
  exports2.read = read;
  function callFailureCallback(callback, error) {
    callback(error);
  }
  function callSuccessCallback(callback, result) {
    callback(null, result);
  }
});

// ../../node_modules/.pnpm/@nodelib/fs.stat@2.0.4/node_modules/@nodelib/fs.stat/out/providers/sync.js
var require_sync2 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.read = void 0;
  function read(path2, settings) {
    const lstat = settings.fs.lstatSync(path2);
    if (!lstat.isSymbolicLink() || !settings.followSymbolicLink) {
      return lstat;
    }
    try {
      const stat = settings.fs.statSync(path2);
      if (settings.markSymbolicLink) {
        stat.isSymbolicLink = () => true;
      }
      return stat;
    } catch (error) {
      if (!settings.throwErrorOnBrokenSymbolicLink) {
        return lstat;
      }
      throw error;
    }
  }
  exports2.read = read;
});

// ../../node_modules/.pnpm/@nodelib/fs.stat@2.0.4/node_modules/@nodelib/fs.stat/out/adapters/fs.js
var require_fs3 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.createFileSystemAdapter = exports2.FILE_SYSTEM_ADAPTER = void 0;
  var fs = require("fs");
  exports2.FILE_SYSTEM_ADAPTER = {
    lstat: fs.lstat,
    stat: fs.stat,
    lstatSync: fs.lstatSync,
    statSync: fs.statSync
  };
  function createFileSystemAdapter(fsMethods) {
    if (fsMethods === void 0) {
      return exports2.FILE_SYSTEM_ADAPTER;
    }
    return Object.assign(Object.assign({}, exports2.FILE_SYSTEM_ADAPTER), fsMethods);
  }
  exports2.createFileSystemAdapter = createFileSystemAdapter;
});

// ../../node_modules/.pnpm/@nodelib/fs.stat@2.0.4/node_modules/@nodelib/fs.stat/out/settings.js
var require_settings = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var fs = require_fs3();
  var Settings = class {
    constructor(_options = {}) {
      this._options = _options;
      this.followSymbolicLink = this._getValue(this._options.followSymbolicLink, true);
      this.fs = fs.createFileSystemAdapter(this._options.fs);
      this.markSymbolicLink = this._getValue(this._options.markSymbolicLink, false);
      this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, true);
    }
    _getValue(option, value) {
      return option !== null && option !== void 0 ? option : value;
    }
  };
  exports2.default = Settings;
});

// ../../node_modules/.pnpm/@nodelib/fs.stat@2.0.4/node_modules/@nodelib/fs.stat/out/index.js
var require_out = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.statSync = exports2.stat = exports2.Settings = void 0;
  var async = require_async();
  var sync = require_sync2();
  var settings_1 = require_settings();
  exports2.Settings = settings_1.default;
  function stat(path2, optionsOrSettingsOrCallback, callback) {
    if (typeof optionsOrSettingsOrCallback === "function") {
      return async.read(path2, getSettings(), optionsOrSettingsOrCallback);
    }
    async.read(path2, getSettings(optionsOrSettingsOrCallback), callback);
  }
  exports2.stat = stat;
  function statSync(path2, optionsOrSettings) {
    const settings = getSettings(optionsOrSettings);
    return sync.read(path2, settings);
  }
  exports2.statSync = statSync;
  function getSettings(settingsOrOptions = {}) {
    if (settingsOrOptions instanceof settings_1.default) {
      return settingsOrOptions;
    }
    return new settings_1.default(settingsOrOptions);
  }
});

// ../../node_modules/.pnpm/queue-microtask@1.2.2/node_modules/queue-microtask/index.js
var require_queue_microtask = __commonJS((exports2, module2) => {
  /*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
  var promise;
  module2.exports = typeof queueMicrotask === "function" ? queueMicrotask.bind(globalThis) : (cb) => (promise || (promise = Promise.resolve())).then(cb).catch((err) => setTimeout(() => {
    throw err;
  }, 0));
});

// ../../node_modules/.pnpm/run-parallel@1.2.0/node_modules/run-parallel/index.js
var require_run_parallel = __commonJS((exports2, module2) => {
  /*! run-parallel. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
  module2.exports = runParallel;
  var queueMicrotask2 = require_queue_microtask();
  function runParallel(tasks, cb) {
    let results, pending, keys;
    let isSync = true;
    if (Array.isArray(tasks)) {
      results = [];
      pending = tasks.length;
    } else {
      keys = Object.keys(tasks);
      results = {};
      pending = keys.length;
    }
    function done(err) {
      function end() {
        if (cb)
          cb(err, results);
        cb = null;
      }
      if (isSync)
        queueMicrotask2(end);
      else
        end();
    }
    function each(i, err, result) {
      results[i] = result;
      if (--pending === 0 || err) {
        done(err);
      }
    }
    if (!pending) {
      done(null);
    } else if (keys) {
      keys.forEach(function(key) {
        tasks[key](function(err, result) {
          each(key, err, result);
        });
      });
    } else {
      tasks.forEach(function(task, i) {
        task(function(err, result) {
          each(i, err, result);
        });
      });
    }
    isSync = false;
  }
});

// ../../node_modules/.pnpm/@nodelib/fs.scandir@2.1.4/node_modules/@nodelib/fs.scandir/out/constants.js
var require_constants3 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.IS_SUPPORT_READDIR_WITH_FILE_TYPES = void 0;
  var NODE_PROCESS_VERSION_PARTS = process.versions.node.split(".");
  var MAJOR_VERSION = parseInt(NODE_PROCESS_VERSION_PARTS[0], 10);
  var MINOR_VERSION = parseInt(NODE_PROCESS_VERSION_PARTS[1], 10);
  var SUPPORTED_MAJOR_VERSION = 10;
  var SUPPORTED_MINOR_VERSION = 10;
  var IS_MATCHED_BY_MAJOR = MAJOR_VERSION > SUPPORTED_MAJOR_VERSION;
  var IS_MATCHED_BY_MAJOR_AND_MINOR = MAJOR_VERSION === SUPPORTED_MAJOR_VERSION && MINOR_VERSION >= SUPPORTED_MINOR_VERSION;
  exports2.IS_SUPPORT_READDIR_WITH_FILE_TYPES = IS_MATCHED_BY_MAJOR || IS_MATCHED_BY_MAJOR_AND_MINOR;
});

// ../../node_modules/.pnpm/@nodelib/fs.scandir@2.1.4/node_modules/@nodelib/fs.scandir/out/utils/fs.js
var require_fs4 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.createDirentFromStats = void 0;
  var DirentFromStats = class {
    constructor(name, stats) {
      this.name = name;
      this.isBlockDevice = stats.isBlockDevice.bind(stats);
      this.isCharacterDevice = stats.isCharacterDevice.bind(stats);
      this.isDirectory = stats.isDirectory.bind(stats);
      this.isFIFO = stats.isFIFO.bind(stats);
      this.isFile = stats.isFile.bind(stats);
      this.isSocket = stats.isSocket.bind(stats);
      this.isSymbolicLink = stats.isSymbolicLink.bind(stats);
    }
  };
  function createDirentFromStats(name, stats) {
    return new DirentFromStats(name, stats);
  }
  exports2.createDirentFromStats = createDirentFromStats;
});

// ../../node_modules/.pnpm/@nodelib/fs.scandir@2.1.4/node_modules/@nodelib/fs.scandir/out/utils/index.js
var require_utils4 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.fs = void 0;
  var fs = require_fs4();
  exports2.fs = fs;
});

// ../../node_modules/.pnpm/@nodelib/fs.scandir@2.1.4/node_modules/@nodelib/fs.scandir/out/providers/common.js
var require_common4 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.joinPathSegments = void 0;
  function joinPathSegments(a, b, separator) {
    if (a.endsWith(separator)) {
      return a + b;
    }
    return a + separator + b;
  }
  exports2.joinPathSegments = joinPathSegments;
});

// ../../node_modules/.pnpm/@nodelib/fs.scandir@2.1.4/node_modules/@nodelib/fs.scandir/out/providers/async.js
var require_async2 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.readdir = exports2.readdirWithFileTypes = exports2.read = void 0;
  var fsStat = require_out();
  var rpl = require_run_parallel();
  var constants_1 = require_constants3();
  var utils = require_utils4();
  var common = require_common4();
  function read(directory, settings, callback) {
    if (!settings.stats && constants_1.IS_SUPPORT_READDIR_WITH_FILE_TYPES) {
      return readdirWithFileTypes(directory, settings, callback);
    }
    return readdir(directory, settings, callback);
  }
  exports2.read = read;
  function readdirWithFileTypes(directory, settings, callback) {
    settings.fs.readdir(directory, {withFileTypes: true}, (readdirError, dirents) => {
      if (readdirError !== null) {
        return callFailureCallback(callback, readdirError);
      }
      const entries = dirents.map((dirent) => ({
        dirent,
        name: dirent.name,
        path: common.joinPathSegments(directory, dirent.name, settings.pathSegmentSeparator)
      }));
      if (!settings.followSymbolicLinks) {
        return callSuccessCallback(callback, entries);
      }
      const tasks = entries.map((entry) => makeRplTaskEntry(entry, settings));
      rpl(tasks, (rplError, rplEntries) => {
        if (rplError !== null) {
          return callFailureCallback(callback, rplError);
        }
        callSuccessCallback(callback, rplEntries);
      });
    });
  }
  exports2.readdirWithFileTypes = readdirWithFileTypes;
  function makeRplTaskEntry(entry, settings) {
    return (done) => {
      if (!entry.dirent.isSymbolicLink()) {
        return done(null, entry);
      }
      settings.fs.stat(entry.path, (statError, stats) => {
        if (statError !== null) {
          if (settings.throwErrorOnBrokenSymbolicLink) {
            return done(statError);
          }
          return done(null, entry);
        }
        entry.dirent = utils.fs.createDirentFromStats(entry.name, stats);
        return done(null, entry);
      });
    };
  }
  function readdir(directory, settings, callback) {
    settings.fs.readdir(directory, (readdirError, names) => {
      if (readdirError !== null) {
        return callFailureCallback(callback, readdirError);
      }
      const filepaths = names.map((name) => common.joinPathSegments(directory, name, settings.pathSegmentSeparator));
      const tasks = filepaths.map((filepath) => {
        return (done) => fsStat.stat(filepath, settings.fsStatSettings, done);
      });
      rpl(tasks, (rplError, results) => {
        if (rplError !== null) {
          return callFailureCallback(callback, rplError);
        }
        const entries = [];
        names.forEach((name, index) => {
          const stats = results[index];
          const entry = {
            name,
            path: filepaths[index],
            dirent: utils.fs.createDirentFromStats(name, stats)
          };
          if (settings.stats) {
            entry.stats = stats;
          }
          entries.push(entry);
        });
        callSuccessCallback(callback, entries);
      });
    });
  }
  exports2.readdir = readdir;
  function callFailureCallback(callback, error) {
    callback(error);
  }
  function callSuccessCallback(callback, result) {
    callback(null, result);
  }
});

// ../../node_modules/.pnpm/@nodelib/fs.scandir@2.1.4/node_modules/@nodelib/fs.scandir/out/providers/sync.js
var require_sync3 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.readdir = exports2.readdirWithFileTypes = exports2.read = void 0;
  var fsStat = require_out();
  var constants_1 = require_constants3();
  var utils = require_utils4();
  var common = require_common4();
  function read(directory, settings) {
    if (!settings.stats && constants_1.IS_SUPPORT_READDIR_WITH_FILE_TYPES) {
      return readdirWithFileTypes(directory, settings);
    }
    return readdir(directory, settings);
  }
  exports2.read = read;
  function readdirWithFileTypes(directory, settings) {
    const dirents = settings.fs.readdirSync(directory, {withFileTypes: true});
    return dirents.map((dirent) => {
      const entry = {
        dirent,
        name: dirent.name,
        path: common.joinPathSegments(directory, dirent.name, settings.pathSegmentSeparator)
      };
      if (entry.dirent.isSymbolicLink() && settings.followSymbolicLinks) {
        try {
          const stats = settings.fs.statSync(entry.path);
          entry.dirent = utils.fs.createDirentFromStats(entry.name, stats);
        } catch (error) {
          if (settings.throwErrorOnBrokenSymbolicLink) {
            throw error;
          }
        }
      }
      return entry;
    });
  }
  exports2.readdirWithFileTypes = readdirWithFileTypes;
  function readdir(directory, settings) {
    const names = settings.fs.readdirSync(directory);
    return names.map((name) => {
      const entryPath = common.joinPathSegments(directory, name, settings.pathSegmentSeparator);
      const stats = fsStat.statSync(entryPath, settings.fsStatSettings);
      const entry = {
        name,
        path: entryPath,
        dirent: utils.fs.createDirentFromStats(name, stats)
      };
      if (settings.stats) {
        entry.stats = stats;
      }
      return entry;
    });
  }
  exports2.readdir = readdir;
});

// ../../node_modules/.pnpm/@nodelib/fs.scandir@2.1.4/node_modules/@nodelib/fs.scandir/out/adapters/fs.js
var require_fs5 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.createFileSystemAdapter = exports2.FILE_SYSTEM_ADAPTER = void 0;
  var fs = require("fs");
  exports2.FILE_SYSTEM_ADAPTER = {
    lstat: fs.lstat,
    stat: fs.stat,
    lstatSync: fs.lstatSync,
    statSync: fs.statSync,
    readdir: fs.readdir,
    readdirSync: fs.readdirSync
  };
  function createFileSystemAdapter(fsMethods) {
    if (fsMethods === void 0) {
      return exports2.FILE_SYSTEM_ADAPTER;
    }
    return Object.assign(Object.assign({}, exports2.FILE_SYSTEM_ADAPTER), fsMethods);
  }
  exports2.createFileSystemAdapter = createFileSystemAdapter;
});

// ../../node_modules/.pnpm/@nodelib/fs.scandir@2.1.4/node_modules/@nodelib/fs.scandir/out/settings.js
var require_settings2 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var path2 = require("path");
  var fsStat = require_out();
  var fs = require_fs5();
  var Settings = class {
    constructor(_options = {}) {
      this._options = _options;
      this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, false);
      this.fs = fs.createFileSystemAdapter(this._options.fs);
      this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, path2.sep);
      this.stats = this._getValue(this._options.stats, false);
      this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, true);
      this.fsStatSettings = new fsStat.Settings({
        followSymbolicLink: this.followSymbolicLinks,
        fs: this.fs,
        throwErrorOnBrokenSymbolicLink: this.throwErrorOnBrokenSymbolicLink
      });
    }
    _getValue(option, value) {
      return option !== null && option !== void 0 ? option : value;
    }
  };
  exports2.default = Settings;
});

// ../../node_modules/.pnpm/@nodelib/fs.scandir@2.1.4/node_modules/@nodelib/fs.scandir/out/index.js
var require_out2 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.Settings = exports2.scandirSync = exports2.scandir = void 0;
  var async = require_async2();
  var sync = require_sync3();
  var settings_1 = require_settings2();
  exports2.Settings = settings_1.default;
  function scandir(path2, optionsOrSettingsOrCallback, callback) {
    if (typeof optionsOrSettingsOrCallback === "function") {
      return async.read(path2, getSettings(), optionsOrSettingsOrCallback);
    }
    async.read(path2, getSettings(optionsOrSettingsOrCallback), callback);
  }
  exports2.scandir = scandir;
  function scandirSync(path2, optionsOrSettings) {
    const settings = getSettings(optionsOrSettings);
    return sync.read(path2, settings);
  }
  exports2.scandirSync = scandirSync;
  function getSettings(settingsOrOptions = {}) {
    if (settingsOrOptions instanceof settings_1.default) {
      return settingsOrOptions;
    }
    return new settings_1.default(settingsOrOptions);
  }
});

// ../../node_modules/.pnpm/reusify@1.0.4/node_modules/reusify/reusify.js
var require_reusify = __commonJS((exports2, module2) => {
  "use strict";
  function reusify(Constructor) {
    var head = new Constructor();
    var tail = head;
    function get() {
      var current = head;
      if (current.next) {
        head = current.next;
      } else {
        head = new Constructor();
        tail = head;
      }
      current.next = null;
      return current;
    }
    function release(obj) {
      tail.next = obj;
      tail = obj;
    }
    return {
      get,
      release
    };
  }
  module2.exports = reusify;
});

// ../../node_modules/.pnpm/fastq@1.11.0/node_modules/fastq/queue.js
var require_queue = __commonJS((exports2, module2) => {
  "use strict";
  var reusify = require_reusify();
  function fastqueue(context, worker, concurrency) {
    if (typeof context === "function") {
      concurrency = worker;
      worker = context;
      context = null;
    }
    if (concurrency < 1) {
      throw new Error("fastqueue concurrency must be greater than 1");
    }
    var cache = reusify(Task);
    var queueHead = null;
    var queueTail = null;
    var _running = 0;
    var errorHandler = null;
    var self = {
      push,
      drain: noop,
      saturated: noop,
      pause,
      paused: false,
      concurrency,
      running,
      resume,
      idle,
      length,
      getQueue,
      unshift,
      empty: noop,
      kill,
      killAndDrain,
      error
    };
    return self;
    function running() {
      return _running;
    }
    function pause() {
      self.paused = true;
    }
    function length() {
      var current = queueHead;
      var counter = 0;
      while (current) {
        current = current.next;
        counter++;
      }
      return counter;
    }
    function getQueue() {
      var current = queueHead;
      var tasks = [];
      while (current) {
        tasks.push(current.value);
        current = current.next;
      }
      return tasks;
    }
    function resume() {
      if (!self.paused)
        return;
      self.paused = false;
      for (var i = 0; i < self.concurrency; i++) {
        _running++;
        release();
      }
    }
    function idle() {
      return _running === 0 && self.length() === 0;
    }
    function push(value, done) {
      var current = cache.get();
      current.context = context;
      current.release = release;
      current.value = value;
      current.callback = done || noop;
      current.errorHandler = errorHandler;
      if (_running === self.concurrency || self.paused) {
        if (queueTail) {
          queueTail.next = current;
          queueTail = current;
        } else {
          queueHead = current;
          queueTail = current;
          self.saturated();
        }
      } else {
        _running++;
        worker.call(context, current.value, current.worked);
      }
    }
    function unshift(value, done) {
      var current = cache.get();
      current.context = context;
      current.release = release;
      current.value = value;
      current.callback = done || noop;
      if (_running === self.concurrency || self.paused) {
        if (queueHead) {
          current.next = queueHead;
          queueHead = current;
        } else {
          queueHead = current;
          queueTail = current;
          self.saturated();
        }
      } else {
        _running++;
        worker.call(context, current.value, current.worked);
      }
    }
    function release(holder) {
      if (holder) {
        cache.release(holder);
      }
      var next = queueHead;
      if (next) {
        if (!self.paused) {
          if (queueTail === queueHead) {
            queueTail = null;
          }
          queueHead = next.next;
          next.next = null;
          worker.call(context, next.value, next.worked);
          if (queueTail === null) {
            self.empty();
          }
        } else {
          _running--;
        }
      } else if (--_running === 0) {
        self.drain();
      }
    }
    function kill() {
      queueHead = null;
      queueTail = null;
      self.drain = noop;
    }
    function killAndDrain() {
      queueHead = null;
      queueTail = null;
      self.drain();
      self.drain = noop;
    }
    function error(handler) {
      errorHandler = handler;
    }
  }
  function noop() {
  }
  function Task() {
    this.value = null;
    this.callback = noop;
    this.next = null;
    this.release = noop;
    this.context = null;
    this.errorHandler = null;
    var self = this;
    this.worked = function worked(err, result) {
      var callback = self.callback;
      var errorHandler = self.errorHandler;
      var val = self.value;
      self.value = null;
      self.callback = noop;
      if (self.errorHandler) {
        errorHandler(err, val);
      }
      callback.call(self.context, err, result);
      self.release(self);
    };
  }
  function queueAsPromised(context, worker, concurrency) {
    if (typeof context === "function") {
      concurrency = worker;
      worker = context;
      context = null;
    }
    function asyncWrapper(arg, cb) {
      worker.call(this, arg).then(function(res) {
        cb(null, res);
      }, cb);
    }
    var queue = fastqueue(context, asyncWrapper, concurrency);
    var pushCb = queue.push;
    var unshiftCb = queue.unshift;
    queue.push = push;
    queue.unshift = unshift;
    return queue;
    function push(value) {
      return new Promise(function(resolve, reject) {
        pushCb(value, function(err, result) {
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        });
      });
    }
    function unshift(value) {
      return new Promise(function(resolve, reject) {
        unshiftCb(value, function(err, result) {
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        });
      });
    }
  }
  module2.exports = fastqueue;
  module2.exports.promise = queueAsPromised;
});

// ../../node_modules/.pnpm/@nodelib/fs.walk@1.2.6/node_modules/@nodelib/fs.walk/out/readers/common.js
var require_common5 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.joinPathSegments = exports2.replacePathSegmentSeparator = exports2.isAppliedFilter = exports2.isFatalError = void 0;
  function isFatalError(settings, error) {
    if (settings.errorFilter === null) {
      return true;
    }
    return !settings.errorFilter(error);
  }
  exports2.isFatalError = isFatalError;
  function isAppliedFilter(filter, value) {
    return filter === null || filter(value);
  }
  exports2.isAppliedFilter = isAppliedFilter;
  function replacePathSegmentSeparator(filepath, separator) {
    return filepath.split(/[/\\]/).join(separator);
  }
  exports2.replacePathSegmentSeparator = replacePathSegmentSeparator;
  function joinPathSegments(a, b, separator) {
    if (a === "") {
      return b;
    }
    if (a.endsWith(separator)) {
      return a + b;
    }
    return a + separator + b;
  }
  exports2.joinPathSegments = joinPathSegments;
});

// ../../node_modules/.pnpm/@nodelib/fs.walk@1.2.6/node_modules/@nodelib/fs.walk/out/readers/reader.js
var require_reader = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var common = require_common5();
  var Reader = class {
    constructor(_root, _settings) {
      this._root = _root;
      this._settings = _settings;
      this._root = common.replacePathSegmentSeparator(_root, _settings.pathSegmentSeparator);
    }
  };
  exports2.default = Reader;
});

// ../../node_modules/.pnpm/@nodelib/fs.walk@1.2.6/node_modules/@nodelib/fs.walk/out/readers/async.js
var require_async3 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var events_1 = require("events");
  var fsScandir = require_out2();
  var fastq = require_queue();
  var common = require_common5();
  var reader_1 = require_reader();
  var AsyncReader = class extends reader_1.default {
    constructor(_root, _settings) {
      super(_root, _settings);
      this._settings = _settings;
      this._scandir = fsScandir.scandir;
      this._emitter = new events_1.EventEmitter();
      this._queue = fastq(this._worker.bind(this), this._settings.concurrency);
      this._isFatalError = false;
      this._isDestroyed = false;
      this._queue.drain = () => {
        if (!this._isFatalError) {
          this._emitter.emit("end");
        }
      };
    }
    read() {
      this._isFatalError = false;
      this._isDestroyed = false;
      setImmediate(() => {
        this._pushToQueue(this._root, this._settings.basePath);
      });
      return this._emitter;
    }
    get isDestroyed() {
      return this._isDestroyed;
    }
    destroy() {
      if (this._isDestroyed) {
        throw new Error("The reader is already destroyed");
      }
      this._isDestroyed = true;
      this._queue.killAndDrain();
    }
    onEntry(callback) {
      this._emitter.on("entry", callback);
    }
    onError(callback) {
      this._emitter.once("error", callback);
    }
    onEnd(callback) {
      this._emitter.once("end", callback);
    }
    _pushToQueue(directory, base) {
      const queueItem = {directory, base};
      this._queue.push(queueItem, (error) => {
        if (error !== null) {
          this._handleError(error);
        }
      });
    }
    _worker(item, done) {
      this._scandir(item.directory, this._settings.fsScandirSettings, (error, entries) => {
        if (error !== null) {
          return done(error, void 0);
        }
        for (const entry of entries) {
          this._handleEntry(entry, item.base);
        }
        done(null, void 0);
      });
    }
    _handleError(error) {
      if (this._isDestroyed || !common.isFatalError(this._settings, error)) {
        return;
      }
      this._isFatalError = true;
      this._isDestroyed = true;
      this._emitter.emit("error", error);
    }
    _handleEntry(entry, base) {
      if (this._isDestroyed || this._isFatalError) {
        return;
      }
      const fullpath = entry.path;
      if (base !== void 0) {
        entry.path = common.joinPathSegments(base, entry.name, this._settings.pathSegmentSeparator);
      }
      if (common.isAppliedFilter(this._settings.entryFilter, entry)) {
        this._emitEntry(entry);
      }
      if (entry.dirent.isDirectory() && common.isAppliedFilter(this._settings.deepFilter, entry)) {
        this._pushToQueue(fullpath, entry.path);
      }
    }
    _emitEntry(entry) {
      this._emitter.emit("entry", entry);
    }
  };
  exports2.default = AsyncReader;
});

// ../../node_modules/.pnpm/@nodelib/fs.walk@1.2.6/node_modules/@nodelib/fs.walk/out/providers/async.js
var require_async4 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var async_1 = require_async3();
  var AsyncProvider = class {
    constructor(_root, _settings) {
      this._root = _root;
      this._settings = _settings;
      this._reader = new async_1.default(this._root, this._settings);
      this._storage = new Set();
    }
    read(callback) {
      this._reader.onError((error) => {
        callFailureCallback(callback, error);
      });
      this._reader.onEntry((entry) => {
        this._storage.add(entry);
      });
      this._reader.onEnd(() => {
        callSuccessCallback(callback, [...this._storage]);
      });
      this._reader.read();
    }
  };
  exports2.default = AsyncProvider;
  function callFailureCallback(callback, error) {
    callback(error);
  }
  function callSuccessCallback(callback, entries) {
    callback(null, entries);
  }
});

// ../../node_modules/.pnpm/@nodelib/fs.walk@1.2.6/node_modules/@nodelib/fs.walk/out/providers/stream.js
var require_stream3 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var stream_1 = require("stream");
  var async_1 = require_async3();
  var StreamProvider = class {
    constructor(_root, _settings) {
      this._root = _root;
      this._settings = _settings;
      this._reader = new async_1.default(this._root, this._settings);
      this._stream = new stream_1.Readable({
        objectMode: true,
        read: () => {
        },
        destroy: () => {
          if (!this._reader.isDestroyed) {
            this._reader.destroy();
          }
        }
      });
    }
    read() {
      this._reader.onError((error) => {
        this._stream.emit("error", error);
      });
      this._reader.onEntry((entry) => {
        this._stream.push(entry);
      });
      this._reader.onEnd(() => {
        this._stream.push(null);
      });
      this._reader.read();
      return this._stream;
    }
  };
  exports2.default = StreamProvider;
});

// ../../node_modules/.pnpm/@nodelib/fs.walk@1.2.6/node_modules/@nodelib/fs.walk/out/readers/sync.js
var require_sync4 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var fsScandir = require_out2();
  var common = require_common5();
  var reader_1 = require_reader();
  var SyncReader = class extends reader_1.default {
    constructor() {
      super(...arguments);
      this._scandir = fsScandir.scandirSync;
      this._storage = new Set();
      this._queue = new Set();
    }
    read() {
      this._pushToQueue(this._root, this._settings.basePath);
      this._handleQueue();
      return [...this._storage];
    }
    _pushToQueue(directory, base) {
      this._queue.add({directory, base});
    }
    _handleQueue() {
      for (const item of this._queue.values()) {
        this._handleDirectory(item.directory, item.base);
      }
    }
    _handleDirectory(directory, base) {
      try {
        const entries = this._scandir(directory, this._settings.fsScandirSettings);
        for (const entry of entries) {
          this._handleEntry(entry, base);
        }
      } catch (error) {
        this._handleError(error);
      }
    }
    _handleError(error) {
      if (!common.isFatalError(this._settings, error)) {
        return;
      }
      throw error;
    }
    _handleEntry(entry, base) {
      const fullpath = entry.path;
      if (base !== void 0) {
        entry.path = common.joinPathSegments(base, entry.name, this._settings.pathSegmentSeparator);
      }
      if (common.isAppliedFilter(this._settings.entryFilter, entry)) {
        this._pushToStorage(entry);
      }
      if (entry.dirent.isDirectory() && common.isAppliedFilter(this._settings.deepFilter, entry)) {
        this._pushToQueue(fullpath, entry.path);
      }
    }
    _pushToStorage(entry) {
      this._storage.add(entry);
    }
  };
  exports2.default = SyncReader;
});

// ../../node_modules/.pnpm/@nodelib/fs.walk@1.2.6/node_modules/@nodelib/fs.walk/out/providers/sync.js
var require_sync5 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var sync_1 = require_sync4();
  var SyncProvider = class {
    constructor(_root, _settings) {
      this._root = _root;
      this._settings = _settings;
      this._reader = new sync_1.default(this._root, this._settings);
    }
    read() {
      return this._reader.read();
    }
  };
  exports2.default = SyncProvider;
});

// ../../node_modules/.pnpm/@nodelib/fs.walk@1.2.6/node_modules/@nodelib/fs.walk/out/settings.js
var require_settings3 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var path2 = require("path");
  var fsScandir = require_out2();
  var Settings = class {
    constructor(_options = {}) {
      this._options = _options;
      this.basePath = this._getValue(this._options.basePath, void 0);
      this.concurrency = this._getValue(this._options.concurrency, Infinity);
      this.deepFilter = this._getValue(this._options.deepFilter, null);
      this.entryFilter = this._getValue(this._options.entryFilter, null);
      this.errorFilter = this._getValue(this._options.errorFilter, null);
      this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, path2.sep);
      this.fsScandirSettings = new fsScandir.Settings({
        followSymbolicLinks: this._options.followSymbolicLinks,
        fs: this._options.fs,
        pathSegmentSeparator: this._options.pathSegmentSeparator,
        stats: this._options.stats,
        throwErrorOnBrokenSymbolicLink: this._options.throwErrorOnBrokenSymbolicLink
      });
    }
    _getValue(option, value) {
      return option !== null && option !== void 0 ? option : value;
    }
  };
  exports2.default = Settings;
});

// ../../node_modules/.pnpm/@nodelib/fs.walk@1.2.6/node_modules/@nodelib/fs.walk/out/index.js
var require_out3 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.Settings = exports2.walkStream = exports2.walkSync = exports2.walk = void 0;
  var async_1 = require_async4();
  var stream_1 = require_stream3();
  var sync_1 = require_sync5();
  var settings_1 = require_settings3();
  exports2.Settings = settings_1.default;
  function walk(directory, optionsOrSettingsOrCallback, callback) {
    if (typeof optionsOrSettingsOrCallback === "function") {
      return new async_1.default(directory, getSettings()).read(optionsOrSettingsOrCallback);
    }
    new async_1.default(directory, getSettings(optionsOrSettingsOrCallback)).read(callback);
  }
  exports2.walk = walk;
  function walkSync(directory, optionsOrSettings) {
    const settings = getSettings(optionsOrSettings);
    const provider = new sync_1.default(directory, settings);
    return provider.read();
  }
  exports2.walkSync = walkSync;
  function walkStream(directory, optionsOrSettings) {
    const settings = getSettings(optionsOrSettings);
    const provider = new stream_1.default(directory, settings);
    return provider.read();
  }
  exports2.walkStream = walkStream;
  function getSettings(settingsOrOptions = {}) {
    if (settingsOrOptions instanceof settings_1.default) {
      return settingsOrOptions;
    }
    return new settings_1.default(settingsOrOptions);
  }
});

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/readers/reader.js
var require_reader2 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var path2 = require("path");
  var fsStat = require_out();
  var utils = require_utils3();
  var Reader = class {
    constructor(_settings) {
      this._settings = _settings;
      this._fsStatSettings = new fsStat.Settings({
        followSymbolicLink: this._settings.followSymbolicLinks,
        fs: this._settings.fs,
        throwErrorOnBrokenSymbolicLink: this._settings.followSymbolicLinks
      });
    }
    _getFullEntryPath(filepath) {
      return path2.resolve(this._settings.cwd, filepath);
    }
    _makeEntry(stats, pattern) {
      const entry = {
        name: pattern,
        path: pattern,
        dirent: utils.fs.createDirentFromStats(pattern, stats)
      };
      if (this._settings.stats) {
        entry.stats = stats;
      }
      return entry;
    }
    _isFatalError(error) {
      return !utils.errno.isEnoentCodeError(error) && !this._settings.suppressErrors;
    }
  };
  exports2.default = Reader;
});

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/readers/stream.js
var require_stream4 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var stream_1 = require("stream");
  var fsStat = require_out();
  var fsWalk = require_out3();
  var reader_1 = require_reader2();
  var ReaderStream = class extends reader_1.default {
    constructor() {
      super(...arguments);
      this._walkStream = fsWalk.walkStream;
      this._stat = fsStat.stat;
    }
    dynamic(root, options) {
      return this._walkStream(root, options);
    }
    static(patterns, options) {
      const filepaths = patterns.map(this._getFullEntryPath, this);
      const stream = new stream_1.PassThrough({objectMode: true});
      stream._write = (index, _enc, done) => {
        return this._getEntry(filepaths[index], patterns[index], options).then((entry) => {
          if (entry !== null && options.entryFilter(entry)) {
            stream.push(entry);
          }
          if (index === filepaths.length - 1) {
            stream.end();
          }
          done();
        }).catch(done);
      };
      for (let i = 0; i < filepaths.length; i++) {
        stream.write(i);
      }
      return stream;
    }
    _getEntry(filepath, pattern, options) {
      return this._getStat(filepath).then((stats) => this._makeEntry(stats, pattern)).catch((error) => {
        if (options.errorFilter(error)) {
          return null;
        }
        throw error;
      });
    }
    _getStat(filepath) {
      return new Promise((resolve, reject) => {
        this._stat(filepath, this._fsStatSettings, (error, stats) => {
          return error === null ? resolve(stats) : reject(error);
        });
      });
    }
  };
  exports2.default = ReaderStream;
});

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/providers/matchers/matcher.js
var require_matcher = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var utils = require_utils3();
  var Matcher = class {
    constructor(_patterns, _settings, _micromatchOptions) {
      this._patterns = _patterns;
      this._settings = _settings;
      this._micromatchOptions = _micromatchOptions;
      this._storage = [];
      this._fillStorage();
    }
    _fillStorage() {
      const patterns = utils.pattern.expandPatternsWithBraceExpansion(this._patterns);
      for (const pattern of patterns) {
        const segments = this._getPatternSegments(pattern);
        const sections = this._splitSegmentsIntoSections(segments);
        this._storage.push({
          complete: sections.length <= 1,
          pattern,
          segments,
          sections
        });
      }
    }
    _getPatternSegments(pattern) {
      const parts = utils.pattern.getPatternParts(pattern, this._micromatchOptions);
      return parts.map((part) => {
        const dynamic = utils.pattern.isDynamicPattern(part, this._settings);
        if (!dynamic) {
          return {
            dynamic: false,
            pattern: part
          };
        }
        return {
          dynamic: true,
          pattern: part,
          patternRe: utils.pattern.makeRe(part, this._micromatchOptions)
        };
      });
    }
    _splitSegmentsIntoSections(segments) {
      return utils.array.splitWhen(segments, (segment) => segment.dynamic && utils.pattern.hasGlobStar(segment.pattern));
    }
  };
  exports2.default = Matcher;
});

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/providers/matchers/partial.js
var require_partial = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var matcher_1 = require_matcher();
  var PartialMatcher = class extends matcher_1.default {
    match(filepath) {
      const parts = filepath.split("/");
      const levels = parts.length;
      const patterns = this._storage.filter((info) => !info.complete || info.segments.length > levels);
      for (const pattern of patterns) {
        const section = pattern.sections[0];
        if (!pattern.complete && levels > section.length) {
          return true;
        }
        const match = parts.every((part, index) => {
          const segment = pattern.segments[index];
          if (segment.dynamic && segment.patternRe.test(part)) {
            return true;
          }
          if (!segment.dynamic && segment.pattern === part) {
            return true;
          }
          return false;
        });
        if (match) {
          return true;
        }
      }
      return false;
    }
  };
  exports2.default = PartialMatcher;
});

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/providers/filters/deep.js
var require_deep = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var utils = require_utils3();
  var partial_1 = require_partial();
  var DeepFilter = class {
    constructor(_settings, _micromatchOptions) {
      this._settings = _settings;
      this._micromatchOptions = _micromatchOptions;
    }
    getFilter(basePath, positive, negative) {
      const matcher = this._getMatcher(positive);
      const negativeRe = this._getNegativePatternsRe(negative);
      return (entry) => this._filter(basePath, entry, matcher, negativeRe);
    }
    _getMatcher(patterns) {
      return new partial_1.default(patterns, this._settings, this._micromatchOptions);
    }
    _getNegativePatternsRe(patterns) {
      const affectDepthOfReadingPatterns = patterns.filter(utils.pattern.isAffectDepthOfReadingPattern);
      return utils.pattern.convertPatternsToRe(affectDepthOfReadingPatterns, this._micromatchOptions);
    }
    _filter(basePath, entry, matcher, negativeRe) {
      if (this._isSkippedByDeep(basePath, entry.path)) {
        return false;
      }
      if (this._isSkippedSymbolicLink(entry)) {
        return false;
      }
      const filepath = utils.path.removeLeadingDotSegment(entry.path);
      if (this._isSkippedByPositivePatterns(filepath, matcher)) {
        return false;
      }
      return this._isSkippedByNegativePatterns(filepath, negativeRe);
    }
    _isSkippedByDeep(basePath, entryPath) {
      if (this._settings.deep === Infinity) {
        return false;
      }
      return this._getEntryLevel(basePath, entryPath) >= this._settings.deep;
    }
    _getEntryLevel(basePath, entryPath) {
      const entryPathDepth = entryPath.split("/").length;
      if (basePath === "") {
        return entryPathDepth;
      }
      const basePathDepth = basePath.split("/").length;
      return entryPathDepth - basePathDepth;
    }
    _isSkippedSymbolicLink(entry) {
      return !this._settings.followSymbolicLinks && entry.dirent.isSymbolicLink();
    }
    _isSkippedByPositivePatterns(entryPath, matcher) {
      return !this._settings.baseNameMatch && !matcher.match(entryPath);
    }
    _isSkippedByNegativePatterns(entryPath, patternsRe) {
      return !utils.pattern.matchAny(entryPath, patternsRe);
    }
  };
  exports2.default = DeepFilter;
});

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/providers/filters/entry.js
var require_entry = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var utils = require_utils3();
  var EntryFilter = class {
    constructor(_settings, _micromatchOptions) {
      this._settings = _settings;
      this._micromatchOptions = _micromatchOptions;
      this.index = new Map();
    }
    getFilter(positive, negative) {
      const positiveRe = utils.pattern.convertPatternsToRe(positive, this._micromatchOptions);
      const negativeRe = utils.pattern.convertPatternsToRe(negative, this._micromatchOptions);
      return (entry) => this._filter(entry, positiveRe, negativeRe);
    }
    _filter(entry, positiveRe, negativeRe) {
      if (this._settings.unique && this._isDuplicateEntry(entry)) {
        return false;
      }
      if (this._onlyFileFilter(entry) || this._onlyDirectoryFilter(entry)) {
        return false;
      }
      if (this._isSkippedByAbsoluteNegativePatterns(entry.path, negativeRe)) {
        return false;
      }
      const filepath = this._settings.baseNameMatch ? entry.name : entry.path;
      const isMatched = this._isMatchToPatterns(filepath, positiveRe) && !this._isMatchToPatterns(entry.path, negativeRe);
      if (this._settings.unique && isMatched) {
        this._createIndexRecord(entry);
      }
      return isMatched;
    }
    _isDuplicateEntry(entry) {
      return this.index.has(entry.path);
    }
    _createIndexRecord(entry) {
      this.index.set(entry.path, void 0);
    }
    _onlyFileFilter(entry) {
      return this._settings.onlyFiles && !entry.dirent.isFile();
    }
    _onlyDirectoryFilter(entry) {
      return this._settings.onlyDirectories && !entry.dirent.isDirectory();
    }
    _isSkippedByAbsoluteNegativePatterns(entryPath, patternsRe) {
      if (!this._settings.absolute) {
        return false;
      }
      const fullpath = utils.path.makeAbsolute(this._settings.cwd, entryPath);
      return utils.pattern.matchAny(fullpath, patternsRe);
    }
    _isMatchToPatterns(entryPath, patternsRe) {
      const filepath = utils.path.removeLeadingDotSegment(entryPath);
      return utils.pattern.matchAny(filepath, patternsRe);
    }
  };
  exports2.default = EntryFilter;
});

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/providers/filters/error.js
var require_error2 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var utils = require_utils3();
  var ErrorFilter = class {
    constructor(_settings) {
      this._settings = _settings;
    }
    getFilter() {
      return (error) => this._isNonFatalError(error);
    }
    _isNonFatalError(error) {
      return utils.errno.isEnoentCodeError(error) || this._settings.suppressErrors;
    }
  };
  exports2.default = ErrorFilter;
});

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/providers/transformers/entry.js
var require_entry2 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var utils = require_utils3();
  var EntryTransformer = class {
    constructor(_settings) {
      this._settings = _settings;
    }
    getTransformer() {
      return (entry) => this._transform(entry);
    }
    _transform(entry) {
      let filepath = entry.path;
      if (this._settings.absolute) {
        filepath = utils.path.makeAbsolute(this._settings.cwd, filepath);
        filepath = utils.path.unixify(filepath);
      }
      if (this._settings.markDirectories && entry.dirent.isDirectory()) {
        filepath += "/";
      }
      if (!this._settings.objectMode) {
        return filepath;
      }
      return Object.assign(Object.assign({}, entry), {path: filepath});
    }
  };
  exports2.default = EntryTransformer;
});

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/providers/provider.js
var require_provider = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var path2 = require("path");
  var deep_1 = require_deep();
  var entry_1 = require_entry();
  var error_1 = require_error2();
  var entry_2 = require_entry2();
  var Provider = class {
    constructor(_settings) {
      this._settings = _settings;
      this.errorFilter = new error_1.default(this._settings);
      this.entryFilter = new entry_1.default(this._settings, this._getMicromatchOptions());
      this.deepFilter = new deep_1.default(this._settings, this._getMicromatchOptions());
      this.entryTransformer = new entry_2.default(this._settings);
    }
    _getRootDirectory(task) {
      return path2.resolve(this._settings.cwd, task.base);
    }
    _getReaderOptions(task) {
      const basePath = task.base === "." ? "" : task.base;
      return {
        basePath,
        pathSegmentSeparator: "/",
        concurrency: this._settings.concurrency,
        deepFilter: this.deepFilter.getFilter(basePath, task.positive, task.negative),
        entryFilter: this.entryFilter.getFilter(task.positive, task.negative),
        errorFilter: this.errorFilter.getFilter(),
        followSymbolicLinks: this._settings.followSymbolicLinks,
        fs: this._settings.fs,
        stats: this._settings.stats,
        throwErrorOnBrokenSymbolicLink: this._settings.throwErrorOnBrokenSymbolicLink,
        transform: this.entryTransformer.getTransformer()
      };
    }
    _getMicromatchOptions() {
      return {
        dot: this._settings.dot,
        matchBase: this._settings.baseNameMatch,
        nobrace: !this._settings.braceExpansion,
        nocase: !this._settings.caseSensitiveMatch,
        noext: !this._settings.extglob,
        noglobstar: !this._settings.globstar,
        posix: true,
        strictSlashes: false
      };
    }
  };
  exports2.default = Provider;
});

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/providers/async.js
var require_async5 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var stream_1 = require_stream4();
  var provider_1 = require_provider();
  var ProviderAsync = class extends provider_1.default {
    constructor() {
      super(...arguments);
      this._reader = new stream_1.default(this._settings);
    }
    read(task) {
      const root = this._getRootDirectory(task);
      const options = this._getReaderOptions(task);
      const entries = [];
      return new Promise((resolve, reject) => {
        const stream = this.api(root, task, options);
        stream.once("error", reject);
        stream.on("data", (entry) => entries.push(options.transform(entry)));
        stream.once("end", () => resolve(entries));
      });
    }
    api(root, task, options) {
      if (task.dynamic) {
        return this._reader.dynamic(root, options);
      }
      return this._reader.static(task.patterns, options);
    }
  };
  exports2.default = ProviderAsync;
});

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/providers/stream.js
var require_stream5 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var stream_1 = require("stream");
  var stream_2 = require_stream4();
  var provider_1 = require_provider();
  var ProviderStream = class extends provider_1.default {
    constructor() {
      super(...arguments);
      this._reader = new stream_2.default(this._settings);
    }
    read(task) {
      const root = this._getRootDirectory(task);
      const options = this._getReaderOptions(task);
      const source = this.api(root, task, options);
      const destination = new stream_1.Readable({objectMode: true, read: () => {
      }});
      source.once("error", (error) => destination.emit("error", error)).on("data", (entry) => destination.emit("data", options.transform(entry))).once("end", () => destination.emit("end"));
      destination.once("close", () => source.destroy());
      return destination;
    }
    api(root, task, options) {
      if (task.dynamic) {
        return this._reader.dynamic(root, options);
      }
      return this._reader.static(task.patterns, options);
    }
  };
  exports2.default = ProviderStream;
});

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/readers/sync.js
var require_sync6 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var fsStat = require_out();
  var fsWalk = require_out3();
  var reader_1 = require_reader2();
  var ReaderSync = class extends reader_1.default {
    constructor() {
      super(...arguments);
      this._walkSync = fsWalk.walkSync;
      this._statSync = fsStat.statSync;
    }
    dynamic(root, options) {
      return this._walkSync(root, options);
    }
    static(patterns, options) {
      const entries = [];
      for (const pattern of patterns) {
        const filepath = this._getFullEntryPath(pattern);
        const entry = this._getEntry(filepath, pattern, options);
        if (entry === null || !options.entryFilter(entry)) {
          continue;
        }
        entries.push(entry);
      }
      return entries;
    }
    _getEntry(filepath, pattern, options) {
      try {
        const stats = this._getStat(filepath);
        return this._makeEntry(stats, pattern);
      } catch (error) {
        if (options.errorFilter(error)) {
          return null;
        }
        throw error;
      }
    }
    _getStat(filepath) {
      return this._statSync(filepath, this._fsStatSettings);
    }
  };
  exports2.default = ReaderSync;
});

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/providers/sync.js
var require_sync7 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var sync_1 = require_sync6();
  var provider_1 = require_provider();
  var ProviderSync = class extends provider_1.default {
    constructor() {
      super(...arguments);
      this._reader = new sync_1.default(this._settings);
    }
    read(task) {
      const root = this._getRootDirectory(task);
      const options = this._getReaderOptions(task);
      const entries = this.api(root, task, options);
      return entries.map(options.transform);
    }
    api(root, task, options) {
      if (task.dynamic) {
        return this._reader.dynamic(root, options);
      }
      return this._reader.static(task.patterns, options);
    }
  };
  exports2.default = ProviderSync;
});

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/settings.js
var require_settings4 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.DEFAULT_FILE_SYSTEM_ADAPTER = void 0;
  var fs = require("fs");
  var os = require("os");
  var CPU_COUNT = Math.max(os.cpus().length, 1);
  exports2.DEFAULT_FILE_SYSTEM_ADAPTER = {
    lstat: fs.lstat,
    lstatSync: fs.lstatSync,
    stat: fs.stat,
    statSync: fs.statSync,
    readdir: fs.readdir,
    readdirSync: fs.readdirSync
  };
  var Settings = class {
    constructor(_options = {}) {
      this._options = _options;
      this.absolute = this._getValue(this._options.absolute, false);
      this.baseNameMatch = this._getValue(this._options.baseNameMatch, false);
      this.braceExpansion = this._getValue(this._options.braceExpansion, true);
      this.caseSensitiveMatch = this._getValue(this._options.caseSensitiveMatch, true);
      this.concurrency = this._getValue(this._options.concurrency, CPU_COUNT);
      this.cwd = this._getValue(this._options.cwd, process.cwd());
      this.deep = this._getValue(this._options.deep, Infinity);
      this.dot = this._getValue(this._options.dot, false);
      this.extglob = this._getValue(this._options.extglob, true);
      this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, true);
      this.fs = this._getFileSystemMethods(this._options.fs);
      this.globstar = this._getValue(this._options.globstar, true);
      this.ignore = this._getValue(this._options.ignore, []);
      this.markDirectories = this._getValue(this._options.markDirectories, false);
      this.objectMode = this._getValue(this._options.objectMode, false);
      this.onlyDirectories = this._getValue(this._options.onlyDirectories, false);
      this.onlyFiles = this._getValue(this._options.onlyFiles, true);
      this.stats = this._getValue(this._options.stats, false);
      this.suppressErrors = this._getValue(this._options.suppressErrors, false);
      this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, false);
      this.unique = this._getValue(this._options.unique, true);
      if (this.onlyDirectories) {
        this.onlyFiles = false;
      }
      if (this.stats) {
        this.objectMode = true;
      }
    }
    _getValue(option, value) {
      return option === void 0 ? value : option;
    }
    _getFileSystemMethods(methods = {}) {
      return Object.assign(Object.assign({}, exports2.DEFAULT_FILE_SYSTEM_ADAPTER), methods);
    }
  };
  exports2.default = Settings;
});

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/index.js
var require_out4 = __commonJS((exports2, module2) => {
  "use strict";
  var taskManager = require_tasks();
  var async_1 = require_async5();
  var stream_1 = require_stream5();
  var sync_1 = require_sync7();
  var settings_1 = require_settings4();
  var utils = require_utils3();
  async function FastGlob(source, options) {
    assertPatternsInput(source);
    const works = getWorks(source, async_1.default, options);
    const result = await Promise.all(works);
    return utils.array.flatten(result);
  }
  (function(FastGlob2) {
    function sync(source, options) {
      assertPatternsInput(source);
      const works = getWorks(source, sync_1.default, options);
      return utils.array.flatten(works);
    }
    FastGlob2.sync = sync;
    function stream(source, options) {
      assertPatternsInput(source);
      const works = getWorks(source, stream_1.default, options);
      return utils.stream.merge(works);
    }
    FastGlob2.stream = stream;
    function generateTasks(source, options) {
      assertPatternsInput(source);
      const patterns = [].concat(source);
      const settings = new settings_1.default(options);
      return taskManager.generate(patterns, settings);
    }
    FastGlob2.generateTasks = generateTasks;
    function isDynamicPattern(source, options) {
      assertPatternsInput(source);
      const settings = new settings_1.default(options);
      return utils.pattern.isDynamicPattern(source, settings);
    }
    FastGlob2.isDynamicPattern = isDynamicPattern;
    function escapePath(source) {
      assertPatternsInput(source);
      return utils.path.escape(source);
    }
    FastGlob2.escapePath = escapePath;
  })(FastGlob || (FastGlob = {}));
  function getWorks(source, _Provider, options) {
    const patterns = [].concat(source);
    const settings = new settings_1.default(options);
    const tasks = taskManager.generate(patterns, settings);
    const provider = new _Provider(settings);
    return tasks.map(provider.read, provider);
  }
  function assertPatternsInput(input) {
    const source = [].concat(input);
    const isValidSource = source.every((item) => utils.string.isString(item) && !utils.string.isEmpty(item));
    if (!isValidSource) {
      throw new TypeError("Patterns must be a string (non empty) or an array of strings");
    }
  }
  module2.exports = FastGlob;
});

// ../../node_modules/.pnpm/path-type@4.0.0/node_modules/path-type/index.js
var require_path_type = __commonJS((exports2) => {
  "use strict";
  var {promisify} = require("util");
  var fs = require("fs");
  async function isType(fsStatType, statsMethodName, filePath) {
    if (typeof filePath !== "string") {
      throw new TypeError(`Expected a string, got ${typeof filePath}`);
    }
    try {
      const stats = await promisify(fs[fsStatType])(filePath);
      return stats[statsMethodName]();
    } catch (error) {
      if (error.code === "ENOENT") {
        return false;
      }
      throw error;
    }
  }
  function isTypeSync(fsStatType, statsMethodName, filePath) {
    if (typeof filePath !== "string") {
      throw new TypeError(`Expected a string, got ${typeof filePath}`);
    }
    try {
      return fs[fsStatType](filePath)[statsMethodName]();
    } catch (error) {
      if (error.code === "ENOENT") {
        return false;
      }
      throw error;
    }
  }
  exports2.isFile = isType.bind(null, "stat", "isFile");
  exports2.isDirectory = isType.bind(null, "stat", "isDirectory");
  exports2.isSymlink = isType.bind(null, "lstat", "isSymbolicLink");
  exports2.isFileSync = isTypeSync.bind(null, "statSync", "isFile");
  exports2.isDirectorySync = isTypeSync.bind(null, "statSync", "isDirectory");
  exports2.isSymlinkSync = isTypeSync.bind(null, "lstatSync", "isSymbolicLink");
});

// ../../node_modules/.pnpm/dir-glob@3.0.1/node_modules/dir-glob/index.js
var require_dir_glob = __commonJS((exports2, module2) => {
  "use strict";
  var path2 = require("path");
  var pathType = require_path_type();
  var getExtensions = (extensions) => extensions.length > 1 ? `{${extensions.join(",")}}` : extensions[0];
  var getPath = (filepath, cwd) => {
    const pth = filepath[0] === "!" ? filepath.slice(1) : filepath;
    return path2.isAbsolute(pth) ? pth : path2.join(cwd, pth);
  };
  var addExtensions = (file, extensions) => {
    if (path2.extname(file)) {
      return `**/${file}`;
    }
    return `**/${file}.${getExtensions(extensions)}`;
  };
  var getGlob = (directory, options) => {
    if (options.files && !Array.isArray(options.files)) {
      throw new TypeError(`Expected \`files\` to be of type \`Array\` but received type \`${typeof options.files}\``);
    }
    if (options.extensions && !Array.isArray(options.extensions)) {
      throw new TypeError(`Expected \`extensions\` to be of type \`Array\` but received type \`${typeof options.extensions}\``);
    }
    if (options.files && options.extensions) {
      return options.files.map((x) => path2.posix.join(directory, addExtensions(x, options.extensions)));
    }
    if (options.files) {
      return options.files.map((x) => path2.posix.join(directory, `**/${x}`));
    }
    if (options.extensions) {
      return [path2.posix.join(directory, `**/*.${getExtensions(options.extensions)}`)];
    }
    return [path2.posix.join(directory, "**")];
  };
  module2.exports = async (input, options) => {
    options = {
      cwd: process.cwd(),
      ...options
    };
    if (typeof options.cwd !== "string") {
      throw new TypeError(`Expected \`cwd\` to be of type \`string\` but received type \`${typeof options.cwd}\``);
    }
    const globs = await Promise.all([].concat(input).map(async (x) => {
      const isDirectory = await pathType.isDirectory(getPath(x, options.cwd));
      return isDirectory ? getGlob(x, options) : x;
    }));
    return [].concat.apply([], globs);
  };
  module2.exports.sync = (input, options) => {
    options = {
      cwd: process.cwd(),
      ...options
    };
    if (typeof options.cwd !== "string") {
      throw new TypeError(`Expected \`cwd\` to be of type \`string\` but received type \`${typeof options.cwd}\``);
    }
    const globs = [].concat(input).map((x) => pathType.isDirectorySync(getPath(x, options.cwd)) ? getGlob(x, options) : x);
    return [].concat.apply([], globs);
  };
});

// ../../node_modules/.pnpm/ignore@5.1.8/node_modules/ignore/index.js
var require_ignore = __commonJS((exports2, module2) => {
  function makeArray(subject) {
    return Array.isArray(subject) ? subject : [subject];
  }
  var EMPTY = "";
  var SPACE = " ";
  var ESCAPE = "\\";
  var REGEX_TEST_BLANK_LINE = /^\s+$/;
  var REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION = /^\\!/;
  var REGEX_REPLACE_LEADING_EXCAPED_HASH = /^\\#/;
  var REGEX_SPLITALL_CRLF = /\r?\n/g;
  var REGEX_TEST_INVALID_PATH = /^\.*\/|^\.+$/;
  var SLASH = "/";
  var KEY_IGNORE = typeof Symbol !== "undefined" ? Symbol.for("node-ignore") : "node-ignore";
  var define = (object, key, value) => Object.defineProperty(object, key, {value});
  var REGEX_REGEXP_RANGE = /([0-z])-([0-z])/g;
  var sanitizeRange = (range) => range.replace(REGEX_REGEXP_RANGE, (match, from, to) => from.charCodeAt(0) <= to.charCodeAt(0) ? match : EMPTY);
  var cleanRangeBackSlash = (slashes) => {
    const {length} = slashes;
    return slashes.slice(0, length - length % 2);
  };
  var REPLACERS = [
    [
      /\\?\s+$/,
      (match) => match.indexOf("\\") === 0 ? SPACE : EMPTY
    ],
    [
      /\\\s/g,
      () => SPACE
    ],
    [
      /[\\$.|*+(){^]/g,
      (match) => `\\${match}`
    ],
    [
      /(?!\\)\?/g,
      () => "[^/]"
    ],
    [
      /^\//,
      () => "^"
    ],
    [
      /\//g,
      () => "\\/"
    ],
    [
      /^\^*\\\*\\\*\\\//,
      () => "^(?:.*\\/)?"
    ],
    [
      /^(?=[^^])/,
      function startingReplacer() {
        return !/\/(?!$)/.test(this) ? "(?:^|\\/)" : "^";
      }
    ],
    [
      /\\\/\\\*\\\*(?=\\\/|$)/g,
      (_, index, str) => index + 6 < str.length ? "(?:\\/[^\\/]+)*" : "\\/.+"
    ],
    [
      /(^|[^\\]+)\\\*(?=.+)/g,
      (_, p1) => `${p1}[^\\/]*`
    ],
    [
      /\\\\\\(?=[$.|*+(){^])/g,
      () => ESCAPE
    ],
    [
      /\\\\/g,
      () => ESCAPE
    ],
    [
      /(\\)?\[([^\]/]*?)(\\*)($|\])/g,
      (match, leadEscape, range, endEscape, close) => leadEscape === ESCAPE ? `\\[${range}${cleanRangeBackSlash(endEscape)}${close}` : close === "]" ? endEscape.length % 2 === 0 ? `[${sanitizeRange(range)}${endEscape}]` : "[]" : "[]"
    ],
    [
      /(?:[^*])$/,
      (match) => /\/$/.test(match) ? `${match}$` : `${match}(?=$|\\/$)`
    ],
    [
      /(\^|\\\/)?\\\*$/,
      (_, p1) => {
        const prefix = p1 ? `${p1}[^/]+` : "[^/]*";
        return `${prefix}(?=$|\\/$)`;
      }
    ]
  ];
  var regexCache = Object.create(null);
  var makeRegex = (pattern, negative, ignorecase) => {
    const r = regexCache[pattern];
    if (r) {
      return r;
    }
    const source = REPLACERS.reduce((prev, current) => prev.replace(current[0], current[1].bind(pattern)), pattern);
    return regexCache[pattern] = ignorecase ? new RegExp(source, "i") : new RegExp(source);
  };
  var isString = (subject) => typeof subject === "string";
  var checkPattern = (pattern) => pattern && isString(pattern) && !REGEX_TEST_BLANK_LINE.test(pattern) && pattern.indexOf("#") !== 0;
  var splitPattern = (pattern) => pattern.split(REGEX_SPLITALL_CRLF);
  var IgnoreRule = class {
    constructor(origin, pattern, negative, regex) {
      this.origin = origin;
      this.pattern = pattern;
      this.negative = negative;
      this.regex = regex;
    }
  };
  var createRule = (pattern, ignorecase) => {
    const origin = pattern;
    let negative = false;
    if (pattern.indexOf("!") === 0) {
      negative = true;
      pattern = pattern.substr(1);
    }
    pattern = pattern.replace(REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION, "!").replace(REGEX_REPLACE_LEADING_EXCAPED_HASH, "#");
    const regex = makeRegex(pattern, negative, ignorecase);
    return new IgnoreRule(origin, pattern, negative, regex);
  };
  var throwError = (message, Ctor) => {
    throw new Ctor(message);
  };
  var checkPath = (path2, originalPath, doThrow) => {
    if (!isString(path2)) {
      return doThrow(`path must be a string, but got \`${originalPath}\``, TypeError);
    }
    if (!path2) {
      return doThrow(`path must not be empty`, TypeError);
    }
    if (checkPath.isNotRelative(path2)) {
      const r = "`path.relative()`d";
      return doThrow(`path should be a ${r} string, but got "${originalPath}"`, RangeError);
    }
    return true;
  };
  var isNotRelative = (path2) => REGEX_TEST_INVALID_PATH.test(path2);
  checkPath.isNotRelative = isNotRelative;
  checkPath.convert = (p) => p;
  var Ignore = class {
    constructor({
      ignorecase = true
    } = {}) {
      this._rules = [];
      this._ignorecase = ignorecase;
      define(this, KEY_IGNORE, true);
      this._initCache();
    }
    _initCache() {
      this._ignoreCache = Object.create(null);
      this._testCache = Object.create(null);
    }
    _addPattern(pattern) {
      if (pattern && pattern[KEY_IGNORE]) {
        this._rules = this._rules.concat(pattern._rules);
        this._added = true;
        return;
      }
      if (checkPattern(pattern)) {
        const rule = createRule(pattern, this._ignorecase);
        this._added = true;
        this._rules.push(rule);
      }
    }
    add(pattern) {
      this._added = false;
      makeArray(isString(pattern) ? splitPattern(pattern) : pattern).forEach(this._addPattern, this);
      if (this._added) {
        this._initCache();
      }
      return this;
    }
    addPattern(pattern) {
      return this.add(pattern);
    }
    _testOne(path2, checkUnignored) {
      let ignored = false;
      let unignored = false;
      this._rules.forEach((rule) => {
        const {negative} = rule;
        if (unignored === negative && ignored !== unignored || negative && !ignored && !unignored && !checkUnignored) {
          return;
        }
        const matched = rule.regex.test(path2);
        if (matched) {
          ignored = !negative;
          unignored = negative;
        }
      });
      return {
        ignored,
        unignored
      };
    }
    _test(originalPath, cache, checkUnignored, slices) {
      const path2 = originalPath && checkPath.convert(originalPath);
      checkPath(path2, originalPath, throwError);
      return this._t(path2, cache, checkUnignored, slices);
    }
    _t(path2, cache, checkUnignored, slices) {
      if (path2 in cache) {
        return cache[path2];
      }
      if (!slices) {
        slices = path2.split(SLASH);
      }
      slices.pop();
      if (!slices.length) {
        return cache[path2] = this._testOne(path2, checkUnignored);
      }
      const parent = this._t(slices.join(SLASH) + SLASH, cache, checkUnignored, slices);
      return cache[path2] = parent.ignored ? parent : this._testOne(path2, checkUnignored);
    }
    ignores(path2) {
      return this._test(path2, this._ignoreCache, false).ignored;
    }
    createFilter() {
      return (path2) => !this.ignores(path2);
    }
    filter(paths) {
      return makeArray(paths).filter(this.createFilter());
    }
    test(path2) {
      return this._test(path2, this._testCache, true);
    }
  };
  var factory = (options) => new Ignore(options);
  var returnFalse = () => false;
  var isPathValid = (path2) => checkPath(path2 && checkPath.convert(path2), path2, returnFalse);
  factory.isPathValid = isPathValid;
  factory.default = factory;
  module2.exports = factory;
  if (typeof process !== "undefined" && (process.env && process.env.IGNORE_TEST_WIN32 || process.platform === "win32")) {
    const makePosix = (str) => /^\\\\\?\\/.test(str) || /["<>|\u0000-\u001F]+/u.test(str) ? str : str.replace(/\\/g, "/");
    checkPath.convert = makePosix;
    const REGIX_IS_WINDOWS_PATH_ABSOLUTE = /^[a-z]:\//i;
    checkPath.isNotRelative = (path2) => REGIX_IS_WINDOWS_PATH_ABSOLUTE.test(path2) || isNotRelative(path2);
  }
});

// ../../node_modules/.pnpm/slash@3.0.0/node_modules/slash/index.js
var require_slash = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = (path2) => {
    const isExtendedLengthPath = /^\\\\\?\\/.test(path2);
    const hasNonAscii = /[^\u0000-\u0080]+/.test(path2);
    if (isExtendedLengthPath || hasNonAscii) {
      return path2;
    }
    return path2.replace(/\\/g, "/");
  };
});

// ../../node_modules/.pnpm/globby@11.0.2/node_modules/globby/gitignore.js
var require_gitignore = __commonJS((exports2, module2) => {
  "use strict";
  var {promisify} = require("util");
  var fs = require("fs");
  var path2 = require("path");
  var fastGlob = require_out4();
  var gitIgnore = require_ignore();
  var slash = require_slash();
  var DEFAULT_IGNORE = [
    "**/node_modules/**",
    "**/flow-typed/**",
    "**/coverage/**",
    "**/.git"
  ];
  var readFileP = promisify(fs.readFile);
  var mapGitIgnorePatternTo = (base) => (ignore) => {
    if (ignore.startsWith("!")) {
      return "!" + path2.posix.join(base, ignore.slice(1));
    }
    return path2.posix.join(base, ignore);
  };
  var parseGitIgnore = (content, options) => {
    const base = slash(path2.relative(options.cwd, path2.dirname(options.fileName)));
    return content.split(/\r?\n/).filter(Boolean).filter((line) => !line.startsWith("#")).map(mapGitIgnorePatternTo(base));
  };
  var reduceIgnore = (files) => {
    const ignores = gitIgnore();
    for (const file of files) {
      ignores.add(parseGitIgnore(file.content, {
        cwd: file.cwd,
        fileName: file.filePath
      }));
    }
    return ignores;
  };
  var ensureAbsolutePathForCwd = (cwd, p) => {
    cwd = slash(cwd);
    if (path2.isAbsolute(p)) {
      if (p.startsWith(cwd)) {
        return p;
      }
      throw new Error(`Path ${p} is not in cwd ${cwd}`);
    }
    return path2.join(cwd, p);
  };
  var getIsIgnoredPredecate = (ignores, cwd) => {
    return (p) => ignores.ignores(slash(path2.relative(cwd, ensureAbsolutePathForCwd(cwd, p.path || p))));
  };
  var getFile = async (file, cwd) => {
    const filePath = path2.join(cwd, file);
    const content = await readFileP(filePath, "utf8");
    return {
      cwd,
      filePath,
      content
    };
  };
  var getFileSync = (file, cwd) => {
    const filePath = path2.join(cwd, file);
    const content = fs.readFileSync(filePath, "utf8");
    return {
      cwd,
      filePath,
      content
    };
  };
  var normalizeOptions = ({
    ignore = [],
    cwd = slash(process.cwd())
  } = {}) => {
    return {ignore, cwd};
  };
  module2.exports = async (options) => {
    options = normalizeOptions(options);
    const paths = await fastGlob("**/.gitignore", {
      ignore: DEFAULT_IGNORE.concat(options.ignore),
      cwd: options.cwd
    });
    const files = await Promise.all(paths.map((file) => getFile(file, options.cwd)));
    const ignores = reduceIgnore(files);
    return getIsIgnoredPredecate(ignores, options.cwd);
  };
  module2.exports.sync = (options) => {
    options = normalizeOptions(options);
    const paths = fastGlob.sync("**/.gitignore", {
      ignore: DEFAULT_IGNORE.concat(options.ignore),
      cwd: options.cwd
    });
    const files = paths.map((file) => getFileSync(file, options.cwd));
    const ignores = reduceIgnore(files);
    return getIsIgnoredPredecate(ignores, options.cwd);
  };
});

// ../../node_modules/.pnpm/globby@11.0.2/node_modules/globby/stream-utils.js
var require_stream_utils = __commonJS((exports2, module2) => {
  "use strict";
  var {Transform} = require("stream");
  var ObjectTransform = class extends Transform {
    constructor() {
      super({
        objectMode: true
      });
    }
  };
  var FilterStream = class extends ObjectTransform {
    constructor(filter) {
      super();
      this._filter = filter;
    }
    _transform(data, encoding, callback) {
      if (this._filter(data)) {
        this.push(data);
      }
      callback();
    }
  };
  var UniqueStream = class extends ObjectTransform {
    constructor() {
      super();
      this._pushed = new Set();
    }
    _transform(data, encoding, callback) {
      if (!this._pushed.has(data)) {
        this.push(data);
        this._pushed.add(data);
      }
      callback();
    }
  };
  module2.exports = {
    FilterStream,
    UniqueStream
  };
});

// ../../node_modules/.pnpm/globby@11.0.2/node_modules/globby/index.js
var require_globby = __commonJS((exports2, module2) => {
  "use strict";
  var fs = require("fs");
  var arrayUnion = require_array_union();
  var merge2 = require_merge2();
  var fastGlob = require_out4();
  var dirGlob = require_dir_glob();
  var gitignore = require_gitignore();
  var {FilterStream, UniqueStream} = require_stream_utils();
  var DEFAULT_FILTER = () => false;
  var isNegative = (pattern) => pattern[0] === "!";
  var assertPatternsInput = (patterns) => {
    if (!patterns.every((pattern) => typeof pattern === "string")) {
      throw new TypeError("Patterns must be a string or an array of strings");
    }
  };
  var checkCwdOption = (options = {}) => {
    if (!options.cwd) {
      return;
    }
    let stat;
    try {
      stat = fs.statSync(options.cwd);
    } catch (e) {
      return;
    }
    if (!stat.isDirectory()) {
      throw new Error("The `cwd` option must be a path to a directory");
    }
  };
  var getPathString = (p) => p.stats instanceof fs.Stats ? p.path : p;
  var generateGlobTasks = (patterns, taskOptions) => {
    patterns = arrayUnion([].concat(patterns));
    assertPatternsInput(patterns);
    checkCwdOption(taskOptions);
    const globTasks = [];
    taskOptions = {
      ignore: [],
      expandDirectories: true,
      ...taskOptions
    };
    for (const [index, pattern] of patterns.entries()) {
      if (isNegative(pattern)) {
        continue;
      }
      const ignore = patterns.slice(index).filter((pattern2) => isNegative(pattern2)).map((pattern2) => pattern2.slice(1));
      const options = {
        ...taskOptions,
        ignore: taskOptions.ignore.concat(ignore)
      };
      globTasks.push({pattern, options});
    }
    return globTasks;
  };
  var globDirs = (task, fn) => {
    let options = {};
    if (task.options.cwd) {
      options.cwd = task.options.cwd;
    }
    if (Array.isArray(task.options.expandDirectories)) {
      options = {
        ...options,
        files: task.options.expandDirectories
      };
    } else if (typeof task.options.expandDirectories === "object") {
      options = {
        ...options,
        ...task.options.expandDirectories
      };
    }
    return fn(task.pattern, options);
  };
  var getPattern = (task, fn) => task.options.expandDirectories ? globDirs(task, fn) : [task.pattern];
  var getFilterSync = (options) => {
    return options && options.gitignore ? gitignore.sync({cwd: options.cwd, ignore: options.ignore}) : DEFAULT_FILTER;
  };
  var globToTask = (task) => (glob) => {
    const {options} = task;
    if (options.ignore && Array.isArray(options.ignore) && options.expandDirectories) {
      options.ignore = dirGlob.sync(options.ignore);
    }
    return {
      pattern: glob,
      options
    };
  };
  module2.exports = async (patterns, options) => {
    const globTasks = generateGlobTasks(patterns, options);
    const getFilter = async () => {
      return options && options.gitignore ? gitignore({cwd: options.cwd, ignore: options.ignore}) : DEFAULT_FILTER;
    };
    const getTasks = async () => {
      const tasks2 = await Promise.all(globTasks.map(async (task) => {
        const globs = await getPattern(task, dirGlob);
        return Promise.all(globs.map(globToTask(task)));
      }));
      return arrayUnion(...tasks2);
    };
    const [filter, tasks] = await Promise.all([getFilter(), getTasks()]);
    const paths = await Promise.all(tasks.map((task) => fastGlob(task.pattern, task.options)));
    return arrayUnion(...paths).filter((path_) => !filter(getPathString(path_)));
  };
  module2.exports.sync = (patterns, options) => {
    const globTasks = generateGlobTasks(patterns, options);
    const tasks = [];
    for (const task of globTasks) {
      const newTask = getPattern(task, dirGlob.sync).map(globToTask(task));
      tasks.push(...newTask);
    }
    const filter = getFilterSync(options);
    let matches = [];
    for (const task of tasks) {
      matches = arrayUnion(matches, fastGlob.sync(task.pattern, task.options));
    }
    return matches.filter((path_) => !filter(path_));
  };
  module2.exports.stream = (patterns, options) => {
    const globTasks = generateGlobTasks(patterns, options);
    const tasks = [];
    for (const task of globTasks) {
      const newTask = getPattern(task, dirGlob.sync).map(globToTask(task));
      tasks.push(...newTask);
    }
    const filter = getFilterSync(options);
    const filterStream = new FilterStream((p) => !filter(p));
    const uniqueStream = new UniqueStream();
    return merge2(tasks.map((task) => fastGlob.stream(task.pattern, task.options))).pipe(filterStream).pipe(uniqueStream);
  };
  module2.exports.generateGlobTasks = generateGlobTasks;
  module2.exports.hasMagic = (patterns, options) => [].concat(patterns).some((pattern) => fastGlob.isDynamicPattern(pattern, options));
  module2.exports.gitignore = gitignore;
});

// ../../node_modules/.pnpm/graceful-fs@4.2.6/node_modules/graceful-fs/polyfills.js
var require_polyfills = __commonJS((exports2, module2) => {
  var constants = require("constants");
  var origCwd = process.cwd;
  var cwd = null;
  var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function() {
    if (!cwd)
      cwd = origCwd.call(process);
    return cwd;
  };
  try {
    process.cwd();
  } catch (er) {
  }
  if (typeof process.chdir === "function") {
    chdir = process.chdir;
    process.chdir = function(d) {
      cwd = null;
      chdir.call(process, d);
    };
    if (Object.setPrototypeOf)
      Object.setPrototypeOf(process.chdir, chdir);
  }
  var chdir;
  module2.exports = patch;
  function patch(fs) {
    if (constants.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
      patchLchmod(fs);
    }
    if (!fs.lutimes) {
      patchLutimes(fs);
    }
    fs.chown = chownFix(fs.chown);
    fs.fchown = chownFix(fs.fchown);
    fs.lchown = chownFix(fs.lchown);
    fs.chmod = chmodFix(fs.chmod);
    fs.fchmod = chmodFix(fs.fchmod);
    fs.lchmod = chmodFix(fs.lchmod);
    fs.chownSync = chownFixSync(fs.chownSync);
    fs.fchownSync = chownFixSync(fs.fchownSync);
    fs.lchownSync = chownFixSync(fs.lchownSync);
    fs.chmodSync = chmodFixSync(fs.chmodSync);
    fs.fchmodSync = chmodFixSync(fs.fchmodSync);
    fs.lchmodSync = chmodFixSync(fs.lchmodSync);
    fs.stat = statFix(fs.stat);
    fs.fstat = statFix(fs.fstat);
    fs.lstat = statFix(fs.lstat);
    fs.statSync = statFixSync(fs.statSync);
    fs.fstatSync = statFixSync(fs.fstatSync);
    fs.lstatSync = statFixSync(fs.lstatSync);
    if (!fs.lchmod) {
      fs.lchmod = function(path2, mode, cb) {
        if (cb)
          process.nextTick(cb);
      };
      fs.lchmodSync = function() {
      };
    }
    if (!fs.lchown) {
      fs.lchown = function(path2, uid, gid, cb) {
        if (cb)
          process.nextTick(cb);
      };
      fs.lchownSync = function() {
      };
    }
    if (platform === "win32") {
      fs.rename = function(fs$rename) {
        return function(from, to, cb) {
          var start = Date.now();
          var backoff = 0;
          fs$rename(from, to, function CB(er) {
            if (er && (er.code === "EACCES" || er.code === "EPERM") && Date.now() - start < 6e4) {
              setTimeout(function() {
                fs.stat(to, function(stater, st) {
                  if (stater && stater.code === "ENOENT")
                    fs$rename(from, to, CB);
                  else
                    cb(er);
                });
              }, backoff);
              if (backoff < 100)
                backoff += 10;
              return;
            }
            if (cb)
              cb(er);
          });
        };
      }(fs.rename);
    }
    fs.read = function(fs$read) {
      function read(fd, buffer, offset, length, position, callback_) {
        var callback;
        if (callback_ && typeof callback_ === "function") {
          var eagCounter = 0;
          callback = function(er, _, __) {
            if (er && er.code === "EAGAIN" && eagCounter < 10) {
              eagCounter++;
              return fs$read.call(fs, fd, buffer, offset, length, position, callback);
            }
            callback_.apply(this, arguments);
          };
        }
        return fs$read.call(fs, fd, buffer, offset, length, position, callback);
      }
      if (Object.setPrototypeOf)
        Object.setPrototypeOf(read, fs$read);
      return read;
    }(fs.read);
    fs.readSync = function(fs$readSync) {
      return function(fd, buffer, offset, length, position) {
        var eagCounter = 0;
        while (true) {
          try {
            return fs$readSync.call(fs, fd, buffer, offset, length, position);
          } catch (er) {
            if (er.code === "EAGAIN" && eagCounter < 10) {
              eagCounter++;
              continue;
            }
            throw er;
          }
        }
      };
    }(fs.readSync);
    function patchLchmod(fs2) {
      fs2.lchmod = function(path2, mode, callback) {
        fs2.open(path2, constants.O_WRONLY | constants.O_SYMLINK, mode, function(err, fd) {
          if (err) {
            if (callback)
              callback(err);
            return;
          }
          fs2.fchmod(fd, mode, function(err2) {
            fs2.close(fd, function(err22) {
              if (callback)
                callback(err2 || err22);
            });
          });
        });
      };
      fs2.lchmodSync = function(path2, mode) {
        var fd = fs2.openSync(path2, constants.O_WRONLY | constants.O_SYMLINK, mode);
        var threw = true;
        var ret;
        try {
          ret = fs2.fchmodSync(fd, mode);
          threw = false;
        } finally {
          if (threw) {
            try {
              fs2.closeSync(fd);
            } catch (er) {
            }
          } else {
            fs2.closeSync(fd);
          }
        }
        return ret;
      };
    }
    function patchLutimes(fs2) {
      if (constants.hasOwnProperty("O_SYMLINK")) {
        fs2.lutimes = function(path2, at, mt, cb) {
          fs2.open(path2, constants.O_SYMLINK, function(er, fd) {
            if (er) {
              if (cb)
                cb(er);
              return;
            }
            fs2.futimes(fd, at, mt, function(er2) {
              fs2.close(fd, function(er22) {
                if (cb)
                  cb(er2 || er22);
              });
            });
          });
        };
        fs2.lutimesSync = function(path2, at, mt) {
          var fd = fs2.openSync(path2, constants.O_SYMLINK);
          var ret;
          var threw = true;
          try {
            ret = fs2.futimesSync(fd, at, mt);
            threw = false;
          } finally {
            if (threw) {
              try {
                fs2.closeSync(fd);
              } catch (er) {
              }
            } else {
              fs2.closeSync(fd);
            }
          }
          return ret;
        };
      } else {
        fs2.lutimes = function(_a, _b, _c, cb) {
          if (cb)
            process.nextTick(cb);
        };
        fs2.lutimesSync = function() {
        };
      }
    }
    function chmodFix(orig) {
      if (!orig)
        return orig;
      return function(target, mode, cb) {
        return orig.call(fs, target, mode, function(er) {
          if (chownErOk(er))
            er = null;
          if (cb)
            cb.apply(this, arguments);
        });
      };
    }
    function chmodFixSync(orig) {
      if (!orig)
        return orig;
      return function(target, mode) {
        try {
          return orig.call(fs, target, mode);
        } catch (er) {
          if (!chownErOk(er))
            throw er;
        }
      };
    }
    function chownFix(orig) {
      if (!orig)
        return orig;
      return function(target, uid, gid, cb) {
        return orig.call(fs, target, uid, gid, function(er) {
          if (chownErOk(er))
            er = null;
          if (cb)
            cb.apply(this, arguments);
        });
      };
    }
    function chownFixSync(orig) {
      if (!orig)
        return orig;
      return function(target, uid, gid) {
        try {
          return orig.call(fs, target, uid, gid);
        } catch (er) {
          if (!chownErOk(er))
            throw er;
        }
      };
    }
    function statFix(orig) {
      if (!orig)
        return orig;
      return function(target, options, cb) {
        if (typeof options === "function") {
          cb = options;
          options = null;
        }
        function callback(er, stats) {
          if (stats) {
            if (stats.uid < 0)
              stats.uid += 4294967296;
            if (stats.gid < 0)
              stats.gid += 4294967296;
          }
          if (cb)
            cb.apply(this, arguments);
        }
        return options ? orig.call(fs, target, options, callback) : orig.call(fs, target, callback);
      };
    }
    function statFixSync(orig) {
      if (!orig)
        return orig;
      return function(target, options) {
        var stats = options ? orig.call(fs, target, options) : orig.call(fs, target);
        if (stats.uid < 0)
          stats.uid += 4294967296;
        if (stats.gid < 0)
          stats.gid += 4294967296;
        return stats;
      };
    }
    function chownErOk(er) {
      if (!er)
        return true;
      if (er.code === "ENOSYS")
        return true;
      var nonroot = !process.getuid || process.getuid() !== 0;
      if (nonroot) {
        if (er.code === "EINVAL" || er.code === "EPERM")
          return true;
      }
      return false;
    }
  }
});

// ../../node_modules/.pnpm/graceful-fs@4.2.6/node_modules/graceful-fs/legacy-streams.js
var require_legacy_streams = __commonJS((exports2, module2) => {
  var Stream = require("stream").Stream;
  module2.exports = legacy;
  function legacy(fs) {
    return {
      ReadStream,
      WriteStream
    };
    function ReadStream(path2, options) {
      if (!(this instanceof ReadStream))
        return new ReadStream(path2, options);
      Stream.call(this);
      var self = this;
      this.path = path2;
      this.fd = null;
      this.readable = true;
      this.paused = false;
      this.flags = "r";
      this.mode = 438;
      this.bufferSize = 64 * 1024;
      options = options || {};
      var keys = Object.keys(options);
      for (var index = 0, length = keys.length; index < length; index++) {
        var key = keys[index];
        this[key] = options[key];
      }
      if (this.encoding)
        this.setEncoding(this.encoding);
      if (this.start !== void 0) {
        if (typeof this.start !== "number") {
          throw TypeError("start must be a Number");
        }
        if (this.end === void 0) {
          this.end = Infinity;
        } else if (typeof this.end !== "number") {
          throw TypeError("end must be a Number");
        }
        if (this.start > this.end) {
          throw new Error("start must be <= end");
        }
        this.pos = this.start;
      }
      if (this.fd !== null) {
        process.nextTick(function() {
          self._read();
        });
        return;
      }
      fs.open(this.path, this.flags, this.mode, function(err, fd) {
        if (err) {
          self.emit("error", err);
          self.readable = false;
          return;
        }
        self.fd = fd;
        self.emit("open", fd);
        self._read();
      });
    }
    function WriteStream(path2, options) {
      if (!(this instanceof WriteStream))
        return new WriteStream(path2, options);
      Stream.call(this);
      this.path = path2;
      this.fd = null;
      this.writable = true;
      this.flags = "w";
      this.encoding = "binary";
      this.mode = 438;
      this.bytesWritten = 0;
      options = options || {};
      var keys = Object.keys(options);
      for (var index = 0, length = keys.length; index < length; index++) {
        var key = keys[index];
        this[key] = options[key];
      }
      if (this.start !== void 0) {
        if (typeof this.start !== "number") {
          throw TypeError("start must be a Number");
        }
        if (this.start < 0) {
          throw new Error("start must be >= zero");
        }
        this.pos = this.start;
      }
      this.busy = false;
      this._queue = [];
      if (this.fd === null) {
        this._open = fs.open;
        this._queue.push([this._open, this.path, this.flags, this.mode, void 0]);
        this.flush();
      }
    }
  }
});

// ../../node_modules/.pnpm/graceful-fs@4.2.6/node_modules/graceful-fs/clone.js
var require_clone = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = clone;
  var getPrototypeOf = Object.getPrototypeOf || function(obj) {
    return obj.__proto__;
  };
  function clone(obj) {
    if (obj === null || typeof obj !== "object")
      return obj;
    if (obj instanceof Object)
      var copy = {__proto__: getPrototypeOf(obj)};
    else
      var copy = Object.create(null);
    Object.getOwnPropertyNames(obj).forEach(function(key) {
      Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
    });
    return copy;
  }
});

// ../../node_modules/.pnpm/graceful-fs@4.2.6/node_modules/graceful-fs/graceful-fs.js
var require_graceful_fs = __commonJS((exports2, module2) => {
  var fs = require("fs");
  var polyfills = require_polyfills();
  var legacy = require_legacy_streams();
  var clone = require_clone();
  var util = require("util");
  var gracefulQueue;
  var previousSymbol;
  if (typeof Symbol === "function" && typeof Symbol.for === "function") {
    gracefulQueue = Symbol.for("graceful-fs.queue");
    previousSymbol = Symbol.for("graceful-fs.previous");
  } else {
    gracefulQueue = "___graceful-fs.queue";
    previousSymbol = "___graceful-fs.previous";
  }
  function noop() {
  }
  function publishQueue(context, queue2) {
    Object.defineProperty(context, gracefulQueue, {
      get: function() {
        return queue2;
      }
    });
  }
  var debug3 = noop;
  if (util.debuglog)
    debug3 = util.debuglog("gfs4");
  else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ""))
    debug3 = function() {
      var m = util.format.apply(util, arguments);
      m = "GFS4: " + m.split(/\n/).join("\nGFS4: ");
      console.error(m);
    };
  if (!fs[gracefulQueue]) {
    queue = global[gracefulQueue] || [];
    publishQueue(fs, queue);
    fs.close = function(fs$close) {
      function close(fd, cb) {
        return fs$close.call(fs, fd, function(err) {
          if (!err) {
            retry();
          }
          if (typeof cb === "function")
            cb.apply(this, arguments);
        });
      }
      Object.defineProperty(close, previousSymbol, {
        value: fs$close
      });
      return close;
    }(fs.close);
    fs.closeSync = function(fs$closeSync) {
      function closeSync(fd) {
        fs$closeSync.apply(fs, arguments);
        retry();
      }
      Object.defineProperty(closeSync, previousSymbol, {
        value: fs$closeSync
      });
      return closeSync;
    }(fs.closeSync);
    if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) {
      process.on("exit", function() {
        debug3(fs[gracefulQueue]);
        require("assert").equal(fs[gracefulQueue].length, 0);
      });
    }
  }
  var queue;
  if (!global[gracefulQueue]) {
    publishQueue(global, fs[gracefulQueue]);
  }
  module2.exports = patch(clone(fs));
  if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs.__patched) {
    module2.exports = patch(fs);
    fs.__patched = true;
  }
  function patch(fs2) {
    polyfills(fs2);
    fs2.gracefulify = patch;
    fs2.createReadStream = createReadStream;
    fs2.createWriteStream = createWriteStream;
    var fs$readFile = fs2.readFile;
    fs2.readFile = readFile2;
    function readFile2(path2, options, cb) {
      if (typeof options === "function")
        cb = options, options = null;
      return go$readFile(path2, options, cb);
      function go$readFile(path3, options2, cb2) {
        return fs$readFile(path3, options2, function(err) {
          if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
            enqueue([go$readFile, [path3, options2, cb2]]);
          else {
            if (typeof cb2 === "function")
              cb2.apply(this, arguments);
            retry();
          }
        });
      }
    }
    var fs$writeFile = fs2.writeFile;
    fs2.writeFile = writeFile2;
    function writeFile2(path2, data, options, cb) {
      if (typeof options === "function")
        cb = options, options = null;
      return go$writeFile(path2, data, options, cb);
      function go$writeFile(path3, data2, options2, cb2) {
        return fs$writeFile(path3, data2, options2, function(err) {
          if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
            enqueue([go$writeFile, [path3, data2, options2, cb2]]);
          else {
            if (typeof cb2 === "function")
              cb2.apply(this, arguments);
            retry();
          }
        });
      }
    }
    var fs$appendFile = fs2.appendFile;
    if (fs$appendFile)
      fs2.appendFile = appendFile;
    function appendFile(path2, data, options, cb) {
      if (typeof options === "function")
        cb = options, options = null;
      return go$appendFile(path2, data, options, cb);
      function go$appendFile(path3, data2, options2, cb2) {
        return fs$appendFile(path3, data2, options2, function(err) {
          if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
            enqueue([go$appendFile, [path3, data2, options2, cb2]]);
          else {
            if (typeof cb2 === "function")
              cb2.apply(this, arguments);
            retry();
          }
        });
      }
    }
    var fs$copyFile = fs2.copyFile;
    if (fs$copyFile)
      fs2.copyFile = copyFile2;
    function copyFile2(src, dest, flags, cb) {
      if (typeof flags === "function") {
        cb = flags;
        flags = 0;
      }
      return fs$copyFile(src, dest, flags, function(err) {
        if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
          enqueue([fs$copyFile, [src, dest, flags, cb]]);
        else {
          if (typeof cb === "function")
            cb.apply(this, arguments);
          retry();
        }
      });
    }
    var fs$readdir = fs2.readdir;
    fs2.readdir = readdir;
    function readdir(path2, options, cb) {
      var args = [path2];
      if (typeof options !== "function") {
        args.push(options);
      } else {
        cb = options;
      }
      args.push(go$readdir$cb);
      return go$readdir(args);
      function go$readdir$cb(err, files) {
        if (files && files.sort)
          files.sort();
        if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
          enqueue([go$readdir, [args]]);
        else {
          if (typeof cb === "function")
            cb.apply(this, arguments);
          retry();
        }
      }
    }
    function go$readdir(args) {
      return fs$readdir.apply(fs2, args);
    }
    if (process.version.substr(0, 4) === "v0.8") {
      var legStreams = legacy(fs2);
      ReadStream = legStreams.ReadStream;
      WriteStream = legStreams.WriteStream;
    }
    var fs$ReadStream = fs2.ReadStream;
    if (fs$ReadStream) {
      ReadStream.prototype = Object.create(fs$ReadStream.prototype);
      ReadStream.prototype.open = ReadStream$open;
    }
    var fs$WriteStream = fs2.WriteStream;
    if (fs$WriteStream) {
      WriteStream.prototype = Object.create(fs$WriteStream.prototype);
      WriteStream.prototype.open = WriteStream$open;
    }
    Object.defineProperty(fs2, "ReadStream", {
      get: function() {
        return ReadStream;
      },
      set: function(val) {
        ReadStream = val;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(fs2, "WriteStream", {
      get: function() {
        return WriteStream;
      },
      set: function(val) {
        WriteStream = val;
      },
      enumerable: true,
      configurable: true
    });
    var FileReadStream = ReadStream;
    Object.defineProperty(fs2, "FileReadStream", {
      get: function() {
        return FileReadStream;
      },
      set: function(val) {
        FileReadStream = val;
      },
      enumerable: true,
      configurable: true
    });
    var FileWriteStream = WriteStream;
    Object.defineProperty(fs2, "FileWriteStream", {
      get: function() {
        return FileWriteStream;
      },
      set: function(val) {
        FileWriteStream = val;
      },
      enumerable: true,
      configurable: true
    });
    function ReadStream(path2, options) {
      if (this instanceof ReadStream)
        return fs$ReadStream.apply(this, arguments), this;
      else
        return ReadStream.apply(Object.create(ReadStream.prototype), arguments);
    }
    function ReadStream$open() {
      var that = this;
      open(that.path, that.flags, that.mode, function(err, fd) {
        if (err) {
          if (that.autoClose)
            that.destroy();
          that.emit("error", err);
        } else {
          that.fd = fd;
          that.emit("open", fd);
          that.read();
        }
      });
    }
    function WriteStream(path2, options) {
      if (this instanceof WriteStream)
        return fs$WriteStream.apply(this, arguments), this;
      else
        return WriteStream.apply(Object.create(WriteStream.prototype), arguments);
    }
    function WriteStream$open() {
      var that = this;
      open(that.path, that.flags, that.mode, function(err, fd) {
        if (err) {
          that.destroy();
          that.emit("error", err);
        } else {
          that.fd = fd;
          that.emit("open", fd);
        }
      });
    }
    function createReadStream(path2, options) {
      return new fs2.ReadStream(path2, options);
    }
    function createWriteStream(path2, options) {
      return new fs2.WriteStream(path2, options);
    }
    var fs$open = fs2.open;
    fs2.open = open;
    function open(path2, flags, mode, cb) {
      if (typeof mode === "function")
        cb = mode, mode = null;
      return go$open(path2, flags, mode, cb);
      function go$open(path3, flags2, mode2, cb2) {
        return fs$open(path3, flags2, mode2, function(err, fd) {
          if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
            enqueue([go$open, [path3, flags2, mode2, cb2]]);
          else {
            if (typeof cb2 === "function")
              cb2.apply(this, arguments);
            retry();
          }
        });
      }
    }
    return fs2;
  }
  function enqueue(elem) {
    debug3("ENQUEUE", elem[0].name, elem[1]);
    fs[gracefulQueue].push(elem);
  }
  function retry() {
    var elem = fs[gracefulQueue].shift();
    if (elem) {
      debug3("RETRY", elem[0].name, elem[1]);
      elem[0].apply(null, elem[1]);
    }
  }
});

// ../../node_modules/.pnpm/is-path-cwd@2.2.0/node_modules/is-path-cwd/index.js
var require_is_path_cwd = __commonJS((exports2, module2) => {
  "use strict";
  var path2 = require("path");
  module2.exports = (path_) => {
    let cwd = process.cwd();
    path_ = path2.resolve(path_);
    if (process.platform === "win32") {
      cwd = cwd.toLowerCase();
      path_ = path_.toLowerCase();
    }
    return path_ === cwd;
  };
});

// ../../node_modules/.pnpm/is-path-inside@3.0.3/node_modules/is-path-inside/index.js
var require_is_path_inside = __commonJS((exports2, module2) => {
  "use strict";
  var path2 = require("path");
  module2.exports = (childPath, parentPath) => {
    const relation = path2.relative(parentPath, childPath);
    return Boolean(relation && relation !== ".." && !relation.startsWith(`..${path2.sep}`) && relation !== path2.resolve(childPath));
  };
});

// ../../node_modules/.pnpm/del@6.0.0/node_modules/del/index.js
var require_del = __commonJS((exports2, module2) => {
  "use strict";
  var {promisify} = require("util");
  var path2 = require("path");
  var globby = require_globby();
  var isGlob = require_is_glob();
  var slash = require_slash();
  var gracefulFs = require_graceful_fs();
  var isPathCwd = require_is_path_cwd();
  var isPathInside = require_is_path_inside();
  var rimraf = require_rimraf();
  var pMap = require_p_map();
  var rimrafP = promisify(rimraf);
  var rimrafOptions = {
    glob: false,
    unlink: gracefulFs.unlink,
    unlinkSync: gracefulFs.unlinkSync,
    chmod: gracefulFs.chmod,
    chmodSync: gracefulFs.chmodSync,
    stat: gracefulFs.stat,
    statSync: gracefulFs.statSync,
    lstat: gracefulFs.lstat,
    lstatSync: gracefulFs.lstatSync,
    rmdir: gracefulFs.rmdir,
    rmdirSync: gracefulFs.rmdirSync,
    readdir: gracefulFs.readdir,
    readdirSync: gracefulFs.readdirSync
  };
  function safeCheck(file, cwd) {
    if (isPathCwd(file)) {
      throw new Error("Cannot delete the current working directory. Can be overridden with the `force` option.");
    }
    if (!isPathInside(file, cwd)) {
      throw new Error("Cannot delete files/directories outside the current working directory. Can be overridden with the `force` option.");
    }
  }
  function normalizePatterns(patterns) {
    patterns = Array.isArray(patterns) ? patterns : [patterns];
    patterns = patterns.map((pattern) => {
      if (process.platform === "win32" && isGlob(pattern) === false) {
        return slash(pattern);
      }
      return pattern;
    });
    return patterns;
  }
  module2.exports = async (patterns, {force, dryRun, cwd = process.cwd(), ...options} = {}) => {
    options = {
      expandDirectories: false,
      onlyFiles: false,
      followSymbolicLinks: false,
      cwd,
      ...options
    };
    patterns = normalizePatterns(patterns);
    const files = (await globby(patterns, options)).sort((a, b) => b.localeCompare(a));
    const mapper = async (file) => {
      file = path2.resolve(cwd, file);
      if (!force) {
        safeCheck(file, cwd);
      }
      if (!dryRun) {
        await rimrafP(file, rimrafOptions);
      }
      return file;
    };
    const removedFiles = await pMap(files, mapper, options);
    removedFiles.sort((a, b) => a.localeCompare(b));
    return removedFiles;
  };
  module2.exports.sync = (patterns, {force, dryRun, cwd = process.cwd(), ...options} = {}) => {
    options = {
      expandDirectories: false,
      onlyFiles: false,
      followSymbolicLinks: false,
      cwd,
      ...options
    };
    patterns = normalizePatterns(patterns);
    const files = globby.sync(patterns, options).sort((a, b) => b.localeCompare(a));
    const removedFiles = files.map((file) => {
      file = path2.resolve(cwd, file);
      if (!force) {
        safeCheck(file, cwd);
      }
      if (!dryRun) {
        rimraf.sync(file, rimrafOptions);
      }
      return file;
    });
    removedFiles.sort((a, b) => a.localeCompare(b));
    return removedFiles;
  };
});

// ../../node_modules/.pnpm/tempy@1.0.0/node_modules/tempy/index.js
var require_tempy = __commonJS((exports2, module2) => {
  "use strict";
  var fs = require("fs");
  var path2 = require("path");
  var uniqueString = require_unique_string();
  var tempDir = require_temp_dir();
  var isStream = require_is_stream();
  var del = require_del();
  var stream = require("stream");
  var {promisify} = require("util");
  var pipeline = promisify(stream.pipeline);
  var {writeFile: writeFile2} = fs.promises;
  var getPath = (prefix = "") => path2.join(tempDir, prefix + uniqueString());
  var writeStream = async (filePath, data) => pipeline(data, fs.createWriteStream(filePath));
  var createTask = (tempyFunction, {extraArguments = 0} = {}) => async (...arguments_) => {
    const [callback, options] = arguments_.slice(extraArguments);
    const result = await tempyFunction(...arguments_.slice(0, extraArguments), options);
    const returnValue = await callback(result);
    await del(result, {force: true});
    return returnValue;
  };
  module2.exports.file = (options) => {
    options = {
      ...options
    };
    if (options.name) {
      if (options.extension !== void 0 && options.extension !== null) {
        throw new Error("The `name` and `extension` options are mutually exclusive");
      }
      return path2.join(module2.exports.directory(), options.name);
    }
    return getPath() + (options.extension === void 0 || options.extension === null ? "" : "." + options.extension.replace(/^\./, ""));
  };
  module2.exports.file.task = createTask(module2.exports.file);
  module2.exports.directory = ({prefix = ""} = {}) => {
    const directory = getPath(prefix);
    fs.mkdirSync(directory);
    return directory;
  };
  module2.exports.directory.task = createTask(module2.exports.directory);
  module2.exports.write = async (data, options) => {
    const filename = module2.exports.file(options);
    const write = isStream(data) ? writeStream : writeFile2;
    await write(filename, data);
    return filename;
  };
  module2.exports.write.task = createTask(module2.exports.write, {extraArguments: 1});
  module2.exports.writeSync = (data, options) => {
    const filename = module2.exports.file(options);
    fs.writeFileSync(filename, data);
    return filename;
  };
  Object.defineProperty(module2.exports, "root", {
    get() {
      return tempDir;
    }
  });
});

// ../../node_modules/.pnpm/hasha@5.2.2/node_modules/hasha/index.js
var require_hasha = __commonJS((exports2, module2) => {
  "use strict";
  var fs = require("fs");
  var path2 = require("path");
  var crypto = require("crypto");
  var isStream = require_is_stream();
  var {Worker} = (() => {
    try {
      return require("worker_threads");
    } catch (_) {
      return {};
    }
  })();
  var worker;
  var taskIdCounter = 0;
  var tasks = new Map();
  var recreateWorkerError = (sourceError) => {
    const error = new Error(sourceError.message);
    for (const [key, value] of Object.entries(sourceError)) {
      if (key !== "message") {
        error[key] = value;
      }
    }
    return error;
  };
  var createWorker = () => {
    worker = new Worker(path2.join(__dirname, "thread.js"));
    worker.on("message", (message) => {
      const task = tasks.get(message.id);
      tasks.delete(message.id);
      if (tasks.size === 0) {
        worker.unref();
      }
      if (message.error === void 0) {
        task.resolve(message.value);
      } else {
        task.reject(recreateWorkerError(message.error));
      }
    });
    worker.on("error", (error) => {
      throw error;
    });
  };
  var taskWorker = (method, args, transferList) => new Promise((resolve, reject) => {
    const id = taskIdCounter++;
    tasks.set(id, {resolve, reject});
    if (worker === void 0) {
      createWorker();
    }
    worker.ref();
    worker.postMessage({id, method, args}, transferList);
  });
  var hasha = (input, options = {}) => {
    let outputEncoding = options.encoding || "hex";
    if (outputEncoding === "buffer") {
      outputEncoding = void 0;
    }
    const hash = crypto.createHash(options.algorithm || "sha512");
    const update = (buffer) => {
      const inputEncoding = typeof buffer === "string" ? "utf8" : void 0;
      hash.update(buffer, inputEncoding);
    };
    if (Array.isArray(input)) {
      input.forEach(update);
    } else {
      update(input);
    }
    return hash.digest(outputEncoding);
  };
  hasha.stream = (options = {}) => {
    let outputEncoding = options.encoding || "hex";
    if (outputEncoding === "buffer") {
      outputEncoding = void 0;
    }
    const stream = crypto.createHash(options.algorithm || "sha512");
    stream.setEncoding(outputEncoding);
    return stream;
  };
  hasha.fromStream = async (stream, options = {}) => {
    if (!isStream(stream)) {
      throw new TypeError("Expected a stream");
    }
    return new Promise((resolve, reject) => {
      stream.on("error", reject).pipe(hasha.stream(options)).on("error", reject).on("finish", function() {
        resolve(this.read());
      });
    });
  };
  if (Worker === void 0) {
    hasha.fromFile = async (filePath, options) => hasha.fromStream(fs.createReadStream(filePath), options);
    hasha.async = async (input, options) => hasha(input, options);
  } else {
    hasha.fromFile = async (filePath, {algorithm = "sha512", encoding = "hex"} = {}) => {
      const hash = await taskWorker("hashFile", [algorithm, filePath]);
      if (encoding === "buffer") {
        return Buffer.from(hash);
      }
      return Buffer.from(hash).toString(encoding);
    };
    hasha.async = async (input, {algorithm = "sha512", encoding = "hex"} = {}) => {
      if (encoding === "buffer") {
        encoding = void 0;
      }
      const hash = await taskWorker("hash", [algorithm, input]);
      if (encoding === void 0) {
        return Buffer.from(hash);
      }
      return Buffer.from(hash).toString(encoding);
    };
  }
  hasha.fromFileSync = (filePath, options) => hasha(fs.readFileSync(filePath), options);
  module2.exports = hasha;
});

// ../../node_modules/.pnpm/@prisma/fetch-engine@2.24.1/node_modules/@prisma/fetch-engine/dist/downloadZip.js
var require_downloadZip = __commonJS((exports2) => {
  "use strict";
  var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.downloadZip = void 0;
  var zlib_1 = __importDefault2(require("zlib"));
  var p_retry_1 = __importDefault2(require_p_retry());
  var node_fetch_1 = __importDefault2(require_lib());
  var fs_12 = __importDefault2(require("fs"));
  var getProxyAgent_1 = require_getProxyAgent();
  var tempy_1 = __importDefault2(require_tempy());
  var path_12 = __importDefault2(require("path"));
  var debug_12 = __importDefault2(require_dist());
  var hasha_1 = __importDefault2(require_hasha());
  var util_12 = require("util");
  var rimraf_1 = __importDefault2(require_rimraf());
  var debug3 = debug_12.default("prisma:downloadZip");
  var del = util_12.promisify(rimraf_1.default);
  async function fetchSha256(url) {
    const [zippedSha256, sha256] = [
      (await node_fetch_1.default(`${url}.sha256`, {
        agent: getProxyAgent_1.getProxyAgent(url)
      }).then((res) => res.text())).split(/\s+/)[0],
      (await node_fetch_1.default(`${url.slice(0, url.length - 3)}.sha256`, {
        agent: getProxyAgent_1.getProxyAgent(url.slice(0, url.length - 3))
      }).then((res) => res.text())).split(/\s+/)[0]
    ];
    return {sha256, zippedSha256};
  }
  async function downloadZip(url, target, progressCb) {
    const tmpDir = tempy_1.default.directory();
    const partial = path_12.default.join(tmpDir, "partial");
    const {sha256, zippedSha256} = await fetchSha256(url);
    const result = await p_retry_1.default(async () => {
      try {
        const resp = await node_fetch_1.default(url, {
          compress: false,
          agent: getProxyAgent_1.getProxyAgent(url)
        });
        if (resp.status !== 200) {
          throw new Error(resp.statusText + " " + url);
        }
        const lastModified = resp.headers.get("last-modified");
        const size = parseFloat(resp.headers.get("content-length"));
        const ws = fs_12.default.createWriteStream(partial);
        return await new Promise(async (resolve, reject) => {
          let bytesRead = 0;
          resp.body.on("error", reject).on("data", (chunk) => {
            bytesRead += chunk.length;
            if (size && progressCb) {
              progressCb(bytesRead / size);
            }
          });
          const gunzip = zlib_1.default.createGunzip();
          gunzip.on("error", reject);
          const zipStream = resp.body.pipe(gunzip);
          const zippedHashPromise = hasha_1.default.fromStream(resp.body, {
            algorithm: "sha256"
          });
          const hashPromise = hasha_1.default.fromStream(zipStream, {
            algorithm: "sha256"
          });
          zipStream.pipe(ws);
          ws.on("error", reject).on("close", () => {
            resolve({lastModified, sha256, zippedSha256});
          });
          const hash = await hashPromise;
          const zippedHash = await zippedHashPromise;
          if (zippedHash !== zippedSha256) {
            throw new Error(`sha256 of ${url} (zipped) should be ${zippedSha256} but is ${zippedHash}`);
          }
          if (hash !== sha256) {
            throw new Error(`sha256 of ${url} (uzipped) should be ${sha256} but is ${hash}`);
          }
        });
      } finally {
      }
    }, {
      retries: 2,
      onFailedAttempt: (err) => debug3(err)
    });
    fs_12.default.copyFileSync(partial, target);
    try {
      await del(partial);
      await del(tmpDir);
    } catch (e) {
      debug3(e);
    }
    return result;
  }
  exports2.downloadZip = downloadZip;
});

// ../../node_modules/.pnpm/@prisma/fetch-engine@2.24.1/node_modules/@prisma/fetch-engine/dist/flatMap.js
var require_flatMap = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.flatMap = void 0;
  function flatten(array) {
    return Array.prototype.concat.apply([], array);
  }
  function flatMap(array, callbackFn, thisArg) {
    return flatten(array.map(callbackFn, thisArg));
  }
  exports2.flatMap = flatMap;
});

// ../../node_modules/.pnpm/@prisma/fetch-engine@2.24.1/node_modules/@prisma/fetch-engine/dist/getHash.js
var require_getHash = __commonJS((exports2) => {
  "use strict";
  var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.getHash = void 0;
  var crypto_1 = __importDefault2(require("crypto"));
  var fs_12 = __importDefault2(require("fs"));
  function getHash(filePath) {
    const hash = crypto_1.default.createHash("sha256");
    const input = fs_12.default.createReadStream(filePath);
    return new Promise((resolve) => {
      input.on("readable", () => {
        const data = input.read();
        if (data) {
          hash.update(data);
        } else {
          resolve(hash.digest("hex"));
        }
      });
    });
  }
  exports2.getHash = getHash;
});

// ../../node_modules/.pnpm/@prisma/fetch-engine@2.24.1/node_modules/@prisma/fetch-engine/dist/getLatestTag.js
var require_getLatestTag = __commonJS((exports2) => {
  "use strict";
  var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.urlExists = exports2.getAllUrls = exports2.getLatestTag = void 0;
  var get_platform_12 = require_dist2();
  var chalk_12 = __importDefault2(require_source());
  var execa_12 = __importDefault2(require_execa());
  var node_fetch_1 = __importDefault2(require_lib());
  var p_map_1 = __importDefault2(require_p_map());
  var getProxyAgent_1 = require_getProxyAgent();
  var util_12 = require_util2();
  async function getLatestTag() {
    let branch = await getBranch();
    if (branch !== "master" && !isPatchBranch(branch) && !branch.startsWith("integration/")) {
      branch = "master";
    }
    branch = branch.replace(/^integration\//, "");
    let commits = await getCommits(branch);
    if ((!commits || !Array.isArray(commits)) && branch !== "master" && !isPatchBranch(branch)) {
      console.log(`Overwriting branch "${branch}" with "master" as it's not a branch we have binaries for`);
      branch = "master";
      commits = await getCommits(branch);
    }
    if (!Array.isArray(commits)) {
      console.error(commits);
      throw new Error(`Could not fetch commits from github: ${JSON.stringify(commits, null, 2)}`);
    }
    return getFirstFinishedCommit(branch, commits);
  }
  exports2.getLatestTag = getLatestTag;
  function getAllUrls(branch, commit) {
    const urls = [];
    const excludedPlatforms = [
      "freebsd",
      "arm",
      "linux-nixos",
      "openbsd",
      "netbsd",
      "freebsd11",
      "freebsd12"
    ];
    const relevantPlatforms = get_platform_12.platforms.filter((p) => !excludedPlatforms.includes(p));
    for (const platform of relevantPlatforms) {
      for (const engine of [
        "query-engine",
        "introspection-engine",
        "migration-engine",
        "prisma-fmt"
      ]) {
        for (const extension of [
          ".gz",
          ".gz.sha256",
          ".gz.sig",
          ".sig",
          ".sha256"
        ]) {
          const downloadUrl = util_12.getDownloadUrl(branch, commit, platform, engine, extension);
          urls.push(downloadUrl);
        }
      }
    }
    return urls;
  }
  exports2.getAllUrls = getAllUrls;
  async function getFirstFinishedCommit(branch, commits) {
    for (const commit of commits) {
      const urls = getAllUrls(branch, commit);
      const exist = await p_map_1.default(urls, urlExists, {concurrency: 10});
      const hasMissing = exist.some((e) => !e);
      if (!hasMissing) {
        return commit;
      } else {
        const missing = urls.filter((_, i) => !exist[i]);
        if (missing.length !== urls.length) {
          console.log(`${chalk_12.default.blueBright("info")} The engine commit ${commit} is not yet done. We're skipping it as we're in dev. Missing urls: ${missing.length}`);
        }
      }
    }
  }
  async function urlExists(url) {
    try {
      const res = await node_fetch_1.default(url, {
        method: "HEAD",
        agent: getProxyAgent_1.getProxyAgent(url)
      });
      const headers = fromEntries(res.headers.entries());
      if (res.status > 200) {
      }
      if (parseInt(headers["content-length"]) > 0) {
        return res.status < 300;
      }
    } catch (e) {
    }
    return false;
  }
  exports2.urlExists = urlExists;
  function fromEntries(entries) {
    const result = {};
    for (const [key, value] of entries) {
      result[key] = value;
    }
    return result;
  }
  async function getBranch() {
    if (process.env.NODE_ENV !== "test") {
      if (process.env.PATCH_BRANCH) {
        return process.env.PATCH_BRANCH;
      }
      if (process.env.BUILDKITE_BRANCH) {
        return process.env.BUILDKITE_BRANCH;
      }
      if (process.env.GITHUB_CONTEXT) {
        const context = JSON.parse(process.env.GITHUB_CONTEXT);
        return context.head_ref;
      }
    }
    try {
      const result = await execa_12.default.command("git rev-parse --abbrev-ref HEAD", {
        shell: true,
        stdio: "pipe"
      });
      return result.stdout;
    } catch (e) {
      console.error(e);
    }
    return;
  }
  function isPatchBranch(version) {
    return /^2\.(\d+)\.x/.test(version);
  }
  async function getCommits(branch) {
    const url = `https://github-cache.prisma.workers.dev/repos/prisma/prisma-engines/commits?sha=${branch}`;
    const result = await node_fetch_1.default(url, {
      agent: getProxyAgent_1.getProxyAgent(url),
      headers: {
        Authorization: process.env.GITHUB_TOKEN ? `token ${process.env.GITHUB_TOKEN}` : void 0
      }
    }).then((res) => res.json());
    if (!Array.isArray(result)) {
      return result;
    }
    const commits = result.map((r) => r.sha);
    return commits;
  }
});

// ../../node_modules/.pnpm/progress@2.0.3/node_modules/progress/lib/node-progress.js
var require_node_progress = __commonJS((exports2, module2) => {
  /*!
   * node-progress
   * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
   * MIT Licensed
   */
  exports2 = module2.exports = ProgressBar;
  function ProgressBar(fmt, options) {
    this.stream = options.stream || process.stderr;
    if (typeof options == "number") {
      var total = options;
      options = {};
      options.total = total;
    } else {
      options = options || {};
      if (typeof fmt != "string")
        throw new Error("format required");
      if (typeof options.total != "number")
        throw new Error("total required");
    }
    this.fmt = fmt;
    this.curr = options.curr || 0;
    this.total = options.total;
    this.width = options.width || this.total;
    this.clear = options.clear;
    this.chars = {
      complete: options.complete || "=",
      incomplete: options.incomplete || "-",
      head: options.head || (options.complete || "=")
    };
    this.renderThrottle = options.renderThrottle !== 0 ? options.renderThrottle || 16 : 0;
    this.lastRender = -Infinity;
    this.callback = options.callback || function() {
    };
    this.tokens = {};
    this.lastDraw = "";
  }
  ProgressBar.prototype.tick = function(len, tokens) {
    if (len !== 0)
      len = len || 1;
    if (typeof len == "object")
      tokens = len, len = 1;
    if (tokens)
      this.tokens = tokens;
    if (this.curr == 0)
      this.start = new Date();
    this.curr += len;
    this.render();
    if (this.curr >= this.total) {
      this.render(void 0, true);
      this.complete = true;
      this.terminate();
      this.callback(this);
      return;
    }
  };
  ProgressBar.prototype.render = function(tokens, force) {
    force = force !== void 0 ? force : false;
    if (tokens)
      this.tokens = tokens;
    if (!this.stream.isTTY)
      return;
    var now = Date.now();
    var delta = now - this.lastRender;
    if (!force && delta < this.renderThrottle) {
      return;
    } else {
      this.lastRender = now;
    }
    var ratio = this.curr / this.total;
    ratio = Math.min(Math.max(ratio, 0), 1);
    var percent = Math.floor(ratio * 100);
    var incomplete, complete, completeLength;
    var elapsed = new Date() - this.start;
    var eta = percent == 100 ? 0 : elapsed * (this.total / this.curr - 1);
    var rate = this.curr / (elapsed / 1e3);
    var str = this.fmt.replace(":current", this.curr).replace(":total", this.total).replace(":elapsed", isNaN(elapsed) ? "0.0" : (elapsed / 1e3).toFixed(1)).replace(":eta", isNaN(eta) || !isFinite(eta) ? "0.0" : (eta / 1e3).toFixed(1)).replace(":percent", percent.toFixed(0) + "%").replace(":rate", Math.round(rate));
    var availableSpace = Math.max(0, this.stream.columns - str.replace(":bar", "").length);
    if (availableSpace && process.platform === "win32") {
      availableSpace = availableSpace - 1;
    }
    var width = Math.min(this.width, availableSpace);
    completeLength = Math.round(width * ratio);
    complete = Array(Math.max(0, completeLength + 1)).join(this.chars.complete);
    incomplete = Array(Math.max(0, width - completeLength + 1)).join(this.chars.incomplete);
    if (completeLength > 0)
      complete = complete.slice(0, -1) + this.chars.head;
    str = str.replace(":bar", complete + incomplete);
    if (this.tokens)
      for (var key in this.tokens)
        str = str.replace(":" + key, this.tokens[key]);
    if (this.lastDraw !== str) {
      this.stream.cursorTo(0);
      this.stream.write(str);
      this.stream.clearLine(1);
      this.lastDraw = str;
    }
  };
  ProgressBar.prototype.update = function(ratio, tokens) {
    var goal = Math.floor(ratio * this.total);
    var delta = goal - this.curr;
    this.tick(delta, tokens);
  };
  ProgressBar.prototype.interrupt = function(message) {
    this.stream.clearLine();
    this.stream.cursorTo(0);
    this.stream.write(message);
    this.stream.write("\n");
    this.stream.write(this.lastDraw);
  };
  ProgressBar.prototype.terminate = function() {
    if (this.clear) {
      if (this.stream.clearLine) {
        this.stream.clearLine();
        this.stream.cursorTo(0);
      }
    } else {
      this.stream.write("\n");
    }
  };
});

// ../../node_modules/.pnpm/progress@2.0.3/node_modules/progress/index.js
var require_progress = __commonJS((exports2, module2) => {
  module2.exports = require_node_progress();
});

// ../../node_modules/.pnpm/@prisma/fetch-engine@2.24.1/node_modules/@prisma/fetch-engine/dist/log.js
var require_log = __commonJS((exports2) => {
  "use strict";
  var __importDefault2 = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.getBar = void 0;
  var progress_1 = __importDefault2(require_progress());
  function getBar(text) {
    return new progress_1.default(`> ${text} [:bar] :percent`, {
      stream: process.stdout,
      width: 20,
      complete: "=",
      incomplete: " ",
      total: 100,
      head: "",
      clear: true
    });
  }
  exports2.getBar = getBar;
});

// ../../node_modules/.pnpm/@prisma/fetch-engine@2.24.1/node_modules/@prisma/fetch-engine/dist/download.js
var require_download = __commonJS((exports, module) => {
  "use strict";
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.plusX = exports.maybeCopyToTmp = exports.getBinaryEnvVarPath = exports.getBinaryName = exports.checkVersionCommand = exports.getVersion = exports.download = exports.EngineTypes = void 0;
  var debug_1 = __importDefault(require_dist());
  var get_platform_1 = require_dist2();
  var chalk_1 = __importDefault(require_source());
  var execa_1 = __importDefault(require_execa());
  var fs_1 = __importDefault(require("fs"));
  var make_dir_1 = __importDefault(require_make_dir());
  var p_filter_1 = __importDefault(require_p_filter());
  var path_1 = __importDefault(require("path"));
  var temp_dir_1 = __importDefault(require_temp_dir());
  var util_1 = require("util");
  var chmod_1 = __importDefault(require_chmod());
  var cleanupCache_1 = require_cleanupCache();
  var downloadZip_1 = require_downloadZip();
  var flatMap_1 = require_flatMap();
  var getHash_1 = require_getHash();
  var getLatestTag_1 = require_getLatestTag();
  var log_1 = require_log();
  var util_2 = require_util2();
  var debug = debug_1.default("prisma:download");
  var writeFile = util_1.promisify(fs_1.default.writeFile);
  var exists = util_1.promisify(fs_1.default.exists);
  var readFile = util_1.promisify(fs_1.default.readFile);
  var copyFile = util_1.promisify(fs_1.default.copyFile);
  var utimes = util_1.promisify(fs_1.default.utimes);
  var channel = "master";
  var EngineTypes;
  (function(EngineTypes3) {
    EngineTypes3["queryEngine"] = "query-engine";
    EngineTypes3["libqueryEngineNapi"] = "libquery-engine-napi";
    EngineTypes3["migrationEngine"] = "migration-engine";
    EngineTypes3["introspectionEngine"] = "introspection-engine";
    EngineTypes3["prismaFmt"] = "prisma-fmt";
  })(EngineTypes = exports.EngineTypes || (exports.EngineTypes = {}));
  var BINARY_TO_ENV_VAR = {
    [EngineTypes.migrationEngine]: "PRISMA_MIGRATION_ENGINE_BINARY",
    [EngineTypes.queryEngine]: "PRISMA_QUERY_ENGINE_BINARY",
    [EngineTypes.libqueryEngineNapi]: "PRISMA_QUERY_ENGINE_LIBRARY",
    [EngineTypes.introspectionEngine]: "PRISMA_INTROSPECTION_ENGINE_BINARY",
    [EngineTypes.prismaFmt]: "PRISMA_FMT_BINARY"
  };
  async function download(options) {
    var _a, _b;
    const platform = await get_platform_1.getPlatform();
    const os = await get_platform_1.getos();
    if (os.distro && ["nixos"].includes(os.distro)) {
      console.error(`${chalk_1.default.yellow("Warning")} Precompiled binaries are not available for ${os.distro}.`);
    } else if (["freebsd11", "freebsd12", "openbsd", "netbsd"].includes(platform)) {
      console.error(`${chalk_1.default.yellow("Warning")} Precompiled binaries are not available for ${platform}. Read more about building your own binaries at https://pris.ly/d/build-binaries`);
    }
    if (!options.binaries || Object.values(options.binaries).length === 0) {
      return {};
    }
    const opts = {
      ...options,
      binaryTargets: (_a = options.binaryTargets) !== null && _a !== void 0 ? _a : [platform],
      version: (_b = options.version) !== null && _b !== void 0 ? _b : "latest",
      binaries: mapKeys(options.binaries, (key) => engineTypeToBinaryType(key, platform))
    };
    const binaryJobs = flatMap_1.flatMap(Object.entries(opts.binaries), ([binaryName, targetFolder]) => opts.binaryTargets.map((binaryTarget) => {
      const fileName = getBinaryName(binaryName, binaryTarget);
      const targetFilePath = binaryName === EngineTypes.libqueryEngineNapi ? path_1.default.join(targetFolder, get_platform_1.getNapiName(binaryTarget, "fs")) : path_1.default.join(targetFolder, fileName);
      return {
        binaryName,
        targetFolder,
        binaryTarget,
        fileName,
        targetFilePath,
        envVarPath: getBinaryEnvVarPath(binaryName)
      };
    }));
    if (process.env.BINARY_DOWNLOAD_VERSION) {
      opts.version = process.env.BINARY_DOWNLOAD_VERSION;
    }
    if (opts.version === "latest") {
      opts.version = await getLatestTag_1.getLatestTag();
    }
    if (opts.printVersion) {
      console.log(`version: ${opts.version}`);
    }
    const binariesToDownload = await p_filter_1.default(binaryJobs, async (job) => {
      const needsToBeDownloaded = await binaryNeedsToBeDownloaded(job, platform, opts.version, opts.failSilent);
      const isSupported = get_platform_1.platforms.includes(job.binaryTarget);
      const shouldDownload = isSupported && !job.envVarPath && (opts.ignoreCache || needsToBeDownloaded);
      if (needsToBeDownloaded && !isSupported) {
        throw new Error(`Unknown binaryTarget ${job.binaryTarget} and no custom binaries were provided`);
      }
      return shouldDownload;
    });
    if (binariesToDownload.length > 0) {
      const cleanupPromise = cleanupCache_1.cleanupCache();
      let finishBar;
      let setProgress;
      if (opts.showProgress) {
        const collectiveBar = getCollectiveBar(opts);
        finishBar = collectiveBar.finishBar;
        setProgress = collectiveBar.setProgress;
      }
      await Promise.all(binariesToDownload.map((job) => downloadBinary({
        ...job,
        version: opts.version,
        failSilent: opts.failSilent,
        progressCb: setProgress ? setProgress(job.targetFilePath) : void 0
      })));
      await cleanupPromise;
      if (finishBar) {
        finishBar();
      }
    }
    const binaryPaths = binaryJobsToBinaryPaths(binaryJobs);
    const dir = eval("__dirname");
    if (dir.startsWith("/snapshot/")) {
      for (const engineType in binaryPaths) {
        const binaryTargets = binaryPaths[engineType];
        for (const binaryTarget in binaryTargets) {
          const binaryPath = binaryTargets[binaryTarget];
          binaryTargets[binaryTarget] = await maybeCopyToTmp(binaryPath);
        }
      }
    }
    return binaryPaths;
  }
  exports.download = download;
  function getCollectiveBar(options) {
    var _a, _b;
    const bar = log_1.getBar(`Downloading Prisma engines for ${(_a = options.binaryTargets) === null || _a === void 0 ? void 0 : _a.map((p) => chalk_1.default.bold(p)).join(" and ")}`);
    const progressMap = {};
    const numDownloads = Object.values(options.binaries).length * Object.values((_b = options === null || options === void 0 ? void 0 : options.binaryTargets) !== null && _b !== void 0 ? _b : []).length;
    const setProgress = (sourcePath) => (progress) => {
      progressMap[sourcePath] = progress;
      const progressValues = Object.values(progressMap);
      const totalProgress = progressValues.reduce((acc, curr) => {
        return acc + curr;
      }, 0) / numDownloads;
      if (options.progressCb) {
        options.progressCb(totalProgress);
      }
      if (bar) {
        bar.update(totalProgress);
      }
    };
    return {
      setProgress,
      finishBar: () => {
        bar.update(1);
        bar.terminate();
      }
    };
  }
  function binaryJobsToBinaryPaths(jobs) {
    return jobs.reduce((acc, job) => {
      if (!acc[job.binaryName]) {
        acc[job.binaryName] = {};
      }
      acc[job.binaryName][job.binaryTarget] = job.envVarPath || job.targetFilePath;
      return acc;
    }, {});
  }
  async function binaryNeedsToBeDownloaded(job, nativePlatform, version, failSilent) {
    var _a;
    const binaryPath = (_a = job.envVarPath) !== null && _a !== void 0 ? _a : job.targetFilePath;
    const targetExists = await exists(binaryPath);
    const cachedFile = await getCachedBinaryPath({
      ...job,
      version,
      failSilent
    });
    if (cachedFile) {
      const sha256FilePath = cachedFile + ".sha256";
      if (await exists(sha256FilePath)) {
        const sha256File = await readFile(sha256FilePath, "utf-8");
        const sha256Cache = await getHash_1.getHash(cachedFile);
        if (sha256File === sha256Cache) {
          if (!targetExists) {
            debug(`copying ${cachedFile} to ${job.targetFilePath}`);
            await utimes(cachedFile, new Date(), new Date());
            await copyFile(cachedFile, job.targetFilePath);
          }
          const targetSha256 = await getHash_1.getHash(job.targetFilePath);
          if (sha256File !== targetSha256) {
            debug(`overwriting ${job.targetFilePath} with ${cachedFile} as hashes do not match`);
            await copyFile(cachedFile, job.targetFilePath);
          }
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    }
    if (!targetExists) {
      debug(`file ${binaryPath} does not exist and must be downloaded`);
      return true;
    }
    if (job.binaryTarget === nativePlatform && job.binaryName !== EngineTypes.libqueryEngineNapi) {
      const works = await checkVersionCommand(binaryPath);
      return !works;
    }
    return false;
  }
  async function getVersion(enginePath) {
    const result = await execa_1.default(enginePath, ["--version"]);
    return result.stdout;
  }
  exports.getVersion = getVersion;
  async function checkVersionCommand(enginePath) {
    try {
      const version = await getVersion(enginePath);
      return version.length > 0;
    } catch (e) {
      return false;
    }
  }
  exports.checkVersionCommand = checkVersionCommand;
  function getBinaryName(binaryName, platform) {
    if (binaryName === EngineTypes.libqueryEngineNapi) {
      return `${get_platform_1.getNapiName(platform, "url")}`;
    }
    const extension = platform === "windows" ? ".exe" : "";
    return `${binaryName}-${platform}${extension}`;
  }
  exports.getBinaryName = getBinaryName;
  async function getCachedBinaryPath({version, binaryTarget, binaryName}) {
    const cacheDir = await util_2.getCacheDir(channel, version, binaryTarget);
    if (!cacheDir) {
      return null;
    }
    const cachedTargetPath = path_1.default.join(cacheDir, binaryName);
    if (!fs_1.default.existsSync(cachedTargetPath)) {
      return null;
    }
    if (version !== "latest") {
      return cachedTargetPath;
    }
    if (await exists(cachedTargetPath)) {
      return cachedTargetPath;
    }
    return null;
  }
  function getBinaryEnvVarPath(binaryName) {
    const envVar = BINARY_TO_ENV_VAR[binaryName];
    if (envVar && process.env[envVar]) {
      const envVarPath = path_1.default.resolve(process.cwd(), process.env[envVar]);
      if (!fs_1.default.existsSync(envVarPath)) {
        throw new Error(`Env var ${chalk_1.default.bold(envVar)} is provided but provided path ${chalk_1.default.underline(process.env[envVar])} can't be resolved.`);
      }
      debug(`Using env var ${chalk_1.default.bold(envVar)} for binary ${chalk_1.default.bold(binaryName)}, which points to ${chalk_1.default.underline(process.env[envVar])}`);
      return envVarPath;
    }
    return null;
  }
  exports.getBinaryEnvVarPath = getBinaryEnvVarPath;
  async function downloadBinary(options) {
    const {version, progressCb, targetFilePath, binaryTarget, binaryName} = options;
    const downloadUrl = util_2.getDownloadUrl("all_commits", version, binaryTarget, binaryName);
    const targetDir = path_1.default.dirname(targetFilePath);
    try {
      fs_1.default.accessSync(targetDir, fs_1.default.constants.W_OK);
      await make_dir_1.default(targetDir);
    } catch (e) {
      if (options.failSilent || e.code !== "EACCES") {
        return;
      } else {
        throw new Error(`Can't write to ${targetDir} please make sure you install "prisma" with the right permissions.`);
      }
    }
    debug(`Downloading ${downloadUrl} to ${targetFilePath}`);
    if (progressCb) {
      progressCb(0);
    }
    const {sha256, zippedSha256} = await downloadZip_1.downloadZip(downloadUrl, targetFilePath, progressCb);
    if (progressCb) {
      progressCb(1);
    }
    if (process.platform !== "win32") {
      chmod_1.default(targetFilePath);
    }
    await saveFileToCache(options, version, sha256, zippedSha256);
  }
  async function saveFileToCache(job, version, sha256, zippedSha256) {
    const cacheDir = await util_2.getCacheDir(channel, version, job.binaryTarget);
    if (!cacheDir) {
      return;
    }
    const cachedTargetPath = path_1.default.join(cacheDir, job.binaryName);
    const cachedSha256Path = path_1.default.join(cacheDir, job.binaryName + ".sha256");
    const cachedSha256ZippedPath = path_1.default.join(cacheDir, job.binaryName + ".gz.sha256");
    try {
      await copyFile(job.targetFilePath, cachedTargetPath);
      await writeFile(cachedSha256Path, sha256);
      await writeFile(cachedSha256ZippedPath, zippedSha256);
    } catch (e) {
      debug(e);
    }
  }
  function engineTypeToBinaryType(engineType, binaryTarget) {
    if (EngineTypes[engineType]) {
      return EngineTypes[engineType];
    }
    if (engineType === "native") {
      return binaryTarget;
    }
    return engineType;
  }
  function mapKeys(obj, mapper) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      acc[mapper(key)] = value;
      return acc;
    }, {});
  }
  async function maybeCopyToTmp(file) {
    const dir = eval("__dirname");
    if (dir.startsWith("/snapshot/")) {
      const targetDir = path_1.default.join(temp_dir_1.default, "prisma-binaries");
      await make_dir_1.default(targetDir);
      const target = path_1.default.join(targetDir, path_1.default.basename(file));
      const data = await readFile(file);
      await writeFile(target, data);
      plusX(target);
      return target;
    }
    return file;
  }
  exports.maybeCopyToTmp = maybeCopyToTmp;
  function plusX(file) {
    const s = fs_1.default.statSync(file);
    const newMode = s.mode | 64 | 8 | 1;
    if (s.mode === newMode) {
      return;
    }
    const base8 = newMode.toString(8).slice(-3);
    fs_1.default.chmodSync(file, base8);
  }
  exports.plusX = plusX;
});

// ../../node_modules/.pnpm/@prisma/fetch-engine@2.24.1/node_modules/@prisma/fetch-engine/dist/index.js
var require_dist6 = __commonJS((exports2) => {
  "use strict";
  var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    Object.defineProperty(o, k2, {enumerable: true, get: function() {
      return m[k];
    }});
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar2 = exports2 && exports2.__exportStar || function(m, exports3) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
        __createBinding(exports3, m, p);
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  exports2.getProxyAgent = exports2.urlExists = exports2.getLatestTag = exports2.getAllUrls = void 0;
  __exportStar2(require_download(), exports2);
  var getLatestTag_12 = require_getLatestTag();
  Object.defineProperty(exports2, "getAllUrls", {enumerable: true, get: function() {
    return getLatestTag_12.getAllUrls;
  }});
  Object.defineProperty(exports2, "getLatestTag", {enumerable: true, get: function() {
    return getLatestTag_12.getLatestTag;
  }});
  Object.defineProperty(exports2, "urlExists", {enumerable: true, get: function() {
    return getLatestTag_12.urlExists;
  }});
  var getProxyAgent_1 = require_getProxyAgent();
  Object.defineProperty(exports2, "getProxyAgent", {enumerable: true, get: function() {
    return getProxyAgent_1.getProxyAgent;
  }});
});

// src/index.ts
__markAsModule(exports);
__export(exports, {
  enginesVersion: () => import_engines_version2.enginesVersion,
  ensureBinariesExist: () => ensureBinariesExist,
  getEnginesPath: () => getEnginesPath
});
var import_debug = __toModule(require_dist());
var import_engines_version = __toModule(require_engines_version());
var import_fetch_engine = __toModule(require_dist6());
var import_path = __toModule(require("path"));
var import_engines_version2 = __toModule(require_engines_version());
var debug2 = import_debug.default("prisma:engines");
function getEnginesPath() {
  return import_path.default.join(__dirname, "../");
}
async function ensureBinariesExist() {
  const binaryDir = import_path.default.join(__dirname, "../");
  let binaryTargets = void 0;
  if (process.env.PRISMA_CLI_BINARY_TARGETS) {
    binaryTargets = process.env.PRISMA_CLI_BINARY_TARGETS.split(",");
  }
  debug2(`using NAPI: ${process.env.PRISMA_FORCE_NAPI === "true"}`);
  const binaries = {
    [process.env.PRISMA_FORCE_NAPI === "true" ? import_fetch_engine.EngineTypes.libqueryEngineNapi : import_fetch_engine.EngineTypes.queryEngine]: binaryDir,
    [import_fetch_engine.EngineTypes.migrationEngine]: binaryDir,
    [import_fetch_engine.EngineTypes.introspectionEngine]: binaryDir,
    [import_fetch_engine.EngineTypes.prismaFmt]: binaryDir
  };
  debug2(`binaries to download ${Object.keys(binaries).join(", ")}`);
  await import_fetch_engine.download({
    binaries,
    showProgress: true,
    version: import_engines_version.enginesVersion,
    failSilent: false,
    binaryTargets
  });
}
import_path.default.join(__dirname, "../query-engine-darwin");
import_path.default.join(__dirname, "../introspection-engine-darwin");
import_path.default.join(__dirname, "../prisma-fmt-darwin");
import_path.default.join(__dirname, "../query-engine-debian-openssl-1.0.x");
import_path.default.join(__dirname, "../introspection-engine-debian-openssl-1.0.x");
import_path.default.join(__dirname, "../prisma-fmt-debian-openssl-1.0.x");
import_path.default.join(__dirname, "../query-engine-debian-openssl-1.1.x");
import_path.default.join(__dirname, "../introspection-engine-debian-openssl-1.1.x");
import_path.default.join(__dirname, "../prisma-fmt-debian-openssl-1.1.x");
import_path.default.join(__dirname, "../query-engine-rhel-openssl-1.0.x");
import_path.default.join(__dirname, "../introspection-engine-rhel-openssl-1.0.x");
import_path.default.join(__dirname, "../prisma-fmt-rhel-openssl-1.0.x");
import_path.default.join(__dirname, "../query-engine-rhel-openssl-1.1.x");
import_path.default.join(__dirname, "../introspection-engine-rhel-openssl-1.1.x");
import_path.default.join(__dirname, "../prisma-fmt-rhel-openssl-1.1.x");
import_path.default.join(__dirname, "../libquery_engine_napi-darwin.dylib.node");
import_path.default.join(__dirname, "../libquery_engine_napi-debian-openssl-1.0.x.so.node");
import_path.default.join(__dirname, "../libquery_engine_napi-debian-openssl-1.1.x.so.node");
import_path.default.join(__dirname, "../libquery_engine_napi-linux-arm-openssl-1.0.x.so.node");
import_path.default.join(__dirname, "../libquery_engine_napi-linux-arm-openssl-1.1.x.so.node");
import_path.default.join(__dirname, "../libquery_engine_napi-linux-musl.so.node");
import_path.default.join(__dirname, "../libquery_engine_napi-rhel-openssl-1.0.x.so.node");
import_path.default.join(__dirname, "../libquery_engine_napi-rhel-openssl-1.1.x.so.node");
import_path.default.join(__dirname, "../query_engine_napi-windows.dll.node");
