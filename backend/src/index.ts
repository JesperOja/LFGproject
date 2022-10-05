import express from 'express';
import cors from 'cors';
import profileRouter from './routes/profile';
import userRouter from './routes/user';
import postRouter from './routes/post';

const { connectToDatabase } = require('./util/db')

require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/Profiles', profileRouter);
app.use('/api/User', userRouter);
app.use('/api/Post', postRouter);

const start = async () => {
  await connectToDatabase()
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
  })
}

start()
