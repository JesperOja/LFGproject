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

router.delete('/:id', async (req, res) => {
    try{
    const id = req.params.id;
    const game = await Game.findByPk(id)

    if(game !== null){
        await game.destroy()
        res.json({message: 'Profile removed successfully'})
    }else{
        res.status(400).end();
    }
}catch(error) {
    res.status(400).json({ error })
  }
})

router.put('/:id', async (req, res) => {
    try{
        const id = Number(req.params.id);
        const editedGame = req.body as Game;
        const game = await Game.findByPk(id);
        if(game){
            game.name = editedGame.name;
            game.comments = editedGame.comments;
            game.server = editedGame.server;
            game.rank = editedGame.rank;
            game.hours = editedGame.hours;
            game.nicknameIngame = editedGame.nicknameIngame;
            console.log(game)
            await game.save();
            res.json(game);
        }
    }catch(error) {
    res.status(400).json({ error })
  }
})

export default router;