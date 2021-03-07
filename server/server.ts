import { ApolloServer } from "apollo-server";
import * as path from "path";
import { buildSchema } from "type-graphql";
import { GraphQLSchema } from "graphql";
import { Mongo } from "./database/Database";
import { TodoItemResolver } from "./graph/TodoItemResolver";
import { Prefill } from "./graph/Prefill";

export class Server {
    constructor(private mongo: Mongo = new Mongo()) {}

    public async Start(): Promise<void> {
        this.mongo.Connect();

        const schema: GraphQLSchema = await buildSchema({
            resolvers: [TodoItemResolver],
            validate: false,
            emitSchemaFile: path.resolve(
                __dirname,
                "apolloschema.gql"
            ),
        });

        // GraphQL uses lazy loading. In order to respond to our clients faster, we're going to pre-populate this
        // list.
        await Prefill.Instance.Populate();

        const server = new ApolloServer({ schema, playground: true });
        await server.listen(4000).then(() => {
            console.log(`ApolloServer running on port 4000`);
        });
    }
}

new Server().Start();
