"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const apollo_server_1 = require("apollo-server");
const path = __importStar(require("path"));
const type_graphql_1 = require("type-graphql");
const Database_1 = require("./database/Database");
const TodoItemResolver_1 = require("./graph/TodoItemResolver");
const Prefill_1 = require("./graph/Prefill");
class Server {
    constructor(mongo = new Database_1.Mongo()) {
        this.mongo = mongo;
    }
    Start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.mongo.Connect();
            const schema = yield type_graphql_1.buildSchema({
                resolvers: [TodoItemResolver_1.TodoItemResolver],
                validate: false,
                emitSchemaFile: path.resolve(__dirname, "apolloschema.gql"),
            });
            // GraphQL uses lazy loading. In order to respond to our clients faster, we're going to pre-populate this
            // list.
            yield Prefill_1.Prefill.Instance.Populate();
            const server = new apollo_server_1.ApolloServer({ schema, playground: true });
            yield server.listen(3000).then(() => {
                console.log(`ApolloServer running on port 3000`);
            });
        });
    }
}
exports.Server = Server;
new Server().Start();
