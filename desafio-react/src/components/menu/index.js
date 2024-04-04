import "./index.css";
import { Link, useLocation } from "react-router-dom";
import exportedObject from "../../services/usuario-service";

export default function Menu() {
	const logout = () => {
		exportedObject.sairDoSistema();
	};

	if (useLocation().pathname !== "/") {
		return (
			<div>
				<ul className="menu">
					<li>
						<Link to="/home">Home</Link>
					</li>
					<li>
						<Link to="/clientes">Clientes</Link>
					</li>
					<li>
						<Link to="/produtos">Produtos</Link>
					</li>
					<li>
						<Link onClick={logout}>Sair</Link>
					</li>
				</ul>
			</div>
		);
	} else {
		return null;
	}
}
