const mongoose = require('mongoose')
const leagueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  year: {
    type: String,
    required: true
  }
});

const League = mongoose.Model('League', leagueSchema);

export default League;
