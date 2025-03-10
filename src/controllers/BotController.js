const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const axios = require('axios');
const BotEnum = require('../enums/BotEnum');

dotenv.config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const BOT_BACKEND_URL = process.env.BOT_BACKEND_URL;
const greetings = '/menu\n' + 
    (new Date().getHours() < 6 ? '🌙 Boa madrugada, ' : 
    new Date().getHours() < 12 ? '☀️ Bom dia, ' : 
    new Date().getHours() < 18 ? '🌇 Boa tarde, ' : 
    '🌃 Boa noite, ');


const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });

let username = ''

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

        if (!reqData || !reqData.message) {
            return res.status(400).json({ error: 'Mensagem não recebida corretamente' });
        }

        try {
            const { message } = reqData;
            const chatId = message.chat.id;
            username = message.chat.first_name ? message.chat.first_name : 'Usuário';
            if (message.text.startsWith('/')) {
                await UsingBot.fluxo_comando(chatId, message.text);
            } else await UsingBot.fluxo_menu(chatId, message.text);

            return res.json({ status: 'ok' });
        } catch (error) {
            console.error('Erro ao processar o webhook:', error);
            return res.status(400).json({ error: 'Erro no processamento do webhook', message: error.message });
        }
    }
}

const UsingBot = {
    fluxo_comando: async (chatId, text) => {
        const comando = text.split(" ")[0]; // Pega apenas a primeira palavra
        console.log('Comando:', comando);
        switch(comando) {
            case '/start':
                await BotController.sendMessage(chatId, '\n' + greetings + username + '!\n' + BotEnum.START + '\n' + BotEnum.MENU_1 + BotEnum.MENU_2 + BotEnum.MENU_3 + BotEnum.MENU_4 + BotEnum.MENU_5 + '\n' + BotEnum.FOOTER_START);
                break;
            case '/menu':
                await BotController.sendMessage(chatId, '\n' + greetings + username + '!\n' + BotEnum.START + '\n' + BotEnum.MENU_1 + BotEnum.MENU_2 + BotEnum.MENU_3 + BotEnum.MENU_4 + BotEnum.MENU_5 + '\n' + BotEnum.FOOTER_START);
                break;
            case '/cred':
                await BotController.sendMessage(chatId, "Você usou o comando /cred");
                break;
            default:
                await BotController.sendMessage(chatId, BotEnum.COMANDO_INVALIDO);
                break;
        }
    },
    fluxo_menu: async (chatId, text) => {
        switch(text) {
            case '1':
                await BotController.sendMessage(chatId, BotEnum.MENU_1);
                break;
            case '2':
                await BotController.sendMessage(chatId, BotEnum.MENU_2);
                break;
            case '3':
                await BotController.sendMessage(chatId, BotEnum.MENU_3);
                break;
            case '4':
                await BotController.sendMessage(chatId, BotEnum.MENU_4);
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
    
                    await BotController.sendMessage(chatId, message);
                } catch (error) {
                    console.error('Erro ao buscar cotações:', error);
                    await BotController.sendMessage(chatId, "Erro ao buscar cotações. Tente novamente mais tarde.");
                }
                break;
            default:
                await BotController.sendMessage(chatId, BotEnum.MENU_INVALIDO);
                break;
        }
    }
}

module.exports = BotController;
