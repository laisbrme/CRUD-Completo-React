import "./index.css";
import client from "../../assets/client.png";
import product from "../../assets/product.png";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <>
			<div className="home-container">
				<div className="home-button">
					<button onClick={() => navigate("/produtos")}>
						<img src={client} alt="client icon" />
						<span>Cadastrar Produtos</span>
					</button>
				</div>
				<div className="home-button">
					<button onClick={() => navigate("/clientes")}>
						<img src={product} alt="product icon" />
						<span>Cadastrar Clientes</span>
					</button>
				</div>
			</div>
        </>
    );
}

export default Home;