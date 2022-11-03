//mongodb+srv://professorbossini:<password>@cluster0.wttmkyk.mongodb.net/?retryWrites=true&w=majority
const express = require('express')
const cors = require('cors')
const mongoose = require ('mongoose')
const app = express()
app.use(express.json())
//aqui vamos aplicar um "middleware" que "libera" o CORS
app.use(cors())

//descrever o que é um filme usando a mongoose
const Filme = mongoose.model('Filme', mongoose.Schema({
  titulo: {type: String},
  sinopse: {type: String}
}))

//essa função vai ser usada para estabelecer uma conexão entre o Back End (NodeJS) e o MongoDB
async function conectarAoMongoDB(){
  await mongoose.connect('mongodb+srv://professorbossini:professorbossini@cluster0.wttmkyk.mongodb.net/?retryWrites=true&w=majority')
}

//endpoint
//localhost:3000/hey
//resposta esperada: hey
//http
app.get('/hey', (req, res) => {
  res.send('hey')
})
//a
//localhost:3000/filmes
app.get('/filmes', async (req, res) => {
  //1. pegar a coleção de filmes que existe na base gerenciada pelo MongoDB
  const filmes = await Filme.find()
  //2. devolver a coleção para o cliente
  res.json(filmes)
}) 

//endpoint que atenda requisições feitas como "post" e não get, no padrão
//localhost:3000/filmes
app.post('/filmes', async (req, res) => {
  //obter o titulo que se encontra na requisição
  let titulo = req.body.titulo

  //obter a sinopse que se encontra na requisição  
  let sinopse = req.body.sinopse

  //construir um objeto JSON que representa esse novo filme
  // let filme = {titulo: titulo, sinopse: sinopse}
  // let filme = {titulo, sinopse}
  //construir um objeto Filme usando o modelo da mongoose
  const filme = new Filme ({titulo, sinopse})

  //adicionar o objeto JSON à coleção de filmes
  // filmes.push(filme)
  await filme.save()
  const filmes = await Filme.find()

  //devolver a coleção de filmes atualizada para o cliente
  res.json(filmes)  

})

//127.0.0.1:3000
app.listen(3000, () => {
  try{
    conectarAoMongoDB()
    console.log('servidor no ar')
  }
  catch(erro){
    console.log("Erro", erro)   
  }
})
