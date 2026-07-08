# 🍣 Chegamos Maringá - Sushi e Poke

Landing page com captura de leads via WhatsApp para o restaurante Maze Gohan.

## 🚀 Funcionalidades

✅ Landing page responsiva com design atrativo
✅ Formulário modal para captura de leads
✅ Integração com WhatsApp via Twilio
✅ Envio automático de confirmação para o cliente
✅ Notificação para o dono com dados do cliente
✅ Formatação automática de telefone
✅ Redireciona para iFood após submissão

## 📋 Requisitos

- Conta grátis no [Twilio](https://www.twilio.com)
- Conta grátis no [Vercel](https://vercel.com)
- Acesso ao repositório GitHub

## 🔧 Instalação e Configuração

### 1. Configurar Twilio

1. Acesse https://www.twilio.com e crie uma conta (grátis)
2. Vá para **Console > API Keys & Tokens**
3. Copie:
   - **Account SID**
   - **Auth Token**
4. Vá para **Messaging > Try it Out**
5. Ative o WhatsApp Sandbox
6. Você receberá um número no formato: **+1234567890**

### 2. Fazer Deploy no Vercel

1. Acesse https://vercel.com e faça login com GitHub
2. Clique em "New Project"
3. Selecione o repositório `sushi-e-poke-maze`
4. Em **Environment Variables**, adicione:

```
TWILIO_ACCOUNT_SID=seu_account_sid
TWILIO_AUTH_TOKEN=seu_auth_token
TWILIO_WHATSAPP_FROM=+1234567890 (número Twilio)
OWNER_WHATSAPP=+5544991217870 (seu número)
```

5. Clique em "Deploy"

### 3. Atualizar URL da API no HTML

Se seu domínio no Vercel for diferente, atualize o arquivo `index.html`:

```javascript
// Procure por esta linha:
const response = await fetch('/api/send-message', {

// E mude para:
const response = await fetch('https://seu-dominio-vercel.vercel.app/api/send-message', {
```

## 🧪 Testando

1. Acesse https://o-melhor-delivery.github.io/sushi-e-poke-maze/
2. Clique no botão "🛵 Peça Agora"
3. Preencha o formulário com:
   - Nome: Seu nome
   - Telefone: Seu número (com DDD)
4. Clique em "Receber Cupom 🎁"
5. Você deve receber uma mensagem no WhatsApp confirmando

## 📁 Estrutura do Projeto

```
sushi-e-poke-maze/
├── index.html                 # Landing page principal
├── api/
│   └── send-message.js       # API para enviar mensagens WhatsApp
├── package.json              # Dependências do projeto
├── vercel.json               # Configuração do Vercel
├── .env.example              # Exemplo de variáveis de ambiente
└── README.md                 # Este arquivo
```

## 🔐 Segurança

- As credenciais Twilio são armazenadas como variáveis de ambiente no Vercel
- Nunca commite credenciais no repositório
- Use `.env.example` como referência

## 📱 Integração WhatsApp

O sistema envia 2 mensagens:

**Para o Dono:**
```
📱 Novo cliente!

Nome: [Nome do cliente]
Telefone: [Número do cliente]
```

**Para o Cliente:**
```
Olá [Nome]! 🎉

Recebemos seus dados com sucesso!
Acesse agora seu cupom de desconto exclusivo no iFood.
```

## 🚨 Troubleshooting

### Mensagem não chega
- ✅ Verificar se as variáveis de ambiente estão corretas no Vercel
- ✅ Confirmar que o número Twilio foi ativado no WhatsApp Sandbox
- ✅ Verificar o console do navegador (F12) para erros

### Formulário não funciona
- ✅ Limpar cache do navegador (Ctrl+Shift+Delete)
- ✅ Verificar se a API está acessível (testar URL no navegador)
- ✅ Verificar logs no Vercel

## 📞 Suporte

Para problemas com Twilio, consulte: https://www.twilio.com/docs/whatsapp

## 📄 Licença

Projeto privado - Maze Gohan

---

**Desenvolvido com ❤️ para Chegamos Maringá**
