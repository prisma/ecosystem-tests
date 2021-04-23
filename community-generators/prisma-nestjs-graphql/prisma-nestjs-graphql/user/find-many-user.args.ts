import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where.input';
import { UserOrderByInput } from './user-order-by.input';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Int } from '@nestjs/graphql';
import { UserScalarFieldEnum } from './user-scalar-field.enum';

@ArgsType()
export class FindManyUserArgs {
    @Field(() => UserWhereInput, {nullable:true})
    where?: UserWhereInput;

    @Field(() => [UserOrderByInput], {nullable:true})
    orderBy?: Array<UserOrderByInput>;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    cursor?: UserWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [UserScalarFieldEnum], {nullable:true})
    distinct?: Array<UserScalarFieldEnum>;
}
