const { MongoClient } = require('mongodb');

// Access the MongoDB connection string from environment variables
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        try {
            await client.connect();
            const database = client.db('portfolio'); // Replace 'portfolio' if you named your database differently
            const contacts = database.collection('contacts'); // Replace 'contacts' if you named your collection differently

            const formData = req.body; // Assuming the form data will be sent in the request body

            // Insert the form data into the database
            const result = await contacts.insertOne(formData);

            res.status(200).json({ message: 'Message sent successfully!' });
        } catch (error) {
            console.error("Error connecting to MongoDB or inserting data:", error);
            res.status(500).json({ error: 'Failed to send message. Please try again later.' });
        } finally {
            await client.close();
        }
    } else {
        res.status(405).json({ error: 'Method not allowed. Only POST requests are accepted.' });
    }
};