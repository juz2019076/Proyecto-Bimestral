import User from '../users/user.model.js';

export const existsEmail = async (email = '') => {
    const existsEmail = await User.findOne ({correo})
}