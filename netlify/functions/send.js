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
        const chatIdsEnv = process.env.CHAT_IDS;

        if (!botToken || !chatIdsEnv) {
            console.error("Missing BOT_TOKEN or CHAT_IDS");
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Server configuration error" })
            };
        }

        const chatIds = chatIdsEnv.split(',').map(id => id.trim());

        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

        await Promise.all(chatIds.map(async (chatId) => {
            const response = await fetch(telegramUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chat_id: chatId, text: message })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error(`Failed to send to ${chatId}:`, errorData);
            } else {
                console.log(`Message sent to ${chatId}`);
            }
        }));

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true })
        };
    } catch (error) {
        console.error("Error in handler:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Ошибка сервера" })
        };
    }
}