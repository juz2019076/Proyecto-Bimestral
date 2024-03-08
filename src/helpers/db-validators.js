import User from '../users/userModel.js';

export const existsEmail = async (email = '') => {
    const existsEmail = await User.findOne ({email});
    if (existsEmail){
        throw new Error(`The email ${email} has already been registered`);
    }
}

export const existUserById = async (id = '') => {
    const existUser = await User.findById(id);
    if (!existUser){
        throw new Error(`The ID: ${email} does not exist`);
    }
}