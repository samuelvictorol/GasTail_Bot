const BotEnum = {
    START: '🐦‍🔥 Sou GasTail Bot para controle financeiro.\n\n🐦‍🔥 Como posso te ajudar hoje?',
    FOOTER_START: '\nDigite o número correspondente a opção desejada:\n',
    SALDO: '💰 Seu saldo atual é de R$ ',
    RESET_DATA_SUCCESS: 'Dados resetados com sucesso!',
    TIPO_MENSAGEM_INVALIDA: '🚫 Mensagem inválida. Tente novamente.',
    // MENU OPTIONS
    MENU_1: '\n💰  1  Saldo',
    MENU_2: '🤑  2  Registrar Crédito\n',
    MENU_3: '💸  3  Registrar Gasto\n',
    MENU_4: '🕑  x  Histórico de Transações\n',
    MENU_5: '🪙  5  Câmbio\n',
    MENU_6: '💡  x  Ajuda\n',
    COMANDO_INVALIDO: '🚫 Comando inválido. Tente novamente.',
    MENU_INVALIDO: '🚫 Opção inválida. Tente novamente.',
    // INTRUÇÕES
    MENU_1_INSTRUCOES: '🐦‍🔥 Para realizar um investimento com seu saldo disponível, digite /invest Titulo + Valor\nExemplo:\n/invest CDB Diário + 400\n/invest Bitcoin + 499,99\n/invest Fundos Imobiliários + 39.90',
    MENU_2_INSTRUCOES: '🐦‍🔥 Para registrar uma entrada de saldo, digite o comando /cred seguido do título somando com o valor desejado.\n\nExemplos:\n/cred Salário + 1000\n/cred Venda de camisa + 299,99\n' + '/cred Mesada + 499.90',
    MENU_3_INSTRUCOES: '🐦‍🔥 Para registrar uma saída de saldo (gasto), digite o comando /deb seguido do titulo subtraindo o valor desejado.\n\nExemplos:\n/deb IPVA - 2000\n/deb Mensalidade Academia - 99,99\n' + '/deb Energia - 41.32'
}

module.exports = BotEnum;