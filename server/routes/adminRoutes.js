import express, { Router } from 'express';
import { getAllLeaves,updateLeaveStatus,getEmployeeLeaves } from '../controllers/adminController.js';
import {protect} from '../middleware/authMiddleware.js';
import {managerOnly} from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use(protect,managerOnly);
router.get('/leaves',getAllLeaves);
router.put('/leaves/:id/status',updateLeaveStatus);
router.get('/users/:id/leaves',getEmployeeLeaves);

export default router;