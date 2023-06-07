var total = 0
var registro = []
var porcento3On = false
var porcento5On = false
var menuEspecificOn = false

class ValorUnitario {
    constructor(valor_especifico, texto, index) {
        this.valor = valor_especifico
        this.texto = texto
        this.multiplicado = 0
        this.codigo = `
            <label id='linha${index}' class='linhaRetorno' onclick='funçoesDoValor(${index})'>
                ${this.texto}
            </label>
            <div id='funçoes${index}' class="menuEspecifico">
            <input type="button" class="funçoes" value="X" onclick="multiplicanção(${index})">
            <input type="number" id="entrada${index}" class='entradaMultiplo' onchange="multiplicanção(${index})">
            <input type="button" class="funçoes" value="D" onclick="deletar(${index})">
        </div><br>`
        } 
    }

function soma() {
    var entrada = window.document.getElementById('entrada')
    var retorno = window.document.getElementById('retorno')
    var valor = parseFloat(entrada.value)

    total += valor
    registro.push(new ValorUnitario(valor, `R&#36; ${valor.toFixed(2)}`, registro.length))
    console.log(registro)
    
    retorno.innerText = ''
    for (let index in registro) {
        retorno.innerHTML += registro[index].codigo
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
            retorno.innerHTML += registro[index].codigo
        }
        retorno.innerHTML += `R&#36; -${(total*5/100).toFixed(2)}<br>`
        retorno.innerHTML += `Total: R&#36 ${total5.toFixed(2)}<br>`
    } else {
        porcento5On = false

        retorno.innerText = ''
        for (let index in registro) {
            retorno.innerHTML += registro[index].codigo
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
            retorno.innerHTML += registro[index].codigo
        }
        retorno.innerHTML += `R&#36; -${(total*3/100).toFixed(2)}<br>`
        retorno.innerHTML += `Total: R&#36 ${total3.toFixed(2)}<br>`
    } else {
        porcento3On = false

        retorno.innerText = ''
        for (let index in registro) {
            retorno.innerHTML += registro[index].codigo
        }
        retorno.innerHTML += `Total: R&#36 ${total.toFixed(2)}<br>`
    }
}

function funçoesDoValor(index) {
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

function multiplicanção(index) {
    var multiplicando = registro[index].valor
    var multiplicador = window.document.getElementById(`entrada${index}`).value

    if (!registro[index].multiplicado) {
        window.document.getElementById(`entrada${index}`).style.display = 'inline'
        registro[index].multiplicado = 1
        
    } else if (registro[index].multiplicado == 1) {
        if (multiplicador) {
            registro[index].valor = multiplicando * multiplicador
            registro[index].texto += `x${multiplicador}`
            registro[index].codigo = `
                <label id='linha${index}' class='linhaRetorno' onclick='funçoesDoValor(${index})'>
                    ${registro[index].texto}
                </label>
                <div id='funçoes${index}' class="menuEspecifico">
                <input type="button" class="funçoes" value="D" onclick="deletar(${index})">
                </div><br>`

            retorno.innerText = ''
            total = 0
            for (let valores in registro) {
                total += registro[valores].valor
                retorno.innerHTML += registro[valores].codigo
            }
            retorno.innerHTML += `Total: R&#36 ${total.toFixed(2)}<br>`
            menuEspecificOn = false
        } else {
            window.document.getElementById(`entrada${index}`).style.display = 'none'
            registro[index].multiplicado = 0
        }
    }
    console.log(multiplicador)
}

function deletar(index) {
    total -= registro[index].valor

    delete registro[index]
    retorno.innerText = ''
    for (let index in registro) {
        retorno.innerHTML += registro[index].codigo
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
