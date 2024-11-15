import { Router, type Request, type Response } from 'express';
import { User } from '../models/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

//user login
export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
  
    const user = await User.findOne({
      where: { username },
    });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  
    const secretKey = process.env.JWT_SECRET_KEY || '';
  
    const token = jwt.sign({ username }, secretKey, { expiresIn: '48h' });
    return res.json({ token });
  };
  
  const router = Router();
  
  // POST /login - Login a user
  router.post('/login', login);
  
  export default router;