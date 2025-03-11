const fetch = require("node-fetch");

exports.handler = async (event, context) => {
    // Extract token from Authorization header
    const token = event.headers.authorization?.split(" ")[1];

    if (!token) {
        return {
            statusCode: 401,
            body: JSON.stringify({ success: false, error: "Unauthorized - No token provided" }),
        };
    }

    try {
        const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/userinfo`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
            throw new Error("Invalid token");
        }

        const user = await response.json();
        console.log("User verified:", user);

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, user }),
        };
    } catch (error) {
        console.error("Auth0 verification error:", error);
        return {
            statusCode: 401,
            body: JSON.stringify({ success: false, error: "Invalid or expired token" }),
        };
    }
};
