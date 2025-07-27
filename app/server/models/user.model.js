import db from '../db.js'
import { randomUUID } from 'crypto';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^[^\s]{8,15}$/;
const nameRegex = /^[a-zA-Z\s'-]+$/;
const validateEmail = (email) => emailRegex.test(email);
const validatePassword = (password) => passwordRegex.test(password);
const validateName = (name) => nameRegex.test(name);

export async function addUser({ first, last, email, password }) {
    if (!validateEmail(email)) {
        return { error: 'INVALID_EMAIL' };
    }
    if (!validatePassword(password)) {
        return { error: 'INVALID_PASSWORD' };
    }
    if (!validateName(first)) {
        return { error: 'INVALID_FIRSTNAME' };
    }
    if (!validateName(last)) {
        return { error: 'INVALID_LASTNAME' };
    }

    const uid = randomUUID();
    const query = `INSERT INTO users (id, first_name, last_name, email_addr, password_hash) VALUES (?, ?, ?, ?, ?)`;
    try {
        await db.execute(query, [uid, first, last, email, password]);
        return { id: uid };
    } catch (err) {
        if (err.errno === 1062) {
            return { error: 'EMAIL_IN_USE' };
        }
        return { error: err.errno ?? err.message };
    }
}

export async function getUser({ email, password }) {
    const query = `SELECT * FROM users WHERE email_addr = ?`;
    try {
        const [rows] = await db.execute(query, [email]);
        if (rows.length === 0) {
            throw new Error('BAD_EMAIL');
        }
        const user = rows[0];
        if (user.password_hash !== password) {
            throw new Error('BAD_PASSWORD');
        }
        return user;
    } catch (err) {
        if (err.message === 'BAD_EMAIL' || err.message === 'BAD_PASSWORD') {
            return { error: 'BAD_USER_LOOKUP' };
        }
        return { error: err.errno ?? err.message };
    }
}

export async function getUserById(uid, PROTECTED = true) {
    const columns = PROTECTED
        ? 'id, first_name, last_name, email_addr, shipping_addr'
        : '*';
    const query = `SELECT ${columns} FROM users WHERE id = ?`;
    try {
        const [rows] = await db.execute(query, [uid]);
        if (rows.length === 0) {
            throw new Error('INVALID_UID');
        }
        return rows[0];
    } catch (err) {
        if (err.message === 'INVALID_UID') {
            return { error: 'User not found.' };
        }
        return { error: err.errno ?? err.message };
    }
}

export async function getUsers(PROTECTED = true) {
    const selection = PROTECTED
        ? 'first_name, last_name, email_addr'
        : '*';
    const query = `SELECT ${selection} FROM users`;
    try {
        const [rows] = await db.execute(query);
        return rows;
    } catch (err) {
        return { error: err.errno ?? err.message };
    }
}

export async function updateUser({ uid, first, last, email, password, shipping_addr }) {
    if (email && !validateEmail(email)) {
        return { error: 'INVALID_EMAIL' };
    }
    if (password && !validatePassword(password)) {
        return { error: 'INVALID_PASSWORD' };
    }
    if (first && !validateName(first)) {
        return { error: 'INVALID_FIRSTNAME' };
    }
    if (last && !validateName(last)) {
        return { error: 'INVALID_LASTNAME' };
    }

    const prev = await getUserById(uid, false);
    if (prev.error) {
        return { error: prev.error };
    }

    const newFirst = first ?? prev.first_name;
    const newLast = last ?? prev.last_name;
    const newEmail = email ?? prev.email_addr;
    const newPassword = password ?? prev.password_hash;
    const newShipping = shipping_addr ?? prev.shipping_addr;

    const query = `UPDATE users
    SET first_name = ?,
        last_name = ?,
        email_addr = ?,
        password_hash = ?,
        shipping_addr = ?
    WHERE id = ?`;

    try {
        await db.execute(query, [
            newFirst,
            newLast,
            newEmail,
            newPassword,
            newShipping,
            uid
        ]);

        return await getUserById(uid);
    } catch (err) {
        return { error: err.errno ?? err.message };
    }
}
