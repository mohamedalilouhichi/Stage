// pages/api/login.js
import { createConnection } from 'mysql2/promise';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

    if (req.method === 'POST') {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        try {
            // Create MySQL connection
            const connection = await createConnection({
                host: 'localhost',
                user: 'root', // Replace with your MySQL username
                port: 3306,
                password: '', // Replace with your MySQL password
                database: 'Offre_N180NCYQ',
            });

            // Check if email exists
            const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

            if (rows.length === 0) {
                return res.status(400).json({ message: 'Email does not exist' });
            }

            // Check if password is correct
            const hashedPassword = rows[0].password;
            const isValidPassword = await bcrypt.compare(password, hashedPassword);

            if (!isValidPassword) {
                return res.status(400).json({ message: 'Password is incorrect' });
            }

            // Generate a new token
            const token = jwt.sign({ email: email }, 'your_secret_key', { expiresIn: '1h' });

            // Update token in database
            await connection.execute('UPDATE users SET token = ? WHERE email = ?', [token, email]);

            return res.status(200).json({ success: true, token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    } else {
        return res.status(405).json({ message: 'Only POST requests are allowed' });
    }
};

export default login;