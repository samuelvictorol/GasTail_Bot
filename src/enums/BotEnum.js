const BotEnum = {
    START: '🐦‍🔥 Sou GasTail Bot para controle financeiro.\n\nComo posso te ajudar hoje?\n',
    FOOTER_START: '\n🐦‍🔥 Digite o número correspondente a opção desejada:\n',
    SALDO: '💰 Saldo Atual: R$ ',
    RESET_DATA_SUCCESS: 'Dados resetados com sucesso!',
    TIPO_MENSAGEM_INVALIDA: '🚫 Mensagem inválida. Tente novamente.',
    // MENU OPTIONS
    MENU_0: '\n🌐  0  Meu Perfil',
    MENU_1: '💰  1  Saldo',
    MENU_2: '🤑  2  Registrar Crédito\n',
    MENU_3: '💸  3  Registrar Gasto\n',
    MENU_4: '🕑  x  Histórico de Transações\n',
    MENU_5: '🪙  5  Câmbio\n',
    MENU_6: '💡  6  Ajuda\n',
    COMANDO_INVALIDO: '🚫 Comando inválido. Tente novamente.',
    MENU_INVALIDO: '🚫 Opção inválida. Tente novamente.',
    // INTRUÇÕES
    MENU_0_INSTRUCOES: '🐦‍🔥 Em desenvolvimento, acesse uma prévia da sua página de perfil em: https://gastail.netlify.app',
    MENU_1_INSTRUCOES: '🐦‍🔥 Para realizar um investimento com seu saldo disponível, digite /invest Titulo = Valor\n\nExemplo:\n/invest CDB Diário = 400\n/invest Bitcoin = 499,99\n/invest Fundos Imobiliários = 39.90',
    MENU_2_INSTRUCOES: '🐦‍🔥 Para registrar uma entrada de saldo, digite o comando /cred seguido do título somando com o valor desejado.\n\nExemplos:\n/cred Salário + 1000\n/cred Venda de camisa + 299,99\n' + '/cred Mesada + 499.90',
    MENU_3_INSTRUCOES: '🐦‍🔥 Para registrar uma saída de saldo (gasto), digite o comando /deb seguido do titulo subtraindo o valor desejado.\n\nExemplos:\n/deb IPVA - 2000\n/deb Mensalidade Academia - 99,99\n' + '/deb Energia - 41.32',
    MENU_6_INSTRUCOES: '/ajuda\n🐦‍🔥 O Gastail é um bot para telegram para fazer anotações rápidas de entradas e gastos de modo interativo a fim de criar o hábito do controle financeiro pessoal anotando as dispesas e investimentos com o bot.\n\n🐦‍🔥 Para mais funcionalidades acesse sua página de perfil\n',
    REFERENCIA: '\n🐦👨🏼‍💻 Criado por: Samuel Victor\n🐈‍⬛ Open Source:\ngithub.com/samuelvictorol/GasTail_Bot\n🐦‍🔥 GasTail, Seu Bot para Controle Financeiro.',
}

module.exports = BotEnum;