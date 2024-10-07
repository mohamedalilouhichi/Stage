import { createConnection } from 'mysql2/promise';
import jwt from 'jsonwebtoken';

const updateUser = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];  // Extract token
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Verify JWT token
        const decoded = jwt.verify(token, 'your_secret_key');

        // Connect to MySQL database
        const connection = await createConnection({
            host: 'localhost',
            user: 'root', // Replace with your MySQL username
            port: 3306,
            password: '', // Replace with your MySQL password
            database: 'Offre_N180NCYQ', // Replace with your database
        });

        const { firstName, lastName, email, phone, address, birthdate } = req.body;

        // Update user details in the database
        await connection.execute('UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ?, address = ?, birthdate = ? WHERE email = ?',
            [firstName, lastName, email, phone, address, birthdate, decoded.email]);

        return res.status(200).json({ message: 'User data updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

export default updateUser;