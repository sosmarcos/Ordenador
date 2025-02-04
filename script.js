//================================================||Clases||======================================================

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
        if (descrição == '') {this.descrição = 'Sem Descrição'} else {this.descrição = descrição}
    }
}

class Comanda {
    constructor() {
        this.registro = []
        this.valor = 0
        this.desconto = 0
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
var sectCalculo = window.document.getElementById('calculadora')
var sectComanda = window.document.getElementById('orçamento')

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

function sectionExpand(section) {
    if (section == 'home_page') {
        sectHomepage.style.display = 'block'
        
        sectCalculo.style.display = 'none'
        sectComanda.style.display = 'none'
    } else if (section == 'calculadora'){
        if (sectCalculo.style.display == 'block') {
            sectCalculo.style.display = 'none'
            console.log('\u001b[34mfunction\u001b[33m sectionExpand\u001b[37m diz:\nCalculadora fechada.')

        } else {
            sectCalculo.style.display = 'block'
            console.log('\u001b[34mfunction\u001b[33m sectionExpand\u001b[37m diz:\nCalculadora Aberta.')
            document.getElementById('entrada').select()
        }
    } else if (section =='orçamento') {
        console.log('\u001b[34mfunction\u001b[33m sectionExpand\u001b[37m diz:\nTabela de comanda Aberta.')

        sectComanda.style.display = 'block'
        sectCalculo.style.display = 'none'

        document.getElementById(`quantidade_orçamento_${comanda.registro.length}`).select()
    }
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
            comanda.desconto = 0
            comanda.parcelas = parseInt(parcelasDoOrçamento.value)
            
            if (comanda.valor > 0 && comanda.parcelas > 0) {calculoDeParcelas()}

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
            comanda.desconto = parseInt(descontoDoOrçamento[0].value)

        } else {
            document.getElementById('descontos_debito').style.display = 'none'
            document.getElementById('descontos_dinheiro').style.display = 'inline-block'
            document.getElementById('parcelas').style.display = 'none'

            // todos os valores sao redefinidos
            etiquetaDeParcelas.style.display = 'none'
            descontoDoOrçamento[0].value = '0'
            parcelasDoOrçamento.value = '0'
            comanda.parcelas = 0
            comanda.desconto = parseInt(descontoDoOrçamento[1].value)
        }
        console.log(`numero de parcelas: ${comanda.parcelas}x\ndesconto total: ${comanda.desconto}%`)
    }

    else if (ediçao) {
        let corretor = window.document.getElementById(`${ediçao}_orçamento_edit_${index}`)

        if (ediçao == 'quantidade' && corretor.value == 0) {
            comanda.registro.splice(index, 1)
            indiceOrçamento -= 2
            //novaLinha(index)

            console.log(`\u001b[34mfunction\u001b[33m orçamento\u001b[37m diz:\nRegistro da \u001b[34mClase \u001b[32mComanda\u001b[37m acionado pela linha \u001b[33m${index}\u001b[37m da Tabela.
                \nLinha \u001b[33m${index}\u001b[37m apagada com sucesso.`)
        } else if (corretor.value != '') {
            switch (ediçao) {
            case 'quantidade':
                comanda.registro[index].quantidade = corretor.value
                comanda.registro[index].total = (comanda.registro[index].unitario * comanda.registro[index].quantidade).toFixed(2)

                document.getElementById(`${ediçao}_orçamento_${index}`).innerText = comanda.registro[index].quantidade
                document.getElementById(`total_orçamento_${index}`).innerText = `R$ ${(comanda.registro[index].total).replace('.', ',')}`
                break
            case 'grandeza':
                comanda.registro[index].grandeza = window.document.getElementById(`grandeza_orçamento_edit_${index}`).value

                document.getElementById(`grandeza_orçamento_${index}`).innerText = comanda.registro[index].grandeza
                break
            case 'descrição':
                comanda.registro[index].descrição = window.document.getElementById(`descrição_orçamento_edit_${index}`).value

                document.getElementById(`descrição_orçamento_${index}`).innerText = comanda.registro[index].descrição
                break
            case 'unitario':
                comanda.registro[index].unitario = window.document.getElementById(`unitario_orçamento_edit_${index}`).value
                comanda.registro[index].total = (comanda.registro[index].unitario * comanda.registro[index].quantidade).toFixed(2)

                document.getElementById(`${ediçao}_orçamento_${index}`).innerText = `R$ ${(parseFloat(comanda.registro[index].unitario).toFixed(2)).replace('.', ',')}`
                document.getElementById(`total_orçamento_${index}`).innerText = `R$ ${(comanda.registro[index].total).replace('.', ',')}`
                break
            case 'total':
                comanda.registro[index].total = window.document.getElementById(`total_orçamento_edit_${index}`).value
                break
            }
            console.log(`\u001b[34mfunction\u001b[33m orçamento\u001b[37m diz:\nValor \u001b[36m"${corretor.value}"\u001b[37m adicionado à \u001b[36m${ediçao}\u001b[37m com sucesso.`)
            
            document.getElementById(`${ediçao}_orçamento_${index}`).style.display = 'inline-block'
            document.getElementById(`${ediçao}_orçamento_edit_${index}`).style.display = 'none'
        } else {
            document.getElementById(`${ediçao}_orçamento_${index}`).style.display = 'inline-block'
            document.getElementById(`${ediçao}_orçamento_edit_${index}`).style.display = 'none'
        }

        comanda.valor = 0
        for (let index in comanda.registro) {
            comanda.valor += parseFloat(comanda.registro[index].total)
        }
        
        document.getElementById('total_total').innerText = `Total: R$ ${(comanda.valor.toFixed(2)).replace('.', ',')}`
    }
    else {
        var quantidade = window.document.getElementById(`quantidade_orçamento_${index}`)
        var grandeza = window.document.getElementById(`grandeza_orçamento_${index}`)
        var descrição = window.document.getElementById(`descrição_orçamento_${index}`)
        var valorUnitario = window.document.getElementById(`unitario_orçamento_${index}`)
        var valorTotal = window.document.getElementById(`total_orçamento_${index}`)

        inputToLabel()
    
        // pulando as entradas
        if (quantidade.value == 0) {quantidade.value = 1}
        if (grandeza.value == '') {grandeza.select()}
        else if (descrição.value == '') {descrição.select()}
        else if (valorUnitario.value == 0) {
            valorUnitario.value = null
            valorUnitario.select()
        }

        // registro dos valores
        if (!comanda.registro[index]) {
            if (valorUnitario.value != 0) {
                comanda.registro.push(new registroDeComanda(quantidade.value, grandeza.value, descrição.value, valorUnitario.value))
                comanda.valor += parseFloat(comanda.registro[index].total)
                window.document.getElementById('total_total').innerText = `Total: R$ ${(comanda.valor.toFixed(2)).replace('.', ',')}`
            }
        }
    }
    
    if (indiceOrçamento == comanda.registro.length) {
        if (!ediçao) {
            try {
                console.log(`\u001b[34mfunction\u001b[33m orçamento\u001b[37m diz:
Registro da \u001b[34mClase \u001b[32mComanda\u001b[37m acionado pela linha \u001b[33m${index}\u001b[37m da Tabela.

quantidade: \u001b[36m${quantidade.value}\u001b[37m
grandeza: \u001b[36m${grandeza.value}\u001b[37m
descrição: \u001b[36m${descrição.value}\u001b[37m
valorUnitario: \u001b[36m${valorUnitario.value}\u001b[37m
valorTotal: \u001b[36m${valorTotal.value}\u001b[37m`)
            }   
            catch (error){console.log(`\u001b[34mfunction\u001b[33m orçamento\u001b[37m diz:
Registro da \u001b[34mClase \u001b[32mComanda\u001b[37m acionado pela linha \u001b[33m${index}\u001b[37m da Tabela
\n\u001b[31mImpossível exibir as informações da tabela\n${error}\u001b[37m`)
            }
        }
        novaLinha(index)
        indiceOrçamento++
    }
}

function novaLinha(index) {
    // criaçao de uma nova linha
    try {
        var grade = window.document.getElementById('grade_de_entrada')
        let cssClassForLabel

        grade.innerHTML = `
            <tr id="legenda_do_orçamento">
                <th id="label_quantidade" class="coluna_quantidade">Quant.</th>
                <th id="label_grandeza" class="coluna_grandeza">Uni.</th>
                <th id="label_descrição" class="coluna_descrição">Descrição</th>
                <th id="label_unitario" class="coluna_unitario">Valor</th>
                <th id="label_total" class="coluna_total">Total</th>
            </tr>
        `
        for (let index in comanda.registro) {
            if (comanda.registro[index].unitario > 0) {cssClassForLabel = 'entradaOrçamento'} else {cssClassForLabel = 'entradaDescontoNoOrçamento'}
            grade.innerHTML += `
                <tr>
                    <td class="coluna_quantidade">
                        <label id="quantidade_orçamento_${index}" class="${cssClassForLabel}" onclick="ediçaoDeTabela(${index}, 'quantidade')">${comanda.registro[index].quantidade}</label>
                        <input type="number" value="${comanda.registro[index].quantidade}" id="quantidade_orçamento_edit_${index}" class="entradaOrçamento" onchange="orçamento(${index}, 'quantidade')">
                    </td>
                    <td class="coluna_grandeza">
                        <label id="grandeza_orçamento_${index}" class="${cssClassForLabel}" onclick="ediçaoDeTabela(${index}, 'grandeza')">${comanda.registro[index].grandeza}</label>
                        <input type="text" value="${comanda.registro[index].grandeza}" id="grandeza_orçamento_edit_${index}" class="entradaOrçamento" onchange="orçamento(${index}, 'grandeza')">
                    </td>
                    <td class="coluna_descrição">
                        <label id="descrição_orçamento_${index}" class="${cssClassForLabel}" onclick="ediçaoDeTabela(${index}, 'descrição')">${comanda.registro[index].descrição}</label>
                        <input type="text" value="${comanda.registro[index].descrição}" id="descrição_orçamento_edit_${index}" class="entradaOrçamento" onchange="orçamento(${index}, 'descrição')">
                    </td>
                    <td class="coluna_unitario">
                        <label id="unitario_orçamento_${index}" class="${cssClassForLabel}" onclick="ediçaoDeTabela(${index}, 'unitario')">R$ ${(parseFloat(comanda.registro[index].unitario).toFixed(2)).replace('.', ',')}</label>
                        <input type="number" value="${(parseFloat(comanda.registro[index].unitario)).toFixed(2)}" id="unitario_orçamento_edit_${index}" class="entradaOrçamento" onchange="orçamento(${index}, 'unitario')">
                    </td>
                    <td class="coluna_total">
                        <label id="total_orçamento_${index}" class="${cssClassForLabel}" onclick="ediçaoDeTabela(${index}, 'total')">R$ ${(comanda.registro[index].total).replace('.', ',')}</label>
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
        console.log('\u001b[34mfunction\u001b[33m novaLinha\u001b[37m diz:\nNova linha criada com sucesso.')
        window.document.getElementById(`quantidade_orçamento_${indiceOrçamento}`).select()
    } catch (error) {
        console.log(`\u001b[34mfunction\u001b[33m novaLinha\u001b[37m diz:\nUm erro impediu a criação de uma nova linha.
            \n\u001b[31m${error}\u001b[37m`)
    }
}

function ediçaoDeTabela(index, ediçao) {
    inputToLabel()

    document.getElementById(`${ediçao}_orçamento_${index}`).style.display = 'none'
    document.getElementById(`${ediçao}_orçamento_edit_${index}`).style.display = 'inline-block'
    document.getElementById(`${ediçao}_orçamento_edit_${index}`).select()
}

function printPdf() {
    var cliente = new Cliente(
        window.document.getElementById('nome').value, 
        window.document.getElementById('contato').value, 
        window.document.getElementById('endereço').value
        )

    let tabela = ''
    for (let index in comanda.registro) {
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
        if (((comanda.valor/comanda.parcelas).toFixed(2))*comanda.parcelas < comanda.valor) {valorDeParcela = Math.ceil(comanda.valor/comanda.parcelas).toFixed(2)} else {valorDeParcela = (comanda.valor/comanda.parcelas).toFixed(2)}

        formaDePagamento += `Forma de pagamento:<br>Crédito, em ${comanda.parcelas}x de R$${(valorDeParcela).replace('.', ',')} s/juros`

    } else {parcelasNoPdf = ''}

    let ob
    if (window.document.getElementById('observaçao').value == '') {
        ob = ``
    } else {
        ob = `<h2>Observação</h2><p class="observaçao" style="border: 2px dashed #9e9c9c;">${window.document.getElementById('observaçao').value}</p>`
    }


    try {
        const rascunho = `<!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <title>orçamento_${cliente.nome}_${dataAtual}</title>
            <link href="https://db.onlinewebfonts.com/c/5d581e5a140723d14358ddbf1b0d15ee?family=gc16-Mono" rel="stylesheet">
            <link href="https://db.onlinewebfonts.com/c/51eab992a8b6cf5094d8aada3ee52856?family=Society" rel="stylesheet">
            <style type="text/css"> 
                @font-face {font-family: 'luxi';src: url(fonts/Luxi-Mono/luximr.ttf) format('TrueType');}
                @font-face {font-family: 'FONTANA';src: url(fonts/FONTANA.otf) format('TrueType');}

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
                    background-color:rgb(4, 39, 84);
                    background-image: linear-gradient(90deg,rgb(4, 33, 72) 5%, transparent);
                    padding: 20px 0px;
                }
        
                h1 {
                    display: inline;
                    text-shadow: -1px 3px 0px #00000057;
                    padding: 0px 0px 15px 20px;
                    color: #edd56e; 
                    font-family: FONTANA; 
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
                
                <h1 style="margin: -20px;"><img src="imagens/florescer_logo_Letterless_transparent_mini.png" alt="" ></h1>
                <h1 style="margin: -45px;">JARDINAGEM FLORESCER</h1>
                <p class="cabeçalio" style="margin-top: 20px;">JARDINAGEM FLORESCER</p>
                <p class="cabeçalio">Rua Almeida Junior - 118, Belas Artes Itanhaém SP</p>
                <p class="cabeçalio">Contato: (13) 9 9709-8943</p>
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
            <p class="total">Total: R$ ${((comanda.valor).toFixed(2)).replace('.', ',')}</p>
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
        console.log(`\u001b[34mfunction\u001b[33m printPdf\u001b[37m diz:\nPagina HTML gerada com sucesso.`)
    } 
    catch (erro) {console.log(`\u001b[34mfunction\u001b[33m printPdf\u001b[37m diz:\nUm erro impediu a criação da pagina HTML.
        \n\u001b[31m${erro}\n\u001b[37m`)}
}

//====================================================||Comandos||================================================

console.log(dataAtual);
