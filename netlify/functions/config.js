exports.handler = async () => {
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "text/yaml"
        },
        body: `
        backend:
          name: auth0
          client_id: "${process.env.AUTH0_CLIENT_ID}"
          domain: "${process.env.AUTH0_DOMAIN}"
          redirect_uri: "https://petrolheadsgame.com/admin/"
        `
    };
};
