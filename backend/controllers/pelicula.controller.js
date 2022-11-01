const db = require("../models");
const Pelicula = db.peliculas;
const Op = db.Sequelize.Op;

// Create and Save a new FILM
exports.create = (req, res) => {
  // Validate request
  if (!req.body.titulo) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Film
  const pelicula = {
    titulo: req.body.titulo,
    duracion: req.body.duracion,
    formato: req.body.formato,
    filename: req.file ? req.file.filename : ""
    //published: req.body.published ? req.body.published : false
  };

  // Save Film in the database with image filename
  Pelicula.create(pelicula)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Film."
      });
    });
};

// Retrieve all Films from the database.
exports.findAll = (req, res) => {
  const titulo = req.query.titulo;
  var condition = titulo ? { titulo: { [Op.like]: `%${titulo}%` } } : null;

  Pelicula.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Films."
      });
    });
};

// Find a single Film with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Pelicula.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Film with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Film with id=" + id
      });
    });
};

// Update a Film by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Pelicula.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Film was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Film with id=${id}. Maybe Film was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Film with id=" + id
      });
    });
};

// Delete a Film with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Pelicula.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Film was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Film with id=${id}. Maybe Film was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Film with id=" + id
      });
    });
};

// Delete all Films from the database.
exports.deleteAll = (req, res) => {
  Pelicula.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Films were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all films."
      });
    });
};

// Find all published Films
exports.findAllPublished = (req, res) => {
  
};
