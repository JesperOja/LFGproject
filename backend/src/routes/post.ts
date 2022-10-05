import express from "express";
import  {Post} from '../models';

const router = express.Router();

router.get('/', async (_req,res) => {
    const posts = await Post.findAll();
    res.json(posts);
})

router.post('/', async (req, res) => {
    const profileId:number = req.body.profileId;
    const newPost = await Post.create({...req.body, profileId: profileId});
    res.json(newPost);
})

export default router;