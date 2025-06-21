import express from 'express';
import { sql } from '../config/db.js';
import { createTransaction, deleteTransaction, getSummaryByUserId, getTransactionsByUserId } from '../controller/transactionsController.js';

const router = express.Router();


 router.get('/', (req, res) => {
   res.send('API is running');
 });

router.get("/:userId", getTransactionsByUserId);
router.post("/", createTransaction)
router.delete("/:id", deleteTransaction)
router.get("/summary/:userId", getSummaryByUserId)

export default router;