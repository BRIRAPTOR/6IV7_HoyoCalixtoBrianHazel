var vigenere = vigenere || (function(){
    var proceso = function(txt, desp, action){
        var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        var longitud = abc.length;

        return String(txt).split('').map(function(c) {
            var i = abc.indexOf(c.toLowerCase());
            if(i !== -1) {
                if(action) {
                    // Cifrar: suma el desplazamiento y aplica módulo
                    var newPos = (i + desp) % longitud;
                    return abc[newPos];
                } else {
                    // Descifrar: resta el desplazamiento y se asegura de no quedar negativo
                    var newPos = (i - desp + longitud) % longitud;
                    return abc[newPos];
                }
            }
            return c;
        }).join('');
    };

    return {
        encode: function(txt, desp){
            return proceso(txt, desp, true);
        },
        decode: function(txt, desp){
            return proceso(txt, desp, false);
        }
    };
})();

function obindiceClave(caracter){
    var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    return abc.indexOf(caracter.toLowerCase());
}

function codificar(){
    var texto = document.getElementById("txt").value;
    var clave = document.getElementById("txtclave").value;

    if(texto === "" || clave === ""){
        alert("Por favor, ingresa tanto el texto como la clave.");
        return;
    }

    var resultado = "";
    var indiceClave = 0;
    for(var i = 0; i < texto.length; i++){
        var desp = obindiceClave(clave.charAt(indiceClave));
        resultado += vigenere.encode(texto.charAt(i), desp);
        indiceClave = (indiceClave + 1) % clave.length;
    }
    document.getElementById("respuesta").value = resultado;
}

function decodificar(){
    var texto = document.getElementById("txt").value;
    var clave = document.getElementById("txtclave").value;

    if(texto === "" || clave === ""){
        alert("Por favor, ingresa tanto el texto como la clave.");
        return;
    }

    var resultado = "";
    var indiceClave = 0;
    for(var i = 0; i < texto.length; i++){
        var desp = obindiceClave(clave.charAt(indiceClave));
        resultado += vigenere.decode(texto.charAt(i), desp);
        indiceClave = (indiceClave + 1) % clave.length;
    }
    document.getElementById("respuesta").value = resultado;
}

function reiniciar(){
    document.getElementById("txt").value = "";
    document.getElementById("txtclave").value = "";
    document.getElementById("respuesta").value = "";
}

function copiar(){
    var resultado = document.getElementById("respuesta");
    resultado.select();
    document.execCommand("copy");
    alert("Resultado copiado!");
}