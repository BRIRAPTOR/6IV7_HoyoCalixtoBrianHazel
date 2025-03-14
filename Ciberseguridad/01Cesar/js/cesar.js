var vigenere = (function(){
    var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var longitud = abc.length;

    var proceso = function(txt, desp, action){
        return txt.split('').map(c => {
            var i = abc.indexOf(c.toLowerCase());
            if(i !== -1){
                var pos = action ? (i + desp) % longitud : (i - desp + longitud) % longitud;
                return abc[pos];
            }
            return c;
        }).join('');
    };

    return {
        encode: function(txt, clave){
            var resultado = "";
            for(let i = 0, j = 0; i < txt.length; i++){
                let desp = abc.indexOf(clave[j % clave.length].toLowerCase());
                resultado += proceso(txt[i], desp, true);
                j++;
            }
            return resultado;
        },
        decode: function(txt, clave){
            var resultado = "";
            for(let i = 0, j = 0; i < txt.length; i++){
                let desp = abc.indexOf(clave[j % clave.length].toLowerCase());
                resultado += proceso(txt[i], desp, false);
                j++;
            }
            return resultado;
        }
    };
})();

function cifradoCesar(){
    const texto = document.getElementById("texto").value;
    const desp = parseInt(document.getElementById("desplazamiento").value) || 0;
    document.getElementById("cifrado").value = texto.split('').map(c => {
        let mayus = c === c.toUpperCase();
        let valorEntero = c.toLowerCase().charCodeAt(0);
        if(valorEntero >= 97 && valorEntero <= 122){
            valorEntero = ((valorEntero - 97 + desp) % 26) + 97;
        }
        let cifrado = String.fromCharCode(valorEntero);
        return mayus ? cifrado.toUpperCase() : cifrado;
    }).join('');
}

document.getElementById("texto").addEventListener("keyup", cifradoCesar);
document.getElementById("desplazamiento").addEventListener("change", cifradoCesar);

document.getElementById("reiniciar").addEventListener("click", function(){
    document.getElementById("texto").value = "";
    document.getElementById("cifrado").value = "";
    document.getElementById("desplazamiento").value = 0;
});
