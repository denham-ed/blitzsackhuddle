import express from 'express';
import {
  createLeague,
  getAllLeagues,
  getLeagueById,
  updateLeague,
  deleteLeague,
} from '../controllers/leagueControllers';

const router = express.Router();

router.route('/leagues')
  .post(createLeague)
  .get(getAllLeagues);

router.route('/leagues/:id')
  .get(getLeagueById)
  .put(updateLeague)
  .delete(deleteLeague);

export default router;