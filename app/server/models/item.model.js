import db from '../db.js';
import { DB_UPLOADS_PATH } from '../db.js';

const skuRegex = /^\d{5}$/;
const validateSku = (sku) => skuRegex.test(sku); 

export async function addItem({name, desc, upc, sku, price, category, imgSrc}){
  if(!validateSku(sku)){
    return {error: "INVALID_SKU", description: "Sku must be 5 numbers"}
  }
  let columns = '(sku, upc, item_name, item_desc, price, category, img_path)'
  let query = `INSERT INTO items ${columns} VALUES (?, ?, ?, ?, ?, ?, ?)`;
  try{
    const [result] = await db.execute(query, [sku, upc, name, desc, price, category, imgSrc]);
    return result;
  }
  catch(err){
    return {error: err.errno ?? err.message}
  }
}

export async function getItems(){
  let query = 'SELECT * FROM items';
  try{
    const [items] = await db.execute(query);
    return items;
  }
  catch(err){
    return {error: err.errno ?? err.message}
  }
}

export async function updateItem({sku, name, desc, upc, price, rating, category, imgSrc, item_name, item_desc, img_path}){
  let sets = 'item_name=?, item_desc=?, upc=?, price=?, rating=?, category=?, img_path=?'
  let query = `UPDATE items SET ${sets} WHERE sku=?`
  try{
    const [result] = await db.execute(query, [name ?? item_name, desc ?? item_desc, upc, price, rating, category, imgSrc ?? img_path, sku]);
    return result;
  }
  catch(err){
    return {error: err.errno ?? err.message}
  }
}

export async function getItemBySku(sku){
  let query = 'SELECT * FROM items WHERE sku=?'
  try{
    const [result] = await db.execute(query, [sku]);
    if(result.length === 0){
      throw new Error('BAD_ITEM_LOOKUP');
    }
    else{
      return result[0];
    }
  }
  catch(err){
    if(err.message === 'BAD_ITEM_LOOKUP'){
      return {error: 'BAD_ITEM_LOOKUP'}
    }
    else{
      return {error: err.errno ?? err.message}
    }
  }
}

export async function getItemByUpc(upc){
  let query = 'SELECT * FROM items WHERE upc=?'
  try{
    const [result] = await db.execute(query, [upc]);
    if(result.length === 0){
      throw new Error('BAD_ITEM_LOOKUP');
    }
    else{
      return result[0];
    }
  }
  catch(err){
    if(err.message === 'BAD_ITEM_LOOKUP'){
      return {error: 'Item does not exist.'}
    }
    else{
      return {error: err.errno ?? err.message}
    }
  }
}

export async function getItemsByCategory(category){
  let query = 'SELECT * FROM items WHERE category=?'
  try{
    const [result] = await db.execute(query, [category]);
    return result;
  }
  catch(err){
    return {error: err.errno ?? err.message}
  }
}

export async function getItemsByName(name){
  let pattern = `%${name}%`
  let query = 'SELECT * FROM items WHERE item_name LIKE ?'
  try{
    const [result] = await db.execute(query, [pattern]);
    return result;
  }
  catch(err){
    return {error: err.errno ?? err.message}
  }
}

export async function deleteItem(sku){
  let query = 'DELETE FROM items WHERE sku=?'
  try{
    const [result] = db.execute(query, [sku]);
    return result;
  }
  catch(err){
    return {error: err.errno ?? err.message}
  }
}