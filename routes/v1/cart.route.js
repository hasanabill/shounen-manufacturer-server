const express = require("express");
const router = express.Router();
const cartController = require("../../controller/cart.controller");

router.post("/", cartController.addToCart)

router.get("/:email", (req, res) => {
    const email = req.params.email;
    // const query = { email }
    // const result = await cartCollection.find(query).toArray();
    res.send("got cart");
})

router.route("/:id")
    .get((req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) }
        // const result = await toolsCollection.findOne(query)
        res.send("Specific cart item");
    })
    .patch((req, res) => {
        const id = req.params.id;
        const payment = req.body;
        // const filter = { _id: ObjectId(id) }
        //     const updatedDoc = {
        //         $set: {
        //             isPaid: true,
        //             traxId: payment.traxId
        //         }
        //     }
        // const updateCart = await cartCollection.updateOne(filter, updatedDoc)
        res.send("updated cart");

    })
    .delete((req, res) => {
        const id = req.params.id;
        // const query = { _id: ObjectId(id) }
        // const result = await cartCollection.deleteOne(query)
        res.send("deleted cart item");
    })

module.exports = router;