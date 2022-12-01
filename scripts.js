//let isDark = document.querySelector('#toggle-dark').checked;
let container = document.querySelector('#container');
let isDark = false;

function modoEscuro(){
  isDark = !isDark;
  if(isDark){
    container.classList.add("modo-escuro");
  } else {
    container.classList.remove("modo-escuro");
  }
}

function msg() {
    alert("Você clicou no botão!");
}

function enviarFormulario() {
  let cpf = document.querySelector(`#cpf`).value;
  alert(verificarCPF(cpf));
  consultarCep();
}

function consultarCep() {
  let cep = document.querySelector(`#cep`).value;
  let url = `https://viacep.com.br/ws/${cep}/json/`;

  fetch(url).then(function(response){
    response.json().then(function(data) {
      console.log(data);
      exibirEndereco(data);
    })
  })
}

function exibirEndereco(dados) {
  let resultado = document.querySelector(`#resultado`);

  resultado.innerHTML = `<p>Endereço: ${dados.logradouro}</p>`;
}

function verificarCPF(cpf) {	
  // Remover todos os dígitos que não sejam númeroos
	cpf = cpf.replace(/[^\d]+/g,'');	

	// Retorna falso se a quantidade de numeros não	for correta
	if (cpf.length != 11) {
    return false; }
    else {
      // Valida 1o digito	
      add = 0;	
      for (i=0; i < 9; i ++)		
        add += parseInt(cpf.charAt(i)) * (10 - i);	
        rev = 11 - (add % 11);	
        if (rev == 10 || rev == 11)		
          rev = 0;	
        if (rev != parseInt(cpf.charAt(9)))		
          return false;		
      // Valida 2o digito	
      add = 0;	
      for (i = 0; i < 10; i ++)		
        add += parseInt(cpf.charAt(i)) * (11 - i);	
      rev = 11 - (add % 11);	
      if (rev == 10 || rev == 11)	
        rev = 0;	
      if (rev != parseInt(cpf.charAt(10)))
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

function adicionarHobby(plusElement){

	let displayButton = document.querySelector("#botaoAdd");

	// Verifica se o campo está vazio
	if(plusElement.previousElementSibling.value.trim() === ""){
		return false;
	}

	// creating the div container.
	let div = document.createElement("div");
	div.setAttribute("class", "field");

	// Creating the input element.
	let field = document.createElement("input");
	field.setAttribute("type", "text");
	field.setAttribute("name", "notes[]");

	// Creating the plus span element.
	let plus = document.createElement("span");
	plus.setAttribute("onclick", "adicionarHobby(this)");
	let plusText = document.createTextNode("+");
	plus.appendChild(plusText);

	// Creating the minus span element.
	let minus = document.createElement("span");
	minus.setAttribute("onclick", "removeField(this)");
	let minusText = document.createTextNode("-");
	minus.appendChild(minusText);

	// Adding the elements to the DOM.
	form.insertBefore(div, displayButton);
	div.appendChild(field);
	div.appendChild(plus);
	div.appendChild(minus);

	// Un hiding the minus sign.
	plusElement.nextElementSibling.style.display = "block"; // the minus sign
	// Hiding the plus sign.
	plusElement.style.display = "none"; // the plus sign
}

function removeField(minusElement){
   minusElement.parentElement.remove();
}

let form = document.forms[0];
form.addEventListener("submit", fetchTextNotes);
function fetchTextNotes(event){
	// prevent the form to communicate with the server.
	event.preventDefault();

	// Fetch the values from the input fields.
	let data = new FormData(form);

	// Storing the values inside an array so we can handle them.
	// we don't want empty values.
	let notes = [];
	data.forEach( function(value){
		if(value !== ""){
			notes.push(value);
		}
	});

	// Output the values on the screen.
	let out = "";
	for(let note of notes){
		out += `
			<p>${note} <span onclick="markAsDone(this)">Mark as done</span></p>
		`;
	}
	document.querySelector(".notes").innerHTML = out;

	// Delete all input elements except the last one.
	let inputFields = document.querySelectorAll(".field");
	inputFields.forEach(function(element, index){
		if(index == inputFields.length - 1){
			element.children[0].value = "";
		}else{
			element.remove();
		}
	});
}

function markAsDone(element){
	element.classList.add("mark");
	element.innerHTML = "&check;";
}