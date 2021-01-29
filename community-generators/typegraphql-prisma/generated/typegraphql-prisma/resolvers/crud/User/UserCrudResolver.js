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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.UserCrudResolver = void 0;
var TypeGraphQL = __importStar(require("type-graphql"));
var graphql_fields_1 = __importDefault(require("graphql-fields"));
var User_1 = require("../../../models/User");
var AggregateUser_1 = require("../../outputs/AggregateUser");
var BatchPayload_1 = require("../../outputs/BatchPayload");
var UserCrudResolver = /** @class */ (function () {
    function UserCrudResolver() {
    }
    UserCrudResolver.prototype.user = function (ctx, args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, ctx.prisma.user.findUnique(args)];
            });
        });
    };
    UserCrudResolver.prototype.findFirstUser = function (ctx, args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, ctx.prisma.user.findFirst(args)];
            });
        });
    };
    UserCrudResolver.prototype.users = function (ctx, args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, ctx.prisma.user.findMany(args)];
            });
        });
    };
    UserCrudResolver.prototype.createUser = function (ctx, args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, ctx.prisma.user.create(args)];
            });
        });
    };
    UserCrudResolver.prototype.deleteUser = function (ctx, args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, ctx.prisma.user["delete"](args)];
            });
        });
    };
    UserCrudResolver.prototype.updateUser = function (ctx, args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, ctx.prisma.user.update(args)];
            });
        });
    };
    UserCrudResolver.prototype.deleteManyUser = function (ctx, args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, ctx.prisma.user.deleteMany(args)];
            });
        });
    };
    UserCrudResolver.prototype.updateManyUser = function (ctx, args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, ctx.prisma.user.updateMany(args)];
            });
        });
    };
    UserCrudResolver.prototype.upsertUser = function (ctx, args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, ctx.prisma.user.upsert(args)];
            });
        });
    };
    UserCrudResolver.prototype.aggregateUser = function (ctx, info, args) {
        return __awaiter(this, void 0, void 0, function () {
            function transformFields(fields) {
                return Object.fromEntries(Object.entries(fields)
                    .filter(function (_a) {
                    var key = _a[0], value = _a[1];
                    return !key.startsWith("_");
                })
                    .map(function (_a) {
                    var key = _a[0], value = _a[1];
                    if (Object.keys(value).length === 0) {
                        return [key, true];
                    }
                    return [key, transformFields(value)];
                }));
            }
            return __generator(this, function (_a) {
                return [2 /*return*/, ctx.prisma.user.aggregate(__assign(__assign({}, args), transformFields(graphql_fields_1["default"](info))))];
            });
        });
    };
    __decorate([
        TypeGraphQL.Query(function (_returns) { return User_1.User; }, {
            nullable: true,
            description: undefined
        }),
        __param(0, TypeGraphQL.Ctx()), __param(1, TypeGraphQL.Args())
    ], UserCrudResolver.prototype, "user");
    __decorate([
        TypeGraphQL.Query(function (_returns) { return User_1.User; }, {
            nullable: true,
            description: undefined
        }),
        __param(0, TypeGraphQL.Ctx()), __param(1, TypeGraphQL.Args())
    ], UserCrudResolver.prototype, "findFirstUser");
    __decorate([
        TypeGraphQL.Query(function (_returns) { return [User_1.User]; }, {
            nullable: false,
            description: undefined
        }),
        __param(0, TypeGraphQL.Ctx()), __param(1, TypeGraphQL.Args())
    ], UserCrudResolver.prototype, "users");
    __decorate([
        TypeGraphQL.Mutation(function (_returns) { return User_1.User; }, {
            nullable: false,
            description: undefined
        }),
        __param(0, TypeGraphQL.Ctx()), __param(1, TypeGraphQL.Args())
    ], UserCrudResolver.prototype, "createUser");
    __decorate([
        TypeGraphQL.Mutation(function (_returns) { return User_1.User; }, {
            nullable: true,
            description: undefined
        }),
        __param(0, TypeGraphQL.Ctx()), __param(1, TypeGraphQL.Args())
    ], UserCrudResolver.prototype, "deleteUser");
    __decorate([
        TypeGraphQL.Mutation(function (_returns) { return User_1.User; }, {
            nullable: true,
            description: undefined
        }),
        __param(0, TypeGraphQL.Ctx()), __param(1, TypeGraphQL.Args())
    ], UserCrudResolver.prototype, "updateUser");
    __decorate([
        TypeGraphQL.Mutation(function (_returns) { return BatchPayload_1.BatchPayload; }, {
            nullable: false,
            description: undefined
        }),
        __param(0, TypeGraphQL.Ctx()), __param(1, TypeGraphQL.Args())
    ], UserCrudResolver.prototype, "deleteManyUser");
    __decorate([
        TypeGraphQL.Mutation(function (_returns) { return BatchPayload_1.BatchPayload; }, {
            nullable: false,
            description: undefined
        }),
        __param(0, TypeGraphQL.Ctx()), __param(1, TypeGraphQL.Args())
    ], UserCrudResolver.prototype, "updateManyUser");
    __decorate([
        TypeGraphQL.Mutation(function (_returns) { return User_1.User; }, {
            nullable: false,
            description: undefined
        }),
        __param(0, TypeGraphQL.Ctx()), __param(1, TypeGraphQL.Args())
    ], UserCrudResolver.prototype, "upsertUser");
    __decorate([
        TypeGraphQL.Query(function (_returns) { return AggregateUser_1.AggregateUser; }, {
            nullable: false,
            description: undefined
        }),
        __param(0, TypeGraphQL.Ctx()), __param(1, TypeGraphQL.Info()), __param(2, TypeGraphQL.Args())
    ], UserCrudResolver.prototype, "aggregateUser");
    UserCrudResolver = __decorate([
        TypeGraphQL.Resolver(function (_of) { return User_1.User; })
    ], UserCrudResolver);
    return UserCrudResolver;
}());
exports.UserCrudResolver = UserCrudResolver;
