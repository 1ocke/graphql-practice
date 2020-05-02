const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean
} = graphql;

const Movies = require('../models/movie.js');
const Directors = require('../models/director.js');

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    genre: { type: new GraphQLNonNull(GraphQLString) },
    watched: { type: new GraphQLNonNull(GraphQLBoolean) },
    rate: { type: GraphQLInt },
    director: {
      type: DirectorType,
      resolve({ directorId }, args) {
        return Directors.findById(directorId);
      }
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    movies: {
      type: new GraphQLList(MovieType),
      resolve({ id }, args) {
        return Movies.find({ directorId: id });
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve({ name,  age }, args) {
        const director = new Directors({
          name,
          age,
        });

        return director.save();
      },
    },
    addMovie: {
      type: MovieType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        watched: { type: new GraphQLNonNull(GraphQLBoolean) },
        rate: { type: GraphQLInt },
        directorId: { type: GraphQLID },
      },
      resolve({ name, genre, directorId, watched, rate }, args) {
        const movie = new Movies({
          name,
          genre,
          directorId,
          watched,
          rate,
        });
        
        return movie.save();
      },
    },
    removeDirector: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve({ id }, args) {
        return Directors.findByIdAndRemove(id);
      },
    },
    removeMovie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve({ id }, args) {
        return Movies.findByIdAndRemove(id);
      },
    },
    updateDirector: {
      type: DirectorType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve({ id, name, age, }, args) {
        return Directors.findByIdAndUpdate(
          id,
          { $set: { name, age } },
          { new: true }
        );
      },
    },
    updateMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        watched: { type: new GraphQLNonNull(GraphQLBoolean) },
        rate: { type: GraphQLInt },
        directorId: { type: GraphQLID },
      },
      resolve({ id, name, genre, directorId, watched, rate}, args) {
        return Movies.findByIdAndUpdate(
          id,
          { $set: {
            name,
            genre,
            directorId,
            watched,
            rate,
          } },
          { new: true }
        );
      },
    },
  },
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: { 
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve({ id }, args) {
        return Movies.findById(id);
      }
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve({ id }, args) {
        return Directors.findById(id);
      }
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve() {
        return Movies.find({});
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve() {
        return Directors.find({});
      }
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
