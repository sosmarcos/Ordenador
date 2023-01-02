var total = 0
var registro = []

function soma() {
    var entrada = window.document.getElementById('entrada')
    var retorno = window.document.getElementById('retorno')
    var valor = parseFloat(entrada.value)

    total += valor
    registro.push(valor.toFixed(2))
    
    retorno.innerText = ''
    for (let index in registro) {
        retorno.innerHTML += `R&#36; ${registro[index]}<br>`
    }
    retorno.innerHTML += `Total: R&#36 ${total.toFixed(2)}`
    entrada.value = ''
}

function porcento5() {
    var total5 = total - (total*5/100)
    document.body.innerHTML += `<p>O valor final com 5% de desconto é R&#36 ${total5.toFixed(2)}</p>`
}

function porcento3() {
    var total3 = total - (total*3/100)
    document.body.innerHTML += `<p>O valor final com 3% de desconto é R&#36 ${total3.toFixed(2)}</p>`
}

function multiplicação() {

}

function menuExpand() {
    var menu = window.document.getElementById('navMenu')
    if (menu.style.display == 'block') {menu.style.display = 'none'}
    else {menu.style.display = 'block'}
    
}

function sectionExpand(section, article='') {
    var sect = window.document.getElementById(section)
    sect.style.display = 'block'

    if (article) {}
}

function sectionRetract() {
    
}
