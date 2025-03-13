const Utils = {
    formataBRL: (valor) => {
        valor = valor.toFixed(2);
        let valorString = valor.toString();
        if (valorString.includes('.')) {
            valorString = valorString.replace('.', ',');
        }
        return `R$ ${valorString}`;
    },
    openBotUrl: () => {
        window.open('https://t.me/GasTail_bot', '_blank');
    }
}

export default Utils;
