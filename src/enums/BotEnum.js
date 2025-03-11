const BotEnum = {
    START: '🐦‍🔥 Sou GasTail Bot para controle financeiro.\n\n🐦‍🔥 Como posso te ajudar hoje?',
    FOOTER_START: '\nDigite o número correspondente a opção desejada:\n',
    SALDO: 'Seu saldo atual é de R$ ',
    RESET_DATA_SUCCESS: 'Dados resetados com sucesso!',
    TIPO_MENSAGEM_INVALIDA: '🚫 Mensagem inválida. Tente novamente.',
    // MENU OPTIONS
    MENU_1: '\n💰  1  Saldo',
    MENU_2: '🤑  2  Registrar Crédito\n',
    MENU_3: '💸  x  Registrar Gasto\n',
    MENU_4: '🕑  x  Histórico de Transações\n',
    MENU_5: '🪙  5  Câmbio\n',
    MENU_6: '💡  x  Ajuda\n',
    COMANDO_INVALIDO: '🚫 Comando inválido. Tente novamente.',
    MENU_INVALIDO: '🚫 Opção inválida. Tente novamente.',
    // INTRUÇÕES
    MENU_2_INSTRUCOES: '🐦‍🔥 Para registrar uma entrada de saldo, digite o comando /cred seguido do título somando com o valor.\n\nExemplos:\n/cred Salário + 1000\n/cred Venda de camisa + 299,99\n' + '/cred Mesada + 499.90',
    MENU_3_INSTRUCOES: '🐦‍🔥💸 Para registrar uma saída de saldo, digite o comando /deb , um título (opcional) somando com o valor.\nExemplo: /deb Mercado - 100',
}

module.exports = BotEnum;