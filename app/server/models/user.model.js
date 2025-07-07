import mysql from 'mysql2/promise'
import 'dotenv/config';

const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

export async function addUser(first, last, email, password){
  let query = "INSERT INTO users (id, first_name, last_name, email_addr, password) VALUES (UUID(), ?, ?, ?, ?)";
  let result = await db.execute(query, [first, last, email,password]);
  return result;
}

export async function getUser(email, password){
  let query = "SELECT * FROM users WHERE email_addr=?";
  try{
    const rows = await db.execute(query, [email]);
    if(rows[0].length === 0){
      throw new Error("Invalid Email");
    }
    
    const user = rows[0][0]

    if(user.password !== password){
      throw new Error("Invalid password")
    }
    console.log("Success!");
    return user;
  }catch(err){
    console.log(err);
  }
}
