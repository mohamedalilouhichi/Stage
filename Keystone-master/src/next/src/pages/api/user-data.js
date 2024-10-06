// pages/api/user-data.js
import { createConnection } from 'mysql2/promise';
import jwt from 'jsonwebtoken';

const getUserData = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, 'your_secret_key');
        const connection = await createConnection({
            host: 'localhost',
            user: 'root', // Replace with your MySQL username
            port: 3306,
            password: '', // Replace with your MySQL password
            database: 'Offre_N180NCYQ',
        });

        const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [decoded.email]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User  not found' });
        }

        const userData = rows[0];
        return res.status(200).json({
            username: userData.first_name + ' ' + userData.last_name,
            email: userData.email,
            phone: userData.phone,
            address: userData.address,
            birthdate: userData.birthdate,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

export default getUserData;