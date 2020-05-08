const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema.js');
const cors = require('cors');
const env = require('dotenv');
const path = require('path');

env.config();
const app = express();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST;
const dbUrl = process.env.DB_CONN;

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

const dbConnection = mongoose.connection;
dbConnection.on('error', (err) => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DB'));

app.use(express.static(path.join(__dirname, '..')));
app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, HOST, (err) => {
  err ? console.log(err) : console.log('server started!');
});
