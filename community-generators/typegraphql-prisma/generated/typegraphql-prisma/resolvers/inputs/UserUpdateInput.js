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
exports.UserUpdateInput = void 0;
var TypeGraphQL = __importStar(require("type-graphql"));
var EnumUserTypeFieldUpdateOperationsInput_1 = require("../inputs/EnumUserTypeFieldUpdateOperationsInput");
var NullableStringFieldUpdateOperationsInput_1 = require("../inputs/NullableStringFieldUpdateOperationsInput");
var StringFieldUpdateOperationsInput_1 = require("../inputs/StringFieldUpdateOperationsInput");
var UserUpdateInput = /** @class */ (function () {
    function UserUpdateInput() {
    }
    __decorate([
        TypeGraphQL.Field(function (_type) { return StringFieldUpdateOperationsInput_1.StringFieldUpdateOperationsInput; }, {
            nullable: true,
            description: undefined
        })
    ], UserUpdateInput.prototype, "id");
    __decorate([
        TypeGraphQL.Field(function (_type) { return StringFieldUpdateOperationsInput_1.StringFieldUpdateOperationsInput; }, {
            nullable: true,
            description: undefined
        })
    ], UserUpdateInput.prototype, "email");
    __decorate([
        TypeGraphQL.Field(function (_type) { return NullableStringFieldUpdateOperationsInput_1.NullableStringFieldUpdateOperationsInput; }, {
            nullable: true,
            description: undefined
        })
    ], UserUpdateInput.prototype, "name");
    __decorate([
        TypeGraphQL.Field(function (_type) { return EnumUserTypeFieldUpdateOperationsInput_1.EnumUserTypeFieldUpdateOperationsInput; }, {
            nullable: true,
            description: undefined
        })
    ], UserUpdateInput.prototype, "type");
    UserUpdateInput = __decorate([
        TypeGraphQL.InputType({
            isAbstract: true,
            description: undefined
        })
    ], UserUpdateInput);
    return UserUpdateInput;
}());
exports.UserUpdateInput = UserUpdateInput;
