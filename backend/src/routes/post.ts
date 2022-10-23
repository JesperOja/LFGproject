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

router.post('/:id/dislike', async (req,res) => {
    const postId = Number(req.params.id);
    const thisPost = await Post.findByPk(postId) as Post;
    thisPost.dislikes++;
    await thisPost.save();
    res.json(thisPost);
})

router.post('/:id/like', async (req,res) => {
    const postId = Number(req.params.id);
    const thisPost = await Post.findByPk(postId) as Post;
    thisPost.likes++;
    await thisPost.save();
    res.json(thisPost);
})

export default router;