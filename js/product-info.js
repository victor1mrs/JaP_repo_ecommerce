var product = {};
var comentariosArray = [];


function showComments(arrayComments) {
    let comments = "<hr>";
    for (let comment in arrayComments) {
        let puntos = "";
        //comments += '<strong>' + arrayComments[comment].user + '</strong> ' + arrayComments[comment].dateTime;
        //comments += '<div> ' + arrayComments[comment].dateTime + '</div><br>';
        
        //comments += 'Calificacion: <strong>' + arrayComments[comment].score + '</strong>';
        for (let i = 1; i <= arrayComments[comment].score; i++) {
            puntos += '<span class="fa fa-star checked"></span>';
        }

        for (let i = arrayComments[comment].score + 1; i <= 5; i++) {
            puntos += '<span class="fa fa-star"></span>';
        }
        comments += '<strong>' + arrayComments[comment].user + '</strong>' + '&nbsp;&nbsp;&nbsp;' + arrayComments[comment].dateTime + '&nbsp;&nbsp;&nbsp;' + puntos + '<br>';
        //comments += '<div style="text-align: right;">' + puntos + '</div><br>';
        comments += '<div>' + arrayComments[comment].description + '</div><hr>';
    }
    document.getElementById("productComments").innerHTML = comments;
}

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("carImagesGallery").innerHTML = htmlContentToAppend;
    }
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comentariosArray = resultObj.data;
            showComments(comentariosArray);
        }
    });
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.currency + " " + product.cost;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });
});