"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const Database_1 = require("./database/Database");
const Prefill_1 = require("./graph/Prefill");
const TodoItemResolver_1 = require("./graph/TodoItemResolver");
class Server {
    constructor(mongo = new Database_1.Mongo()) {
        this.mongo = mongo;
    }
    Start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.mongo.Connect();
            const app = express_1.default();
            app.use(
            // bodyParser.urlencoded({ extended: false }),
            cors_1.default({
                origin: "http://localhost:3000",
                credentials: true,
            }));
            // GraphQL uses lazy loading. In order to respond to our clients faster, we're going to pre-populate this
            // list.
            yield Prefill_1.Prefill.Instance.Populate();
            const apolloServer = new apollo_server_express_1.ApolloServer({
                schema: yield type_graphql_1.buildSchema({
                    resolvers: [TodoItemResolver_1.TodoItemResolver],
                    validate: false,
                }),
            });
            apolloServer.applyMiddleware({
                app,
                cors: false,
            });
            app.get("/", (_, res) => {
                res.send("hello");
            });
            app.listen({ port: 4000 }, () => {
                console.log("server started on localhost:4000");
            });
        });
    }
}
exports.Server = Server;
new Server().Start().catch((err) => {
    console.error(err);
});
