module.exports = (sequelize, Sequelize) => {
    const Pelicula = sequelize.define("pelicula", {
      titulo: {
        type: Sequelize.STRING
      },
       duracion: {
        type: Sequelize.INTEGER
      },
      formato: {
        type: Sequelize.STRING
      },
      //modificamos esto para añadir campo filename que es donde se guarda el nombre de fichero de la imagen
      filename: {
        type: Sequelize.STRING
      }


    });
  
    return Pelicula;
  }