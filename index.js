const express = require("express");
const cors = require("cors");     // <<===  // npm i cors

const app = express();
app.use(cors());                // <<===
app.use(express.json());

const allProducts = [
    { productId: 111, productName: "Chair", price: 400 },
    { productId: 222, productName: "Printer", price: 750 },
    { productId: 333, productName: "Pencil", price: 6 },
];

// Pipeline: Verb, Path, Function
app.get("/products", (req, res) => {     // req = request    res = response
    res.send(allProducts);
});

app.get("/products/:id", (req, res) => {
    const id = req.params.id;
    const singleProduct = allProducts.find(p => p.productId == id);
    if (singleProduct) {
        res.send(singleProduct);
    }
    else {
        // res.status(404);
        // res.send({errorMessage: "Product not found"});
        res.status(404).send({ errorMessage: "Product not found" });   // fluent syntax
    }
});
 
app.post("/products", (req, res) => {
    let np = req.body;
    if (np.productId > 101) {
        allProducts.push(np);
        res.send({ message: "Post OK" });
    }
    else
        res.status(400).send({ errorMessage: `Illegal id ${np.productId}` });
});

app.delete("/products/:id", (req, res) => {
    const id = req.params.id;
    const index = allProducts.findIndex(p => p.productId == id);
    if (index>-1) {
        allProducts.splice(index, 1);
    }
    res.send({ message: "Delete OK" });
});

app.delete("/products/withError/:id", (req, res) => {
    const id = req.params.id;
    const index = allProducts.findIndex(p => p.productId == id);
    if (index>-1) {
        allProducts.splice(index, 1);
        res.send({ message: "Delete OK" });
    }
    else {
        res.status(404).send({ errorMessage: "Product not found" });   // fluent syntax
    }
});

app.put("/products/:id", (req, res) => {
    const id = req.params.id;
    const singleProduct = allProducts.find(p => p.productId == id);
    if (singleProduct) {
        let np = req.body;
        singleProduct.productId = np.productId;
        singleProduct.productName = np.productName;
        singleProduct.price = np.price;
        res.send({ message: "Put OK" });
    }
    else {
        res.status(404).send({ errorMessage: "Product not found" });   // fluent syntax
    }
});

app.listen(8000, () => {
    console.log("Listening on 8000");
});