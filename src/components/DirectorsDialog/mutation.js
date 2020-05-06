import { gql } from 'apollo-boost';

export const removeDirectorMutation = gql`
  mutation removeDirector($id: ID) {
    removeDirector(id: $id) {
      id
    }
  }
`;