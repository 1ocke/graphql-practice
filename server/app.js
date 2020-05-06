const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema.js');
const cors = require('cors');
const env = require('dotenv');

env.config();
const app = express();

const PORT = 3005;
// const dbUrl = process.env.DB_CONN;

mongoose.connect("mongodb+srv://Andrew:Shore1994@cluster0-ulcic.mongodb.net/graphql-practice?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

const dbConnection = mongoose.connection;
dbConnection.on('error', (err) => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DB'));

app.listen(PORT || 5000, (err) => {
  err ? console.log(err) : console.log('server started!');
});
