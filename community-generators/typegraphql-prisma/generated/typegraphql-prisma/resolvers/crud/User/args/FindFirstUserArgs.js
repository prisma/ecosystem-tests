"use strict";
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
exports.__esModule = true;
exports.FindFirstUserArgs = void 0;
var TypeGraphQL = __importStar(require("type-graphql"));
var UserOrderByInput_1 = require("../../../inputs/UserOrderByInput");
var UserWhereInput_1 = require("../../../inputs/UserWhereInput");
var UserWhereUniqueInput_1 = require("../../../inputs/UserWhereUniqueInput");
var UserScalarFieldEnum_1 = require("../../../../enums/UserScalarFieldEnum");
var FindFirstUserArgs = /** @class */ (function () {
    function FindFirstUserArgs() {
    }
    __decorate([
        TypeGraphQL.Field(function (_type) { return UserWhereInput_1.UserWhereInput; }, { nullable: true })
    ], FindFirstUserArgs.prototype, "where");
    __decorate([
        TypeGraphQL.Field(function (_type) { return [UserOrderByInput_1.UserOrderByInput]; }, { nullable: true })
    ], FindFirstUserArgs.prototype, "orderBy");
    __decorate([
        TypeGraphQL.Field(function (_type) { return UserWhereUniqueInput_1.UserWhereUniqueInput; }, { nullable: true })
    ], FindFirstUserArgs.prototype, "cursor");
    __decorate([
        TypeGraphQL.Field(function (_type) { return TypeGraphQL.Int; }, { nullable: true })
    ], FindFirstUserArgs.prototype, "take");
    __decorate([
        TypeGraphQL.Field(function (_type) { return TypeGraphQL.Int; }, { nullable: true })
    ], FindFirstUserArgs.prototype, "skip");
    __decorate([
        TypeGraphQL.Field(function (_type) { return [UserScalarFieldEnum_1.UserScalarFieldEnum]; }, { nullable: true })
    ], FindFirstUserArgs.prototype, "distinct");
    FindFirstUserArgs = __decorate([
        TypeGraphQL.ArgsType()
    ], FindFirstUserArgs);
    return FindFirstUserArgs;
}());
exports.FindFirstUserArgs = FindFirstUserArgs;
