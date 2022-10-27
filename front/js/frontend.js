const protocolo = "http"
const baseURL = "localhost:3000"
const filmesEndpoint = "/filmes"

// async/await
async function obterFilmes(){
 const URLCompleta = `${protocolo}://${baseURL}${filmesEndpoint}`
  const filmes = (await axios.get(URLCompleta)).data
  let tabela = document.querySelector('.filmes')
  //camel case
  let corpoDaTabela = tabela.getElementsByTagName('tbody')[0]
  //estrutura de repetição
  for (let filme of filmes){
    let linha = corpoDaTabela.insertRow()
    let celulaTitulo = linha.insertCell(0)
    celulaTitulo.innerHTML = filme.titulo
    let celulaSinopse = linha.insertCell(1)
    celulaSinopse.innerHTML = filme.sinopse
  }
}