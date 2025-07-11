// index.js
import 'dotenv/config';           
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import db, { DB_UPLOADS_PATH } from './db.js';           
import transactionsRouter from './routes/transactions.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app = express();
app.use(express.json());


app.use('/uploads', express.static(DB_UPLOADS_PATH));

app.use('/api/transactions', transactionsRouter);


app.get('/', (req, res) => {
  res.send('🍿 Snack-Overflow API is up and running');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Listening on http://localhost:${PORT}`));