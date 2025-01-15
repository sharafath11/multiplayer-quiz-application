import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },

    profilePic: {
        type: String, 
    },
    quizHistory: [
        {
            score: {
                type: Number,
                required: true,
            },
            attemptedAt: {
                type: Date,
                default: Date.now,
            },
        }
    ],
    correctAnswer:{
        type:Number,
        default:0,
    },
    wrongAnswer:{
        type:Number,
        default:0
    },
    
    level: {
        type: Number,
        default: 1,
    },
}, {
    timestamps: true,
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
