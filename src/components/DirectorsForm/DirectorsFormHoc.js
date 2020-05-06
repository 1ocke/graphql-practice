import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { styles } from './styles';
import { addDirectorMutation, updateDirectorMutation } from './mutation.js';
import { directorsQuery } from '../DirectorsTable/queries.js'

const withGraphQL = compose(
  graphql(addDirectorMutation, {
    props: ({ mutate }) => ({
      addDirector: (director) => mutate({
        variables: director,
        refetchQueries: [{
          query: directorsQuery,
          variables: { name: '' },
        }],
      }),
    }),
  }),
  graphql(updateDirectorMutation, {
    props: ({ mutate }) => ({
      updateDirector: (director) => mutate({
        variables: director,
        refetchQueries: [{
          query: directorsQuery,
          variables: { name: '' },
        }],
      }),
    }),
  })
);

export default compose(withStyles(styles), withGraphQL);
