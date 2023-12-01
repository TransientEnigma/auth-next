import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiration: Date,
    verifyToken: String,
    verifyTokenExpiration: Date,
});

// https://mongoosejs.com/docs/models.html#models
const User = mongoose.models.users || mongoose.model('users', userSchema);

// if you use the following Mongoose automatically looks for the plural, lowercased version of your model name
// const User = mongoose.models.users || mongoose.model('User', userSchema);

export default User;