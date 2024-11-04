import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import UserSession from '../models/UserSession.js';

const generateAccessToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '1d', //Token expires in 1 day.
	});
};

const generateRefreshToken = (id) => {
	return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

// Register a new user
export const registerUser = async (req, res) => {
	const { name, email, password } = req.body;

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
			path: 'api/auth',
			expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
		})

		res.status(201).json({ message: 'User registered successfully', accessToken, user: { name: newUser.name } });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Login a user
export const loginUser = async (req, res) => {
	const { email, password } = req.body;

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
			path: 'api/auth',
			expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
		});

		res.status(200).json({ message: 'Login successful', accessToken, user: { name: user.name } });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const refreshAccessToken = async (req, res) => {
	const { refreshToken } = req.cookies;

	if (!refreshToken) return res.status(401).json({ message: 'Not authorised, no token found' });

	const session = await UserSession.findOne({ refreshToken });
	if (!session) return res.status(401).json({ message: 'Invalid session, please login' });

	try {
		const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
		res.json({ token: accessToken });
	} catch (error) {
		res.status(401).json({ message: "Not authorized, token failed." })
	}
}
