import db from "../db.js";

export async function getAllCategories() {
  const [rows] = await db.execute(`SELECT name, slug FROM categories ORDER BY name`);
  return rows;
}

export async function getCategoryBySlug(slug) {
  const [rows] = await db.execute(
    `SELECT id, name, slug FROM categories WHERE slug = ?`, [slug]
  );
  return rows[0] || null;
}

export async function getItemsByCategoryId(categoryId) {
  const query = `
    SELECT 
      i.sku, 
      i.item_name AS name, 
      i.price, 
      i.rating
    FROM items i
    JOIN item_categories ic 
      ON ic.item_id = i.sku
    WHERE ic.category_id = ?
  `;
  const [rows] = await db.execute(query, [categoryId]);

  // decimals dont work 
  return rows.map(r => ({
    sku:    r.sku,
    name:   r.name,
    price:  parseFloat(r.price),
    rating: parseFloat(r.rating)
  }));
}
