//Add função para ver se os campos do endereço não estão vazias

// Função para enviar o formulário 
function enviarFormulario() {
	
  if( validaNome() &&
    validaCPF() &&
    validaCEP() &&
    validaLGPD() ) {
    alert("ok");
  } else {
    alert("erro");
  }
}

function validaNome() {
	let inputNome = document.querySelector('#nome').value;
	let erroNome = document.querySelector('#erro-nome');
	
	if (inputNome) {
		erroNome.style.display = "none";
		return true;
	} else {
		erroNome.style.display = "block";
		return false;
	}
}

function validaCPF() {
	let inputCPF = document.querySelector(`#cpf`).value;
	let erroCPF = document.querySelector('#erro-cpf');

	if(verificarCPF(inputCPF)) {
		erroCPF.style.display = "none";
		return true;
	} else {
		erroCPF.style.display = "block";
		return false;
	}
}

// Estou fazendo dessa forma pois a descrição do projeto está pedindo para a verificacão ser feita quando o usuário apertar no submit
// Eu sugeriria que o endereço fosse escrito automaticamente quando o CEP fosse digitado e faria isso pegando os valores do json e aplicando no input
function validaCEP() {
  // Remover todos os dígitos que não sejam números e salvar em uma variável
	let inputCEP = document.querySelector('#cep').value.replace(/\D/g, '');
	let erroCEP = document.querySelector('#erro-cep');

  console.log(consultarCep(inputCEP));
  //Verifica se a quantidade de dígitos é correta e depois consulta o cep
  if(inputCEP.length == 8 &&
    consultarCep(inputCEP)) {
    erroCEP.style.display = "none";
    console.log("entrou true");
    return true;
  } else {
    erroCEP.style.display = "block";
    console.log("entrou false");
    return false;
  }
}

function consultarCep() {
  let cep = document.querySelector(`#cep`).value;
  let url = `https://viacep.com.br/ws/${cep}/json/`;

  //Variável para receber a informação e retornar se o CEP está ok ou não 
  let corretoCEP = true;

  fetch(url).then(function(response){
    response.json().then(function(data){
      console.log(data);
      if (data.hasOwnProperty('erro'))
        corretoCEP = false;
    })
  });
  return corretoCEP;
}

function verificarCPF(cpf) {	
  // Remover todos os dígitos que não sejam números
	cpf = cpf.replace(/[^\d]+/g,'');	

	// Retorna falso se a quantidade de números não	for correta
	if (cpf.length != 11) {
    	return false;
	}
    else {
      // Verifica o primeiro dígito
      soma = 0;
      for (cont =0; cont < 9; cont ++) {
        soma += parseInt(cpf.charAt(cont)) * (10 - cont);
	  }
        resto = 11 - (soma % 11);	
        if (resto == 10 || resto == 11)
          resto = 0;
        if (resto != parseInt(cpf.charAt(9)))		
          return false;	

      // Verifica o segundo dígito
      soma = 0;	
      for (cont  = 0; cont < 10; cont ++) {	
        soma += parseInt(cpf.charAt(cont)) * (11 - cont);
	  }
      resto = 11 - (soma % 11);
      if (resto == 10 || resto == 11)
        resto = 0;
      if (resto != parseInt(cpf.charAt(10)))
        return false;
      return true;
    }
}

function validaLGPD() {
	let inputLGPD= document.querySelector('#aceite-termos');
	let erroLGPD = document.querySelector('#erro-lgpd');

	if(inputLGPD.checked) {
		erroLGPD.style.display = "none";
		return true;
	}
	else {
		erroLGPD.style.display = "block";
		return false;
	}
}

//Funções para criar máscara ao digitar
function mascararNum(objeto, mascara) {
    obj = objeto
    masc = mascara
    setTimeout("fMascEx()", 1)
}

function fMascEx() {
    obj.value = masc(obj.value)
}

function mascaraCPF(cpf) {
    cpf = cpf.replace(/\D/g, "")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return cpf;
}

function mascaraCEP(cep) {
  cep = cep.replace(/\D/g, "");
  cep = cep.replace(/^(\d{5})(\d)/,"$1-$2") 
  return cep;
}

//Funções da lista de Hobbies

// Criar um botão de excluir o hobby
var listaHobby = document.getElementsByTagName("li");

//Cria uma lista para inserir os hobbies
let listaDeHobbies = [];

var cont;
for (cont = 0; cont < listaHobby.length; cont++) {
	var span = document.createElement("SPAN");
	var botaoX = document.createTextNode("\u00D7");
	span.className = "excluir";
	span.appendChild(botaoX);
	listaHobby[cont].appendChild(span);
}

// Click on a close button to hide the current list item
var excluir = document.getElementsByClassName("excluir");
var cont;
for (cont = 0; cont < excluir.length; cont++) {
  excluir[cont].onclick = function() {
    // var div = this.parentElement;
    // div.style.display = "none";
	console.log("entrou");
	listaHobby.splice(cont,1);
  }
}

// Create a new list item when clicking on the "Add" button
function novoHobby() {
  // let tbody = document.querySelector('tbody');
  var inputValue = document.getElementById("input-hobby").value;

  // for (let cont = 0; cont < listaHobby.length; cont++) {
  //   let tr = tbody.insertRow();
  //   let td_acoes

  // }

  var itemHobby = document.createElement("li");
  var inputValue = document.getElementById("input-hobby").value;
  var t = document.createTextNode(inputValue);
  itemHobby.appendChild(t);
  
  //Verifica se o input não está vazio ao adicionar hobby
  if (inputValue === '') {
    alert("Escreva algo antes de adicionar");
  } else {
    //document.getElementById("myUL").appendChild(itemHobby);
	listaDeHobbies.push(inputValue);
  }
  
  // Limpa o campo de imput
  document.getElementById("input-hobby").value = "";

  //Mostra os valores da lista na tela
  let lista = document.getElementById('listaHobbies');
  lista.innerText = "";
  for (cont = 0; cont < listaDeHobbies.length; cont++) {
	let item = document.createElement('li');
	item.appendChild(document.createTextNode(listaDeHobbies[cont]));
	lista.appendChild(item);
  }

  var span = document.createElement("span");
  var txt = document.createTextNode("\u00D7");
  span.className = "excluir";
  span.appendChild(txt);
  itemHobby.appendChild(span);

  for (cont = 0; cont < excluir.length; cont++) {
    excluir[cont].onclick = function() {
    //   var div = this.parentElement;
    //   div.style.display = "none";
	  listaHobby.splice(cont,1);
    }
  }
}

//Função para ativar o modo escuro
//let isDark = document.querySelector('#toggle-dark').checked;
let containerDiv = document.querySelector('#container');
let isDark = false;

function modoEscuro(){
  isDark = !isDark;
  if(isDark){
    containerDiv.classList.add("modo-escuro");
  } else {
    containerDiv.classList.remove("modo-escuro");
  }
}