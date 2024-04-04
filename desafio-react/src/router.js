import Home from "./pages/home";
import Clientes from "./pages/clientes";
import Produtos from "./pages/produtos";
import Login from "./pages/login";
import EsqueciMinhaSenha from "./pages/esqueci-minha-senha";

import Menu from "./components/menu";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Router() {
	return (
		<BrowserRouter>
			{/* Menu personalizado */}
			<Menu />
			<Routes>
				<Route path="/home" element={<Home />} />
				<Route path="/clientes" element={<Clientes />} />
				<Route path="/produtos" element={<Produtos />} />
				<Route path="/" element={<Login />} />
				<Route path="/esqueci-minha-senha" element={<EsqueciMinhaSenha />} />
			</Routes>
		</BrowserRouter>
	);
}
