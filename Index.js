import express from 'express';
import mongoose from 'mongoose';
const app = express();
// MongoDB connection URI (adjust based on your setup)
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/devops';

// Connect to MongoDB with error handling
mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1); // Exit if MongoDB connection fails
    });

const Dev = mongoose.model('Dev', { name: String });

 app.get('/', async (_, res) => {
    try {
        const devs = await Dev.find();
        const names = devs.map(d => `<li>${d.name}</li>`).join('');
        res.send(`<h1>I’m building pipelines like a pro!</h1><ul>${names}</ul>`);
    } catch (err) {
        console.error('Error fetching devs:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3000, () => console.log('App running on port 3000'));

