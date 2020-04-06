import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }

/**
 * Query Engine version: d003ea1ee7d23f9a35e696130abafdc556accade
 * Prisma Client JS version: 2.0.0-alpha.1033
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}


declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export declare type TrueKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string, collectTimestamps?: any): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/


export type Datasources = {
  db?: string
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  datasources?: Datasources

  /**
   * @default "pretty"
   */
  errorFormat?: ErrorFormat

  log?: Array<LogLevel | LogDefinition>

  /**
   * You probably don't want to use this. `__internal` is used by internal tooling.
   */
  __internal?: {
    debug?: boolean
    hooks?: Hooks
    engine?: {
      cwd?: string
      binaryPath?: string
    }
    measurePerformance?: boolean
  }

  /**
   * Useful for pgbouncer
   */
  forceTransactions?: boolean
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends Array<LogLevel | LogDefinition>> = GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]>

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
 */
export declare class PrismaClient<T extends PrismaClientOptions = {}, U = keyof T extends 'log' ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
   */
  constructor(optionsArg?: T);
  on<V extends U>(eventType: V, callback: V extends never ? never : (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  connect(): Promise<void>;
  /**
   * @private
   */
  private runDisconnect;
  /**
   * Disconnect from the database
   */
  disconnect(): Promise<any>;
  /**
   * Makes a raw query
   * @example
   * ```
   * // Fetch all entries from the `User` table
   * const result = await prisma.raw`SELECT * FROM User;`
   * // Or
   * const result = await prisma.raw('SELECT * FROM User;')
   * 
   * // With parameters use prisma.raw``, values will be escaped automatically
   * const userId = '1'
   * const result = await prisma.raw`SELECT * FROM User WHERE id = ${userId};`
  * ```
  * 
  * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md#raw-database-access).
  */
  raw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): UserDelegate;

  /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): PostDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const OrderByArg: {
  asc: 'asc',
  desc: 'desc'
};

export declare type OrderByArg = (typeof OrderByArg)[keyof typeof OrderByArg]



/**
 * Model User
 */

export type User = {
  id: string
  email: string
  name: string | null
}

export type UserSelect = {
  id?: boolean
  email?: boolean
  name?: boolean
  posts?: boolean | FindManyPostArgs
}

export type UserInclude = {
  posts?: boolean | FindManyPostArgs
}

export type UserGetPayload<
  S extends boolean | null | undefined | UserArgs,
  U = keyof S
> = S extends true
  ? User
  : S extends undefined
  ? never
  : S extends UserArgs
  ? 'include' extends U
    ? User  & {
      [P in TrueKeys<S['include']>]:
      P extends 'posts'
      ? Array<PostGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof User ? User[P]
: 
      P extends 'posts'
      ? Array<PostGetPayload<S['select'][P]>> : never
    }
  : User
: User


export interface UserDelegate {
  /**
   * Find zero or one User.
   * @param {FindOneUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneUserArgs>(
    args: Subset<T, FindOneUserArgs>
  ): CheckSelect<T, UserClient<User | null>, UserClient<UserGetPayload<T> | null>>
  /**
   * Find zero or more Users.
   * @param {FindManyUserArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Users
   * const users = await prisma.user.findMany()
   * 
   * // Get first 10 Users
   * const users = await prisma.user.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyUserArgs>(
    args?: Subset<T, FindManyUserArgs>
  ): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>
  /**
   * Create a User.
   * @param {UserCreateArgs} args - Arguments to create a User.
   * @example
   * // Create one User
   * const user = await prisma.user.create({
   *   data: {
   *     // ... data to create a User
   *   }
   * })
   * 
  **/
  create<T extends UserCreateArgs>(
    args: Subset<T, UserCreateArgs>
  ): CheckSelect<T, UserClient<User>, UserClient<UserGetPayload<T>>>
  /**
   * Delete a User.
   * @param {UserDeleteArgs} args - Arguments to delete one User.
   * @example
   * // Delete one User
   * const user = await prisma.user.delete({
   *   where: {
   *     // ... filter to delete one User
   *   }
   * })
   * 
  **/
  delete<T extends UserDeleteArgs>(
    args: Subset<T, UserDeleteArgs>
  ): CheckSelect<T, UserClient<User>, UserClient<UserGetPayload<T>>>
  /**
   * Update one User.
   * @param {UserUpdateArgs} args - Arguments to update one User.
   * @example
   * // Update one User
   * const user = await prisma.user.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provider data here
   *   }
   * })
   * 
  **/
  update<T extends UserUpdateArgs>(
    args: Subset<T, UserUpdateArgs>
  ): CheckSelect<T, UserClient<User>, UserClient<UserGetPayload<T>>>
  /**
   * Delete zero or more Users.
   * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
   * @example
   * // Delete a few Users
   * const { count } = await prisma.user.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends UserDeleteManyArgs>(
    args: Subset<T, UserDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Users.
   * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Users
   * const user = await prisma.user.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provider data here
   *   }
   * })
   * 
  **/
  updateMany<T extends UserUpdateManyArgs>(
    args: Subset<T, UserUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one User.
   * @param {UserUpsertArgs} args - Arguments to update or create a User.
   * @example
   * // Update or create a User
   * const user = await prisma.user.upsert({
   *   create: {
   *     // ... data to create a User
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the User we want to update
   *   }
   * })
  **/
  upsert<T extends UserUpsertArgs>(
    args: Subset<T, UserUpsertArgs>
  ): CheckSelect<T, UserClient<User>, UserClient<UserGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyUserArgs, 'select' | 'include'>): Promise<number>
}

export declare class UserClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  posts<T extends FindManyPostArgs = {}>(args?: Subset<T, FindManyPostArgs>): CheckSelect<T, Promise<Array<Post>>, Promise<Array<PostGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * User findOne
 */
export type FindOneUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which User to fetch.
  **/
  where: UserWhereUniqueInput
}


/**
 * User findMany
 */
export type FindManyUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which Users to fetch.
  **/
  where?: UserWhereInput | null
  /**
   * Determine the order of the Users to fetch.
  **/
  orderBy?: UserOrderByInput | null
  /**
   * Skip the first `n` Users.
  **/
  skip?: number | null
  /**
   * Get all Users that come after the User you provide with the current order.
  **/
  after?: UserWhereUniqueInput | null
  /**
   * Get all Users that come before the User you provide with the current order.
  **/
  before?: UserWhereUniqueInput | null
  /**
   * Get the first `n` Users.
  **/
  first?: number | null
  /**
   * Get the last `n` Users.
  **/
  last?: number | null
}


/**
 * User create
 */
export type UserCreateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to create a User.
  **/
  data: UserCreateInput
}


/**
 * User update
 */
export type UserUpdateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to update a User.
  **/
  data: UserUpdateInput
  /**
   * Choose, which User to update.
  **/
  where: UserWhereUniqueInput
}


/**
 * User updateMany
 */
export type UserUpdateManyArgs = {
  data: UserUpdateManyMutationInput
  where?: UserWhereInput | null
}


/**
 * User upsert
 */
export type UserUpsertArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The filter to search for the User to update in case it exists.
  **/
  where: UserWhereUniqueInput
  /**
   * In case the User found by the `where` argument doesn't exist, create a new User with this data.
  **/
  create: UserCreateInput
  /**
   * In case the User was found with the provided `where` argument, update it with this data.
  **/
  update: UserUpdateInput
}


/**
 * User delete
 */
export type UserDeleteArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter which User to delete.
  **/
  where: UserWhereUniqueInput
}


/**
 * User deleteMany
 */
export type UserDeleteManyArgs = {
  where?: UserWhereInput | null
}


/**
 * User without action
 */
export type UserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
}



/**
 * Model Post
 */

export type Post = {
  id: string
  createdAt: Date
  updatedAt: Date
  published: boolean
  title: string
  content: string | null
}

export type PostSelect = {
  id?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  published?: boolean
  title?: boolean
  content?: boolean
  author?: boolean | UserArgs
}

export type PostInclude = {
  author?: boolean | UserArgs
}

export type PostGetPayload<
  S extends boolean | null | undefined | PostArgs,
  U = keyof S
> = S extends true
  ? Post
  : S extends undefined
  ? never
  : S extends PostArgs
  ? 'include' extends U
    ? Post  & {
      [P in TrueKeys<S['include']>]:
      P extends 'author'
      ? UserGetPayload<S['include'][P]> | null : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Post ? Post[P]
: 
      P extends 'author'
      ? UserGetPayload<S['select'][P]> | null : never
    }
  : Post
: Post


export interface PostDelegate {
  /**
   * Find zero or one Post.
   * @param {FindOnePostArgs} args - Arguments to find a Post
   * @example
   * // Get one Post
   * const post = await prisma.post.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnePostArgs>(
    args: Subset<T, FindOnePostArgs>
  ): CheckSelect<T, PostClient<Post | null>, PostClient<PostGetPayload<T> | null>>
  /**
   * Find zero or more Posts.
   * @param {FindManyPostArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Posts
   * const posts = await prisma.post.findMany()
   * 
   * // Get first 10 Posts
   * const posts = await prisma.post.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyPostArgs>(
    args?: Subset<T, FindManyPostArgs>
  ): CheckSelect<T, Promise<Array<Post>>, Promise<Array<PostGetPayload<T>>>>
  /**
   * Create a Post.
   * @param {PostCreateArgs} args - Arguments to create a Post.
   * @example
   * // Create one Post
   * const user = await prisma.post.create({
   *   data: {
   *     // ... data to create a Post
   *   }
   * })
   * 
  **/
  create<T extends PostCreateArgs>(
    args: Subset<T, PostCreateArgs>
  ): CheckSelect<T, PostClient<Post>, PostClient<PostGetPayload<T>>>
  /**
   * Delete a Post.
   * @param {PostDeleteArgs} args - Arguments to delete one Post.
   * @example
   * // Delete one Post
   * const user = await prisma.post.delete({
   *   where: {
   *     // ... filter to delete one Post
   *   }
   * })
   * 
  **/
  delete<T extends PostDeleteArgs>(
    args: Subset<T, PostDeleteArgs>
  ): CheckSelect<T, PostClient<Post>, PostClient<PostGetPayload<T>>>
  /**
   * Update one Post.
   * @param {PostUpdateArgs} args - Arguments to update one Post.
   * @example
   * // Update one Post
   * const post = await prisma.post.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provider data here
   *   }
   * })
   * 
  **/
  update<T extends PostUpdateArgs>(
    args: Subset<T, PostUpdateArgs>
  ): CheckSelect<T, PostClient<Post>, PostClient<PostGetPayload<T>>>
  /**
   * Delete zero or more Posts.
   * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
   * @example
   * // Delete a few Posts
   * const { count } = await prisma.post.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends PostDeleteManyArgs>(
    args: Subset<T, PostDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Posts.
   * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Posts
   * const post = await prisma.post.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provider data here
   *   }
   * })
   * 
  **/
  updateMany<T extends PostUpdateManyArgs>(
    args: Subset<T, PostUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Post.
   * @param {PostUpsertArgs} args - Arguments to update or create a Post.
   * @example
   * // Update or create a Post
   * const post = await prisma.post.upsert({
   *   create: {
   *     // ... data to create a Post
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Post we want to update
   *   }
   * })
  **/
  upsert<T extends PostUpsertArgs>(
    args: Subset<T, PostUpsertArgs>
  ): CheckSelect<T, PostClient<Post>, PostClient<PostGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyPostArgs, 'select' | 'include'>): Promise<number>
}

export declare class PostClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  author<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, UserClient<User | null>, UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Post findOne
 */
export type FindOnePostArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * Filter, which Post to fetch.
  **/
  where: PostWhereUniqueInput
}


/**
 * Post findMany
 */
export type FindManyPostArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * Filter, which Posts to fetch.
  **/
  where?: PostWhereInput | null
  /**
   * Determine the order of the Posts to fetch.
  **/
  orderBy?: PostOrderByInput | null
  /**
   * Skip the first `n` Posts.
  **/
  skip?: number | null
  /**
   * Get all Posts that come after the Post you provide with the current order.
  **/
  after?: PostWhereUniqueInput | null
  /**
   * Get all Posts that come before the Post you provide with the current order.
  **/
  before?: PostWhereUniqueInput | null
  /**
   * Get the first `n` Posts.
  **/
  first?: number | null
  /**
   * Get the last `n` Posts.
  **/
  last?: number | null
}


/**
 * Post create
 */
export type PostCreateArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * The data needed to create a Post.
  **/
  data: PostCreateInput
}


/**
 * Post update
 */
export type PostUpdateArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * The data needed to update a Post.
  **/
  data: PostUpdateInput
  /**
   * Choose, which Post to update.
  **/
  where: PostWhereUniqueInput
}


/**
 * Post updateMany
 */
export type PostUpdateManyArgs = {
  data: PostUpdateManyMutationInput
  where?: PostWhereInput | null
}


/**
 * Post upsert
 */
export type PostUpsertArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * The filter to search for the Post to update in case it exists.
  **/
  where: PostWhereUniqueInput
  /**
   * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
  **/
  create: PostCreateInput
  /**
   * In case the Post was found with the provided `where` argument, update it with this data.
  **/
  update: PostUpdateInput
}


/**
 * Post delete
 */
export type PostDeleteArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * Filter which Post to delete.
  **/
  where: PostWhereUniqueInput
}


/**
 * Post deleteMany
 */
export type PostDeleteManyArgs = {
  where?: PostWhereInput | null
}


/**
 * Post without action
 */
export type PostArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
}



/**
 * Deep Input Types
 */


export type PostWhereInput = {
  id?: string | StringFilter | null
  createdAt?: Date | string | DateTimeFilter | null
  updatedAt?: Date | string | DateTimeFilter | null
  published?: boolean | BooleanFilter | null
  title?: string | StringFilter | null
  content?: string | NullableStringFilter | null
  AND?: Enumerable<PostWhereInput> | null
  OR?: Enumerable<PostWhereInput> | null
  NOT?: Enumerable<PostWhereInput> | null
  author?: UserWhereInput | null
}

export type UserWhereInput = {
  id?: string | StringFilter | null
  email?: string | StringFilter | null
  name?: string | NullableStringFilter | null
  posts?: PostFilter | null
  AND?: Enumerable<UserWhereInput> | null
  OR?: Enumerable<UserWhereInput> | null
  NOT?: Enumerable<UserWhereInput> | null
}

export type UserWhereUniqueInput = {
  id?: string | null
  email?: string | null
}

export type PostWhereUniqueInput = {
  id?: string | null
}

export type PostCreateWithoutAuthorInput = {
  id?: string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  published?: boolean | null
  title: string
  content?: string | null
}

export type PostCreateManyWithoutAuthorInput = {
  create?: Enumerable<PostCreateWithoutAuthorInput> | null
  connect?: Enumerable<PostWhereUniqueInput> | null
}

export type UserCreateInput = {
  id?: string | null
  email: string
  name?: string | null
  posts?: PostCreateManyWithoutAuthorInput | null
}

export type PostUpdateWithoutAuthorDataInput = {
  id?: string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  published?: boolean | null
  title?: string | null
  content?: string | null
}

export type PostUpdateWithWhereUniqueWithoutAuthorInput = {
  where: PostWhereUniqueInput
  data: PostUpdateWithoutAuthorDataInput
}

export type PostScalarWhereInput = {
  id?: string | StringFilter | null
  createdAt?: Date | string | DateTimeFilter | null
  updatedAt?: Date | string | DateTimeFilter | null
  published?: boolean | BooleanFilter | null
  title?: string | StringFilter | null
  content?: string | NullableStringFilter | null
  AND?: Enumerable<PostScalarWhereInput> | null
  OR?: Enumerable<PostScalarWhereInput> | null
  NOT?: Enumerable<PostScalarWhereInput> | null
}

export type PostUpdateManyDataInput = {
  id?: string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  published?: boolean | null
  title?: string | null
  content?: string | null
}

export type PostUpdateManyWithWhereNestedInput = {
  where: PostScalarWhereInput
  data: PostUpdateManyDataInput
}

export type PostUpsertWithWhereUniqueWithoutAuthorInput = {
  where: PostWhereUniqueInput
  update: PostUpdateWithoutAuthorDataInput
  create: PostCreateWithoutAuthorInput
}

export type PostUpdateManyWithoutAuthorInput = {
  create?: Enumerable<PostCreateWithoutAuthorInput> | null
  connect?: Enumerable<PostWhereUniqueInput> | null
  set?: Enumerable<PostWhereUniqueInput> | null
  disconnect?: Enumerable<PostWhereUniqueInput> | null
  delete?: Enumerable<PostWhereUniqueInput> | null
  update?: Enumerable<PostUpdateWithWhereUniqueWithoutAuthorInput> | null
  updateMany?: Enumerable<PostUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<PostScalarWhereInput> | null
  upsert?: Enumerable<PostUpsertWithWhereUniqueWithoutAuthorInput> | null
}

export type UserUpdateInput = {
  id?: string | null
  email?: string | null
  name?: string | null
  posts?: PostUpdateManyWithoutAuthorInput | null
}

export type UserUpdateManyMutationInput = {
  id?: string | null
  email?: string | null
  name?: string | null
}

export type UserCreateWithoutPostsInput = {
  id?: string | null
  email: string
  name?: string | null
}

export type UserCreateOneWithoutPostsInput = {
  create?: UserCreateWithoutPostsInput | null
  connect?: UserWhereUniqueInput | null
}

export type PostCreateInput = {
  id?: string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  published?: boolean | null
  title: string
  content?: string | null
  author?: UserCreateOneWithoutPostsInput | null
}

export type UserUpdateWithoutPostsDataInput = {
  id?: string | null
  email?: string | null
  name?: string | null
}

export type UserUpsertWithoutPostsInput = {
  update: UserUpdateWithoutPostsDataInput
  create: UserCreateWithoutPostsInput
}

export type UserUpdateOneWithoutPostsInput = {
  create?: UserCreateWithoutPostsInput | null
  connect?: UserWhereUniqueInput | null
  disconnect?: boolean | null
  delete?: boolean | null
  update?: UserUpdateWithoutPostsDataInput | null
  upsert?: UserUpsertWithoutPostsInput | null
}

export type PostUpdateInput = {
  id?: string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  published?: boolean | null
  title?: string | null
  content?: string | null
  author?: UserUpdateOneWithoutPostsInput | null
}

export type PostUpdateManyMutationInput = {
  id?: string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  published?: boolean | null
  title?: string | null
  content?: string | null
}

export type StringFilter = {
  equals?: string | null
  not?: string | StringFilter | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string | null
  lte?: string | null
  gt?: string | null
  gte?: string | null
  contains?: string | null
  startsWith?: string | null
  endsWith?: string | null
}

export type DateTimeFilter = {
  equals?: Date | string | null
  not?: Date | string | DateTimeFilter | null
  in?: Enumerable<Date | string> | null
  notIn?: Enumerable<Date | string> | null
  lt?: Date | string | null
  lte?: Date | string | null
  gt?: Date | string | null
  gte?: Date | string | null
}

export type BooleanFilter = {
  equals?: boolean | null
  not?: boolean | BooleanFilter | null
}

export type NullableStringFilter = {
  equals?: string | null
  not?: string | null | NullableStringFilter
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string | null
  lte?: string | null
  gt?: string | null
  gte?: string | null
  contains?: string | null
  startsWith?: string | null
  endsWith?: string | null
}

export type PostFilter = {
  every?: PostWhereInput | null
  some?: PostWhereInput | null
  none?: PostWhereInput | null
}

export type UserOrderByInput = {
  id?: OrderByArg | null
  email?: OrderByArg | null
  name?: OrderByArg | null
}

export type PostOrderByInput = {
  id?: OrderByArg | null
  createdAt?: OrderByArg | null
  updatedAt?: OrderByArg | null
  published?: OrderByArg | null
  title?: OrderByArg | null
  content?: OrderByArg | null
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
