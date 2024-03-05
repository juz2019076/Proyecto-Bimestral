import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import AdminUser from '../administrator/adminUserModel.js';

const authAdminController = {
  async login(req, res) {
    const { username, password } = req.body;

    try {
      const adminUser = await AdminUser.findOne({ username });

      if (!adminUser || !bcrypt.compareSync(password, adminUser.password)) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const token = jwt.sign({ adminUserId: adminUser._id }, process.env.ADMIN_SECRET_KEY);
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default authAdminController;
