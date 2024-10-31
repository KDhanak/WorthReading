import mongoose from "mongoose";

const useSessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

useSessionSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const UserSession = mongoose.model('UserSession', useSessionSchema);

export default UserSession;
