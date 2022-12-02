// Função para enviar o formulário 
function enviarFormulario() {
	
  	// alert(verificarCPF(cpf));
  	validaCEP();
	// if( validaNome() &&
	// 	validaCPF() &&
	// 	validaLGPD() ) {
	// 	alert("ok");
	// } else {
	// 	alert("erro");
	// }
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

function validaCEP() {
	let inputCEP = document.querySelector('#cep').value.replace(/\D/g, '');
	//let erroCEP = document.querySelector('#erro-cep');
	if(inputCEP.length != 8)
		alert("pequeno");

	consultarCep(inputCEP);

	if (!("erro" in dados_cep)) {
		alert("ok");
		// erroLGPD.style.display = "none";
		// return true;
	}
	else {
		alert("erro");
		// erroLGPD.style.display = "block";
		// return false;
	}
}

function consultarCep() {
	var script = document.createElement('script');

  let cep = document.querySelector(`#cep`).value;
  let url = `https://viacep.com.br/ws/${cep}/json/?callback=dados_cep`;

  script.src = url;
  document.body.appendChild(script);

  fetch(url).then(function(response){
    response.json().then(function(data) {
      exibirEndereco(data);
    })
  })
}

function exibirEndereco(dados) {
  let resultado = document.querySelector('#resultado');

  resultado.innerHTML = `<p>Endereço: ${dados.logradouro}</p>`;
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

function fMasc(objeto, mascara) {
    obj = objeto
    masc = mascara
    setTimeout("fMascEx()", 1)
}

function fMascEx() {
    obj.value = masc(obj.value)
}

function mCPF(cpf) {
    cpf = cpf.replace(/\D/g, "")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return cpf
}

//Lista de Hobbies

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
function newElement() {
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

//Funcao do cep

'use strict';

let erroCEP = false;

const zerarForm = (endereco) =>{
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}


const preencherFormulario = (endereco) =>{
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}


const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep); 

const procurarCEP = async() => {
    zerarForm();
    
    const cep = document.getElementById('cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)){
        const dados = await fetch(url);
        const endereco = await dados.json();
        if (endereco.hasOwnProperty('erro')){
            document.getElementById('endereco').value = 'CEP não encontrado!';
          erroCEP = true;
        }else {
            preencherFormulario(endereco);
        }
    }else{
        document.getElementById('endereco').value = 'CEP incorreto!';
    }
     
}

document.getElementById('cep')
        .addEventListener('focusout',procurarCEP);