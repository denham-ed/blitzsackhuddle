import { Schema, model } from 'mongoose';

const leagueSchema = new Schema({
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

const League = model('League', leagueSchema);

export default League;
