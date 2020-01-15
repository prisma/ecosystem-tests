"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runtime_1 = require("./runtime");
/**
 * Query Engine version: latest
 */
const path = require("path");
const debug = runtime_1.debugLib('photon');
/**
 * A PhotonRequestError is an error that is thrown in conjunction to a concrete query that has been performed with Photon.js.
 */
class PhotonRequestError extends Error {
    constructor(message, code, meta) {
        super(message);
        this.message = message;
        this.code = code;
        this.meta = meta;
        this.code = code;
        this.meta = meta;
    }
}
exports.PhotonRequestError = PhotonRequestError;
class PhotonFetcher {
    constructor(photon, debug = false, hooks) {
        this.photon = photon;
        this.debug = debug;
        this.hooks = hooks;
    }
    async request(document, dataPath = [], rootField, typeName, isList, callsite, collectTimestamps) {
        const query = String(document);
        debug('Request:');
        debug(query);
        if (this.hooks && this.hooks.beforeRequest) {
            this.hooks.beforeRequest({ query, path: dataPath, rootField, typeName, document });
        }
        try {
            collectTimestamps && collectTimestamps.record("Pre-photonConnect");
            await this.photon.connect();
            collectTimestamps && collectTimestamps.record("Post-photonConnect");
            collectTimestamps && collectTimestamps.record("Pre-engine_request");
            const result = await this.photon.engine.request(query, collectTimestamps);
            collectTimestamps && collectTimestamps.record("Post-engine_request");
            debug('Response:');
            debug(result);
            collectTimestamps && collectTimestamps.record("Pre-unpack");
            const unpackResult = this.unpack(document, result, dataPath, rootField, isList);
            collectTimestamps && collectTimestamps.record("Post-unpack");
            return unpackResult;
        }
        catch (e) {
            debug(e.stack);
            if (callsite) {
                const { stack } = runtime_1.printStack({
                    callsite,
                    originalMethod: dataPath.join('.'),
                    onUs: e.isPanic
                });
                const message = stack + '\n\n' + e.message;
                if (e.code) {
                    throw new PhotonRequestError(this.sanitizeMessage(message), e.code, e.meta);
                }
                throw new Error(this.sanitizeMessage(message));
            }
            else {
                if (e.code) {
                    throw new PhotonRequestError(this.sanitizeMessage(e.message), e.code, e.meta);
                }
                if (e.isPanic) {
                    throw e;
                }
                else {
                    throw new Error(this.sanitizeMessage(e.message));
                }
            }
        }
    }
    sanitizeMessage(message) {
        if (this.photon.errorFormat && this.photon.errorFormat !== 'pretty') {
            return runtime_1.stripAnsi(message);
        }
        return message;
    }
    unpack(document, data, path, rootField, isList) {
        const getPath = [];
        if (rootField) {
            getPath.push(rootField);
        }
        getPath.push(...path.filter(p => p !== 'select' && p !== 'include'));
        return runtime_1.unpack({ document, data, path: getPath });
    }
}
class CollectTimestamps {
    constructor(startName) {
        this.records = [];
        this.start = undefined;
        this.additionalResults = {};
        this.start = { name: startName, value: process.hrtime() };
    }
    record(name) {
        this.records.push({ name, value: process.hrtime() });
    }
    elapsed(start, end) {
        const diff = [end[0] - start[0], end[1] - start[1]];
        const nanoseconds = (diff[0] * 1e9) + diff[1];
        const milliseconds = nanoseconds / 1e6;
        return milliseconds;
    }
    addResults(results) {
        Object.assign(this.additionalResults, results);
    }
    getResults() {
        const results = this.records.reduce((acc, record) => {
            const name = record.name.split('-')[1];
            if (acc[name]) {
                acc[name] = this.elapsed(acc[name], record.value);
            }
            else {
                acc[name] = record.value;
            }
            return acc;
        }, {});
        Object.assign(results, {
            total: this.elapsed(this.start.value, this.records[this.records.length - 1].value),
            ...this.additionalResults
        });
        return results;
    }
}
/**
 * Build tool annotations
 * In order to make `ncc` and `node-file-trace` happy.
**/
path.join(__dirname, 'runtime/query-engine-darwin');
path.join(__dirname, 'runtime/query-engine-rhel-openssl-1.0.x');
/* End Types for Logging */
class Photon {
    constructor(optionsArg) {
        const options = optionsArg || {};
        const useDebug = options.debug === true ? true : typeof options.debug === 'object' ? Boolean(options.debug.library) : false;
        if (useDebug) {
            runtime_1.debugLib.enable('photon');
        }
        const debugEngine = options.debug === true ? true : typeof options.debug === 'object' ? Boolean(options.debug.engine) : false;
        // datamodel = datamodel without datasources + printed datasources
        const predefinedDatasources = [];
        const inputDatasources = Object.entries(options.datasources || {}).map(([name, url]) => ({ name, url: url }));
        const datasources = runtime_1.mergeBy(predefinedDatasources, inputDatasources, (source) => source.name);
        const internal = options.__internal || {};
        const engineConfig = internal.engine || {};
        if (options.errorFormat) {
            this.errorFormat = options.errorFormat;
        }
        else if (process.env.NODE_ENV === 'production') {
            this.errorFormat = 'minimal';
        }
        else if (process.env.NO_COLOR) {
            this.errorFormat = 'colorless';
        }
        else {
            this.errorFormat = 'pretty';
        }
        this.measurePerformance = internal.measurePerformance || false;
        this.engineConfig = {
            cwd: engineConfig.cwd || path.resolve(__dirname, ".."),
            debug: debugEngine,
            datamodelPath: path.resolve(__dirname, 'schema.prisma'),
            prismaPath: engineConfig.binaryPath || undefined,
            datasources,
            generator: { "name": "photon", "provider": "photonjs", "output": "/Users/divyendusingh/Documents/prisma/prisma2-e2e-tests/platforms/heroku/prisma/photonjs", "binaryTargets": ["native", "rhel-openssl-1.0.x"], "config": {} },
            showColors: this.errorFormat === 'pretty'
        };
        this.engine = new runtime_1.Engine(this.engineConfig);
        this.dmmf = new runtime_1.DMMFClass(exports.dmmf);
        this.fetcher = new PhotonFetcher(this, false, internal.hooks);
    }
    on(eventType, callback) {
        setTimeout(() => {
            callback({ eventType });
        }, 1000);
    }
    async connect() {
        if (this.disconnectionPromise) {
            debug('awaiting disconnection promise');
            await this.disconnectionPromise;
        }
        else {
            debug('disconnection promise doesnt exist');
        }
        if (this.connectionPromise) {
            return this.connectionPromise;
        }
        this.connectionPromise = this.engine.start();
        return this.connectionPromise;
    }
    async runDisconnect() {
        debug('disconnectionPromise: stopping engine');
        await this.engine.stop();
        delete this.connectionPromise;
        this.engine = new runtime_1.Engine(this.engineConfig);
        delete this.disconnectionPromise;
    }
    async disconnect() {
        if (!this.disconnectionPromise) {
            this.disconnectionPromise = this.runDisconnect();
        }
        return this.disconnectionPromise;
    }
    get users() {
        return UserDelegate(this.dmmf, this.fetcher, this.errorFormat, this.measurePerformance);
    }
    get posts() {
        return PostDelegate(this.dmmf, this.fetcher, this.errorFormat, this.measurePerformance);
    }
}
exports.Photon = Photon;
/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }
exports.OrderByArg = makeEnum({
    asc: 'asc',
    desc: 'desc'
});
function UserDelegate(dmmf, fetcher, errorFormat, measurePerformance) {
    const User = (args) => new UserClient(dmmf, fetcher, 'query', 'findManyUser', 'users', args, [], errorFormat, measurePerformance);
    User.findOne = (args) => args.select ? new UserClient(dmmf, fetcher, 'query', 'findOneUser', 'users.findOne', args, [], errorFormat, measurePerformance) : new UserClient(dmmf, fetcher, 'query', 'findOneUser', 'users.findOne', args, [], errorFormat, measurePerformance);
    User.findMany = (args) => new UserClient(dmmf, fetcher, 'query', 'findManyUser', 'users.findMany', args, [], errorFormat, measurePerformance);
    User.create = (args) => args.select ? new UserClient(dmmf, fetcher, 'mutation', 'createOneUser', 'users.create', args, [], errorFormat, measurePerformance) : new UserClient(dmmf, fetcher, 'mutation', 'createOneUser', 'users.create', args, [], errorFormat, measurePerformance);
    User.delete = (args) => args.select ? new UserClient(dmmf, fetcher, 'mutation', 'deleteOneUser', 'users.delete', args, [], errorFormat, measurePerformance) : new UserClient(dmmf, fetcher, 'mutation', 'deleteOneUser', 'users.delete', args, [], errorFormat, measurePerformance);
    User.update = (args) => args.select ? new UserClient(dmmf, fetcher, 'mutation', 'updateOneUser', 'users.update', args, [], errorFormat, measurePerformance) : new UserClient(dmmf, fetcher, 'mutation', 'updateOneUser', 'users.update', args, [], errorFormat, measurePerformance);
    User.deleteMany = (args) => new UserClient(dmmf, fetcher, 'mutation', 'deleteManyUser', 'users.deleteMany', args, [], errorFormat, measurePerformance);
    User.updateMany = (args) => new UserClient(dmmf, fetcher, 'mutation', 'updateManyUser', 'users.updateMany', args, [], errorFormat, measurePerformance);
    User.upsert = (args) => args.select ? new UserClient(dmmf, fetcher, 'mutation', 'upsertOneUser', 'users.upsert', args, [], errorFormat, measurePerformance) : new UserClient(dmmf, fetcher, 'mutation', 'upsertOneUser', 'users.upsert', args, [], errorFormat, measurePerformance);
    User.count = () => new UserClient(dmmf, fetcher, 'query', 'aggregateUser', 'users.count', {}, ['count'], errorFormat);
    return User; // any needed because of https://github.com/microsoft/TypeScript/issues/31335
}
class UserClient {
    constructor(_dmmf, _fetcher, _queryType, _rootField, _clientMethod, _args, _dataPath, _errorFormat, _measurePerformance, _isList = false) {
        this._dmmf = _dmmf;
        this._fetcher = _fetcher;
        this._queryType = _queryType;
        this._rootField = _rootField;
        this._clientMethod = _clientMethod;
        this._args = _args;
        this._dataPath = _dataPath;
        this._errorFormat = _errorFormat;
        this._measurePerformance = _measurePerformance;
        this._isList = _isList;
        if (this._measurePerformance) {
            // Timestamps for performance checks
            this._collectTimestamps = new CollectTimestamps("PhotonClient");
        }
        // @ts-ignore
        if (process.env.NODE_ENV !== 'production' && this._errorFormat !== 'minimal') {
            const error = new Error();
            if (error && error.stack) {
                const stack = error.stack;
                this._callsite = stack;
            }
        }
    }
    posts(args) {
        const prefix = this._dataPath.includes('select') ? 'select' : this._dataPath.includes('include') ? 'include' : 'select';
        const dataPath = [...this._dataPath, prefix, 'posts'];
        const newArgs = runtime_1.deepSet(this._args, dataPath, args || true);
        this._isList = true;
        return new PostClient(this._dmmf, this._fetcher, this._queryType, this._rootField, this._clientMethod, newArgs, dataPath, this._errorFormat, this._measurePerformance, this._isList);
    }
    get _document() {
        const { _rootField: rootField } = this;
        this._collectTimestamps && this._collectTimestamps.record("Pre-makeDocument");
        const document = runtime_1.makeDocument({
            dmmf: this._dmmf,
            rootField,
            rootTypeName: this._queryType,
            select: this._args
        });
        this._collectTimestamps && this._collectTimestamps.record("Post-makeDocument");
        try {
            this._collectTimestamps && this._collectTimestamps.record("Pre-document.validate");
            document.validate(this._args, false, this._clientMethod, this._errorFormat);
            this._collectTimestamps && this._collectTimestamps.record("Post-document.validate");
        }
        catch (e) {
            const x = e;
            if (this._errorFormat !== 'minimal' && x.render) {
                if (this._callsite) {
                    e.message = x.render(this._callsite);
                }
            }
            throw e;
        }
        this._collectTimestamps && this._collectTimestamps.record("Pre-transformDocument");
        const transformedDocument = runtime_1.transformDocument(document);
        this._collectTimestamps && this._collectTimestamps.record("Post-transformDocument");
        return transformedDocument;
    }
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then(onfulfilled, onrejected) {
        if (!this._requestPromise) {
            this._requestPromise = this._fetcher.request(this._document, this._dataPath, this._rootField, 'User', this._isList, this._callsite, this._collectTimestamps);
        }
        return this._requestPromise.then(onfulfilled, onrejected);
    }
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch(onrejected) {
        if (!this._requestPromise) {
            this._requestPromise = this._fetcher.request(this._document, this._dataPath, this._rootField, 'User', this._isList, this._callsite, this._collectTimestamps);
        }
        return this._requestPromise.catch(onrejected);
    }
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally) {
        if (!this._requestPromise) {
            this._requestPromise = this._fetcher.request(this._document, this._dataPath, this._rootField, 'User', this._isList, this._callsite, this._collectTimestamps);
        }
        return this._requestPromise.finally(onfinally);
    }
}
exports.UserClient = UserClient;
function PostDelegate(dmmf, fetcher, errorFormat, measurePerformance) {
    const Post = (args) => new PostClient(dmmf, fetcher, 'query', 'findManyPost', 'posts', args, [], errorFormat, measurePerformance);
    Post.findOne = (args) => args.select ? new PostClient(dmmf, fetcher, 'query', 'findOnePost', 'posts.findOne', args, [], errorFormat, measurePerformance) : new PostClient(dmmf, fetcher, 'query', 'findOnePost', 'posts.findOne', args, [], errorFormat, measurePerformance);
    Post.findMany = (args) => new PostClient(dmmf, fetcher, 'query', 'findManyPost', 'posts.findMany', args, [], errorFormat, measurePerformance);
    Post.create = (args) => args.select ? new PostClient(dmmf, fetcher, 'mutation', 'createOnePost', 'posts.create', args, [], errorFormat, measurePerformance) : new PostClient(dmmf, fetcher, 'mutation', 'createOnePost', 'posts.create', args, [], errorFormat, measurePerformance);
    Post.delete = (args) => args.select ? new PostClient(dmmf, fetcher, 'mutation', 'deleteOnePost', 'posts.delete', args, [], errorFormat, measurePerformance) : new PostClient(dmmf, fetcher, 'mutation', 'deleteOnePost', 'posts.delete', args, [], errorFormat, measurePerformance);
    Post.update = (args) => args.select ? new PostClient(dmmf, fetcher, 'mutation', 'updateOnePost', 'posts.update', args, [], errorFormat, measurePerformance) : new PostClient(dmmf, fetcher, 'mutation', 'updateOnePost', 'posts.update', args, [], errorFormat, measurePerformance);
    Post.deleteMany = (args) => new PostClient(dmmf, fetcher, 'mutation', 'deleteManyPost', 'posts.deleteMany', args, [], errorFormat, measurePerformance);
    Post.updateMany = (args) => new PostClient(dmmf, fetcher, 'mutation', 'updateManyPost', 'posts.updateMany', args, [], errorFormat, measurePerformance);
    Post.upsert = (args) => args.select ? new PostClient(dmmf, fetcher, 'mutation', 'upsertOnePost', 'posts.upsert', args, [], errorFormat, measurePerformance) : new PostClient(dmmf, fetcher, 'mutation', 'upsertOnePost', 'posts.upsert', args, [], errorFormat, measurePerformance);
    Post.count = () => new PostClient(dmmf, fetcher, 'query', 'aggregatePost', 'posts.count', {}, ['count'], errorFormat);
    return Post; // any needed because of https://github.com/microsoft/TypeScript/issues/31335
}
class PostClient {
    constructor(_dmmf, _fetcher, _queryType, _rootField, _clientMethod, _args, _dataPath, _errorFormat, _measurePerformance, _isList = false) {
        this._dmmf = _dmmf;
        this._fetcher = _fetcher;
        this._queryType = _queryType;
        this._rootField = _rootField;
        this._clientMethod = _clientMethod;
        this._args = _args;
        this._dataPath = _dataPath;
        this._errorFormat = _errorFormat;
        this._measurePerformance = _measurePerformance;
        this._isList = _isList;
        if (this._measurePerformance) {
            // Timestamps for performance checks
            this._collectTimestamps = new CollectTimestamps("PhotonClient");
        }
        // @ts-ignore
        if (process.env.NODE_ENV !== 'production' && this._errorFormat !== 'minimal') {
            const error = new Error();
            if (error && error.stack) {
                const stack = error.stack;
                this._callsite = stack;
            }
        }
    }
    author(args) {
        const prefix = this._dataPath.includes('select') ? 'select' : this._dataPath.includes('include') ? 'include' : 'select';
        const dataPath = [...this._dataPath, prefix, 'author'];
        const newArgs = runtime_1.deepSet(this._args, dataPath, args || true);
        this._isList = false;
        return new UserClient(this._dmmf, this._fetcher, this._queryType, this._rootField, this._clientMethod, newArgs, dataPath, this._errorFormat, this._measurePerformance, this._isList);
    }
    get _document() {
        const { _rootField: rootField } = this;
        this._collectTimestamps && this._collectTimestamps.record("Pre-makeDocument");
        const document = runtime_1.makeDocument({
            dmmf: this._dmmf,
            rootField,
            rootTypeName: this._queryType,
            select: this._args
        });
        this._collectTimestamps && this._collectTimestamps.record("Post-makeDocument");
        try {
            this._collectTimestamps && this._collectTimestamps.record("Pre-document.validate");
            document.validate(this._args, false, this._clientMethod, this._errorFormat);
            this._collectTimestamps && this._collectTimestamps.record("Post-document.validate");
        }
        catch (e) {
            const x = e;
            if (this._errorFormat !== 'minimal' && x.render) {
                if (this._callsite) {
                    e.message = x.render(this._callsite);
                }
            }
            throw e;
        }
        this._collectTimestamps && this._collectTimestamps.record("Pre-transformDocument");
        const transformedDocument = runtime_1.transformDocument(document);
        this._collectTimestamps && this._collectTimestamps.record("Post-transformDocument");
        return transformedDocument;
    }
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then(onfulfilled, onrejected) {
        if (!this._requestPromise) {
            this._requestPromise = this._fetcher.request(this._document, this._dataPath, this._rootField, 'Post', this._isList, this._callsite, this._collectTimestamps);
        }
        return this._requestPromise.then(onfulfilled, onrejected);
    }
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch(onrejected) {
        if (!this._requestPromise) {
            this._requestPromise = this._fetcher.request(this._document, this._dataPath, this._rootField, 'Post', this._isList, this._callsite, this._collectTimestamps);
        }
        return this._requestPromise.catch(onrejected);
    }
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally) {
        if (!this._requestPromise) {
            this._requestPromise = this._fetcher.request(this._document, this._dataPath, this._rootField, 'Post', this._isList, this._callsite, this._collectTimestamps);
        }
        return this._requestPromise.finally(onfinally);
    }
}
exports.PostClient = PostClient;
/**
 * DMMF
 */
exports.dmmf = { "datamodel": { "enums": [], "models": [{ "name": "User", "isEmbedded": false, "dbName": null, "fields": [{ "name": "id", "kind": "scalar", "dbName": null, "isList": false, "isRequired": true, "isUnique": false, "isId": true, "type": "String", "default": { "name": "cuid", "returnType": "String", "args": [] }, "isGenerated": false, "isUpdatedAt": false }, { "name": "email", "kind": "scalar", "dbName": null, "isList": false, "isRequired": true, "isUnique": true, "isId": false, "type": "String", "isGenerated": false, "isUpdatedAt": false }, { "name": "name", "kind": "scalar", "dbName": null, "isList": false, "isRequired": false, "isUnique": false, "isId": false, "type": "String", "isGenerated": false, "isUpdatedAt": false }, { "name": "posts", "kind": "object", "dbName": null, "isList": true, "isRequired": false, "isUnique": false, "isId": false, "type": "Post", "relationName": "PostToUser", "relationToFields": [], "relationOnDelete": "NONE", "isGenerated": false, "isUpdatedAt": false }], "isGenerated": false, "idFields": [] }, { "name": "Post", "isEmbedded": false, "dbName": null, "fields": [{ "name": "id", "kind": "scalar", "dbName": null, "isList": false, "isRequired": true, "isUnique": false, "isId": true, "type": "String", "default": { "name": "cuid", "returnType": "String", "args": [] }, "isGenerated": false, "isUpdatedAt": false }, { "name": "createdAt", "kind": "scalar", "dbName": null, "isList": false, "isRequired": true, "isUnique": false, "isId": false, "type": "DateTime", "default": { "name": "now", "returnType": "DateTime", "args": [] }, "isGenerated": false, "isUpdatedAt": false }, { "name": "updatedAt", "kind": "scalar", "dbName": null, "isList": false, "isRequired": true, "isUnique": false, "isId": false, "type": "DateTime", "isGenerated": false, "isUpdatedAt": true }, { "name": "published", "kind": "scalar", "dbName": null, "isList": false, "isRequired": true, "isUnique": false, "isId": false, "type": "Boolean", "default": true, "isGenerated": false, "isUpdatedAt": false }, { "name": "title", "kind": "scalar", "dbName": null, "isList": false, "isRequired": true, "isUnique": false, "isId": false, "type": "String", "isGenerated": false, "isUpdatedAt": false }, { "name": "content", "kind": "scalar", "dbName": null, "isList": false, "isRequired": false, "isUnique": false, "isId": false, "type": "String", "isGenerated": false, "isUpdatedAt": false }, { "name": "author", "kind": "object", "dbName": null, "isList": false, "isRequired": false, "isUnique": false, "isId": false, "type": "User", "relationName": "PostToUser", "relationToFields": ["id"], "relationOnDelete": "NONE", "isGenerated": false, "isUpdatedAt": false }], "isGenerated": false, "idFields": [] }] }, "mappings": [{ "model": "User", "plural": "users", "findOne": "findOneUser", "findMany": "findManyUser", "create": "createOneUser", "delete": "deleteOneUser", "update": "updateOneUser", "deleteMany": "deleteManyUser", "updateMany": "updateManyUser", "upsert": "upsertOneUser", "aggregate": "aggregateUser" }, { "model": "Post", "plural": "posts", "findOne": "findOnePost", "findMany": "findManyPost", "create": "createOnePost", "delete": "deleteOnePost", "update": "updateOnePost", "deleteMany": "deleteManyPost", "updateMany": "updateManyPost", "upsert": "upsertOnePost", "aggregate": "aggregatePost" }], "schema": { "enums": [{ "name": "OrderByArg", "values": ["asc", "desc"] }], "outputTypes": [{ "name": "Post", "fields": [{ "name": "id", "args": [], "outputType": { "type": "String", "kind": "scalar", "isRequired": true, "isList": false } }, { "name": "createdAt", "args": [], "outputType": { "type": "DateTime", "kind": "scalar", "isRequired": true, "isList": false } }, { "name": "updatedAt", "args": [], "outputType": { "type": "DateTime", "kind": "scalar", "isRequired": true, "isList": false } }, { "name": "published", "args": [], "outputType": { "type": "Boolean", "kind": "scalar", "isRequired": true, "isList": false } }, { "name": "title", "args": [], "outputType": { "type": "String", "kind": "scalar", "isRequired": true, "isList": false } }, { "name": "content", "args": [], "outputType": { "type": "String", "kind": "scalar", "isRequired": false, "isList": false } }, { "name": "author", "args": [], "outputType": { "type": "User", "kind": "object", "isRequired": false, "isList": false } }] }, { "name": "User", "fields": [{ "name": "id", "args": [], "outputType": { "type": "String", "kind": "scalar", "isRequired": true, "isList": false } }, { "name": "email", "args": [], "outputType": { "type": "String", "kind": "scalar", "isRequired": true, "isList": false } }, { "name": "name", "args": [], "outputType": { "type": "String", "kind": "scalar", "isRequired": false, "isList": false } }, { "name": "posts", "args": [{ "name": "where", "inputType": [{ "type": "PostWhereInput", "kind": "object", "isRequired": false, "isList": false }] }, { "name": "orderBy", "inputType": [{ "isList": false, "isRequired": false, "type": "PostOrderByInput", "kind": "object" }] }, { "name": "skip", "inputType": [{ "type": "Int", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "after", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "before", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "first", "inputType": [{ "type": "Int", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "last", "inputType": [{ "type": "Int", "kind": "scalar", "isRequired": false, "isList": false }] }], "outputType": { "type": "Post", "kind": "object", "isRequired": false, "isList": true } }] }, { "name": "AggregateUser", "fields": [{ "name": "count", "args": [], "outputType": { "type": "Int", "kind": "scalar", "isRequired": true, "isList": false } }] }, { "name": "AggregatePost", "fields": [{ "name": "count", "args": [], "outputType": { "type": "Int", "kind": "scalar", "isRequired": true, "isList": false } }] }, { "name": "Query", "fields": [{ "name": "findManyUser", "args": [{ "name": "where", "inputType": [{ "type": "UserWhereInput", "kind": "object", "isRequired": false, "isList": false }] }, { "name": "orderBy", "inputType": [{ "isList": false, "isRequired": false, "type": "UserOrderByInput", "kind": "object" }] }, { "name": "skip", "inputType": [{ "type": "Int", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "after", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "before", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "first", "inputType": [{ "type": "Int", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "last", "inputType": [{ "type": "Int", "kind": "scalar", "isRequired": false, "isList": false }] }], "outputType": { "type": "User", "kind": "object", "isRequired": true, "isList": true } }, { "name": "aggregateUser", "args": [], "outputType": { "type": "AggregateUser", "kind": "object", "isRequired": true, "isList": false } }, { "name": "findOneUser", "args": [{ "name": "where", "inputType": [{ "type": "UserWhereUniqueInput", "kind": "object", "isRequired": true, "isList": false }] }], "outputType": { "type": "User", "kind": "object", "isRequired": false, "isList": false } }, { "name": "findManyPost", "args": [{ "name": "where", "inputType": [{ "type": "PostWhereInput", "kind": "object", "isRequired": false, "isList": false }] }, { "name": "orderBy", "inputType": [{ "isList": false, "isRequired": false, "type": "PostOrderByInput", "kind": "object" }] }, { "name": "skip", "inputType": [{ "type": "Int", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "after", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "before", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "first", "inputType": [{ "type": "Int", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "last", "inputType": [{ "type": "Int", "kind": "scalar", "isRequired": false, "isList": false }] }], "outputType": { "type": "Post", "kind": "object", "isRequired": true, "isList": true } }, { "name": "aggregatePost", "args": [], "outputType": { "type": "AggregatePost", "kind": "object", "isRequired": true, "isList": false } }, { "name": "findOnePost", "args": [{ "name": "where", "inputType": [{ "type": "PostWhereUniqueInput", "kind": "object", "isRequired": true, "isList": false }] }], "outputType": { "type": "Post", "kind": "object", "isRequired": false, "isList": false } }] }, { "name": "BatchPayload", "fields": [{ "name": "count", "args": [], "outputType": { "type": "Int", "kind": "scalar", "isRequired": true, "isList": false } }] }, { "name": "Mutation", "fields": [{ "name": "createOneUser", "args": [{ "name": "data", "inputType": [{ "type": "UserCreateInput", "kind": "object", "isRequired": true, "isList": false }] }], "outputType": { "type": "User", "kind": "object", "isRequired": true, "isList": false } }, { "name": "deleteOneUser", "args": [{ "name": "where", "inputType": [{ "type": "UserWhereUniqueInput", "kind": "object", "isRequired": true, "isList": false }] }], "outputType": { "type": "User", "kind": "object", "isRequired": false, "isList": false } }, { "name": "updateOneUser", "args": [{ "name": "data", "inputType": [{ "type": "UserUpdateInput", "kind": "object", "isRequired": true, "isList": false }] }, { "name": "where", "inputType": [{ "type": "UserWhereUniqueInput", "kind": "object", "isRequired": true, "isList": false }] }], "outputType": { "type": "User", "kind": "object", "isRequired": false, "isList": false } }, { "name": "upsertOneUser", "args": [{ "name": "where", "inputType": [{ "type": "UserWhereUniqueInput", "kind": "object", "isRequired": true, "isList": false }] }, { "name": "create", "inputType": [{ "type": "UserCreateInput", "kind": "object", "isRequired": true, "isList": false }] }, { "name": "update", "inputType": [{ "type": "UserUpdateInput", "kind": "object", "isRequired": true, "isList": false }] }], "outputType": { "type": "User", "kind": "object", "isRequired": true, "isList": false } }, { "name": "updateManyUser", "args": [{ "name": "data", "inputType": [{ "type": "UserUpdateManyMutationInput", "kind": "object", "isRequired": true, "isList": false }] }, { "name": "where", "inputType": [{ "type": "UserWhereInput", "kind": "object", "isRequired": false, "isList": false }] }], "outputType": { "type": "BatchPayload", "kind": "object", "isRequired": true, "isList": false } }, { "name": "deleteManyUser", "args": [{ "name": "where", "inputType": [{ "type": "UserWhereInput", "kind": "object", "isRequired": false, "isList": false }] }], "outputType": { "type": "BatchPayload", "kind": "object", "isRequired": true, "isList": false } }, { "name": "createOnePost", "args": [{ "name": "data", "inputType": [{ "type": "PostCreateInput", "kind": "object", "isRequired": true, "isList": false }] }], "outputType": { "type": "Post", "kind": "object", "isRequired": true, "isList": false } }, { "name": "deleteOnePost", "args": [{ "name": "where", "inputType": [{ "type": "PostWhereUniqueInput", "kind": "object", "isRequired": true, "isList": false }] }], "outputType": { "type": "Post", "kind": "object", "isRequired": false, "isList": false } }, { "name": "updateOnePost", "args": [{ "name": "data", "inputType": [{ "type": "PostUpdateInput", "kind": "object", "isRequired": true, "isList": false }] }, { "name": "where", "inputType": [{ "type": "PostWhereUniqueInput", "kind": "object", "isRequired": true, "isList": false }] }], "outputType": { "type": "Post", "kind": "object", "isRequired": false, "isList": false } }, { "name": "upsertOnePost", "args": [{ "name": "where", "inputType": [{ "type": "PostWhereUniqueInput", "kind": "object", "isRequired": true, "isList": false }] }, { "name": "create", "inputType": [{ "type": "PostCreateInput", "kind": "object", "isRequired": true, "isList": false }] }, { "name": "update", "inputType": [{ "type": "PostUpdateInput", "kind": "object", "isRequired": true, "isList": false }] }], "outputType": { "type": "Post", "kind": "object", "isRequired": true, "isList": false } }, { "name": "updateManyPost", "args": [{ "name": "data", "inputType": [{ "type": "PostUpdateManyMutationInput", "kind": "object", "isRequired": true, "isList": false }] }, { "name": "where", "inputType": [{ "type": "PostWhereInput", "kind": "object", "isRequired": false, "isList": false }] }], "outputType": { "type": "BatchPayload", "kind": "object", "isRequired": true, "isList": false } }, { "name": "deleteManyPost", "args": [{ "name": "where", "inputType": [{ "type": "PostWhereInput", "kind": "object", "isRequired": false, "isList": false }] }], "outputType": { "type": "BatchPayload", "kind": "object", "isRequired": true, "isList": false } }] }], "inputTypes": [{ "name": "PostWhereInput", "fields": [{ "name": "id", "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "String" }, { "type": "StringFilter", "isList": false, "isRequired": false, "kind": "object" }], "isRelationFilter": false }, { "name": "createdAt", "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "DateTime" }, { "type": "DateTimeFilter", "isList": false, "isRequired": false, "kind": "object" }], "isRelationFilter": false }, { "name": "updatedAt", "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "DateTime" }, { "type": "DateTimeFilter", "isList": false, "isRequired": false, "kind": "object" }], "isRelationFilter": false }, { "name": "published", "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "Boolean" }, { "type": "BooleanFilter", "isList": false, "isRequired": false, "kind": "object" }], "isRelationFilter": false }, { "name": "title", "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "String" }, { "type": "StringFilter", "isList": false, "isRequired": false, "kind": "object" }], "isRelationFilter": false }, { "name": "content", "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "String" }, { "type": "NullableStringFilter", "isList": false, "isRequired": false, "kind": "object" }, { "type": "null", "isList": false, "isRequired": false, "kind": "scalar" }], "isRelationFilter": false }, { "name": "AND", "inputType": [{ "type": "PostWhereInput", "kind": "object", "isRequired": false, "isList": true }], "isRelationFilter": true }, { "name": "OR", "inputType": [{ "type": "PostWhereInput", "kind": "object", "isRequired": false, "isList": true }], "isRelationFilter": true }, { "name": "NOT", "inputType": [{ "type": "PostWhereInput", "kind": "object", "isRequired": false, "isList": true }], "isRelationFilter": true }, { "name": "author", "inputType": [{ "type": "UserWhereInput", "kind": "object", "isRequired": false, "isList": false }], "isRelationFilter": true }], "isWhereType": true, "atLeastOne": false }, { "name": "UserWhereInput", "fields": [{ "name": "id", "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "String" }, { "type": "StringFilter", "isList": false, "isRequired": false, "kind": "object" }], "isRelationFilter": false }, { "name": "email", "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "String" }, { "type": "StringFilter", "isList": false, "isRequired": false, "kind": "object" }], "isRelationFilter": false }, { "name": "name", "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "String" }, { "type": "NullableStringFilter", "isList": false, "isRequired": false, "kind": "object" }, { "type": "null", "isList": false, "isRequired": false, "kind": "scalar" }], "isRelationFilter": false }, { "name": "posts", "inputType": [{ "type": "PostFilter", "isList": false, "isRequired": false, "kind": "object" }], "isRelationFilter": false }, { "name": "AND", "inputType": [{ "type": "UserWhereInput", "kind": "object", "isRequired": false, "isList": true }], "isRelationFilter": true }, { "name": "OR", "inputType": [{ "type": "UserWhereInput", "kind": "object", "isRequired": false, "isList": true }], "isRelationFilter": true }, { "name": "NOT", "inputType": [{ "type": "UserWhereInput", "kind": "object", "isRequired": false, "isList": true }], "isRelationFilter": true }], "isWhereType": true, "atLeastOne": false }, { "name": "UserWhereUniqueInput", "fields": [{ "name": "id", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "email", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }], "atLeastOne": true }, { "name": "PostWhereUniqueInput", "fields": [{ "name": "id", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }], "atLeastOne": true }, { "name": "PostCreateWithoutAuthorInput", "fields": [{ "name": "id", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "createdAt", "inputType": [{ "type": "DateTime", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "updatedAt", "inputType": [{ "type": "DateTime", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "published", "inputType": [{ "type": "Boolean", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "title", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": true, "isList": false }] }, { "name": "content", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }] }, { "name": "PostCreateManyWithoutPostsInput", "fields": [{ "name": "create", "inputType": [{ "type": "PostCreateWithoutAuthorInput", "kind": "object", "isRequired": false, "isList": true }] }, { "name": "connect", "inputType": [{ "type": "PostWhereUniqueInput", "kind": "object", "isRequired": false, "isList": true }] }] }, { "name": "UserCreateInput", "fields": [{ "name": "id", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "email", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": true, "isList": false }] }, { "name": "name", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "posts", "inputType": [{ "type": "PostCreateManyWithoutPostsInput", "kind": "object", "isRequired": false, "isList": false }] }] }, { "name": "PostUpdateWithoutAuthorDataInput", "fields": [{ "name": "id", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "createdAt", "inputType": [{ "type": "DateTime", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "updatedAt", "inputType": [{ "type": "DateTime", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "published", "inputType": [{ "type": "Boolean", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "title", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "content", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }] }, { "name": "PostUpdateWithWhereUniqueWithoutAuthorInput", "fields": [{ "name": "where", "inputType": [{ "type": "PostWhereUniqueInput", "kind": "object", "isRequired": true, "isList": false }] }, { "name": "data", "inputType": [{ "type": "PostUpdateWithoutAuthorDataInput", "kind": "object", "isRequired": true, "isList": false }] }] }, { "name": "PostScalarWhereInput", "fields": [{ "name": "id", "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "String" }, { "type": "StringFilter", "isList": false, "isRequired": false, "kind": "object" }], "isRelationFilter": false }, { "name": "createdAt", "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "DateTime" }, { "type": "DateTimeFilter", "isList": false, "isRequired": false, "kind": "object" }], "isRelationFilter": false }, { "name": "updatedAt", "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "DateTime" }, { "type": "DateTimeFilter", "isList": false, "isRequired": false, "kind": "object" }], "isRelationFilter": false }, { "name": "published", "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "Boolean" }, { "type": "BooleanFilter", "isList": false, "isRequired": false, "kind": "object" }], "isRelationFilter": false }, { "name": "title", "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "String" }, { "type": "StringFilter", "isList": false, "isRequired": false, "kind": "object" }], "isRelationFilter": false }, { "name": "content", "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "String" }, { "type": "NullableStringFilter", "isList": false, "isRequired": false, "kind": "object" }, { "type": "null", "isList": false, "isRequired": false, "kind": "scalar" }], "isRelationFilter": false }, { "name": "AND", "inputType": [{ "type": "PostScalarWhereInput", "kind": "object", "isRequired": false, "isList": true }], "isRelationFilter": true }, { "name": "OR", "inputType": [{ "type": "PostScalarWhereInput", "kind": "object", "isRequired": false, "isList": true }], "isRelationFilter": true }, { "name": "NOT", "inputType": [{ "type": "PostScalarWhereInput", "kind": "object", "isRequired": false, "isList": true }], "isRelationFilter": true }], "isWhereType": true, "atLeastOne": false }, { "name": "PostUpdateManyDataInput", "fields": [{ "name": "id", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "createdAt", "inputType": [{ "type": "DateTime", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "updatedAt", "inputType": [{ "type": "DateTime", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "published", "inputType": [{ "type": "Boolean", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "title", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "content", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }] }, { "name": "PostUpdateManyWithWhereNestedInput", "fields": [{ "name": "where", "inputType": [{ "type": "PostScalarWhereInput", "kind": "object", "isRequired": true, "isList": false }] }, { "name": "data", "inputType": [{ "type": "PostUpdateManyDataInput", "kind": "object", "isRequired": true, "isList": false }] }] }, { "name": "PostUpsertWithWhereUniqueWithoutAuthorInput", "fields": [{ "name": "where", "inputType": [{ "type": "PostWhereUniqueInput", "kind": "object", "isRequired": true, "isList": false }] }, { "name": "update", "inputType": [{ "type": "PostUpdateWithoutAuthorDataInput", "kind": "object", "isRequired": true, "isList": false }] }, { "name": "create", "inputType": [{ "type": "PostCreateWithoutAuthorInput", "kind": "object", "isRequired": true, "isList": false }] }] }, { "name": "PostUpdateManyWithoutAuthorInput", "fields": [{ "name": "create", "inputType": [{ "type": "PostCreateWithoutAuthorInput", "kind": "object", "isRequired": false, "isList": true }] }, { "name": "connect", "inputType": [{ "type": "PostWhereUniqueInput", "kind": "object", "isRequired": false, "isList": true }] }, { "name": "set", "inputType": [{ "type": "PostWhereUniqueInput", "kind": "object", "isRequired": false, "isList": true }] }, { "name": "disconnect", "inputType": [{ "type": "PostWhereUniqueInput", "kind": "object", "isRequired": false, "isList": true }] }, { "name": "delete", "inputType": [{ "type": "PostWhereUniqueInput", "kind": "object", "isRequired": false, "isList": true }] }, { "name": "update", "inputType": [{ "type": "PostUpdateWithWhereUniqueWithoutAuthorInput", "kind": "object", "isRequired": false, "isList": true }] }, { "name": "updateMany", "inputType": [{ "type": "PostUpdateManyWithWhereNestedInput", "kind": "object", "isRequired": false, "isList": true }] }, { "name": "deleteMany", "inputType": [{ "type": "PostScalarWhereInput", "kind": "object", "isRequired": false, "isList": true }] }, { "name": "upsert", "inputType": [{ "type": "PostUpsertWithWhereUniqueWithoutAuthorInput", "kind": "object", "isRequired": false, "isList": true }] }] }, { "name": "UserUpdateInput", "fields": [{ "name": "id", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "email", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "name", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "posts", "inputType": [{ "type": "PostUpdateManyWithoutAuthorInput", "kind": "object", "isRequired": false, "isList": false }] }] }, { "name": "UserUpdateManyMutationInput", "fields": [{ "name": "id", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "email", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "name", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }] }, { "name": "UserCreateWithoutPostsInput", "fields": [{ "name": "id", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "email", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": true, "isList": false }] }, { "name": "name", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }] }, { "name": "UserCreateOneWithoutAuthorInput", "fields": [{ "name": "create", "inputType": [{ "type": "UserCreateWithoutPostsInput", "kind": "object", "isRequired": false, "isList": false }] }, { "name": "connect", "inputType": [{ "type": "UserWhereUniqueInput", "kind": "object", "isRequired": false, "isList": false }] }] }, { "name": "PostCreateInput", "fields": [{ "name": "id", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "createdAt", "inputType": [{ "type": "DateTime", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "updatedAt", "inputType": [{ "type": "DateTime", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "published", "inputType": [{ "type": "Boolean", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "title", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": true, "isList": false }] }, { "name": "content", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "author", "inputType": [{ "type": "UserCreateOneWithoutAuthorInput", "kind": "object", "isRequired": false, "isList": false }] }] }, { "name": "UserUpdateWithoutPostsDataInput", "fields": [{ "name": "id", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "email", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "name", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }] }, { "name": "UserUpsertWithoutPostsInput", "fields": [{ "name": "update", "inputType": [{ "type": "UserUpdateWithoutPostsDataInput", "kind": "object", "isRequired": true, "isList": false }] }, { "name": "create", "inputType": [{ "type": "UserCreateWithoutPostsInput", "kind": "object", "isRequired": true, "isList": false }] }] }, { "name": "UserUpdateOneWithoutPostsInput", "fields": [{ "name": "create", "inputType": [{ "type": "UserCreateWithoutPostsInput", "kind": "object", "isRequired": false, "isList": false }] }, { "name": "connect", "inputType": [{ "type": "UserWhereUniqueInput", "kind": "object", "isRequired": false, "isList": false }] }, { "name": "disconnect", "inputType": [{ "type": "Boolean", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "delete", "inputType": [{ "type": "Boolean", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "update", "inputType": [{ "type": "UserUpdateWithoutPostsDataInput", "kind": "object", "isRequired": false, "isList": false }] }, { "name": "upsert", "inputType": [{ "type": "UserUpsertWithoutPostsInput", "kind": "object", "isRequired": false, "isList": false }] }] }, { "name": "PostUpdateInput", "fields": [{ "name": "id", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "createdAt", "inputType": [{ "type": "DateTime", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "updatedAt", "inputType": [{ "type": "DateTime", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "published", "inputType": [{ "type": "Boolean", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "title", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "content", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "author", "inputType": [{ "type": "UserUpdateOneWithoutPostsInput", "kind": "object", "isRequired": false, "isList": false }] }] }, { "name": "PostUpdateManyMutationInput", "fields": [{ "name": "id", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "createdAt", "inputType": [{ "type": "DateTime", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "updatedAt", "inputType": [{ "type": "DateTime", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "published", "inputType": [{ "type": "Boolean", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "title", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }, { "name": "content", "inputType": [{ "type": "String", "kind": "scalar", "isRequired": false, "isList": false }] }] }, { "name": "StringFilter", "fields": [{ "name": "equals", "isRelationFilter": false, "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "String" }] }, { "name": "not", "isRelationFilter": false, "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "String" }, { "isList": false, "isRequired": false, "kind": "scalar", "type": "StringFilter" }] }, { "name": "in", "isRelationFilter": false, "inputType": [{ "isList": true, "isRequired": false, "kind": "scalar", "type": "String" }] }, { "name": "notIn", "isRelationFilter": false, "inputType": [{ "isList": true, "isRequired": false, "kind": "scalar", "type": "String" }] }, { "name": "lt", "isRelationFilter": false, "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "String" }] }, { "name": "lte", "isRelationFilter": false, "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "String" }] }, { "name": "gt", "isRelationFilter": false, "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "String" }] }, { "name": "gte", "isRelationFilter": false, "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "String" }] }, { "name": "contains", "isRelationFilter": false, "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "String" }] }, { "name": "startsWith", "isRelationFilter": false, "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "String" }] }, { "name": "endsWith", "isRelationFilter": false, "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "String" }] }], "atLeastOne": false }, { "name": "DateTimeFilter", "fields": [{ "name": "equals", "isRelationFilter": false, "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "DateTime" }] }, { "name": "not", "isRelationFilter": false, "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "DateTime" }, { "isList": false, "isRequired": false, "kind": "scalar", "type": "DateTimeFilter" }] }, { "name": "in", "isRelationFilter": false, "inputType": [{ "isList": true, "isRequired": false, "kind": "scalar", "type": "DateTime" }] }, { "name": "notIn", "isRelationFilter": false, "inputType": [{ "isList": true, "isRequired": false, "kind": "scalar", "type": "DateTime" }] }, { "name": "lt", "isRelationFilter": false, "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "DateTime" }] }, { "name": "lte", "isRelationFilter": false, "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "DateTime" }] }, { "name": "gt", "isRelationFilter": false, "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "DateTime" }] }, { "name": "gte", "isRelationFilter": false, "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "DateTime" }] }], "atLeastOne": false }, { "name": "BooleanFilter", "fields": [{ "name": "equals", "isRelationFilter": false, "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "Boolean" }] }, { "name": "not", "isRelationFilter": false, "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "Boolean" }, { "isList": false, "isRequired": false, "kind": "scalar", "type": "BooleanFilter" }] }], "atLeastOne": false }, { "name": "NullableStringFilter", "fields": [{ "name": "equals", "isRelationFilter": false, "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "String" }, { "isList": false, "isRequired": false, "kind": "scalar", "type": "null" }] }, { "name": "not", "isRelationFilter": false, "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "String" }, { "isList": false, "isRequired": false, "kind": "scalar", "type": "null" }, { "isList": false, "isRequired": false, "kind": "scalar", "type": "NullableStringFilter" }] }, { "name": "in", "isRelationFilter": false, "inputType": [{ "isList": true, "isRequired": false, "kind": "scalar", "type": "String" }] }, { "name": "notIn", "isRelationFilter": false, "inputType": [{ "isList": true, "isRequired": false, "kind": "scalar", "type": "String" }] }, { "name": "lt", "isRelationFilter": false, "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "String" }] }, { "name": "lte", "isRelationFilter": false, "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "String" }] }, { "name": "gt", "isRelationFilter": false, "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "String" }] }, { "name": "gte", "isRelationFilter": false, "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "String" }] }, { "name": "contains", "isRelationFilter": false, "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "String" }] }, { "name": "startsWith", "isRelationFilter": false, "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "String" }] }, { "name": "endsWith", "isRelationFilter": false, "inputType": [{ "isList": false, "isRequired": false, "kind": "scalar", "type": "String" }] }], "atLeastOne": false }, { "name": "PostFilter", "fields": [{ "name": "every", "isRelationFilter": true, "inputType": [{ "isList": false, "isRequired": false, "kind": "object", "type": "PostWhereInput" }] }, { "name": "some", "isRelationFilter": true, "inputType": [{ "isList": false, "isRequired": false, "kind": "object", "type": "PostWhereInput" }] }, { "name": "none", "isRelationFilter": true, "inputType": [{ "isList": false, "isRequired": false, "kind": "object", "type": "PostWhereInput" }] }], "atLeastOne": false }, { "name": "UserOrderByInput", "atLeastOne": true, "atMostOne": true, "isOrderType": true, "fields": [{ "name": "id", "inputType": [{ "type": "OrderByArg", "isList": false, "isRequired": false, "kind": "enum" }], "isRelationFilter": false }, { "name": "email", "inputType": [{ "type": "OrderByArg", "isList": false, "isRequired": false, "kind": "enum" }], "isRelationFilter": false }, { "name": "name", "inputType": [{ "type": "OrderByArg", "isList": false, "isRequired": false, "kind": "enum" }], "isRelationFilter": false }] }, { "name": "PostOrderByInput", "atLeastOne": true, "atMostOne": true, "isOrderType": true, "fields": [{ "name": "id", "inputType": [{ "type": "OrderByArg", "isList": false, "isRequired": false, "kind": "enum" }], "isRelationFilter": false }, { "name": "createdAt", "inputType": [{ "type": "OrderByArg", "isList": false, "isRequired": false, "kind": "enum" }], "isRelationFilter": false }, { "name": "updatedAt", "inputType": [{ "type": "OrderByArg", "isList": false, "isRequired": false, "kind": "enum" }], "isRelationFilter": false }, { "name": "published", "inputType": [{ "type": "OrderByArg", "isList": false, "isRequired": false, "kind": "enum" }], "isRelationFilter": false }, { "name": "title", "inputType": [{ "type": "OrderByArg", "isList": false, "isRequired": false, "kind": "enum" }], "isRelationFilter": false }, { "name": "content", "inputType": [{ "type": "OrderByArg", "isList": false, "isRequired": false, "kind": "enum" }], "isRelationFilter": false }] }] } };
