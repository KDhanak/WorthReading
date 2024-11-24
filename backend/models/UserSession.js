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
        default: () => Date.now() + 7 * 24 * 60 * 60 * 1000,
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
    if (!this.expiresAt) {
        this.expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
    }
    next();
});


const UserSession = mongoose.model('UserSession', useSessionSchema);

export default UserSession;
