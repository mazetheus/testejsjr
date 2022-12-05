# Teste para cargo de dev júnior Javascript

## O que foi implementado

- Uma página contendo um formulário com os seguintes campos:
	- Nome
	- CPF
	- Data de Nascimento
	- Idade
	- CEP
	- Rua
	- Número
	- Bairro
	- Cidade
	- Estado
	- Hobby
	- Checkbox aceite LGPD
	- Botão submit

- E as seguintes funcionalidades:
    - Verificação de todos os campos antes de ser feito o envio do formulário
    - Integração o campo CEP com a API ViaCerta para confirmar se ele existe
    - Mascara de CPF e CEP enquando o usuário digita
    - Inserção de hobbies dinamicamente em um array com a opcão de excluir
    - Geração de um arquivo .json e exibição de um modal com opção de enviar ou cancelar
    - Modo escuro
    - Responsividade para modo mobile
    - Algumas animações de hover para botões

## O que poderia ser adicionado

Como a descrição do projeto está pedindo para a verificacão dos campos ser feita quando o usuário apertar no botão de submit, eu fiz o fetch para a API do CEP apenas nesse momento, confirmando apenas se o CEP informado existe ou não.
Eu sugeriria que o endereço fosse escrito dinânicamente no input do formulário quando o CEP fosse digitado. Faria isso pegando os valores do json e aplicando nos campos do form.

## Construído com
- JS Vanilla (puro)
- SCSS

## Feito por

* **Matheus Azevedo** - [github](https://github.com/mazetheus) - [omatheusazevedo@gmail.com](mailto:omatheusazevedo@gmail.com)
