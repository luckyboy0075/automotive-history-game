const fetch = require("node-fetch");

exports.handler = async (event, context) => {
    if (!event.headers.authorization) {
        return {
            statusCode: 401,
            body: JSON.stringify({ error: "Unauthorized" }),
        };
    }

    const token = event.headers.authorization.split(" ")[1];

    try {
        const response = await fetch(`https://YOUR_AUTH0_DOMAIN/userinfo`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
            throw new Error("Invalid token");
        }

        const user = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(user),
        };
    } catch (error) {
        return {
            statusCode: 401,
            body: JSON.stringify({ error: "Unauthorized" }),
        };
    }
};
