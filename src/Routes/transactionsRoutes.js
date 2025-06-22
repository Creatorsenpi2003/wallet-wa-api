import express from 'express';
import { createTransaction, deleteTransaction, getSummaryByUserId, getTransactionsByUserId } from '../controller/transactionsController.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('API is running');
});

router.get('/summary/:userId', getSummaryByUserId);      // ✅ more specific route first
router.get('/:userId', getTransactionsByUserId);         // ⬅️ must be below /summary
router.post('/', createTransaction);
router.delete('/:id', deleteTransaction);

export default router;
