console.log("coucou la team")

var data; //Contient les données récupérées par le JSON

function getBaseUrl() {
    url = window.location.href;
    var re = new RegExp(/^.*\//);
    baseUrl = re.exec(url)
    return baseUrl;
}

