const { Tech, Matchup } = require('../models');

const resolvers = {
  Query: {
    tech: async () => {
      // return Tech.find({});
      return "placeholder";
    },
    matchups: async (parent, { _id }) => {
      // const params = _id ? { _id } : {};
      // return Matchup.find(params);
      return "placeholder"
    },
  },
  Mutation: {
    createMatchup: async (parent, args) => {
      // const matchup = await Matchup.create(args);
      return "placeholder";
    },
    createVote: async (parent, { _id, techNum }) => {
      // const vote = await Matchup.findOneAndUpdate(
      //   { _id },
      //   { $inc: { [`tech${techNum}_votes`]: 1 } },
      //   { new: true }
      // );
      return "placeholder";
    },
  },
};

module.exports = resolvers;
