import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { UserCountAggregate } from './user-count-aggregate.output';
import { UserMinAggregate } from './user-min-aggregate.output';
import { UserMaxAggregate } from './user-max-aggregate.output';

@ObjectType()
export class AggregateUser {
    @Field(() => UserCountAggregate, {nullable:true})
    count?: UserCountAggregate;

    @Field(() => UserMinAggregate, {nullable:true})
    min?: UserMinAggregate;

    @Field(() => UserMaxAggregate, {nullable:true})
    max?: UserMaxAggregate;
}
