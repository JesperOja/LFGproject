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

router.put('/:email', async (req, res) => {
    const user = req.body as User;
    let editedUser = await User.findByPk(user.email);
    if(editedUser){
        editedUser = user;
        await editedUser.save()
        res.json(editedUser)
    }else{
        res.status(404).end()
    }
})

router.delete('/:email', async (req, res) => {
    const email = req.params.email;
    const user = await User.findByPk(email);

    if(user){
        await user.destroy()
        res.json("Removed succefully!");
    }
    else{
        res.status(204).end();
    }
})

export default router;