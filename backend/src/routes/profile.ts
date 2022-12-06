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

router.put('/:id', async (req, res) => {
    try{
        const id = Number(req.params.id);
        const editProfile = req.body as Profile;
        const profile = await Profile.findOne({
            where: {
                id: id
            }
        })
        console.log(profile?.id);
        if(profile){
            profile.age = editProfile.age;
            profile.discord = editProfile.discord;
            profile.firstname = editProfile.firstname;
            profile.lastname = editProfile.lastname;
            profile.username = editProfile.username;
            await profile.save();
            res.json(profile)
        }else{
            res.status(400).end();
        }
    }catch(error) {
        res.status(400).json({ error })
      }
} )

router.delete('/:id', async (req, res) => {
    try{
    const id = req.params.id;
    const profile = await Profile.findByPk(id)

    if(profile !== null){
        await profile.destroy()
        res.json({message: 'Profile removed successfully'})
    }else{
        res.status(400).end();
    }
}catch(error) {
    res.status(400).json({ error })
  }
})

export default router;