//================================================||Clases||======================================================

class item {
    constructor(quantidade, nome, objeto, valor=0) {
        this.nome = nome
        this.objeto = objeto
        this.valor = valor
        this.quantidade = quantidade
    }
}

class Inventario {
    constructor(nome, data, vetor) {
        this.nome = nome
        this.data = data
        this.inventario = vetor
    }
}

class ValorUnitario {
    constructor(valor_especifico, texto, index, isenção=false) {
        this.valor = valor_especifico
        this.texto = texto
        this.isento = isenção
        this.multiplicado = false
        this.descontado = false
        this.codigo = `
            <input type='button' value='${this.texto}' id='linha${index}' class='linhaRetorno' onclick='funçoesDoValor(${index})'>
            <div id='funçoes${index}' class="menuEspecifico">
                <input type="number" id="entradaM${index}" class='entradaMultiplo' onchange="multiplicação(${index})">
                <input type="number" id="entrada%${index}" class='entradaDesconto' onchange="desconto(${index})">
                <input type="button" class="funçoes" value="%" onclick="alternarEntrada(${index})">
                <input type="button" class="funçoes" value="&Oslash;" onclick="alternarIsenção(${index})">
                <input type="button" class="funçoes" value="D" onclick="deletar(${index})">
            </div><br>`
    } 
}

class ItemEspecifico {
    constructor (quantidade, nome, alternador, identidade) {
        this.nome = nome
        this.quantidade = quantidade
        this.alternador = alternador
        this.codigo = `
            <label id='ordem${indiceRepositor}' class="ordem_de_reposição" onclick='editorDeOrdem(${indiceRepositor}, "${identidade}")'>
                ${nome} /${quantidade}
            </label>`
    }
} 

class registroDeComanda {
    constructor(quantidade, grandeza, descrição, unitario) {
        this.quantidade = quantidade
        this.grandeza = grandeza
        this.unitario = unitario
        this.total = (unitario*quantidade).toFixed(2)
        if (descrição == '') {
            this.descrição = 'Sem Descrição'
            
        } else {this.descrição = descrição}
    }
}

class Comanda {
    constructor() {
        this.registro = []
        this.valorBruto = 0
        this.descontoPorcento = 0
        this.descontoReal = 0
        this.valorLiquido = 0
        this.parcelas = 0
    }
}

class Cliente {
    constructor(nome='', contato='', endereço='', observaçao='') {
        this.nome = nome
        this.contato = contato
        this.endereço = endereço
        this.observaçao = observaçao
    }
}

//=============================================||Variaveis||======================================================

var data = new Date()
var dia = String(data.getDate()).padStart(2, '0')
var mes = String(data.getMonth() + 1).padStart(2, '0')
var ano = data.getFullYear()

const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
var dataAtual = `${String(data.getDate())} de ${meses[data.getMonth()]} de ${ano}`

var total = 0
var registroDaCalculadora = []
var registroDoRepositor = []
var comanda = new Comanda()
var valorIsentoDeDesconto = 0
var isençãoDeDesconto = false
var porcento3On = false
var porcento5On = false
var entradaMultiploOn = true
var menuEspecificOn = false
var menuDescontoOn = false
var linhaDestacadaOn = false
var alternador = ''
var indiceRepositor = 0
var indiceOrçamento = 1

//=======================||Seções||=========================//
var sectHomepage = window.document.getElementById('home_page')
var sectPlantas = window.document.getElementById('plantas')
var sectCalculo = window.document.getElementById('calculadora')
var sectComanda = window.document.getElementById('orçamento')
var sectInventarios = window.document.getElementById('inventarios')
var sectRepositor = window.document.getElementById('repositor')

//=======================||Artigos||========================//
var articleDiversos = window.document.getElementById('diversos')
var articleRegaplan = window.document.getElementById('regaplan')
var articleRischioto = window.document.getElementById('rischioto')
var articleEmeAEme = window.document.getElementById('eme_a_eme')
var articleForth = window.document.getElementById('forth')
var articleFuzil = window.document.getElementById('fuzil')
var articleAlfa_cestas = window.document.getElementById('alfa_cestas')
var articleAlfa_polietileno = window.document.getElementById('alfa_polietileno')
var articleAlfa_fibraSintetica = window.document.getElementById('alfa_fibraSintetica')
var articleJelPlast = window.document.getElementById('jel_plast')
var articlePolicamp = window.document.getElementById('policamp')
var articleInsetimax = window.document.getElementById('insetimax')
var articleMadeiras = window.document.getElementById('madeiras')
var articleNutriplan = window.document.getElementById('nutriplan')
var articleCoquim = window.document.getElementById('coquim')

//=======================||Listas||=========================//
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
var inventorios = [
    'diversos',
    'regaplan',
    'rischioto',
    'eme_a_eme',
    'forth',
    'fuzil',
    'alfa_cestas',
    'alfa_polietileno',
    'alfa_fibraSintetica',
    'jel_plast',
    'policamp',
    'insetimax',
    'madeiras',
    'nutriplan',
    'coquim'
]

//=================================================||Funções||====================================================
function soma() {
    var entrada = window.document.getElementById('entrada')
    var retorno = window.document.getElementById('retorno')
    var valor = parseFloat(entrada.value)

    total += valor
    if (isençãoDeDesconto) {
        registroDaCalculadora.push(new ValorUnitario(valor, `&Oslash;&#36; ${valor.toFixed(2)}`, registroDaCalculadora.length, true))
        valorIsentoDeDesconto += valor

        document.getElementById('botaoIsento').style.backgroundColor = '#68a844e0'
        isençãoDeDesconto = false
    } else {
        registroDaCalculadora.push(new ValorUnitario(valor, `R&#36; ${valor.toFixed(2)}`, registroDaCalculadora.length))
    }
    
    retorno.innerText = ''
    for (let index in registroDaCalculadora) {
        retorno.innerHTML += registroDaCalculadora[index].codigo
    }
    retorno.innerHTML += `<input type='button' value='Total: R&#36 ${total.toFixed(2)}' class='linhaRetorno' onclick='funçoesDoTotal()'>
                        <div id='funçoesDoTotal' class="menuEspecifico">
                            <input type="number" id='descontoN' class='entradaMultiplo' onchange='validaçãoPorcento()'> %
                        </div><br>`
    entrada.value = ''
    porcento3On = false
    porcento5On = false
    menuEspecificOn = false

    entrada.select()
}

function isentarDeDesconto() {
    if (isençãoDeDesconto) {
        isençãoDeDesconto = false
        document.getElementById('botaoIsento').style.backgroundColor = '#68a844e0'
        document.getElementById('botaoIsento').title = 'Isentar de desconto: Desativado'
    } else {
        isençãoDeDesconto = true
        document.getElementById('botaoIsento').style.backgroundColor = '#c33636'
        document.getElementById('botaoIsento').title = 'Isentar de desconto: Ativado'
    }
    try {document.getElementById(`entrada`).select()}
        catch {null}
}

function funçoesDoTotal() {
    var menuDesconto = window.document.getElementById('funçoesDoTotal')
    for (let index in registroDaCalculadora) {
        window.document.getElementById(`funçoes${index}`).style.display = 'none'
        menuEspecificOn = false
    }
    if (!menuDescontoOn) {
        menuDesconto.style.display = 'inline-block'
        try {document.getElementById('descontoN').select()}
        catch {null}
        menuDescontoOn = true
    }
    else {
        menuDesconto.style.display = 'none'
        menuDescontoOn = false
    }
}

function validaçãoPorcento() {
    window.document.getElementById('funçoesDoTotal').style.display = 'none'
    menuDescontoOn = false

    var num = window.document.getElementById('descontoN').value
    if (num > 100) {
        document.getElementById('descontoN').value = ''
    }
    else {porcentoN(num)}
}

function porcento5() {
    var parcial = total - valorIsentoDeDesconto
    var total5 = (parcial - (parcial*5/100)) + valorIsentoDeDesconto
    var retorno = window.document.getElementById('retorno')
    if (!porcento5On) {
        porcento5On = true
        porcento3On = false

        retorno.innerText = ''
        for (let index in registroDaCalculadora) {
            retorno.innerHTML += registroDaCalculadora[index].codigo
        }
        retorno.innerHTML += `<label class='linhaRetorno'>R&#36; -${(parcial*5/100).toFixed(2)}</label><br>`
        retorno.innerHTML += `<input type='button' value='Total: R&#36 ${total5.toFixed(2)}' class='linhaRetorno' onclick='funçoesDoTotal()'>
                            <div id='funçoesDoTotal' class="menuEspecifico">
                                <input type="number" id='descontoN' class='entradaMultiplo' onchange='validaçãoPorcento()'> %
                            </div><br>`
    } else {
        porcento5On = false

        retorno.innerText = ''
        for (let index in registroDaCalculadora) {
            retorno.innerHTML += registroDaCalculadora[index].codigo
        }
        retorno.innerHTML += `<input type='button' value='Total: R&#36 ${total.toFixed(2)}' class='linhaRetorno' onclick='funçoesDoTotal()'>
                            <div id='funçoesDoTotal' class="menuEspecifico">
                                <input type="number" id='descontoN' class='entradaMultiplo' onchange='validaçãoPorcento()'> %
                            </div><br>`
    }
    menuEspecificOn = false
}

function porcento3() {
    var parcial = total - valorIsentoDeDesconto
    var total3 = (parcial - (parcial*3/100)) + valorIsentoDeDesconto
    var retorno = window.document.getElementById('retorno')
    if (!porcento3On) {
        porcento3On = true
        porcento5On = false

        retorno.innerText = ''
        for (let index in registroDaCalculadora) {
            retorno.innerHTML += registroDaCalculadora[index].codigo
        }
        retorno.innerHTML += `<label class='linhaRetorno'>R&#36; -${(parcial*3/100).toFixed(2)}</label><br>`
        retorno.innerHTML += `<input type='button' value='Total: R&#36 ${total3.toFixed(2)}' class='linhaRetorno' onclick='funçoesDoTotal()'>
                            <div id='funçoesDoTotal' class="menuEspecifico">
                                <input type="number" id='descontoN' class='entradaMultiplo' onchange='validaçãoPorcento()'> %
                            </div><br>`
    } else {
        porcento3On = false

        retorno.innerText = ''
        for (let index in registroDaCalculadora) {
            retorno.innerHTML += registroDaCalculadora[index].codigo
        }
        retorno.innerHTML += `<input type='button' value='Total: R&#36 ${total.toFixed(2)}' class='linhaRetorno' onclick='funçoesDoTotal()'>
                            <div id='funçoesDoTotal' class="menuEspecifico">
                                <input type="number" id='descontoN' class='entradaMultiplo' onchange='validaçãoPorcento()'> %
                            </div><br>`
    }
    menuEspecificOn = false
}

function porcentoN(num) {
    var retorno = window.document.getElementById('retorno')
    var porcentoN = num
    var parcial = total - valorIsentoDeDesconto
    var totalN = (parcial - (parcial*porcentoN/100)) + valorIsentoDeDesconto

    if (porcentoN > 0) {
        porcento3On = false
        porcento5On = false
        retorno.innerText = ''
        for (let index in registroDaCalculadora) {
            retorno.innerHTML += registroDaCalculadora[index].codigo
        }
        retorno.innerHTML += `<label class='linhaRetorno'>R&#36; -${(parcial*porcentoN/100).toFixed(2)}</label><br>`
        retorno.innerHTML += `<input type='button' value='Total: R&#36 ${totalN.toFixed(2)}' class='linhaRetorno' onclick='funçoesDoTotal()'>
                            <div id='funçoesDoTotal' class="menuEspecifico">
                                <input type="number" id='descontoN' class='entradaMultiplo' onchange='validaçãoPorcento()'> %
                            </div><br>`
    } else {
        retorno.innerText = ''
        for (let index in registroDaCalculadora) {
            retorno.innerHTML += registroDaCalculadora[index].codigo
        }
        retorno.innerHTML += `<input type='button' value='Total: R&#36 ${total.toFixed(2)}' class='linhaRetorno' onclick='funçoesDoTotal()'>
                            <div id='funçoesDoTotal' class="menuEspecifico">
                                <input type="number" id='descontoN' class='entradaMultiplo' onchange='validaçãoPorcento()'> %
                            </div><br>`
    }
    menuEspecificOn = false
}

function funçoesDoValor(index) {
    var menuEspecifico = window.document.getElementById(`funçoes${index}`)
    window.document.getElementById('funçoesDoTotal').style.display = 'none'
    menuDescontoOn = false

    for (let index in registroDaCalculadora) {
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
        try {document.getElementById(`entradaM${index}`).select()}
        catch {null}
    } else {
        menuEspecificOn = false
        menuEspecifico.style.display = 'none'
    }
}

function alternarEntrada(index) {
    let entradaM = window.document.getElementById(`entradaM${index}`)
    let entradaP = window.document.getElementById(`entrada%${index}`)
    let fundo = window.document.getElementById(`funçoes${index}`)

    if (entradaMultiploOn) {
        try {entradaM.style.display = 'none'} catch {null}
        try {
            entradaP.style.display = 'inline'
            entradaP.select()
        } catch {null}
        fundo.style.backgroundImage = 'linear-gradient(90deg, rgb(0 255 222), #226fb6f2 95%)'

        entradaMultiploOn = false
    } else {
        try {
            entradaM.style.display = 'inline'
            entradaM.select()
        } catch {null}
        try {entradaP.style.display = 'none'} catch {null}
        fundo.style.backgroundImage = 'linear-gradient(90deg, #1f4a71fc , #226fb6f2 )'
        
        entradaMultiploOn = true
    }
}

function alternarIsenção(index) {
    var retorno = window.document.getElementById('retorno')

    console.log(registroDaCalculadora[index])
    console.log(`Isento: ${registroDaCalculadora[index].isento}\nTexto: ${registroDaCalculadora[index].texto}`)

    if (registroDaCalculadora[index].isento) {
        registroDaCalculadora[index].isento = false
        registroDaCalculadora[index].texto = `${(registroDaCalculadora[index].texto).replace('&Oslash;', 'R')}`
        valorIsentoDeDesconto -= registroDaCalculadora[index].valor
    } else {
        registroDaCalculadora[index].isento = true
        registroDaCalculadora[index].texto = `${(registroDaCalculadora[index].texto).replace('R', '&Oslash;')}`
        valorIsentoDeDesconto += registroDaCalculadora[index].valor
    }
    console.log(`Isento: ${registroDaCalculadora[index].isento}\nTexto: ${registroDaCalculadora[index].texto}`)

    registroDaCalculadora[index].codigo = `
        <input type='button' value='${registroDaCalculadora[index].texto}' id='linha${index}' class='linhaRetorno' onclick='funçoesDoValor(${index})'>
        <div id='funçoes${index}' class="menuEspecifico">
        <input type="number" id="entradaM${index}" class='entradaMultiplo' onchange="multiplicação(${index})">
        <input type="number" id="entrada%${index}" class='entradaDesconto' onchange="desconto(${index})">
        <input type="button" class="funçoes" value="%" onclick="alternarEntrada(${index})">
        <input type="button" class="funçoes" value="&Oslash;" onclick="alternarIsenção(${index})">
        <input type="button" class="funçoes" value="D" onclick="deletar(${index})">
        </div><br>`

    retorno.innerText = ''
    for (let index in registroDaCalculadora) {
        retorno.innerHTML += registroDaCalculadora[index].codigo
    }
    retorno.innerHTML += `<input type='button' value='Total: R&#36 ${total.toFixed(2)}' class='linhaRetorno' onclick='funçoesDoTotal()'>
                        <div id='funçoesDoTotal' class="menuEspecifico">
                            <input type="number" id='descontoN' class='entradaMultiplo' onchange='validaçãoPorcento()'> %
                        </div><br>`
                        
    porcento3On = false
    porcento5On = false
    menuEspecificOn = false
}

function multiplicação(index) {
    var multiplicando = registroDaCalculadora[index].valor
    var multiplicador = window.document.getElementById(`entradaM${index}`).value
    var texto = registroDaCalculadora[index].texto.split(' ')

    if (multiplicador) {
        registroDaCalculadora[index].valor = multiplicando * multiplicador
        registroDaCalculadora[index].multiplicado = true
        
        if (registroDaCalculadora[index].descontado) {
            registroDaCalculadora[index].texto = `${texto[0]} ${texto[1]}x${multiplicador} ${texto[2]}`
            registroDaCalculadora[index].codigo = `
                <input type='button' value='${registroDaCalculadora[index].texto}' id='linha${index}' class='linhaRetorno' onclick='funçoesDoValor(${index})'>
                <div id='funçoes${index}' class="menuEspecifico">
                <input type="button" class="funçoes" value="D" onclick="deletar(${index})">
                </div><br>`
        } else {
            registroDaCalculadora[index].texto = `${texto[0]} ${texto[1]}x${multiplicador}`
            registroDaCalculadora[index].codigo = `
                <input type='button' value='${registroDaCalculadora[index].texto}' id='linha${index}' class='linhaRetorno' onclick='funçoesDoValor(${index})'>
                <div id='funçoes${index}' class="menuEspecifico">
                <input type="number" id="entrada%${index}" class='entradaDesconto' onchange="desconto(${index})">
                <input type="button" class="funçoes" value="%" onclick="alternarEntrada(${index})">
                <input type="button" class="funçoes" value="D" onclick="deletar(${index})">
                </div><br>`
        }
        
        retorno.innerText = ''
        total = 0
        valorIsentoDeDesconto = 0
        for (let valores in registroDaCalculadora) {
            total += registroDaCalculadora[valores].valor
            if (registroDaCalculadora[valores].isento) {valorIsentoDeDesconto += registroDaCalculadora[valores].valor}
            retorno.innerHTML += registroDaCalculadora[valores].codigo
        }
        retorno.innerHTML += `<input type='button' value='Total: R&#36 ${total.toFixed(2)}' class='linhaRetorno' onclick='funçoesDoTotal()'>
                        <div id='funçoesDoTotal' class="menuEspecifico">
                            <input type="number" id='descontoN' class='entradaMultiplo' onchange='validaçãoPorcento()'> %
                        </div><br>`

        porcento3On = false
        porcento5On = false
        menuEspecificOn = false
    } else {
        window.document.getElementById(`entradaM${index}`).style.display = 'none'
        registroDaCalculadora[index].multiplicado = 0
    }
}

function desconto(index) {
    let valor = registroDaCalculadora[index].valor
    let entradaP = window.document.getElementById(`entrada%${index}`)
    let texto = registroDaCalculadora[index].texto

    registroDaCalculadora[index].isento = true
    registroDaCalculadora[index].valor = valor - (valor*entradaP.value/100)
    registroDaCalculadora[index].descontado = true
    registroDaCalculadora[index].texto = `${texto} -${entradaP.value}%`
    if (registroDaCalculadora[index].multiplicado) {
        registroDaCalculadora[index].codigo = `
            <input type='button' value='${registroDaCalculadora[index].texto}' id='linha${index}' class='linhaRetorno' onclick='funçoesDoValor(${index})'>
            <div id='funçoes${index}' class="menuEspecifico">
            <input type="button" class="funçoes" value="D" onclick="deletar(${index})">
            </div><br>`
    } else {
        registroDaCalculadora[index].codigo = `
            <input type='button' value='${registroDaCalculadora[index].texto}' id='linha${index}' class='linhaRetorno' onclick='funçoesDoValor(${index})'>
            <div id='funçoes${index}' class="menuEspecifico">
            <input type="number" id="entradaM${index}" class='entradaMultiplo' onchange="multiplicação(${index})">
            <input type="button" class="funçoes" value="D" onclick="deletar(${index})">
            </div><br>`
    }
    
    console.log(registroDaCalculadora)

    retorno.innerText = ''
    total = 0
    valorIsentoDeDesconto = 0
    for (let valores in registroDaCalculadora) {
        total += registroDaCalculadora[valores].valor
        if (registroDaCalculadora[valores].isento) {valorIsentoDeDesconto += registroDaCalculadora[valores].valor}
        retorno.innerHTML += registroDaCalculadora[valores].codigo
    }
    retorno.innerHTML += `<input type='button' value='Total: R&#36 ${total.toFixed(2)}' class='linhaRetorno' onclick='funçoesDoTotal()'>
                        <div id='funçoesDoTotal' class="menuEspecifico">
                            <input type="number" id='descontoN' class='entradaMultiplo' onchange='validaçãoPorcento()'> %
                        </div><br>`

    porcento3On = false
    porcento5On = false
    menuEspecificOn = false
}

function deletar(index) {
    var retorno = window.document.getElementById('retorno')
    total -= registroDaCalculadora[index].valor
    if (registroDaCalculadora[index].isento) {valorIsentoDeDesconto -= registroDaCalculadora[index].valor}

    delete registroDaCalculadora[index]
    retorno.innerText = ''
    for (let index in registroDaCalculadora) {
        retorno.innerHTML += registroDaCalculadora[index].codigo
    }
    retorno.innerHTML += `<input type='button' value='Total: R&#36 ${total.toFixed(2)}' class='linhaRetorno' onclick='funçoesDoTotal()'>
                        <div id='funçoesDoTotal' class="menuEspecifico">
                            <input type="number" id='descontoN' class='entradaMultiplo' onchange='validaçãoPorcento()'> %
                        </div><br>`
         
    porcento3On = false
    porcento5On = false
    menuEspecificOn = false
}

function calculoReset() {
    if (window.confirm('Você realmente deseja encerrar esta operação?')) {
        total = 0
        registroDaCalculadora = []
        valorIsentoDeDesconto = 0
        isençãoDeDesconto = false
        porcento3On = false
        porcento5On = false
        entradaMultiploOn = true
        menuEspecificOn = false
        menuDescontoOn = false
        window.document.getElementById('retorno').innerHTML = ''
    }   
}

function menuExpand(menu) {
    var menu = window.document.getElementById(`${menu}`)
    var botao = window.document.getElementById(`${botao}`)
        
    if (menu.style.display == 'block') {menu.style.display = 'none'}
    else {
        window.document.getElementById('navMenuInventarios').style.display = 'none'
        window.document.getElementById('navMenuPlantas').style.display = 'none'
        window.document.getElementById('navMenuRepositorios').style.display = 'none'

        menu.style.display = 'block'
    }
}

function sectionExpand(section, identidade='', menu='') {
    if (section == 'home_page') {
        sectHomepage.style.display = 'block'
        
        sectPlantas.style.display = 'none'
        sectCalculo.style.display = 'none'
        sectComanda.style.display = 'none'
        sectInventarios.style.display = 'none'
        sectRepositor.style.display = 'none'
    } else if (section == 'plantas') {
        sectPlantas.style.display = 'block'

        sectHomepage.style.display = 'none'
        sectCalculo.style.display = 'none'
        sectComanda.style.display = 'none'
        sectInventarios.style.display = 'none'
        sectRepositor.style.display = 'none'
    } else if (section == 'calculadora'){
        if (sectCalculo.style.display == 'block') {sectCalculo.style.display = 'none'} else {
            sectCalculo.style.display = 'block'
            document.getElementById('entrada').select()
        }
    } else if (section =='orçamento') {
        sectComanda.style.display = 'block'
        document.getElementById(`quantidade_orçamento_${comanda.registro.length}`).select()

        sectCalculo.style.display = 'none'
        sectHomepage.style.display = 'none'
        sectPlantas.style.display = 'none'
        sectInventarios.style.display = 'none'
        sectRepositor.style.display = 'none'
    } else if (section == 'inventarios') {
        sectInventarios.style.display = 'block'
        
        sectHomepage.style.display = 'none'
        sectPlantas.style.display = 'none'
        sectCalculo.style.display = 'none'
        sectComanda.style.display = 'none'
        sectRepositor.style.display = 'none'
    } else if (section == 'repositor') {
        sectRepositor.style.display = 'block'

        sectHomepage.style.display = 'none'
        sectPlantas.style.display = 'none'
        sectCalculo.style.display = 'none'
        sectComanda.style.display = 'none'
        sectInventarios.style.display = 'none'
    }

    if (identidade) {
        var menu = window.document.getElementById(`${menu}`)
        var arct
        

        if (section == 'plantas') {
            for (let index in categorias) {
                arct = window.document.getElementById(categorias[index])
                if (categorias[index] == identidade) {
                    arct.style.display = 'block'
                } else {
                    arct.style.display = 'none'
                }
            }

        } else if (section == 'inventarios') {
            for (let index in inventorios) {
                arct = window.document.getElementById(inventorios[index])
                if (inventorios[index] == identidade) {
                    arct.style.display = 'block'
                } else {
                    arct.style.display = 'none'
                }
            }

        } else if (section == 'repositor') {
            repositor(identidade)
        }
    }
}

function impreção(sec, empresa, identificador) {
    //sec.innerHTML += `<h1>${empresa.nome}</h1>`
    //sec.innerHTML += `<h2>${empresa.data}</h2>`
    
    //console.log(empresa)

    //let repeatNumber = 0
    //for (let index in empresa.inventario) {
    //    if (empresa.inventario[index].nome.length > repeatNumber) {repeatNumber = empresa.inventario[index].nome.length}
    //}

    //let objeto = empresa.inventario[0].objeto
    //for (let index in empresa.inventario) {
    //    if (objeto != empresa.inventario[index].objeto) {sec.innerHTML += '<br>'}
    //    sec.innerHTML += `
    //    <label id='${identificador}${index}' class='inventario'>
    //        ${empresa.inventario[index].nome}${'.'.repeat(repeatNumber - (empresa.inventario[index].nome.length))}${'.'.repeat(5 - String(empresa.inventario[index].quantidade).length)}${empresa.inventario[index].quantidade}
    //    </label>`
    //    objeto = empresa.inventario[index].objeto
    //    //onclick="linhaDestacada(${identificador}${index})"
    //}
}

function linhaDestacada(identidade) {
    if (!linhaDestacadaOn) {
        identidade.style.fontWeight = 'normal'
        identidade.style.fontStyle = 'italic'
        identidade.style.color = '#ffffff'
        identidade.style.backgroundImage = 'linear-gradient(90deg, #548abd, #72a5c8)'
        identidade.style.padding = '6px 0px'
        identidade.style.borderRadius = '3px'

        linhaDestacadaOn = true
    } else {
        identidade.style.fontWeight = 'bold'
        identidade.style.fontStyle = 'normal'
        identidade.style.color = 'black'
        identidade.style.backgroundImage= 'none'
        identidade.style.padding = '0px'
        identidade.style.borderRadius = '0px'

        linhaDestacadaOn = false
    }
}

function buscadorDeInventario(nome) {
    switch (nome) {
        case 'diversos':
            return diversos
        case 'regaplan':
            return regaplan
        case 'rischioto':
            return rischioto
        case 'eme_a_eme':
            return emeAeme
        case 'forth':
            return forth
        case 'fuzil':
            return fuzil
        case 'alfa_cestas':
            return alfa_cestas
        case 'alfa_polietileno':
            return alfa_polietileno
        case 'alfa_fibraSintetica':
            return alfa_fibraSintetica
        case 'jel_plast':
            return jel_plast
        case 'policamp':
            return policamp
        case 'insetimax':
            return insetimax
        case 'madeiras':
            return madeiras
        case 'nutriplan':
            return nutriplan
        case 'coquim':
            return coquim
        default:
            break
    }
}

function validação(identidade) {
    function retornar() {
        alternador = ''
        quadroDeSaida.innerHTML = ''
        for (let index in registroDoRepositor) {
            if (alternador != registroDoRepositor[index].alternador) {
                if(alternador != '') {quadroDeSaida.innerHTML += '<br>'}
            }
            alternador = `${registroDoRepositor[index].alternador}`
            quadroDeSaida.innerHTML += registroDoRepositor[index].codigo
        }
        indiceRepositor++
    }
    let quadroDeEntrada = document.getElementById('divDeEntrada')
    let quadroDeSaida = document.getElementById('divDeSaida')
    let item = buscadorDeInventario(identidade).inventario[indiceRepositor]
    let numeroDeEntrada = document.getElementById('entradaDoRepositor').value
    let reposição = numeroDeEntrada - numeroDeEntrada*2
    
    if (reposição > 0) {reposição = `+${reposição}`}
    if ((item.quantidade - (reposição - reposição*2)) < 0) {
        if (!document.getElementsByClassName('menssagem_de_erro')[0]) {
            quadroDeEntrada.innerHTML += '<p class="menssagem_de_erro">Quantidade não disponivel</p>'
        }
        
    } else {
        try {document.getElementsByClassName('menssagem_de_erro')[0].remove()}
        catch {null}

        registroDoRepositor.unshift(new ItemEspecifico(reposição, item.nome, item.objeto, identidade))
        retornar()
             
        repositor(identidade)
    }
}

function repositor(
    //identidade
    ) {
    function contato(texto, tag='p class="repositor"') {quadroDeEntrada.innerHTML += `<${tag}>${texto}</${tag}>`}
    
    let empresa = buscadorDeInventario(identidade)
    let quadroDeEntrada = document.getElementById('divDeEntrada')
    let quadroDeSaida = document.getElementById('divDeSaida')

    quadroDeEntrada.innerHTML = `<h1 style='text-align: center;'>Repositor ${empresa.nome}</h1>`
    try {
        contato(empresa.inventario[indiceRepositor].nome, 'h3')
        contato(`Estoque: ${empresa.inventario[indiceRepositor].quantidade}`)
        contato(`Repor: <input type='number' id='entradaDoRepositor' class='repositor' onchange='validação("${identidade}")'>`)
        document.getElementById('entradaDoRepositor').select()
    } catch {
        contato(`Ordem de Reposição ${empresa.nome}`)
        alternador = ''
        quadroDeSaida.innerHTML = ''
        for (var index=registroDoRepositor.length - 1; index > -1; index--) {
            if (alternador != registroDoRepositor[index].alternador) {
                if(alternador != '') {quadroDeSaida.innerHTML += '<br>'}
            }
            alternador = `${registroDoRepositor[index].alternador}`
            quadroDeSaida.innerHTML += `<label class="ordem_de_reposição">${registroDoRepositor[index].nome} /${registroDoRepositor[index].quantidade}</label>`

            indiceRepositor = 0
        }
    }
}

function validaçãoDaEdção(identidade, index) {
    let quadroDeEntrada = document.getElementById('divDeEntrada')
    let item = buscadorDeInventario(identidade).inventario[index]
    let retorno = document.getElementById(`ordem${index}`)
    let numeroDeEntrada = document.getElementById('entradaDoRepositor').value
    let reposição = numeroDeEntrada - numeroDeEntrada*2
    
    if (reposição > 0) {reposição = `+${reposição}`}

    if ((item.quantidade - (reposição - reposição*2)) < 0) {
        if (!document.getElementsByClassName('menssagem_de_erro')[0]) {
            quadroDeEntrada.innerHTML += '<p class="menssagem_de_erro">Quantidado não disponivel</p>'
        }
        
    } else {
        try {document.getElementsByClassName('menssagem_de_erro')[0].remove()}
        catch {null}
        
        registroDoRepositor[(registroDoRepositor.length - 1) - index].quantidade = reposição
        registroDoRepositor[(registroDoRepositor.length - 1) - index].codigo = `
            <label id='ordem${index}' class="ordem_de_reposição" onclick='editorDeOrdem(${index}, "${identidade}")'>
                ${registroDoRepositor[(registroDoRepositor.length - 1) - index].nome} /${reposição}
            </label>`

        retorno.innerText = `${registroDoRepositor[(registroDoRepositor.length - 1) - index].nome} /${reposição}`
        repositor(identidade)
    }
}

function editorDeOrdem(index, identidade) {
    function contato(texto, tag='p class="repositor"') {quadroDeEntrada.innerHTML += `<${tag}>${texto}</${tag}>`}
    let empresa = buscadorDeInventario(identidade)
    let quadroDeEntrada = document.getElementById('divDeEntrada')

    quadroDeEntrada.innerHTML = `<h1 style='text-align: center;'>Repositor ${empresa.nome}</h1>`
    contato(empresa.inventario[index].nome, 'h3')
    contato(`Estoque: ${empresa.inventario[index].quantidade}`)
    contato(`Repor: <input type='number' id='entradaDoRepositor' class='repositor' onchange='validaçãoDaEdção("${identidade}", "${index}")'>`)
    document.getElementById('entradaDoRepositor').select()
}

function inputToLabel() {
    for (let index in comanda.registro) {
        document.getElementById(`quantidade_orçamento_${index}`).style.display = 'inline-block'
        document.getElementById(`quantidade_orçamento_edit_${index}`).style.display = 'none'

        document.getElementById(`grandeza_orçamento_${index}`).style.display = 'inline-block'
        document.getElementById(`grandeza_orçamento_edit_${index}`).style.display = 'none'

        document.getElementById(`descrição_orçamento_${index}`).style.display = 'inline-block'
        document.getElementById(`descrição_orçamento_edit_${index}`).style.display = 'none'

        document.getElementById(`unitario_orçamento_${index}`).style.display = 'inline-block'
        document.getElementById(`unitario_orçamento_edit_${index}`).style.display = 'none'

        document.getElementById(`total_orçamento_${index}`).style.display = 'inline-block'
        document.getElementById(`total_orçamento_edit_${index}`).style.display = 'none'
    }
}

function orçamento(index, ediçao=null) {
    function calculoDeParcelas() {
        // revelaçao da etiqueta de parcelas
        if (formaDePagamento.value == 'credito' && comanda.parcelas != 0 && comanda.valorBruto != 0) {
            let valorDeParcela
            if (((comanda.valorBruto/comanda.parcelas).toFixed(2))*comanda.parcelas < comanda.valorBruto) {valorDeParcela = Math.ceil(comanda.valorBruto/comanda.parcelas).toFixed(2)} else {valorDeParcela = (comanda.valorBruto/comanda.parcelas).toFixed(2)}

            etiquetaDeParcelas.style.display = 'inline'
            etiquetaDeParcelas.innerText = `${comanda.parcelas}x de R$${(valorDeParcela).replace('.', ',')}`
        }
    }

    function calculoDeDesconto() {
        console.log('teste de desconto')
            comanda.registro.push(new registroDeComanda('--', '--', `Desconto de ${descontoDoOrçamento[0].value}%`, -(comanda.valorBruto * parseInt(descontoDoOrçamento[0].value)) / 100))
            novaLinha(index)
            console.log(comanda.registro)
    }

    var formaDePagamento = window.document.getElementById('pagamento')
    var descontoDoOrçamento = [window.document.getElementById('descontos_debito'), window.document.getElementById('descontos_dinheiro')]
    var parcelasDoOrçamento = window.document.getElementById('parcelas')
    var etiquetaDeParcelas = window.document.getElementById('etiqueda_parcela')

    if (index == 'pagamento' || index == 'parcelas' || index == 'desconto') {
        console.log(`Funçao orçamento acionada pela forma de pagamento ${formaDePagamento.value}`)

        // escolha da forma de pagamento. isso altomaticamente zera o valor dos descontos e das parcelas
        if (formaDePagamento.value == 'credito') { 
            
            // quando a forma de pagamento for credito, troca-se os descontos pelas parcelas
            document.getElementById('descontos_debito').style.display = 'none'
            document.getElementById('descontos_dinheiro').style.display = 'none'
            document.getElementById('parcelas').style.display = 'inline-block'

            if (parcelasDoOrçamento.value == 0) {etiquetaDeParcelas.style.display = 'none'}

            // todos os valores sao redefinidos
            descontoDoOrçamento[0].value = '0'
            descontoDoOrçamento[1].value = '0'
            comanda.descontoPorcento = 0
            comanda.parcelas = parseInt(parcelasDoOrçamento.value)
            
            if (comanda.valorBruto > 0 && comanda.parcelas > 0) {calculoDeParcelas()}

        } else if (formaDePagamento.value == 'debito') {

            // quando a forma de pagamento for debito, troca-se as parcelas pelos descontos
            document.getElementById('descontos_debito').style.display = 'inline-block'
            document.getElementById('descontos_dinheiro').style.display = 'none'
            document.getElementById('parcelas').style.display = 'none'

            // todos os valores sao redefinidos
            etiquetaDeParcelas.style.display = 'none'
            descontoDoOrçamento[1].value = '0'
            parcelasDoOrçamento.value = '0'
            comanda.parcelas = 0
            comanda.descontoPorcento = parseInt(descontoDoOrçamento[0].value)

            if (parseInt(descontoDoOrçamento[0].value)) {calculoDeDesconto()}
        } else {
            document.getElementById('descontos_debito').style.display = 'none'
            document.getElementById('descontos_dinheiro').style.display = 'inline-block'
            document.getElementById('parcelas').style.display = 'none'

            // todos os valores sao redefinidos
            etiquetaDeParcelas.style.display = 'none'
            descontoDoOrçamento[0].value = '0'
            parcelasDoOrçamento.value = '0'
            comanda.parcelas = 0
            comanda.descontoPorcento = parseInt(descontoDoOrçamento[1].value)
        }
        console.log(`numero de parcelas: ${comanda.parcelas}x\ndesconto total: ${comanda.descontoPorcento}%`)
    }

    //======================|Area de ediçao de tabela|====================================
    else if (ediçao) {
        let corretor = window.document.getElementById(`${ediçao}_orçamento_edit_${index}`)

        if (ediçao == 'quantidade' && corretor.value == 0) {
            
            if (((comanda.registro[index].descrição).toLowerCase()).split(' ')[0] == 'desconto' && parseFloat(((comanda.registro[index].descrição).split(' ')[((comanda.registro[index].descrição).split(' ')).length - 1]).split('%')) >= 0) {
                let antigaPorcentagem = (comanda.registro[index].descrição).split(' ')[((comanda.registro[index].descrição).split(' ')).length -1]
                comanda.descontoPorcento -= parseFloat(antigaPorcentagem.split('%'))
            } else {
                if (comanda.registro[index].unitario < 0) {
                    comanda.descontoReal -= comanda.registro[index].unitario
                }
            }
            comanda.registro.splice(index, 1)
            indiceOrçamento -= 2
            novaLinha(index)

        } else if (corretor.value != '') {
            switch (ediçao) {
            case 'quantidade':
                comanda.registro[index].quantidade = corretor.value
                comanda.registro[index].total = (comanda.registro[index].unitario * comanda.registro[index].quantidade).toFixed(2)
                break
            case 'grandeza':
                comanda.registro[index].grandeza = window.document.getElementById(`grandeza_orçamento_edit_${index}`).value
                break
            case 'descrição':
                let descriçãoCorreçao = window.document.getElementById(`descrição_orçamento_edit_${index}`).value
                let antigaPorcentagem = (comanda.registro[index].descrição).split(' ')

                comanda.registro[index].descrição = descriçãoCorreçao

                if (((descriçãoCorreçao).toLowerCase()).split(' ')[0] == 'desconto') {
                    let novaPorcentagem = (descriçãoCorreçao).split(' ')[((descriçãoCorreçao).split(' ')).length - 1]

                    comanda.descontoPorcento -= parseFloat((antigaPorcentagem[antigaPorcentagem.length - 1]).split('%'))
                            
                    comanda.descontoPorcento += parseFloat(novaPorcentagem.split('%'))

                    comanda.registro[index].unitario = -(parseFloat(novaPorcentagem.split('%')[0]) * comanda.valorBruto / 100) 
                    comanda.registro[index].total = (comanda.registro[index].unitario * comanda.registro[index].quantidade).toFixed(2)
                }
                break
            case 'unitario':
                comanda.registro[index].unitario = window.document.getElementById(`unitario_orçamento_edit_${index}`).value
                comanda.registro[index].total = (comanda.registro[index].unitario * comanda.registro[index].quantidade).toFixed(2)
                break
            case 'total':
                comanda.registro[index].total = window.document.getElementById(`total_orçamento_edit_${index}`).value
                break
            }
            console.log(`valor ${corretor.value} editado com susseso`)
            
            document.getElementById(`${ediçao}_orçamento_${index}`).style.display = 'inline-block'
            document.getElementById(`${ediçao}_orçamento_edit_${index}`).style.display = 'none'
        } else {
            document.getElementById(`${ediçao}_orçamento_${index}`).style.display = 'inline-block'
            document.getElementById(`${ediçao}_orçamento_edit_${index}`).style.display = 'none'
        }

        // Aqui o valor total e recalculado no caso de ediçao da tabela
        comanda.valorBruto = 0
        for (let index in comanda.registro) {
            if (comanda.registro[index].total > 0) {comanda.valorBruto += parseFloat(comanda.registro[index].total)}   
        }
        
        novaLinha(index)
        comanda.valorLiquido = ((comanda.valorBruto + comanda.descontoReal) * (100 - comanda.descontoPorcento)) / 100
        document.getElementById('total_total').innerText = `Total: R$ ${((comanda.valorLiquido).toFixed(2)).replace('.', ',')}`
    }

    //=======================|Fim da area de ediçao da tabela|======================================
    else {
        var quantidade = window.document.getElementById(`quantidade_orçamento_${index}`)
        var grandeza = window.document.getElementById(`grandeza_orçamento_${index}`)
        var descrição = window.document.getElementById(`descrição_orçamento_${index}`)
        var valorUnitario = window.document.getElementById(`unitario_orçamento_${index}`)
        var valorTotal = window.document.getElementById(`total_orçamento_${index}`)

        inputToLabel()
        
        let descontoDescrito = ((descrição.value).toLowerCase()).split(' ')

        // pulando as entradas
        if (quantidade.value == 0) {quantidade.value = 1}
        if (grandeza.value == '') {grandeza.select()}
        else if (descrição.value == '') {descrição.select()}

        // o calculo de desconto esta sendo integrado a declaraçao da tabela
        else if (descontoDescrito[0] == 'desconto' && parseInt((descontoDescrito[descontoDescrito.length -1]).split('%')) >= 0)  {
            try {
                // este codigo define a porcentagem
                let porcentagem = (descrição.value).split(' ')[((descrição.value).split(' ')).length - 1] 

                // este codigo exibe a porcentagem no console
                console.log(`Valor descontado de R$ ${parseFloat(parseInt(porcentagem.split('%')[0]) * comanda.valorBruto / 100).toFixed(2)}`) 

                // este codigo trasforma ele em um valor real no registro
                valorUnitario.value = -(parseFloat(porcentagem.split('%')[0]) * comanda.valorBruto / 100)
                
                //comanda.descontoPorcento = parseFloat(parseInt(porcentagem.split('%')[0]) * comanda.valorBruto / 100).toFixed(2)
                comanda.descontoPorcento += parseFloat(porcentagem.split('%')[0])
            } catch {window.alert('Entrada de desconto invalida')}
        }
        else if (valorUnitario.value == 0) {
            valorUnitario.value = null
            valorUnitario.select()
        }

        // registro dos valores
        if (!comanda.registro[index]) {
            if (valorUnitario.value != 0) {console.log(valorUnitario.value)
                if ((grandeza.value).replace(' ', '') == '') {grandeza.value = '--'}
                
                comanda.registro.push(new registroDeComanda(quantidade.value, grandeza.value, descrição.value, valorUnitario.value))

                if (descontoDescrito[0] == 'desconto' && parseInt((descontoDescrito[descontoDescrito.length -1]).split('%')) >= 0) {null}
                else {
                    if (valorUnitario.value > 0) {comanda.valorBruto += parseFloat(comanda.registro[index].total)}
                    else if (valorUnitario.value < 0) {comanda.descontoReal += parseFloat(valorUnitario.value)}
                }

                comanda.valorLiquido = ((comanda.valorBruto + comanda.descontoReal) * (100 - comanda.descontoPorcento)) / 100
                window.document.getElementById('total_total').innerText = `Total: R$ ${((comanda.valorLiquido).toFixed(2)).replace('.', ',')}`
                console.log(comanda)
            }
        }
    }
    
    if (indiceOrçamento == comanda.registro.length) {
        novaLinha(index)
        indiceOrçamento++
    }

    calculoDeParcelas()
}

function novaLinha(index) {
    // criaçao de uma nova linha
    var grade = window.document.getElementById('grade_de_entrada')
    console.log('|========================|Nova Linha|========================|')

    // escrevendo o cabesalhio
    grade.innerHTML = `
        <tr id="legenda_do_orçamento">
            <th id="label_quantidade" class="coluna_quantidade">Quant.</th>
            <th id="label_grandeza" class="coluna_grandeza">Uni.</th>
            <th id="label_descrição" class="coluna_descrição">Descrição</th>
            <th id="label_unitario" class="coluna_unitario">Valor</th>
            <th id="label_total" class="coluna_total">Total</th>
        </tr>
    `

    let temosPositivos = false
    // O primeiro laço for escreve os valores positivos
    for (let index in comanda.registro) {
        if (comanda.registro[index].unitario > 0) {
            temosPositivos = true
            grade.innerHTML += `
                <tr>
                    <td class="coluna_quantidade">
                        <label id="quantidade_orçamento_${index}" class="entradaOrçamento" onclick="ediçaoDeTabela(${index}, 'quantidade')">${comanda.registro[index].quantidade}</label>
                        <input type="number" value="${comanda.registro[index].quantidade}" id="quantidade_orçamento_edit_${index}" class="entradaOrçamento" onchange="orçamento(${index}, 'quantidade')">
                    </td>
                    <td class="coluna_grandeza">
                        <label id="grandeza_orçamento_${index}" class="entradaOrçamento" onclick="ediçaoDeTabela(${index}, 'grandeza')">${comanda.registro[index].grandeza}</label>
                        <input type="text" value="${comanda.registro[index].grandeza}" id="grandeza_orçamento_edit_${index}" class="entradaOrçamento" onchange="orçamento(${index}, 'grandeza')">
                    </td>
                    <td class="coluna_descrição">
                        <label id="descrição_orçamento_${index}" class="entradaOrçamento" onclick="ediçaoDeTabela(${index}, 'descrição')">${comanda.registro[index].descrição}</label>
                        <input type="text" value="${comanda.registro[index].descrição}" id="descrição_orçamento_edit_${index}" class="entradaOrçamento" onchange="orçamento(${index}, 'descrição')">
                    </td>
                    <td class="coluna_unitario">
                        <label id="unitario_orçamento_${index}" class="entradaOrçamento" onclick="ediçaoDeTabela(${index}, 'unitario')">R$ ${(parseFloat(comanda.registro[index].unitario).toFixed(2)).replace('.', ',')}</label>
                        <input type="number" value="${(parseFloat(comanda.registro[index].unitario)).toFixed(2)}" id="unitario_orçamento_edit_${index}" class="entradaOrçamento" onchange="orçamento(${index}, 'unitario')">
                    </td>
                    <td class="coluna_total">
                        <label id="total_orçamento_${index}" class="entradaOrçamento" onclick="ediçaoDeTabela(${index}, 'total')">R$ ${(comanda.registro[index].total).replace('.', ',')}</label>
                        <input type="number" value="${comanda.registro[index].total}" id="total_orçamento_edit_${index}" class="entradaOrçamento" onchange="orçamento(${index}, 'total')">
                    </td>
                </tr>
            `
            document.getElementById(`quantidade_orçamento_edit_${index}`).style.display = 'none'

            document.getElementById(`grandeza_orçamento_edit_${index}`).style.display = 'none'

            document.getElementById(`descrição_orçamento_edit_${index}`).style.display = 'none'
            
            document.getElementById(`unitario_orçamento_edit_${index}`).style.display = 'none'

            document.getElementById(`total_orçamento_edit_${index}`).style.display = 'none'
        }
    }

    // o segundo laço for escreve os valores negativos
    for (let index in comanda.registro) {
        if (comanda.registro[index].unitario < 0) {

            // este pequeno codigo de 3 linha corrige o valor do desconto unitario quando a alteraçao do valor total no registro
            let descrição = ((comanda.registro[index].descrição).toLowerCase()).split(' ')
            if (descrição[0] == 'desconto' && parseFloat((descrição[descrição.length - 1]).split('%')) >= 0) {
                let porcentagem = parseFloat(((comanda.registro[index].descrição).split(' ')[((comanda.registro[index].descrição).split(' ')).length - 1]).split('%'))
                comanda.registro[index].unitario = -((comanda.valorBruto + comanda.descontoReal) * porcentagem / 100)
                comanda.registro[index].total = (comanda.registro[index].unitario * comanda.registro[index].quantidade).toFixed(2)
            }

            grade.innerHTML += `
                <tr>
                    <td class="coluna_quantidade">
                        <label id="quantidade_orçamento_${index}" class="entradaOrçamento" onclick="ediçaoDeTabela(${index}, 'quantidade')">${comanda.registro[index].quantidade}</label>
                        <input type="number" value="${comanda.registro[index].quantidade}" id="quantidade_orçamento_edit_${index}" class="entradaOrçamento" onchange="orçamento(${index}, 'quantidade')">
                    </td>
                    <td class="coluna_grandeza">
                        <label id="grandeza_orçamento_${index}" class="entradaOrçamento" onclick="ediçaoDeTabela(${index}, 'grandeza')">${comanda.registro[index].grandeza}</label>
                        <input type="text" value="${comanda.registro[index].grandeza}" id="grandeza_orçamento_edit_${index}" class="entradaOrçamento" onchange="orçamento(${index}, 'grandeza')">
                    </td>
                    <td class="coluna_descrição">
                        <label id="descrição_orçamento_${index}" class="entradaOrçamento" onclick="ediçaoDeTabela(${index}, 'descrição')">${comanda.registro[index].descrição}</label>
                        <input type="text" value="${comanda.registro[index].descrição}" id="descrição_orçamento_edit_${index}" class="entradaOrçamento" onchange="orçamento(${index}, 'descrição')">
                    </td>
                    <td class="coluna_unitario">
                        <label id="unitario_orçamento_${index}" class="entradaOrçamento" onclick="ediçaoDeTabela(${index}, 'unitario')">R$ ${(parseFloat(comanda.registro[index].unitario).toFixed(2)).replace('.', ',')}</label>
                        <input type="number" value="${(parseFloat(comanda.registro[index].unitario)).toFixed(2)}" id="unitario_orçamento_edit_${index}" class="entradaOrçamento" onchange="orçamento(${index}, 'unitario')">
                    </td>
                    <td class="coluna_total">
                        <label id="total_orçamento_${index}" class="entradaOrçamento" onclick="ediçaoDeTabela(${index}, 'total')">R$ ${(comanda.registro[index].total).replace('.', ',')}</label>
                        <input type="number" value="${comanda.registro[index].total}" id="total_orçamento_edit_${index}" class="entradaOrçamento" onchange="orçamento(${index}, 'total')">
                    </td>
                </tr>
            `
            document.getElementById(`quantidade_orçamento_edit_${index}`).style.display = 'none'

            document.getElementById(`grandeza_orçamento_edit_${index}`).style.display = 'none'

            document.getElementById(`descrição_orçamento_edit_${index}`).style.display = 'none'
            
            document.getElementById(`unitario_orçamento_edit_${index}`).style.display = 'none'

            document.getElementById(`total_orçamento_edit_${index}`).style.display = 'none'
        }
    }

    // escrevendo a ultima linha em branco
    grade.innerHTML += `
    <tr>
        <td class="coluna_quantidade">
            <input type="number" id="quantidade_orçamento_${indiceOrçamento}" value="" class="entradaOrçamento" onchange="orçamento(${indiceOrçamento})">
        </td>
        <td class="coluna_grandeza">
            <input type="text" id="grandeza_orçamento_${indiceOrçamento}" value="" class="entradaOrçamento" onchange="orçamento(${indiceOrçamento})">
        </td>
        <td class="coluna_descrição">
            <input type="text" id="descrição_orçamento_${indiceOrçamento}" class="entradaOrçamento" onchange="orçamento(${indiceOrçamento})">
        </td>
        <td class="coluna_unitario">
            <input type="number" id="unitario_orçamento_${indiceOrçamento}" value="" class="entradaOrçamento" onchange="orçamento(${indiceOrçamento})">
        </td>
        <td class="coluna_total">
            <input type="number" id="total_orçamento_${indiceOrçamento}" value="" class="entradaOrçamento" onchange="orçamento(${indiceOrçamento})">
        </td>
    </tr>
    `

    window.document.getElementById(`quantidade_orçamento_${indiceOrçamento}`).select()
}

function ediçaoDeTabela(index, ediçao) {
    inputToLabel()

    document.getElementById(`${ediçao}_orçamento_${index}`).style.display = 'none'
    document.getElementById(`${ediçao}_orçamento_edit_${index}`).style.display = 'inline-block'
    document.getElementById(`${ediçao}_orçamento_edit_${index}`).select()
}

function printPdf() {
    console.log(`${window.document.getElementById('observaçao').value}`)
    var cliente = new Cliente(
        window.document.getElementById('nome').value, 
        window.document.getElementById('contato').value, 
        window.document.getElementById('endereço').value
        )

    let tabela = ''
    for (let index in comanda.registro) {
        console.log(comanda.registro[index])
        tabela += `<tr id="legenda_do_orçamento">
                <td id="var_quantidade" class="orçamento" style="text-align: center;">${comanda.registro[index].quantidade}</td>
                <td id="var_grandeza" class="orçamento" style="text-align: center;">${comanda.registro[index].grandeza}</td>
                <td id="var_descrição" class="orçamento">${comanda.registro[index].descrição}</td>
                <td id="var_unitario" class="orçamento">R$ ${((parseFloat(comanda.registro[index].unitario)).toFixed(2)).replace('.', ',')}</td>
                <td id="var_total" class="orçamento">R$ ${((parseFloat(comanda.registro[index].total)).toFixed(2)).replace('.', ',')}</td>
            </tr>`
    } 

    let formaDePagamento = ``
    if (comanda.parcelas != 0) {
        let valorDeParcela
        if (((comanda.valorBruto/comanda.parcelas).toFixed(2))*comanda.parcelas < comanda.valorBruto) {valorDeParcela = Math.ceil(comanda.valorBruto/comanda.parcelas).toFixed(2)} else {valorDeParcela = (comanda.valorBruto/comanda.parcelas).toFixed(2)}

        formaDePagamento += `Forma de pagamento:<br>Crédito, em ${comanda.parcelas}x de R$${(valorDeParcela).replace('.', ',')} s/juros`

    } else {parcelasNoPdf = ''}

    let ob
    if (window.document.getElementById('observaçao').value == '') {
        ob = ``
    } else {
        ob = `<h2>Observação</h2><p class="observaçao" style="border: 2px dashed #9e9c9c;">${window.document.getElementById('observaçao').value}</p>`
    }

    const rascunho = `<!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>orçamento_${cliente.nome}_${dataAtual}</title>
        <link href="https://db.onlinewebfonts.com/c/5d581e5a140723d14358ddbf1b0d15ee?family=gc16-Mono" rel="stylesheet">
        <link href="https://db.onlinewebfonts.com/c/51eab992a8b6cf5094d8aada3ee52856?family=Society" rel="stylesheet">
        <style type="text/css"> 
            @font-face {font-family: 'luxi';src: url(fonts/Luxi-Mono/luximr.ttf) format('TrueType');}
            
            * {
                margin: 0; 
                padding: 0;
                text-indent: 0; 
            }
    
            p { 
                font-family:'Times New Roman', Times, serif; 
                font-size: 1.2em;
            }
            
            header {
                background-color: #446b2f;
                background-image: linear-gradient(90deg, #325121 5%, transparent);
                padding: 20px 0px;
            }
    
            h1 {
                text-shadow: -1px 3px 0px #00000057;
                padding: 0px 0px 15px 20px;
                color: #f0c300; 
                font-family: Society; 
                font-style: normal; 
                font-weight: normal; 
                text-decoration: none; 
                font-size: 5.1em;
            }
        
            h2 {
                margin: 0px 20px;
                font-family: 'Times New Roman', Times, serif;
                font-style: normal;
                font-weight: normal;
                text-decoration: none;
                font-size: 1.4em;
            }
    
            table {
                border-collapse: collapse;
            }
        
            .cabeçalio {
                color: #ffffff;
                text-shadow: 1px 1px 1px #000000ba;
                font-family: 'Times New Roman', Times, serif;                
                font-size: 1em;
                padding: 0px 0px 0px 20px;
            }
    
            .cliente {
                font-family: 'Times New Roman', Times, serif;
                padding: 20px 20px 10px 0px;
                margin-left: 20px;
            }

            .observaçao {
                font-family: 'Times New Roman', Times, serif;
                padding: 10px;
                margin: 0px 20px 20px 20px;
                white-space: pre-line;
            }
    
            .total {
                margin: 0px 20px;
                padding: 20px 0px 5px 0px;
                font-size: 1.5em;
                /* padding-left: 20pt; */
                text-indent: 0pt;
                text-align: left;
                font-family: 'Times New Roman', Times, serif;
                border-bottom: 2px dashed #9e9c9c;
            }
    
            #orçamento {
                margin: 20px;
            }
            
            .orçamento {
                padding: 2px 5px;
                font-size: 1em;
                font-family: 'Times New Roman', Times, serif;
                border-width: 2px;
                border-color: black;
                border-style: solid;
                text-align: left;
            }
    
            #legenda_do_orçamento {
                margin-top: 5px;
            }
    
            #label_quantidade, #var_quantidade {
                width: 5%;
            }

            #label_grandeza, #var_grandeza{
                width: 5%
            }
    
            #label_descrição, #var_descrição {
                width: 45%;
                
            }
    
            #label_unitario, #var_unitario {
                width: 14%;
            }
    
            #label_total, #var_total {
                width: 14%;
            }
    
        </style>
    </head>
    <body onclick="imprimir()">
        <header>
            <h1>André Garden</h1>
            <p class="cabeçalio">ANDRÉ DE ASSIS PEREIRA JARDINAGEM EIRELI</p>
            <p class="cabeçalio">Av. João Batista leal - 523, Centro Itanhaém SP</p>
            <p class="cabeçalio">Contato: (13) 97408-6628</p>
        </header>
        <p class="cliente">Cliente: ${cliente.nome}<br>Contato: ${cliente.contato}<br>Endereço: ${cliente.endereço}<br></p>
        <p class="observaçao" style="border-bottom: 2px dashed #9e9c9c;"></p>
        <table id="orçamento">
            <tr id="legenda_do_orçamento">
                <th id="label_quantidade" class="orçamento">Quant.</th>
                <th id="label_grandeza" class="orçamento">Uni.</th>
                <th id="label_descrição" class="orçamento">Descrição</th>
                <th id="label_unitario" class="orçamento">Unitario</th>
                <th id="label_total" class="orçamento">Total</th>
            </tr>
            ${tabela}
        </table>     
        <p class="total">Total: R$ ${((comanda.valorLiquido).toFixed(2)).replace('.', ',')}</p>
        <p style="margin: 25px;">${formaDePagamento}</p>
        ${ob}
        <script>
        function imprimir() {
            window.print()
            window.close()
            }
        </script>
    </body>
    </html>`

    const win = window.open('', '', 'height=700,width=700');
    win.document.write(rascunho);
}

//====================================================||Comandos||================================================

impreção(articleDiversos, diversos, 'diversos')
impreção(articleRegaplan, regaplan, 'regaplan')
impreção(articleEmeAEme, emeAeme, 'emeAeme')
impreção(articleForth, forth, 'forth')
impreção(articleFuzil, fuzil, 'fuzil')
impreção(articleAlfa_cestas, alfa_cestas, 'alfa_cestas')
impreção(articleAlfa_polietileno, alfa_polietileno, 'alfa_polietileno')
impreção(articleAlfa_fibraSintetica, alfa_fibraSintetica, 'alfa_fibraSintetica')
impreção(articleRischioto, rischioto, 'rischioto')
impreção(articleJelPlast, jel_plast, 'jel_plast')
impreção(articlePolicamp, policamp, 'policamp')
impreção(articleInsetimax, insetimax, 'insetimax')
impreção(articleMadeiras, madeiras, 'madeiras')
impreção(articleNutriplan, nutriplan, 'nutriplan')
impreção(articleCoquim, coquim, 'coquim')
console.log(dataAtual);
