import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
},
  password: { 
    type: String, 
    required: true 
},
  role: { 
    type: String, 
    enum: ['ADMIN', 'CLIENT'], 
    default: 'CLIENT' },
});

const User = mongoose.model('User', userSchema);

export default User;
