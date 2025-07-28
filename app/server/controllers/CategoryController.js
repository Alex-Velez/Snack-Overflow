import {
  getAllCategories,
  getCategoryBySlug,
  getItemsByCategoryId
} from "../models/category.model.js";

export class CategoryController {
  static async list(req, res) {
    const cats = await getAllCategories();
    res.json(cats);
  }

  static async getBySlug(req, res) {
    const { slug } = req.params;
    const cat = await getCategoryBySlug(slug);
    if (!cat) return res.status(404).json({ error: "Category not found" });

    const items = await getItemsByCategoryId(cat.id);
    res.json({ category: cat, items });
  }
}
