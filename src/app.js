const express = require("express");
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');

const app = express();

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.use(session({
	secret: "Shhh, It's a secret",
	resave: false,
	saveUninitialized: false,
}));

app.use(cookies());

app.use(userLoggedMiddleware);

const indexRouter = require("./routers/indexRouter");
const productsRouter = require("./routers/productsRouter");
const userRouter = require("./routers/userRouter");

app.use("/", indexRouter);
app.use("/products", productsRouter);
app.use("/user", userRouter);

//Servidor.
app.listen(3010, () => {
  console.log("Servidor corriendo en http://localhost:3010");
});



