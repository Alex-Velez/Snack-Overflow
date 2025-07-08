import db from '../db.js';
import { DB_UPLOADS_PATH } from '../db.js';



export async function addItem({name, desc, upc, sku, price, rating, category, imgSrc}){
  let columns = '(sku, upc, item_name, item_desc, price, rating, category, img_path)'
  let query = `INSERT INTO items ${columns} VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  try{
    const [result] = await db.execute(query, [sku, upc, name, desc, price, rating, category, imgSrc]);
    return result;
  }
  catch(err){
    console.log(err)
  }
}

export async function getItems(){
  let query = 'SELECT * FROM items';
  try{
    const [items] = await db.execute(query);
    return items;
  }
  catch(err){
    console.log(err)
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
    console.log(err);
  }
}

export async function getItemBySku(sku){
  let query = 'SELECT * FROM items WHERE sku=?'
  try{
    const [result] = await db.execute(query, [sku]);
    if(result.length === 0){
      console.log("Item does not exist");
    }
    else{
      return result[0];
    }
  }
  catch(err){
    console.log(err)
  }
}

export async function getItemByUpc(upc){
  let query = 'SELECT * FROM items WHERE upc=?'
  try{
    const [result] = await db.execute(query, [upc]);
    if(result.length === 0){
      console.log("Item does not exist");
    }
    else{
      return result[0];
    }
  }
  catch(err){
    console.log(err)
  }
}

export async function getItemsByCategory(category){
  let query = 'SELECT * FROM items WHERE category=?'
  try{
    const [result] = await db.execute(query, [category]);
    if(result.length === 0){
      console.log("Item does not exist");
    }
    else{
      return result;
    }
  }
  catch(err){
    console.log(err)
  }
}

export async function getItemsByName(name){
  let pattern = `%${name}%`
  let query = 'SELECT * FROM items WHERE item_name LIKE ?'
  try{
    const [result] = await db.execute(query, [pattern]);
    if(result.length === 0){
      console.log("Item does not exist");
    }
    else{
      return result;
    }
  }
  catch(err){
    console.log(err)
  }
}

export async function deleteItem(sku){
  let query = 'DELETE FROM items WHERE sku=?'
  try{
    const [result] = db.execute(query, [sku]);
    return result;
  }
  catch(err){
    console.error(err);
  }
}