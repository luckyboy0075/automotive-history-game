
document.querySelector("#contactForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const message = document.querySelector("#message").value;

    if (!name || !email || !message) {
        alert("Please fill in all fields before submitting.");
        return;
    }

    fetch("./content/contact_messages.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, timestamp: new Date().toISOString() })
    })
    .then(() => alert("Message saved successfully!"))
    .catch(() => alert("Error saving message."));
});

document.querySelector("#subscribeForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector("#subscribeEmail").value;

    if (!email) {
        alert("Please enter your email before subscribing.");
        return;
    }

    fetch("./content/subscribe_emails.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, timestamp: new Date().toISOString() })
    })
    .then(() => alert("Subscription saved successfully!"))
    .catch(() => alert("Error saving subscription."));
});
