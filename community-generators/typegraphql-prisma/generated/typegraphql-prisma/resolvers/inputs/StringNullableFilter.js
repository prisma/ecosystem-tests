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
exports.StringNullableFilter = void 0;
var TypeGraphQL = __importStar(require("type-graphql"));
var NestedStringNullableFilter_1 = require("../inputs/NestedStringNullableFilter");
var QueryMode_1 = require("../../enums/QueryMode");
var StringNullableFilter = /** @class */ (function () {
    function StringNullableFilter() {
    }
    __decorate([
        TypeGraphQL.Field(function (_type) { return String; }, {
            nullable: true,
            description: undefined
        })
    ], StringNullableFilter.prototype, "equals");
    __decorate([
        TypeGraphQL.Field(function (_type) { return [String]; }, {
            nullable: true,
            description: undefined
        })
    ], StringNullableFilter.prototype, "in");
    __decorate([
        TypeGraphQL.Field(function (_type) { return [String]; }, {
            nullable: true,
            description: undefined
        })
    ], StringNullableFilter.prototype, "notIn");
    __decorate([
        TypeGraphQL.Field(function (_type) { return String; }, {
            nullable: true,
            description: undefined
        })
    ], StringNullableFilter.prototype, "lt");
    __decorate([
        TypeGraphQL.Field(function (_type) { return String; }, {
            nullable: true,
            description: undefined
        })
    ], StringNullableFilter.prototype, "lte");
    __decorate([
        TypeGraphQL.Field(function (_type) { return String; }, {
            nullable: true,
            description: undefined
        })
    ], StringNullableFilter.prototype, "gt");
    __decorate([
        TypeGraphQL.Field(function (_type) { return String; }, {
            nullable: true,
            description: undefined
        })
    ], StringNullableFilter.prototype, "gte");
    __decorate([
        TypeGraphQL.Field(function (_type) { return String; }, {
            nullable: true,
            description: undefined
        })
    ], StringNullableFilter.prototype, "contains");
    __decorate([
        TypeGraphQL.Field(function (_type) { return String; }, {
            nullable: true,
            description: undefined
        })
    ], StringNullableFilter.prototype, "startsWith");
    __decorate([
        TypeGraphQL.Field(function (_type) { return String; }, {
            nullable: true,
            description: undefined
        })
    ], StringNullableFilter.prototype, "endsWith");
    __decorate([
        TypeGraphQL.Field(function (_type) { return QueryMode_1.QueryMode; }, {
            nullable: true,
            description: undefined
        })
    ], StringNullableFilter.prototype, "mode");
    __decorate([
        TypeGraphQL.Field(function (_type) { return NestedStringNullableFilter_1.NestedStringNullableFilter; }, {
            nullable: true,
            description: undefined
        })
    ], StringNullableFilter.prototype, "not");
    StringNullableFilter = __decorate([
        TypeGraphQL.InputType({
            isAbstract: true,
            description: undefined
        })
    ], StringNullableFilter);
    return StringNullableFilter;
}());
exports.StringNullableFilter = StringNullableFilter;
