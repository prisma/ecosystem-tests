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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.applyOutputTypesEnhanceMap = exports.applyModelsEnhanceMap = exports.applyTypeClassEnhanceConfig = exports.applyResolversEnhanceMap = void 0;
var crudResolvers = __importStar(require("./resolvers/crud/resolvers-crud.index"));
var actionResolvers = __importStar(require("./resolvers/crud/resolvers-actions.index"));
var models = __importStar(require("./models"));
var outputTypes = __importStar(require("./resolvers/outputs"));
var crudResolversMap = {
    User: crudResolvers.UserCrudResolver
};
var actionResolversMap = {
    User: {
        user: actionResolvers.FindUniqueUserResolver,
        findFirstUser: actionResolvers.FindFirstUserResolver,
        users: actionResolvers.FindManyUserResolver,
        createUser: actionResolvers.CreateUserResolver,
        deleteUser: actionResolvers.DeleteUserResolver,
        updateUser: actionResolvers.UpdateUserResolver,
        deleteManyUser: actionResolvers.DeleteManyUserResolver,
        updateManyUser: actionResolvers.UpdateManyUserResolver,
        upsertUser: actionResolvers.UpsertUserResolver,
        aggregateUser: actionResolvers.AggregateUserResolver
    }
};
function applyResolversEnhanceMap(resolversEnhanceMap) {
    for (var _i = 0, _a = Object.keys(resolversEnhanceMap); _i < _a.length; _i++) {
        var resolversEnhanceMapKey = _a[_i];
        var modelName = resolversEnhanceMapKey;
        var resolverActionsConfig = resolversEnhanceMap[modelName];
        for (var _b = 0, _c = Object.keys(resolverActionsConfig); _b < _c.length; _b++) {
            var modelResolverActionName = _c[_b];
            var decorators = resolverActionsConfig[modelResolverActionName];
            var crudTarget = crudResolversMap[modelName].prototype;
            var actionResolversConfig = actionResolversMap[modelName];
            var actionTarget = actionResolversConfig[modelResolverActionName].prototype;
            for (var _d = 0, decorators_1 = decorators; _d < decorators_1.length; _d++) {
                var decorator = decorators_1[_d];
                decorator(crudTarget, modelResolverActionName, Object.getOwnPropertyDescriptor(crudTarget, modelResolverActionName));
                decorator(actionTarget, modelResolverActionName, Object.getOwnPropertyDescriptor(actionTarget, modelResolverActionName));
            }
        }
    }
}
exports.applyResolversEnhanceMap = applyResolversEnhanceMap;
function applyTypeClassEnhanceConfig(enhanceConfig, typeClass, typePrototype) {
    if (enhanceConfig["class"]) {
        for (var _i = 0, _a = enhanceConfig["class"]; _i < _a.length; _i++) {
            var decorator = _a[_i];
            decorator(typeClass);
        }
    }
    if (enhanceConfig.fields) {
        for (var _b = 0, _c = Object.keys(enhanceConfig.fields); _b < _c.length; _b++) {
            var modelFieldName = _c[_b];
            var decorators = enhanceConfig.fields[modelFieldName];
            for (var _d = 0, decorators_2 = decorators; _d < decorators_2.length; _d++) {
                var decorator = decorators_2[_d];
                decorator(typePrototype, modelFieldName);
            }
        }
    }
}
exports.applyTypeClassEnhanceConfig = applyTypeClassEnhanceConfig;
function applyModelsEnhanceMap(modelsEnhanceMap) {
    for (var _i = 0, _a = Object.keys(modelsEnhanceMap); _i < _a.length; _i++) {
        var modelsEnhanceMapKey = _a[_i];
        var modelName = modelsEnhanceMapKey;
        var modelConfig = modelsEnhanceMap[modelName];
        var modelClass = models[modelName];
        var modelTarget = modelClass.prototype;
        applyTypeClassEnhanceConfig(modelConfig, modelClass, modelTarget);
    }
}
exports.applyModelsEnhanceMap = applyModelsEnhanceMap;
function applyOutputTypesEnhanceMap(outputTypesEnhanceMap) {
    for (var _i = 0, _a = Object.keys(outputTypesEnhanceMap); _i < _a.length; _i++) {
        var outputTypeEnhanceMapKey = _a[_i];
        var outputTypeName = outputTypeEnhanceMapKey;
        var typeConfig = outputTypesEnhanceMap[outputTypeName];
        var typeClass = outputTypes[outputTypeName];
        var typeTarget = typeClass.prototype;
        applyTypeClassEnhanceConfig(typeConfig, typeClass, typeTarget);
    }
}
exports.applyOutputTypesEnhanceMap = applyOutputTypesEnhanceMap;
