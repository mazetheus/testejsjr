//Add função para ver se os campos do endereço não estão vazias

// Função para enviar o formulário 
function enviarFormulario() {
	
  if( validaNome() &&
    validaNascimento() &&
    validaCPF() &&
    validaIdade() &&
    validaCEP() &&
    validaEndereco() &&
    validaLGPD() ) {
    alert("ok");
  } else {
    alert("erro");
  }
}

function validaNome() {
	let inputNome = document.querySelector('#nome').value;	

	if (inputNome) {
		document.getElementById("erro-nome").classList.remove("errovisivel");
		return true;
	} else {
		document.getElementById("erro-nome").classList.add("errovisivel");
		return false;
	}
}

function validaNascimento() {
  let inputNascimento = document.querySelector('#nascimento').value;

  if (inputNascimento){
  	document.getElementById("erro-nascimento").classList.remove("errovisivel");
		return true;
	} else {
		document.getElementById("erro-nascimento").classList.add("errovisivel");
		return false;
	}
}

function validaIdade() {
	let inputIdade = document.querySelector('#idade').value;

	if (inputIdade < 0 ||
    inputIdade == "") {
		document.getElementById("erro-idade").classList.add("errovisivel");
		return false;
	} else {
		document.getElementById("erro-idade").classList.remove("errovisivel");
		return true;
	}
}

function validaCPF() {
	let inputCPF = document.querySelector(`#cpf`).value;

	if(verificarCPF(inputCPF)) {
		document.getElementById("erro-cpf").classList.remove("errovisivel");
		return true;
	} else {
		document.getElementById("erro-cpf").classList.add("errovisivel");
		return false;
	}
}

// Estou fazendo dessa forma pois a descrição do projeto está pedindo para a verificacão ser feita quando o usuário apertar no submit
// Eu sugeriria que o endereço fosse escrito automaticamente quando o CEP fosse digitado e faria isso pegando os valores do json e aplicando no input
function validaCEP() {
  // Remover todos os dígitos que não sejam números e salvar em uma variável
	let inputCEP = document.querySelector('#cep').value.replace(/\D/g, '');

  //Verifica se a quantidade de dígitos é correta e depois consulta o cep
  if(inputCEP.length == 8 &&
    consultarCep(inputCEP)) {
    document.getElementById("erro-cep").classList.remove("errovisivel");
    return true;
  } else {
    document.getElementById("erro-cep").classList.add("errovisivel");
    return false;
  }
}

function validaEndereco() {
  let inputEndereco = document.querySelector('#endereco').value;
  let inputBairro = document.querySelector('#bairro').value;
  let inputCidade = document.querySelector('#cidade').value;
  let inputEstado = document.querySelector('#estado').value;

  if(inputEndereco == "") {
    document.getElementById("erro-endereco").classList.add("errovisivel");
    return false;
  } else
    document.getElementById("erro-endereco").classList.remove("errovisivel");

  if(inputBairro == "") {
    document.getElementById("erro-bairro").classList.add("errovisivel");
    return false;
  } else
    document.getElementById("erro-bairro").classList.remove("errovisivel");

  if(inputCidade == "") {
    document.getElementById("erro-cidade").classList.add("errovisivel");
    return false;
  } else
    document.getElementById("erro-cidade").classList.remove("errovisivel");

  if(inputEstado == "") {
    document.getElementById("erro-estado").classList.add("errovisivel");
    return false;
  } else
    document.getElementById("erro-estado").classList.remove("errovisivel");

  return true;

}

function validaLGPD() {
	let inputLGPD= document.querySelector('#aceite-termos');

	if(inputLGPD.checked) {
		document.getElementById("erro-lgpd").classList.add("errovisivel");
		return true;
	}
	else {
		document.getElementById("erro-lgpd").classList.remove("errovisivel");
		return false;
	}
}

// Função para verificar o CEP na API VIACEP
// A função apenas confere se o CEP existe, mas poderia conferir se o endereço informado bate com o da API ou fazer ele ser escrito automaticamente
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

// Funções para criar máscara ao digitar
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

// Funções da lista de Hobbies

// Cria uma lista para inserir os hobbies
let listaDeHobbies = [];

// Criar um novo item na lista de hobbies ao clicar em Adicionar
function novoHobby() {
  var inputValue = document.getElementById("inputHobby").value;
  var itemHobby = document.createElement("li");
  var t = document.createTextNode(inputValue);
  itemHobby.appendChild(t);
  
  //Verifica se o input não está vazio ao adicionar hobby
  if (inputValue === '')
    alert("Escreva algo antes de adicionar");
  else
	  listaDeHobbies.push(inputValue);
  
  // Limpa o campo de imput
  document.getElementById("inputHobby").value = "";

  imprimirLista();
}

function imprimirLista() {
  let lista = document.getElementById('listaHobbies');
  lista.innerText = "";

  for ( let cont = 0; cont < listaDeHobbies.length; cont++) {
    let item = document.createElement('li');
    // Coloco o botão de deletar - com o indice do elemento na lista - ao lado do nome
    item.innerHTML = listaDeHobbies[cont] + ' <button class="botaodeletar" onclick="apagarHobby(' + cont + ');">Remover</button>';
    lista.appendChild(item);
  }
}

function apagarHobby(indice){
  listaDeHobbies.splice(indice, 1);
  imprimirLista();
}

//Função para ativar o modo escuro
//let isDark = document.querySelector('#toggle-dark').checked;
let containerDiv = document.querySelector('#container');
let isDark = false;

function modoEscuro(){
  isDark = !isDark;
  if(isDark)
    containerDiv.classList.add("modo-escuro");
  else
    containerDiv.classList.remove("modo-escuro");
}


