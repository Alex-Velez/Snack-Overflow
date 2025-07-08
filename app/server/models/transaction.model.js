import db from "../db.js";
import { getItemBySku } from "./item.model.js";
import { randomUUID } from 'crypto';

//getTransactions()

export async function addTransaction(uid){
  let tid = randomUUID();
  let columns = '(id, user_id, creation_date)';
  let query = `INSERT INTO transactions ${columns} VALUES (?, ?, NOW())`;
  try{
    const [result] = await db.execute(query, [tid, uid]);
    return {id: tid, data: result};
  }
  catch(err){
    if(err.errno === 1452){
      return {error: 'User or Item does not exist'}
    }
    else{
      return {error: err.errno ?? err.message}
    }
  }
}

export async function addTransactionItem(tid, itemId, itemCnt){
  let columns = '(transaction_id, item_id, item_cnt)';
  let query = `INSERT INTO transaction_items ${columns} VALUES (?, ?, ?)`;
  try{
    const [result] = await db.execute(query, [tid, itemId, itemCnt]);
    if(itemCnt < 0){
      throw new Error("NEGATIVE_QUANTITY");
    }
    return result;
  }
  catch(err){
    if(err.errno === 1452){
      return {error: 'Transaction does not exist.'}
    }
    else if(err.errno === 1062){
      updateTransactionItem({itemCnt: itemCnt, sku: itemId, transactionId: tid});
    }
    else if(err.message === 'NEGATIVE_QUANTITY'){
      return {error: 'Item not added due to negative quantity'}
    }
    else{
      return {error: err.errno ?? err.message}
    }
  }
}

export async function getTransactionItem(transactionId, sku){
  let query = 'SELECT * FROM transaction_items WHERE transaction_id=? AND item_id=?';
  try{
    const [result] = await db.execute(query, [transactionId, sku]);
    return result[0];
  }
  catch(err){
    if(err.errno === 1452){
      return {error: 'Item does not exist'}
    }
    else{
      return {error: err.errno ?? err.message}
    }
  }
}

export async function removeTransactionItem(transactionId, sku){
  let query = 'DELETE FROM transaction_items WHERE transaction_id=? AND item_id=?';
  try{
    await db.execute(query, [transactionId, sku]);
  }
  catch(err){
    return {error: err.errno ?? err.message}
  }
}

async function updateTransactionItem({transactionId, sku, itemCnt, transaction_id, item_cnt, item_id}){
  let query = 'UPDATE transaction_items SET item_cnt=item_cnt + ? WHERE transaction_id=? AND item_id=?';
  try{
    const preUpdateItem = await getTransactionItem(transactionId, sku);
    preUpdateItem && parseInt(preUpdateItem.item_cnt) - itemCnt
    if(preUpdateItem && parseInt(preUpdateItem.item_cnt) - itemCnt <= 0){
      await removeTransactionItem(transactionId, sku);
    }
    await db.execute(query, [itemCnt ?? item_cnt, transactionId ?? transaction_id, sku ?? item_id]);
  }
  catch(err){
    return {error: err.errno ?? err.message}
  }
}

export async function getTransactionById(tid){
  let tSelection = 'id, user_id, creation_date, delivered_date, expected_date';
  let tQuery = `SELECT ${tSelection} FROM transactions WHERE id=?`;
  let tItemSelection = 'item_id, item_cnt';
  let tItemQuery = `SELECT ${tItemSelection} FROM transaction_items WHERE transaction_id=?`;
  var transaction = {};
  try{
    let [result] = await db.execute(tQuery, [tid]);
    transaction.info = {
      id: result[0].id, 
      uid: result[0].user_id, 
      created: result[0].creation_date,
      expected: result[0].expected_date,
      delivered: result[0].delivered_date
    };
  }
  catch(err){
    return {error: `Failed to fetch transaction ${err.errno ?? err.message}`};
  }
  try{
    let [result] = await db.execute(tItemQuery, [tid]);
    transaction.items = await Promise.all(
      result.map(async (item) => {
        let fullItem = (await getItemBySku(item.item_id));
        return {
          name: fullItem.item_name,
          itemPrice: parseFloat(fullItem.price),
          totalPrice: parseFloat(fullItem.price) * item.item_cnt,
          count: item.item_cnt
        };
      })
    );
  }
  catch(err){
    return {error: `Failed to fetch transaction items:  ${err.errno ?? err.message}`}
  }
  return transaction;
}

export async function getTransactionsByUid(uid){
  let query = 'SELECT * FROM transactions WHERE user_id=?';
  try{
    let [results] = await db.execute(query, [uid]);
    const transactions = await Promise.all(results.map(async (transaction) => await getTransactionById(transaction.id)));
    return transactions;
  }
  catch(err){
    return {error: err.errno ?? err.message}
  }
}