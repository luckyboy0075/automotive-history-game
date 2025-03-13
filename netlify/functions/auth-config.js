module.exports = {
  auth0Domain: process.env.AUTH0_DOMAIN || "petrolheadsgame.eu.auth0.com",
  auth0ClientId: process.env.AUTH0_CLIENT_ID || "wtqqTxmzjj1CyFm6CpbH1hAtAIfmcwm8",
  auth0ClientSecret: process.env.AUTH0_CLIENT_SECRET || "OcOZYsMZg84UyGgGwuOdukNT9ktEUwe5HaEBsu61M64FHISvxDxy3XruGF8IL4ph",
  auth0CallbackUrl: process.env.AUTH0_CALLBACK_URL || "https://petrolheadsgame.com/admin/",
  auth0IssuerBaseUrl: process.env.AUTH0_ISSUER_BASE_URL || "https://petrolheadsgame.eu.auth0.com/"
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
