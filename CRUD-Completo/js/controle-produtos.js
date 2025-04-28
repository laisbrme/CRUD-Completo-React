const URL = "http://localhost:3400/produtos"

let listaProduto = [];
let btnAdicionar = document.querySelector("#btn-adicionar");
let tabelaProduto = document.querySelector("table>tbody");
let modalProduto = new bootstrap.Modal(document.getElementById("modal-produto"));

let modoEdição = false;

let formModal = {

    titulo: document.querySelector("h4.modal-title"),

    id: document.querySelector("#id"),
    nome: document.querySelector("#nome"),
    valor: document.querySelector("#valor"),
    qtdEstoque: document.querySelector("#qtdEstoque"),
    observacao: document.querySelector("#observacao"),
    dataCadastro: document.querySelector("#dataCadastro"),
    btnSalvar: document.querySelector("#btn-salvar"),
    btnCancelar: document.querySelector("#btn-cancelar")
}

btnAdicionar.addEventListener("click", () => {

    modoEdição = false;
    formModal.titulo.textContent = "Adicionar produto";

    limparModalProduto(),
    modalProduto.show()
});

// Obtendo produtos da API
function obterProduto() {

    fetch(URL, {
        method: "GET",
        headers: {
            'Authorization': obterToken()
        }
    })
    .then(response => response.json())
    .then(produto => {
        listaProduto = produto;
        popularTabela(produto);
    })
    .catch((erro) => {});
}

obterProduto();

function popularTabela(produto) {
    // Limpando a tabela para popular
    tabelaProduto.textContent = "";

    produto.forEach(produto => {
        criarLinhaNaTabela(produto)
    });
}

function criarLinhaNaTabela(produto) {
    // Criando uma linha na tabela
    let tr = document.createElement('tr');

    // Criando as tds dos conteúdos da tabela
    let tdId = document.createElement('td');
    let tdNome = document.createElement('td');
    let tdValor = document.createElement('td');
    let tdQtdEstoque = document.createElement('td');
    let tdObservacao = document.createElement('td');
    let tdDataCadastro = document.createElement('td');
    let tdAcoes = document.createElement('td');

    // Atualizando com base no produto
    tdId.textContent = produto.id;
    tdNome.textContent = produto.nome;
    tdValor.textContent = produto.valor;
    tdQtdEstoque.textContent = produto.qtdEstoque;
    tdObservacao.textContent = produto.observacao;
    tdDataCadastro.textContent = new Date(produto.dataCadastro).toLocaleDateString();
    tdAcoes.innerHTML =     `<button onclick="editarProduto(${produto.id})" class="btn btn-outline-success btn-sm mr-3">
                                Editar
                            </button>
                            <button onclick="excluirProduto(${produto.id})" class="btn btn-outline-success btn-sm mr-3">
                                Excluir
                            </button>`;

    // Adicionando as tds na tabela
    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tr.appendChild(tdValor);
    tr.appendChild(tdQtdEstoque);
    tr.appendChild(tdObservacao);
    tr.appendChild(tdDataCadastro);
    tr.appendChild(tdAcoes);

    // Adicionando a linha na tabela
    tabelaProduto.appendChild(tr);
}

formModal.btnSalvar.addEventListener("click", () => {
    // Capturando os dados da tela do modal e transformar em um produto
    let produto = obterProdutoDoModal();

    // Verificando se os campos obrigatórios foram preenchidos
    if (!produto.validar()){
        alert("Preencha todos os campos obrigatórios");
        return;
    }

    // Mandar na API - Backend
    if (modoEdição) {
        // Aqui atualiza
        atualizarProdutoNoBackend(produto);
    }else{
        // Aqui cadastra
        adicionarProdutoNoBackend(produto);
    }
});

function atualizarProdutoNoBackend(id) {

    fetch(`${URL}/${produto.id}`, {
        method: "PUT",
        headers: {
            Authorization: obterToken(),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(produto)
    })
    .then(() => {
        // Atualizar produto na lista
        atualizarProdutoNaTabela(produto);
        // Informar a atualização ao usuário
        // alert("Cliente atualizado com sucesso!");
        Swal.fire({
            //position: "top-end",
            icon: "success",
            title: `Produto ${produto.nome} cadastrado com sucesso!`,
            showConfirmButton: false,
            timer: 5000
        })
        // Fechar modal
        modalProduto.hide();
    })
}

function atualizarProdutoNaTabela(produto) {

    let indice = listaProduto.findIndex(p => p.id == produto.id);
    listaProduto.splice(indice, 1, produto);
    popularTabela(listaProduto);
}

function obterProdutoDoModal() {

    return new Produto({
        id: formModal.id.value,
        nome: formModal.nome.value,
        valor: formModal.valor.value,
        qtdEstoque: formModal.qtdEstoque.value,
        observacao: formModal.observacao.value,
        dataCadastro: (formModal.dataCadastro.value) // Condição
            ? new Date(formModal.dataCadastro.value).toISOString() // Se verdadeiro
            : new Date().toDateString() // Se falso
    });
}

function adicionarProdutoNoBackend(produto) {

    fetch(URL, {
        method: "POST",
        headers: {
            Authorization: obterToken(),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(produto)
    })
    .then(response => response.json())
    .then(response => {
        let novoProduto = new Produto(response);
        listaProduto.push(novoProduto);

        popularTabela(listaProduto);

        // Fechar modal
        modalProduto.hide();

        // Exibir mensagem de produto cadastrado com sucesso
        //alert(`Produto ${produto.nome} cadastrado com sucesso!`)
        Swal.fire({
            // position: "top-end",
            icon: "success",
            title: `Produto ${produto.nome} cadastrado com sucesso!`,
            showConfirmButton: false,
            timer: 5000
        })
    })
}

function limparModalProduto() {

    formModal.id.value = "";
    formModal.nome.value = "";
    formModal.valor.value = "";
    formModal.qtdEstoque.value = "";
    formModal.observacao.value = "";
    formModal.dataCadastro.value = "";
}

function editarProduto(id) {

    modoEdição = true;
    formModal.titulo.textContent = "Editar produto";

    // Encontra dentro do array o produto pelo seu id
    let produto = listaProduto.find(p => p.id == id);
    
    atualizaModalProduto(produto);

    modalProduto.show();
}

function atualizaModalProduto(produto) {
    formModal.id.value = produto.id;
    formModal.nome.value = produto.nome;
    formModal.valor.value = produto.valor;
    formModal.qtdEstoque.value = produto.qtdEstoque;
    formModal.observacao.value = produto.observacao;
    formModal.dataCadastro.value = produto.dataCadastro.substring(0,10); // pega somente a data
}

function excluirProduto(id) {

    let produto = listaProduto.find(produto => produto.id == id);

    if (confirm("Deseja realmente excluir o produto " + produto.nome)) {
        excluirProdutoNoBackend(id);
    }
}

function excluirProdutoNoBackend(id) {

    fetch(`${URL}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: obterToken()
        }
    })
   .then(() => {
        removerProdutoDaLista(id);
        popularTabela(listaProduto);
   })
}

function removerProdutoDaLista(id) {

    let indice = listaProduto.findIndex(produto => produto.id == id);

    listaProduto.splice(indice, 1);
}

function logout() {
    // Saindo do sistema removendo token, usuário e retornando para a tela de login
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.open("login.html", "_self");
}
