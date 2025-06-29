import express from 'express'
import { applyLeave, getMyLeaves, cancelLeave } from '../controllers/leaveController.js';
import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);
router.post('/',applyLeave);
router.get('/',getMyLeaves);
router.delete('/:id',cancelLeave);

export default router;
