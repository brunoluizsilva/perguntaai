const sequelize = require("sequelize"); //importar o sequelize

const connection = new sequelize('pergunta_ai', 'root', 'bruno', {
  host: 'localhost',
  dialect: 'mysql'
})

//exportar a conexão

module.exports = connection;