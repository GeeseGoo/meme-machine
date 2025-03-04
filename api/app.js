const express = require('express');
require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const cors = require('cors');

const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


// Routers
const commentRouter = require('./routes/commentRouter');
const postRouter = require('./routes/postRouter');





// Example route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Routes
app.use('/posts', postRouter);

//login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            username: username,
        },
    });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(401).json({ message: 'Incorrect password' });
    }

    const accessToken = generateAccessToken({ username: user.username, id: user.id });
    console.log('generated access token for user:', user.username, accessToken);
    res.json({ accessToken: accessToken });
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await prisma.user.findUnique({
        where: { username: username },
    });

    if (existingUser) {
        return res.status(400).send('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
        data: {
            username: username,
            password: hashedPassword,
        },
    });

    const accessToken = generateAccessToken({ username: username, id: user.id });
    res.json({ accessToken: accessToken });
});

// Set the port from environment or default to 3000
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


function generateAccessToken(user) {
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}