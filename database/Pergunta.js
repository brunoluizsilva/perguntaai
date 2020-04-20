const sequelize = require("sequelize"); //importar sequelize
const connection = require("./database") //importar conexão

// definição do model e campos da tabela

const Pergunta = connection.define('perguntas', {
  titulo: {
    type: sequelize.STRING,
    allowNull: false
  },
  descricao: {
    type: sequelize.TEXT,
    allowNull: false
  }
});

//passa o model para o banco de dados

Pergunta.sync({force: false}).then(() => {
  console.log("Tabela criada com sucesso!")
});

module.exports = Pergunta;