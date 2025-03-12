
const Utils = {
    formataParaReal: (valor) => {
        return parseFloat(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },
    criaObjetoComandoCred: (command) => {
        const regex = /^\/cred\s+(.+)\s+\+\s*([\d,.]+)$/;
        const match = command.match(regex);
    
        if (!match) {
            return { error: "🐦‍🔥 Formato inválido. Use: /cred Título + Valor" };
        }
    
        const titulo = match[1].trim();
        let valor = match[2].replace(',', '.'); // Substitui vírgula decimal por ponto
    
        if (isNaN(valor)) {
            return { error: "🐦‍🔥 O valor informado não é um número válido." };
        }
    
        valor = parseFloat(parseFloat(valor).toFixed(2)); // Converte para número com 2 casas decimais
    
        return {
            tipo: '/cred',
            titulo,
            valor
        }
    },
    criaObjetoComandoDeb: (command) => {
        const regex = /^\/deb\s+(.+)\s+\-\s*([\d,.]+)$/;
        const match = command.match(regex);
    
        if (!match) {
            return { error: " 🐦‍🔥 Formato inválido. Use: /deb Título - Valor" };
        }
    
        const titulo = match[1].trim();
        let valor = match[2].replace(',', '.'); // Substitui vírgula decimal por ponto
    
        if (isNaN(valor)) {
            return { error: "O valor informado não é um número válido." };
        }
    
        valor = parseFloat(parseFloat(valor).toFixed(2)); // Converte para número com 2 casas decimais
    
        return {
            tipo: '/deb',
            titulo,
            valor
        }
    }
}

module.exports = Utils;