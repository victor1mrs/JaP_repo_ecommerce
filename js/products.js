const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function showCategoriesList(array) {

    let htmlContentToAppend = "";
    /*for(let i = 0; i < currentCategoriesArray.length; i++){
        let producto = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(producto.productCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(producto.productCount) <= maxCount))){*/
    for (let i = 0; i < array.length; i++) {
        let producto = array[i];
        htmlContentToAppend +=`
            <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                    <div class="col-3">
                        <img src="` + producto.imgSrc + `" alt="` + producto.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ producto.name + ' - ' + producto.currency + ' ' + producto.cost + `</h4>
                            <small class="text-muted">` + producto.soldCount + ` vendidos</small>
                        </div>
                        <p class="mb-1">` + producto.description + `</p>
                    </div>
                </div>
        </a>`

    }

    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}
//}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            categoriesArray = resultObj.data;
            //Muestro las categorías ordenadas
            showCategoriesList(categoriesArray);
        }
    });
});