import jwt from 'jsonwebtoken';
import UserModel from '../models/UsersModel.js';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username }).populate('role');
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, role: user.role.name });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
