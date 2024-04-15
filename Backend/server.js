import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'
import cors from 'cors'

const app = express();

const uri = process.env.MONGODB_URI;

app.use(cors())

app.get('/', async (req, res) => {
    try {
        await mongoose.connect(uri);
        const data = await mongoose.connection.db.collection("Data").find({}).limit(50).toArray();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching data' });
    } finally {
        await mongoose.disconnect();
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
