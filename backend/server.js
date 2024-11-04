import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('Hello, JavaScript with Express using ES Modules!');
});

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		res.send('Connected to MongoDB');
		app.listen(PORT, () => res.send(`Server running on port ${PORT}`));
	})
	.catch((error) => res.send(`MongoDB connection error: ${error}`));
// Connect to MongoDB and start server

const generateAccessToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '1d', //Token expires in 1 day.
	});
};

const generateRefreshToken = (id) => {
	return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

const UserSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true }
});

// Hash the password before saving the user
UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// Method to compare password
UserSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('user', UserSchema);

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

// Register route
app.post('/register', async (req, res) => {
	const { name, email, password } = req.body;
	res.send('In the register.')

	try {
		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: 'User already exists' });
		}

		// Create new user
		const newUser = new User({ name, email, password });
		await newUser.save();

		const accessToken = generateAccessToken(newUser._id);
		const refreshToken = generateRefreshToken(newUser._id);

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			sameSite: "Strict",
			path: '/',
			expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
		})

		res.status(201).json({ message: 'User registered successfully', accessToken, user: { name: newUser.name } });
		res.send('User registered.')
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Login route
app.post('/login', async (req, res) => {
	const { email, password } = req.body;
	res.send('In the login.');

	try {
		// Find user by email
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: 'Invalid email or password' });
		}

		// Check if password matches
		const isMatch = await user.matchPassword(password);
		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid email or password' });
		}

		const accessToken = generateAccessToken(user._id);
		const refreshToken = generateRefreshToken(user._id);

		await UserSession.create({
			userId: user._id,
			refreshToken,
			expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
		});

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			sameSite: 'Strict',
			path: '/',
			expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
		});

		res.status(200).json({ message: 'Login successful', accessToken, user: { name: user.name } });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default app;
