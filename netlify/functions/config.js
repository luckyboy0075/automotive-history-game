exports.handler = async () => {
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "text/yaml"
        },
        body: `
backend:
  name: "auth0"
  client_id: "${process.env.AUTH0_CLIENT_ID || 'MISSING_AUTH0_CLIENT_ID'}"
  domain: "${process.env.AUTH0_DOMAIN || 'MISSING_AUTH0_DOMAIN'}"
  redirect_uri: "https://petrolheadsgame.com/admin/"

media_folder: "uploads"
public_folder: "/uploads"

collections:
  - name: "posts"
    label: "Posts"
    folder: "content/posts"
    create: true
    fields:
      - { name: "title", label: "Title", widget: "string" }
      - { name: "body", label: "Body", widget: "markdown" }
      - { name: "date", label: "Date", widget: "datetime" }
      - { name: "image", label: "Image", widget: "image" }
`
    };
};
