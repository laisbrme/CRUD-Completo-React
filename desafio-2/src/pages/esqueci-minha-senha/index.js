import "./index.css";
import Swal from "sweetalert2";


export default function EsqueciMinhaSenha() {
	const email = "admin@admin.com";

	const senhaReset = () => {
		if (!email) {
			Swal.fire({
				icon: "error",
				text: "Os campos de e-mail e senha são obrigatórios",
			});
		}
		Swal.fire({
			icon: "success",
			text: "Verifique sua caixa de entrada e sigas as instruções para a recuperação!",
		});
	};

	return (
		<>
			<div className="caixa-recuperacao">
				<div className="container mt-3">
					<h1 className="titulo">Redefinir senha</h1>
					<p className="txt1">
						Podemos ajudar a redefinir sua senha. Primeiro, informe o endereço
						de e-mail cadastrado e lhe enviarmos um link com as instruções.{" "}
					</p>
				</div>

				<form>
					<div className="mb-3 mt-3">
						<input
							type="email"
							className="form-control"
							id="email"
							placeholder="Digite seu e-mail"
							name="email"
						/>
					</div>

					<div className="btn-enviar">
						<button id="btn-enviar" onClick={senhaReset}>
							Enviar
						</button>
					</div>
				</form>

				<div className="retornar-login">
					<a href="/" target="_self">
						Retornar ao login
					</a>
				</div>
			</div>
		</>
	);
}
