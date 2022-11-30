function msg() {
    alert("Você clicou no botão!");
}

function enviarFormulario() {
  let cpf = document.querySelector(`#cpf`).value;
  alert(verificarCPF(cpf));
  //consultarCep();
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

// function ValidaCPF() {
//     var RegraValida = document.getElementById("RegraValida").value;
//     var cpfValido = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/;
//     if (cpfValido.test(RegraValida) == true) {
//         alert("CPF Válido");
//     } else {
//         alert("CPF Inválido");
//     }
// }

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

// function fMasc(objeto, mascara) {
//     obj = objeto
//     masc = mascara
//     setTimeout("fMascEx()", 1)
// }

// function fMascEx() {
//     obj.value = masc(obj.value)
// }

// function mCPF(cpf) {
//     cpf = cpf.replace(/\D/g, "")
//     cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
//     cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
//     cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
//     return cpf
// }

// var dependentes = [{
// 	identificador: 13,
//   nome: "Joana da Silva",
//   idade: 12,
// }];


// function carregarDependentes(){
// 	let dependentes_container = document.querySelector("#dependentesContainer");
//   		dependentes_container.innerHTML = "";
//   dependentes.forEach((el)=>{
//   	let identificador = el.identificador;
//   	let nome = el.nome;
//     let idade = el.idade;
//     let dependente_container = `<div class="dependente" data-id="${identificador}">
//     															<input class="nome" placeholder="Digite o nome" type="text" value="${nome}"/>
//                                   <input class="idade" placeholder="Digite a idade" type="number" value="${idade}"/>
//                                   <div class="action">
//                                   	<a href="#" class="salvar">salvar 💾</a>
//                                     <a href="#" class="remover">❌</a>
// 																	</div>
// 															  </div>`;
//   	dependentes_container.innerHTML += dependente_container;
//   });
//   salvarDependentes();
//   removerDependentes();
//   travarOutros(false);
// }

// function removerDependentes(){
// 	document.querySelectorAll("#dependentesContainer .remover").forEach((el, i)=>{
//   	el.addEventListener("click", ()=>{
//   		dependentes.splice(i, 1);  	
//       carregarDependentes();
//     });
//   });
// }

// function adicionarDependentes(){
//   dependentes.push({identificador:"", nome:"", idade: ""});
//   carregarDependentes();
//   travarOutros(document.querySelector("#dependentesContainer > div:last-child"));
// }

// function salvarDependentes(){
// 		document.querySelectorAll("#dependentesContainer .salvar").forEach((el, i)=>{
//   	el.addEventListener("click", ()=>{
//       let identificador = el.parentElement.parentElement.getAttribute("data-id");
//       let nome = el.parentElement.parentElement.querySelector(".nome").value;
//       let idade = el.parentElement.parentElement.querySelector(".idade").value;
    	
//       if(!nome.length || !idade.length){
//       	alert("Nome e idade precisam ser preenchidos para salvar.");
//         return false;
//       }
//   		dependentes.splice(i, 1, {identificador: identificador, nome: nome, idade: idade});
//       carregarDependentes();
//       travarOutros(false);
//     });
//   });
// }

// function travarOutros(element){
// 	if(element == false){
//   	document.querySelectorAll(".dependentes button, .dependentes .container > div").forEach((el)=>{
//     	el.classList.remove("disabled");
//     });
//     document.querySelector("#containerDados").innerHTML = "";
//     return false;
//   }
//   document.querySelectorAll(".dependentes button, .dependentes .container > div").forEach((el)=>{
//   	if(el != element){
//     	el.classList.add("disabled");
//     }
//   });
// }

// //init
// document.querySelector("#btnAdicionarDependentes").addEventListener("click", adicionarDependentes);
// carregarDependentes();

// //capturarDados
// document.querySelector("#btnCapturarDados").addEventListener("click", ()=>{
// 	document.querySelector("#containerDados").innerHTML = JSON.stringify(dependentes, undefined, 4);
// });