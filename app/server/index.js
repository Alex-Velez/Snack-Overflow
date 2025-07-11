import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import db, { DB_UPLOADS_PATH } from './db.js';

import itemRouter from './routes/item.routes.js';
import userRouter from './routes/user.routes.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.use(express.json());

app.use('/uploads', express.static(DB_UPLOADS_PATH)); 


app.use('/api/items', itemRouter);  
app.use('/api/users', userRouter);  


app.get('/', (req, res) => {
  res.send(' Snack Overflow API is running');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
