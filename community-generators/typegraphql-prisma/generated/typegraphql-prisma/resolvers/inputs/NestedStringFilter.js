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
exports.NestedStringFilter = void 0;
var TypeGraphQL = __importStar(require("type-graphql"));
var NestedStringFilter = /** @class */ (function () {
    function NestedStringFilter() {
    }
    NestedStringFilter_1 = NestedStringFilter;
    var NestedStringFilter_1;
    __decorate([
        TypeGraphQL.Field(function (_type) { return String; }, {
            nullable: true,
            description: undefined
        })
    ], NestedStringFilter.prototype, "equals");
    __decorate([
        TypeGraphQL.Field(function (_type) { return [String]; }, {
            nullable: true,
            description: undefined
        })
    ], NestedStringFilter.prototype, "in");
    __decorate([
        TypeGraphQL.Field(function (_type) { return [String]; }, {
            nullable: true,
            description: undefined
        })
    ], NestedStringFilter.prototype, "notIn");
    __decorate([
        TypeGraphQL.Field(function (_type) { return String; }, {
            nullable: true,
            description: undefined
        })
    ], NestedStringFilter.prototype, "lt");
    __decorate([
        TypeGraphQL.Field(function (_type) { return String; }, {
            nullable: true,
            description: undefined
        })
    ], NestedStringFilter.prototype, "lte");
    __decorate([
        TypeGraphQL.Field(function (_type) { return String; }, {
            nullable: true,
            description: undefined
        })
    ], NestedStringFilter.prototype, "gt");
    __decorate([
        TypeGraphQL.Field(function (_type) { return String; }, {
            nullable: true,
            description: undefined
        })
    ], NestedStringFilter.prototype, "gte");
    __decorate([
        TypeGraphQL.Field(function (_type) { return String; }, {
            nullable: true,
            description: undefined
        })
    ], NestedStringFilter.prototype, "contains");
    __decorate([
        TypeGraphQL.Field(function (_type) { return String; }, {
            nullable: true,
            description: undefined
        })
    ], NestedStringFilter.prototype, "startsWith");
    __decorate([
        TypeGraphQL.Field(function (_type) { return String; }, {
            nullable: true,
            description: undefined
        })
    ], NestedStringFilter.prototype, "endsWith");
    __decorate([
        TypeGraphQL.Field(function (_type) { return NestedStringFilter_1; }, {
            nullable: true,
            description: undefined
        })
    ], NestedStringFilter.prototype, "not");
    NestedStringFilter = NestedStringFilter_1 = __decorate([
        TypeGraphQL.InputType({
            isAbstract: true,
            description: undefined
        })
    ], NestedStringFilter);
    return NestedStringFilter;
}());
exports.NestedStringFilter = NestedStringFilter;
