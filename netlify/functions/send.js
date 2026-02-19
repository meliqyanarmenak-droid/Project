export async function handler(event) {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: "Method Not Allowed"
        };
    }

    try {
        const { name, contact } = JSON.parse(event.body);

        const message = `📩 Новая заявка с сайта AURIX
        👤 Имя: ${name}
        📱 Контакт: ${contact}`;


        const botToken = process.env.BOT_TOKEN;
        const chatId = process.env.CHAT_ID;

        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

        await fetch(telegramUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message
            })
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Ошибка сервера" })
        };
    }
}

const response = await fetch(telegramUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: message })
});

const data = await response.json();
console.log("Telegram response:", data);