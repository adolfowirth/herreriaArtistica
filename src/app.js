const express = require("express");
const path = require('path');
const methodOverride = require('method-override');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

const indexRouter = require("./routers/indexRouter");
const productsRouter = require("./routers/productsRouter");

app.use("/", indexRouter);
app.use("/products", productsRouter);

//Servidor.
app.listen(3010, () => {
  console.log("Servidor corriendo en http://localhost:3010");
});



