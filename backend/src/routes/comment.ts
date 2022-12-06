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

router.delete('/:id', async (req, res) => {
    try{
    const id = req.params.id;
    const comment = await Comment.findByPk(id)

    if(comment !== null){
        await comment.destroy()
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
        const editedComm = req.body as Comment;
        const comment = await Comment.findByPk(id);
        if(comment){
            
            comment.comment = editedComm.comment;
            await comment.save();
            res.json(comment);
        }
    }catch(error) {
    res.status(400).json({ error })
  }
})

export default router;