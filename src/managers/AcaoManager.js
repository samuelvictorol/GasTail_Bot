const { Usuario: UsuarioModel } = require("../models/Usuario");
const { Acao: AcaoModel } = require("../models/Acao");

const AcaoManager = {
    criar_acao: async (username, commandObj) => {
        const usuario = await UsuarioModel.findOne({ username: username })
        const acao = new AcaoModel({
            tipo: commandObj.tipo.includes('cred') ? '🟢 Crédito' : '🔴 Débito',
            titulo: commandObj.titulo,
            valor: commandObj.valor,
            descricao: '',
        });
        await acao.save();
        usuario.saldo = commandObj.tipo.includes('cred') ? usuario.saldo + commandObj.valor : usuario.saldo - commandObj.valor;
        usuario.acoes.push(acao._id);
        await usuario.save();
        return usuario.saldo;
    }
}

module.exports = AcaoManager;