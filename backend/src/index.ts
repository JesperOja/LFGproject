import express from 'express';
import cors from 'cors';
import profileRouter from './routes/profile';
import userRouter from './routes/user';
import postRouter from './routes/post';
import gameRouter from './routes/game';
import commentRouter from './routes/comment';

import { connectToDatabase } from './util/db';

require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('build'));

app.use('/api/profile', profileRouter);
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/game', gameRouter);
app.use('/api/comment', commentRouter);

const start = async () => {
  await connectToDatabase()
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
  })
}

start()
