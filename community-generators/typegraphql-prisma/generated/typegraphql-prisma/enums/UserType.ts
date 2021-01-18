import * as TypeGraphQL from "type-graphql";

export enum UserType {
  ADMIN = "ADMIN",
  NORMAL = "NORMAL"
}
TypeGraphQL.registerEnumType(UserType, {
  name: "UserType",
  description: undefined,
});
