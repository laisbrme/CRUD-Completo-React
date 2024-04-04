export default class Cliente {
    constructor(obj) {
        obj = obj || {}; // Tratamento para evitar undefined quando acessar alguma propriedade
        this.id = obj.id;
        this.nome = obj.nome;
        this.cpfOuCnpj = obj.cpfOuCnpj;
        this.email = obj.email;
        this.telefone = obj.telefone;
        this.dataCadastro = obj.dataCadastro;
    }

    validar() {
        //return (!this.nome || !this.qtdEstoque) ? false : true;
        return !!(this.email && this.cpfOuCnpj);
    }
}
