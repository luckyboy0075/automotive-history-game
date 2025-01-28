
document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value;

    fetch("./content/subscribe_emails.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    })
    .then((response) => console.log("Email saved:", email))
    .catch((error) => console.error("Error saving email:", error));
});
