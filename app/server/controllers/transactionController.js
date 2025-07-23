// controllers/TransactionController.js
import {
  addTransaction,
  addTransactionItem,
  removeTransactionItem,
  getTransactionById,
  getTransactionsByUid
} from '../models/transaction.model.js';

export class TransactionController {
  
  static async start(req, res) {
    const { userId, total } = req.body;
    const result = await addTransaction(userId, total);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    const transactionId = result.id ?? result.insertId;
    return res.status(201).json({ transactionId });
  }


  static async addItem(req, res) {
    const { tid } = req.params;
    const { sku, quantity } = req.body;
    const result = await addTransactionItem(tid, sku, quantity);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json({ message: 'Item added to transaction.' });
  }


  static async removeItem(req, res) {
    const { tid, sku } = req.params;
    const result = await removeTransactionItem(tid, sku);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.json({ message: 'Item removed from transaction.' });
  }

  static async getById(req, res) {
    const { tid } = req.params;
    const tx = await getTransactionById(tid);

    if (tx.error) {
      return res.status(404).json({ error: tx.error });
    }
    return res.json(tx);
  }


  static async listByUser(req, res) {
    const { uid } = req.params;
    const list = await getTransactionsByUid(uid);

    if (list.error) {
      return res.status(400).json({ error: list.error });
    }
    return res.json(list);
  }
}