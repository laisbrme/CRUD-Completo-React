const EMAIL = "admin@admin.com";
const SENHA = "123456";

let campoEmail = document.querySelector("#email");
let campoSenha = document.querySelector("#senha");
let btnEntrar = document.getElementById("btn-entrar");

btnEntrar.addEventListener("click", () => {
    // Capturando os valores digitados pelo usuário
    let emailDigitado = campoEmail.value.toLowerCase(); // 
    let senhaDigitada = campoSenha.value;

    autenticar(emailDigitado, senhaDigitada);
});


function autenticar (email, senha){

    //1° Preciso saber qual a URL da API
    const URL = "http://localhost:3400/login";

    //2° Criar um request para a api
    fetch(URL, {
        method : "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, senha})
    })
    
    //3° Se der certo, direcionar para a tela de controle de produtos
    .then(response => response = response.json())
    .then(response => {
        console.log(response)

        if(!!response.mensagem){
            alert(response.mensagem);
            return;
        }

        // Mostrar loading
        mostrarLoading();

        // Salvando token e usuário na storage
        salvarToken(response.token);
        salvarUsuario(response.usuario);

        setTimeout(() => {
            window.open("controle-produtos.html", "_self");
        }, 1500);
        
    })

    //4° Se der errado, mandar mensagem para o usuário.
    .catch(erro => {
        console.log(erro)
    })    
}

function mostrarLoading(){
    // Tenho que capturar o campo de loading e mostrar ele
    const divLoading = document.getElementById("loading");
    divLoading.style.display = "block";

    // pegar o emento caixa de login e esconder ela.
    const divBoxLogin = document.querySelector("div.caixa-login");
    divBoxLogin.style.display = "none";
}