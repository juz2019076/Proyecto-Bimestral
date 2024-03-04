import bcryptjs from 'bcryptjs';
import User from './user.model.js';

export const usersPost = async (req, res) => {
    
    const {name, email, password, role} = req.body;
    const user = new User( {name, email, password, role} );

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.status(200).json({
        user
    });
}