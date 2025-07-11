import db from "../db.js";

export async function getCart(uid){
  let selection = 'items.sku, items.upc, items.item_name, items.item_desc, items.price, items.rating, items.category, items.img_path, cart_items.item_cnt';
  let query = `SELECT ${selection} FROM cart_items INNER JOIN items ON cart_items.item_id=items.sku WHERE cart_items.user_id=?`;
  try{
    const [result] = await db.execute(query, [uid]);
    return result;
  }
  catch(err){
    return {error: err.errno ?? err.message}
  }
}

export async function getCartItem(uid, sku){
  let query = 'SELECT * FROM cart_items WHERE user_id=? AND item_id=?';
  try{
    const [result] = await db.execute(query, [uid, sku]);
    return result[0];
  }
  catch(err){
    return {error: err.errno ?? err.message}
  }
}

export async function addCartItem(uid, sku, cnt){
  let columns = '(user_id, item_id, item_cnt)'
  let query = `INSERT INTO cart_items ${columns} VALUES (?, ?, ?)`;
  try{
    const [result] = await db.execute(query, [uid, sku, cnt]);
    return result;
  }
  catch(err){
    if(err.errno === 1062){
      return await updateCartItem(uid, sku, cnt);
    }
    else{
      return {error: err.errno ?? err.message}
    }
  }
}

export async function updateCartItem(uid, sku, cnt){
  let query = 'UPDATE cart_items SET item_cnt=item_cnt+? WHERE user_id=? AND item_id=?';
  let prevItem = await getCartItem(uid, sku);
  try{
    if(parseInt(prevItem.item_cnt) + cnt <= 0){
      throw new Error('BAD_QUANTITY');
    }
    await db.execute(query, [cnt, uid, sku]);
    return {status: 'Success'}
  }
  catch(err){
    if(err.message === 'BAD_QUANTITY'){
      return await removeCartItem(uid, sku);
    }
    else{
      return {error: err.errno ?? err.message}
    }
  }
}

export async function removeCartItem(uid, sku){
  let query = 'DELETE FROM cart_items WHERE user_id=? AND item_id=?';
  try{
    await db.execute(query, [uid, sku]);
    return {status: 'Success'}
  }
  catch(err){
    return {error: err.errno ?? err.message}
  }
}

export async function deleteCart(uid){
  let query = 'DELETE FROM cart_items WHERE user_id=?';
  try{
    await db.execute(query, [uid]);
    return {status: 'Success'}
  }
  catch(err){
    return {error: err.errno ?? err.message}
  }
}
