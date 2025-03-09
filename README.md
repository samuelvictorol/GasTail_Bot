![image](https://github.com/user-attachments/assets/5ad8990a-73e2-4ce8-8649-b6ce23b016f4)

# Rodar o projeto com Docker
- [ ] Docker instalado e rodando na máquina.
- [ ] NGROK instalado e com arquivo ngrok.exe na raíz do projeto.
- [ ] rode o ngrok com o comando ngrok http 5000, copie a url forwarding e coloque na variavel de ambiente BOT_BACKEND_URL
- [ ] docker build -t gastail-bot .
- [ ] docker run -p 5000:5000 gastail-bot

## Variáveis de Ambiente
 
 - TELEGRAM_BOT_TOKEN
 - BOT_BACKEND_URL
 - CONNECTION_STRING (mongodb)
 - PORT (5000 padrão)

## Exemplo de JSON retornado no webhook telegram

> "Dados recebidos":

```json
{
  "update_id": 218002779,
  "message": {
    "message_id": 105,
    "from": {
      "id": 1331214492,
      "is_bot": false,
      "first_name": "Samuel Victor",
      "username": "Samvctr",
      "language_code": "pt-br"
    },
    "chat": {
      "id": 1331214492,
      "first_name": "Samuel Victor",
      "username": "Samvctr",
      "type": "private"
    },
    "date": 1741381826,
    "text": "olá"
  }
}

```
