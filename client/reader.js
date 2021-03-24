const xhttp = new XMLHttpRequest();
//xhttp.open("GET", "https://manroopkaur.ca/COMP351/labs/5/DBtable/", true);
xhttp.open("GET", "https://manroopkaur.ca/COMP351/labs/Bronze/readDB/public/reader", true);
xhttp.send();
xhttp.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200) {
        const entries = JSON.parse(this.responseText);
        const entryObjs = [];

        for(let i = 0; i < entries.length; i++) {
            entryObjs[i] = document.createElement("h4");
            entryObjs[i].innerHTML = i+1 + ". '" + entries[i].quote + "' - " + entries[i].author;
            document.getElementById("dbContents").appendChild(entryObjs[i]);
        }
    }
}