import express from "express";
import { User } from "../models";

const router = express.Router();

router.post('/', async (req,res) => {
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

export default router;