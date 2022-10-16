const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname, "../data/products.json");

const productsController = {
    

    todosLosProductos: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    res.render('todosLosProductos', { products, titulo: "Productos" });
    },

    detail: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		let id = req.params.id;
		let product = products.find(product => product.id == id);
		res.render('productDetail', {product})
	}

}

module.exports = productsController;