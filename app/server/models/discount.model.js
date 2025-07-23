import db from "../db.js";
import { getItemBySku } from "./item.model.js";

export async function addDiscount(code, sku='00000', discount){
  let columns = '(code, sku, discount)';
  let query = `INSERT INTO discounts ${columns} VALUES (?, ?, ?)`;
  try{
    if(sku !== '00000'){
      const item = await getItemBySku(sku);
      if(item.error){
        throw new Error("NO_ITEM");
      }
    }
    const [result] = await db.execute(query, [code, sku, discount]);
    return result;
  }
  catch(err){
    if(err.errno === 1062){
      return {error: "CODE_EXISTS"};
    }
    else if(err.message === "NO_ITEM"){
      return {error: "NO_ITEM"}
    }  
    else{  
      return {error: err.errno ?? err.message}
    }
  }
}

export async function getDiscount(code){
  let query = 'SELECT * FROM discounts WHERE code=?';
  try{
    const [result] = await db.execute(query, [code]);
    return result[0];
  }
  catch(err){
    return {error: err.errno ?? err.message};
  }
}

export async function removeDiscount(code){
  let query = 'DELETE FROM discounts WHERE code=?';
  try{
    await db.execute(query, [code]);
    return {success: true};
  }
  catch(err){
    return {error: err.errno ?? err.message};
  }
}