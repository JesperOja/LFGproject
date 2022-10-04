import express from "express";
import  {Game, Post, Profile} from '../models';

const router = express.Router();

router.get('/', async (_req,res) =>{
    const profiles = await Profile.findAll({
        include:[{
            model: Game
        },{
            model: Post
        }]
    });
    res.json(profiles)
});

router.post('/', async (req, res) => {
    try{
        const profile = await Profile.create(req.body);
        res.json(profile);
    }catch(error) {
        res.status(400).json({ error })
      }
})

export default router;