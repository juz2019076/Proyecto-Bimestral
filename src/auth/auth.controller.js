import jwt from 'jsonwebtoken';
import User from '../administrator/userModel.js';

const authController = {
  async login(req, res) {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });

      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const token = jwt.sign({ userId: user._id }, process.env.SECRETORPRIVATEKEY);
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default authController;
