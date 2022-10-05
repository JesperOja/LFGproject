import express from "express";
import  {Post} from '../models';

const router = express.Router();

router.get('/', async (_req,res) => {
    const games = await Post.findAll();
    res.json(games);
})

router.post('/', async (req, res) => {
    const newGame = await Post.create(req.body);
    res.json(newGame);
})

export default router;