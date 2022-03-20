import { createServer, GraphQLYogaError } from "@graphql-yoga/node";

type User = {
  id: string;
  name: string;
  isAdmin: boolean;
};

type Post = {
  id: string;
  title: string;
};

const users: User[] = [{ id: "jb", name: "Jamie", isAdmin: true }];
const posts: Post[] = [{ id: "wtf", title: "Learn GraphQL" }];

const server = createServer({
  schema: {
    typeDefs: /* GraphQL */ `
      type Query {
        users: [User]!
        posts: [Post]!
      }

      type Mutation {
        updateUser(id: ID!, name: String!): User
      }

      type User {
        id: ID!
        name: String!
        isAdmin: Boolean!
      }

      type Post {
        id: ID!
        title: String!
      }
    `,
    resolvers: {
      Query: {
        users: () => users,
        posts: () => posts,
      },
      Mutation: {
        updateUser: (_, { id, name }) => {
          const user = users.find((user) => user.id === id);

          if (!user) {
            throw new GraphQLYogaError("User not found");
          }

          user.name = name;
          return user;
        },
      },
    },
  },
});

server.start();
