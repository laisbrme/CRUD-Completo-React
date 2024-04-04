import "./index.css";
import produtoService from "../../services/produto-service";
import Produto from "../../models/Produto";
import Swal from "sweetalert2";

// HOOKs
import { useEffect, useState } from "react";

export default function Produtos() {
	const [produtos, setProdutos] = useState([]);
	const [produto, setProduto] = useState(new Produto());
	const [modoEdicao, setModoEdicao] = useState(false);

	// Executa sempre que a tela for carregada
	useEffect(() => {
		produtoService
			.obter()
			.then((response) => {
				setProdutos(response.data);
			})
			.catch((erro) => {
				// Fara algo em caso de erro
			});
	}, []);

	const editar = (e) => {
		setModoEdicao(true);
		let produtoParaEditar = produtos.find((p) => p.id == e.target.id);
		produtoParaEditar.dataCadastro = produtoParaEditar.dataCadastro.substring(
			0,
			10
		);
		setProduto(produtoParaEditar);
	};

	const excluirProdutoNaLista = (produto) => {
		let indice = produtos.findIndex((p) => p.id == produto.id);
		produtos.splice(indice, 1);
		setProdutos((arr) => [...arr]);
	};

	const excluir = (e) => {
		let produtoParaExcluir = produtos.find((p) => p.id == e.target.id);

		if (
			window.confirm(
				"Deseja realmente excluir o produto " + produtoParaExcluir.nome
			)
		) {
			produtoService.excluir(produtoParaExcluir.id).then(() => {
				excluirProdutoNaLista(produtoParaExcluir);
			});
		}
	};
	const salvar = () => {
		if (!produto.nome || !produto.qtdEstoque) {
			Swal.fire({
				icon: "error",
				text: "Nome e Quantidade são obrigatórios!",
			});

			return;
		}

		modoEdicao
			? atualizarProdutoNoBackend(produto)
			: adicionarProdutoNoBackend(produto);
	};

	const atualizarProdutoNoBackend = (produto) => {
		produtoService.atualizar(produto).then((response) => {
			limparModal();

			Swal.fire({
				icon: "success",
				title: `Produto ${produto.nome}, foi atualizado com sucesso!`,
				showConfirmButton: false,
				timer: 3000,
			});

			let indice = produtos.findIndex((c) => c.id == produto.id);
			produtos.splice(indice, 1, produto);

			setProduto((lista) => [...lista]);
		});
	};

	const adicionar = () => {
		setModoEdicao(false);
		limparModal();
	};

	const limparModal = () => {
		// Limpar modal de cliente com react
		setProduto({
			...produto,
			id: "",
			nome: "",
			valor: "",
			qtdEstoque: "",
			observacao: "",
			dataCadastro: "",
		});
	};

	const adicionarProdutoNoBackend = (produto) => {
		produtoService.adicionar(produto).then((response) => {
			setProdutos((lista) => [...lista, new Produto(response.data)]);

			limparModal();

			Swal.fire({
				icon: "success",
				title: `Produto ${produto.nome} foi adicionado com sucesso!`,
				showConfirmButton: false,
				timer: 3000,
			});
		});
	};

	return (
		<div className="container">
			{/* <!-- Titulo --> */}
			<div className="row">
				<div className="col-sm-12">
					<h4>Produtos</h4>
					<hr />
				</div>
			</div>

			{/* <!-- Botão para adicionar --> */}
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

			{/* <!-- Tabela --> */}
			<div className="row mt-3">
				<div className="col-sm-12 table-responsive-sm">
					<table className="table table-hover">
						<thead className="table-success">
							<tr>
								<th>Id</th>
								<th>Nome </th>
								<th>Valor</th>
								<th>Quantidade Estoque</th>
								<th>Observação</th>
								<th>Data de cadastro</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{produtos.map((produto) => (
								<tr>
									<td>{produto.id}</td>
									<td>{produto.nome}</td>
									<td>{produto.valor}</td>
									<td>{produto.qtdEstoque}</td>
									<td>{produto.observacao}</td>
									<td>{new Date(produto.dataCadastro).toLocaleDateString()}</td>
									<td>
										<button
											id={produto.id}
											onClick={editar}
											className="btn btn-outline-success btn-sm mr-3"
											data-bs-toggle="modal"
											data-bs-target="#modal-cliente"
										>
											Editar
										</button>
										<button
											id={produto.id}
											className="btn btn-outline-success btn-sm mr-3"
											onClick={excluir}
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

			{/* <!-- The Modal --> */}
			<div className="modal" id="modal-produto">
				<div className="modal-dialog">
					<div className="modal-content">

						{/* <!-- Modal Header --> */}
						<div className="modal-header">
							<h4 className="modal-title">
								{modoEdicao 
									? "Editar produto" 
									: "Adicionar produto"}
							</h4>
							<button type="button" className="btn-close"></button>
						</div>

						{/* <!-- Modal body --> */}
						<div className="modal-body">
							<div className="row">
								<div className="col-sm-4">
									<label htmlFor="id" className="form-label">
										Id
									</label>
									<input
										id="id"
										type="text"
										disabled
										className="form-control"
										value={produto.id}
										onChange={(e) =>
											setProduto({ ...produto, id: e.target.value })
										}
									/>
								</div>

								<div className="col-sm-8">
									<label htmlFor="nome" className="form-label">
										Nome
									</label>
									<input
										id="nome"
										type="text"
										className="form-control"
										value={produto.nome}
										onChange={(e) =>
											setProduto({ ...produto, nome: e.target.value })
										}
									/>
								</div>
							</div>

							<div className="row">
								<div className="col-sm-4">
									<label htmlFor="valor" className="form-label">
										Valor
									</label>
									<input
										id="valor"
										type="text"
										className="form-control"
										value={produto.valor}
										onChange={(e) =>
											setProduto({ ...produto, valor: e.target.value })
										}
									/>
								</div>

								<div className="col-sm-4">
									<label htmlFor="qtdEstoque" className="form-label">
										Quantidade Estoque
									</label>
									<input
										id="qtdEstoque"
										type="text"
										className="form-control"
										value={produto.qtdEstoque}
										onChange={(e) =>
											setProduto({ ...produto, qtdEstoque: e.target.value })
										}
									/>
								</div>

								<div className="col-sm-4">
									<label htmlFor="dataCadastro" className="form-label">
										Data de Cadastro
									</label>
									<input
										id="dataCadastro"
										type="date"
										className="form-control"
										value={produto.dataCadastro}
										onChange={(e) =>
											setProduto({ ...produto, dataCadastro: e.target.value })
										}
									/>
								</div>
							</div>

							<div className="row">
								<div className="col-sm-12">
									<label htmlFor="observacao" className="form-label">
										Observação
									</label>
									<input
										id="observacao"
										type="text"
										className="form-control"
										value={produto.observacao}
										onChange={(e) =>
											setProduto({ ...produto, observacao: e.target.value })
										}
									/>
								</div>
							</div>
						</div>

						{/* <!-- Modal footer --> */}
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
