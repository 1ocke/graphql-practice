const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

const Movies = require('../models/movie.js');
const Directors = require('../models/director.js');

// const directosJSON = [
//   { name: 'Quentin Tarantino', age: 57 }, //5ea6ff624d3820274caf8fde
//   { name: 'Ridley Scott', age: 82 }, //5ea700024d3820274caf8fdf
//   { name: 'Hideaki Anno', age: 59 }, //5ea7000b4d3820274caf8fe0
//   { name: 'Noah Baumbach', age: 50 }, //5ea700154d3820274caf8fe1
// ];

// const moviesJSON = [
//   { name: 'Pulp Fiction', genre: 'Crime', directorId: "5ea6ff624d3820274caf8fde" },
//   { name: 'Alien', genre: 'Horror', directorId: "5ea700024d3820274caf8fdf" },
//   { name: 'Evangelion', genre: 'Anime', directorId: "5ea7000b4d3820274caf8fe0" },
//   { name: 'Marriage Story', genre: 'Drama', directorId: "5ea700154d3820274caf8fe1" },
//   { name: 'Reservoir Dogs', genre: 'Crime', directorId: "5ea6ff624d3820274caf8fde" },
//   { name: 'The Hateful Eight', genre: 'Crime', directorId: "5ea6ff624d3820274caf8fde" },
//   { name: 'Inglourious Basterds', genre: 'Crime', directorId: "5ea6ff624d3820274caf8fde" },
//   { name: 'Blade Runner', genre: 'Sci-fi', directorId: "5ea700024d3820274caf8fdf" },
// ];

// const movies = [
//   { id: '1', name: 'Pulp Fiction', genre: 'Crime', directorId: '1' },
//   { id: '2', name: 'Alien', genre: 'Horror', directorId: '2' },
//   { id: 3, name: 'Evangelion', genre: 'Anime', directorId: 3 },
//   { id: 4, name: 'Marriage Story', genre: 'Drama', directorId: 4 },
//   { id: 5, name: 'Reservoir Dogs', genre: 'Crime', directorId: 1 },
//   { id: '6', name: 'The Hateful Eight', genre: 'Crime', directorId: 1 },
//   { id: 7, name: 'Inglourious Basterds', genre: 'Crime', directorId: 1 },
//   { id: 8, name: 'Blade Runner', genre: 'Sci-fi', directorId: 2 },
// ];

// const directors = [
//   { id: '1', name: 'Quentin Tarantino', age: 57 },
//   { id: '2', name: 'Ridley Scott', age: 82 },
//   { id: 3, name: 'Hideaki Anno', age: 59 },
//   { id: 4, name: 'Noah Baumbach', age: 50 },
// ];

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        // return directors.find((director) => director.id == parent.directorId);
        return Directors.findById(parent.directorId);
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
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        // return movies.filter((movie) => movie.directorId == parent.id);
        return Movies.find({ directorId: parent.id });
      },
    },
  }),
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: { 
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return movies.find((movie) => movie.id == args.id);
        return Movies.findById(args.id);
      }
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return directors.find((director) => director.id == args.id);
        return Directors.findById(args.id);
      }
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        // return movies;
        return Movies.find({});
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        // return directors;
        return Directors.find({});
      }
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
});