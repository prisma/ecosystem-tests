import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { UserCountAggregateOutputType } from "../outputs/UserCountAggregateOutputType";
import { UserMaxAggregate } from "../outputs/UserMaxAggregate";
import { UserMinAggregate } from "../outputs/UserMinAggregate";

@TypeGraphQL.ObjectType({
  isAbstract: true,
  description: undefined,
  simpleResolvers: undefined,
})
export class AggregateUser {
  @TypeGraphQL.Field(_type => UserCountAggregateOutputType, {
    nullable: true,
    description: undefined
  })
  count!: UserCountAggregateOutputType | null;

  @TypeGraphQL.Field(_type => UserMinAggregate, {
    nullable: true,
    description: undefined
  })
  min!: UserMinAggregate | null;

  @TypeGraphQL.Field(_type => UserMaxAggregate, {
    nullable: true,
    description: undefined
  })
  max!: UserMaxAggregate | null;
}
