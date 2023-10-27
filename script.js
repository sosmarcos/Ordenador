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
var articleRegaplan = window.document.getElementById('regaplan')
var articleRischioto = window.document.getElementById('rischioto')
var articleEmeAEme = window.document.getElementById('eme_a_eme')
var articleForth = window.document.getElementById('forth')
var articleFuzil = window.document.getElementById('fuzil')
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
    'regaplan',
    'rischioto',
    'eme_a_eme',
    'forth',
    'fuzil',
    'alfa_polietileno',
    'alfa_fibraSintetica',
    'jel_plast',
    'policamp',
    'insetimax',
    'madeiras',
    'nutriplan',
    'coquim'
]
var regaplan = new Inventario(
    'Regaplan',
    '26/10/2023',
    [
        new item(90, 'Corrente 44cm - Dourado 1.6mm', 'corrente_1.6mm'),
        new item(42, 'Corrente 54cm - Dourado 1.6mm', 'corrente_1.6mm'),
        new item(78, 'Corrente 64cm - Dourado 1.6mm', 'corrente_1.6mm'),
        new item(73, 'Corrente 74cm - Dourado 1.6mm', 'corrente_1.6mm'),
        new item(89, 'Corrente 84cm - Dourado 1.6mm', 'corrente_1.6mm'),

        new item(102, 'Corrente Lustre 50 - Dourado 2.0mm', 'corrente_2.0mm'),
        new item(102, 'Corrente Lustre 60 - Dourado 2.0mm', 'corrente_2.0mm'),
        new item(90, 'Corrente Lustre 70 - Dourado 2.0mm', 'corrente_2.0mm'),
        new item(83, 'Corrente Lustre 80 - Dourado 2.0mm', 'corrente_2.0mm'),

        new item(3, 'Gancho S Grande - Dourado 18cm', 'gancho_S'),
        new item(0, 'Gancho S Médio - Dourado 10cm', 'gancho_S'),
        new item(8, 'Gancho S Pequeno - Dourado 7cm', 'gancho_S'),

        new item(13, 'Suporte A Reforçado 01 - 19cm Dourado', 'sp_a_reforçado'),
        new item(20, 'Suporte A Reforçado 02 - 24cm Dourado', 'sp_a_reforçado'),
        new item(71, 'Suporte A Reforçado 03 - 29cm Dourado', 'sp_a_reforçado'),
        new item(9, 'Suporte A Reforçado 04 - 34cm Dourado', 'sp_a_reforçado'),

        new item(81, 'Suporte Artístico 00 - 19cm Dourado', 'sp_artistico'),
        new item(98, 'Suporte Artístico 01 - 26cm Dourado', 'sp_artistico'),
        new item(59, 'Suporte Artístico 02 - 31cm Dourado', 'sp_artistico'),
        new item(75, 'Suporte Artístico 03 - 37cm Dourado', 'sp_artistico'),
        new item(88, 'Suporte Artístico 04 - 43cm Dourado', 'sp_artistico'),

        new item(3, 'Suporte Arvore - 3 Vasos Dourado', 'sp_arvore'),
        new item(3, 'Suporte Arvore - 3 Vasos Preto', 'sp_arvore'),
        new item(2, 'Suporte Arvore - 5 Vasos Dourado', 'sp_arvore'),
        new item(4, 'Suporte Arvore - 5 Vasos Preto', 'sp_arvore'),

        new item(3, 'Suporte Coador 26cm Preto', 'sp_coador'),
        new item(0, 'Suporte Coador 28cm Preto', 'sp_coador'),
        new item(6, 'Suporte Coador 30cm Preto', 'sp_coador'),
        new item(0, 'Suporte Coador 32cm Preto', 'sp_coador'),

        new item(12, 'Suporte de Canto 27cm Dourado'),

        new item(2, 'Suporte Margarida 01 - 19 cm Dourado', 'sp_margarida'),
        new item(22, 'Suporte Margarida 02 - 21 cm Dourado', 'sp_margarida'),
        new item(20, 'Suporte Margarida 03 - 23 cm Dourado', 'sp_margarida'),
        new item(17, 'Suporte Margarida 04 - 26 cm Dourado', 'sp_margarida'),

        new item(19, 'Suporte Rasteiro Chapa 01 - 18cm Dourado', 'sp_rasteiro'),
        new item(15, 'Suporte Rasteiro Chapa 02 - 21cm Dourado', 'sp_rasteiro'),
        new item(15, 'Suporte Rasteiro Chapa 03 - 24cm Dourado', 'sp_rasteiro'),
        new item(30, 'Suporte Rasteiro Chapa 04 - 27cm Dourado', 'sp_rasteiro'),
        new item(14, 'Suporte Rasteiro Chapa 05 - 30cm Dourado', 'sp_rasteiro'),
        new item(20, 'Suporte Rasteiro Chapa 06 - 33cm Dourado', 'sp_rasteiro'),
        new item(20, 'Suporte Rasteiro Chapa 07 - 36cm Dourado', 'sp_rasteiro'),
        new item(20, 'Suporte Rasteiro Chapa 08 - 40cm Dourado', 'sp_rasteiro'),

        new item(0, 'Suporte Torre 40cm Dourado', 'sp_torre'),
        new item(0, 'Suporte Torre 40cm Preto', 'sp_torre'),
        new item(0, 'Suporte Torre 60cm Dourado', 'sp_torre'),
        new item(4, 'Suporte Torre 60cm Preto', 'sp_torre'),
        new item(1, 'Suporte Torre 80cm Dourado', 'sp_torre'),
        new item(9, 'Suporte Torre 80cm Preto', 'sp_torre'),
        new item(4, 'Suporte Torre 110cm Dourado', 'sp_torre'),
        new item(10, 'Suporte Torre 110cm Preto', 'sp_torre'),

        new item(0, 'Tripé Decorativo Grande Dourado', 'tp_decorativo'),
        new item(0, 'Tripé Decorativo Grande Preto', 'tp_decorativo'),
        new item(0, 'Tripé Decorativo Médio Dourado', 'tp_decorativo'),
        new item(1, 'Tripé Decorativo Médio Preto', 'tp_decorativo'),
        new item(0, 'Tripé Decorativo Pequeno Dourado', 'tp_decorativo'),
        new item(8, 'Tripé Decorativo Pequeno Preto', 'tp_decorativo'),

        new item(7, 'Tripé Suspenso 01 20x40cm', 'tp_suspenso'),
        new item(7, 'Tripé Suspenso 01 25x40cm', 'tp_suspenso'),
        new item(18, 'Tripé Suspenso 01 30x40cm', 'tp_suspenso'),

        new item(2, 'Violeteiro Com Corrente - 2 Vasos', 'violeteiro'),
        new item(0, 'Violeteiro Com Corrente - 3 Vasos', 'violeteiro'),
        new item(4, 'Violeteiro Com Corrente - 4 Vasos', 'violeteiro'),
        new item(0, 'Violeteiro Com Corrente - 5 Vasos', 'violeteiro'),

        new item(0, 'Violeteiro Pedestal - 3 Vasos Dourado', 'sp_violeteiro'),
        new item(1, 'Violeteiro Pedestal - 3 Vasos Preto', 'sp_violeteiro'),
        new item(0, 'Violeteiro Pedestal - 5 Vasos Dourado', 'sp_violeteiro'),
        new item(0, 'Violeteiro Pedestal - 5 Vasos Preto', 'sp_violeteiro'),
        new item(0, 'Violeteiro Pedestal - 7 Vasos Dourado', 'sp_violeteiro'),
        new item(2, 'Violeteiro Pedestal - 7 Vasos Preto', 'sp_violeteiro'),
        new item(2, 'Violeteiro Pedestal - 9 Vasos Dourado', 'sp_violeteiro'),
        new item(1, 'Violeteiro Pedestal - 9 Vasos Preto', 'sp_violeteiro'),
    ]
)
var rischioto = new Inventario(
    'Rischioto',
    '26/10/2023',
    [
        new item(28, 'Alça Universal Areia', 'alça'),

        new item(0, 'Bacia Floratta 12 litros', 'bacia_florata'),
        new item(0, 'Bacia Floratta 22 litros', 'bacia_florata'),
        new item(0, 'Bacia Floratta 32 litros', 'bacia_florata'),

        new item(0, 'Balde Floratta 8 litros', 'balde_florata'),
        new item(0, 'Balde Floratta 15 litros', 'balde_florata'),

        new item(0, 'Balde n08 - 7.5 litros', 'balde'),
        new item(0, 'Balde n15 - 13.5 litros', 'balde'),

        new item(2, 'Balde Reforçado - 12 litros', 'balde_reforçado'),

        new item(0, 'Banqueta Rattan Marrom', 'banqueta'),

        new item(0, 'Caixa Organizadora - 3.5 litros', 'conteiner'),
        new item(0, 'Caixa Organizadora - 7 litros', 'conteiner'),
        new item(19, 'Caixa Organizadora - 10 litros', 'conteiner'),
        new item(0, 'Caixa Organizadora - 12 litros', 'conteiner'),
        new item(24, 'Caixa Organizadora - 20 litros', 'conteiner'),
        new item(9, 'Caixa Organizadora - 50 litros', 'conteiner'),
        new item(5, 'Caixa Organizadora - 80 litros', 'conteiner'),

        new item(19, 'Caixa Rattan Areia - 2.5 litros', 'caixa_rattan'),
        new item(19, 'Caixa Rattan Areia - 4 litros', 'caixa_rattan'),
        new item(9, 'Caixa Rattan Areia - 7.5 litros', 'caixa_rattan'),
        new item(5, 'Caixa Rattan Areia - 15 litros', 'caixa_rattan'),

        new item(0, 'Cesto Fechado Cinza - 30 litros', 'cesto'),
        new item(0, 'Cesto Fechado Cinza - 54 litros', 'cesto'),
        new item(0, 'Cesto Fechado Cinza - 100 litros', 'cesto'),

        new item(0, 'Cesto Telado - 30 litros', 'cesto_telado'),
        new item(3, 'Cesto Telado - 60 litros', 'cesto_telado'),

        new item(5, 'Cesto Telado Rattan Marrom - 12 litros', 'cesto_telado_rattan'),

        new item(0, 'Conservadora Com Tampa 3 Divisorias Redonda', 'conservadora_tampa'),
        new item(0, 'Conservadora Com Tampa 3 Divisorias Retangular', 'conservadora_tampa'),

        new item(19, 'Copo Medidor', 'copo_medidor'),

        new item(33, 'Cuia Bella Fiore 4 litros Areia', 'cuia_bf_4'),
        new item(26, 'Cuia Bella Fiore 4 litros Cerâmica', 'cuia_bf_4'),
        new item(28, 'Cuia Bella Fiore 4 litros Preto', 'cuia_bf_4'),

        new item(39, 'Cuia Bella Fiore 7.5 litros Areia', 'cuia_bf_7.5'),
        new item(42, 'Cuia Bella Fiore 7.5 litros Cerâmica', 'cuia_bf_7.5'),
        new item(23, 'Cuia Bella Fiore 7.5 litros Preto', 'cuia_bf_7.5'),

        new item(8, 'Escorredor de Pratos Supreme', 'escorredor'),
        new item(19, 'Escorredor de Talheres', 'escorredor'),
        new item(8, 'Escorredor Lava Tudo', 'escorredor'),
        new item(20, 'Escorredor Multiuso', 'escorredor'),

        new item(42, 'Forma de Gelo 2 Peças', 'forma_gelo'),

        new item(10, 'Floreira Floratta n30 Areia', 'floreira_30'),
        new item(49, 'Floreira Floratta n30 Azul', 'floreira_30'),
        new item(31, 'Floreira Floratta n30 cinza', 'floreira_30'),
        new item(20, 'Floreira Floratta n30 Preta', 'floreira_30'),
        new item(33, 'Floreira Floratta n30 Rosa', 'floreira_30'),
        new item(42, 'Floreira Floratta n30 Verde', 'floreira_30'),
        new item(10, 'Floreira Floratta n30 Verde Escuro', 'floreira_30'),

        new item(18, 'Jarra Quadrada - 2 litros', 'jarra'),
        new item(19, 'Jarra Redonda - 1.5 litros', 'jarra'),

        new item(46, 'Jardineira Bella Fiore n35 Areia', 'jardineira_n35'),
        new item(36, 'Jardineira Bella Fiore n35 Cerâmica', 'jardineira_n35'),
        new item(44, 'Jardineira Bella Fiore n35 Preta', 'jardineira_n35'),

        new item(24, 'Jardineira Bella Fiore n50 Areia', 'jardineira_n50'),
        new item(32, 'Jardineira Bella Fiore n50 Cerâmica', 'jardineira_n50'),
        new item(53, 'Jardineira Bella Fiore n50 Preta', 'jardineira_n50'),

        new item(10, 'Jardineira Floratta n50 Areia', 'jardineira_floratta_50'),
        new item(36, 'Jardineira Floratta n50 Azul', 'jardineira_floratta_50'),
        new item(5, 'Jardineira Floratta n50 cinza', 'jardineira_floratta_50'),
        new item(21, 'Jardineira Floratta n50 Preta', 'jardineira_floratta_50'),
        new item(30, 'Jardineira Floratta n50 Rosa', 'jardineira_floratta_50'),
        new item(37, 'Jardineira Floratta n50 Verde', 'jardineira_floratta_50'),
        new item(10, 'Jardineira Floratta n50 Verde Escuro', 'jardineira_floratta_50'),

        new item(11, 'Jardineira Floratta n80 Areia', 'jardineira_floratta_80'),
        new item(0, 'Jardineira Floratta n80 cinza', 'jardineira_floratta_80'),
        new item(31, 'Jardineira Floratta n80 Azul', 'jardineira_floratta_80'),
        new item(12, 'Jardineira Floratta n80 Preta', 'jardineira_floratta_80'),
        new item(4, 'Jardineira Floratta n80 Rosa', 'jardineira_floratta_80'),
        new item(23, 'Jardineira Floratta n80 Verde', 'jardineira_floratta_80'),
        new item(14, 'Jardineira Floratta n80 Verde Escuro', 'jardineira_floratta_80'),

        new item(0, 'Lixeira Basculante - 3.6 litros', 'lixeira_basculante'),

        new item(0, 'Lixeira Com Pedal Preta - 6.5 litros', 'lixeira_pedal'),
        new item(0, 'Lixeira Com Pedal Preta - 12 litros', 'lixeira_pedal'),
        new item(0, 'Lixeira Com Pedal Preta - 34 litros', 'lixeira_pedal'),

        new item(0, 'Lixeira de Pia Splendore Com Tampa Basculante', 'lixeira_splendore'),
        new item(3, 'Lixeira de Pia Splendore Com Tampa Articulável', 'lixeira_splendore'),

        new item(0, 'Lixeira Rattan Com Pedal Areia - 7.5 litros', 'lixeira_rattan'),
        new item(0, 'Lixeira Rattan Com Pedal Areia - 14.5 litros', 'lixeira_rattan'),

        new item(0, 'Porta Detergente Styllus', 'porta_detergente'),

        new item(12, 'Porta Frios 2 Peças', 'porta_frios'),

        new item(22, 'Porta Talheres Com Tampa', 'porta_talheres'),

        new item(0, 'Pote Fliplock 400ml', 'fliplock'),
        new item(17, 'Pote Fliplock 800ml', 'fliplock'),
        new item(0, 'Pote Fliplock 1.4 Litros', 'fliplock'),

        new item(0, 'Pote Premium - 3 Litros', 'pote_premium'),
        new item(0, 'Pote Premium - 5 Litros', 'pote_premium'),

        new item(0, 'Pote Retangular Alto - 2.5 Litros', 'pote_retangular'),
        new item(0, 'Pote Retangular Alto - 4.2 Litros', 'pote_retangular'),

        new item(0, 'Pote Topa Tudo - 3 Litros', 'pote_topa_tudo'),

        new item(0, 'Pote Volare - 1.2 Litros', 'pote_volare'),
        new item(0, 'Pote Volare - 2 Litros', 'pote_volare'),
        new item(0, 'Pote Volare - 3 Litros', 'pote_volare'),

        new item(0, 'Vaso Coluna Floratta P Areia', 'vaso_coluna_p'),
        new item(4, 'Vaso Coluna Floratta P Preto', 'vaso_coluna_p'),
        new item(4, 'Vaso Coluna Floratta P Rosa', 'vaso_coluna_p'),
        new item(0, 'Vaso Coluna Floratta P Verde Escuro', 'vaso_coluna_p'),

        new item(1, 'Vaso Coluna Floratta M Areia', 'vaso_coluna_m'),
        new item(2, 'Vaso Coluna Floratta M Preto', 'vaso_coluna_m'),
        new item(4, 'Vaso Coluna Floratta M Rosa', 'vaso_coluna_m'),
        new item(1, 'Vaso Coluna Floratta M Verde Escuro', 'vaso_coluna_m'),

        new item(2, 'Vaso Coluna Floratta G Areia', 'vaso_coluna_g'),
        new item(2, 'Vaso Coluna Floratta G Preto', 'vaso_coluna_g'),
        new item(2, 'Vaso Coluna Floratta G Rosa', 'vaso_coluna_g'),
        new item(0, 'Vaso Coluna Floratta G Verde Escuro', 'vaso_coluna_g'),

        new item(27, 'Vaso de Parede Bella Fiore 1.7 litros Areia', 'vp_florença_1.7'),
        new item(33, 'Vaso de Parede Bella Fiore 1.7 litros Cerâmica', 'vp_florença_1.7'),
        new item(48, 'Vaso de Parede Bella Fiore 1.7 litros Preto', 'vp_florença_1.7'),

        new item(24, 'Vaso de Parede Bella Fiore 3.3 litros Areia', 'vp_florença_3.3'),
        new item(19, 'Vaso de Parede Bella Fiore 3.3 litros Cerâmica', 'vp_florença_3.3'),
        new item(37, 'Vaso de Parede Bella Fiore 3.3 litros Preto', 'vp_florença_3.3'),

        new item(0, 'Vaso de Parede Floratta 3 litros Areia', 'vp_floratta_3'),
        new item(24, 'Vaso de Parede Floratta 3 litros Azul', 'vp_floratta_3'),
        new item(23, 'Vaso de Parede Floratta 3 litros cinza', 'vp_floratta_3'),
        new item(10, 'Vaso de Parede Floratta 3 litros Preto', 'vp_floratta_3'),
        new item(20, 'Vaso de Parede Floratta 3 litros Rosa', 'vp_floratta_3'),
        new item(17, 'Vaso de Parede Floratta 3 litros Verde', 'vp_floratta_3'),
        new item(8, 'Vaso de Parede Floratta 3 litros Verde Escuro', 'vp_floratta_3'),

        new item(8, 'Vaso de Parede Floratta 6 litros Areia', 'vp_floratta_6'),
        new item(16, 'Vaso de Parede Floratta 6 litros Azul', 'vp_floratta_6'),
        new item(0, 'Vaso de Parede Floratta 6 litros cinza', 'vp_floratta_6'),
        new item(10, 'Vaso de Parede Floratta 6 litros Preto', 'vp_floratta_6'),
        new item(18, 'Vaso de Parede Floratta 6 litros Rosa', 'vp_floratta_6'),
        new item(18, 'Vaso de Parede Floratta 6 litros Verde', 'vp_floratta_6'),
        new item(8, 'Vaso de Parede Floratta 6 litros Verde Escuro', 'vp_floratta_6'),

        new item(48, 'Vaso Quadrado Bella Fiore n17 Areia', 'quadrado_n17'),
        new item(43, 'Vaso Quadrado Bella Fiore n17 Cerâmica', 'quadrado_n17'),
        new item(47, 'Vaso Quadrado Bella Fiore n17 Preto', 'quadrado_n17'),

        new item(41, 'Vaso Quadrado Bella Fiore n22 Areia', 'quadrado_n22'),
        new item(18, 'Vaso Quadrado Bella Fiore n22 Cerâmica', 'quadrado_n22'),
        new item(32, 'Vaso Quadrado Bella Fiore n22 Preto', 'quadrado_n22'),

        new item(30, 'Vaso Quadrado Bella Fiore n28 Areia', 'quadrado_n28'),
        new item(23, 'Vaso Quadrado Bella Fiore n28 Cerâmica', 'quadrado_n28'),
        new item(31, 'Vaso Quadrado Bella Fiore n28 Preto', 'quadrado_n28'),

        new item(26, 'Vaso Quadrado Bella Fiore n35 Areia', 'quadrado_n35'),
        new item(14, 'Vaso Quadrado Bella Fiore n35 Cerâmica', 'quadrado_n35'),
        new item(31, 'Vaso Quadrado Bella Fiore n35 Preto', 'quadrado_n35'),

        new item(18, 'Vaso Quadrado Bella Fiore n42 Areia', 'quadrado_n42'),
        new item(16, 'Vaso Quadrado Bella Fiore n42 Cerâmica', 'quadrado_n42'),
        new item(24, 'Vaso Quadrado Bella Fiore n42 Preto', 'quadrado_n42'),
        
        new item(48, 'Vaso Redondo Bella Fiore n13 Areia', 'redondo_n13'),
        new item(48, 'Vaso Redondo Bella Fiore n13 Cerâmica', 'redondo_n13'),
        new item(39, 'Vaso Redondo Bella Fiore n13 Preto', 'redondo_n13'),

        new item(63, 'Vaso Redondo Bella Fiore n17 Areia', 'redondo_n17'),
        new item(62, 'Vaso Redondo Bella Fiore n17 Cerâmica', 'redondo_n17'),
        new item(57, 'Vaso Redondo Bella Fiore n17 Preto', 'redondo_n17'),

        new item(45, 'Vaso Redondo Bella Fiore n22 Areia', 'redondo_n22'),
        new item(42, 'Vaso Redondo Bella Fiore n22 Ceoâmica', 'redondo_n22'),
        new item(44, 'Vaso Redondo Bella Fiore n22 Preto', 'redondo_n22'),

        new item(47, 'Vaso Redondo Bella Fiore n28 Areia', 'redondo_n28'),
        new item(34, 'Vaso Redondo Bella Fiore n28 Cerâmica', 'redondo_n28'),
        new item(18, 'Vaso Redondo Bella Fiore n28 Preto', 'redondo_n28'),

        new item(29, 'Vaso Redondo Bella Fiore n35 Areia', 'redondo_n35'),
        new item(32, 'Vaso Redondo Bella Fiore n35 Cerâmica', 'redondo_n35'),
        new item(38, 'Vaso Redondo Bella Fiore n35 Preto', 'redondo_n35'),

        new item(32, 'Vaso Redondo Bella Fiore n42 Areia', 'redondo_n42'),
        new item(21, 'Vaso Redondo Bella Fiore n42 Cerâmica', 'redondo_n42'),
        new item(37, 'Vaso Redondo Bella Fiore n42 Preto', 'redondo_n42'),

        new item(5, 'Vaso Redondo Bella Fiore n50 Areia', 'redondo_n50'),
        new item(15, 'Vaso Redondo Bella Fiore n50 Cerâmica', 'redondo_n50'),
        new item(14, 'Vaso Redondo Bella Fiore n50 Preto', 'redondo_n50'),

        new item(14, 'Vaso Redondo Floratta n15 Areia', 'redondo_floratta_15'),
        new item(2, 'Vaso Redondo Floratta n15 Azul', 'redondo_floratta_15'),
        new item(12, 'Vaso Redondo Floratta n15 cinza', 'redondo_floratta_15'),
        new item(43, 'Vaso Redondo Floratta n15 Preto', 'redondo_floratta_15'),
        new item(31, 'Vaso Redondo Floratta n15 Rosa', 'redondo_floratta_15'),
        new item(8, 'Vaso Redondo Floratta n15 Verde', 'redondo_floratta_15'),
        new item(18, 'Vaso Redondo Floratta n15 Verde Escuro', 'redondo_floratta_15'),

        new item(2, 'Vaso Redondo Floratta n19 Areia', 'redondo_floratta_19'),
        new item(3, 'Vaso Redondo Floratta n19 Azul', 'redondo_floratta_19'),
        new item(5, 'Vaso Redondo Floratta n19 cinza', 'redondo_floratta_19'),
        new item(19, 'Vaso Redondo Floratta n19 Preto', 'redondo_floratta_19'),
        new item(15, 'Vaso Redondo Floratta n19 Rosa', 'redondo_floratta_19'),
        new item(7, 'Vaso Redondo Floratta n19 Verde', 'redondo_floratta_19'),
        new item(14, 'Vaso Redondo Floratta n19 Verde Escuro', 'redondo_floratta_19'),

        new item(8, 'Vaso Redondo Floratta n26 Areia', 'redondo_floratta_26'),
        new item(28, 'Vaso Redondo Floratta n26 Azul', 'redondo_floratta_26'),
        new item(14, 'Vaso Redondo Floratta n26 cinza', 'redondo_floratta_26'),
        new item(19, 'Vaso Redondo Floratta n26 Preto', 'redondo_floratta_26'),
        new item(31, 'Vaso Redondo Floratta n26 Rosa', 'redondo_floratta_26'),
        new item(34, 'Vaso Redondo Floratta n26 Verde', 'redondo_floratta_26'),
        new item(9, 'Vaso Redondo Floratta n26 Verde Escuro', 'redondo_floratta_26'),

        new item(30, 'Vaso Redondo Floratta n33 Areia', 'redondo_floratta_33'),
        new item(42, 'Vaso Redondo Floratta n33 Azul', 'redondo_floratta_33'),
        new item(42, 'Vaso Redondo Floratta n33 cinza', 'redondo_floratta_33'),
        new item(20, 'Vaso Redondo Floratta n33 Preto', 'redondo_floratta_33'),
        new item(42, 'Vaso Redondo Floratta n33 Rosa', 'redondo_floratta_33'),
        new item(47, 'Vaso Redondo Floratta n33 Verde', 'redondo_floratta_33'),
        new item(2, 'Vaso Redondo Floratta n33 Verde Escuro', 'redondo_floratta_33'),

        new item(0, 'Vaso Redondo Floratta n40 Areia', 'redondo_floratta_40'),
        new item(31, 'Vaso Redondo Floratta n40 Azul', 'redondo_floratta_40'),
        new item(28, 'Vaso Redondo Floratta n40 cinza', 'redondo_floratta_40'),
        new item(16, 'Vaso Redondo Floratta n40 Preto', 'redondo_floratta_40'),
        new item(0, 'Vaso Redondo Floratta n40 Rosa', 'redondo_floratta_40'),
        new item(32, 'Vaso Redondo Floratta n40 Verde', 'redondo_floratta_40'),
        new item(8, 'Vaso Redondo Floratta n40 Verde Escuro', 'redondo_floratta_40'),

        new item(10, 'Vaso Redondo Floratta n50 Areia', 'redondo_floratta_50'),
        new item(0, 'Vaso Redondo Floratta n50 Azul', 'redondo_floratta_50'),
        new item(0, 'Vaso Redondo Floratta n50 cinza', 'redondo_floratta_50'),
        new item(6, 'Vaso Redondo Floratta n50 Preto', 'redondo_floratta_50'),
        new item(0, 'Vaso Redondo Floratta n50 Rosa', 'redondo_floratta_50'),
        new item(0, 'Vaso Redondo Floratta n50 Verde', 'redondo_floratta_50'),
        new item(6, 'Vaso Redondo Floratta n50 Verde Escuro', 'redondo_floratta_50')
    ]
)
var emeAeme = new Inventario(
    'Eme A Eme',
    '26/10/2023',
    [
        new item(196, 'Alça Universal Branca', 'alça_universal'),
        new item(41, 'Alça Universal Café', 'alça_universal'),
        new item(115, 'Alça Universal Cerâmica', 'alça_universal'),
        new item(74, 'Alça Universal Marfim', 'alça_universal'),
        new item(115, 'Alça Universal Preta', 'alça_universal'),
        new item(19, 'Alça Universal Verde', 'alça_universal'),

        new item(10, 'Cachepot Floreira Luxury Bege', 'floreira_luxyry'),
        new item(10, 'Cachepot Floreira Luxury Branco', 'floreira_luxyry'),
        new item(10, 'Cachepot Floreira Luxury Branco Carrara', 'floreira_luxyry'),
        new item(10, 'Cachepot Floreira Luxury Cafe', 'floreira_luxyry'),
        new item(10, 'Cachepot Floreira Luxury Verde Caribe', 'floreira_luxyry'),

        new item(10, 'Cachepot Luxury 11 Bege', 'luxyry_11'),
        new item(15, 'Cachepot Luxury 11 Branco', 'luxyry_11'),
        new item(10, 'Cachepot Luxury 11 Branco Carrara', 'luxyry_11'),
        new item(15, 'Cachepot Luxury 11 Cafe', 'luxyry_11'),
        new item(15, 'Cachepot Luxury 11 Diamante Negro', 'luxyry_11'),
        new item(10, 'Cachepot Luxury 11 Verde Caribe', 'luxyry_11'),

        new item(10, 'Cachepot Luxury 15 Bege', 'luxyry_15'),
        new item(15, 'Cachepot Luxury 15 Branco', 'luxyry_15'),
        new item(10, 'Cachepot Luxury 15 Branco Carrara', 'luxyry_15'),
        new item(15, 'Cachepot Luxury 15 Cafe', 'luxyry_15'),
        new item(15, 'Cachepot Luxury 15 Diamante Negro', 'luxyry_15'),
        new item(10, 'Cachepot Luxury 15 Verde Caribe', 'luxyry_15'),

        new item(52, 'Cuia CB 13 Branca', 'cuia_cb_13'),
        new item(0, 'Cuia CB 13 Café', 'cuia_cb_13'),
        new item(68, 'Cuia CB 13 Cerâmica', 'cuia_cb_13'),
        new item(44, 'Cuia CB 13 Marfim', 'cuia_cb_13'),
        new item(78, 'Cuia CB 13 Preta', 'cuia_cb_13'),
        new item(54, 'Cuia CB 13 Verde', 'cuia_cb_13'),

        new item(52, 'Cuia CB 15 Branca', 'cuia_cb_15'),
        new item(0, 'Cuia CB 15 Café', 'cuia_cb_15'),
        new item(52, 'Cuia CB 15 Cerâmica', 'cuia_cb_15'),
        new item(41, 'Cuia CB 15 Marfim', 'cuia_cb_15'),
        new item(87, 'Cuia CB 15 Preta', 'cuia_cb_15'),
        new item(47, 'Cuia CB 15 Verde', 'cuia_cb_15'),

        new item(41, 'Cuia CBB 18 Com Base Branca', 'cuia_cbb_18'),
        new item(46, 'Cuia CBB 18 Com Base Café', 'cuia_cbb_18'),
        new item(21, 'Cuia CBB 18 Com Base Cerâmica', 'cuia_cbb_18'),
        new item(34, 'Cuia CBB 18 Com Base Marfim', 'cuia_cbb_18'),
        new item(28, 'Cuia CBB 18 Com Base Preta', 'cuia_cbb_18'),
        new item(29, 'Cuia CBB 18 Com Base Verde', 'cuia_cbb_18'),

        new item(30, 'Cuia CBB 21 Com Base Branca', 'cuia_cbb_21'),
        new item(40, 'Cuia CBB 21 Com Base Café', 'cuia_cbb_21'),
        new item(46, 'Cuia CBB 21 Com Base Cerâmica', 'cuia_cbb_21'),
        new item(48, 'Cuia CBB 21 Com Base Marfim', 'cuia_cbb_21'),
        new item(78, 'Cuia CBB 21 Com Base Preta', 'cuia_cbb_21'),
        new item(51, 'Cuia CBB 21 Com Base Verde', 'cuia_cbb_21'),

        new item(28, 'Cuia CBB 25 Com Base Branca', 'cuia_cbb_25'),
        new item(36, 'Cuia CBB 25 Com Base Café', 'cuia_cbb_25'),
        new item(4, 'Cuia CBB 25 Com Base Cerâmica', 'cuia_cbb_25'),
        new item(39, 'Cuia CBB 25 Com Base Marfim', 'cuia_cbb_25'),
        new item(9, 'Cuia CBB 25 Com Base Preta', 'cuia_cbb_25'),
        new item(29, 'Cuia CBB 25 Com Base Verde', 'cuia_cbb_25'),

        new item(35, 'Cuia CBB 30 Com Base Branca', 'cuia_cbb_30'),
        new item(54, 'Cuia CBB 30 Com Base Café', 'cuia_cbb_30'),
        new item(3, 'Cuia CBB 30 Com Base Cerâmica', 'cuia_cbb_30'),
        new item(41, 'Cuia CBB 30 Com Base Marfim', 'cuia_cbb_30'),
        new item(1, 'Cuia CBB 30 Com Base Preta', 'cuia_cbb_30'),
        new item(33, 'Cuia CBB 30 Com Base Verde', 'cuia_cbb_30'),

        new item(25, 'Cuia Gran Imperial CBB 40 Com Base Cerâmica', 'cuia_cbb_40'),
        new item(13, 'Cuia Gran Imperial CBB 40 Com Base Preta', 'cuia_cbb_40'),

        new item(312, 'Etiqueta E00', 'etiqueta'),
        new item(0, 'Etiqueta E03', 'etiqueta'),
        new item(0, 'Etiqueta E08', 'etiqueta'),
        new item(2, 'Etiqueta E09', 'etiqueta'),
        new item(0, 'Etiqueta E11', 'etiqueta'),
        new item(1440, 'Etiqueta E16', 'etiqueta'),
        new item(727, 'Etiqueta E30', 'etiqueta'),
        new item(1000, 'Etiqueta E40', 'etiqueta'),
        new item(0,  'Etiqueta EP22', 'etiqueta'),

        new item(34, 'Floreira FCB 30 Com Base Café', 'floreira_fcb_30'),
        new item(42, 'Floreira FCB 30 Com Base Cerâmica', 'floreira_fcb_30'),
        new item(32, 'Floreira FCB 30 Com Base Cimento', 'floreira_fcb_30'),
        new item(29, 'Floreira FCB 30 Com Base Preta', 'floreira_fcb_30'),
        new item(30, 'Floreira FCB 30 Com Base Verde', 'floreira_fcb_30'),

        new item(32, 'Floreira FCB 40 Com Base Café', 'floreira_fcb_40'),
        new item(33, 'Floreira FCB 40 Com Base Cerâmica', 'floreira_fcb_40'),
        new item(29, 'Floreira FCB 40 Com Base Cimento', 'floreira_fcb_40'),
        new item(45, 'Floreira FCB 40 Com Base Preta', 'floreira_fcb_40'),
        new item(23, 'Floreira FCB 40 Com Base Verde', 'floreira_fcb_40'),

        new item(14, 'Floreira FCB 60 Com Base Café', 'floreira_fcb_60'),
        new item(19, 'Floreira FCB 60 Com Base Cerâmica', 'floreira_fcb_60'),
        new item(24, 'Floreira FCB 60 Com Base Cimento', 'floreira_fcb_60'),
        new item(27, 'Floreira FCB 60 Com Base Preta', 'floreira_fcb_60'),
        new item(17, 'Floreira FCB 60 Com Base Verde', 'floreira_fcb_60'),

        new item(80, 'Prato B006 6cm Cerâmica', 'prato_b006'),
        new item(122, 'Prato B006 6cm Preto', 'prato_b006'),

        new item(35, 'Prato B00 9.5cm Cerâmica', 'prato_b00'),
        new item(25, 'Prato B00 9.5cm Cimento', 'prato_b00'),
        new item(25, 'Prato B00 9.5cm Marfim', 'prato_b00'),
        new item(17, 'Prato B00 9.5cm Preto', 'prato_b00'),

        new item(39, 'Prato B01 11.5cm Cerâmica', 'prato_b01'),
        new item(53, 'Prato B01 11.5cm Cimento', 'prato_b01'),
        new item(49, 'Prato B01 11.5cm Marfim', 'prato_b01'),
        new item(0, 'Prato B01 11.5cm Preto', 'prato_b01'),

        new item(13, 'Prato B02 13cm Cerâmica', 'prato_b02'),
        new item(29, 'Prato B02 13cm Cimento', 'prato_b02'),
        new item(29, 'Prato B02 13cm Marfim', 'prato_b02'),
        new item(5, 'Prato B02 13cm Preto', 'prato_b02'),

        new item(8, 'Prato B03 16cm Cerâmica', 'prato_b03'),
        new item(57, 'Prato B03 16cm Cimento', 'prato_b03'),
        new item(48, 'Prato B03 16cm Marfim', 'prato_b03'),
        new item(24, 'Prato B03 16cm Preto', 'prato_b03'),

        new item(25, 'Prato B04 21cm Cerâmica', 'prato_b04'),
        new item(46, 'Prato B04 21cm Cimento', 'prato_b04'),
        new item(50, 'Prato B04 21cm Marfim', 'prato_b04'),
        new item(23, 'Prato B04 21cm Preto', 'prato_b04'),

        new item(61, 'Prato B04.5 22cm Cerâmica', 'prato_b4.5'),
        new item(28, 'Prato B04.5 22cm Cimento', 'prato_b4.5'),
        new item(26, 'Prato B04.5 22cm Marfim', 'prato_b4.5'),
        new item(77, 'Prato B04.5 22cm Preto', 'prato_b4.5'),

        new item(35, 'Prato B05 24cm Cerâmica', 'prato_b05'),
        new item(36, 'Prato B05 24cm Cimento', 'prato_b05'),
        new item(44, 'Prato B05 24cm Marfim', 'prato_b05'),
        new item(0, 'Prato B05 24cm Preto', 'prato_b05'),

        new item(37, 'Prato B06 27cm Cerâmica', 'prato_b06'),
        new item(45, 'Prato B06 27cm Cimento', 'prato_b06'),
        new item(49, 'Prato B06 27cm Marfim', 'prato_b06'),
        new item(17, 'Prato B06 27cm Preto', 'prato_b06'),

        new item(64, 'Prato B07 30cm Cerâmica', 'prato_b07'),
        new item(50, 'Prato B07 30cm Cimento', 'prato_b07'),
        new item(51, 'Prato B07 30cm Marfim', 'prato_b07'),
        new item(53, 'Prato B07 30cm Preto', 'prato_b07'),

        new item(31, 'Prato B08 33cm Cerâmica', 'prato_b08'),
        new item(38, 'Prato B08 33cm Cimento', 'prato_b08'),
        new item(33, 'Prato B08 33cm Marfim', 'prato_b08'),
        new item(41, 'Prato B08 33cm Preto', 'prato_b08'),

        new item(32, 'Prato B09 38cm Cerâmica', 'prato_b09'),
        new item(35, 'Prato B09 38cm Cimento', 'prato_b09'),
        new item(35, 'Prato B09 38cm Marfim', 'prato_b09'),
        new item(51, 'Prato B09 38cm Preto', 'prato_b09'),

        new item(35, 'Prato B10 42cm Cerâmica', 'prato_b10'),
        new item(15, 'Prato B10 42cm Cimento', 'prato_b10'),
        new item(15, 'Prato B10 42cm Marfim', 'prato_b10'),
        new item(53, 'Prato B10 42cm Preto', 'prato_b10'),

        new item(56, 'Vaso De Parede VP 14 Branco', 'vp_14'),
        new item(39, 'Vaso De Parede VP 14 Cerâmica', 'vp_14'),
        new item(80, 'Vaso De Parede VP 14 Preto', 'vp_14'),
        new item(69, 'Vaso De Parede VP 14 Verde', 'vp_14'),

        new item(44, 'Vaso De Parede VP 20 Branco', 'vp_20'),
        new item(35, 'Vaso De Parede VP 20 Cerâmica', 'vp_20'),
        new item(60, 'Vaso De Parede VP 20 Preto', 'vp_20'),
        new item(56, 'Vaso De Parede VP 20 Verde', 'vp_20'),

        new item(51, 'Vaso De Parede VP 30 Branco', 'vp_30'),
        new item(57, 'Vaso De Parede VP 30 Cerâmica', 'vp_30'),
        new item(16, 'Vaso De Parede VP 30 Preto', 'vp_30'),
        new item(48, 'Vaso De Parede VP 30 Verde', 'vp_30'),

        new item(32, 'Vaso Imperial V15 Cerâmica', 'v_imperial_15'),
        new item(33, 'Vaso Imperial V15 Cimento', 'v_imperial_15'),
        new item(32, 'Vaso Imperial V15 Marfim', 'v_imperial_15'),
        new item(32, 'Vaso Imperial V15 Preto', 'v_imperial_15'),

        new item(32, 'Vaso Imperial V20 Cerâmica', 'v_imperial_20'),
        new item(33, 'Vaso Imperial V20 Cimento', 'v_imperial_20'),
        new item(31, 'Vaso Imperial V20 Marfim', 'v_imperial_20'),
        new item(37, 'Vaso Imperial V20 Preto', 'v_imperial_20'),

        new item(12, 'Vaso Imperial V25 Cerâmica', 'v_imperial_25'),
        new item(16, 'Vaso Imperial V25 Cimento', 'v_imperial_25'),
        new item(15, 'Vaso Imperial V25 Marfim', 'v_imperial_25'),
        new item(12, 'Vaso Imperial V25 Preto', 'v_imperial_25'),

        new item(4, 'Vaso Imperial V30 Cerâmica', 'v_imperial_30'),
        new item(5, 'Vaso Imperial V30 Cimento', 'v_imperial_30'),
        new item(7, 'Vaso Imperial V30 Marfim', 'v_imperial_30'),
        new item(8, 'Vaso Imperial V30 Preto', 'v_imperial_30'),

        new item(5, 'Vaso Imperial V40 Cerâmica', 'v_imperial_40'),
        new item(5, 'Vaso Imperial V40 Cimento', 'v_imperial_40'),
        new item(5, 'Vaso Imperial V40 Marfim', 'v_imperial_40'),
        new item(3, 'Vaso Imperial V40 Preto', 'v_imperial_40'),

        new item(55, 'Vaso T 07 Cerâmica', 'vaso_t_07'),
        new item(41, 'Vaso T 07 Preto', 'vaso_t_07'),

        new item(97, 'Vaso T 09 Cerâmica', 'vaso_t_09'),
        new item(55, 'Vaso T 09 Preto', 'vaso_t_09'),

        new item(30, 'Vaso T 10 Cerâmica', 'vaso_t_10'),
        new item(29, 'Vaso T 10 Preto', 'vaso_t_10'),

        new item(25, 'Vaso T 12 Cerâmica', 'vaso_t_12'),
        new item(28, 'Vaso T 12 Preto', 'vaso_t_12'),

        new item(38, 'Vaso T 14 Cerâmica', 'vaso_t_14'),
        new item(17, 'Vaso T 14 Preto', 'vaso_t_14'),

        new item(37, 'Vaso T 16 Cerâmica', 'vaso_t_16'),
        new item(15, 'Vaso T 16 Preto', 'vaso_t_16'),

        new item(23, 'Vaso T 18 Cerâmica', 'vaso_t_18'),
        new item(22, 'Vaso T 18 Preto', 'vaso_t_18'),

        new item(29, 'Vaso T 20 Cerâmica', 'vaso_t_20'),
        new item(21, 'Vaso T 20 Preto', 'vaso_t_20'),

        new item(30, 'Vaso T 25 Cerâmica', 'vaso_t_25'),
        new item(21, 'Vaso T 25 Preto', 'vaso_t_25'),

        new item(15, 'Vaso T 27 Cerâmica', 'vaso_t_27'),
        new item(20, 'Vaso T 27 Preto', 'vaso_t_27'),

        new item(31, 'Vaso T 30 Cerâmica', 'vaso_t_30'),
        new item(10, 'Vaso T 30 Preto', 'vaso_t_30'),

        new item(29, 'Vaso T 35 Cerâmica', 'vaso_t_35'),
        new item(28, 'Vaso T 35 Preto', 'vaso_t_35')
    ]
)
var forth = new Inventario(
    'Forth',
    '23/10/2023',
    [
        new item(12, 'Acaricida Concentrado - 60ml', 'a'),
        new item(10, 'Acaricida p/uso - 500ml', 'a'),

        new item(33, 'Baraticida Gel', 'b'),
        new item(23, 'Bokashi - 250g', 'b'),
        new item(18, 'Bonsai Concentrado - 60ml', 'b'),
        new item(18, 'Bonsai p/uso - 500ml', 'b'),
        new item(0, 'Brilha folha Concentrado - 60ml', 'b'),
        new item(18, 'Brilha folha p/uso - 500ml', 'b'),

        new item(19, 'Cactos Concentrado - 60ml', 'c'),
        new item(14, 'Cactos Concentrado - 500m', 'c'),
        new item(10, 'Cobre Concentrado - 60ml', 'c'),
        new item(12, 'Cobre Concentrado - 500m', 'c'),
        new item(36, 'Coqueiros - 400g', 'c'),
        new item(0, 'Coqueiros - 3kg', 'c'),
        new item(1, 'Coqueiros - 10Kg', 'c'),
        new item(9, 'Cote 14.14.14 - 150g', 'c'),
        new item(0, 'Cote 15.09.12 - 150g', 'c'),
        new item(0, 'Cote 14.14.14 - 400g', 'c'),
        new item(0, 'Cote 15.09.12 - 400g', 'c'),
        new item(8, 'Cupinicida Concentrado - 60ml', 'c'),

        new item(22, 'Defende Concentrado - 30ml', 'd'),
        new item(22, 'Defende p/uso - 500ml', 'd'),

        new item(15, 'Enraizador Concentrado - 60ml', 'e'),
        new item(28, 'Enxofre Concentrado - 60ml', 'e'),
        new item(13, 'Enxofre p/uso - 500ml', 'e'),
        new item(7, 'Equilibrio Concentrado - 60ml', 'e'),
        new item(7, 'Equilibrio Concentrado - 500ml', 'e'),

        new item(3, 'Fipronil+imidacloprid Concentrado - 60ml', 'f'),
        new item(9, 'Flores Concentrado - 60ml', 'f'),
        new item(4, 'Flores p/uso - 500ml', 'f'),
        new item(39, 'Flores - 400g', 'f'),
        new item(18, 'Flores - 3kg', 'f'),
        new item(0, 'Flores - 10Kg', 'f'),
        new item(45, 'Formicida Gel', 'f'),
        new item(4, 'Formicida isca granulada', 'f'), 
        new item(13, 'Formicida Mata no ninho p/uso - 500ml', 'f'),
        new item(0, 'Fosfito - 60ml', 'f'),
        new item(8, 'Fosfito p/uso - 500ml', 'f'),
        new item(11, 'Frutas Concentrado - 60ml', 'f'),
        new item(18, 'Frutas p/uso - 500ml', 'f'),
        new item(43, 'Frutas - 400g', 'f'),
        new item(14, 'Frutas - 3kg', 'f'),
        new item(0, 'Frutas - 10Kg', 'f'),
        new item(6, 'Fungicida Concentrado - 30ml', 'f'),
        new item(27, 'Fungicida p/uso - 500ml', 'f'),
        new item(7, 'Fungicida cobre p/uso - 500ml', 'f'),

        new item(0, 'Gel para plantio - 100g', 'g'),

        new item(16, 'Hortaliças Concentrado - 60ml', 'h'),
        new item(15, 'Hortaliças p/uso - 500ml', 'h'),
        new item(51, 'Hortaliças - 400g', 'h'),
        new item(6, 'Hortaliças - 3kg', 'h'),
        new item(0, 'Hortaliças - 10Kg', 'h'),

        new item(12, 'Inseticida Concentrado - 30ml', 'i'),
        new item(15, 'Inseticida p/uso - 500ml', 'i'),

        new item(0, 'Jabuticabeiras Concentrado - 60ml', 'j'),
        new item(23, 'Jabuticabeiras - 400g', 'j'),
        new item(11, 'Jabuticabeiras - 3kg', 'j'),
        new item(18, 'Jardim Concentrado - 60ml', 'j'),
        new item(6, 'Jardim Concentrado - 500ml', 'j'),
        new item(15, 'Jardim p/uso - 500ml', 'j'),
        new item(40, 'Jardim - 400g', 'j'),
        new item(3, 'Jardim - 3kg', 'j'),

        new item(6, 'Lesmicida isca granulada', 'l'),

        new item(14, 'Mata cochonilha p/uso - 500ml', 'm'),
        new item(23, 'Mata lagarta p/uso - 500ml', 'm'),
        new item(0, 'Mata mato Concentrado - 30ml', 'm'),
        new item(5, 'Mata mato p/uso - 500ml', 'm'),
        new item(11, 'Mata pulgão p/uso - 500ml', 'm'),

        new item(28, 'Óleo Concentrado - 60ml', 'o'),
        new item(2, 'Orquídeas Floração Concentrado - 60ml', 'o'),
        new item(21, 'Orquídeas Floração p/uso - 500ml', 'o'),
        new item(51, 'Orquídeas Manutenção Concentrado - 60ml', 'o'),
        new item(25, 'Orquídeas Manutenção p/uso - 500ml', 'o'),
        new item(8, 'Orquídeas 09.45.15 - 100g', 'o'),
        new item(37, 'Orquídeas 20.20.20 - 100g', 'o'),
        new item(7, 'Orquídeas 30.10.10 - 100g', 'o'),
        new item(8, 'Orquídeas 09.45.15 - 400g', 'o'),
        new item(13, 'Orquídeas 20.20.20 - 400g', 'o'),
        new item(12, 'Orquídeas 30.10.10 - 400g', 'o'),

        new item(0, 'Palmeiras Concentrado - 60ml', 'p'),
        new item(8, 'Palmeiras p/uso - 500ml', 'p'),
        new item(24, 'Palmeiras - 400g', 'p'),
        new item(6, 'Palmeiras - 3kg', 'p'),
        new item(11, 'Pasta selante', 'p'),
        new item(17, 'Plantio - 400g', 'p'),
        new item(2, 'Plantio - 3kg', 'p'),

        new item(0, 'Raticida Bloco - 200g', 'r'),
        new item(21, 'Raticida Isca Anticoagulante', 'r'),
        new item(0, 'Rosa do Deserto Concentrado - 60ml', 'r'),
        new item(14, 'Rosa do Deserto p/uso - 500ml', 'r'),
        new item(17, 'Rosa do Deserto - 400g', 'r'),
        new item(2, 'Rosa do Deserto - 3kg', 'r'),

        new item(1, 'Samambaias Concentrado - 60ml', 's'),
        new item(12, 'Samambaias p/uso - 500ml', 's'),
        new item(18, 'Samambaias - 400g', 's'),
        new item(1, 'Suculentas Concentrado - 60ml', 's'),

        new item(14, 'Temperos Concentrado - 60ml', 't'),
        new item(14, 'Temperos p/uso - 500ml', 't'),

        new item(33, 'Violetas Concentrado - 60ml', 'v'),
    ]
)
var fuzil = new Inventario(
    'Fuzil',
    '27/10/2023',
    [
        new item(11, 'Ancinho p/Jardim 3 dentes', 'fuzil'),
        new item(1, 'Arrancador de Inço', 'fuzil'),
        new item(7, 'Aspersor c/adaptador', 'fuzil'),
        new item(4, 'Facão mato 20', 'fusil'),
        new item(9, 'Pazinha p/jardim Larga', 'fuzil'),
        new item(1, 'Pazinha p/jardim Estreita', 'fuzil'),
        new item(2, 'Sacho 2P CB Madeira', 'fuzil'),
        new item(16, 'Tesoura de poda Palisad', 'fuzil'),
        new item(2, 'Tesoura de poda Tramontina', 'fuzil'),
        new item(8, 'Tesoura Grama', 'fuzil')
    ]
)
var alfa_polietileno = new Inventario(
    'Alfa Polietileno',
    '26/10/2023',
    [
        new item(0, 'Bacia Diamante nº 1 Bege', 'bacia_diamante_1'),
        new item(0, 'Bacia Diamante nº 1 Cimento', 'bacia_diamante_1'),

        new item(2, 'Bacia Diamante nº 2 Bege', 'bacia_diamante_2'),
        new item(0, 'Bacia Diamante nº 2 Cimento', 'bacia_diamante_2'),
        new item(1, 'Bacia Diamante nº 2 Marrom', 'bacia_diamante_2'),
        new item(3, 'Bacia Diamante nº 2 Preto', 'bacia_diamante_2'),

        new item(0, 'Bacia Diamante nº 3 Bege', 'bacia_diamante_3'),
        new item(1, 'Bacia Diamante nº 3 Cimento', 'bacia_diamante_3'),
        new item(2, 'Bacia Diamante nº 3 Marrom', 'bacia_diamante_3'),

        new item(9, 'Bacia Grafiato C/ Prato nº 1 Bege', 'bacia_grafiato_1'),
        new item(11, 'Bacia Grafiato C/ Prato nº 1 Cimento', 'bacia_grafiato_1'),
        new item(10, 'Bacia Grafiato C/ Prato nº 1 Marrom', 'bacia_grafiato_1'),
        new item(12, 'Bacia Grafiato C/ Prato nº 1 Preto', 'bacia_grafiato_1'),

        new item(6, 'Bacia Grafiato C/Prato nº 2 Bege', 'bacia_grafiato_2'),
        new item(8, 'Bacia Grafiato C/Prato nº 2 Cimento', 'bacia_grafiato_2'),
        new item(7, 'Bacia Grafiato C/Prato nº 2 Marrom', 'bacia_grafiato_2'),
        new item(7, 'Bacia Grafiato C/Prato nº 2 Preto', 'bacia_grafiato_2'),

        new item(4, 'Bacia Grafiato C/Prato nº 3 Bege', 'bacia_grafiato_3'),
        new item(3, 'Bacia Grafiato C/Prato nº 3 Cimento', 'bacia_grafiato_3'),
        new item(3, 'Bacia Grafiato C/Prato nº 3 Marrom', 'bacia_grafiato_3'),
        new item(3, 'Bacia Grafiato C/Prato nº 3 Preto', 'bacia_grafiato_3'),

        new item(3, 'Bacia Grafiato C/Prato nº 4 Bege', 'bacia_grafiato_4'),
        new item(2, 'Bacia Grafiato C/Prato nº 4 Cimento', 'bacia_grafiato_4'),
        new item(3, 'Bacia Grafiato C/Prato nº 4 Marrom', 'bacia_grafiato_4'),
        new item(2, 'Bacia Grafiato C/Prato nº 4 Preto', 'bacia_grafiato_4'),

        new item(5, 'Bacia Marmorizada C/Prato nº 1 Azul', 'bacia_marmorizada_1'),
        new item(7, 'Bacia Marmorizada C/Prato nº 1 Vermelho', 'bacia_marmorizada_1'),

        new item(2, 'Bacia Marmorizada C/Prato nº 2 Azul', 'bacia_marmorizada_2'),
        new item(3, 'Bacia Marmorizada C/Prato nº 2 Vermelho', 'bacia_marmorizada_2'),

        new item(7, 'Bacia Polida C/Prato nº 1 Bege', 'bacia_polida_1'),
        new item(7, 'Bacia Polida C/Prato nº 1 Cimento', 'bacia_polida_1'),
        new item(7, 'Bacia Polida C/Prato nº 1 Marrom', 'bacia_polida_1'),
        new item(7, 'Bacia Polida C/Prato nº 1 Preto', 'bacia_polida_1'),

        new item(3, 'Bacia Polida C/Prato nº 2 Bege', 'bacia_polida_2'),
        new item(3, 'Bacia Polida C/Prato nº 2 Cimento', 'bacia_polida_2'),
        new item(0, 'Bacia Polida C/Prato nº 2 Marrom', 'bacia_polida_2'),
        new item(3, 'Bacia Polida C/Prato nº 2 Preto', 'bacia_polida_2'),

        new item(0, 'Coluna Red. Degrau Grafiato C/Prato nº 1 Bege', 'coluna_degrau_1'),
        new item(1, 'Coluna Red. Degrau Grafiato C/Prato nº 1 Cimento', 'coluna_degrau_1'),
        new item(1, 'Coluna Red. Degrau Grafiato C/Prato nº 1 Marrom', 'coluna_degrau_1'),
        new item(1, 'Coluna Red. Degrau Grafiato C/Prato nº 1 Preto', 'coluna_degrau_1'),

        new item(0, 'Coluna Red. Degrau Grafiato C/Prato nº 2 Bege', 'coluna_degrau_2'),
        new item(1, 'Coluna Red. Degrau Grafiato C/Prato nº 2 Cimento', 'coluna_degrau_2'),
        new item(2, 'Coluna Red. Degrau Grafiato C/Prato nº 2 Marrom', 'coluna_degrau_2'),
        new item(2, 'Coluna Red. Degrau Grafiato C/Prato nº 2 Preto', 'coluna_degrau_2'),

        new item(2, 'Coluna Red. Degrau Grafiato C/Prato nº 3 Bege', 'coluna_degrau_3'),
        new item(2, 'Coluna Red. Degrau Grafiato C/Prato nº 3 Cimento', 'coluna_degrau_3'),
        new item(2, 'Coluna Red. Degrau Grafiato C/Prato nº 3 Marrom', 'coluna_degrau_3'),
        new item(2, 'Coluna Red. Degrau Grafiato C/Prato nº 3 Preto', 'coluna_degrau_3'),

        new item(2, 'Coluna Red. Degrau Grafiato C/Prato nº 4 Bege', 'coluna_degrau_4'),
        new item(2, 'Coluna Red. Degrau Grafiato C/Prato nº 4 Cimento', 'coluna_degrau_4'),
        new item(2, 'Coluna Red. Degrau Grafiato C/Prato nº 4 Marrom', 'coluna_degrau_4'),
        new item(2, 'Coluna Red. Degrau Grafiato C/Prato nº 4 Preto', 'coluna_degrau_4'),

        new item(1, 'Coluna Red. Degrau Grafiato C/Prato nº 5 Bege', 'coluna_degrau_5'),
        new item(1, 'Coluna Red. Degrau Grafiato C/Prato nº 5 Preto', 'coluna_degrau_5'),

        new item(0, 'Coluna Red. Diamante C/Prato nº 1 Bege', 'coluna_diamante_1'),
        new item(0, 'Coluna Red. Diamante C/Prato nº 1 Cimento', 'coluna_diamante_1'),
        new item(0, 'Coluna Red. Diamante C/Prato nº 1 Marrom', 'coluna_diamante_1'),
        new item(0, 'Coluna Red. Diamante C/Prato nº 1 Preta', 'coluna_diamante_1'),

        new item(1, 'Coluna Red. Diamante C/Prato nº 2 Bege', 'coluna_diamante_2'),
        new item(1, 'Coluna Red. Diamante C/Prato nº 2 Cimento', 'coluna_diamante_2'),
        new item(1, 'Coluna Red. Diamante C/Prato nº 2 Marrom', 'coluna_diamante_2'),
        new item(3, 'Coluna Red. Diamante C/Prato nº 2 Preta', 'coluna_diamante_2'),

        new item(2, 'Coluna Red. Diamante C/Prato nº 3 Bege', 'coluna_diamante_3'),
        new item(0, 'Coluna Red. Diamante C/Prato nº 3 Cimento', 'coluna_diamante_3'),
        new item(4, 'Coluna Red. Diamante C/Prato nº 3 Marrom', 'coluna_diamante_3'),
        new item(2, 'Coluna Red. Diamante C/Prato nº 3 Preta', 'coluna_diamante_3'),

        new item(1, 'Coluna Red. Diamante C/Prato nº 4 Bege', 'coluna_diamante_4'),
        new item(0, 'Coluna Red. Diamante C/Prato nº 4 Cimento', 'coluna_diamante_4'),
        new item(1, 'Coluna Red. Diamante C/Prato nº 4 Marrom', 'coluna_diamante_4'),
        new item(1, 'Coluna Red. Diamante C/Prato nº 4 Preta', 'coluna_diamante_4'),

        new item(2, 'Coluna Red. Diamante C/Prato nº 5 Bege', 'coluna_diamante_5'),
        new item(1, 'Coluna Red. Diamante C/Prato nº 5 Cimento', 'coluna_diamante_5'),
        new item(0, 'Coluna Red. Diamante C/Prato nº 5 Marrom', 'coluna_diamante_5'),
        new item(1, 'Coluna Red. Diamante C/Prato nº 5 Preta', 'coluna_diamante_5'),

        new item(0, 'Coluna Red. Grafiato C/Preto nº 1 Bege', 'coluna_grafiato_1'),
        new item(0, 'Coluna Red. Grafiato C/Preto nº 1 Cimento', 'coluna_grafiato_1'),
        new item(0, 'Coluna Red. Grafiato C/Preto nº 1 Marrom', 'coluna_grafiato_1'),
        new item(0, 'Coluna Red. Grafiato C/Preto nº 1 Preto', 'coluna_grafiato_1'),

        new item(3, 'Coluna Red. Grafiato C/Preto nº 2 Bege', 'coluna_grafiato_2'),
        new item(4, 'Coluna Red. Grafiato C/Preto nº 2 Ciemento', 'coluna_grafiato_2'),
        new item(5, 'Coluna Red. Grafiato C/Preto nº 2 Marrom', 'coluna_grafiato_2'),
        new item(4, 'Coluna Red. Grafiato C/Preto nº 2 Preto', 'coluna_grafiato_2'),

        new item(7, 'Coluna Red. Grafiato C/Prato nº 3 Bege', 'coluna_grafiato_3'),
        new item(4, 'Coluna Red. Grafiato C/Prato nº 3 Cimento', 'coluna_grafiato_3'),
        new item(4, 'Coluna Red. Grafiato C/Prato nº 3 Marrom', 'coluna_grafiato_3'),
        new item(6, 'Coluna Red. Grafiato C/Prato nº 3 Preto', 'coluna_grafiato_3'),

        new item(4, 'Coluna Red. Grafiato C/Prato nº 4 Bege', 'coluna_grafiato_4'),
        new item(4, 'Coluna Red. Grafiato C/Prato nº 4 Cimento', 'coluna_grafiato_4'),
        new item(4, 'Coluna Red. Grafiato C/Prato nº 4 Marrom', 'coluna_grafiato_4'),
        new item(4, 'Coluna Red. Grafiato C/Prato nº 4 Preto', 'coluna_grafiato_4'),

        new item(0, 'Coluna Red. Marmorizada C/Prato nº 1 Azul', 'coluna_marmorizada_1'),
        new item(0, 'Coluna Red. Marmorizada C/Prato nº 1 Vermelho', 'coluna_marmorizada_1'),

        new item(2, 'Coluna Red. Marmorizada C/Prato nº 2 Azul', 'coluna_marmorizada_2'),
        new item(3, 'Coluna Red. Marmorizada C/Prato nº 2 Vermelho', 'coluna_marmorizada_2'),

        new item(1, 'Coluna Red. Marmorizada C/Prato nº 3 Azul', 'coluna_marmorizada_3'),
        new item(4, 'Coluna Red. Marmorizada C/Prato nº 3 Vermelho', 'coluna_marmorizada_3'),

        new item(1, 'Coluna Red. Marmorizada C/Prato nº 4 Azul', 'coluna_marmorizada_4'),
        new item(1, 'Coluna Red. Marmorizada C/Prato nº 4 Vermelho', 'coluna_marmorizada_4'),

        new item(0, 'Coluna Red. Polida C/Prato nº 1 Bege', 'coluna_polida_1'),
        new item(2, 'Coluna Red. Polida C/Prato nº 1 Cimento', 'coluna_polida_1'),
        new item(3, 'Coluna Red. Polida C/Prato nº 1 Marrom', 'coluna_polida_1'),
        new item(1, 'Coluna Red. Polida C/Prato nº 1 Preto', 'coluna_polida_1'),

        new item(3, 'Coluna Red. Polida C/Prato nº 2 Bege', 'coluna_polida_2'),
        new item(3, 'Coluna Red. Polida C/Prato nº 2 Cimento', 'coluna_polida_2'),
        new item(6, 'Coluna Red. Polida C/Prato nº 2 Marrom', 'coluna_polida_2'),
        new item(3, 'Coluna Red. Polida C/Prato nº 2 Preto', 'coluna_polida_2'),

        new item(0, 'Coluna Red. Polida C/Prato nº 3 Bege', 'coluna_polida_3'),
        new item(3, 'Coluna Red. Polida C/Prato nº 3 Cimento', 'coluna_polida_3'),
        new item(8, 'Coluna Red. Polida C/Prato nº 3 Marrom', 'coluna_polida_3'),
        new item(3, 'Coluna Red. Polida C/Prato nº 3 Preto', 'coluna_polida_3'),

        new item(0, 'Coluna Red. Polida C/Prato nº 4 Bege', 'coluna_polida_4'),
        new item(0, 'Coluna Red. Polida C/Prato nº 4 Cimento', 'coluna_polida_4'),
        new item(4, 'Coluna Red. Polida C/Prato nº 4 Marrom', 'coluna_polida_4'),
        new item(2, 'Coluna Red. Polida C/Prato nº 4 Preto', 'coluna_polida_4'),

        new item(1, 'Jardineira Frisada C/Prato Bege', 'jardineira_frisada_1'),
        new item(2, 'Jardineira Frisada C/Prato Preto', 'jardineira_frisada_1'),

        new item(2, 'Jardineira Grafiato C/Prato nº 1 Bege', 'jardineira_grafiato_1'),
        new item(2, 'Jardineira Grafiato C/Prato nº 1 Preto', 'jardineira_grafiato_1'),

        new item(0, 'Jardineira Grafiato C/Prato nº 2 Bege', 'jardineira_grafiato_2'),
        new item(2, 'Jardineira Grafiato C/Prato nº 2 Preto', 'jardineira_grafiato_2'),
        
        new item(3, 'Vaso Bojo Red. Diamante C/Prato nº 1 Bege', 'vaso_diamante_1'),
        new item(1, 'Vaso Bojo Red. Diamante C/Prato nº 1 Cimento', 'vaso_diamante_1'),
        new item(5, 'Vaso Bojo Red. Diamante C/Prato nº 1 Marrom', 'vaso_diamante_1'),
        new item(1, 'Vaso Bojo Red. Diamante C/Prato nº 1 Preto', 'vaso_diamante_1'),

        new item(0, 'Vaso Bojo Red. Diamante C/Prato nº 2 Bege', 'vaso_diamante_2'),
        new item(2, 'Vaso Bojo Red. Diamante C/Prato nº 2 Cimento', 'vaso_diamante_2'),
        new item(4, 'Vaso Bojo Red. Diamante C/Prato nº 2 Marrom', 'vaso_diamante_2'),
        new item(3, 'Vaso Bojo Red. Diamante C/Prato nº 2 Preto', 'vaso_diamante_2'),

        new item(2, 'Vaso Bojo Red. Diamante C/Prato nº 3 Bege', 'vaso_diamante_3'),
        new item(2, 'Vaso Bojo Red. Diamante C/Prato nº 3 Cimento', 'vaso_diamante_3'),
        new item(3, 'Vaso Bojo Red. Diamante C/Prato nº 3 Marrom', 'vaso_diamante_3'),
        new item(3, 'Vaso Bojo Red. Diamante C/Prato nº 3 Preto', 'vaso_diamante_3'),

        new item(8, 'Vaso Bojo Red. Diamante C/Prato nº 4 Bege', 'vaso_diamante_4'),
        new item(3, 'Vaso Bojo Red. Diamante C/Prato nº 4 Cimento', 'vaso_diamante_4'),
        new item(7, 'Vaso Bojo Red. Diamante C/Prato nº 4 Marrom', 'vaso_diamante_4'),
        new item(7, 'Vaso Bojo Red. Diamante C/Prato nº 4 Preto', 'vaso_diamante_4'),

        new item(13, 'Vaso Bojo Frisado C/Prato nº 1 Bege', 'vaso_frisado_1'),
        new item(13, 'Vaso Bojo Frisado C/Prato nº 1 Cimento', 'vaso_frisado_1'),
        new item(15, 'Vaso Bojo Frisado C/Prato nº 1 Marrom', 'vaso_frisado_1'),
        new item(13, 'Vaso Bojo Frisado C/Prato nº 1 Preto', 'vaso_frisado_1'),

        new item(6, 'Vaso Bojo Frisado C/Prato nº 2 Bege', 'vaso_frisado_2'),
        new item(10, 'Vaso Bojo Frisado C/Prato nº 2 Cimento', 'vaso_frisado_2'),
        new item(7, 'Vaso Bojo Frisado C/Prato nº 2 Marrom', 'vaso_frisado_2'),
        new item(7, 'Vaso Bojo Frisado C/Prato nº 2 Preto', 'vaso_frisado_2'),

        new item(7, 'Vaso Bojo Frisado C/Prato nº 3 Bege', 'vaso_frisado_3'),
        new item(10, 'Vaso Bojo Frisado C/Prato nº 3 Cimento', 'vaso_frisado_3'),
        new item(4, 'Vaso Bojo Frisado C/Prato nº 3 Marrom', 'vaso_frisado_3'),
        new item(6, 'Vaso Bojo Frisado C/Prato nº 3 Preto', 'vaso_frisado_3'),

        new item(6, 'Vaso Bojo Frisado C/Prato nº 4 Bege', 'vaso_frisado_4'),
        new item(6, 'Vaso Bojo Frisado C/Prato nº 4 Cimento', 'vaso_frisado_4'),
        new item(4, 'Vaso Bojo Frisado C/Prato nº 4 Marrom', 'vaso_frisado_4'),
        new item(5, 'Vaso Bojo Frisado C/Prato nº 4 Preto', 'vaso_frisado_4'),

        new item(5, 'Vaso Bojo Red. Grafiato C/Prato nº 1 Bege', 'vaso_grafiato_1'),
        new item(7, 'Vaso Bojo Red. Grafiato C/Prato nº 1 Cimento', 'vaso_grafiato_1'),
        new item(8, 'Vaso Bojo Red. Grafiato C/Prato nº 1 Marrom', 'vaso_grafiato_1'),
        new item(8, 'Vaso Bojo Red. Grafiato C/Prato nº 1 Preto', 'vaso_grafiato_1'),

        new item(5, 'Vaso Bojo Red. Grafiato C/Prato nº 2 Bege', 'vaso_grafiato_2'),
        new item(3, 'Vaso Bojo Red. Grafiato C/Prato nº 2 Cimento', 'vaso_grafiato_2'),
        new item(4, 'Vaso Bojo Red. Grafiato C/Prato nº 2 Marrom', 'vaso_grafiato_2'),
        new item(3, 'Vaso Bojo Red. Grafiato C/Prato nº 2 Preto', 'vaso_grafiato_2'),

        new item(6, 'Vaso Bojo Red. Grafiato C/Prato nº 3 Bege', 'vaso_grafiato_3'),
        new item(6, 'Vaso Bojo Red. Grafiato C/Prato nº 3 Cimento', 'vaso_grafiato_3'),
        new item(4, 'Vaso Bojo Red. Grafiato C/Prato nº 3 Marrom', 'vaso_grafiato_3'),
        new item(3, 'Vaso Bojo Red. Grafiato C/Prato nº 3 Preto', 'vaso_grafiato_3'),

        new item(3, 'Vaso Bojo Red. Grafiato C/Prato nº 4 Bege', 'vaso_grafiato_4'),
        new item(0, 'Vaso Bojo Red. Grafiato C/Prato nº 4 Cimento', 'vaso_grafiato_4'),
        new item(0, 'Vaso Bojo Red. Grafiato C/Prato nº 4 Marrom', 'vaso_grafiato_4'),
        new item(4, 'Vaso Bojo Red. Grafiato C/Prato nº 4 Preto', 'vaso_grafiato_4'),

        new item(3, 'Vaso Bojo Red. Marmorizado C/Prato nº 1 Azul', 'vaso_marmorizado_1'),
        new item(3, 'Vaso Bojo Red. Marmorizado C/Prato nº 1 Vermelho', 'vaso_marmorizado_1'),

        new item(3, 'Vaso Bojo Red. Marmorizado C/Prato nº 2 Azul', 'vaso_marmorizado_2'),
        new item(5, 'Vaso Bojo Red. Marmorizado C/Prato nº 2 Vermelho', 'vaso_marmorizado_2'),

        new item(5, 'Vaso Bojo Red. Marmorizado C/Prato nº 3 Azul', 'vaso_marmorizado_3'),
        new item(5, 'Vaso Bojo Red. Marmorizado C/Prato nº 3 Vermelho', 'vaso_marmorizado_3'),

        new item(7, 'Vaso Bojo Red. Polido C/Prato nº 1 Bege', 'vaso_polido_1'),
        new item(5, 'Vaso Bojo Red. Polido C/Prato nº 1 Cimento', 'vaso_polido_1'),
        new item(5, 'Vaso Bojo Red. Polido C/Prato nº 1 Marrom', 'vaso_polido_1'),
        new item(6, 'Vaso Bojo Red. Polido C/Prato nº 1 Preto', 'vaso_polido_1'),

        new item(1, 'Vaso Bojo Red. Polido C/Prato nº 2 Bege', 'vaso_polido_2'),
        new item(4, 'Vaso Bojo Red. Polido C/Prato nº 2 Cimento', 'vaso_polido_2'),
        new item(4, 'Vaso Bojo Red. Polido C/Prato nº 2 Marrom', 'vaso_polido_2'),
        new item(3, 'Vaso Bojo Red. Polido C/Prato nº 2 Preto', 'vaso_polido_2'),

        new item(0, 'Vaso Bojo Red. Polido C/Prato nº 3 Bege', 'vaso_polido_3'),
        new item(3, 'Vaso Bojo Red. Polido C/Prato nº 3 Cimento', 'vaso_polido_3'),
        new item(1, 'Vaso Bojo Red. Polido C/Prato nº 3 Marrom', 'vaso_polido_3'),
        new item(3, 'Vaso Bojo Red. Polido C/Prato nº 3 Preto', 'vaso_polido_3'),

        new item(0, 'Vaso Cone Polido C/Prato nº 4 Bege', 'vaso_cone_4'),
        new item(1, 'Vaso Cone Polido C/Prato nº 4 Cimento', 'vaso_cone_4'),
        new item(2, 'Vaso Cone Polido C/Prato nº 4 Marrom', 'vaso_cone_4'),
        new item(1, 'Vaso Cone Polido C/Prato nº 4 Preto', 'vaso_cone_4')
    ]
)
var alfa_fibraSintetica = new Inventario(
    'Alfa Fibra Sintética',
    '23/10/2023',
    [
        new item(18, "Cuia Sem Borda nº 1 Argila", 'cuia_1'),
        new item(4, "Cuia Sem Borda nº 1 Branco", 'cuia_1'),
        new item(10, "Cuia Sem Borda nº 1 Cappuccino", 'cuia_1'),
        new item(15, "Cuia Sem Borda nº 1 Envelhecido", 'cuia_1'),
        new item(5, "Cuia Sem Borda nº 1 Palha", 'cuia_1'),

        new item(10, "Cuia Sem Borda nº 2 Argila", 'cuia_2'),
        new item(0, "Cuia Sem Borda nº 2 Branco", 'cuia_2'),
        new item(10, "Cuia Sem Borda nº 2 Cappuccino", 'cuia_2'),
        new item(10, "Cuia Sem Borda nº 2 Envelhecido", 'cuia_2'),
        new item(5, "Cuia Sem Borda nº 2 Palha", 'cuia_2'),

        new item(17, "Cuia Sem Borda nº 3 Argila", 'cuia_3'),
        new item(0, "Cuia Sem Borda nº 3 Branco", 'cuia_3'),
        new item(12, "Cuia Sem Borda nº 3 Cappuccino", 'cuia_3'),
        new item(8, "Cuia Sem Borda nº 3 Envelhecido", 'cuia_3'),
        new item(16, "Cuia Sem Borda nº 3 Palha", 'cuia_3'),

        new item(6, "Cuia Sem Borda nº 4 Argila", 'cuia_4'),
        new item(0, "Cuia Sem Borda nº 4 Branco", 'cuia_4'),
        new item(8, "Cuia Sem Borda nº 4 Cappuccino", 'cuia_4'),
        new item(6, "Cuia Sem Borda nº 4 Envelhecido", 'cuia_4'),
        new item(7, "Cuia Sem Borda nº 4 Palha", 'cuia_4'),

        new item(3, "Cachepot Cactos nº 1 Argila", 'cactus_1'),
        new item(8, "Cachepot Cactos nº 1 Cappuccino", 'cactus_1'),
        new item(8, "Cachepot Cactos nº 1 Envelhecido", 'cactus_1'),

        new item(8, "Cachepot Cactos nº 2 Argila", 'cactus_2'),
        new item(8, "Cachepot Cactos nº 2 Cappuccino", 'cactus_2'),
        new item(7, "Cachepot Cactos nº 2 Envelhecido", 'cactus_2'),

        new item(10, "Cachepot Cactos nº 3 Argila", 'cactus_3'),
        new item(8, "Cachepot Cactos nº 3 Cappuccino", 'cactus_3'),
        new item(16, "Cachepot Cactos nº 3 Envelhecido", 'cactus_3'),
            
        new item(11 , "Cachepot Sem Borda nº 1 Argile", 'cachepot_1'),
        new item(7, "Cachepot Sem Borda nº 1 Cappuccino", 'cachepot_1'),
        new item(6,  "Cachepot Sem Borda nº 1 Envelhecido", 'cachepot_1'),

        new item(0, "Cachepot Sem Borda nº 2 Argile", 'cachepot_2'),
        new item(7, "Cachepot Sem Borda nº 2 Cappuccino", 'cachepot_2'),
        new item(9, "Cachepot Sem Borda nº 2 Envelhecido", 'cachepot_2'),
        new item(0, "Cachepot Sem Borda nº 2 Palha", 'cachepot_2'),

        new item(12, "Cachepot Sem Borda nº 3 Argile", 'cachepot_3'),
        new item(10, "Cachepot Sem Borda nº 3 Cappuccino", 'cachepot_3'),
        new item(13, "Cachepot Sem Borda nº 3 Envelhecido", 'cachepot_3'),
        new item(8, "Cachepot Sem Borda nº 3 Palha", 'cachepot_3'),

        new item(9, "Cachepot Sem Borda nº 4 Argile", 'cachepot_4'),
        new item(11, "Cachepot Sem Borda nº 4 Cappuccino", 'cachepot_4'),
        new item(12, "Cachepot Sem Borda nº 4 Envelhecido", 'cachepot_4'),
        new item(3, "Cachepot Sem Borda nº 4 Palha", 'cachepot_4'),

        new item(2, "Coluna Quadrada nº 2 Argile", 'coluna_2'),
        new item(2, "Coluna Quadrada nº 2 Cappuccino", 'coluna_2'),
        new item(2, "Coluna Quadrada nº 2 Envelhecido", 'coluna_2'),

        new item(3, "Coluna Quadrada nº 3 Argile", 'coluna_3'),
        new item(2, "Coluna Quadrada nº 3 Cappuccino", 'coluna_3'),
        new item(2, "Coluna Quadrada nº 3 Envelhecido", 'coluna_3'),

        new item(4, "Vaso Red. Sem Borda nº 1 Cappuccino", 'vaso_1'),
        new item(4, "Vaso Red. Sem Borda nº 1 Envelhecido", 'vaso_1'),

        new item(4, "Vaso Red. Sem Borda nº 2 Cappuccino", 'vaso_2'),
        new item(1, "Vaso Red. Sem Borda nº 2 Envelhecido", 'vaso_2'),

        new item(4, "Vaso Red. Sem Borda nº 3 Cappuccino", 'vaso_3'),
        new item(4, "Vaso Red. Sem Borda nº 3 Envelhecido", 'vaso_3'),

        new item(4, "Vaso Red. Sem Borda nº 4 Cappuccino", 'vaso_4'),
        new item(4, "Vaso Red. Sem Borda nº 4 Envelhecido", 'vaso_4')
    ]
)
var policamp = new Inventario(
    'Policamp',
    '27/10/2023',
    [
        new item(94, 'Pulverizador 500ml', 'pulverizador'),
        new item(82, 'Pulverizador 1 litro', 'pulverizador'),
        new item(33, 'Regador Com Cabo - Bico', 'Regador_cabo'),
        new item(30, 'Regador Com Cabo - Chuveiro', 'Regador_cabo'),
        new item(108, 'Regador - 2 litros', 'Regador'),
        new item(118, 'Regador - 4 litros', 'Regador'),
        new item(101, 'Regador - 5 litros', 'Regador'),
        new item(69, 'Regador - 10 litros', 'Regador')
    ]
)
var jel_plast = new Inventario(
    'Jel Plast',
    '21/10/2023',
    [
        new item(36, 'Bebedouro Beija Flor Bandeija REF20', 'bebedouro'),
        new item(0, 'Bebedouro Beija Flor Luxo Chapeu Com Poleiro REF50', 'bebedouro'),
        new item(78, 'Bebedouro Beija Flor Puleiro REF55', 'bebedouro'),
        new item(396, 'Bebedouro Beija Flor Simples REF40', 'bebedouro'),
        new item(0, 'Nectar de Beija Flor Com Corante', 'nectar'),
        new item(0, 'Nectar de Beija Flor Sem Corante', 'nectar')
    ]
)
var insetimax = new Inventario(
    'Insetimax',
    '21/10/2023',
    [
        new item(53, 'Cupinicida Insetimaster - 100ml', 'cupinicida'),

        new item(57, 'Formicida Insetimaster - 100ml', 'formicida'),
        new item(3, 'Formicida Insetimaster - 1 litro', 'formicida'),

        new item(5, 'Inseticom Jardim - Caixa', 'inseticom'),

        new item(45, 'Malathion 500CE - 100ml', 'malathion')
    ]   
)
var madeiras = new Inventario(
    'Madeiras',
    '23/10/2023',
    [
        new item(3, 'Treliça 50x50cm Simples', 'treliça'),
        new item(1, 'Treliça 50x50cm Pintada', 'treliça'),
        new item(1, 'Treliça 40x100cm Simples', 'treliça'),
        new item(1, 'Treliça 40x100cm Pintada', 'treliça'),
        new item(2, 'Treliça 100x40cm Pintada', 'treliça'),
        new item(1, 'Treliça 70x100cm Simples', 'treliça'),
        new item(3, 'Treliça 70x100cm Pintada', 'treliça'),
        new item(0, 'Treliça 100x100cm Pintada', 'treliça'),
        new item(0, 'Treliça 100x100cm Simples', 'treliça'),

        new item(15, 'Cachepo Madeira 20 Simples', 'cachepo'),
        new item(10, 'Cachepo Madeira 20 Pintado', 'cachepo'),
        new item(7, 'Cachepo Madeira 40 Simples', 'cachepo'),
        new item(10, 'Cachepo Madeira 40 Pintado', 'cachepo'),

        new item(20, 'Rodízio Redondo 20cm', 'rodízio_redondo'),
        new item(12, 'Rodízio Redondo 25cm', 'rodízio_redondo'),
        new item(10, 'Rodízio Redondo 30cm', 'rodízio_redondo'),
        new item(12, 'Rodízio Redondo 35cm', 'rodízio_redondo'),
        new item(2, 'Rodízio Redondo 40cm', 'rodízio_redondo'),
        new item(1, 'Rodízio Redondo 50cm', 'rodízio_redondo'),

        new item(11, 'Rodízio Quadrado 20cm', 'rodízio_quadrado'),
        new item(10, 'Rodízio Quadrado 25cm', 'rodízio_quadrado'),
        new item(8, 'Rodízio Quadrado 30cm', 'rodízio_quadrado'),
        new item(8, 'Rodízio Quadrado 35cm', 'rodízio_quadrado'),
        new item(10, 'Rodízio Quadrado 40cm', 'rodízio_quadrado'),
        new item(5, 'Rodízio Quadrado 45cm', 'rodízio_quadrado'),
        new item(1, 'Rodízio Quadrado 50cm', 'rodízio_quadrado'),
    ]
)
var nutriplan = new Inventario(
    'Nutriplan',
    '20/10/2023', 
    [
        new item(47, 'Pote de Muda - 25 litros', 'pote'),
        new item(28, 'Pote de Muda - 33 litros', 'pote'),
        new item(15, 'Pote de Muda - 40 litros', 'pote'),
        new item(0, 'Pote de Muda - 50 litros', 'pote'),
        new item(1, 'Pote de Muda - 60 litros', 'pote'),
        new item(6, 'Pote de Muda - 85 litros', 'pote'),

        new item(1, 'Vaso Classic Cilindrico 55 cobre', 'cilindrico_55'),

        new item(1, 'Vaso Classic Cônico 46 - Azul Cobalto', 'conico_46'),
        new item(1, 'Vaso Classic Cônico 46 - Ferrugem', 'conico_46') ,
        new item(1, 'Vaso Classic Cônico 46 - Grafite', 'conico_46'),

        new item(1, 'Vaso Classic Cônico 66 - Ferrugem', 'conico_66'),

        new item(2, 'Vaso Classic Cone 100 - Rubi', 'cone_100'),
        new item(1, 'Vaso Classic Cone 100 - Verde Guatemala', 'cone_100'),

        new item(1, 'Vaso Riscatto Oval Baixo 30 - Ferrugem', 'oval_baixo_30'),

        new item(2, 'Vaso Riscatto Redondo 45 - Granito', 'redondo_45'),

        new item(3, 'Vaso Riscatto Redondo 60 - Granito', 'redondo_60')
    ]
)
var coquim = new Inventario(
    'Coquim',
    '11/10/2023',
    [
        new item(8, '999 - Vaso Coquim nº 3', 'vaso_coquim'),
        new item(14, '1000 - Vaso Coquim nº 4', 'vaso_coquim'),
        new item(15, '1001 - Vaso Coquim nº 5', 'vaso_coquim'),
        new item(4, '1002 - Vaso Coquim nº 8', 'vaso_coquim'),
        new item(0, '1003 - Vaso Coquim nº 10', 'vaso_coquim'),
        new item(11, '1004 - Vaso Coquim nº 12', 'vaso_coquim'),
        new item(5, '1005 - Vaso Coquim nº 14', 'vaso_coquim'),

        new item(0, '1006 - Vaso Coquim nº 5 Virola', 'vaso_virola'),
        new item(0, '1007 - Vaso Coquim nº 10 Virola', 'vaso_virola'),
        new item(0, '1008 - Vaso Coquim nº 12 Virola', 'vaso_virola'),
        new item(0, '1009 - Vaso Coquim nº 14 Virola', 'vaso_virola'),

        new item(11, '1010 - Vaso Coquim nº 17', 'vaso_coquim'),
        new item(4, '1011 - Vaso Coquim nº 13', 'vaso_coquim'),
        new item(5, '1012 - Vaso Coquim nº 15', 'vaso_coquim'),

        new item(3, '1021 - Vaso Coquim nº 10 C/Furos', 'vaso_furos'),
        new item(2, '1022 - Vaso Coquim nº 12 C/Furos', 'vaso_furos'),
        new item(3, '1023 - Vaso Coquim nº 13 C/Furos', 'vaso_furos'),
        new item(2, '1024 - Vaso Coquim nº 15 C/Furos', 'vaso_furos'),

        new item(3, '1025 - Vaso Coquim nº 10 C/Furos e Suporte', 'vaso_furos_suporte'),
        new item(2, '1026 - Vaso Coquim nº 12 C/Furos e Suporte', 'vaso_furos_suporte'),
        new item(3, '1027 - Vaso Coquim nº 13 C/Furos e Suporte', 'vaso_furos_suporte'),
        new item(2, '1028 - Vaso Coquim nº 15 C/Furos e Suporte', 'vaso_furos_suporte'),
        
        new item(3, '1029 - 1/2 Vaso nº 10 C/Furos', '1/2_vaso_furos'),
        new item(2, '1030 - 1/2 Vaso nº 12 C/Furos', '1/2_vaso_furos'),

        new item(2, '2001 - Placa Coquim 20x20', 'placa_coquim'),
        new item(5, '2002 - Placa Coquim 20x40', 'placa_coquim'),
        new item(9, '2003 - Placa Coquim 20x60', 'placa_coquim'),
        new item(10, '2004 - Placa Coquim 20x80', 'placa_coquim'),
        new item(3, '2005 - Placa Coquim 40x40', 'placa_coquim'),
        new item(6, '2006 - Placa Coquim 40x80', 'placa_coquim'),

        new item(3, '2007 - Placa Redonda Coquim 20cm', 'placa_redonda'),
        new item(5, '2008 - Placa Redonda Coquim 25cm', 'placa_redonda'),
        new item(3, '2009 - Placa Redonda Coquim 30cm', 'placa_redonda'),
        new item(1, '2010 - Placa Redonda Coquim 35cm', 'placa_redonda'),
        new item(1, '2011 - Placa Redonda Coquim 40cm', 'placa_redonda'),
        new item(2, '2012 - Placa Redonda Coquim 50cm', 'placa_redonda'),

        new item(3, '2013 - Placa Colmeia Coquim 30cm', 'placa_colmeia'),

        new item(35, '2999 - Estaca Coquim 30cm', 'estaca_coquim'),
        new item(40, '3000 - Estaca Coquim 40cm', 'estaca_coquim'),
        new item(35, '3001 - Estaca Coquim 60cm', 'estaca_coquim'),
        new item(33, '3002 - Estaca Coquim 80cm', 'estaca_coquim'),

        new item(23, '4000 - Mix Coquim 1kg', 'adubos'),
        new item(1, '4001 - Pó de Coco 1kg', 'adubos'),
        new item(10, '4002 - Fibra de Coco 200g', 'adubos'),
        new item(3, '4003 - Pó de Coco Magico 400g', 'adubos'),
        new item(3, '4004 - Fibra de Coco Curta 1kg', 'adubos'),
        new item(14, '4005 - Chips de Coco 200g', 'adubos'),
        new item(26, '4006 - Fibra de Coco Protein', 'adubos'),
        new item(20, '4007 - Chips de Mix Protem 1kg', 'adubos'),
        new item(0, '4008 - Chips de Coco 3kg', 'adubos'),
        new item(0, '4009 - Fibra de Coco 1.5kg', 'adubos'),
        new item(0, '4010 - Musgo Esfagno 5kg', 'adubos'),
        new item(0, '4011 - Musgo Esfagno 100g', 'adubos'),
        new item(0, '4012 - Fibra Curta 250g', 'adubos'),

        new item(2, '5000 - Placa 20x20cm Com 1 Meio Vaso nº 5', 'placa_com_vaso'),
        new item(1, '5001 - Placa 20x40cm Com 1 Meio Vaso nº 10', 'placa_com_vaso'),
        new item(2, '5002 - Placa 40x40cm Com 1 Meio Vaso nº 12', 'placa_com_vaso'),
        new item(3, '5003 - Placa 20x60cm Com 2 Meio Vasos nº 8', 'placa_com_vaso'),
        new item(2, '5007 - Placa 30x40cm Com 1 Meio Vaso nº 12', 'placa_com_vaso'),
        new item(1, '5008 - Placa 20x30cm Com 1 Meio Vaso nº 10', 'placa_com_vaso'),
        new item(1, '5013 - Placa 40x80cm Com 2 Meio Vasos nº 14', 'placa_com_vaso'),
        new item(0, '5014 - Painel 1.00x1.00m Com 8 Meio Vasos nº 12', 'placa_com_vaso'),
        new item(3, '5015 - Placa 30x40cm Com 2 Meio Vasos nº 10', 'placa_com_vaso'),
        new item(0, '5016 - Placa 40x60cm Com 3 Meio Vasos nº 13', 'placa_com_vaso'),
        new item(0, '5017 - Placa 40x60cm Com 4 Meio Vasos nº 13', 'placa_com_vaso'),
        new item(0, '5018 - Placa 60x60cm Com 5 Meio Vasos nº 10', 'placa_com_vaso'),
        new item(0, '5019 - Placa 80x80cm Com 5 Meio Vasos nº 12', 'placa_com_vaso'),

        new item(4, '5020 - 1/2 Vaso nº 13 Com Placa Redonda 25cm', 'meio_vaso'),
        new item(3, '5021 - 1/2 Vaso nº 15 Com Placa Redonda 30cm', 'meio_vaso'),
        new item(4, '5022 - 1/2 Vaso nº 17 Com Placa Redonda 35cm', 'meio_vaso'),
        new item(0, '5023 - 1/2 Vaso Virola nº 5 Com Placa Redonda 25cm', 'meio_vaso'),
        new item(0, '5024 - 1/2 Vaso Virola nº 10 Com Placa Redonda 30cm', 'meio_vaso'),
        new item(0, '5025 - 1/2 Vaso Virola nº 12 Com Placa Redonda 35cm', 'meio_vaso'),
        new item(0, '5026 - 1/2 Vaso Virola nº 14 Com Placa Redonda 40cm', 'meio_vaso'),
        new item(6, '5027 - 1/2 Vaso nº 10 Com Placa Colmeia 30cm', 'meio_vaso'),
        new item(0, '5028 - 1/2 Vaso Virola nº 10 Com Placa Colmeia 30cm', 'meio_vaso'),
        new item(5, '5029 - 1/2 Vaso nº 13 Com Placa Colmeia 30cm', 'meio_vaso'),

        new item(4, '5200 - 1/2 Vaso nº 10 C/Placa', '1/2_vaso_placa'),
        new item(4, '5201 - 1/2 Vaso nº 12 C/Placa', '1/2_vaso_placa'),
        new item(8, '5202 - 1/2 Vaso nº 14 C/Placa', '1/2_vaso_placa'),
        new item(6, '5203 - 1/2 Vaso nº 17 C/Placa', '1/2_vaso_placa'),
        new item(5, '5204 - 1/2 Vaso nº 13 C/Placa', '1/2_vaso_placa'),
        new item(5, '5205 - 1/2 Vaso n° 15 C/Placa', '1/2_vaso_placa'),
        
        new item(0, '6007 - Manta Calandrada 4mm', 'manta'),
        new item(12, '6008 - Manta 1mm 0.5x2m', 'manta'),
        new item(15, '6009 - Manta 1mm 1x1m', 'manta'),
        new item(4, '6011 - Manta Microverdes 1x1m', 'manta'),
        new item(5, '6015 - Manta Refil 25cm', 'manta'),
        new item(6, '6016 - Manta Refil 30cm', 'manta'),
        new item(3, '6017 - Manta Refil 35cm', 'manta'),

        new item(7, '7000 - 1/2 Vaso nº 13 C/Placa Media 19x18cm', '1/2_vaso_placa'),
        new item(7, '7001 - 1/2 Vaso nº 15 C/Placa Media 24x20cm', '1/2_vaso_placa'),
        new item(0, '7002 - 1/2 Vaso nº 17 C/Placa Media 29x26cm', '1/2_vaso_placa'),
        
        new item(5, '8005 - Vaso Coquim 05 Com Suporte', 'vaso_cordeinha'),
        new item(10, '8006 - Vaso Coquim 08 Com Suporte', 'vaso_cordeinha'),
        new item(8, '8007 - Vaso Coquim 10 Com Suporte', 'vaso_cordeinha'),

        new item(8, '8013 - Kopin Coquim', 'kopin'),

        new item(0, '9014 - Cachepot Onda 13x12cm', 'cahepot'),
        new item(0, '9015 - Cachepot Onda 15x15cm', 'cahepot'),
        new item(0, '9016 - Cachepot Quadrado 15x15cm', 'cahepot'),
        new item(0, '9017 - Cachepot Quadrado 13x12cm', 'cahepot'),

        new item(5, '9022 - Kokindama', 'coquidama'),
        new item(14, '9023 - Cestindama', 'coquidama'),
        new item(10, '9024 - Kokindama P', 'coquidama'),
        new item(10, '9025 - Cestindama P', 'coquidama'),

        new item(14, '9028 - Coquim Orquidea de Parede Mini', 'cone'),
        new item(13, '9029 - Coquim Orquidea de Parede P', 'cone'),
        new item(10, '8000 - Coquim Orquidea de Parede M', 'cone'),
        new item(5, '9030 - Coquim Orquidea de Parede G', 'cone'),
        new item(7, '9031 - Coquim Orquidea de Parede GG', 'cone'),

        new item(10, '9040 - Cesto Aramado Coquim 25cm com Manta e Corrente', 'cesto_aramado'),
        new item(12, '9041 - Cesto Aramado Coquim 30cm com Manta e Corrente', 'cesto_aramado'),
        new item(10, '9042 - Cesto Aramado Coquim 35cm com Manta e Corrente', 'cesto_aramado'),
    ]
)

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
        console.log(comanda)

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
    sec.innerHTML += `<h1>${empresa.nome}</h1>`
    sec.innerHTML += `<h2>${empresa.data}</h2>`
    
    let repeatNumber = 0
    for (let index in empresa.inventario) {
        if (empresa.inventario[index].nome.length > repeatNumber) {repeatNumber = empresa.inventario[index].nome.length}
    }

    let objeto = empresa.inventario[0].objeto
    for (let index in empresa.inventario) {
        if (objeto != empresa.inventario[index].objeto) {sec.innerHTML += '<br>'}
        sec.innerHTML += `
        <label id='${identificador}${index}' class='inventario'>
            ${empresa.inventario[index].nome}${'.'.repeat(repeatNumber - (empresa.inventario[index].nome.length))}${'.'.repeat(5 - String(empresa.inventario[index].quantidade).length)}${empresa.inventario[index].quantidade}
        </label>`
        objeto = empresa.inventario[index].objeto
        //onclick="linhaDestacada(${identificador}${index})"
    }
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

function repositor(identidade) {
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
        if (formaDePagamento.value == 'credito' && comanda.parcelas != 0 && comanda.valor != 0) {
            let valorDeParcela
            if (((comanda.valor/comanda.parcelas).toFixed(2))*comanda.parcelas < comanda.valor) {valorDeParcela = Math.ceil(comanda.valor/comanda.parcelas).toFixed(2)} else {valorDeParcela = (comanda.valor/comanda.parcelas).toFixed(2)}

            etiquetaDeParcelas.style.display = 'inline'
            etiquetaDeParcelas.innerText = `${comanda.parcelas}x de R$${(valorDeParcela).replace('.', ',')}`
        }
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
            novaLinha(index)

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
            console.log(`valor ${corretor.value} editado com susseso`)
            
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
        
        console.log(`Registro de Comanda.registro acionado pela linha ${index}`)
        console.log(`quantidade: ${quantidade.value} descrição: ${descrição.value} valorUnitario: ${valorUnitario.value} valorTotal: ${valorTotal.value}\n\n`)    
        console.log(comanda.registro)
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
        if (((comanda.valor/comanda.parcelas).toFixed(2))*comanda.parcelas < comanda.valor) {valorDeParcela = Math.ceil(comanda.valor/comanda.parcelas).toFixed(2)} else {valorDeParcela = (comanda.valor/comanda.parcelas).toFixed(2)}

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
}

//====================================================||Comandos||================================================

impreção(articleRegaplan, regaplan, 'regaplan')
impreção(articleEmeAEme, emeAeme, 'emeAeme')
impreção(articleForth, forth, 'forth')
impreção(articleFuzil, fuzil, 'fuzil')
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
