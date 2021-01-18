import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { UserType } from "../../enums/UserType";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class UserCreateInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true,
    description: undefined
  })
  id?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: false,
    description: undefined
  })
  email!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true,
    description: undefined
  })
  name?: string | undefined;

  @TypeGraphQL.Field(_type => UserType, {
    nullable: false,
    description: undefined
  })
  type!: "ADMIN" | "NORMAL";
}
