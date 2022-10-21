const protocolo = "http"
const baseURL = "localhost:3000"
const filmesEndpoint = "/filmes"

// async/await
async function obterFilmes(){
  // const URLCompleta = f'{2 + 2}'
  // string template
  const URLCompleta = `${protocolo}://${baseURL}${filmesEndpoint}`
  // data
  //aqui acontece um erro "CORS"
  //Cross Resource Origin Sharing
  const filmes = (await axios.get(URLCompleta)).data
  //agora vamos manipular a árvore DOM
  //(Document Object Model)
  console.log(document)
}