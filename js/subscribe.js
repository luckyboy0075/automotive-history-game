
document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value;

    fetch('./content/subscribe_emails.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, timestamp: new Date().toISOString() })
    })
    .then(() => alert("Subscription saved successfully!"))
    .catch(() => alert("Error saving subscription."));
});
