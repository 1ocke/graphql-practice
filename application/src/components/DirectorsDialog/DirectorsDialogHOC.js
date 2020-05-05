import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { removeDirectorMutation } from './mutation.js';
import { directorsQuery } from '../DirectorsTable/queries.js'

const withGraphQLRemove = graphql(removeDirectorMutation, {
  props: ({ mutate }) => ({
    removeDirector: (id) => mutate({
      variables: id,
      refetchQueries: [{
        query: directorsQuery,
        variables: { name: '' },
      }],
    }),
  }),
});

export default compose(withGraphQLRemove);