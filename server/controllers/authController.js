import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import generateToken from '../utils/generatetoken.js';

export const register = async(req,res)=>{
    const {name, email, password, role}= req.body;
    const existingUser = await User.findOne({email});
    if(existingUser)
        return res.status(400).json({message:'User exists'});

    try{
        const hashed = await bcrypt.hash(password,10);
        const user = await User.create({name,email,password: hashed,role});
        res.status(201).json({token: generateToken(user._id,user.role)});
    
    }catch(error){
        console.error('Error during user registration:',error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
    
}

export const login = async(req,res)=>{
    const {email,password}=req.body;
    const user = await User.findOne({email});
    if(!user || !(await bcrypt.compare(password, user.password))){
        return res.status(401).json({message:'Invalid credentials'});
    }
    res.json({token: generateToken(user._id,user.role)});
}