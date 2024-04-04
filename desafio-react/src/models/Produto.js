export default class Produto {
    constructor(obj) {
        obj = obj || {}; // Tratamento para evitar undefined quando acessar alguma propriedade
        this.id = obj.id;
        this.nome = obj.nome;
        this.valor = obj.valor;
        this.qtdEstoque = obj.qtdEstoque;
        this.observacao = obj.observacao;
        this.dataCadastro = obj.dataCadastro;
    }

    validar() {
        //return (!this.nome || !this.qtdEstoque) ? false : true;
        return !!(this.nome && this.qtdEstoque);
    }
}
