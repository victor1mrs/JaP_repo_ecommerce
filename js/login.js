//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("submitBtn").addEventListener("click", function(e) {

        let inputEmail = document.getElementById("inputEmail");
        let inputPassword = document.getElementById("inputPassword");
        let camposCompletos = true;
        
        if (inputEmail.value === '') {
            inputEmail.classList.add("invalid");
            camposCompletos = false;
        }

        if (inputPassword.value === ''){
            inputPassword.classList.add("invalid");
            camposCompletos = false;
        }

        if (camposCompletos) {

            /*getJSONData(USUARIOS_URL).then(function (resultObj) {
                if (resultObj.status === "ok") {
                    usersArray = resultObj.data;
                    if ( validateUser(usersArray, inputEmail.value, inputPassword.value) ){*/
                        
                        localStorage.setItem('User-Logged', JSON.stringify({ email: inputEmail.value}));//GRUPO
                        
                        /*window.location = 'index.html';
                    }else{
                        alert("Usuario o contraseña incorrectas!");
                    }
                }
            });*/

        }else{
            alert("Debes ingresar los datos!")
        }
    });
});
//});