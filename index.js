const { ApolloServer, gql } = require('apollo-server');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const toDoItems = [
  {
    id: 1,
    title: 'Make GraphQL Server',
    // createdAt: 1593436413571,
  },
  {
    id: 2,
    title: 'Push the repo on GitHub',
    // createdAt: '02/01/2020',
  },
];

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10);
      }
      return null;
    },
  }),
  Query: {
    toDos: () => toDoItems,
  },
};

const server = new ApolloServer({ typeDefs: './schema.graphql', resolvers });

server.listen().then(({ url }) => {
  console.log(`Server running on ${url}`);
});
