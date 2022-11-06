module.exports = app => {
    const Peliculas = require("../controllers/pelicula.controller");
  
    var upload = require('../multer/upload')
    
    var router = require("express").Router();
  

    // Create a new Pelicula -without image
   // router.post("/", Peliculas.create);
  
   // Create a new Pelicula with imagen
   router.post("/",upload.single('file'), Peliculas.create);

    // Retrieve all Peliculas
    router.get("/", Peliculas.findAll);
  
    // Retrieve a single Pelicula with id
    router.get("/:id", Peliculas.findOne);
  
    // Update a Pelicula with id - El que funciona,pero no carga la foto
   router.put("/:id", Peliculas.update);

    // Prueba de Update con Photo
    //router.put("/",upload.single('file'), Peliculas.create);
  
    // Delete a Pelicula with id
    router.delete("/:id", Peliculas.delete);
  
  //  app.use("/api/bicycles", router);
  app.use("/api/peliculas", router);
  }