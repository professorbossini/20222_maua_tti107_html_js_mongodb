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

async function cadastrarFilme(){
  //1. Construir a URL
  const URLCompleta = `${protocolo}://${baseURL}${filmesEndpoint}`
  //2. pegar os inputs em que o usuário digita título e sinopse
  let tituloInput = document.querySelector('#tituloInput')
  let sinopseInput = document.querySelector('#sinopseInput')
  //3. pegar os valores do filme (titulo e sinopse)
  let titulo = tituloInput.value
  let sinopse = sinopseInput.value
  if (titulo && sinopse){
    let filme = {titulo, sinopse}
    //4. limpar os campos em que o usuário digitou
    tituloInput.value = ''
    sinopseInput.value = ''
    //5. Enviar o filme ao back end
    const filmes = (await axios.post(URLCompleta, filme)).data
    //6. remover os filmes todos da DOM, para que eu possa inserir a coleção recebida do back
    const tabela = document.querySelector('.filmes')
    const corpoTabela = tabela.getElementsByTagName('tbody')[0]
    corpoTabela.innerHTML = ''
    //iterar sobre a coleção de filmes
    console.log(filmes)
    for(let filme of filmes){
      //adicionar uma linha na árvore
      let linha = corpoTabela.insertRow(0)
      //na linha, adicionar duas células
      let celulaTitulo = linha.insertCell(0)
      let celulaSinopse = linha.insertCell(1)
      //em cada célula, colocar titulo e sinopse
      celulaTitulo.innerHTML = filme.titulo
      celulaSinopse.innerHTML = filme.sinopse    
    }
  }
  else{
    //1. pegar uma referência ao alert
    const alert = document.querySelector('.alert')
    //2. aplicar a classe show ao alert
    alert.classList.add('show')
    //3. remover a classe d-none do alert
    alert.classList.remove('d-none')
    //4. configurar um timer de 2 segundos que remove a classe show e adiciona a classe d-none
    setTimeout(() => {
      alert.classList.remove('show')
      alert.classList.add('d-none')
    }, 2000)
  }
}