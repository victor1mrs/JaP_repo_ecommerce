var productsArray = [];

function calcTotal(){
    let total = 0;
    let subs = document.getElementsByClassName("subtotal");
    
    for(let i =0; i<subs.length; i++){
        total+= parseInt(subs[i].innerHTML);
    }
    document.getElementById("total").innerHTML = total;
    calcEnvio();
}
//this is just another testing activitys
function calcSubtotal(precio, i, moneda){
    let cantidad = parseInt(document.getElementById(`cantidad${i}`).value);
    subtotal = cantidad * precio;
    if(moneda == 'USD')
        subtotal = subtotal * 40;
    document.getElementById(`productSubtotal${i}`).innerHTML = subtotal;
    calcTotal();
}

function eliminar(i){
    if(productsArray.length>1){
        productsArray.splice(i,1); //el segundo parametro es la cantidad de objetos que queremos borrar
        showProducts(productsArray);
    }else{
        document.getElementById("carrito").innerHTML = `
        <div class="text-center">
        <br>
        <h2>No hay productos agregados al carrito</h2>
        <p>Solicite uno de nuestro <a href="products.html">listado</a></p>
        </div>
        `;
    }
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
            <td><button class="btn btn-danger" onclick="eliminar(${i})">&times;</button></td>
        </tr>
        `
        document.getElementById("listado").innerHTML = contenido;
    }
    calcTotal();
    calcEnvio();
}

function calcEnvio(){
    let total = parseInt(document.getElementById("total").innerHTML);
    let envio;
    let elements = document.getElementsByName("envio");
    for(var i=0;i<elements.length;i++){
        if(elements[i].checked){
            envio = parseInt(elements[i].value);
        }
    }
    let precioEnvio = Math.ceil(envio*total/100);
    let totalConEnvio = total + precioEnvio;
    
    let contenido = `Precio del envío: $${precioEnvio}<br><strong>Total con envío: $${totalConEnvio} </strong><br>` ;
    document.getElementById("totalEnvio").innerHTML = contenido;
}

function seleccionarPago(){
    var pagos = document.getElementsByName("formaPago");
    for(var i=0;i<pagos.length;i++){
        if(pagos[i].checked && (pagos[i].value)=="1"){
            document.getElementById("datosTarjeta").classList.remove("d-none");
            document.getElementById("datosBanco").classList.add("d-none");
        }
        else if(pagos[i].checked && (pagos[i].value)=="2"){
            document.getElementById("datosTarjeta").classList.add("d-none");
            document.getElementById("datosBanco").classList.remove("d-none");
        }
    }
}

/*function mostrarBanc(){
    var pagos = document.getElementsByName("formaPago");
    if(pagos[1].checked)
        document.getElementById("datosBanco").classList.remove("d-done");
    else
        document.getElementById("datosBanco").classList.add("d-done");
}*/

function pagoValido(){
    let numTarjeta = document.getElementById('numTarjeta').value;
    let titularTarjeta = document.getElementById('titularTarjeta').value;
    let cuenta = document.getElementById('cuenta').value;
    let formaPago = document.getElementsByName('formaPago');
    let tipoEnvio = document.getElementsByName('envio');
    let pagoValido = true;
    let envioValido = 0;
    
    for(var i=0; i< formaPago.length;i++){
        if(formaPago[i].checked && formaPago[i].value == "1"){
            if(numTarjeta == "" || titularTarjeta == ""){
                pagoValido = false;
            }else{
                pagoValido = true;
            }
        }else if(formaPago[i].checked && formaPago[i].value == "2"){
            if(cuenta == ""){
                pagoValido = false;
            }else{
                pagoValido = true;
            }
        }
    }
    for(var j=0; j< tipoEnvio.length;j++) {
        if(tipoEnvio[j].checked){
            envioValido++;
        }
    }
    return (pagoValido && (envioValido==1) );  
}

document.addEventListener("DOMContentLoaded", function(e){
        getJSONData(CART_INFO_URL_2).then(function(resultObj){
        if(resultObj.status === "ok"){
            productsArray = resultObj.data.articles;
            showProducts(productsArray);
            calcEnvio()
        }
    });

    let elements = document.getElementsByName("envio");
    for(var i=0;i<elements.length;i++){
        elements[i].addEventListener("change", function(){
            calcEnvio()
        });
    }

    let tiposPago = document.getElementsByName("formaPago");
    for(var i=0;i<tiposPago.length;i++){
        tiposPago[i].addEventListener("change",function(){
            seleccionarPago();
        });
    }

    let form = document.getElementById('needs-validation');
    let direccion= document.getElementById('direccion');
    let pais= document.getElementById('pais');
    form.addEventListener('submit', function(e){
        if(form.checkValidity()===false){
            e.preventDefault();
            e.stopPropagation();
            if(pagoValido()){
                document.getElementById("btnPago").classList.remove("btn-primary");
                document.getElementById("btnPago").classList.remove("btn-danger");
                document.getElementById("btnPago").classList.add("btn-success");
                document.getElementById("pagar").innerHTML = `
                <div class= "alert alert-success alert-dismissible show" role="alert">
                    <strong>Forma de pago ingresada</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                `;
            }else{
                e.preventDefault();
                e.stopPropagation();
                document.getElementById("btnPago").classList.remove("btn-primary");
                document.getElementById("btnPago").classList.remove("btn-success");
                document.getElementById("btnPago").classList.add("btn-danger");
                document.getElementById("pagar").innerHTML = `
                <div class= "alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Debe ingresar una forma de pago!</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                `;
            }
        }else{
            if(pagoValido){
                /*document.getElementById("carrito").innerHTML=`
                <div class= "alert alert-success alert-dismissible show" role="alert">
                    <strong>Felicitaciones! su compra ha sido realizada con exito</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                `*/
            }else{
                e.preventDefault();
                e.stopPropagation();
                document.getElementById("btnPago").classList.remove("btn-primary");
                document.getElementById("btnPago").classList.remove("btn-success");
                document.getElementById("btnPago").classList.add("btn-danger");
                document.getElementById("pagar").innerHTML=`
                <br>
                <div class= "alert alert-danger alert-dismissible show" role="alert">
                    <strong>Debe ingresar una forma de pago!</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                `;
            }
        }
        form.classList.add('was-validated');
    })

});
