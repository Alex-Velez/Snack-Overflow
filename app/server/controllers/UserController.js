import db from '../db.js';
import {
    addUser,
    getUser,
    getUserById,
    getUsers,
    updateUser
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

    static async update(req, res){
      const { uid, first, last, email, password, address } = req.body;
      const result = await updateUser({
        uid,
        first,
        last,
        email,
        password,
        address
      })

      if (result.error) {
        return res.status(500).json({ error: result.error });
      }
      return res.json({success: true});
    }
  }
  

