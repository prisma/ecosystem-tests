import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { NestedStringNullableWithAggregatesFilter } from './nested-string-nullable-with-aggregates-filter.input';
import { NestedIntNullableFilter } from './nested-int-nullable-filter.input';
import { NestedStringNullableFilter } from './nested-string-nullable-filter.input';

@InputType()
export class StringNullableWithAggregatesFilter {
    @Field(() => String, {nullable:true})
    equals?: string;

    @Field(() => [String], {nullable:true})
    in?: Array<string>;

    @Field(() => [String], {nullable:true})
    notIn?: Array<string>;

    @Field(() => String, {nullable:true})
    lt?: string;

    @Field(() => String, {nullable:true})
    lte?: string;

    @Field(() => String, {nullable:true})
    gt?: string;

    @Field(() => String, {nullable:true})
    gte?: string;

    @Field(() => String, {nullable:true})
    contains?: string;

    @Field(() => String, {nullable:true})
    startsWith?: string;

    @Field(() => String, {nullable:true})
    endsWith?: string;

    @Field(() => NestedStringNullableWithAggregatesFilter, {nullable:true})
    not?: NestedStringNullableWithAggregatesFilter;

    @Field(() => NestedIntNullableFilter, {nullable:true})
    count?: NestedIntNullableFilter;

    @Field(() => NestedStringNullableFilter, {nullable:true})
    min?: NestedStringNullableFilter;

    @Field(() => NestedStringNullableFilter, {nullable:true})
    max?: NestedStringNullableFilter;
}
