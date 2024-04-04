import "./index.css";
import clienteService from "../../services/cliente-service";
import Swal from "sweetalert2";
import Cliente from "../../models/Cliente";

// HOOKs
import { useState, useEffect } from "react";

export default function Clientes() {
	const [clientes, setClientes] = useState([]);
	const [cliente, setCliente] = useState(new Cliente());
	const [modoEdicao, setModoEdicao] = useState(false);

	// Vai executar toda vez que a tela htmlFor carrergada
	useEffect(() => {
		clienteService
			.obter()
			.then((response) => {
				setClientes(response.data);
			})
			.catch((erro) => {
				// Fara algo em caso de erro
			});
	}, []);

	const editar = (e) => {
		setModoEdicao(true);
		let clienteParaEditar = clientes.find((c) => c.id == e.target.id);
		clienteParaEditar.dataCadastro = clienteParaEditar.dataCadastro.substring(
			0,
			10
		);
		setCliente(clienteParaEditar);
	};

	const excluirClienteNaLista = (cliente) => {
		let indice = clientes.findIndex((c) => c.id == cliente.id);
		clientes.splice(indice, 1);
		setClientes((arr) => [...arr]);
	};

	const excluir = (e) => {
		let clienteParaExcluir = clientes.find((c) => c.id == e.target.id);

		if (
			window.confirm(
				"Deseja realmente excluir o cliente " + clienteParaExcluir.nome
			)
		) {
			clienteService.excluir(clienteParaExcluir.id).then(() => {
				excluirClienteNaLista(clienteParaExcluir);
			});
		}
	};

	const salvar = () => {
		if (!cliente.email || !cliente.cpfOuCnpj) {
			Swal.fire({
				icon: "error",
				text: "E-mail e CPF são obrigatórios.",
			});

			return;
		}

		modoEdicao
			? atualizarClienteNoBackend(cliente)
			: adicionarClienteNoBackend(cliente);
	};

	const atualizarClienteNoBackend = (cliente) => {
		clienteService.atualizar(cliente).then((response) => {
			limparModal();

			Swal.fire({
				icon: "success",
				title: `Cliente ${cliente.nome}, foi atualizado com sucesso!`,
				showConfirmButton: false,
				timer: 3000,
			});

			let indice = clientes.findIndex((c) => c.id == cliente.id);
			clientes.splice(indice, 1, cliente);

			setClientes((lista) => [...lista]);
		});
	};

	const adicionar = () => {
		setModoEdicao(false);
		limparModal();
	};

	const limparModal = () => {
		// Limpar modal de cliente com react
		setCliente({
			...cliente,
			id: "",
			nome: "",
			cpfOuCnpj: "",
			telefone: "",
			dataCadastro: "",
			email: "",
		});
	};

	const adicionarClienteNoBackend = (cliente) => {
		clienteService.adicionar(cliente).then((response) => {
			setClientes((lista) => [...lista, new Cliente(response.data)]);

			limparModal();

			Swal.fire({
				icon: "success",
				title: `Cliente ${cliente.nome}, foi cadastrado com sucesso!`,
				showConfirmButton: false,
				timer: 3000,
			});
		});
	};

	return (
		<div className="container">
			{/* Titulo */}
			<div className="row">
				<div className="col-sm-12">
					<h4>Clientes</h4>
					<hr />
				</div>
			</div>

			{/* Botão para adicionar */}
			<div className="row">
				<div className="col-sm-3">
					<button
						onClick={adicionar}
						id="btn-adicionar"
						className="btn btn-success btn-sm "
						data-bs-toggle="modal"
						data-bs-target="#modal-cliente"
					>
						Adicionar
					</button>
				</div>
			</div>

			{/* Tabela */}
			<div className="row mt-3">
				<div className="col-sm-12 table-responsive-sm">
					<table className="table table-hover">
						<thead className="table-success">
							<tr>
								<th>Id</th>
								<th>Nome </th>
								<th>CPF </th>
								<th>E-mail </th>
								<th>Telefone </th>
								<th>Data de cadastro</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{clientes.map((cliente) => (
								<tr>
									<td>{cliente.id}</td>
									<td>{cliente.nome}</td>
									<td>{cliente.cpfOuCnpj}</td>
									<td>{cliente.email}</td>
									<td>{cliente.telefone}</td>
									<td>{new Date(cliente.dataCadastro).toLocaleDateString()}</td>
									<td>
										<button
											id={cliente.id}
											onClick={editar}
											className="btn btn-outline-success btn-sm mr-3"
											data-bs-toggle="modal"
											data-bs-target="#modal-cliente"
										>
											Editar
										</button>
										<button
											id={cliente.id}
											onClick={excluir}
											className="btn btn-outline-success btn-sm mr-3"
										>
											Excluir
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* The Modal */}
			<div className="modal" id="modal-cliente">
				<div className="modal-dialog">
					<div className="modal-content">

						{/* Modal Header */}
						<div className="modal-header">
							<h4 className="modal-title">
								{modoEdicao 
									? "Editar cliente" 
									: "Adicionar cliente"}
							</h4>
							<button type="button" className="btn-close"></button>
						</div>

						{/* Modal body */}
						<div className="modal-body">
							<div className="row">
								<div className="col-sm-2">
									<label htmlFor="id" className="form-label">
										Id
									</label>
									<input
										id="id"
										type="text"
										disabled
										className="form-control"
										value={cliente.id}
										onChange={(e) =>
											setCliente({ ...cliente, id: e.target.value })
										}
									/>
								</div>

								<div className="col-sm-10">
									<label htmlFor="nome" className="form-label">
										Nome
									</label>
									<input
										id="nome"
										type="text"
										className="form-control"
										value={cliente.nome}
										onChange={(e) =>
											setCliente({ ...cliente, nome: e.target.value })
										}
									/>
								</div>
							</div>

							<div className="row">
								<div className="col-sm-4">
									<label htmlFor="email" className="form-label">
										Email
									</label>
									<input
										id="email"
										type="text"
										className="form-control"
										value={cliente.email}
										onChange={(e) =>
											setCliente({ ...cliente, email: e.target.value })
										}
									/>
								</div>

								<div className="col-sm-2">
									<label htmlFor="telefone" className="form-label">
										Telefone
									</label>
									<input
										id="telefone"
										type="text"
										className="form-control"
										value={cliente.telefone}
										onChange={(e) =>
											setCliente({ ...cliente, telefone: e.target.value })
										}
									/>
								</div>

								<div className="col-sm-3">
									<label htmlFor="cpf" className="form-label">
										CPF
									</label>
									<input
										id="cpf"
										type="text"
										className="form-control"
										maxlength="14"
										value={cliente.cpfOuCnpj}
										onChange={(e) =>
											setCliente({ ...cliente, cpfOuCnpj: e.target.value })
										}
									/>
								</div>

								<div className="col-sm-3">
									<label htmlFor="dataCadastro" className="form-label">
										Data de Cadastro
									</label>
									<input
										id="dataCadastro"
										type="date"
										className="form-control"
										value={cliente.dataCadastro}
										onChange={(e) =>
											setCliente({ ...cliente, dataCadastro: e.target.value })
										}
									/>
								</div>
							</div>
						</div>

						{/* Modal footer */}
						<div className="modal-footer">
							<button
								onClick={salvar}
								id="btn-salvar"
								type="button"
								className="btn btn-success btn-sm"
							>
								Salvar
							</button>
							<button
								id="btn-cancelar"
								type="button"
								className="btn btn-light btn-sm"
								data-bs-dismiss="modal"
							>
								Cancelar
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
