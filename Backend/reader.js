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

function displayQuote(quote) {
    let quoteDiv = document.createElement("div");
    quoteDiv.setAttribute("class", "individualQuote");
    document.getElementById("quotes").appendChild(quoteDiv);

    let quoteText = document.createElement("textarea");
    quoteText.setAttribute("class", "quoteText");
    quoteText.setAttribute("cols", 50);
    quoteText.readOnly = true;
    quoteDiv.appendChild(quoteText);

    let authorText = document.createElement("textarea");
    authorText.setAttribute("class", "quoteText");
    authorText.setAttribute("cols", 20);
    authorText.readOnly = true;
    quoteDiv.appendChild(authorText);

    quoteText.innerHTML = quote.quoteText;
    authorText.innerHTML = quote.quoteAuthor;
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
    let buttons = document.getElementsByClassName("showQuoteButtons");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.display = "none";
    }
}

function displaySingleQuote() {
    console.log("In single quote")
    xhttp.open("GET", endPointRoot + "/quotes/1", true);
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
                    quote = new Quote(rows[0].quoteText, rows[0].authorText);
                    displayQuote(quote);
                }
            }
        }
    }
    let buttons = document.getElementsByClassName("showQuoteButtons");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.display = "none";
    }
}


function back() {
    window.location.href = "index.html";
}

let showSingleQuote = new Button("Single Quote", 'lightblue');
showSingleQuote.btn.setAttribute("class", "showQuoteButtons");
document.body.appendChild(showSingleQuote.btn);
showSingleQuote.btn.onclick = displaySingleQuote;
showSingleQuote.btn.style.marginRight = "0.5em";

let showAllQuotes = new Button("All Quotes", 'lightgreen');
showAllQuotes.btn.setAttribute("class", "showQuoteButtons");
document.body.appendChild(showAllQuotes.btn);
showAllQuotes.btn.onclick = displayQuotes;

document.body.appendChild(document.createElement("br"));
let backButton = new Button("Back", "grey");
backButton.btn.style.marginTop = "0.5em";
document.body.appendChild(backButton.btn);
backButton.btn.onclick = back;