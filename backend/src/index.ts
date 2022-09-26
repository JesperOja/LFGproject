import express from 'express';
import cors from 'cors';
import signRouter from './routes/sign';
import profileRouter from './routes/profile';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/Auth', signRouter);
app.use('/api/Profiles', profileRouter);
const PORT = 3001;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});