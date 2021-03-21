const adminPage = "admin.html";
const readerPage = "reader.html";

function Button(name, colour) {
    this.btn = document.createElement("button");
    document.body.appendChild(this.btn);
    this.btn.innerHTML = name;
    this.btn.style.backgroundColor = colour;
}

function goToPage(url) {
    return function() {
        window.location.href = url;
    }
}

function displayTitle(pageTitle) {
    let title = document.createElement("h1");
    document.body.appendChild(title);
    title.innerHTML = pageTitle;
}

displayTitle("Individual Assignment - Quotes from Famous People");

let adminButton = new Button("Admin Page", "red");
adminButton.btn.style.margin = "0.5em";
adminButton.btn.onclick = goToPage(adminPage);

let studentButton = new Button("Reader Page", "lightgreen");
studentButton.btn.onclick = goToPage(readerPage);