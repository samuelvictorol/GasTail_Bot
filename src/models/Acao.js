const mongoose = require('mongoose');

const { Schema } = mongoose;

const acaoSchema = new Schema({
    tipo: {
        type: String,
        required: true,
    },
    valor: {
        type: Number,
        required: true,
        default: 0, // Define um valor padrão caso não seja informado
    },
    titulo: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
    }
}, { timestamps: true });

const Acao = mongoose.model('Acao', acaoSchema);

module.exports = {
    Acao,
    acaoSchema,
};
