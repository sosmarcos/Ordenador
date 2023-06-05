var total = 0
var registro = []
var porcento3On = false
var porcento5On = false

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
    retorno.innerHTML += `Total: R&#36 ${total.toFixed(2)}<br>`
    entrada.value = ''
    porcento3On = false
    porcento5On = false
}

function porcento5() {
    var total5 = total - (total*5/100)
    var retorno = window.document.getElementById('retorno')
    if (!porcento5On) {
        porcento5On = true
        porcento3On = false

        retorno.innerText = ''
        for (let index in registro) {
            retorno.innerHTML += `R&#36; ${registro[index]}<br>`
        }
        retorno.innerHTML += `R&#36; -${(total*5/100).toFixed(2)}<br>`
        retorno.innerHTML += `Total: R&#36 ${total5.toFixed(2)}<br>`
    } else {
        porcento5On = false

        retorno.innerText = ''
        for (let index in registro) {
            retorno.innerHTML += `R&#36; ${registro[index]}<br>`
        }
        retorno.innerHTML += `Total: R&#36 ${total.toFixed(2)}<br>`
    }
}

function porcento3() {
    var total3 = total - (total*3/100)
    var retorno = window.document.getElementById('retorno')
    if (!porcento3On) {
        porcento3On = true
        porcento5On = false

        retorno.innerText = ''
        for (let index in registro) {
            retorno.innerHTML += `R&#36; ${registro[index]}<br>`
        }
        retorno.innerHTML += `R&#36; -${(total*3/100).toFixed(2)}<br>`
        retorno.innerHTML += `Total: R&#36 ${total3.toFixed(2)}<br>`
    } else {
        porcento3On = false

        retorno.innerText = ''
        for (let index in registro) {
            retorno.innerHTML += `R&#36; ${registro[index]}<br>`
        }
        retorno.innerHTML += `Total: R&#36 ${total.toFixed(2)}<br>`
    }
}

function multiplicação() {

}

function menuExpand() {
    var menu = window.document.getElementById('navMenu')
    if (menu.style.display == 'block') {menu.style.display = 'none'}
    else {menu.style.display = 'block'}
    
}

function sectionExpand(section, article='') {
    var sectPlantas = window.document.getElementById('plantas')
    var sectCalculo = window.document.getElementById('calculadora')

    if (section == 'plantas') {
        sectPlantas.style.display = 'block'
        sectCalculo.style.display = 'none'
    } else {
        sectCalculo.style.display = 'block'
        sectPlantas.style.display = 'none'
    }

    if (article) {
        var menu = window.document.getElementById('navMenu')
        var arct
        var categorias = [
            'internas',
            'jardins',
            'forracao',
            'cercas',
            'pendentes',
            'calcadas',
            'piscinas',
            'presentes',
            'vento'
        ]
        menu.style.display = 'none'

        for (let index in categorias) {
            arct = window.document.getElementById(categorias[index])
            if (categorias[index] == article) {
                arct.style.display = 'block'
            } else {
                arct.style.display = 'none'
            }
        }
    }
}
