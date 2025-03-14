import fetch from 'node-fetch';

export async function handler(event, context) {
  const token = event.headers.authorization?.split(' ')[1];

  if (!token) {
    return {
      statusCode: 401,
      body: JSON.stringify({ success: false, error: "Unauthorized - No token provided" }),
    };
  }

  const auth0Domain = process.env.AUTH0_DOMAIN;
  const auth0Issuer = `https://${auth0Domain}/`;

  try {
    const response = await fetch(`${auth0Issuer}.well-known/openid-configuration`);
    if (!response.ok) throw new Error('Failed to fetch Auth0 configuration');

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Token verified" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
}
