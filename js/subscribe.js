
document.querySelector("#subscribeForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value;

    if (!email) {
        alert("Please enter your email before subscribing.");
        return;
    }

    fetch('./content/subscribe_emails.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, timestamp: new Date().toISOString() })
    })
    .then(() => alert("Subscription saved successfully!"))
    .catch(() => alert("Error saving subscription."));
});
