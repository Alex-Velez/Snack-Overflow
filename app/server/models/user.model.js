import db from '../db.js'
import { randomUUID } from 'crypto';

export async function addUser({first, last, email, password}){
  let uid = randomUUID()
  let query = "INSERT INTO users (id, first_name, last_name, email_addr, password_hash) VALUES (?, ?, ?, ?, ?)";
  try{
    const result = await db.execute(query, [uid, first, last, email,password]);
    return {id: uid, data: result};
  }
  catch(err){
    if(err.errno === 1062){
      return {error: 'EMAIL_IN_USE'}
    }
    else{
      return {error: err.errno ?? err.message}
    }
  }
}

export async function getUser({email, password}){
  let query = "SELECT * FROM users WHERE email_addr=?";
  try{
    const [result] = await db.execute(query, [email]);
    if(result.length === 0){
      throw new Error('BAD_EMAIL');
    }
    
    const user = result[0]

    if(user.password_hash !== password){
      throw new Error('BAD_PASSWORD');
    }
    return user;
  }
  catch(err){
    if(err.message === 'BAD_EMAIL' || err.message === 'BAD_PASSWORD'){
      return {error: 'BAD_USER_LOOKUP'}
    }
    else{
      return {error: err.errno ?? err.message}
    }
  }
}

export async function getUserById(uid){
  let query = 'SELECT id, first_name, last_name, email_addr FROM users WHERE id=?';
  
  try{
    const [result] = await db.execute(query, [uid]);
    if(result.length === 0){
      throw new Error('INVALID_UID');
    }
    const user = result[0];
    return user;
  } 
  catch(err){
    if(err.message === 'INVALID_UID'){
      return {error: 'User not found.'}
    }
    else{
      return {error: err.errno ?? err.message}
    }
  }
}

export async function getUsers(PROTECTED=true){
  let selection = PROTECTED ? "first_name, last_name, email_addr" : "*";
  let query = `SELECT ${selection} FROM users`
  try{
    const [results] = await db.execute(query);
    return results;
  }
  catch(err){
    return {error: err.errno ?? err.message}
  }
}

//getUsersByName
