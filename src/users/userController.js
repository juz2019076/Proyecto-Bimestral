import bcryptjs from 'bcryptjs';
import User from './userModel.js';

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

export const usersDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const { _id, ...resto } = req.body;

        const userDelete = await User.findByIdAndDelete(id, resto);

        res.status(200).json({
            msg: 'User deleted successfully.',
            user: userDelete
        });

    } catch (e) {
        console.error('Error creating companies', e);
        res.status(500).json({ e: "Internal Server Error" });
    }
}

export const userPut = async (req, res) => {
    try {
        const { id } = req.params;
        const { _id, ...resto } = req.body;

        const userActualizada = await User.findByIdAndUpdate(id, resto);

        res.status(200).json({
            msg: 'The post was updated successfully.',
            user: userActualizada
        });

    } catch (e) {
        console.error('Error creating companies', e);
        res.status(500).json({ e: "Internal Server Error" });
    }
}