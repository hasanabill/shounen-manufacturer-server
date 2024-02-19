module.exports.addToCart = (req, res) => {
    const cartItem = req.body;
    // const result = await cartCollection.insertOne(cartItem);
    res.send("added to cart");
}