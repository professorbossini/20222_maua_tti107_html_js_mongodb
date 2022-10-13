const express = require('express')
const app = express()
app.use(express.json())

let filmes = [
  {
    titulo: "Forrest Gump - O Contador de Histórias",
    sinopse: "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks),um rapaz com QI abaixo da média e boas intenções."
  },
  {
    titulo: "Um Sonho de Liberdade",
    sinopse: "Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime que nunca cometeu, o homicídio de sua esposa e do amante dela"
  }
]

//endpoint
//localhost:3000/hey
//resposta esperada: hey
//http
app.get('/hey', (req, res) => {
  res.send('hey')
})
//a
//localhost:3000/filmes
app.get('/filmes', (req, res) => {
  res.json(filmes)
}) //() => {} isso é uma arrow function

//endpoint que atenda requisições feitas como "post" e não get, no padrão
//localhost:3000/filmes
app.post('/filmes', (req, res) => {
  //obter o titulo que se encontra na requisição
  let titulo = req.body.titulo

  //obter a sinopse que se encontra na requisição  
  let sinopse = req.body.sinopse

  //construir um objeto JSON que representa esse novo filme
  // let filme = {titulo: titulo, sinopse: sinopse}
  let filme = {titulo, sinopse}

  //adicionar o objeto JSON à coleção de filmes
  filmes.push(filme)

  //devolver a coleção de filmes atualizada para o cliente
  res.json(filmes)  

})

//127.0.0.1:3000
app.listen(3000, () => console.log("servidor no ar"))