import db from '../db.js';
import {
    addUser,
    getUser,
    getUserById,
    getUsers
  } from '../models/user.model.js';
  
  export class UserController {
    static async register(req, res) {
      const {first, last, email, password} = req.body;
      const result = await addUser({first, last, email, password});

      if (result.error) {
        return res.status(400).json({error: result.error});
      }
      return res.status(201).json({userId: result.id});
    }

    static async login(req, res) {
      const {email, password} = req.body;
      const user = await getUser({email, password});

      if (user.error) {
        return res.status(401).json({error: user.error});
      }
      return res.json(user);
    }

    static async getById(req, res) {
      const {uid} = req.params;
      const user = await getUserById(uid);

      if (user.error) {
        return res.status(404).json({error: user.error});
      }
      return res.json(user);
    }

    static async list(req, res) {
      const users = await getUsers();

      if (users.error) {
        return res.status(500).json({error: users.error});
      }
      return res.json(users);
    }

    static async update(req, res) {
      const {uid} = req.params;
      const {first_name, last_name, email_addr, address} = req.body;

      try {
        await db.query(
            `UPDATE users
             SET first_name = ?,
                 last_name = ?,
                 email_addr = ?,
                 address = ?
             WHERE id = ?`,
            [first_name, last_name, email_addr, address, uid]
        );

        const [rows] = await db.query(
            `SELECT id, first_name, last_name, email_addr, address
             FROM users
             WHERE id = ?`,
            [uid]
        );

        if (rows.length === 0) {
          return res.status(404).json({error: 'User not found'});
        }

        return res.json(rows[0]);
      } catch (err) {
        console.error('Error in UserController.update:', err);
        return res.status(500).json({error: 'Server error'});
      }
    }
  }