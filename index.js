const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const express = require('express');
const { typeDefs } = require('./utils/typeDefs');
const { resolvers } = require('./utils/resolvers');

const app = express();

const corsOptions = {
  origin: '*',
  credentials: true,
};
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send();
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  cors: corsOptions,
});

const main = async () => {
  await server.start();

  server.applyMiddleware({
    app,
    cors: corsOptions,
    path: '/graphql',
  });

  app.listen(process.env.PORT || 4000, () => {
    console.log(`🚀  Server ready at port ${process.env.PORT || 4000}`);
  });
};

main();
