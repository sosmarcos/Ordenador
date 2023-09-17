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
            <label id='linha${index}' class='linhaRetorno' onclick='funçoesDoValor(${index})'>
                ${this.texto}
            </label>
            <div id='funçoes${index}' class="menuEspecifico">
            <input type="number" id="entradaM${index}" class='entradaMultiplo' onchange="multiplicação(${index})">
            <input type="number" id="entrada%${index}" class='entradaDesconto' onchange="desconto(${index})">
            <input type="button" class="funçoes" value="%" onclick="alternarEntrada(${index})">
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

//=============================================||Variaveis||======================================================

var total = 0
var registroDaCalculadora = []
var registroDoRepositor = []
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

//=======================||Seções||=========================//
var sectPlantas = window.document.getElementById('plantas')
var sectCalculo = window.document.getElementById('calculadora')
var sectInventarios = window.document.getElementById('inventarios')
var sectRepositor = window.document.getElementById('repositor')

//=======================||Artigos||========================//
var articleRegaplan = window.document.getElementById('regaplan')
var articleRischioto = window.document.getElementById('rischioto')
var articleEmeAEme = window.document.getElementById('eme_a_eme')
var articleForth = window.document.getElementById('forth')
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
    '12/09/2023',
    [
        new item(102, 'Corrente 44cm - Dourado 1.6mm', 'corrente_1.6mm'),
        new item(78, 'Corrente 54cm - Dourado 1.6mm', 'corrente_1.6mm'),
        new item(96, 'Corrente 64cm - Dourado 1.6mm', 'corrente_1.6mm'),
        new item(96, 'Corrente 74cm - Dourado 1.6mm', 'corrente_1.6mm'),
        new item(96, 'Corrente 84cm - Dourado 1.6mm', 'corrente_1.6mm'),

        new item(114, 'Corrente Lustre 50 - Dourado 2.0mm', 'corrente_2.0mm'),
        new item(114, 'Corrente Lustre 60 - Dourado 2.0mm', 'corrente_2.0mm'),
        new item(114, 'Corrente Lustre 70 - Dourado 2.0mm', 'corrente_2.0mm'),
        new item(102, 'Corrente Lustre 80 - Dourado 2.0mm', 'corrente_2.0mm'),

        new item(40, 'Gancho S Grande - Dourado 18cm', 'gancho_S'),
        new item(30, 'Gancho S Médio - Dourado 18cm', 'gancho_S'),
        new item(40, 'Gancho S Pequeno - Dourado 18cm', 'gancho_S'),

        new item(70, 'Suporte A Reforçado 01 - 19cm Dourado', 'sp_a_reforçado'),
        new item(60, 'Suporte A Reforçado 02 - 24cm Dourado', 'sp_a_reforçado'),
        new item(80, 'Suporte A Reforçado 03 - 29cm Dourado', 'sp_a_reforçado'),
        new item(29, 'Suporte A Reforçado 04 - 34cm Dourado', 'sp_a_reforçado'),

        new item(90, 'Suporte Artístico 00 - 19cm Dourado', 'sp_artistico'),
        new item(100, 'Suporte Artístico 01 - 26cm Dourado', 'sp_artistico'),
        new item(60, 'Suporte Artístico 02 - 31cm Dourado', 'sp_artistico'),
        new item(80, 'Suporte Artístico 03 - 37cm Dourado', 'sp_artistico'),
        new item(93, 'Suporte Artístico 04 - 43cm Dourado', 'sp_artistico'),

        new item(3, 'Suporte Arvore - 3 Vasos Dourado', 'sp_arvore'),
        new item(3, 'Suporte Arvore - 3 Vasos Preto', 'sp_arvore'),
        new item(2, 'Suporte Arvore - 5 Vasos Dourado', 'sp_arvore'),
        new item(4, 'Suporte Arvore - 5 Vasos Preto', 'sp_arvore'),

        new item(4, 'Suporte Coador 26cm Preto', 'sp_coador'),
        new item(2, 'Suporte Coador 28cm Preto', 'sp_coador'),
        new item(7, 'Suporte Coador 30cm Preto', 'sp_coador'),
        new item(1, 'Suporte Coador 32cm Preto', 'sp_coador'),

        new item(17, 'Suporte de Canto Dourado'),

        new item(15, 'Suporte Margarida 01 - 19 cm Dourado', 'sp_margarida'),
        new item(25, 'Suporte Margarida 02 - 21 cm Dourado', 'sp_margarida'),
        new item(30, 'Suporte Margarida 03 - 23 cm Dourado', 'sp_margarida'),
        new item(25, 'Suporte Margarida 04 - 26 cm Dourado', 'sp_margarida'),

        new item(25, 'Suporte Rasteiro Chapa 01 - 18cm Dourado', 'sp_rasteiro'),
        new item(25, 'Suporte Rasteiro Chapa 02 - 21cm Dourado', 'sp_rasteiro'),
        new item(30, 'Suporte Rasteiro Chapa 03 - 24cm Dourado', 'sp_rasteiro'),
        new item(30, 'Suporte Rasteiro Chapa 04 - 27cm Dourado', 'sp_rasteiro'),
        new item(20, 'Suporte Rasteiro Chapa 05 - 30cm Dourado', 'sp_rasteiro'),
        new item(20, 'Suporte Rasteiro Chapa 06 - 33cm Dourado', 'sp_rasteiro'),
        new item(20, 'Suporte Rasteiro Chapa 07 - 36cm Dourado', 'sp_rasteiro'),
        new item(20, 'Suporte Rasteiro Chapa 08 - 40cm Dourado', 'sp_rasteiro'),

        new item(0, 'Suporte Torre 40cm Dourado', 'sp_torre'),
        new item(6, 'Suporte Torre 40cm Preto', 'sp_torre'),
        new item(0, 'Suporte Torre 60cm Dourado', 'sp_torre'),
        new item(7, 'Suporte Torre 60cm Preto', 'sp_torre'),
        new item(1, 'Suporte Torre 80cm Dourado', 'sp_torre'),
        new item(12, 'Suporte Torre 80cm Preto', 'sp_torre'),
        new item(4, 'Suporte Torre 110cm Dourado', 'sp_torre'),
        new item(10, 'Suporte Torre 110cm Preto', 'sp_torre'),

        new item(0, 'Tripé Decorativo Grande Dourado', 'tp_decorativo'),
        new item(5, 'Tripé Decorativo Grande Preto', 'tp_decorativo'),
        new item(0, 'Tripé Decorativo Médio Dourado', 'tp_decorativo'),
        new item(5, 'Tripé Decorativo Médio Preto', 'tp_decorativo'),
        new item(0, 'Tripé Decorativo Pequeno Dourado', 'tp_decorativo'),
        new item(10, 'Tripé Decorativo Pequeno Preto', 'tp_decorativo'),

        new item(10, 'Tripé Suspenso 01 20x40cm', 'tp_suspenso'),
        new item(10, 'Tripé Suspenso 01 25x40cm', 'tp_suspenso'),
        new item(20, 'Tripé Suspenso 01 30x40cm', 'tp_suspenso'),

        new item(5, 'Violeteiro Com Corrente - 2 Vasos', 'violeteiro'),
        new item(5, 'Violeteiro Com Corrente - 3 Vasos', 'violeteiro'),
        new item(6, 'Violeteiro Com Corrente - 4 Vasos', 'violeteiro'),
        new item(7, 'Violeteiro Com Corrente - 5 Vasos', 'violeteiro'),

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
    '12/09/2023',
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
        new item(20, 'Caixa Organizadora - 10 litros', 'conteiner'),
        new item(0, 'Caixa Organizadora - 12 litros', 'conteiner'),
        new item(26, 'Caixa Organizadora - 20 litros', 'conteiner'),
        new item(9, 'Caixa Organizadora - 50 litros', 'conteiner'),
        new item(6, 'Caixa Organizadora - 80 litros', 'conteiner'),

        new item(19, 'Caixa Rattan Areia - 2.5 litros', 'caixa_rattan'),
        new item(19, 'Caixa Rattan Areia - 4 litros', 'caixa_rattan'),
        new item(9, 'Caixa Rattan Areia - 7.5 litros', 'caixa_rattan'),
        new item(7, 'Caixa Rattan Areia - 15 litros', 'caixa_rattan'),

        new item(0, 'Cesto Fechado Cinza - 30 litros', 'cesto'),
        new item(0, 'Cesto Fechado Cinza - 54 litros', 'cesto'),
        new item(0, 'Cesto Fechado Cinza - 100 litros', 'cesto'),

        new item(0, 'Cesto Telado - 30 litros', 'cesto_telado'),
        new item(3, 'Cesto Telado - 60 litros', 'cesto_telado'),

        new item(5, 'Cesto Telado Rattan Marrom - 12 litros', 'cesto_telado_rattan'),

        new item(0, 'Conservadora Com Tampa 3 Divisorias Redonda', 'conservadora_tampa'),
        new item(0, 'Conservadora Com Tampa 3 Divisorias Retangular', 'conservadora_tampa'),

        new item(19, 'Copo Medidor', 'copo_medidor'),

        new item(35, 'Cuia Bella Fiore 4 litros Areia', 'cuia_bf_4'),
        new item(31, 'Cuia Bella Fiore 4 litros Cerâmica', 'cuia_bf_4'),
        new item(44, 'Cuia Bella Fiore 4 litros Preto', 'cuia_bf_4'),

        new item(42, 'Cuia Bella Fiore 7.5 litros Areia', 'cuia_bf_7.5'),
        new item(48, 'Cuia Bella Fiore 7.5 litros Cerâmica', 'cuia_bf_7.5'),
        new item(34, 'Cuia Bella Fiore 7.5 litros Preto', 'cuia_bf_7.5'),

        new item(9, 'Escorredor de Pratos Supreme', 'escorredor'),
        new item(19, 'Escorredor de Talheres', 'escorredor'),
        new item(9, 'Escorredor Lava Tudo', 'escorredor'),
        new item(20, 'Escorredor Multiuso', 'escorredor'),

        new item(48, 'Forma de Gelo 2 Peças', 'forma_gelo'),

        new item(12, 'Floreira Floratta n30 Areia', 'floreira_30'),
        new item(51, 'Floreira Floratta n30 Azul', 'floreira_30'),
        new item(35, 'Floreira Floratta n30 cinza', 'floreira_30'),
        new item(24, 'Floreira Floratta n30 Preta', 'floreira_30'),
        new item(33, 'Floreira Floratta n30 Rosa', 'floreira_30'),
        new item(42, 'Floreira Floratta n30 Verde', 'floreira_30'),
        new item(12, 'Floreira Floratta n30 Verde Escuro', 'floreira_30'),

        new item(18, 'Jarra Quadrada - 2 litros', 'jarra'),
        new item(19, 'Jarra Redonda - 1.5 litros', 'jarra'),

        new item(46, 'Jardineira Bella Fiore n35 Areia', 'jardineira_n35'),
        new item(36, 'Jardineira Bella Fiore n35 Cerâmica', 'jardineira_n35'),
        new item(49, 'Jardineira Bella Fiore n35 Preta', 'jardineira_n35'),

        new item(30, 'Jardineira Bella Fiore n50 Areia', 'jardineira_n50'),
        new item(35, 'Jardineira Bella Fiore n50 Cerâmica', 'jardineira_n50'),
        new item(55, 'Jardineira Bella Fiore n50 Preta', 'jardineira_n50'),

        new item(12, 'Jardineira Floratta n50 Areia', 'jardineira_floratta_50'),
        new item(36, 'Jardineira Floratta n50 Azul', 'jardineira_floratta_50'),
        new item(7, 'Jardineira Floratta n50 cinza', 'jardineira_floratta_50'),
        new item(24, 'Jardineira Floratta n50 Preta', 'jardineira_floratta_50'),
        new item(30, 'Jardineira Floratta n50 Rosa', 'jardineira_floratta_50'),
        new item(37, 'Jardineira Floratta n50 Verde', 'jardineira_floratta_50'),
        new item(12, 'Jardineira Floratta n50 Verde Escuro', 'jardineira_floratta_50'),

        new item(12, 'Jardineira Floratta n80 Areia', 'jardineira_floratta_80'),
        new item(0, 'Jardineira Floratta n80 cinza', 'jardineira_floratta_80'),
        new item(33, 'Jardineira Floratta n80 Azul', 'jardineira_floratta_80'),
        new item(18, 'Jardineira Floratta n80 Preta', 'jardineira_floratta_80'),
        new item(4, 'Jardineira Floratta n80 Rosa', 'jardineira_floratta_80'),
        new item(24, 'Jardineira Floratta n80 Verde', 'jardineira_floratta_80'),
        new item(18, 'Jardineira Floratta n80 Verde Escuro', 'jardineira_floratta_80'),

        new item(0, 'Lixeira Basculante - 3.6 litros', 'lixeira_basculante'),

        new item(0, 'Lixeira Com Pedal Preta - 6.5 litros', 'lixeira_pedal'),
        new item(0, 'Lixeira Com Pedal Preta - 12 litros', 'lixeira_pedal'),
        new item(0, 'Lixeira Com Pedal Preta - 34 litros', 'lixeira_pedal'),

        new item(0, 'Lixeira de Pia Splendore Com Tampa Basculante', 'lixeira_splendore'),
        new item(5, 'Lixeira de Pia Splendore Com Tampa Articulável', 'lixeira_splendore'),

        new item(0, 'Lixeira Rattan Com Pedal Areia - 7.5 litros', 'lixeira_rattan'),
        new item(0, 'Lixeira Rattan Com Pedal Areia - 14.5 litros', 'lixeira_rattan'),

        new item(0, 'Porta Detergente Styllus', 'porta_detergente'),

        new item(12, 'Porta Frios 2 Peças', 'porta_frios'),

        new item(22, 'Porta Talheres Com Tampa', 'porta_talheres'),

        new item(0, 'Pote Fliplock 400ml', 'fliplock'),
        new item(19, 'Pote Fliplock 800ml', 'fliplock'),
        new item(0, 'Pote Fliplock 1.4 Litros', 'fliplock'),

        new item(0, 'Pote Premium - 3 Litros', 'pote_premium'),
        new item(0, 'Pote Premium - 5 Litros', 'pote_premium'),

        new item(0, 'Pote Retangular Alto - 2.5 Litros', 'pote_retangular'),
        new item(0, 'Pote Retangular Alto - 4.2 Litros', 'pote_retangular'),

        new item(0, 'Pote Topa Tudo - 3 Litros', 'pote_topa_tudo'),

        new item(0, 'Pote Volare - 1.2 Litros', 'pote_volare'),
        new item(0, 'Pote Volare - 2 Litros', 'pote_volare'),
        new item(0, 'Pote Volare - 3 Litros', 'pote_volare'),

        new item(6, 'Vaso Coluna Floratta P Areia', 'vaso_coluna_p'),
        new item(6, 'Vaso Coluna Floratta P Preto', 'vaso_coluna_p'),
        new item(6, 'Vaso Coluna Floratta P Rosa', 'vaso_coluna_p'),
        new item(6, 'Vaso Coluna Floratta P Verde Escuro', 'vaso_coluna_p'),

        new item(6, 'Vaso Coluna Floratta M Areia', 'vaso_coluna_m'),
        new item(6, 'Vaso Coluna Floratta M Preto', 'vaso_coluna_m'),
        new item(6, 'Vaso Coluna Floratta M Rosa', 'vaso_coluna_m'),
        new item(6, 'Vaso Coluna Floratta M Verde Escuro', 'vaso_coluna_m'),

        new item(4, 'Vaso Coluna Floratta G Areia', 'vaso_coluna_g'),
        new item(4, 'Vaso Coluna Floratta G Preto', 'vaso_coluna_g'),
        new item(4, 'Vaso Coluna Floratta G Rosa', 'vaso_coluna_g'),
        new item(4, 'Vaso Coluna Floratta G Verde Escuro', 'vaso_coluna_g'),

        new item(44, 'Vaso de Parede Bella Fiore 1.7 litros Areia', 'vp_florença_1.7'),
        new item(43, 'Vaso de Parede Bella Fiore 1.7 litros Cerâmica', 'vp_florença_1.7'),
        new item(51, 'Vaso de Parede Bella Fiore 1.7 litros Preto', 'vp_florença_1.7'),

        new item(34, 'Vaso de Parede Bella Fiore 3.3 litros Areia', 'vp_florença_3.3'),
        new item(24, 'Vaso de Parede Bella Fiore 3.3 litros Cerâmica', 'vp_florença_3.3'),
        new item(45, 'Vaso de Parede Bella Fiore 3.3 litros Preto', 'vp_florença_3.3'),

        new item(12, 'Vaso de Parede Floratta 3 litros Areia', 'vp_floratta_3'),
        new item(25, 'Vaso de Parede Floratta 3 litros Azul', 'vp_floratta_3'),
        new item(30, 'Vaso de Parede Floratta 3 litros cinza', 'vp_floratta_3'),
        new item(12, 'Vaso de Parede Floratta 3 litros Preto', 'vp_floratta_3'),
        new item(21, 'Vaso de Parede Floratta 3 litros Rosa', 'vp_floratta_3'),
        new item(19, 'Vaso de Parede Floratta 3 litros Verde', 'vp_floratta_3'),
        new item(12, 'Vaso de Parede Floratta 3 litros Verde Escuro', 'vp_floratta_3'),

        new item(12, 'Vaso de Parede Floratta 6 litros Areia', 'vp_floratta_6'),
        new item(18, 'Vaso de Parede Floratta 6 litros Azul', 'vp_floratta_6'),
        new item(9, 'Vaso de Parede Floratta 6 litros cinza', 'vp_floratta_6'),
        new item(12, 'Vaso de Parede Floratta 6 litros Preto', 'vp_floratta_6'),
        new item(18, 'Vaso de Parede Floratta 6 litros Rosa', 'vp_floratta_6'),
        new item(18, 'Vaso de Parede Floratta 6 litros Verde', 'vp_floratta_6'),
        new item(12, 'Vaso de Parede Floratta 6 litros Verde Escuro', 'vp_floratta_6'),

        new item(61, 'Vaso Quadrado Bella Fiore n17 Areia', 'quadrado_n17'),
        new item(54, 'Vaso Quadrado Bella Fiore n17 Cerâmica', 'quadrado_n17'),
        new item(60, 'Vaso Quadrado Bella Fiore n17 Preta', 'quadrado_n17'),

        new item(61, 'Vaso Quadrado Bella Fiore n22 Areia', 'quadrado_n22'),
        new item(28, 'Vaso Quadrado Bella Fiore n22 Cerâmica', 'quadrado_n22'),
        new item(44, 'Vaso Quadrado Bella Fiore n22 Preta', 'quadrado_n22'),

        new item(41, 'Vaso Quadrado Bella Fiore n28 Areia', 'quadrado_n28'),
        new item(32, 'Vaso Quadrado Bella Fiore n28 Cerâmica', 'quadrado_n28'),
        new item(48, 'Vaso Quadrado Bella Fiore n28 Preta', 'quadrado_n28'),

        new item(32, 'Vaso Quadrado Bella Fiore n35 Areia', 'quadrado_n35'),
        new item(24, 'Vaso Quadrado Bella Fiore n35 Cerâmica', 'quadrado_n35'),
        new item(36, 'Vaso Quadrado Bella Fiore n35 Preta', 'quadrado_n35'),

        new item(24, 'Vaso Quadrado Bella Fiore n42 Areia', 'quadrado_n42'),
        new item(24, 'Vaso Quadrado Bella Fiore n42 Cerâmica', 'quadrado_n42'),
        new item(30, 'Vaso Quadrado Bella Fiore n42 Preta', 'quadrado_n42'),
        
        new item(48, 'Vaso Redondo Bella Fiore n13 Areia', 'redondo_n13'),
        new item(51, 'Vaso Redondo Bella Fiore n13 Cerâmica', 'redondo_n13'),
        new item(55, 'Vaso Redondo Bella Fiore n13 Preta', 'redondo_n13'),

        new item(71, 'Vaso Redondo Bella Fiore n17 Areia', 'redondo_n17'),
        new item(70, 'Vaso Redondo Bella Fiore n17 Cerâmica', 'redondo_n17'),
        new item(67, 'Vaso Redondo Bella Fiore n17 Preta', 'redondo_n17'),

        new item(54, 'Vaso Redondo Bella Fiore n22 Areia', 'redondo_n22'),
        new item(49, 'Vaso Redondo Bella Fiore n22 Cerâmica', 'redondo_n22'),
        new item(53, 'Vaso Redondo Bella Fiore n22 Preta', 'redondo_n22'),

        new item(47, 'Vaso Redondo Bella Fiore n28 Areia', 'redondo_n28'),
        new item(48, 'Vaso Redondo Bella Fiore n28 Cerâmica', 'redondo_n28'),
        new item(27, 'Vaso Redondo Bella Fiore n28 Preta', 'redondo_n28'),

        new item(41, 'Vaso Redondo Bella Fiore n35 Areia', 'redondo_n35'),
        new item(48, 'Vaso Redondo Bella Fiore n35 Cerâmica', 'redondo_n35'),
        new item(48, 'Vaso Redondo Bella Fiore n35 Preta', 'redondo_n35'),

        new item(32, 'Vaso Redondo Bella Fiore n42 Areia', 'redondo_n42'),
        new item(27, 'Vaso Redondo Bella Fiore n42 Cerâmica', 'redondo_n42'),
        new item(37, 'Vaso Redondo Bella Fiore n42 Preta', 'redondo_n42'),

        new item(12, 'Vaso Redondo Bella Fiore n50 Areia', 'redondo_n50'),
        new item(20, 'Vaso Redondo Bella Fiore n50 Cerâmica', 'redondo_n50'),
        new item(20, 'Vaso Redondo Bella Fiore n50 Preta', 'redondo_n50'),

        new item(24, 'Vaso Redondo Floratta n15 Areia', 'redondo_floratta_15'),
        new item(8, 'Vaso Redondo Floratta n15 Azul', 'redondo_floratta_15'),
        new item(13, 'Vaso Redondo Floratta n15 cinza', 'redondo_floratta_15'),
        new item(48, 'Vaso Redondo Floratta n15 Preto', 'redondo_floratta_15'),
        new item(32, 'Vaso Redondo Floratta n15 Rosa', 'redondo_floratta_15'),
        new item(8, 'Vaso Redondo Floratta n15 Verde', 'redondo_floratta_15'),
        new item(24, 'Vaso Redondo Floratta n15 Verde Escuro', 'redondo_floratta_15'),

        new item(12, 'Vaso Redondo Floratta n19 Areia', 'redondo_floratta_19'),
        new item(8, 'Vaso Redondo Floratta n19 Azul', 'redondo_floratta_19'),
        new item(5, 'Vaso Redondo Floratta n19 cinza', 'redondo_floratta_19'),
        new item(24, 'Vaso Redondo Floratta n19 Preto', 'redondo_floratta_19'),
        new item(17, 'Vaso Redondo Floratta n19 Rosa', 'redondo_floratta_19'),
        new item(9, 'Vaso Redondo Floratta n19 Verde', 'redondo_floratta_19'),
        new item(24, 'Vaso Redondo Floratta n19 Verde Escuro', 'redondo_floratta_19'),

        new item(12, 'Vaso Redondo Floratta n26 Areia', 'redondo_floratta_26'),
        new item(30, 'Vaso Redondo Floratta n26 Azul', 'redondo_floratta_26'),
        new item(15, 'Vaso Redondo Floratta n26 cinza', 'redondo_floratta_26'),
        new item(24, 'Vaso Redondo Floratta n26 Preto', 'redondo_floratta_26'),
        new item(31, 'Vaso Redondo Floratta n26 Rosa', 'redondo_floratta_26'),
        new item(37, 'Vaso Redondo Floratta n26 Verde', 'redondo_floratta_26'),
        new item(12, 'Vaso Redondo Floratta n26 Verde Escuro', 'redondo_floratta_26'),

        new item(33, 'Vaso Redondo Floratta n33 Areia', 'redondo_floratta_33'),
        new item(45, 'Vaso Redondo Floratta n33 Azul', 'redondo_floratta_33'),
        new item(45, 'Vaso Redondo Floratta n33 cinza', 'redondo_floratta_33'),
        new item(24, 'Vaso Redondo Floratta n33 Preto', 'redondo_floratta_33'),
        new item(42, 'Vaso Redondo Floratta n33 Rosa', 'redondo_floratta_33'),
        new item(48, 'Vaso Redondo Floratta n33 Verde', 'redondo_floratta_33'),
        new item(12, 'Vaso Redondo Floratta n33 Verde Escuro', 'redondo_floratta_33'),

        new item(0, 'Vaso Redondo Floratta n40 Areia', 'redondo_floratta_40'),
        new item(33, 'Vaso Redondo Floratta n40 Azul', 'redondo_floratta_40'),
        new item(30, 'Vaso Redondo Floratta n40 cinza', 'redondo_floratta_40'),
        new item(18, 'Vaso Redondo Floratta n40 Preto', 'redondo_floratta_40'),
        new item(0, 'Vaso Redondo Floratta n40 Rosa', 'redondo_floratta_40'),
        new item(30, 'Vaso Redondo Floratta n40 Verde', 'redondo_floratta_40'),
        new item(12, 'Vaso Redondo Floratta n40 Verde Escuro', 'redondo_floratta_40'),

        new item(12, 'Vaso Redondo Floratta n50 Areia', 'redondo_floratta_50'),
        new item(0, 'Vaso Redondo Floratta n50 Azul', 'redondo_floratta_50'),
        new item(0, 'Vaso Redondo Floratta n50 cinza', 'redondo_floratta_50'),
        new item(8, 'Vaso Redondo Floratta n50 Preto', 'redondo_floratta_50'),
        new item(0, 'Vaso Redondo Floratta n50 Rosa', 'redondo_floratta_50'),
        new item(0, 'Vaso Redondo Floratta n50 Verde', 'redondo_floratta_50'),
        new item(8, 'Vaso Redondo Floratta n50 Verde Escuro', 'redondo_floratta_50')
    ]
)
var emeAeme = new Inventario(
    'Eme A Eme',
    '11/09/2023',
    [
        new item(199, 'Alça Universal Branca', 'alça_universal'),
        new item(44, 'Alça Universal Café', 'alça_universal'),
        new item(124, 'Alça Universal Cerâmica', 'alça_universal'),
        new item(75, 'Alça Universal Marfim', 'alça_universal'),
        new item(120, 'Alça Universal Preta', 'alça_universal'),
        new item(21, 'Alça Universal Verde', 'alça_universal'),

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

        new item(58, 'Cuia CB 13 Branca', 'cuia_cb_13'),
        new item(0, 'Cuia CB 13 Café', 'cuia_cb_13'),
        new item(73, 'Cuia CB 13 Cerâmica', 'cuia_cb_13'),
        new item(49, 'Cuia CB 13 Marfim', 'cuia_cb_13'),
        new item(78, 'Cuia CB 13 Preta', 'cuia_cb_13'),
        new item(61, 'Cuia CB 13 Verde', 'cuia_cb_13'),

        new item(57, 'Cuia CB 15 Branca', 'cuia_cb_15'),
        new item(0, 'Cuia CB 15 Café', 'cuia_cb_15'),
        new item(58, 'Cuia CB 15 Cerâmica', 'cuia_cb_15'),
        new item(46, 'Cuia CB 15 Marfim', 'cuia_cb_15'),
        new item(90, 'Cuia CB 15 Preta', 'cuia_cb_15'),
        new item(53, 'Cuia CB 15 Verde', 'cuia_cb_15'),

        new item(43, 'Cuia CBB 18 Com Base Branca', 'cuia_cbb_18'),
        new item(46, 'Cuia CBB 18 Com Base Café', 'cuia_cbb_18'),
        new item(44, 'Cuia CBB 18 Com Base Cerâmica', 'cuia_cbb_18'),
        new item(34, 'Cuia CBB 18 Com Base Marfim', 'cuia_cbb_18'),
        new item(44, 'Cuia CBB 18 Com Base Preta', 'cuia_cbb_18'),
        new item(29, 'Cuia CBB 18 Com Base Verde', 'cuia_cbb_18'),

        new item(30, 'Cuia CBB 21 Com Base Branca', 'cuia_cbb_21'),
        new item(40, 'Cuia CBB 21 Com Base Café', 'cuia_cbb_21'),
        new item(46, 'Cuia CBB 21 Com Base Cerâmica', 'cuia_cbb_21'),
        new item(48, 'Cuia CBB 21 Com Base Marfim', 'cuia_cbb_21'),
        new item(78, 'Cuia CBB 21 Com Base Preta', 'cuia_cbb_21'),
        new item(51, 'Cuia CBB 21 Com Base Verde', 'cuia_cbb_21'),

        new item(28, 'Cuia CBB 25 Com Base Branca', 'cuia_cbb_25'),
        new item(38, 'Cuia CBB 25 Com Base Café', 'cuia_cbb_25'),
        new item(14, 'Cuia CBB 25 Com Base Cerâmica', 'cuia_cbb_25'),
        new item(39, 'Cuia CBB 25 Com Base Marfim', 'cuia_cbb_25'),
        new item(17, 'Cuia CBB 25 Com Base Preta', 'cuia_cbb_25'),
        new item(29, 'Cuia CBB 25 Com Base Verde', 'cuia_cbb_25'),

        new item(35, 'Cuia CBB 30 Com Base Branca', 'cuia_cbb_30'),
        new item(57, 'Cuia CBB 30 Com Base Café', 'cuia_cbb_30'),
        new item(25, 'Cuia CBB 30 Com Base Cerâmica', 'cuia_cbb_30'),
        new item(41, 'Cuia CBB 30 Com Base Marfim', 'cuia_cbb_30'),
        new item(1, 'Cuia CBB 30 Com Base Preta', 'cuia_cbb_30'),
        new item(33, 'Cuia CBB 30 Com Base Verde', 'cuia_cbb_30'),

        new item(27, 'Cuia Gran Imperial CBB 40 Com Base Cerâmica', 'cuia_cbb_40'),
        new item(17, 'Cuia Gran Imperial CBB 40 Com Base Preta', 'cuia_cbb_40'),

        new item(312, 'Etiqueta E00', 'etiqueta'),
        new item(0, 'Etiqueta E03', 'etiqueta'),
        new item(0, 'Etiqueta E08', 'etiqueta'),
        new item(2, 'Etiqueta E09', 'etiqueta'),
        new item(0, 'Etiqueta E11', 'etiqueta'),
        new item(1500, 'Etiqueta E16', 'etiqueta'),
        new item(727, 'Etiqueta E30', 'etiqueta'),
        new item(1000, 'Etiqueta E40', 'etiqueta'),
        new item(0,  'Etiqueta EP22', 'etiqueta'),

        new item(34, 'Floreira FCB 30 Com Base Café', 'floreira_fcb_30'),
        new item(42, 'Floreira FCB 30 Com Base Cerâmica', 'floreira_fcb_30'),
        new item(32, 'Floreira FCB 30 Com Base Cimento', 'floreira_fcb_30'),
        new item(30, 'Floreira FCB 30 Com Base Preta', 'floreira_fcb_30'),
        new item(31, 'Floreira FCB 30 Com Base Verde', 'floreira_fcb_30'),

        new item(32, 'Floreira FCB 40 Com Base Café', 'floreira_fcb_40'),
        new item(33, 'Floreira FCB 40 Com Base Cerâmica', 'floreira_fcb_40'),
        new item(30, 'Floreira FCB 40 Com Base Cimento', 'floreira_fcb_40'),
        new item(45, 'Floreira FCB 40 Com Base Preta', 'floreira_fcb_40'),
        new item(24, 'Floreira FCB 40 Com Base Verde', 'floreira_fcb_40'),

        new item(19, 'Floreira FCB 60 Com Base Café', 'floreira_fcb_60'),
        new item(24, 'Floreira FCB 60 Com Base Cerâmica', 'floreira_fcb_60'),
        new item(28, 'Floreira FCB 60 Com Base Cimento', 'floreira_fcb_60'),
        new item(33, 'Floreira FCB 60 Com Base Preta', 'floreira_fcb_60'),
        new item(17, 'Floreira FCB 60 Com Base Verde', 'floreira_fcb_60'),

        new item(84, 'Prato B006 6cm Cerâmica', 'prato_b006'),
        new item(130, 'Prato B006 6cm Preto', 'prato_b006'),

        new item(44, 'Prato B00 9.5cm Cerâmica', 'prato_b00'),
        new item(40, 'Prato B00 9.5cm Cimento', 'prato_b00'),
        new item(40, 'Prato B00 9.5cm Marfim', 'prato_b00'),
        new item(42, 'Prato B00 9.5cm Preto', 'prato_b00'),

        new item(75, 'Prato B01 11.5cm Cerâmica', 'prato_b01'),
        new item(58, 'Prato B01 11.5cm Cimento', 'prato_b01'),
        new item(55, 'Prato B01 11.5cm Marfim', 'prato_b01'),
        new item(63, 'Prato B01 11.5cm Preto', 'prato_b01'),

        new item(63, 'Prato B02 13cm Cerâmica', 'prato_b02'),
        new item(40, 'Prato B02 13cm Cimento', 'prato_b02'),
        new item(40, 'Prato B02 13cm Marfim', 'prato_b02'),
        new item(68, 'Prato B02 13cm Preto', 'prato_b02'),

        new item(55, 'Prato B03 16cm Cerâmica', 'prato_b03'),
        new item(65, 'Prato B03 16cm Cimento', 'prato_b03'),
        new item(54, 'Prato B03 16cm Marfim', 'prato_b03'),
        new item(95, 'Prato B03 16cm Preto', 'prato_b03'),

        new item(50, 'Prato B04 21cm Cerâmica', 'prato_b04'),
        new item(48, 'Prato B04 21cm Cimento', 'prato_b04'),
        new item(50, 'Prato B04 21cm Marfim', 'prato_b04'),
        new item(65, 'Prato B04 21cm Preto', 'prato_b04'),

        new item(67, 'Prato B04.5 22cm Cerâmica', 'prato_b4.5'),
        new item(29, 'Prato B04.5 22cm Cimento', 'prato_b4.5'),
        new item(26, 'Prato B04.5 22cm Marfim', 'prato_b4.5'),
        new item(77, 'Prato B04.5 22cm Preto', 'prato_b4.5'),

        new item(45, 'Prato B05 24cm Cerâmica', 'prato_b05'),
        new item(37, 'Prato B05 24cm Cimento', 'prato_b05'),
        new item(45, 'Prato B05 24cm Marfim', 'prato_b05'),
        new item(4, 'Prato B05 24cm Preto', 'prato_b05'),

        new item(39, 'Prato B06 27cm Cerâmica', 'prato_b06'),
        new item(47, 'Prato B06 27cm Cimento', 'prato_b06'),
        new item(49, 'Prato B06 27cm Marfim', 'prato_b06'),
        new item(21, 'Prato B06 27cm Preto', 'prato_b06'),

        new item(66, 'Prato B07 30cm Cerâmica', 'prato_b07'),
        new item(50, 'Prato B07 30cm Cimento', 'prato_b07'),
        new item(51, 'Prato B07 30cm Marfim', 'prato_b07'),
        new item(70, 'Prato B07 30cm Preto', 'prato_b07'),

        new item(33, 'Prato B08 33cm Cerâmica', 'prato_b08'),
        new item(40, 'Prato B08 33cm Cimento', 'prato_b08'),
        new item(37, 'Prato B08 33cm Marfim', 'prato_b08'),
        new item(53, 'Prato B08 33cm Preto', 'prato_b08'),

        new item(38, 'Prato B09 38cm Cerâmica', 'prato_b09'),
        new item(35, 'Prato B09 38cm Cimento', 'prato_b09'),
        new item(35, 'Prato B09 38cm Marfim', 'prato_b09'),
        new item(63, 'Prato B09 38cm Preto', 'prato_b09'),

        new item(40, 'Prato B10 42cm Cerâmica', 'prato_b10'),
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
        new item(62, 'Vaso De Parede VP 30 Cerâmica', 'vp_30'),
        new item(87, 'Vaso De Parede VP 30 Preto', 'vp_30'),
        new item(48, 'Vaso De Parede VP 30 Verde', 'vp_30'),

        new item(32, 'Vaso Imperial V15 Cerâmica', 'v_imperial_15'),
        new item(33, 'Vaso Imperial V15 Cimento', 'v_imperial_15'),
        new item(32, 'Vaso Imperial V15 Marfim', 'v_imperial_15'),
        new item(34, 'Vaso Imperial V15 Preto', 'v_imperial_15'),

        new item(32, 'Vaso Imperial V20 Cerâmica', 'v_imperial_20'),
        new item(33, 'Vaso Imperial V20 Cimento', 'v_imperial_20'),
        new item(31, 'Vaso Imperial V20 Marfim', 'v_imperial_20'),
        new item(37, 'Vaso Imperial V20 Preto', 'v_imperial_20'),

        new item(12, 'Vaso Imperial V25 Cerâmica', 'v_imperial_25'),
        new item(16, 'Vaso Imperial V25 Cimento', 'v_imperial_25'),
        new item(15, 'Vaso Imperial V25 Marfim', 'v_imperial_25'),
        new item(12, 'Vaso Imperial V25 Preto', 'v_imperial_25'),

        new item(8, 'Vaso Imperial V30 Cerâmica', 'v_imperial_30'),
        new item(10, 'Vaso Imperial V30 Cimento', 'v_imperial_30'),
        new item(12, 'Vaso Imperial V30 Marfim', 'v_imperial_30'),
        new item(12, 'Vaso Imperial V30 Preto', 'v_imperial_30'),

        new item(6, 'Vaso Imperial V40 Cerâmica', 'v_imperial_40'),
        new item(6, 'Vaso Imperial V40 Cimento', 'v_imperial_40'),
        new item(6, 'Vaso Imperial V40 Marfim', 'v_imperial_40'),
        new item(6, 'Vaso Imperial V40 Preto', 'v_imperial_40'),

        new item(61, 'Vaso T 07 Cerâmica', 'vaso_t_07'),
        new item(48, 'Vaso T 07 Preto', 'vaso_t_07'),

        new item(105, 'Vaso T 09 Cerâmica', 'vaso_t_09'),
        new item(95, 'Vaso T 09 Preto', 'vaso_t_09'),

        new item(45, 'Vaso T 10 Cerâmica', 'vaso_t_10'),
        new item(42, 'Vaso T 10 Preto', 'vaso_t_10'),

        new item(40, 'Vaso T 12 Cerâmica', 'vaso_t_12'),
        new item(40, 'Vaso T 12 Preto', 'vaso_t_12'),

        new item(51, 'Vaso T 14 Cerâmica', 'vaso_t_14'),
        new item(52, 'Vaso T 14 Preto', 'vaso_t_14'),

        new item(47, 'Vaso T 16 Cerâmica', 'vaso_t_16'),
        new item(25, 'Vaso T 16 Preto', 'vaso_t_16'),

        new item(33, 'Vaso T 18 Cerâmica', 'vaso_t_18'),
        new item(25, 'Vaso T 18 Preto', 'vaso_t_18'),

        new item(29, 'Vaso T 20 Cerâmica', 'vaso_t_20'),
        new item(26, 'Vaso T 20 Preto', 'vaso_t_20'),

        new item(35, 'Vaso T 25 Cerâmica', 'vaso_t_25'),
        new item(25, 'Vaso T 25 Preto', 'vaso_t_25'),

        new item(17, 'Vaso T 27 Cerâmica', 'vaso_t_27'),
        new item(25, 'Vaso T 27 Preto', 'vaso_t_27'),

        new item(31, 'Vaso T 30 Cerâmica', 'vaso_t_30'),
        new item(13, 'Vaso T 30 Preto', 'vaso_t_30'),

        new item(29, 'Vaso T 35 Cerâmica', 'vaso_t_35'),
        new item(30, 'Vaso T 35 Preto', 'vaso_t_35')
    ]
)
var forth = new Inventario(
    'Forth',
    '16/09/2023',
    [
        new item(7, 'Acaricida Concentrado - 60ml', 'a'),
        new item(10, 'Acaricida p/uso - 500ml', 'a'),

        new item(33, 'Baraticida Gel', 'b'),
        new item(13, 'Bokashi - 250g', 'b'),
        new item(0, 'Bonsai Concentrado - 60ml', 'b'),
        new item(6, 'Bonsai p/uso - 500ml', 'b'),
        new item(0, 'Brilha folha Concentrado - 60ml', 'b'),
        new item(21, 'Brilha folha p/uso - 500ml', 'b'),

        new item(2, 'Cactos Concentrado - 60ml', 'c'),
        new item(14, 'Cactos Concentrado - 500m', 'c'),
        new item(7, 'Cobre Concentrado - 60ml', 'c'),
        new item(12, 'Cobre Concentrado - 500m', 'c'),
        new item(22, 'Coqueiros - 400g', 'c'),
        new item(3, 'Coqueiros - 3kg', 'c'),
        new item(1, 'Coqueiros - 10Kg', 'c'),
        new item(11, 'Cote 14.14.14 - 150g', 'c'),
        new item(5, 'Cote 15.09.12 - 150g', 'c'),
        new item(5, 'Cote 14.14.14 - 400g', 'c'),
        new item(4, 'Cote 15.09.12 - 400g', 'c'),
        new item(0, 'Cupinicida Concentrado - 60ml', 'c'),

        new item(0, 'Defende Concentrado - 30ml', 'd'),
        new item(0, 'Defende p/uso - 500ml', 'd'),

        new item(0, 'Enraizador Concentrado - 60ml', 'e'),
        new item(24, 'Enxofre Concentrado - 60ml', 'e'),
        new item(13, 'Enxofre p/uso - 500ml', 'e'),
        new item(1, 'Equilibrio Concentrado - 60ml', 'e'),
        new item(2, 'Equilibrio Concentrado - 500ml', 'e'),

        new item(2, 'Fipronil+imidacloprid Concentrado - 60ml', 'f'),
        new item(6, 'Flores Concentrado - 60ml', 'f'),
        new item(6, 'Flores p/uso - 500ml', 'f'),
        new item(2, 'Flores - 400g', 'f'),
        new item(13, 'Flores - 3kg', 'f'),
        new item(0, 'Flores - 10Kg', 'f'),
        new item(45, 'Formicida Gel', 'f'),
        new item(6, 'Formicida isca granulada', 'f'), 
        new item(16, 'Formicida Mata no ninho p/uso - 500ml', 'f'),
        new item(0, 'Frutas Concentrado - 60ml', 'f'),
        new item(18, 'Frutas p/uso - 500ml', 'f'),
        new item(0, 'Frutas - 400g', 'f'),
        new item(4, 'Frutas - 3kg', 'f'),
        new item(0, 'Frutas - 10Kg', 'f'),
        new item(11, 'Fungicida Concentrado - 30ml', 'f'),
        new item(7, 'Fungicida p/uso - 500ml', 'f'),
        new item(7, 'Fungicida cobre p/uso - 500ml', 'f'),

        new item(0, 'Gel para plantio - 100g', 'g'),

        new item(11, 'Hortaliças Concentrado - 60ml', 'h'),
        new item(15, 'Hortaliças p/uso - 500ml', 'h'),
        new item(5, 'Hortaliças - 400g', 'h'),
        new item(6, 'Hortaliças - 3kg', 'h'),
        new item(0, 'Hortaliças - 10Kg', 'h'),

        new item(23, 'Inseticida Concentrado - 30ml', 'i'),
        new item(9, 'Inseticida p/uso - 500ml', 'i'),

        new item(0, 'Jabuticabeiras Concentrado - 60ml', 'j'),
        new item(0, 'Jabuticabeiras - 400g', 'j'),
        new item(11, 'Jabuticabeiras - 3kg', 'j'),
        new item(0, 'Jardim Concentrado - 60ml', 'j'),
        new item(3, 'Jardim p/uso - 500ml', 'j'),
        new item(0, 'Jardim - 400g', 'j'),
        new item(5, 'Jardim - 3kg', 'j'),

        new item(5, 'Lesmicida isca granulada', 'l'),

        new item(10, 'Mata cochonilha p/uso - 500ml', 'm'),
        new item(12, 'Mata lagarta p/uso - 500ml', 'm'),
        new item(0, 'Mata mato Concentrado - 30ml', 'm'),
        new item(5, 'Mata mato p/uso - 500ml', 'm'),
        new item(6, 'Mata pulgão p/uso - 500ml', 'm'),

        new item(23, 'Óleo Concentrado - 60ml', 'o'),
        new item(0, 'Orquídeas Floração Concentrado - 60ml', 'o'),
        new item(23, 'Orquídeas Floração p/uso - 500ml', 'o'),
        new item(29, 'Orquídeas Manutenção Concentrado - 60ml', 'o'),
        new item(25, 'Orquídeas Manutenção p/uso - 500ml', 'o'),
        new item(14, 'Orquídeas 09.45.15 - 100g', 'o'),
        new item(41, 'Orquídeas 20.20.20 - 100g', 'o'),
        new item(9, 'Orquídeas 30.10.10 - 100g', 'o'),
        new item(1, 'Orquídeas 09.45.15 - 400g', 'o'),
        new item(4, 'Orquídeas 20.20.20 - 400g', 'o'),
        new item(0, 'Orquídeas 30.10.10 - 400g', 'o'),

        new item(1, 'Palmeiras - 400g', 'p'),
        new item(0, 'Palmeiras - 3kg', 'p'),
        new item(11, 'Pasta selante', 'p'),

        new item(0, 'Raticida Bloco - 200g', 'r'),
        new item(21, 'Raticida Isca Anticoagulante', 'r'),
        new item(0, 'Rosa do Deserto Concentrado - 60ml', 'r'),
        new item(13, 'Rosa do Deserto p/uso - 500ml', 'r'),
        new item(24, 'Rosa do Deserto - 400g', 'r'),
        new item(2, 'Rosa do Deserto - 3kg', 'r'),

        new item(0, 'Samambaias Concentrado - 60ml', 's'),
        new item(13, 'Samambaias p/uso - 500ml', 's'),
        new item(24, 'Samambaias - 400g', 's'),
        new item(4, 'Suculentas Concentrado - 60ml', 's'),

        new item(10, 'Temperos Concentrado - 60ml', 't'),
        new item(13, 'Temperos p/uso - 500ml', 't'),

        new item(10, 'Violetas Concentrado - 60ml', 'v'),
    ]
)
var alfa_polietileno = new Inventario(
    'Alfa Polietileno',
    '06/09/2023',
    [
        new item(0, 'Bacia Diamante nº 1 Bege', 'bacia_diamante_1'),
        new item(0, 'Bacia Diamante nº 1 Cimento', 'bacia_diamante_1'),

        new item(2, 'Bacia Diamante nº 2 Bege', 'bacia_diamante_2'),
        new item(2, 'Bacia Diamante nº 2 Cimento', 'bacia_diamante_2'),
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

        new item(7, 'Bacia Marmorizada C/Prato nº 1 Azul', 'bacia_marmorizada_1'),
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
        new item(1, 'Coluna Red. Diamante C/Prato nº 1 Cimento', 'coluna_diamante_1'),
        new item(0, 'Coluna Red. Diamante C/Prato nº 1 Marrom', 'coluna_diamante_1'),
        new item(1, 'Coluna Red. Diamante C/Prato nº 1 Preta', 'coluna_diamante_1'),

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
        new item(1, 'Coluna Red. Diamante C/Prato nº 5 Marrom', 'coluna_diamante_5'),
        new item(1, 'Coluna Red. Diamante C/Prato nº 5 Preta', 'coluna_diamante_5'),

        new item(0, 'Coluna Red. Grafiato C/Preto nº 1 Bege', 'coluna_grafiato_1'),
        new item(1, 'Coluna Red. Grafiato C/Preto nº 1 Cimento', 'coluna_grafiato_1'),
        new item(0, 'Coluna Red. Grafiato C/Preto nº 1 Marrom', 'coluna_grafiato_1'),
        new item(1, 'Coluna Red. Grafiato C/Preto nº 1 Preto', 'coluna_grafiato_1'),

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

        new item(4, 'Coluna Red. Marmorizada C/Prato nº 1 Azul', 'coluna_marmorizada_1'),
        new item(2, 'Coluna Red. Marmorizada C/Prato nº 1 Vermelho', 'coluna_marmorizada_1'),

        new item(2, 'Coluna Red. Marmorizada C/Prato nº 2 Azul', 'coluna_marmorizada_2'),
        new item(3, 'Coluna Red. Marmorizada C/Prato nº 2 Vermelho', 'coluna_marmorizada_2'),

        new item(3, 'Coluna Red. Marmorizada C/Prato nº 3 Azul', 'coluna_marmorizada_3'),
        new item(4, 'Coluna Red. Marmorizada C/Prato nº 3 Vermelho', 'coluna_marmorizada_3'),

        new item(2, 'Coluna Red. Marmorizada C/Prato nº 4 Azul', 'coluna_marmorizada_4'),
        new item(3, 'Coluna Red. Marmorizada C/Prato nº 4 Vermelho', 'coluna_marmorizada_4'),

        new item(3, 'Coluna Red. Polida C/Prato nº 1 Bege', 'coluna_polida_1'),
        new item(3, 'Coluna Red. Polida C/Prato nº 1 Cimento', 'coluna_polida_1'),
        new item(4, 'Coluna Red. Polida C/Prato nº 1 Marrom', 'coluna_polida_1'),
        new item(2, 'Coluna Red. Polida C/Prato nº 1 Preto', 'coluna_polida_1'),

        new item(3, 'Coluna Red. Polida C/Prato nº 2 Bege', 'coluna_polida_2'),
        new item(3, 'Coluna Red. Polida C/Prato nº 2 Cimento', 'coluna_polida_2'),
        new item(6, 'Coluna Red. Polida C/Prato nº 2 Marrom', 'coluna_polida_2'),
        new item(3, 'Coluna Red. Polida C/Prato nº 2 Preto', 'coluna_polida_2'),

        new item(0, 'Coluna Red. Polida C/Prato nº 3 Bege', 'coluna_polida_3'),
        new item(3, 'Coluna Red. Polida C/Prato nº 3 Cimento', 'coluna_polida_3'),
        new item(8, 'Coluna Red. Polida C/Prato nº 3 Marrom', 'coluna_polida_3'),
        new item(3, 'Coluna Red. Polida C/Prato nº 3 Preto', 'coluna_polida_3'),

        new item(0, 'Coluna Red. Polida C/Prato nº 4 Bege', 'coluna_polida_4'),
        new item(2, 'Coluna Red. Polida C/Prato nº 4 Cimento', 'coluna_polida_4'),
        new item(4, 'Coluna Red. Polida C/Prato nº 4 Marrom', 'coluna_polida_4'),
        new item(2, 'Coluna Red. Polida C/Prato nº 4 Preto', 'coluna_polida_4'),

        new item(1, 'Jardineira Frisada C/Prato Bege', 'jardineira_frisada_1'),
        new item(2, 'Jardineira Frisada C/Prato Preto', 'jardineira_frisada_1'),

        new item(2, 'Jardineira Grafiato C/Prato nº 1 Bege', 'jardineira_grafiato_1'),
        new item(2, 'Jardineira Grafiato C/Prato nº 1 Preto', 'jardineira_grafiato_1'),

        new item(0, 'Jardineira Grafiato C/Prato nº 2 Bege', 'jardineira_grafiato_2'),
        new item(2, 'Jardineira Grafiato C/Prato nº 2 Preto', 'jardineira_grafiato_2'),
        
        new item(3, 'Vaso Bojo Red. Diamante C/Prato nº 1 Bege', 'vaso_diamante_1'),
        new item(3, 'Vaso Bojo Red. Diamante C/Prato nº 1 Cimento', 'vaso_diamante_1'),
        new item(7, 'Vaso Bojo Red. Diamante C/Prato nº 1 Marrom', 'vaso_diamante_1'),
        new item(3, 'Vaso Bojo Red. Diamante C/Prato nº 1 Preto', 'vaso_diamante_1'),

        new item(0, 'Vaso Bojo Red. Diamante C/Prato nº 2 Bege', 'vaso_diamante_2'),
        new item(2, 'Vaso Bojo Red. Diamante C/Prato nº 2 Cimento', 'vaso_diamante_2'),
        new item(4, 'Vaso Bojo Red. Diamante C/Prato nº 2 Marrom', 'vaso_diamante_2'),
        new item(3, 'Vaso Bojo Red. Diamante C/Prato nº 2 Preto', 'vaso_diamante_2'),

        new item(2, 'Vaso Bojo Red. Diamante C/Prato nº 3 Bege', 'vaso_diamante_3'),
        new item(2, 'Vaso Bojo Red. Diamante C/Prato nº 3 Cimento', 'vaso_diamante_3'),
        new item(3, 'Vaso Bojo Red. Diamante C/Prato nº 3 Marrom', 'vaso_diamante_3'),
        new item(3, 'Vaso Bojo Red. Diamante C/Prato nº 3 Preto', 'vaso_diamante_3'),

        new item(8, 'Vaso Bojo Red. Diamante C/Prato nº 4 Bege', 'vaso_diamante_4'),
        new item(5, 'Vaso Bojo Red. Diamante C/Prato nº 4 Cimento', 'vaso_diamante_4'),
        new item(7, 'Vaso Bojo Red. Diamante C/Prato nº 4 Marrom', 'vaso_diamante_4'),
        new item(7, 'Vaso Bojo Red. Diamante C/Prato nº 4 Preto', 'vaso_diamante_4'),

        new item(15, 'Vaso Bojo Frisado C/Prato nº 1 Bege', 'vaso_frisado_1'),
        new item(15, 'Vaso Bojo Frisado C/Prato nº 1 Cimento', 'vaso_frisado_1'),
        new item(15, 'Vaso Bojo Frisado C/Prato nº 1 Marrom', 'vaso_frisado_1'),
        new item(15, 'Vaso Bojo Frisado C/Prato nº 1 Preto', 'vaso_frisado_1'),

        new item(6, 'Vaso Bojo Frisado C/Prato nº 2 Bege', 'vaso_frisado_2'),
        new item(10, 'Vaso Bojo Frisado C/Prato nº 2 Cimento', 'vaso_frisado_2'),
        new item(7, 'Vaso Bojo Frisado C/Prato nº 2 Marrom', 'vaso_frisado_2'),
        new item(7, 'Vaso Bojo Frisado C/Prato nº 2 Preto', 'vaso_frisado_2'),

        new item(9, 'Vaso Bojo Frisado C/Prato nº 3 Bege', 'vaso_frisado_3'),
        new item(10, 'Vaso Bojo Frisado C/Prato nº 3 Cimento', 'vaso_frisado_3'),
        new item(4, 'Vaso Bojo Frisado C/Prato nº 3 Marrom', 'vaso_frisado_3'),
        new item(6, 'Vaso Bojo Frisado C/Prato nº 3 Preto', 'vaso_frisado_3'),

        new item(6, 'Vaso Bojo Frisado C/Prato nº 4 Bege', 'vaso_frisado_4'),
        new item(6, 'Vaso Bojo Frisado C/Prato nº 4 Cimento', 'vaso_frisado_4'),
        new item(5, 'Vaso Bojo Frisado C/Prato nº 4 Marrom', 'vaso_frisado_4'),
        new item(7, 'Vaso Bojo Frisado C/Prato nº 4 Preto', 'vaso_frisado_4'),

        new item(5, 'Vaso Bojo Red. Grafiato C/Prato nº 1 Bege', 'vaso_grafiato_1'),
        new item(7, 'Vaso Bojo Red. Grafiato C/Prato nº 1 Cimento', 'vaso_grafiato_1'),
        new item(8, 'Vaso Bojo Red. Grafiato C/Prato nº 1 Marrom', 'vaso_grafiato_1'),
        new item(8, 'Vaso Bojo Red. Grafiato C/Prato nº 1 Preto', 'vaso_grafiato_1'),

        new item(5, 'Vaso Bojo Red. Grafiato C/Prato nº 2 Bege', 'vaso_grafiato_2'),
        new item(6, 'Vaso Bojo Red. Grafiato C/Prato nº 2 Cimento', 'vaso_grafiato_2'),
        new item(6, 'Vaso Bojo Red. Grafiato C/Prato nº 2 Marrom', 'vaso_grafiato_2'),
        new item(3, 'Vaso Bojo Red. Grafiato C/Prato nº 2 Preto', 'vaso_grafiato_2'),

        new item(6, 'Vaso Bojo Red. Grafiato C/Prato nº 3 Bege', 'vaso_grafiato_3'),
        new item(6, 'Vaso Bojo Red. Grafiato C/Prato nº 3 Cimento', 'vaso_grafiato_3'),
        new item(4, 'Vaso Bojo Red. Grafiato C/Prato nº 3 Marrom', 'vaso_grafiato_3'),
        new item(3, 'Vaso Bojo Red. Grafiato C/Prato nº 3 Preto', 'vaso_grafiato_3'),

        new item(3, 'Vaso Bojo Red. Grafiato C/Prato nº 4 Bege', 'vaso_grafiato_4'),
        new item(4, 'Vaso Bojo Red. Grafiato C/Prato nº 4 Cimento', 'vaso_grafiato_4'),
        new item(0, 'Vaso Bojo Red. Grafiato C/Prato nº 4 Marrom', 'vaso_grafiato_4'),
        new item(4, 'Vaso Bojo Red. Grafiato C/Prato nº 4 Preto', 'vaso_grafiato_4'),

        new item(4, 'Vaso Bojo Red. Marmorizado C/Prato nº 1 Azul', 'vaso_marmorizado_1'),
        new item(4, 'Vaso Bojo Red. Marmorizado C/Prato nº 1 Vermelho', 'vaso_marmorizado_1'),

        new item(3, 'Vaso Bojo Red. Marmorizado C/Prato nº 2 Azul', 'vaso_marmorizado_2'),
        new item(6, 'Vaso Bojo Red. Marmorizado C/Prato nº 2 Vermelho', 'vaso_marmorizado_2'),

        new item(5, 'Vaso Bojo Red. Marmorizado C/Prato nº 3 Azul', 'vaso_marmorizado_3'),
        new item(5, 'Vaso Bojo Red. Marmorizado C/Prato nº 3 Vermelho', 'vaso_marmorizado_3'),

        new item(7, 'Vaso Bojo Red. Polido C/Prato nº 1 Bege', 'vaso_polido_1'),
        new item(7, 'Vaso Bojo Red. Polido C/Prato nº 1 Cimento', 'vaso_polido_1'),
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
    '31/08/2023',
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
        new item(9, "Cuia Sem Borda nº 3 Envelhecido", 'cuia_3'),
        new item(16, "Cuia Sem Borda nº 3 Palha", 'cuia_3'),

        new item(9, "Cuia Sem Borda nº 4 Argila", 'cuia_4'),
        new item(0, "Cuia Sem Borda nº 4 Branco", 'cuia_4'),
        new item(8, "Cuia Sem Borda nº 4 Cappuccino", 'cuia_4'),
        new item(9, "Cuia Sem Borda nº 4 Envelhecido", 'cuia_4'),
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
            
        new item(13 , "Cachepot Sem Borda nº 1 Argile", 'cachepot_1'),
        new item(7, "Cachepot Sem Borda nº 1 Cappuccino", 'cachepot_1'),
        new item(8,  "Cachepot Sem Borda nº 1 Envelhecido", 'cachepot_1'),

        new item(5, "Cachepot Sem Borda nº 2 Argile", 'cachepot_2'),
        new item(7, "Cachepot Sem Borda nº 2 Cappuccino", 'cachepot_2'),
        new item(9, "Cachepot Sem Borda nº 2 Envelhecido", 'cachepot_2'),
        new item(5, "Cachepot Sem Borda nº 2 Palha", 'cachepot_2'),

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
        new item(4, "Vaso Red. Sem Borda nº 2 Envelhecido", 'vaso_2'),

        new item(4, "Vaso Red. Sem Borda nº 3 Cappuccino", 'vaso_3'),
        new item(4, "Vaso Red. Sem Borda nº 3 Envelhecido", 'vaso_3'),

        new item(4, "Vaso Red. Sem Borda nº 4 Cappuccino", 'vaso_4'),
        new item(4, "Vaso Red. Sem Borda nº 4 Envelhecido", 'vaso_4')
    ]
)
var policamp = new Inventario(
    'Policamp',
    '19/08/2023',
    [
        new item(119, 'Pulverizador 500ml', 'pulverizador'),
        new item(112, 'Pulverizador 1 litro', 'pulverizador'),
        new item(38, 'Regador Com Cabo - Bico', 'Regador_cabo'),
        new item(30, 'Regador Com Cabo - Chuveiro', 'Regador_cabo'),
        new item(120, 'Regador - 2 litros', 'Regador'),
        new item(118, 'Regador - 4 litros', 'Regador'),
        new item(101, 'Regador - 5 litros', 'Regador'),
        new item(69, 'Regador - 10 litros', 'Regador')
    ]
)
var jel_plast = new Inventario(
    'Jel Plast',
    '11/08/2023',
    [
        new item(66, 'Bebedouro Beija Flor Bandeija REF20', 'bebedouro'),
        new item(0, 'Bebedouro Beija Flor Luxo Chapeu Com Poleiro REF50', 'bebedouro'),
        new item(126, 'Bebedouro Beija Flor Poleiro REF55', 'bebedouro'),
        new item(408, 'Bebedouro Beija Flor Simples REF40', 'bebedouro'),
        new item(0, 'Nectar de Beija Flor Com Corante', 'nectar'),
        new item(0, 'Nectar de Beija Flor Sem Corante', 'nectar')
    ]
)
var insetimax = new Inventario(
    'Insetimax',
    '29/08/2023',
    [
        new item(29, 'Cupinicida Insetimaster - 100ml', 'cupinicida'),

        new item(33, 'Formicida Insetimaster - 100ml', 'formicida'),
        new item(3, 'Formicida Insetimaster - 1 litro', 'formicida'),

        new item(8, 'Inseticom Jardim - Caixa', 'inseticom'),

        new item(45, 'Malathion 500CE - 100ml', 'malathion')
    ]   
)
var madeiras = new Inventario(
    'Madeiras',
    '12/09/2023',
    [
        new item(1, 'Treliça 50x50cm Simples', 'treliça'),
        new item(1, 'Treliça 40x100cm Simples', 'treliça'),
        new item(0, 'Treliça 40x100cm Pintada', 'treliça'),
        new item(1, 'Treliça 60x100cm Simples', 'treliça'),
        new item(2, 'Treliça 60x100cm Pintada', 'treliça'),

        new item(15, 'Cachepo Madeira 20 Simples', 'cachepo'),
        new item(10, 'Cachepo Madeira 20 Pintado', 'cachepo'),
        new item(7, 'Cachepo Madeira 40 Simples', 'cachepo'),
        new item(10, 'Cachepo Madeira 40 Pintado', 'cachepo'),

        new item(5, 'Rodízio Redondo 20cm', 'rodízio_redondo'),
        new item(0, 'Rodízio Redondo 25cm', 'rodízio_redondo'),
        new item(7, 'Rodízio Redondo 30cm', 'rodízio_redondo'),
        new item(3, 'Rodízio Redondo 35cm', 'rodízio_redondo'),
        new item(1, 'Rodízio Redondo 40cm', 'rodízio_redondo'),
        new item(0, 'Rodízio Redondo 50cm', 'rodízio_redondo'),

        new item(12, 'Rodízio Quadrado 20cm', 'rodízio_quadrado'),
        new item(11, 'Rodízio Quadrado 25cm', 'rodízio_quadrado'),
        new item(6, 'Rodízio Quadrado 30cm', 'rodízio_quadrado'),
        new item(8, 'Rodízio Quadrado 35cm', 'rodízio_quadrado'),
        new item(10, 'Rodízio Quadrado 40cm', 'rodízio_quadrado'),
        new item(5, 'Rodízio Quadrado 45cm', 'rodízio_quadrado'),
        new item(1, 'Rodízio Quadrado 50cm', 'rodízio_quadrado'),
    ]
)
var nutriplan = new Inventario(
    'Nutriplan',
    '31/08/2023',
    [
        new item(51, 'Pote de Muda - 25 litros', 'pote'),
        new item(31, 'Pote de Muda - 33 litros', 'pote'),
        new item(26, 'Pote de Muda - 40 litros', 'pote'),
        new item(0, 'Pote de Muda - 50 litros', 'pote'),
        new item(1, 'Pote de Muda - 60 litros', 'pote'),
        new item(8, 'Pote de Muda - 85 litros', 'pote'),

        new item(1, 'Vaso Classic Cilindrico 55 cobre', 'cilindrico_55'),

        new item(1, 'Vaso Classic Cônico 46 - Areia', 'conico_46'),
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
    '16/09/2023',
    [
        new item(15, '999 - Vaso Coquim nº 3', 'vaso_coquim'),
        new item(15, '1000 - Vaso Coquim nº 4', 'vaso_coquim'),
        new item(15, '1001 - Vaso Coquim nº 5', 'vaso_coquim'),
        new item(11, '1002 - Vaso Coquim nº 8', 'vaso_coquim'),
        new item(11, '1003 - Vaso Coquim nº 10', 'vaso_coquim'),
        new item(15, '1004 - Vaso Coquim nº 12', 'vaso_coquim'),
        new item(8, '1005 - Vaso Coquim nº 14', 'vaso_coquim'),

        new item(0, '1006 - Vaso Coquim nº 5 Virola', 'vaso_virola'),
        new item(0, '1007 - Vaso Coquim nº 10 Virola', 'vaso_virola'),
        new item(0, '1008 - Vaso Coquim nº 12 Virola', 'vaso_virola'),
        new item(0, '1009 - Vaso Coquim nº 14 Virola', 'vaso_virola'),

        new item(15, '1010 - Vaso Coquim nº 17', 'vaso_coquim'),
        new item(14, '1011 - Vaso Coquim nº 13', 'vaso_coquim'),
        new item(8, '1012 - Vaso Coquim nº 15', 'vaso_coquim'),

        new item(6, '1021 - Vaso Coquim nº 10 C/Furos', 'vaso_furos'),
        new item(4, '1022 - Vaso Coquim nº 12 C/Furos', 'vaso_furos'),
        new item(6, '1023 - Vaso Coquim nº 13 C/Furos', 'vaso_furos'),
        new item(4, '1024 - Vaso Coquim nº 15 C/Furos', 'vaso_furos'),

        new item(6, '1025 - Vaso Coquim nº 10 C/Furos e Suporte', 'vaso_furos_suporte'),
        new item(4, '1026 - Vaso Coquim nº 12 C/Furos e Suporte', 'vaso_furos_suporte'),
        new item(6, '1027 - Vaso Coquim nº 13 C/Furos e Suporte', 'vaso_furos_suporte'),
        new item(4, '1028 - Vaso Coquim nº 15 C/Furos e Suporte', 'vaso_furos_suporte'),
        
        new item(6, '1029 - 1/2 Vaso nº 10 C/Furos', '1/2_vaso_furos'),
        new item(4, '1030 - 1/2 Vaso nº 12 C/Furos', '1/2_vaso_furos'),

        new item(7, '2001 - Placa Coquim 20x20', 'placa_coquim'),
        new item(11, '2002 - Placa Coquim 20x40', 'placa_coquim'),
        new item(15, '2003 - Placa Coquim 20x60', 'placa_coquim'),
        new item(16, '2004 - Placa Coquim 20x80', 'placa_coquim'),
        new item(8, '2005 - Placa Coquim 40x40', 'placa_coquim'),
        new item(10, '2006 - Placa Coquim 40x80', 'placa_coquim'),

        new item(0, '2007 - Placa Redonda Coquim 20cm', 'placa_redonda'),
        new item(6, '2008 - Placa Redonda Coquim 25cm', 'placa_redonda'),
        new item(6, '2009 - Placa Redonda Coquim 30cm', 'placa_redonda'),
        new item(4, '2010 - Placa Redonda Coquim 35cm', 'placa_redonda'),
        new item(4, '2011 - Placa Redonda Coquim 40cm', 'placa_redonda'),
        new item(4, '2012 - Placa Redonda Coquim 50cm', 'placa_redonda'),

        new item(6, '2013 - Placa Colmeia Coquim 30cm', 'placa_colmeia'),

        new item(40, '2999 - Estaca Coquim 30cm', 'estaca_coquim'),
        new item(43, '3000 - Estaca Coquim 40cm', 'estaca_coquim'),
        new item(41, '3001 - Estaca Coquim 60cm', 'estaca_coquim'),
        new item(40, '3002 - Estaca Coquim 80cm', 'estaca_coquim'),

        new item(25, '4000 - Mix Coquim 1kg', 'adubos'),
        new item(27, '4001 - Pó de Coco 1kg', 'adubos'),
        new item(35, '4002 - Fibra de Coco 200g', 'adubos'),
        new item(5, '4003 - Pó de Coco Magico 400g', 'adubos'),
        new item(3, '4004 - Fibra de Coco Curta 1kg', 'adubos'),
        new item(25, '4005 - Chips de Coco 200g', 'adubos'),
        new item(26, '4006 - Fibra de Coco Protein', 'adubos'),
        new item(25, '4007 - Chips de Mix Protem 1kg', 'adubos'),
        new item(0, '4008 - Chips de Coco 3kg', 'adubos'),
        new item(0, '4009 - Fibra de Coco 1.5kg', 'adubos'),
        new item(0, '4010 - Musgo Esfagno 5kg', 'adubos'),
        new item(0, '4011 - Musgo Esfagno 100g', 'adubos'),
        new item(0, '4012 - Fibra Curta 250g', 'adubos'),

        new item(3, '5000 - Placa 20x20cm Com 1 Meio Vaso nº 5', 'placa_com_vaso'),
        new item(2, '5001 - Placa 20x40cm Com 1 Meio Vaso nº 10', 'placa_com_vaso'),
        new item(2, '5002 - Placa 40x40cm Com 1 Meio Vaso nº 12', 'placa_com_vaso'),
        new item(3, '5003 - Placa 20x60cm Com 2 Meio Vasos nº 8', 'placa_com_vaso'),
        new item(2, '5007 - Placa 30x40cm Com 1 Meio Vaso nº 12', 'placa_com_vaso'),
        new item(2, '5008 - Placa 20x30cm Com 1 Meio Vaso nº 10', 'placa_com_vaso'),
        new item(1, '5013 - Placa 40x80cm Com 2 Meio Vasos nº 14', 'placa_com_vaso'),
        new item(0, '5014 - Painel 1.00x1.00m Com 8 Meio Vasos nº 12', 'placa_com_vaso'),
        new item(3, '5015 - Placa 30x40cm Com 2 Meio Vasos nº 10', 'placa_com_vaso'),
        new item(0, '5016 - Placa 40x60cm Com 3 Meio Vasos nº 13', 'placa_com_vaso'),
        new item(0, '5017 - Placa 40x60cm Com 4 Meio Vasos nº 13', 'placa_com_vaso'),
        new item(0, '5018 - Placa 60x60cm Com 5 Meio Vasos nº 10', 'placa_com_vaso'),
        new item(0, '5019 - Placa 80x80cm Com 5 Meio Vasos nº 12', 'placa_com_vaso'),

        new item(5, '5020 - 1/2 Vaso nº 13 Com Placa Redonda 25cm', 'meio_vaso'),
        new item(5, '5021 - 1/2 Vaso nº 15 Com Placa Redonda 30cm', 'meio_vaso'),
        new item(5, '5022 - 1/2 Vaso nº 17 Com Placa Redonda 35cm', 'meio_vaso'),
        new item(0, '5023 - 1/2 Vaso Virola nº 5 Com Placa Redonda 25cm', 'meio_vaso'),
        new item(0, '5024 - 1/2 Vaso Virola nº 10 Com Placa Redonda 30cm', 'meio_vaso'),
        new item(0, '5025 - 1/2 Vaso Virola nº 12 Com Placa Redonda 35cm', 'meio_vaso'),
        new item(0, '5026 - 1/2 Vaso Virola nº 14 Com Placa Redonda 40cm', 'meio_vaso'),
        new item(6, '5027 - 1/2 Vaso nº 10 Com Placa Colmeia 30cm', 'meio_vaso'),
        new item(0, '5028 - 1/2 Vaso Virola nº 10 Com Placa Colmeia 30cm', 'meio_vaso'),
        new item(6, '5029 - 1/2 Vaso nº 13 Com Placa Colmeia 30cm', 'meio_vaso'),

        new item(5, '5200 - 1/2 Vaso nº 10 C/Placa', '1/2_vaso_placa'),
        new item(3, '5201 - 1/2 Vaso nº 12 C/Placa', '1/2_vaso_placa'),
        new item(4, '5202 - 1/2 Vaso nº 14 C/Placa', '1/2_vaso_placa'),
        new item(5, '5203 - 1/2 Vaso nº 17 C/Placa', '1/2_vaso_placa'),
        new item(4, '5204 - 1/2 Vaso nº 13 C/Placa', '1/2_vaso_placa'),
        
        new item(6, '6007 - Manta Calandrada', 'manta'),
        new item(6, '6015 - Manta Refil 25cm', 'manta'),
        new item(2, '6016 - Manta Refil 30cm', 'manta'),
        new item(6, '6017 - Manta Refil 35cm', 'manta'),

        new item(6, '7000 - 1/2 Vaso nº 13 C/Placa Media 19x18cm', '1/2_vaso_placa'),
        new item(6, '7001 - 1/2 Vaso nº 15 C/Placa Media 24x20cm', '1/2_vaso_placa'),
        new item(10, '7002 - 1/2 Vaso nº 17 C/Placa Media 29x26cm', '1/2_vaso_placa'),
        
        new item(10, '8005 - Vaso Coquim 05 Com Suporte', 'vaso_cordeinha'),
        new item(13, '8006 - Vaso Coquim 08 Com Suporte', 'vaso_cordeinha'),
        new item(12, '8007 - Vaso Coquim 10 Com Suporte', 'vaso_cordeinha'),

        new item(10, '8013 - Kopin Coquim', 'kopin'),

        new item(0, '9014 - Cachepot Onda 13x12cm', 'cahepot'),
        new item(0, '9015 - Cachepot Onda 15x15cm', 'cahepot'),
        new item(0, '9016 - Cachepot Quadrado 15x15cm', 'cahepot'),
        new item(0, '9017 - Cachepot Quadrado 13x12cm', 'cahepot'),

        new item(8, '9022 - Kokindama', 'coquidama'),
        new item(17, '9023 - Cestindama', 'coquidama'),
        new item(12, '9024 - Kokindama P', 'coquidama'),
        new item(14, '9025 - Cestindama P', 'coquidama'),

        new item(15, '9028 - Coquim Orquidea de Parede Mini', 'cone'),
        new item(15, '9029 - Coquim Orquidea de Parede P', 'cone'),
        new item(13, '8000 - Coquim Orquidea de Parede M', 'cone'),
        new item(7, '9030 - Coquim Orquidea de Parede G', 'cone'),
        new item(9, '9031 - Coquim Orquidea de Parede GG', 'cone'),

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

        document.getElementById('botaoIsento').style.backgroundColor = '#94be7ce0'
        isençãoDeDesconto = false
    } else {
        registroDaCalculadora.push(new ValorUnitario(valor, `R&#36; ${valor.toFixed(2)}`, registroDaCalculadora.length))
    }
    
    retorno.innerText = ''
    for (let index in registroDaCalculadora) {
        retorno.innerHTML += registroDaCalculadora[index].codigo
    }
    retorno.innerHTML += `<label class='linhaRetorno' onclick='funçoesDoTotal()'>
                            Total: R&#36 ${total.toFixed(2)}</label>
                        <div id='funçoesDoTotal' class="menuEspecifico">
                            <input type="number" id='descontoN' class='entradaMultiplo' onchange='validaçãoPorcento()'> %
                        </div><br>`
    entrada.value = ''
    porcento3On = false
    porcento5On = false

    retorno.select()
}

function isentarDeDesconto() {
    if (isençãoDeDesconto) {
        isençãoDeDesconto = false
        document.getElementById('botaoIsento').style.backgroundColor = '#94be7ce0'
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
        retorno.innerHTML += `R&#36; -${(parcial*5/100).toFixed(2)}<br>`
        retorno.innerHTML += `<label class='linhaRetorno' onclick='funçoesDoTotal()'>
                                Total: R&#36 ${total5.toFixed(2)}</label>
                            <div id='funçoesDoTotal' class="menuEspecifico">
                                <input type="number" id='descontoN' class='entradaMultiplo' onchange='validaçãoPorcento()'> %
                            </div><br>`
    } else {
        porcento5On = false

        retorno.innerText = ''
        for (let index in registroDaCalculadora) {
            retorno.innerHTML += registroDaCalculadora[index].codigo
        }
        retorno.innerHTML += `<label class='linhaRetorno' onclick='funçoesDoTotal()'>
                                Total: R&#36 ${total.toFixed(2)}</label>
                            <div id='funçoesDoTotal' class="menuEspecifico">
                                <input type="number" id='descontoN' class='entradaMultiplo' onchange='validaçãoPorcento()'> %
                            </div><br>`
    }
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
        retorno.innerHTML += `R&#36; -${(parcial*3/100).toFixed(2)}<br>`
        retorno.innerHTML += `<label class='linhaRetorno' onclick='funçoesDoTotal()'>
                                Total: R&#36 ${total3.toFixed(2)}</label>
                            <div id='funçoesDoTotal' class="menuEspecifico">
                                <input type="number" id='descontoN' class='entradaMultiplo' onchange='validaçãoPorcento()'> %
                            </div><br>`
    } else {
        porcento3On = false

        retorno.innerText = ''
        for (let index in registroDaCalculadora) {
            retorno.innerHTML += registroDaCalculadora[index].codigo
        }
        retorno.innerHTML += `<label class='linhaRetorno' onclick='funçoesDoTotal()'>
                                Total: R&#36 ${total.toFixed(2)}</label>
                            <div id='funçoesDoTotal' class="menuEspecifico">
                                <input type="number" id='descontoN' class='entradaMultiplo' onchange='validaçãoPorcento()'> %
                            </div><br>`
    }
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
        retorno.innerHTML += `R&#36; -${(parcial*porcentoN/100).toFixed(2)}<br>`
        retorno.innerHTML += `<label class='linhaRetorno' onclick='funçoesDoTotal()'>
                                Total: R&#36 ${totalN.toFixed(2)}</label>
                            <div id='funçoesDoTotal' class="menuEspecifico">
                                <input type="number" id='descontoN' class='entradaMultiplo' onchange='validaçãoPorcento()'> %
                            </div><br>`
    } else {
        retorno.innerText = ''
        for (let index in registroDaCalculadora) {
            retorno.innerHTML += registroDaCalculadora[index].codigo
        }
        retorno.innerHTML += `<label class='linhaRetorno' onclick='funçoesDoTotal()'>
                                Total: R&#36 ${total.toFixed(2)}</label>
                            <div id='funçoesDoTotal' class="menuEspecifico">
                                <input type="number" id='descontoN' class='entradaMultiplo' onchange='validaçãoPorcento()'> %
                            </div><br>`
    }
    
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
        fundo.style.backgroundImage = 'linear-gradient(90deg, #27bd64e1, #2681bda2)'

        entradaMultiploOn = false
    } else {
        try {
            entradaM.style.display = 'inline'
            entradaM.select()
        } catch {null}
        try {entradaP.style.display = 'none'} catch {null}
        fundo.style.backgroundImage = 'linear-gradient(90deg, #2775bde1, #2681bda2)'
        
        entradaMultiploOn = true
    }
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
                <label id='linha${index}' class='linhaRetorno' onclick='funçoesDoValor(${index})'>
                    ${registroDaCalculadora[index].texto}
                </label>
                <div id='funçoes${index}' class="menuEspecifico">
                <input type="button" class="funçoes" value="D" onclick="deletar(${index})">
                </div><br>`
        } else {
            registroDaCalculadora[index].texto = `${texto[0]} ${texto[1]}x${multiplicador}`
            registroDaCalculadora[index].codigo = `
                <label id='linha${index}' class='linhaRetorno' onclick='funçoesDoValor(${index})'>
                    ${registroDaCalculadora[index].texto}
                </label>
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
        retorno.innerHTML += `<label class='linhaRetorno' onclick='funçoesDoTotal()'>
                            Total: R&#36 ${total.toFixed(2)}</label>
                        <div id='funçoesDoTotal' class="menuEspecifico">
                            <input type="number" id='descontoN' class='entradaMultiplo' onchange='validaçãoPorcento()'> %
                        </div><br>`
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
            <label id='linha${index}' class='linhaRetorno' onclick='funçoesDoValor(${index})'>
                ${registroDaCalculadora[index].texto}
            </label>
            <div id='funçoes${index}' class="menuEspecifico">
            <input type="button" class="funçoes" value="D" onclick="deletar(${index})">
            </div><br>`
    } else {
        registroDaCalculadora[index].codigo = `
            <label id='linha${index}' class='linhaRetorno' onclick='funçoesDoValor(${index})'>
                ${registroDaCalculadora[index].texto}
            </label>
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
    retorno.innerHTML += `<label class='linhaRetorno' onclick='funçoesDoTotal()'>
                            Total: R&#36 ${total.toFixed(2)}</label>
                        <div id='funçoesDoTotal' class="menuEspecifico">
                            <input type="number" id='descontoN' class='entradaMultiplo' onchange='validaçãoPorcento()'> %
                        </div><br>`
}

function deletar(index) {
    total -= registroDaCalculadora[index].valor
    if (registroDaCalculadora[index].isento) {valorIsentoDeDesconto -= registroDaCalculadora[index].valor}

    delete registroDaCalculadora[index]
    retorno.innerText = ''
    for (let index in registroDaCalculadora) {
        retorno.innerHTML += registroDaCalculadora[index].codigo
    }
    retorno.innerHTML += `<label class='linhaRetorno' onclick='funçoesDoTotal()'>
                            Total: R&#36 ${total.toFixed(2)}</label>
                        <div id='funçoesDoTotal' class="menuEspecifico">
                            <input type="number" id='descontoN' class='entradaMultiplo' onchange='validaçãoPorcento()'> %
                        </div><br>`
    menuEspecificOn = false
}

function calculoReset() {
    total = 0
    registroDaCalculadora = []
    valorIsentoDeDesconto = 0
    isençãoDeDesconto = false
    porcento3On = false
    porcento5On = false
    entradaMultiploOn = true
    menuEspecificOn = false
    menuDescontoOn = false
    window.document.getElementById('retorno').innerHTML = 'Total: R$ 0.00'
}

function menuExpand(menu) {
    var menu = window.document.getElementById(`${menu}`)
    
    if (menu.style.display == 'block') {menu.style.display = 'none'}
    else {
        window.document.getElementById('navMenuInventarios').style.display = 'none'
        window.document.getElementById('navMenuPlantas').style.display = 'none'
        window.document.getElementById('navMenuRepositorios').style.display = 'none'

        menu.style.display = 'block'}
}

function sectionExpand(section, identidade='', menu='') {
    if (section == 'plantas') {
        sectPlantas.style.display = 'block'

        sectCalculo.style.display = 'none'
        sectInventarios.style.display = 'none'
        sectRepositor.style.display = 'none'
    } else if (section == 'calculadora'){
        sectCalculo.style.display = 'block'
        document.getElementById('entrada').select()

        document.getElementById('navMenuInventarios').style.display = 'none'
        document.getElementById('navMenuPlantas').style.display = 'none'
        document.getElementById('navMenuRepositorios').style.display = 'none'

        sectPlantas.style.display = 'none'
        sectInventarios.style.display = 'none'
        sectRepositor.style.display = 'none'
    } else if (section == 'inventarios') {
        sectInventarios.style.display = 'block'
        
        sectPlantas.style.display = 'none'
        sectCalculo.style.display = 'none'
        sectRepositor.style.display = 'none'
    } else if (section == 'repositor') {
        sectRepositor.style.display = 'block'

        sectPlantas.style.display = 'none'
        sectCalculo.style.display = 'none'
        sectInventarios.style.display = 'none'
    }

    if (identidade) {
        var menu = window.document.getElementById(`${menu}`)
        var arct
        menu.style.display = 'none'

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

//====================================================||Comandos||================================================
impreção(articleRegaplan, regaplan, 'regaplan')
impreção(articleEmeAEme, emeAeme, 'emeAeme')
impreção(articleForth, forth, 'forth')
impreção(articleAlfa_polietileno, alfa_polietileno, 'alfa_polietileno')
impreção(articleAlfa_fibraSintetica, alfa_fibraSintetica, 'alfa_fibraSintetica')
impreção(articleRischioto, rischioto, 'rischioto')
impreção(articleJelPlast, jel_plast, 'jel_plast')
impreção(articlePolicamp, policamp, 'policamp')
impreção(articleInsetimax, insetimax, 'insetimax')
impreção(articleMadeiras, madeiras, 'madeiras')
impreção(articleNutriplan, nutriplan, 'nutriplan')
impreção(articleCoquim, coquim, 'coquim')
