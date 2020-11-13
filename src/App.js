import React, { Component } from 'react';
import Tabs from './components/Tabs/Tabs';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import theme from './components/theme';

const client = new ApolloClient({
  uri: '/graphql',
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
