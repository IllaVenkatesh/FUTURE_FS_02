import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  addNote,
  createLead,
  deleteLead,
  getDashboard,
  getLeadById,
  getLeads,
  updateLead,
  updateLeadStatus,
} from '../controllers/leadController.js';

const router = express.Router();

router.post('/leads', protect, createLead);
router.get('/leads', protect, getLeads);
router.get('/leads/:id', protect, getLeadById);
router.put('/leads/:id', protect, updateLead);
router.delete('/leads/:id', protect, deleteLead);
router.patch('/leads/status', protect, updateLeadStatus);
router.post('/leads/:id/notes', protect, addNote);
router.get('/dashboard', protect, getDashboard);

export default router;
