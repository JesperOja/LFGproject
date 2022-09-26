import express from "express";

const router = express.Router();

router.post('/SignIn', (req,res) => {
    const {email, password} = req.body;
    res.send({email, password});
});

export default router;