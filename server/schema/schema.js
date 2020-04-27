const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = graphql;

const movies = [
  { id: '1', name: 'Pulp Fiction', genre: 'Crime', directorId: '1' },
  { id: '2', name: 'Alien', genre: 'Horror', directorId: '2' },
  { id: 3, name: 'Evangelion', genre: 'Anime', directorId: 3 },
  { id: 4, name: 'Marriage Story', genre: 'Drama', directorId: 4 },
];

const directors = [
  { id: '1', name: 'Quentin Tarantino', age: 57 },
  { id: '2', name: 'Ridley Scott', age: 82 },
  { id: 3, name: 'Hideaki Anno', age: 59 },
  { id: 4, name: 'Noah Baumbach', age: 50 },
];

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        return directors.find((director) => director.id == parent.directorId);
      }
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: { 
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return movies.find((movie) => movie.id == args.id);
      }
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return directors.find((director) => director.id == args.id);
      }
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
});