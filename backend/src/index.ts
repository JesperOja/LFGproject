import express from 'express';
import cors from 'cors';
import signRouter from './routes/sign';
import loginRouter from './routes/login';
import profileRouter from './routes/profile';
const { connectToDatabase } = require('./util/db')

require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/Login', loginRouter);
app.use('/api/Signin', signRouter);
app.use('/api/Profiles', profileRouter);

const start = async () => {
  await connectToDatabase()
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
  })
}

start()
