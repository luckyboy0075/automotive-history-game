
document.querySelector("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const message = document.querySelector("#message").value;

    fetch('./content/contact_messages.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, timestamp: new Date().toISOString() })
    })
    .then(() => alert("Message saved successfully!"))
    .catch(() => alert("Error saving message."));
});
