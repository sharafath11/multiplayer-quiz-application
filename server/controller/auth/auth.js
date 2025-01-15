import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../../models/userModel.js';  

// Register a new user
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
 
    try {
        if(!name||!email||!password)return res.status(400).json({ msg: 'All fileds are required' })
        const userExists = await userModel.findOne({ email });
        if (userExists) return res.status(400).json({ msg: 'User already exists' });
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({
            msg: 'User registered successfully',
            token,  
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};
export const LoginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log("rfghbbhjnjnjmjn")
  
    try {
      if (!email || !password) return res.status(400).json({ msg: "Email and password are required" });
  
      const user = await userModel.findOne({ email });
      if (!user) return res.status(404).json({ msg: "User not found" });
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(401).json({ msg: "Invalid password" });
  
      const token = jwt.sign(
        { userId: user._id },
         process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      const { password: _password, _id, ...userDetails } = user.toObject(); 

    
      res.status(200).json({
        msg: "Login successful",
        token,
        user:userDetails
      });
  
    } catch (error) {
      res.status(500).json({ msg: "Server error" });
    }
  };
  