const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');

// graphql関連のインポート
const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

const sequelize = require('./config/database');
const User = require('./models/User');

const app = express();
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
}));
app.use(express.json());
// graphqlの設定
app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlResolver,
  graphiql: true,
}));

sequelize
  .sync()
  // .sync({ force: true })
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

