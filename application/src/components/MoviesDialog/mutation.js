import { gql } from 'apollo-boost';

export const removeMovieMutation = gql`
  mutation removeMovie($id: ID) {
    removeMovie(id: $id) {
      id
    }
  }
`;