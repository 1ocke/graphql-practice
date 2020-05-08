import React, { Component } from 'react';
import Tabs from './components/Tabs/Tabs';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import theme from './components/theme';
import env from 'dotenv';
env.config();

const PORT = process.env.PORT;

const client = new ApolloClient({
  uri: `http://0.0.0.0:${PORT}/graphql`,
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <MuiThemeProvider theme={theme}>
          <Tabs />
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
