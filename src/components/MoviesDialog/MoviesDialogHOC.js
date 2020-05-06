import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { removeMovieMutation } from './mutation.js';
import { moviesQuery } from '../MoviesTable/queries.js'

const withGraphQLRemove = graphql(removeMovieMutation, {
  props: ({ mutate }) => ({
    removeMovie: (id) => mutate({
      variables: id,
      refetchQueries: [{
        query: moviesQuery,
        variables: { name: '' },
      }],
    }),
  }),
});

export default compose(withGraphQLRemove);