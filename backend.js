//mongodb+srv://professorbossini:<password>@cluster0.wttmkyk.mongodb.net/?retryWrites=true&w=majority
const bcrypt= require ('bcrypt')
const cors = require('cors')
const express = require('express')
const mongoose = require ('mongoose')
const uniqueValidator = require ('mongoose-unique-validator')
const app = express()
app.use(express.json())
//aqui vamos aplicar um "middleware" que "libera" o CORS
app.use(cors())

//descrever o que é um filme usando a mongoose
const Filme = mongoose.model('Filme', mongoose.Schema({
  titulo: {type: String},
  sinopse: {type: String}
}))

const usuarioSchema = mongoose.Schema({
  login: {type: String, required: true, unique: true},
  password: {type: String, required: true}
})

usuarioSchema.plugin(uniqueValidator)

const Usuario = mongoose.model('Usuario', usuarioSchema)

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

//localhost:3000/signup
app.post('/signup', async (req, res) => {
  try{
    //1. pegar login e senha da requisição
    // const login = req.body.login
    // const password = req.body.password
    // operador de desestruturação do Javascript
    const { login, password } = req.body
    //2. construir um objeto do tipo Usuario usando o modelo da mongoose
    const criptografada = await bcrypt.hash(password, 10)
    console.log(criptografada)
    const usuario = new Usuario({login, password: criptografada})
    //3. cadastrar o usuário na base
    const respMongo = await usuario.save()
    console.log(respMongo)
    //4. respondo ao cliente que deu tudo certo
    res.status(201).end()
  }
  catch (erro){
    console.log('erro', erro)
    res.status(409).end()
  }
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
