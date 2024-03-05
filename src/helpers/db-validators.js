import User from '../users/userModel.js';

export const existsEmail = async (email = '') => {
    const existsEmail = await User.findOne ({correo})
}