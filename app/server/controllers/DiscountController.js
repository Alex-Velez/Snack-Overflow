import {
  getDiscount,
  addDiscount,
  removeDiscount
}
from '../models/discount.model.js'

export class DiscountController{
  static async add(req, res){
    const {code, sku, discount} = req.body;
    const result = await addDiscount(code, sku, discount);

    if(result.error){
      return res.status(400).json({error: result.error})
    }
    return res.status(201).json({message: "Discount Added."});
  }

  static async get(req, res){
    const {code} = req.params;
    const result = await getDiscount(code);

    if(result.error){
      return res.status(400).json({error: result.error})
    }

    return res.status(201).json(result);
  }

  static async remove(req, res){
    const {code} = req.discount;
    const result = await removeDiscount(code);

    if(result.error){
      return res.status(400).json({error: result.error})
    }
    return res.status(201).json({message: "Discount Remove."});
  }

  
}