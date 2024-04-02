import service from "./service";

// Create CRUD
function adicionar(produto) {
	return new Promise((resolve, reject) => {
		service
			.post("/produtos", produto)
			.then(response => resolve(response))
			.catch(erro => reject(erro));
	});
}

// Read CRUD
function obter() {
	return new Promise((resolve, reject) => {
		service
			.get("/produtos")
			.then(response => resolve(response))
			.catch(erro => reject(erro));
	});
}

// Update CRUD
function atualizar(produto) {
	return new Promise((resolve, reject) => {
		service
			.put(`/produtos/${produto.id}`, produto)
			.then(response => resolve(response))
			.catch(erro => reject(erro));
	});
}

// Delete CRUD
function excluir(id) {
	return new Promise((resolve, reject) => {
		service
			.delete(`/produtos/${id}`)
			.then(response => resolve(response))
			.catch(erro => reject(erro));
	});
}

const produtoService = {
	adicionar,
	obter,
	atualizar,
	excluir,
};

export default produtoService;
