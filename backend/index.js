const express = require("express");
const cors = require("cors");

var path = require('path');

const app = express();

//configuración de la carpeta public como publica
app.use(express.static(path.join(__dirname, 'public')));

var corsOptions = {
  origin: "http://localhost:8100"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


const db = require("./models");
// normal use. Doesn't delete the database data
db.sequelize.sync();

// In development, you may need to drop existing tables and re-sync database
//db.sequelize.sync({ force: true }).then(() => {
//  console.log("Drop and re-sync db.");
//});

// simple route

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Films application Norberto Acuña." });
});

require("./routes/pelicula.route")(app);

app.get("/pagina1", (req, res) => {
  res.json({ message: "Wellcome to the page number 1." });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
