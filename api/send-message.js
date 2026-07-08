module.exports = async (req, res) => {
  // Permitir CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { name, phone } = req.body;

  // Validar dados
  if (!name || !phone) {
    return res.status(400).json({ error: 'Nome e telefone são obrigatórios' });
  }

  try {
    // Aqui você precisa configurar as variáveis de ambiente no Vercel
    const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
    const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
    const TWILIO_WHATSAPP_FROM = process.env.TWILIO_WHATSAPP_FROM;
    const OWNER_WHATSAPP = process.env.OWNER_WHATSAPP;

    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_WHATSAPP_FROM || !OWNER_WHATSAPP) {
      return res.status(500).json({ error: 'Variáveis de ambiente não configuradas' });
    }

    // Formatar número do cliente (remover caracteres especiais)
    const phoneFormatted = phone.replace(/\D/g, '');
    const clientPhone = `+55${phoneFormatted}`;

    // Mensagem para o dono
    const messageText = `📱 Novo cliente!\n\nNome: ${name}\nTelefone: ${phone}`;

    // Usar Twilio SDK
    const twilio = require('twilio');
    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    // Enviar mensagem WhatsApp
    await client.messages.create({
      from: `whatsapp:${TWILIO_WHATSAPP_FROM}`,
      to: `whatsapp:${OWNER_WHATSAPP}`,
      body: messageText
    });

    // Enviar mensagem de confirmação para o cliente
    const confirmationMessage = `Olá ${name}! 🎉\n\nRecebemos seus dados com sucesso!\nAcesse agora seu cupom de desconto exclusivo no iFood.`;

    await client.messages.create({
      from: `whatsapp:${TWILIO_WHATSAPP_FROM}`,
      to: `whatsapp:${clientPhone}`,
      body: confirmationMessage
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Dados enviados com sucesso!' 
    });

  } catch (error) {
    console.error('Erro:', error);
    return res.status(500).json({ 
      error: 'Erro ao enviar mensagem',
      details: error.message 
    });
  }
};
