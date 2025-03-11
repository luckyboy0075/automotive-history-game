exports.handler = async function () {
    return {
        statusCode: 200,
        body: JSON.stringify({
            AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
            AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
            REDIRECT_URI: "https://petrolheadsgame.com/admin/"
        }),
    };
};
