import { objectType } from 'nexus'

export const User = objectType({
  name: 'User',

  definition(t) {
    t.model.id()
    t.model.name()
  }
})

/*
export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id")
    t.nonNull.string("name")
  }
})
*/
