import { registerEnumType } from '@nestjs/graphql';

export enum UserScalarFieldEnum {
    id = "id",
    email = "email",
    name = "name"
}

registerEnumType(UserScalarFieldEnum, { name: 'UserScalarFieldEnum' })
