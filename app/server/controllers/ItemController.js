import {
    addItem,
    getItems,
    updateItem,
    deleteItem,
    getItemBySku,
    getItemByUpc,
    getItemsByCategory,
    getItemsByName
} from '../models/item.model.js';

export class ItemController {
    static async create(req, res) {
        const newItem = req.body;
        const result = await addItem(newItem);

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }
        return res.status(201).json({ message: 'Item created.' });
    }

    static async list(req, res) {
        const items = await getItems();

        if (items.error) {
            return res.status(500).json({ error: items.error });
        }
        return res.json(items);
    }

    static async getBySku(req, res) {
        const { sku } = req.params;
        const item = await getItemBySku(sku);

        if (item.error) {
            return res.status(404).json({ error: item.error });
        }
        return res.json(item);
    }

    static async getByUpc(req, res) {
        const { upc } = req.params;
        const item = await getItemByUpc(upc);

        if (item.error) {
            return res.status(404).json({ error: item.error });
        }
        return res.json(item);
    }

    static async getByCategory(req, res) {
        const { category } = req.params;
        const items = await getItemsByCategory(category);

        if (items.error) {
            return res.status(400).json({ error: items.error });
        }
        return res.json(items);
    }

    static async getByName(req, res) {
        const { name } = req.params;
        console.log(name)
        const items = await getItemsByName(name);
        console.log(items)

        if (items.error) {
            return res.status(400).json({ error: items.error });
        }
        return res.json(items);
    }

    static async update(req, res) {
        const updatedItem = req.body;
        const result = await updateItem(updatedItem);

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }
        return res.json({ message: 'Item updated successfully.' });
    }

    static async remove(req, res) {
        const { sku } = req.params;
        const result = await deleteItem(sku);

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }
        return res.json({ message: 'Item deleted.' });
    }
}
