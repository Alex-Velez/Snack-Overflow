import {
  getCart, 
  getCartItem, 
  addCartItem, 
  removeCartItem, 
  deleteCart} 
from "../models/cart.model.js"

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
    const {userId} = req.body;
    const result = await getCart(userId);

    if(result.error){
      return res.status(404).json({error: result.error})
    }
    return res.status(200).json(result);
  }

  static async getItem(req, res){
    const {userId} = req.body;
    const {sku} = req.params;
    const result = await getCartItem(userId, sku);

    if(result.error){
      return res.status(404).json({error: result.error})
    }
    return res.status(200).json(result);
  }
}