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

router.get('/:profileId', async (req,res) => {
    const profileId = Number(req.params.profileId);
    const profilePosts = await Post.findAll({
        where: {
            profileId: profileId
        }
    });
    res.json(profilePosts);
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

router.delete('/:id', async (req, res) => {
    try{
    const id = req.params.id;
    const post = await Post.findByPk(id)

    if(post !== null){
        await post.destroy()
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
        const editedPost = req.body as Post;
        const post = await Post.findByPk(id);
        if(post){
            post.title = editedPost.title;
            post.content = editedPost.content;
            await post.save();
            res.json(post);
        }
    }catch(error) {
    res.status(400).json({ error })
  }
})

export default router;