const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema.js');
const cors = require('cors');
const env = require('dotenv');

env.config();
const app = express();

const PORT = process.env.PORT || 3000;
const dbUrl = process.env.DB_CONN;

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

// app.get('/', (req, res) => {
//   res.redirect('/graphql');
// });

const dbConnection = mongoose.connection;
dbConnection.on('error', (err) => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DB'));

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log('server started!');
});
