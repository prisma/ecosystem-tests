import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class UserOrderByInput {
    @Field(() => SortOrder, {nullable:true})
    id?: SortOrder;

    @Field(() => SortOrder, {nullable:true})
    email?: SortOrder;

    @Field(() => SortOrder, {nullable:true})
    name?: SortOrder;
}
