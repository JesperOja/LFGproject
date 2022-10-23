import express from "express";
import  {Comment} from '../models';

const router = express.Router();

router.get('/', async (_req,res) => {
    const comments = await Comment.findAll();
    res.json(comments);
});

router.get('/:postId', async (req, res) => {
    const postId = Number(req.params.postId);
    const postComments = await Comment.findAll({
        where: {
            postId: postId
        }
    });
    res.json(postComments);
});

router.post('/', async (req,res) => {
    const newComment = await Comment.create(req.body);
    res.json(newComment);
})

export default router;