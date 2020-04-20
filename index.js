const express = require("express") //importando o modulo express
const app = express(); // criando uma instancia do express
const bodyParser = require("body-parser"); //importando a biblioteca body parser.
const connection = require("./database/database") //importando a conexão
const Pergunta = require("./database/Pergunta") // importando o model Pergunta
const Resposta = require("./database/Resposta") //importando o model Resposta
//database
connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com o banco de dados!")
  })
  .catch((erro) => {
    console.log(erro)
  })


//
app.set('view engine', 'ejs'); // o express irá usar o EJS como view engine (renderizador de html)
app.use(express.static('public')); //utilizar arquivos estaticos

//config bodyParser
app.use(bodyParser.urlencoded({extended: false})) // irá traduzir os dados do form em uma estrutura js
app.use(bodyParser.json()) // permite que os dados dos formulários sejam lidos via json.

//rotas
app.get("/", function(req, res) {
  Pergunta.findAll({ raw: true, order: [
    ['id', 'DESC'] //ordernar pelo id de forma decrescente
  ] }).then((perguntas) => { //buscar peguntas no banco de dados e envia pro front end
    console.log(perguntas)
    res.render("index", {
      perguntas: perguntas
    }); 
  })
})

app.get("/perguntar", ((req, res) => {
  res.render("perguntar")
}))

app.post("/salvarpergunta", ((req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
  //salvar dados que vem do formulario
  Pergunta.create({
    titulo: titulo,
    descricao: descricao
  }).then(() => {
    res.redirect("/");
  })
}))

app.get("/pergunta/:id", ((req, res) => {
  var id = req.params.id;
  Pergunta.findOne({ //vai buscar um dado com uma condição.
    where: {id: id}
  }).then((pergunta) => {
    if(pergunta != undefined) {

      Resposta.findAll({
        where: {perguntaId: pergunta.id},
        order: [
          ['id', 'DESC']
        ]
      }).then((respostas) => {
        res.render("pergunta", {
          pergunta: pergunta,
          respostas: respostas,
        });
      })
    } else {
      res.redirect("/");
    }
  })
}))

app.post("/responder", ((req, res) => {
  var corpo = req.body.corpo;
  var perguntaId = req.body.pergunta;
  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId
  }).then(() => {
    res.redirect(`/pergunta/${perguntaId}`)
  })
}))


app.listen(3000, () => {
  console.log("App rodando!")
});