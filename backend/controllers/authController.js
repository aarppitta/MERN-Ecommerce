import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';


const generateToken =(user)=>{
    return jwt.sign({
        id:user._id, role:user.role},
        process.env.JWT_SECRET,
        {expiresIn:'1h'}
    )
}


//register user
export const registerUser = async(req, res) =>{
    const user = await User.create(req.body);
    res.status(201).json({ token: generateToken(user) });
}

//login user
export const login = async (req, res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user || !(await user.matchPassword(password))){
        return res.status(401).json({message: 'Invalid email or password'});
    }
    res.status(200).json({token: generateToken(user)});
}

//get all user (admin only)
export const getAllUsers = async(req, res) => {
    const users = await User.find().select('-password');
    res.status(200).json(users);
}


//get user profile
export const getProfile = async(req,res) =>{
    const user = await User.findById(req.user._id).select('-password');
    if(!user) return res.status(404).json({message: 'User not found'});
    res.status(200).json(user);
}

//update user profile

export const updateProfile = async(req, res) => {
    const user = await User.findByIdAndUpdate(
        req.user._id, 
        req.body, 
        {new: true}).select('-password');

        res.status(200).json(user);
}

//delete user profile
export const deleteProfile = async(req, res) =>{
    await User.findByIdAndDelete(req.user._id);
    res.status(204).json({message: 'User deleted'});
}