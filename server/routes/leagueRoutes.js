import express from 'express';
import {
  createLeague,
  getAllLeagues,
  getLeagueById,
  updateLeague,
  deleteLeague,
} from '../controllers/league';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/leagues')
  .post(protect, createLeague)
  .get(protect, getAllLeagues);

router.route('/leagues/:id')
  .get(protect, getLeagueById)
  .put(protect, updateLeague)
  .delete(protect, deleteLeague);

export default router;
