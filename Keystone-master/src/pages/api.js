const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

app.post('/api/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });

    res.json(user);
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // Find the user
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate a JWT
    const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
});

app.get('/api/dashboard', async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        res.json({ message: 'Welcome to the dashboard!' });
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
});