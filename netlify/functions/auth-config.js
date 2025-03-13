module.exports = {
  auth0Domain: process.env.AUTH0_DOMAIN,
  auth0ClientId: process.env.AUTH0_CLIENT_ID,
  auth0ClientSecret: process.env.AUTH0_CLIENT_SECRET,
  auth0CallbackUrl: process.env.AUTH0_CALLBACK_URL,
  auth0IssuerBaseUrl: process.env.AUTH0_ISSUER_BASE_URL
};


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
