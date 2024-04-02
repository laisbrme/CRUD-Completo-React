import service from "./service";

// Create CRUD
function adicionar(cliente) {
	return new Promise((resolve, reject) => {
		service
			.post("/clientes", cliente)
			.then(response => resolve(response))
			.catch(erro => reject(erro));
	});
}

// Read CRUD
function obter() {
	return new Promise((resolve, reject) => {
		service
			.get("/clientes")
			.then(response => resolve(response))
			.catch(erro => reject(erro));
	});
}

// Update CRUD
function atualizar(cliente) {
	return new Promise((resolve, reject) => {
		service
			.put(`/clientes/${cliente.id}`, cliente)
			.then(response => resolve(response))
			.catch(erro => reject(erro));
	});
}

// Delete CRUD
function excluir(id) {
	return new Promise((resolve, reject) => {
		service
			.delete(`/clientes/${id}`)
			.then(response => resolve(response))
			.catch(erro => reject(erro));
	});
}

const clienteService = {
	adicionar,
	obter,
	atualizar,
	excluir,
};

export default clienteService;
