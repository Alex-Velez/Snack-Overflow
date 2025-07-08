import db from '../db.js'

export async function addUser({first, last, email, password}){
  let query = "INSERT INTO users (id, first_name, last_name, email_addr, password_hash) VALUES (UUID(), ?, ?, ?, ?)";
  try{
    const result = await db.execute(query, [first, last, email,password]);
    return result;
  }
  catch(err){
    console.log("ERROR: Email in use")
  }
}

export async function getUser({email, password}){
  let query = "SELECT * FROM users WHERE email_addr=?";
  try{
    const [result] = await db.execute(query, [email]);
    if(result.length === 0){
      throw new Error("Invalid Email");
    }
    
    const user = result[0]

    if(user.password_hash !== password){
      throw new Error("Invalid password")
    }
    return user;
  }catch(err){
    console.log(err);
  }
}

export async function getUserById(uid){
  let query = "SELECT id, first_name, last_name, email_addr FROM users WHERE id=?";
  
  try{
    const [result] = await db.execute(query, [uid]);
    if(result.length === 0){
      throw new Error("Invalid UID");
    }
    const user = result[0];
    return user;
  } 
  catch(err){
    console.log(err)
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
    console.log(err)
  }
}

//getUsersByName
