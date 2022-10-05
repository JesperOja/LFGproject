import express from "express";
import  {Game} from '../models';

const router = express.Router();

router.get('/', async (_req,res) => {
    const games = await Game.findAll();
    res.json(games);
})

router.post('/', async (req, res) => {
    const profileId:number = req.body.profileId;
    const newGame = await Game.create({...req.body, profileId: profileId});
    res.json(newGame);
})

export default router;