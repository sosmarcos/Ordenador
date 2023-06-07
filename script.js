var total = 0
var registro = []
var porcento3On = false
var porcento5On = false
var menuEspecificOn = false

class ValorUnitario {
    constructor(valor_especifico, texto) {
        this.valor = valor_especifico
        this.texto = texto
        } 
    }

function soma() {
    var entrada = window.document.getElementById('entrada')
    var retorno = window.document.getElementById('retorno')
    var valor = parseFloat(entrada.value)

    total += valor
    registro.push(new ValorUnitario(valor, `
        <label id='linha${registro.length}' class='linhaRetorno' onclick='funçoesDoValor(${registro.length})'>
            R&#36; ${valor.toFixed(2)}
        </label>
        <div id='funçoes${registro.length}' class="menuEspecifico">
            <input type="button" class="funçoes" value="X" onclick="multiplicanção()">
            <input type="button" class="funçoes" value="D" onclick="deletar(${registro.length})">
        </div><br>`))
    console.log(registro)
    
    retorno.innerText = ''
    for (let index in registro) {
        retorno.innerHTML += registro[index].texto
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
            retorno.innerHTML += registro[index].texto
        }
        retorno.innerHTML += `R&#36; -${(total*5/100).toFixed(2)}<br>`
        retorno.innerHTML += `Total: R&#36 ${total5.toFixed(2)}<br>`
    } else {
        porcento5On = false

        retorno.innerText = ''
        for (let index in registro) {
            retorno.innerHTML += registro[index].texto
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
            retorno.innerHTML += registro[index].texto
        }
        retorno.innerHTML += `R&#36; -${(total*3/100).toFixed(2)}<br>`
        retorno.innerHTML += `Total: R&#36 ${total3.toFixed(2)}<br>`
    } else {
        porcento3On = false

        retorno.innerText = ''
        for (let index in registro) {
            retorno.innerHTML += registro[index].texto
        }
        retorno.innerHTML += `Total: R&#36 ${total.toFixed(2)}<br>`
    }
}

function funçoesDoValor(index) {
    var multiplicando = registro[index]
    var valorEmLinha = window.document.getElementById(`linha${index}`)
    var menuEspecifico = window.document.getElementById(`funçoes${index}`)

    for (let index in registro) {
        let menu = window.document.getElementById(`funçoes${index}`)
        if (menu.style.display == 'inline-block') {
            if (menu != menuEspecifico) {
                menu.style.display = 'none'
                menuEspecificOn = false
            }
        }
    }
    if (!menuEspecificOn) {
        menuEspecificOn = true
        
        menuEspecifico.style.display = 'inline-block'
    } else {
        menuEspecificOn = false
        menuEspecifico.style.display = 'none'
    }
    
}

function multiplicanção() {
    null
}

function deletar(index) {
    total -= registro[index].valor

    delete registro[index]
    retorno.innerText = ''
    for (let index in registro) {
        retorno.innerHTML += registro[index].texto
    }
    retorno.innerHTML += `Total: R&#36 ${total.toFixed(2)}<br>`
    menuEspecificOn = false
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
