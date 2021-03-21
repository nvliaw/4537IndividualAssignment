const endPointRoot = "https://nvliaw.ca/nodeindividual/API/v1";
const xhttp = new XMLHttpRequest();
const incompleteQuote = "Please ensure the quote is filled out completely."

function Button(name, colour) {
    this.btn = document.createElement("button");
    this.btn.innerHTML = name;
    this.btn.style.backgroundColor = colour;
}

function Quote(quoteText, quoteAuthor) {
    this.quoteText = quoteText;
    this.quoteAuthor = quoteAuthor;
}

function displayQuote(quote = null) {
    console.log(quote);
    let quoteDiv = document.createElement("div");
    quoteDiv.setAttribute("class", "individualQuote");
    document.getElementById("quotes").appendChild(quoteDiv);

    let quoteText = document.createElement("textarea");
    quoteText.setAttribute("class", "quoteText");
    quoteText.setAttribute("cols", 50);
    quoteDiv.appendChild(quoteText);

    let authorText = document.createElement("textarea");
    authorText.setAttribute("class", "quoteText");
    authorText.setAttribute("cols", 20);
    quoteDiv.appendChild(authorText);

    let buttonsDiv = document.createElement("div");
    buttonsDiv.setAttribute("id", "buttons");
    quoteDiv.appendChild(buttonsDiv);

    let updateButton = new Button("Update", "powderblue");
    updateButton.btn.setAttribute("class", "functionButton");
    buttonsDiv.appendChild(updateButton.btn);
    updateButton.btn.onclick = function() {
        let quoteTexts = quoteDiv.getElementsByClassName("quoteText");
        let newQuoteText = quoteTexts[0].value;
        let newAuthorText = quoteTexts[1].value;
        let newQuote = new Quote(newQuoteText, newAuthorText)
        if (newQuoteText.trim() && newAuthorText.trim()) {
            updateFunction(quote, newQuote);
        } else {
            window.alert(incompleteQuote);
        }
        quote = newQuote;
    }

    let deleteButton = new Button("Delete", "red");
    deleteButton.btn.setAttribute("class", "functionButton");
    buttonsDiv.appendChild(deleteButton.btn);
    deleteButton.btn.onclick = function() {
        deleteFunction(quote);
        quoteDiv.remove();
    }

    let saveButton = new Button("Save", "lightgreen");
    saveButton.btn.setAttribute("class", "functionButton");
    buttonsDiv.appendChild(saveButton.btn);
    saveButton.btn.onclick = function() {
        let quoteTexts = quoteDiv.getElementsByClassName("quoteText");
        let newQuoteText = quoteTexts[0].value;
        let newAuthorText = quoteTexts[1].value;
        let newQuote = new Quote(newQuoteText, newAuthorText)
        if (newQuoteText.trim() && newAuthorText.trim()) {
            saveFunction(newQuote);
            saveButton.btn.style.display = "none";
            deleteButton.btn.style.display = "";
            updateButton.btn.style.display = "";
            quote = newQuote;
        } else {
            window.alert(incompleteQuote);
        }
    }

    if (quote) {
        quoteText.innerHTML = quote.quoteText;
        authorText.innerHTML = quote.quoteAuthor;
        saveButton.btn.style.display = "none";
    } else {
        deleteButton.btn.style.display = "none";
        updateButton.btn.style.display = "none";
    }
}

function saveFunction(quote) {
    let body = JSON.stringify(quote);
    console.log(body);
    xhttp.open("POST", endPointRoot + "/quotes/", true);
    xhttp.setRequestHeader('Content-type', 'application/json')
    xhttp.send(body);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }
}

function deleteFunction(quote) {
    let body = JSON.stringify(quote);
    xhttp.open("DELETE", endPointRoot + "/quotes/", true);
    xhttp.setRequestHeader('Content-type', 'application/json')
    xhttp.send(body);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }
}

function updateFunction(oldQuote, newQuote) {
    let body = {oldQuote: oldQuote.quoteText, oldAuthor: oldQuote.quoteAuthor, newQuote: newQuote.quoteText, newAuthor: newQuote.quoteAuthor};
    body = JSON.stringify(body);
    console.log(body);
    xhttp.open("PUT", endPointRoot + "/quotes/", true);
    xhttp.setRequestHeader('Content-type', 'application/json')
    xhttp.send(body);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }
}

function displayQuotes() {
    xhttp.open("GET", endPointRoot + "/quotes/", true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        console.log(this.responseText);
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText) {
                let rows = JSON.parse(this.responseText);

                if (rows.length == 0) {
                    document.getElementById("loading").innerHTML = "No quotes stored in database.";
                } else {
                    document.getElementById("loading").style.display = "none";
                    for (let i = 0; i < rows.length; i++) {
                        quote = new Quote(rows[i].quoteText, rows[i].authorText);
                        displayQuote(quote);
                    }
                }
            }
        }
    }
}

function addNewQuote() {
    document.getElementById("loading").style.display = "none";
    displayQuote();
}

function back() {
    window.location.href = "index.html";
}

displayQuotes();
let addQuoteButton = new Button("Add", "lightgreen");
document.body.appendChild(addQuoteButton.btn);
addQuoteButton.btn.onclick = addNewQuote;

document.body.appendChild(document.createElement("br"));
let backButton = new Button("Back", "grey");
backButton.btn.style.marginTop = "0.5em";
document.body.appendChild(backButton.btn);
backButton.btn.onclick = back;