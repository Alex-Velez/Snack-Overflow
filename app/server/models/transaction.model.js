
import db from "../db.js";
import { getItemBySku } from "./item.model.js";
import { randomUUID } from 'crypto';

const validStatus = (status) =>
  ["CREATED", "DELIVERED", "CANCELLED"].includes(status);

export async function addTransaction(uid, total) {
  const tid = randomUUID();
  const columns = `(id, user_id, creation_date, total, order_status)`;
  const query = `INSERT INTO transactions ${columns} VALUES (?, ?, NOW(), ?, "CREATED")`;
  try {
    const [result] = await db.execute(query, [tid, uid, total]);
    return { id: tid, data: result };
  } catch (err) {
    if (err.errno === 1452) {
      return { error: "User or Item does not exist" };
    }
    return { error: err.errno ?? err.message };
  }
}

export async function addTransactionItem(tid, itemId, itemCnt) {
  const columns = `(transaction_id, item_id, item_cnt)`;
  const query = `INSERT INTO transaction_items ${columns} VALUES (?, ?, ?)`;
  try {
    if (itemCnt < 0) {
      throw new Error("NEGATIVE_QUANTITY");
    }
    const [result] = await db.execute(query, [tid, itemId, itemCnt]);
    return result;
  } catch (err) {
    if (err.errno === 1452) {
      return { error: "Transaction does not exist." };
    } else if (err.errno === 1062) {
      return await updateTransactionItem({
        transactionId: tid,
        sku: itemId,
        itemCnt,
      });
    } else if (err.message === "NEGATIVE_QUANTITY") {
      return { error: "Item not added due to negative quantity" };
    }
    return { error: err.errno ?? err.message };
  }
}

export async function getTransactionItem(transactionId, sku) {
  const query =
    "SELECT * FROM transaction_items WHERE transaction_id = ? AND item_id = ?";
  try {
    const [result] = await db.execute(query, [transactionId, sku]);
    return result[0];
  } catch (err) {
    if (err.errno === 1452) {
      return { error: "Item does not exist" };
    }
    return { error: err.errno ?? err.message };
  }
}

export async function removeTransactionItem(transactionId, sku) {
  const query =
    "DELETE FROM transaction_items WHERE transaction_id = ? AND item_id = ?";
  try {
    const [result] = await db.execute(query, [transactionId, sku]);
    if (result.affectedRows === 0) {
      return { error: "Item or transaction not found." };
    }
    return { success: true };
  } catch (err) {
    return { error: err.errno ?? err.message };
  }
}

async function updateTransactionItem({
  transactionId,
  sku,
  itemCnt,
  transaction_id,
  item_cnt,
  item_id,
}) {
  const query =
    "UPDATE transaction_items SET item_cnt = item_cnt + ? WHERE transaction_id = ? AND item_id = ?";
  try {
    const pre = await getTransactionItem(transactionId, sku);
    if (pre && parseInt(pre.item_cnt) + itemCnt <= 0) {
      return await removeTransactionItem(transactionId, sku);
    }
    const [result] = await db.execute(query, [
      itemCnt ?? item_cnt,
      transactionId ?? transaction_id,
      sku ?? item_id,
    ]);
    return result;
  } catch (err) {
    return { error: err.errno ?? err.message };
  }
}

export async function getTransactionById(tid) {
  // Only select the ID, skip any date fields
  const tQuery = `
    SELECT id
      FROM transactions
     WHERE id = ?
  `;
  const tItemQuery = `
    SELECT item_id, item_cnt
      FROM transaction_items
     WHERE transaction_id = ?
  `;

  try {
    const [[tx]] = await db.execute(tQuery, [tid]);
    if (!tx) return { error: "Transaction not found" };

    const [itemRows] = await db.execute(tItemQuery, [tid]);
    const items = await Promise.all(
      itemRows.map(async ({ item_id, item_cnt }) => {
        const item = await getItemBySku(item_id);
        if (item?.error) {
          return {
            name: "[Unknown Item]",
            sku: item_id,
            itemPrice: 0,
            totalPrice: 0,
            count: item_cnt,
          };
        }
        return {
          name: item.item_name,
          sku: item_id,
          itemPrice: parseFloat(item.price),
          totalPrice: parseFloat(item.price) * item_cnt,
          count: item_cnt,
        };
      })
    );

    return { id: tx.id, items };
  } catch (err) {
    return { error: err.message || "Failed to fetch transaction" };
  }
}

export async function getTransactionsByUid(uid) {
  const query = `
    SELECT id
      FROM transactions
     WHERE user_id = ?
  ORDER BY created_at DESC
  `;

  try {
    const [rows] = await db.execute(query, [uid]);
    console.log("🏷️ Query rows for user", uid, ":", rows);

    const transactions = await Promise.all(
      rows.map((row) => getTransactionById(row.id))
    );

    return transactions.filter((tx) => !tx.error);
  } catch (err) {
    return { error: err.errno ?? err.message };
  }
}

export async function updateTransactionStatus(tid, status) {
  const formatted = status.toUpperCase();
  const prev = await getTransactionById(tid);
  const prevStatus = prev.items ? prev.id : prev.info?.status; // if needed
  if (!validStatus(formatted)) {
    return { error: "INVALID_STATUS" };
  }
  if (["DELIVERED", "CANCELLED"].includes(prevStatus)) {
    return { error: "INVALID_UPDATE" };
  }

  const query = "UPDATE transactions SET order_status = ? WHERE id = ?";
  try {
    await db.execute(query, [formatted, tid]);
    return { success: true };
  } catch (err) {
    return { error: err.errno ?? err.message };
  }
}
