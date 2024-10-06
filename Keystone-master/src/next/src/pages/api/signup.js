import { createConnection } from 'mysql2/promise';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.status(200).json({});
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests are allowed' });
    }

    const { firstName, lastName, email, password, birthdate, address, phone } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !password || !birthdate || !address || !phone) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    try {
        // Create MySQL connection
        const connection = await createConnection({
            host: 'localhost',
            user: 'root', // Replace with your MySQL username
            port: 3306,
            password: '', // Replace with your MySQL password
        });

        // Create database if it does not exist
        await connection.execute('CREATE DATABASE IF NOT EXISTS Offre_N180NCYQ');

        // Close the connection
        await connection.end();

        // Create a new connection to the database
        const dbConnection = await createConnection({
            host: 'localhost',
            user: 'root', // Replace with your MySQL username
            port: 3306,
            password: '', // Replace with your MySQL password
            database: 'Offre_N180NCYQ',
        });

        // Create table if it does not exist
        await dbConnection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        birthdate DATE,
        address VARCHAR(255),
        phone VARCHAR(255),
        token VARCHAR(255)
      );
    `);

        // Check if email already exists
        const [rows] = await dbConnection.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length > 0) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate token
        const token = jwt.sign({ email: email }, 'your_secret_key', { expiresIn: '1h' });

        // Insert new user
        await dbConnection.execute(
            'INSERT INTO users (first_name, last_name, email, password, birthdate, address, phone, token) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [firstName, lastName, email, hashedPassword, birthdate, address, phone, token]
        );

        // Close the connection
        await dbConnection.end();

        return res.status(201).json({ message: 'User  created successfully', token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}