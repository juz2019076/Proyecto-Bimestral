import User from '../administrator/userModel.js';

const profileController = {
  async getProfile(req, res) {
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async updateProfile(req, res) {
    try {
      const { username, password } = req.body;

      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.username = username;
      user.password = password;

      await user.save();

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async deleteAccount(req, res) {
    try {
      const userId = req.user._id;
      // Eliminar al usuario de la base de datos
      await User.findByIdAndDelete(userId);
      res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default profileController;
