import axios from "axios";

let service = axios.create({
	baseURL: "http://localhost:3400",
});

// Vai ser utilizado em todas as requisições
service.interceptors.request.use((config) => {
	// Definindo o tipo de dados que estamos enviando
	config.headers["Content-Type"] = "application/json";
	// Adiciona o token de autorização
	config.headers.Authorization = localStorage.getItem("token");

	return config;
});

export default service;
