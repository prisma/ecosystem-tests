import { NonEmptyArray } from "type-graphql";
import * as crudResolversImport from "./resolvers/crud/resolvers-crud.index";

export * from "./enums";
export * from "./models";
export * from "./resolvers/crud";
export * from "./resolvers/inputs";
export * from "./resolvers/outputs";
export * from "./enhance";

export const crudResolvers = Object.values(crudResolversImport) as unknown as NonEmptyArray<Function>;
export const resolvers = [...crudResolvers] as unknown as NonEmptyArray<Function>;
