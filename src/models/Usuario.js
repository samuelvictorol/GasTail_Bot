const mongoose = require('mongoose');

const { Schema } = mongoose;

const usuarioSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        sparse: true, // Permite valores nulos sem quebrar a unicidade
    },
    saldo: {
        type: Number,
        default: 0, // Define o saldo inicial como zero
    },
    token: {
        type: String,
        required: true,
    },
    chat_id: {
        type: String,
        required: true,
    },
    acoes_ids: [{
        type: mongoose.Schema.Types.ObjectId, // Referência para ações no banco
        ref: 'Acao',
    }]
}, { timestamps: true });

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = {
    Usuario,
    usuarioSchema,
};
