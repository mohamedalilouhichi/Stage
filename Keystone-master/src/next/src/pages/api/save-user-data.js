// pages/api/save-user-data.js
import { createConnection } from 'mysql2/promise';

const saveUserData = async (req, res) => {
    console.log('saveUserData API route called');
    try {
        // Save user data to database
        const { email, name, token } = req.body;
        console.log('email:', email);
        console.log('name:', name);
        console.log('token:', token);

        // Create MySQL connection
        const connection = await createConnection({
            host: 'localhost',
            user: 'root', // Replace with your MySQL username
            port: 3306,
            password: '', // Replace with your MySQL password
            database: 'Offre_N180NCYQ',
        });

        // Check if user exists in database
        const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            // User doesn't exist, create a new user
            await connection.execute('INSERT INTO users (email, name, token) VALUES (?, ?, ?)', [email, name, token]);
        } else {
            // User already exists, update their token
            await connection.execute('UPDATE users SET token = ? WHERE email = ?', [token, email]);
        }

        console.log('User  data saved successfully');
        return res.status(201).json({ message: 'User  data saved successfully' });
    } catch (error) {
        console.error('Error saving user data:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

export default saveUserData;