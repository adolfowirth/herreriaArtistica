const express = require("express");
const path = require('path');

const app = express();

app.use(express.static("public"));

//Servidor.
app.listen(3010, () => {
    console.log("Servidor corriendo en http://localhost:3010");
  });

  app.get('/', (req, res) => {
    let htmlPath = path.join(__dirname, './views/index.html');
    res.sendFile(htmlPath);
});