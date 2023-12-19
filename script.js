const inputpesquisa = document.getElementById("pesquisa");
const form = document.getElementById("form");
const conteudo = document.getElementById("conteudo");
const tempoInformacoes = document.getElementById("tempoInformacoes");
const localizacao = document.getElementById("localizacao");
let imagemTempo = document.getElementById("imagemTempo");
let tituloDescricao = document.getElementById("tituloDescricao");
let paragrafoGraus = document.getElementById("paragrafoGraus");
let umidade = document.getElementById("umidade");
let vento = document.getElementById("vento");
let cidade = document.getElementById("cidade");
let bandeira = document.getElementById("bandeira");

async function fetchApi(consulta) {
	let urlTempo = `https://api.openweathermap.org/data/2.5/weather?q=${consulta}&appid=2437bcf888cce33d4b441390f2cce63e&units=metric&lang=pt_br`;
    const ApiResponse = await fetch(urlTempo);
    const data = await ApiResponse.json();
    return data;
}

async function ShowContent(consulta) {
  const data = await fetchApi(consulta);
  let codigo = data['weather'][0]['icon'];
  let codigoBandeira = data['sys']['country'];
  let retornoTemperatura = data['main']['temp'];
  let graus = retornoTemperatura.toString().substring(0, 2)
  tituloDescricao.innerHTML = data['weather'][0]['description'];
  cidade.innerHTML = data['name'];
  bandeira.src = `https://flagsapi.com/${codigoBandeira}/flat/64.png`;
  imagemTempo.src = `https://openweathermap.org/img/wn/${codigo}@2x.png`;
  paragrafoGraus.innerHTML = graus + "°C";
  umidade.innerHTML = data['main']['humidity'] + "%";
  vento.innerHTML = data['wind']['speed'] + "Km/h";
}
 


ShowContent(inputpesquisa.value)

/*
async function ShowContent(cidade) {
	const data = await fetchApi(cidade);
	let imagem = document.createElement("img");
	imagem.setAttribute("height" , "auto");
	imagem.setAttribute("width" , "auto");
	imagem.setAttribute("src" , data['current']['condition']['icon']);
    conteudo.appendChild(imagem);
	//data['location']['country'];
}
*/


form.addEventListener("submit" , (event) => {
event.preventDefault();
console.log(fetchApi(inputpesquisa.value))
ShowContent(inputpesquisa.value);
inputpesquisa.value = "";
})



