import jwt from 'jsonwebtoken';
import Cookies from 'cookies';

export const protect = (req, res, next) => {
	const cookies = new Cookies(req,res);
	const token = cookies.get('accessToken');

	if (!token) {
		return res.status(401).json({ message: 'Not authorized, no token' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded; // Attach user info to request object
		next();
	} catch (error) {
		res.status(401).json({ message: 'Not authorized, token failed' });
	}
};
