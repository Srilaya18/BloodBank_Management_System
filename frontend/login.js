function login() {
    console.log("Trying login..."); // check JS runs
    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: username.value,
            password: password.value
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log("Server response:", data); // see what backend returns
        if (data.success) {
            localStorage.setItem("loggedIn", "true");
            window.location.href = "index.html";
        } else {
            msg.innerText = "Invalid username or password";
        }
    })
    .catch(err => {
        console.error("Fetch error:", err);
        msg.innerText = "Server not reachable";
    });
}
