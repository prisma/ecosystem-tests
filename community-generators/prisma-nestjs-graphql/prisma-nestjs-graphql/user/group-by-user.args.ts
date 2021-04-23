import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where.input';
import { UserOrderByInput } from './user-order-by.input';
import { UserScalarFieldEnum } from './user-scalar-field.enum';
import { UserScalarWhereWithAggregatesInput } from './user-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { UserCountAggregateInput } from './user-count-aggregate.input';
import { UserMinAggregateInput } from './user-min-aggregate.input';
import { UserMaxAggregateInput } from './user-max-aggregate.input';

@ArgsType()
export class GroupByUserArgs {
    @Field(() => UserWhereInput, {nullable:true})
    where?: UserWhereInput;

    @Field(() => [UserOrderByInput], {nullable:true})
    orderBy?: Array<UserOrderByInput>;

    @Field(() => [UserScalarFieldEnum], {nullable:false})
    by!: Array<UserScalarFieldEnum>;

    @Field(() => UserScalarWhereWithAggregatesInput, {nullable:true})
    having?: UserScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => UserCountAggregateInput, {nullable:true})
    count?: UserCountAggregateInput;

    @Field(() => UserMinAggregateInput, {nullable:true})
    min?: UserMinAggregateInput;

    @Field(() => UserMaxAggregateInput, {nullable:true})
    max?: UserMaxAggregateInput;
}
