import bcrypt from 'bcrypt';
import User from '../models/User.js'
import jwt from 'jsonwebtoken';

export const register =async(req,res)=>{
    const {username,email, password} = req.body;
    const user= await User.findOne({email});

    if(user)
    {
        return res.status(400).json({message:"user already exist"});
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new User({
        username,email,password:hashedPassword,
    });
    await newUser.save();
    return res.status(200).json({message:"user registered"})
}
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Password does not match" });
        }

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.username,
            },
        });
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};


