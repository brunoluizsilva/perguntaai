const sequelize = require("sequelize"); //importar sequelize
const connection = require("./database") //importar conexão


const Resposta = connection.define("respostas", {
  corpo: {
    type: sequelize.TEXT,
    allowNull: false
  },
  perguntaId: {
    type: sequelize.INTEGER,
    allowNull: false
  }
})

Resposta.sync( {force: false} );

module.exports = Resposta;