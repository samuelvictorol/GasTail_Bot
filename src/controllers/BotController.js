const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const axios = require('axios');
const BotEnum = require('../enums/BotEnum');
const UsuarioManager = require('../managers/UsuarioManager');
const Utils = require('../Utils');
const AcaoManager = require('../managers/AcaoManager');

dotenv.config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const BOT_BACKEND_URL = process.env.BOT_BACKEND_URL;
const getGreeting = () => {
    const hour = new Date().getHours();
    let greeting;

    if (hour < 6) {
        greeting = '🐦‍🔥🌙  Boa madrugada, ';
    } else if (hour < 12) {
        greeting = '🐦‍🔥☀️  Bom dia, ';
    } else if (hour < 18) {
        greeting = '🐦‍🔥🌇  Boa tarde, ';
    } else {
        greeting = '🐦‍🔥🌃  Boa noite, ';
    }

    return `/menu\n${greeting}`;
};

const greetings = getGreeting();

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });

let nome_usuario = ''

const BotController = {
    setWebhook: async () => {
        const webhookUrl = `${BOT_BACKEND_URL}/${TELEGRAM_BOT_TOKEN}`;
        try {
            const response = await axios.get(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook?url=${webhookUrl}`);
            if (response.status === 200) {
                console.log('Webhook configurado com sucesso!');
            } else {
                console.error(`Erro ao configurar o webhook: ${response.status}`);
            }
        } catch (error) {
            console.error('Erro ao configurar o webhook:', error);
        }
    },

    sendMessage: async (chatId, text) => {
        try {
            const response = await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                chat_id: chatId,
                text: text
            });
            if (response.status !== 200) {
                console.error(`Erro ao enviar mensagem: ${response.status} - ${response.data}`);
            } else {
                console.log(`✉️ Mensagem enviada para o chat_id ${chatId}`);
            }
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
        }
    },

    webhook: async (req, res) => {
        const reqData = req.body;
        // console.log('Dados recebidos:', JSON.stringify(reqData));

        if(!reqData) return res.status(400).json({ error: 'Mensagem não recebida corretamente' });
        if( reqData && reqData.edited_message ) return res.status(200).json({ status: 'ok' });
        else if (reqData && !reqData.message) {
            return res.status(400).json({ error: 'Mensagem não recebida corretamente' });
        }

        try {
            const message = reqData.message ? reqData.message : reqData.edited_message;
            const chat = message.chat;
            nome_usuario = message.chat.first_name ? message.chat.first_name : 'Usuário';
            // evita que o bot "engasgue" caso receba um tipo como imagem ou diferente de string do usuario
            if(!message || !message.text) {
                await BotController.sendMessage(chat.id, BotEnum.TIPO_MENSAGEM_INVALIDA);
                return res.json({ status: 'ok' });
            }
            if (message.text.startsWith('/')) {
                await BotManager.fluxo_comando(chat, message.text);
            } else await BotManager.fluxo_menu(chat, message.text);

            return res.json({ status: 'ok' });
        } catch (error) {
            console.error('Erro ao processar o webhook:', error);
            return res.status(400).json({ error: 'Erro no processamento do webhook', message: error.message });
        }
    }
}

const BotManager = {
    fluxo_comando: async (chat, text) => {
        const comando = text.split(" ")[0]; // Pega apenas a primeira palavra
        console.log('Comando:', comando);
        switch(comando) {
            case '/start':
                await BotController.sendMessage(chat.id,  greetings + nome_usuario + '!\n\n🐦‍🔥 Seja bem vindo(a),\n' 
                    + BotEnum.START + BotEnum.MENU_0 + '\n' + BotEnum.MENU_1 + '\n' + BotEnum.MENU_2 + BotEnum.MENU_3 + BotEnum.MENU_4 + BotEnum.MENU_5  + BotEnum.MENU_6 + '\n' + BotEnum.FOOTER_START);
                break;
            case '/menu':
                await BotController.sendMessage(chat.id, '\n' + greetings + nome_usuario + 
                    '!\n' + BotEnum.START + BotEnum.MENU_0 + '\n' + BotEnum.MENU_1 + '\n' + BotEnum.MENU_2 + BotEnum.MENU_3 + BotEnum.MENU_4 + BotEnum.MENU_5 + BotEnum.MENU_6 + '\n' + BotEnum.FOOTER_START);
                break;
            case '/saldo':
                const usuario = await UsuarioManager.criar_usuario(chat)
                .catch((error) => {
                    console.error('Erro ao criar usuário:', error);
                    return null;
                });
                await BotController.sendMessage(chat.id, '/saldo\n' + BotEnum.SALDO + Utils.formataParaReal(usuario.saldo) + (usuario.saldo <= 0 ? '' : ('\n\n' + BotEnum.MENU_1_INSTRUCOES)));
                break;
            case '/invest':
                await BotController.sendMessage(chat.id, '🏗️ Em desenvolvimento\n' + BotEnum.MENU_1_INSTRUCOES);
                break;
            case '/cred':
                const credCommandObj = Utils.criaObjetoComandoCred(text);
                if (credCommandObj.error) {
                    await BotController.sendMessage(chat.id, credCommandObj.error);
                } else {
                    await AcaoManager.criar_acao_entrada(chat.username ? chat.username : chat.id, credCommandObj)
                    .then(async (saldo) => {
                        await BotController.sendMessage(chat.id, '✅📈 Entrada de Crédito registrada com sucesso!\n\n🐦‍🔥 ' + BotEnum.SALDO + Utils.formataParaReal(saldo));
                    })
                    .catch((error) => {
                        console.error('Erro ao registrar crédito:', error);
                        return null;
                    });
                }
                break;
            case '/deb':
                const debCommandObj = Utils.criaObjetoComandoDeb(text);
                if (debCommandObj.error) {
                    await BotController.sendMessage(chat.id, debCommandObj.error);
                } else {
                    await AcaoManager.criar_acao_gasto(chat.username ? chat.username : chat.id, debCommandObj)
                    .then(async (saldo) => {
                        await BotController.sendMessage(chat.id, '✅📉  Gasto registrado com sucesso!\n\n🐦‍🔥 ' + BotEnum.SALDO + Utils.formataParaReal(saldo));
                    })
                    .catch((error) => {
                        console.error('Erro ao registrar débito:', error);
                        return null;
                    });
                }
                break;
            case '/ajuda':
                await BotController.sendMessage(chat.id, BotEnum.MENU_6_INSTRUCOES + BotEnum.REFERENCIA);
                break;
            default:
                await BotController.sendMessage(chat.id, BotEnum.COMANDO_INVALIDO);
                break;
        }
    },
    fluxo_menu: async (chat, text) => {
        switch(text) {
            case '0':
                await BotController.sendMessage(chat.id, BotEnum.MENU_0_INSTRUCOES);
                break;
            case '1':
                const usuario = await UsuarioManager.criar_usuario(chat)
                .catch((error) => {
                    console.error('Erro ao criar usuário:', error);
                    return null;
                });
                await BotController.sendMessage(chat.id, '/saldo\n' + BotEnum.SALDO + Utils.formataParaReal(usuario.saldo) + (usuario.saldo <= 0 ? '' : ('\n\n' + BotEnum.MENU_1_INSTRUCOES)));
                break;
            case '2':
                await BotController.sendMessage(chat.id,  BotEnum.MENU_2_INSTRUCOES);
                break;
            case '3':
                await BotController.sendMessage(chat.id, BotEnum.MENU_3_INSTRUCOES);
                break;
            case '4':
                await BotController.sendMessage(chat.id, BotEnum.MENU_4);
                break;
            case '5':
                try {
                    const btcEthResponse = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=brl');
                    const dolarResponse = await axios.get('https://economia.awesomeapi.com.br/json/last/USD-BRL');
    
                    const bitcoinPrice = btcEthResponse.data.bitcoin.brl;
                    const ethereumPrice = btcEthResponse.data.ethereum.brl;
                    const dolarPrice = dolarResponse.data.USDBRL.bid;
    
                    const fontes = 'Fontes: CoinGecko e AwesomeAPI';
                    const truncarDuasCasas = (valor) => Math.floor(valor * 100) / 100;
    
                    const message = `Cotação Atual\n\n`
                        + `🪙 Bitcoin: R$ ${truncarDuasCasas(bitcoinPrice).toFixed(2).replace('.', ',')}\n`
                        + `💎 Ethereum: R$ ${truncarDuasCasas(ethereumPrice).toFixed(2).replace('.', ',')}\n`
                        + `💵 Dólar: R$ ${truncarDuasCasas(parseFloat(dolarPrice) || 0).toFixed(2).replace('.', ',')}\n\n`
                        + `${fontes}`;
    
                    await BotController.sendMessage(chat.id, message);
                } catch (error) {
                    console.error('Erro ao buscar cotações:', error);
                    await BotController.sendMessage(chat.id, "Erro ao buscar cotações. Tente novamente mais tarde.");
                }
                break;
            case '6':
                await BotController.sendMessage(chat.id, BotEnum.MENU_6_INSTRUCOES + BotEnum.REFERENCIA);
                break;
            default:
                await BotController.sendMessage(chat.id, BotEnum.MENU_INVALIDO);
                break;
        }
    }
}

module.exports = BotController;
