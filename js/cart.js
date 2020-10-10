var productsArray = [];

function calcTotal(){
    let total = 0;
    let subs = document.getElementsByClassName("subtotal");
    
    for(let i =0; i<subs.length; i++){
        total+= parseInt(subs[i].innerHTML);
    }
    document.getElementById("total").innerHTML = total;
}

function calcSubtotal(precio, i, moneda){
    let cantidad = parseInt(document.getElementById(`cantidad${i}`).value);
    subtotal = cantidad * precio;
    if(moneda == 'USD')
        subtotal = subtotal * 40;
    document.getElementById(`productSubtotal${i}`).innerHTML = subtotal;
    calcTotal();
}

function showProducts(array){
    let contenido = "";
    for(let i = 0; i<array.length;i++){
        let product = array[i];
        let sub;
        if(product.currency == 'UYU'){
            sub = product.unitCost * product.count;
        }
        else{
            sub = product.unitCost * 40 * product.count;
        }
        contenido += `
        <tr>
            <td><img src = '${product.src}' width="150px"></td>
            <td>${product.name}</td>
            <td>${product.currency}</td>
            <td>${product.unitCost}</td>
            
            <td><input style="width:60px;" onchange="calcSubtotal(${product.unitCost},${i},'${product.currency}')"
            type="number" id="cantidad${i}" value="${product.count}" min="1"></td>
            
            <td><span class="subtotal" id="productSubtotal${i}" style="font-weight:bold; color:blue;">${sub}</span></td>
        </tr>
        `
        document.getElementById("listado").innerHTML = contenido;
    }
    calcTotal();
}


document.addEventListener("DOMContentLoaded", function(e){
        getJSONData(CART_INFO_URL_2).then(function(resultObj){
        if(resultObj.status === "ok"){
            productsArray = resultObj.data.articles;
            showProducts(productsArray);
        }
    });

});
