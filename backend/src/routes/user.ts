import express from "express";
import { User } from "../models";

const router = express.Router();

router.post('/Signup', async (req,res) => {
    const {email, password} = req.body;
    const user = await User.create({
        email: email,
        password: password
    })

    if(!user){
        return res.status(401).json({
            error: 'Email already in use'
          });
    }else{
        return res.status(200).json(user);
    }
});

router.post('/Login', async (req,res) => {
    const {email, password} = req.body;
    const user = await User.findOne({
        where:{
            email: email,
            password: password
        }
    })

    if(!user){
        res.status(401).json({
            error: 'invalid username or password'
          });
    }else{
        res.status(200).json(user);
    }
});

router.get('/', async (_req,res) => {
    const users = await User.findAll();
    res.send(users);
})

export default router;