import {
  getCart, 
  getCartItem, 
  addCartItem, 
  removeCartItem, 
  deleteCart} 
from "../models/cart.model.js"

import {
  addTransaction,
  addTransactionItem
}
from "../models/transaction.model.js"

import {
  getDiscount
}
from "../models/discount.model.js"



const TAX_RATE = .0825

export class CartController{
  static async update(req, res){
    const {userId, sku, count} = req.body;
    const result = await addCartItem(userId, sku, count);

    if(result.error){
      return res.status(400).json({error: result.error})
    }
    return res.status(201).json({message: "Cart updated."});
  }

  static async remove(req, res){
    const {userId} = req.body;
    const {sku} = req.params;
    const result = await removeCartItem(userId, sku);

    if(result.error){
      return res.status(400).json({error: result.error})
    }
    return res.status(200).json({message: "Item removed from cart."});
  }

  static async clear(req, res){
    const {userId} = req.body;
    const result = await deleteCart(userId);

    if(result.error){
      return res.status(400).json({error: result.error})
    }
    return res.status(200).json({message: "Cart cleared."});
  }

  static async getAll(req, res){
    const {userId} = req.params;
    const result = await getCart(userId);

    if(result.error){
      return res.status(404).json({error: result.error})
    }
    return res.status(200).json(result);
  }

  static async getItem(req, res){
    const {userId, sku} = req.params;
    const result = await getCartItem(userId, sku);

    if(result.error){
      return res.status(404).json({error: result.error})
    }
    return res.status(200).json(result);
  }

  static async createOrder(req, res){
    const {userId, addTip, fastDelivery, discountCode} = req.body;
    let cart = await getCart(userId);
    let discountObj = await getDiscount(discountCode);
    let discount = discountObj ? parseInt(discountObj.discount) * .01 : null;
    var total = fastDelivery ? 4.99 : 2.99;
    cart.forEach((item) => {
      let thisPrice = parseFloat(item.price);
      if(discount && (discountObj.sku === '00000' || item.sku === discountObj.sku)){
        let thisIncr = (thisPrice - (thisPrice * parseFloat(discount))) * parseInt(item.item_cnt);
        total += thisIncr + (thisIncr * TAX_RATE);
      }
      else{
        let thisIncr = thisPrice * parseInt(item.item_cnt)
        total += thisIncr + (thisIncr * TAX_RATE);
      }
    })
    if(addTip){
      total += 1;
    }
    let transaction = await addTransaction(userId, total);
    let tid = transaction.id;
    for(const item of cart){
      await addTransactionItem(tid, item.sku, item.item_cnt);
    }

    await deleteCart(userId)
  }
}