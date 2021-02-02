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
exports.UserMaxAggregate = void 0;
var TypeGraphQL = __importStar(require("type-graphql"));
var UserType_1 = require("../../enums/UserType");
var UserMaxAggregate = /** @class */ (function () {
    function UserMaxAggregate() {
    }
    __decorate([
        TypeGraphQL.Field(function (_type) { return String; }, {
            nullable: true,
            description: undefined
        })
    ], UserMaxAggregate.prototype, "id");
    __decorate([
        TypeGraphQL.Field(function (_type) { return String; }, {
            nullable: true,
            description: undefined
        })
    ], UserMaxAggregate.prototype, "email");
    __decorate([
        TypeGraphQL.Field(function (_type) { return String; }, {
            nullable: true,
            description: undefined
        })
    ], UserMaxAggregate.prototype, "name");
    __decorate([
        TypeGraphQL.Field(function (_type) { return UserType_1.UserType; }, {
            nullable: true,
            description: undefined
        })
    ], UserMaxAggregate.prototype, "type");
    UserMaxAggregate = __decorate([
        TypeGraphQL.ObjectType({
            isAbstract: true,
            description: undefined,
            simpleResolvers: undefined
        })
    ], UserMaxAggregate);
    return UserMaxAggregate;
}());
exports.UserMaxAggregate = UserMaxAggregate;
