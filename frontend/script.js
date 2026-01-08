if (!localStorage.getItem("loggedIn")) {
    window.location.href = "login.html";
}

function addDonor() {
    fetch("http://localhost:3000/add-donor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            blood_group: document.getElementById("blood").value,
            phone: document.getElementById("phone").value
        })
    }).then(() => loadDonors());
}


function loadDonors() {
    fetch("http://localhost:3000/donors")
        .then(res => res.json())
        .then(data => {
            list.innerHTML = "";
            data.forEach(d => {
                list.innerHTML += `
                <li>${d.name} | ${d.blood_group} | ${d.phone}</li>`;
            });
        });
}

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}

loadDonors();
