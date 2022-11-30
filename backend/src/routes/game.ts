import express from "express";
import  {Game} from '../models';

const router = express.Router();

router.get('/', async (_req,res) => {
    const games = await Game.findAll();
    res.json(games);
})

router.get('/:profileId', async (req, res) => {
    const profileId = Number(req.params.profileId);
    const profileGames = await Game.findAll({
        where: {
            profileId: profileId
        }
    })
    res.json(profileGames);
})

router.post('/', async (req, res) => {
    const profileId:number = req.body.profileId;
    const newGame = await Game.create({...req.body, profileId: profileId});
    res.json(newGame);
})

export default router;