import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { buildSchema } from "type-graphql";
import { Mongo } from "./database/Database";
import { Prefill } from "./graph/Prefill";
import { TodoItemResolver } from "./graph/TodoItemResolver";
import bodyParser from "body-parser";

export class Server {
    constructor(private mongo: Mongo = new Mongo()) {}

    public async Start(): Promise<void> {
        this.mongo.Connect();
        const app = express();

        app.use(
            // bodyParser.urlencoded({ extended: false }),
            cors({
                origin: "http://localhost:3000",
                credentials: true,
            })
        );

        // GraphQL uses lazy loading. In order to respond to our clients faster, we're going to pre-populate this
        // list.
        await Prefill.Instance.Populate();

        const apolloServer = new ApolloServer({
            schema: await buildSchema({
                resolvers: [TodoItemResolver],
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
    }
}

new Server().Start().catch((err) => {
    console.error(err);
});
