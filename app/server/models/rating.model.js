import db from "../db.js";
import { updateItem, getItemBySku } from "./item.model.js";

const mean = (arr) => {
    let sum = arr.reduce((accumulator, num) => accumulator + num, 0);
    return sum / arr.length;
}

export async function addRating(sku, rating, uid) {
    let query = 'INSERT INTO item_ratings (user_id, item_id, rating) VALUES (?, ?, ?)';
    try {
        if (rating < 0) {
            throw new Error('SUBZERO_RANKING')
        }
        await db.execute(query, [uid, sku, rating]);
        await updateItemRating(sku);
        return { status: 'Success' }
    }
    catch (err) {
        if (err.errno === 1452) {
            return { error: 'User or item does not exist' }
        }
        else if (err.errno === 1062) {
            return await updateUserRating(sku, rating, uid);
        }
        else if (err.message === 'SUBZERO_RANKING') {
            return { error: 'Ranking below 0' }
        }
        else {
            return { error: err.errno ?? err.message }
        }
    }
}

export async function getRatings(sku) {
    let query = 'SELECT rating FROM item_ratings WHERE item_id=?'
    try {
        const [results] = await db.execute(query, [sku]);
        return results.map((data) => parseFloat(data.rating));
    }
    catch (err) {
        return { error: err.errno ?? err.message }
    }
}

async function updateItemRating(sku) {
    let item = await getItemBySku(sku);
    let ratings = await getRatings(sku);
    return await updateItem({
        ...item,
        rating: mean(ratings)
    })
}

async function updateUserRating(sku, rating, uid) {
    let query = 'UPDATE item_ratings SET rating=? WHERE item_id=? AND user_id=?';
    try {
        const [results] = await db.execute(query, [rating, sku, uid]);
        await updateItemRating(sku);
        return results;
    }
    catch (err) {
        return { error: err.errno ?? err.message }
    }
}

