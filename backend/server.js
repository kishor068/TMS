import { AdminLoginRouter } from './routes/adminRoutes.js';  // Add .js extension
// const express = require('express');
import express from 'express'
import cors from 'cors';

const app = express();
const port = 3000;
console.log("hello")
app.use(cors({
  origin:'*'
}))

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World33333!');
});

app.use('/api/admin', AdminLoginRouter);
// app.use('/db', db);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
