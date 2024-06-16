import jwt from 'jsonwebtoken';
import UserModel from '../models/UsersModel.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { sendEmailClient } from '../utils/sendMail.js';

export const loginUser = async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  try {
    const user = await UserModel.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] }).populate('role');
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

    res.status(200).json({ token, role: user.role.name, name: user.name });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    const subject = 'Restablecimiento de Contraseña';
    const message = `Puede restablecer su contraseña usando este enlace: <a href="${resetLink}">${resetLink}</a>`;

    sendEmailClient(
      process.env.SMTP_EMAIL,
      process.env.PORT_EMAIL,
      process.env.SERVER_EMAIL,
      process.env.PASSWORD_APLICATION,
      email,
      subject,
      message
    );

    res.status(200).json({ message: 'Enlace de restablecimiento de contraseña enviado a su correo electrónico.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'El token es inválido o ha expirado.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Contraseña restablecida correctamente.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
