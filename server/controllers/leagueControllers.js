import League from '../models/league';

// Create a league
export const createLeague = async (req, res) => {
  try {
    const { name, year } = req.body;
    const league = new League({ name, year });
    const savedLeague = await league.save();
    res.status(201).json(savedLeague);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all leagues
export const getAllLeagues = async (req, res) => {
  try {
    const leagues = await League.find();
    res.json(leagues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a league by ID
export const getLeagueById = async (req, res) => {
  try {
    const { id } = req.params;
    const league = await League.findById(id);
    if (!league) {
      return res.status(404).json({ error: 'League not found' });
    }
    res.json(league);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a league
export const updateLeague = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, year } = req.body;
    const league = await League.findByIdAndUpdate(id, { name, year }, { new: true });
    if (!league) {
      return res.status(404).json({ error: 'League not found' });
    }
    res.json(league);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a league
export const deleteLeague = async (req, res) => {
  try {
    const { id } = req.params;
    const league = await League.findByIdAndDelete(id);
    if (!league) {
      return res.status(404).json({ error: 'League not found' });
    }
    res.json({ message: 'League deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
