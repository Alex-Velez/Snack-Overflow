import db from '../db.js'
import { randomUUID } from 'crypto';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^[^\s]{8,15}$/;
const nameRegex = /^[a-zA-Z\s'-]+$/;
const validateEmail = (email) => emailRegex.test(email);
const validatePassword = (password) => passwordRegex.test(password);
const validateName = (name) => nameRegex.test(name);

export async function addUser({first, last, email, password}){
  if(!validateEmail(email)){
    return {error: 'INVALID_EMAIL'}
  }
  if(!validatePassword(password)){
    return {error: 'INVALID_PASSWORD'}
  }
  if(!validateName(first)){
    return {error: 'INVALID_FIRSTNAME'}
  }
  if(!validateName(last)){
    return {error: 'INVALID_LASTNAME'}
  }
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

export async function getUserById(uid, PROTECTED=true){
  let columns = PROTECTED ? "id, first_name, last_name, email_addr, shipping_addr" : '*'
  let query = `SELECT ${columns} FROM users WHERE id=?`;
  
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

export async function updateUser({uid, first, last, email, password, address}){
  if(email && !validateEmail(email)){
    return {error: 'INVALID_EMAIL'}
  }
  if(password && !validatePassword(password)){
    return {error: 'INVALID_PASSWORD'}
  }
  if(first && !validateName(first)){
    return {error: 'INVALID_FIRSTNAME'}
  }
  if(last && !validateName(last)){
    return {error: 'INVALID_LASTNAME'}
  }
  
  const prev = await getUserById(uid, false);
  const newUser = {
    first: first ?? prev.first_name,
    last: last ?? prev.last_name,
    email: email ?? prev.email_addr,
    password: password ?? prev.password_hash,
    address: address ?? prev.shipping_addr
  }
  let columns = ("first_name=?, last_name=?, email_addr=?, password_hash=?, shipping_addr=?");
  let query = `UPDATE users SET ${columns} WHERE id=?`;
  try{
    await db.execute(query, [
      newUser.first,
      newUser.last,
      newUser.email,
      newUser.password,
      (newUser.address ?? null),
      uid
    ])
    return {success: true}
  }
  catch(err){
    return {error: err.errno ?? err.message}
  }
}
