const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8pzbh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: 'unauthorized access' })
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
        if (err) {
            return res.status(403).send({ message: 'forbidden access' })
        }
        req.decoded = decoded;
        next()
    });
}

async function run() {
    try {
        await client.connect()
        const toolsCollection = client.db('shounen-manu').collection('tools')
        const cartCollection = client.db('shounen-manu').collection('cart')
        const userCollection = client.db('shounen-manu').collection('users')

        // sending user to database
        app.put('/user/:email', async (req, res) => {
            const email = req.params.email;
            const user = req.body;
            const filter = { email }
            const options = { upsert: true }
            const updatedDoc = {
                $set: user
            }
            const result = await userCollection.updateOne(filter, updatedDoc, options)
            const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, { expiresIn: '1d' })
            res.send({ result, token });
        })

        // getting all the tools
        app.get('/tools', async (req, res) => {
            const result = await toolsCollection.find().toArray()
            res.send(result)
        })

        // getting desired tool
        app.get('/tool/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await toolsCollection.findOne(query)
            res.send(result);
        })

        // deleting a tool
        app.delete('/tool/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await toolsCollection.deleteOne(query)
            res.send(result);
        })

        // adding product to cart
        app.post('/cart', async (req, res) => {
            const cartItem = req.body;
            const result = await cartCollection.insertOne(cartItem)
            res.send(result)
        })

        // getting all orders
        app.get('/orders', verifyJWT, async (req, res) => {
            const result = await cartCollection.find().toArray();
            res.send(result)
        })

        // getting cart item of user
        app.get('/cart/:email', verifyJWT, async (req, res) => {
            const email = req.params.email;
            const query = { email }
            const result = await cartCollection.find(query).toArray();
            res.send(result);
        })

        //deleting cart item
        app.delete('/cart/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await cartCollection.deleteOne(query)
            res.send(result);
        })

        // updating quantity value after adding to cart
        app.put('/quantity/:id', async (req, res) => {
            const id = req.params.id;
            const available = req.body.available;
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true }
            const updatedDoc = {
                $set: { available }
            }
            const result = await toolsCollection.updateOne(filter, updatedDoc, options)
            res.send(result)
        })

        // getting all users
        app.get('/users', verifyJWT, async (req, res) => {
            const result = await userCollection.find().toArray();
            res.send(result);
        })

        // verifying admin
        app.get('/admin/:email', async (req, res) => {
            const email = req.params.email;
            const user = await userCollection.findOne({ email })
            const isAdmin = user.role === 'admin'
            res.send({ admin: isAdmin })
        })

        // giving admin role
        app.put('/user/admin/:email', verifyJWT, async (req, res) => {
            const email = req.params.email;
            const requester = req?.decoded?.email;
            const requesterAcc = await userCollection.findOne({ email: requester })
            if (requesterAcc.role === 'admin') {
                const filter = { email }
                const updatedDoc = {
                    $set: {
                        role: 'admin'
                    }
                }
                const result = await userCollection.updateOne(filter, updatedDoc)
                res.send(result);
            }
            else {
                res.status(403).send({ message: 'Forbidden' })
            }
        })

    }
    finally {

    }
}

run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Server in up')
})

app.listen(port, console.log('server running in', port));