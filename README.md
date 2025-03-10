# 🐦‍🔥 GasTail Bot - [Acesse Aqui](https://t.me/GasTail_bot) 

## Board do Projeto
> [Visualizar](https://whimsical.com/gastail-bot-C5Pf2PrrrYgAQMaoXXVUEg)

[![image](https://github.com/user-attachments/assets/bd167cfd-7446-43c5-9320-5c1404098c69)](https://whimsical.com/gastail-bot-C5Pf2PrrrYgAQMaoXXVUEg)

<br>

# Rodar o projeto com Docker
- [ ] Docker instalado e rodando na máquina.
- [ ] NGROK instalado e com arquivo ngrok.exe na raíz do projeto.
- [ ] rode o ngrok com o comando ngrok http 5000, copie a url forwarding e coloque na variavel de ambiente BOT_BACKEND_URL
- [ ] docker build -t gastail-bot .
- [ ] docker run -p 5000:5000 gastail-bot

## Variáveis de Ambiente
 > Crie um arquivo .env na raíz do projeto e preencha as configurações de ambiente:
<br>

 - TELEGRAM_BOT_TOKEN
 - BOT_BACKEND_URL
 - CONNECTION_STRING (mongodb)
 - PORT (5000 padrão)

## Exemplo de JSON retornado no webhook telegram

> "Dados recebidos":

```json
{
  "update_id": 218021779,
  "message": {
    "message_id": 121,
    "from": {
      "id": 1331214492,
      "is_bot": false,
      "first_name": "Samuel Victor",
      "username": "Samvctr",
      "language_code": "pt-br"
    },
    "chat": {
      "id": 1331314492,
      "first_name": "Samuel Victor",
      "username": "Samvctr",
      "type": "private"
    },
    "date": 12315581826,
    "text": "Olá GasTail Bot!"
  }
}

```


![image](https://github.com/user-attachments/assets/5ad8990a-73e2-4ce8-8649-b6ce23b016f4)
![image](https://github.com/user-attachments/assets/f0cac460-3c76-4d3d-abdd-79bae0a21fff)

