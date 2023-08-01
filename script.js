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
    constructor(valor_especifico, texto, index) {
        this.valor = valor_especifico
        this.texto = texto
        this.codigo = `
            <label id='linha${index}' class='linhaRetorno' onclick='funçoesDoValor(${index})'>
                ${this.texto}
            </label>
            <div id='funçoes${index}' class="menuEspecifico">
            <input type="number" id="entrada${index}" class='entradaMultiplo' onchange="multiplicação(${index})">
            <input type="button" class="funçoes" value="D" onclick="deletar(${index})">
        </div><br>`
        } 
    }

//=============================================||Variaveis||======================================================

var total = 0
var registro = []
var porcento3On = false
var porcento5On = false
var menuEspecificOn = false
var linhaDestacadaOn = false
var indiceRepositor = 0

//=======================||Seções||=========================//
var sectPlantas = window.document.getElementById('plantas')
var sectCalculo = window.document.getElementById('calculadora')
var sectInventarios = window.document.getElementById('inventarios')
var sectRepositor = window.document.getElementById('repositor')

//=======================||Artigos||========================//
var articleRegaplan = window.document.getElementById('regaplan')
var articleEmeAEme = window.document.getElementById('eme_a_eme')
var articleForth = window.document.getElementById('forth')
var articleAlfa = window.document.getElementById('alfa')

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
    'eme_a_eme',
    'forth',
    'alfa'
]
var regaplan = new Inventario(
    'Regaplan',
    '18/07/2023',
    [
        new item(5, 'Corrente 44cm - Dourado 1.6mm', 'corrente_1.6mm'),
        new item(6, 'Corrente 54cm - Dourado 1.6mm', 'corrente_1.6mm'),
        new item(7, 'Corrente 64cm - Dourado 1.6mm', 'corrente_1.6mm'),
        new item(8, 'Corrente 74cm - Dourado 1.6mm', 'corrente_1.6mm'),
        new item(8, 'Corrente 84cm - Dourado 1.6mm', 'corrente_1.6mm'),

        new item(6, 'Corrente Lustre 50 - Dourado 2.0mm', 'corrente_2.0mm'),
        new item(7, 'Corrente Lustre 60 - Dourado 2.0mm', 'corrente_2.0mm'),
        new item(6, 'Corrente Lustre 70 - Dourado 2.0mm', 'corrente_2.0mm'),
        new item(7, 'Corrente Lustre 80 - Dourado 2.0mm', 'corrente_2.0mm'),

        new item(0, 'Gancho S Grande - Dourado 18cm', 'gancho_S'),
        new item(40, 'Gancho S Médio - Dourado 18cm', 'gancho_S'),
        new item(0, 'Gancho S Pequeno - Dourado 18cm', 'gancho_S'),

        new item(10, 'Suporte A Reforçado 01 - 19cm Dourado', 'sp_a_reforçado'),
        new item(10, 'Suporte A Reforçado 02 - 24cm Dourado', 'sp_a_reforçado'),
        new item(20, 'Suporte A Reforçado 03 - 29cm Dourado', 'sp_a_reforçado'),
        new item(40, 'Suporte A Reforçado 04 - 34cm Dourado', 'sp_a_reforçado'),

        new item(90, 'Suporte Artístico 00 - 19cm Dourado', 'sp_artistico'),
        new item(100, 'Suporte Artístico 01 - 26cm Dourado', 'sp_artistico'),
        new item(60, 'Suporte Artístico 02 - 31cm Dourado', 'sp_artistico'),
        new item(80, 'Suporte Artístico 03 - 37cm Dourado', 'sp_artistico'),
        new item(95, 'Suporte Artístico 04 - 43cm Dourado', 'sp_artistico'),

        new item(3, 'Suporte Arvore - 3 Vasos Dourado', 'sp_arvore'),
        new item(3, 'Suporte Arvore - 3 Vasos Preto', 'sp_arvore'),
        new item(2, 'Suporte Arvore - 5 Vasos Dourado', 'sp_arvore'),
        new item(4, 'Suporte Arvore - 5 Vasos Preto', 'sp_arvore'),

        new item(12, 'Suporte Coador 26cm Preto', 'sp_coador'),
        new item(7, 'Suporte Coador 28cm Preto', 'sp_coador'),
        new item(15, 'Suporte Coador 30cm Preto', 'sp_coador'),
        new item(9, 'Suporte Coador 32cm Preto', 'sp_coador'),

        new item(20, 'Suporte de Canto Dourado'),

        new item(10, 'Suporte Margarida 01 - 19 cm Dourado', 'sp_margarida'),
        new item(0, 'Suporte Margarida 02 - 21 cm Dourado', 'sp_margarida'),
        new item(10, 'Suporte Margarida 03 - 23 cm Dourado', 'sp_margarida'),
        new item(30, 'Suporte Margarida 04 - 26 cm Dourado', 'sp_margarida'),

        new item(20, 'Suporte Rasteiro Chapa 01 - 18cm Dourado', 'sp_rasteiro'),
        new item(0, 'Suporte Rasteiro Chapa 02 - 21cm Dourado', 'sp_rasteiro'),
        new item(5, 'Suporte Rasteiro Chapa 03 - 24cm Dourado', 'sp_rasteiro'),
        new item(15, 'Suporte Rasteiro Chapa 04 - 27cm Dourado', 'sp_rasteiro'),
        new item(5, 'Suporte Rasteiro Chapa 05 - 30cm Dourado', 'sp_rasteiro'),
        new item(15, 'Suporte Rasteiro Chapa 06 - 33cm Dourado', 'sp_rasteiro'),
        new item(20, 'Suporte Rasteiro Chapa 07 - 36cm Dourado', 'sp_rasteiro'),
        new item(20, 'Suporte Rasteiro Chapa 08 - 40cm Dourado', 'sp_rasteiro'),

        new item(0, 'Suporte Torre 40cm Dourado', 'sp_torre'),
        new item(7, 'Suporte Torre 40cm Preto', 'sp_torre'),
        new item(0, 'Suporte Torre 60cm Dourado', 'sp_torre'),
        new item(7, 'Suporte Torre 60cm Preto', 'sp_torre'),
        new item(1, 'Suporte Torre 80cm Dourado', 'sp_torre'),
        new item(14, 'Suporte Torre 80cm Preto', 'sp_torre'),
        new item(4, 'Suporte Torre 110cm Dourado', 'sp_torre'),
        new item(10, 'Suporte Torre 110cm Preto', 'sp_torre'),

        new item(0, 'Tripé Decorativo Grande Dourado', 'tp_decorativo'),
        new item(0, 'Tripé Decorativo Grande Preto', 'tp_decorativo'),
        new item(0, 'Tripé Decorativo Médio Dourado', 'tp_decorativo'),
        new item(0, 'Tripé Decorativo Médio Preto', 'tp_decorativo'),
        new item(0, 'Tripé Decorativo Pequeno Dourado', 'tp_decorativo'),
        new item(0, 'Tripé Decorativo Pequeno Preto', 'tp_decorativo'),

        new item(5, 'Tripé Suspenso 01 20x40cm', 'tp_suspenso'),
        new item(5, 'Tripé Suspenso 01 20x40cm', 'tp_suspenso'),
        new item(10, 'Tripé Suspenso 01 20x40cm', 'tp_suspenso'),

        new item(8, 'Violeteiro Com Corrente - 2 Vasos', 'violeteiro'),
        new item(8, 'Violeteiro Com Corrente - 3 Vasos', 'violeteiro'),
        new item(9, 'Violeteiro Com Corrente - 4 Vasos', 'violeteiro'),
        new item(10, 'Violeteiro Com Corrente - 5 Vasos', 'violeteiro'),

        new item(0, 'Violeteiro Pedestal - 3 Vasos Dourado', 'sp_violeteiro'),
        new item(1, 'Violeteiro Pedestal - 3 Vasos Preto', 'sp_violeteiro'),
        new item(0, 'Violeteiro Pedestal - 5 Vasos Dourado', 'sp_violeteiro'),
        new item(0, 'Violeteiro Pedestal - 5 Vasos Preto', 'sp_violeteiro'),
        new item(0, 'Violeteiro Pedestal - 7 Vasos Dourado', 'sp_violeteiro'),
        new item(2, 'Violeteiro Pedestal - 7 Vasos Preto', 'sp_violeteiro'),
        new item(2, 'Violeteiro Pedestal - 9 Vasos Dourado', 'sp_violeteiro'),
        new item(2, 'Violeteiro Pedestal - 9 Vasos Preto', 'sp_violeteiro'),
    ]
)
var emeAeme = new Inventario(
    'Eme A Eme',
    '28/07/2023',
    [
        new item(209, 'Alça Universal Branca', 'alça_universal'),
        new item(54, 'Alça Universal Café', 'alça_universal'),
        new item(161, 'Alça Universal Cerâmica', 'alça_universal'),
        new item(85, 'Alça Universal Marfim', 'alça_universal'),
        new item(154, 'Alça Universal Preta', 'alça_universal'),
        new item(31, 'Alça Universal Verde', 'alça_universal'),

        new item(58, 'Cuia CB 13 Branca', 'cuia_cb_13'),
        new item(0, 'Cuia CB 13 Café', 'cuia_cb_13'),
        new item(80, 'Cuia CB 13 Cerâmica', 'cuia_cb_13'),
        new item(44, 'Cuia CB 13 Marfim', 'cuia_cb_13'),
        new item(78, 'Cuia CB 13 Preta', 'cuia_cb_13'),
        new item(58, 'Cuia CB 13 Verde', 'cuia_cb_13'),

        new item(56, 'Cuia CB 15 Branca', 'cuia_cb_15'),
        new item(0, 'Cuia CB 15 Café', 'cuia_cb_15'),
        new item(54, 'Cuia CB 15 Cerâmica', 'cuia_cb_15'),
        new item(44, 'Cuia CB 15 Marfim', 'cuia_cb_15'),
        new item(88, 'Cuia CB 15 Preta', 'cuia_cb_15'),
        new item(51, 'Cuia CB 15 Verde', 'cuia_cb_15'),

        new item(48, 'Cuia CBB 18 Com Base Branca', 'cuia_cbb_18'),
        new item(51, 'Cuia CBB 18 Com Base Café', 'cuia_cbb_18'),
        new item(55, 'Cuia CBB 18 Com Base Cerâmica', 'cuia_cbb_18'),
        new item(41, 'Cuia CBB 18 Com Base Marfim', 'cuia_cbb_18'),
        new item(52, 'Cuia CBB 18 Com Base Preta', 'cuia_cbb_18'),
        new item(35, 'Cuia CBB 18 Com Base Verde', 'cuia_cbb_18'),

        new item(34, 'Cuia CBB 21 Com Base Branca', 'cuia_cbb_21'),
        new item(48, 'Cuia CBB 21 Com Base Café', 'cuia_cbb_21'),
        new item(67, 'Cuia CBB 21 Com Base Cerâmica', 'cuia_cbb_21'),
        new item(51, 'Cuia CBB 21 Com Base Marfim', 'cuia_cbb_21'),
        new item(99, 'Cuia CBB 21 Com Base Preta', 'cuia_cbb_21'),
        new item(56, 'Cuia CBB 21 Com Base Verde', 'cuia_cbb_21'),

        new item(34, 'Cuia CBB 25 Com Base Branca', 'cuia_cbb_25'),
        new item(48, 'Cuia CBB 25 Com Base Café', 'cuia_cbb_25'),
        new item(34, 'Cuia CBB 25 Com Base Cerâmica', 'cuia_cbb_25'),
        new item(47, 'Cuia CBB 25 Com Base Marfim', 'cuia_cbb_25'),
        new item(29, 'Cuia CBB 25 Com Base Preta', 'cuia_cbb_25'),
        new item(46, 'Cuia CBB 25 Com Base Verde', 'cuia_cbb_25'),

        new item(45, 'Cuia CBB 30 Com Base Branca', 'cuia_cbb_30'),
        new item(27, 'Cuia CBB 30 Com Base Café', 'cuia_cbb_30'),
        new item(23, 'Cuia CBB 30 Com Base Cerâmica', 'cuia_cbb_30'),
        new item(35, 'Cuia CBB 30 Com Base Marfim', 'cuia_cbb_30'),
        new item(13, 'Cuia CBB 30 Com Base Preta', 'cuia_cbb_30'),
        new item(20, 'Cuia CBB 30 Com Base Verde', 'cuia_cbb_30'),

        new item(35, 'Cuia Gran Imperial CBB 40 Com Base Cerâmica', 'cuia_cbb_40'),
        new item(26, 'Cuia Gran Imperial CBB 40 Com Base Preta', 'cuia_cbb_40'),

        new item(312, 'Etiqueta E00', 'etiqueta'),
        new item(0, 'Etiqueta E03', 'etiqueta'),
        new item(0, 'Etiqueta E08', 'etiqueta'),
        new item(2, 'Etiqueta E09', 'etiqueta'),
        new item(0, 'Etiqueta E11', 'etiqueta'),
        new item(500, 'Etiqueta E16', 'etiqueta'),
        new item(727, 'Etiqueta E30', 'etiqueta'),
        new item(1000, 'Etiqueta E40', 'etiqueta'),
        new item(0,  'Etiqueta EP22', 'etiqueta'),

        new item(34, 'Floreira FCB 30 Com Base Café', 'floreira_fcb_30'),
        new item(43, 'Floreira FCB 30 Com Base Cerâmica', 'floreira_fcb_30'),
        new item(32, 'Floreira FCB 30 Com Base Cimento', 'floreira_fcb_30'),
        new item(32, 'Floreira FCB 30 Com Base Preta', 'floreira_fcb_30'),
        new item(21, 'Floreira FCB 30 Com Base Verde', 'floreira_fcb_30'),

        new item(5, 'Floreira FCB 40 Com Base Café', 'floreira_fcb_40'),
        new item(36, 'Floreira FCB 40 Com Base Cerâmica', 'floreira_fcb_40'),
        new item(21, 'Floreira FCB 40 Com Base Cimento', 'floreira_fcb_40'),
        new item(36, 'Floreira FCB 40 Com Base Preta', 'floreira_fcb_40'),
        new item(8, 'Floreira FCB 40 Com Base Verde', 'floreira_fcb_40'),

        new item(13, 'Floreira FCB 60 Com Base Café', 'floreira_fcb_60'),
        new item(20, 'Floreira FCB 60 Com Base Cerâmica', 'floreira_fcb_60'),
        new item(21, 'Floreira FCB 60 Com Base Cimento', 'floreira_fcb_60'),
        new item(17, 'Floreira FCB 60 Com Base Preta', 'floreira_fcb_60'),
        new item(8, 'Floreira FCB 60 Com Base Verde', 'floreira_fcb_60'),

        new item(87, 'Prato B006 6cm Cerâmica', 'prato_b006'),
        new item(135, 'Prato B006 6cm Preto', 'prato_b006'),

        new item(50, 'Prato B00 9.5cm Cerâmica', 'prato_b00'),
        new item(0, 'Prato B00 9.5cm Preto', 'prato_b00'),

        new item(81, 'Prato B01 11.5cm Cerâmica', 'prato_b01'),
        new item(30, 'Prato B01 11.5cm Cimento', 'prato_b01'),
        new item(29, 'Prato B01 11.5cm Marfim', 'prato_b01'),
        new item(62, 'Prato B01 11.5cm Preto', 'prato_b01'),

        new item(14, 'Prato B02 13cm Cerâmica', 'prato_b02'),
        new item(0, 'Prato B02 13cm Cimento', 'prato_b02'),
        new item(0, 'Prato B02 13cm Marfim', 'prato_b02'),
        new item(0, 'Prato B02 13cm Preto', 'prato_b02'),

        new item(21, 'Prato B03 16cm Cerâmica', 'prato_b03'),
        new item(15, 'Prato B03 16cm Cimento', 'prato_b03'),
        new item(28, 'Prato B03 16cm Marfim', 'prato_b03'),
        new item(0, 'Prato B03 16cm Preto', 'prato_b03'),

        new item(53, 'Prato B04 21cm Cerâmica', 'prato_b04'),
        new item(29, 'Prato B04 21cm Cimento', 'prato_b04'),
        new item(30, 'Prato B04 21cm Marfim', 'prato_b04'),
        new item(19, 'Prato B04 21cm Preto', 'prato_b04'),

        new item(73, 'Prato B04.5 22cm Cerâmica', 'prato_b4.5'),
        new item(30, 'Prato B04.5 22cm Cimento', 'prato_b4.5'),
        new item(26, 'Prato B04.5 22cm Marfim', 'prato_b4.5'),
        new item(80, 'Prato B04.5 22cm Preto', 'prato_b4.5'),

        new item(47, 'Prato B05 24cm Cerâmica', 'prato_b05'),
        new item(20, 'Prato B05 24cm Cimento', 'prato_b05'),
        new item(16, 'Prato B05 24cm Marfim', 'prato_b05'),
        new item(51, 'Prato B05 24cm Preto', 'prato_b05'),

        new item(47, 'Prato B06 27cm Cerâmica', 'prato_b06'),
        new item(17, 'Prato B06 27cm Cimento', 'prato_b06'),
        new item(19, 'Prato B06 27cm Marfim', 'prato_b06'),
        new item(51, 'Prato B06 27cm Preto', 'prato_b06'),

        new item(60, 'Prato B07 30cm Cerâmica', 'prato_b07'),
        new item(23, 'Prato B07 30cm Cimento', 'prato_b07'),
        new item(21, 'Prato B07 30cm Marfim', 'prato_b07'),
        new item(84, 'Prato B07 30cm Preto', 'prato_b07'),

        new item(37, 'Prato B08 33cm Cerâmica', 'prato_b08'),
        new item(12, 'Prato B08 33cm Cimento', 'prato_b08'),
        new item(10, 'Prato B08 33cm Marfim', 'prato_b08'),
        new item(15, 'Prato B08 33cm Preto', 'prato_b08'),

        new item(40, 'Prato B09 38cm Cerâmica', 'prato_b09'),
        new item(8, 'Prato B09 38cm Cimento', 'prato_b09'),
        new item(9, 'Prato B09 38cm Marfim', 'prato_b09'),
        new item(66, 'Prato B09 38cm Preto', 'prato_b09'),

        new item(46, 'Prato B10 42cm Cerâmica', 'prato_b10'),
        new item(0, 'Prato B10 42cm Cimento', 'prato_b10'),
        new item(0, 'Prato B10 42cm Marfim', 'prato_b10'),
        new item(28, 'Prato B10 42cm Preto', 'prato_b10'),

        new item(57, 'Vaso De Parede VP 14 Branco', 'vp_14'),
        new item(44, 'Vaso De Parede VP 14 Cerâmica', 'vp_14'),
        new item(88, 'Vaso De Parede VP 14 Preto', 'vp_14'),
        new item(75, 'Vaso De Parede VP 14 Verde', 'vp_14'),

        new item(44, 'Vaso De Parede VP 20 Branco', 'vp_20'),
        new item(58, 'Vaso De Parede VP 20 Cerâmica', 'vp_20'),
        new item(71, 'Vaso De Parede VP 20 Preto', 'vp_20'),
        new item(56, 'Vaso De Parede VP 20 Verde', 'vp_20'),

        new item(55, 'Vaso De Parede VP 30 Branco', 'vp_30'),
        new item(87, 'Vaso De Parede VP 30 Cerâmica', 'vp_30'),
        new item(112, 'Vaso De Parede VP 30 Preto', 'vp_30'),
        new item(53, 'Vaso De Parede VP 30 Verde', 'vp_30'),

        new item(34, 'Vaso Imperial V15 Cerâmica', 'v_imperial_15'),
        new item(34, 'Vaso Imperial V15 Cimento', 'v_imperial_15'),
        new item(35, 'Vaso Imperial V15 Marfim', 'v_imperial_15'),
        new item(35, 'Vaso Imperial V15 Preto', 'v_imperial_15'),

        new item(39, 'Vaso Imperial V20 Cerâmica', 'v_imperial_20'),
        new item(38, 'Vaso Imperial V20 Cimento', 'v_imperial_20'),
        new item(36, 'Vaso Imperial V20 Marfim', 'v_imperial_20'),
        new item(41, 'Vaso Imperial V20 Preto', 'v_imperial_20'),

        new item(2, 'Vaso Imperial V25 Cerâmica', 'v_imperial_25'),
        new item(3, 'Vaso Imperial V25 Cimento', 'v_imperial_25'),
        new item(3, 'Vaso Imperial V25 Marfim', 'v_imperial_25'),
        new item(2, 'Vaso Imperial V25 Preto', 'v_imperial_25'),

        new item(3, 'Vaso Imperial V30 Cerâmica', 'v_imperial_30'),
        new item(3, 'Vaso Imperial V30 Cimento', 'v_imperial_30'),
        new item(5, 'Vaso Imperial V30 Marfim', 'v_imperial_30'),
        new item(3, 'Vaso Imperial V30 Preto', 'v_imperial_30'),

        new item(0, 'Vaso Imperial V40 Cerâmica', 'v_imperial_40'),
        new item(0, 'Vaso Imperial V40 Cimento', 'v_imperial_40'),
        new item(0, 'Vaso Imperial V40 Marfim', 'v_imperial_40'),
        new item(0, 'Vaso Imperial V40 Preto', 'v_imperial_40'),

        new item(27, 'Vaso T 07 Cerâmica', 'vaso_t_07'),
        new item(24, 'Vaso T 07 Preto', 'vaso_t_07'),

        new item(106, 'Vaso T 09 Cerâmica', 'vaso_t_09'),
        new item(105, 'Vaso T 09 Preto', 'vaso_t_09'),

        new item(21, 'Vaso T 10 Cerâmica', 'vaso_t_10'),
        new item(20, 'Vaso T 10 Preto', 'vaso_t_10'),

        new item(0, 'Vaso T 12 Cerâmica', 'vaso_t_12'),
        new item(0, 'Vaso T 12 Preto', 'vaso_t_12'),

        new item(8, 'Vaso T 14 Cerâmica', 'vaso_t_14'),
        new item(7, 'Vaso T 14 Preto', 'vaso_t_14'),

        new item(13, 'Vaso T 16 Cerâmica', 'vaso_t_16'),
        new item(1, 'Vaso T 16 Preto', 'vaso_t_16'),

        new item(6, 'Vaso T 18 Cerâmica', 'vaso_t_18'),
        new item(7, 'Vaso T 18 Preto', 'vaso_t_18'),

        new item(4, 'Vaso T 20 Cerâmica', 'vaso_t_20'),
        new item(11, 'Vaso T 20 Preto', 'vaso_t_20'),

        new item(8, 'Vaso T 25 Cerâmica', 'vaso_t_25'),
        new item(0, 'Vaso T 25 Preto', 'vaso_t_25'),

        new item(12, 'Vaso T 27 Cerâmica', 'vaso_t_27'),
        new item(0, 'Vaso T 27 Preto', 'vaso_t_27'),

        new item(11, 'Vaso T 30 Cerâmica', 'vaso_t_30'),
        new item(0, 'Vaso T 30 Preto', 'vaso_t_30'),

        new item(9, 'Vaso T 35 Cerâmica', 'vaso_t_35'),
        new item(10, 'Vaso T 35 Preto', 'vaso_t_35')
    ]
)
var forth = new Inventario(
    'Forth',
    '25/07/2023',
    [
        new item(0, 'Acaricida Concentrado - 60ml', 'a'),
        new item(13, 'Acaricida p/uso - 500ml', 'a'),

        new item(33, 'Baraticida Gel', 'b'),
        new item(0, 'Bokashi - 250g', 'b'),
        new item(0, 'Bonsai Concentrado - 60ml', 'b'),
        new item(6, 'Bonsai p/uso - 500ml', 'b'),
        new item(0, 'Brilha folha Concentrado - 60ml', 'b'),
        new item(23, 'Brilha folha p/uso - 500ml', 'b'),

        new item(7, 'Cactos Concentrado - 60ml', 'c'),
        new item(15, 'Cactos Concentrado - 500m', 'c'),
        new item(9, 'Cobre Concentrado - 60ml', 'c'),
        new item(13, 'Cobre Concentrado - 500m', 'c'),
        new item(8, 'Coqueiros - 400g', 'c'),
        new item(6, 'Coqueiros - 3kg', 'c'),
        new item(0, 'Coqueiros - 10Kg', 'c'),
        new item(11, 'Cote 14.14.14 - 150g', 'c'),
        new item(10, 'Cote 15.09.12 - 150g', 'c'),
        new item(0, 'Cote 14.14.14 - 400g', 'c'),
        new item(0, 'Cote 15.09.12 - 400g', 'c'),
        new item(0, 'Cupinicida Concentrado - 60ml', 'c'),

        new item(0, 'Defende Concentrado - 30ml', 'd'),
        new item(5, 'Defende p/uso - 500ml', 'd'),

        new item(2, 'Enraizador Concentrado - 60ml', 'e'),
        new item(24, 'Enxofre Concentrado - 60ml', 'e'),
        new item(14, 'Enxofre p/uso - 500ml', 'e'),
        new item(5, 'Equilibrio Concentrado - 60ml', 'e'),
        new item(3, 'Equilibrio Concentrado - 500ml', 'e'),

        new item(0, 'Fipronil+imidacloprid Concentrado - 60ml', 'f'),
        new item(10, 'Flores Concentrado - 60ml', 'f'),
        new item(6, 'Flores p/uso - 500ml', 'f'),
        new item(30, 'Flores - 400g', 'f'),
        new item(13, 'Flores - 3kg', 'f'),
        new item(0, 'Flores - 10Kg', 'f'),
        new item(45, 'Formicida Gel', 'f'),
        new item(7, 'Formicida isca granulada', 'f'), 
        new item(17, 'Formicida Mata no ninho p/uso - 500ml', 'f'),
        new item(0, 'Frutas Concentrado - 60ml', 'f'),
        new item(18, 'Frutas p/uso - 500ml', 'f'),
        new item(0, 'Frutas - 400g', 'f'),
        new item(5, 'Frutas - 3kg', 'f'),
        new item(0, 'Frutas - 10Kg', 'f'),
        new item(0, 'Fungicida Concentrado - 30ml', 'f'),
        new item(1, 'Fungicida p/uso - 500ml', 'f'),
        new item(0, 'Fungicida cobre p/uso - 500ml', 'f'),

        new item(0, 'Gel para plantio - 100g', 'g'),

        new item(11, 'Hortaliças Concentrado - 60ml', 'h'),
        new item(15, 'Hortaliças p/uso - 500ml', 'h'),
        new item(16, 'Hortaliças - 400g', 'h'),
        new item(6, 'Hortaliças - 3kg', 'h'),
        new item(0, 'Hortaliças - 10Kg', 'h'),

        new item(0, 'Inseticida Concentrado - 30ml', 'i'),
        new item(19, 'Inseticida p/uso - 500ml', 'i'),

        new item(0, 'Jabuticabeiras Concentrado - 60ml', 'j'),
        new item(0, 'Jabuticabeiras - 400g', 'j'),
        new item(7, 'Jabuticabeiras - 3kg', 'j'),
        new item(1, 'Jardim Concentrado - 60ml', 'j'),
        new item(6, 'Jardim p/uso - 500ml', 'j'),
        new item(7, 'Jardim - 400g', 'j'),
        new item(6, 'Jardim - 3kg', 'j'),

        new item(5, 'Lesmicida isca granulada', 'l'),

        new item(13, 'Mata cochonilha p/uso - 500ml', 'm'),
        new item(13, 'Mata lagarta p/uso - 500ml', 'm'),
        new item(0, 'Mata mato Concentrado - 30ml', 'm'),
        new item(5, 'Mata mato p/uso - 500ml', 'm'),
        new item(12, 'Mata pulgão p/uso - 500ml', 'm'),

        new item(5, 'Óleo Concentrado - 60ml', 'o'),
        new item(8, 'Orquídeas Floração Concentrado - 60ml', 'o'),
        new item(26, 'Orquídeas Floração p/uso - 500ml', 'o'),
        new item(30, 'Orquídeas Manutenção Concentrado - 60ml', 'o'),
        new item(27, 'Orquídeas Manutenção p/uso - 500ml', 'o'),
        new item(24, 'Orquídeas 09.45.15 - 100g', 'o'),
        new item(42, 'Orquídeas 20.20.20 - 100g', 'o'),
        new item(11, 'Orquídeas 30.10.10 - 100g', 'o'),
        new item(0, 'Orquídeas 09.45.15 - 400g', 'o'),
        new item(0, 'Orquídeas 20.20.20 - 400g', 'o'),

        new item(2, 'Palmeiras - 400g', 'p'),
        new item(0, 'Palmeiras - 3kg', 'p'),
        new item(16, 'Pasta selante', 'p'),

        new item(0, 'Raticida Bloco - 200g', 'r'),
        new item(22, 'Raticida isca Anticoagulante', 'r'),
        new item(0, 'Rosa do deserto Concentrado - 60ml', 'r'),
        new item(13, 'Rosa do deserto p/uso - 500ml', 'r'),
        new item(3, 'Rosa do deserto - 400g', 'r'),

        new item(0, 'Samambaias Concentrado - 60ml', 's'),
        new item(14, 'Samambaias p/uso - 500ml', 's'),
        new item(18, 'Samambaias - 400g', 's'),
        new item(10, 'Suculentas Concentrado - 60ml', 's'),

        new item(10, 'Temperos Concentrado - 60ml', 't'),
        new item(13, 'Temperos p/uso - 500ml', 't'),

        new item(0, 'Violetas Concentrado - 60ml', 'v'),
    ]
)
var alfa = new Inventario(
    'Alfa',
    '29/07/2023',
    [
        new item(4, 'Bacia Diamante nº 1 Bege', 'bacia_diamante_1'),
        new item(4, 'Bacia Diamante nº 1 Cimento', 'bacia_diamante_1'),

        new item(4, 'Bacia Diamante nº 2 Cimento', 'bacia_diamante_2'),
        new item(3, 'Bacia Diamante nº 2 Marrom', 'bacia_diamante_2'),
        new item(1, 'Bacia Diamante nº 2 Preto', 'bacia_diamante_2'),

        new item(2, 'Bacia Diamante nº 3 Bege', 'bacia_diamante_3'),
        new item(3, 'Bacia Diamante nº 3 Cimento', 'bacia_diamante_3'),
        new item(2, 'Bacia Diamante nº 3 Marrom', 'bacia_diamante_3'),

        new item(15, 'Bacia Grafito C/ Prato nº 1 Bege', 'bacia_grafiato_1'),
        new item(15, 'Bacia Grafito C/ Prato nº 1 Cimento', 'bacia_grafiato_1'),
        new item(15, 'Bacia Grafito C/ Prato nº 1 Marrom', 'bacia_grafiato_1'),
        new item(15, 'Bacia Grafito C/ Prato nº 1 Preto', 'bacia_grafiato_1'),

        new item(9, 'Bacia Grafito C/Prato nº 2 Bege', 'bacia_grafiato_2'),
        new item(10, 'Bacia Grafito C/Prato nº 2 Cimento', 'bacia_grafiato_2'),
        new item(7, 'Bacia Grafito C/Prato nº 2 Marrom', 'bacia_grafiato_2'),
        new item(7, 'Bacia Grafito C/Prato nº 2 Preto', 'bacia_grafiato_2'),

        new item(1, 'Bacia Grafito C/Prato nº 3 Bege', 'bacia_grafiato_3'),
        new item(4, 'Bacia Grafito C/Prato nº 3 Cimento', 'bacia_grafiato_3'),
        new item(1, 'Bacia Grafito C/Prato nº 3 Marrom', 'bacia_grafiato_3'),
        new item(2, 'Bacia Grafito C/Prato nº 3 Preto', 'bacia_grafiato_3'),

        new item(5, 'Bacia Grafito C/Prato nº 4 Bege', 'bacia_grafiato_4'),
        new item(2, 'Bacia Grafito C/Prato nº 4 Cimento', 'bacia_grafiato_4'),
        new item(3, 'Bacia Grafito C/Prato nº 4 Marrom', 'bacia_grafiato_4'),
        new item(4, 'Bacia Grafito C/Prato nº 4 Preto', 'bacia_grafiato_4'),

        new item(10, 'Bacia Marmorizada C/Prato nº 1 Azul', 'bacia_marmorizada_1'),
        new item(10, 'Bacia Marmorizada C/Prato nº 1 Vermelho', 'bacia_marmorizada_1'),

        new item(3, 'Bacia Marmorizada C/Prato nº 2 Azul', 'bacia_marmorizada_2'),
        new item(4, 'Bacia Marmorizada C/Prato nº 2 Vermelho', 'bacia_marmorizada_2'),

        new item(10, 'Bacia Polida C/Prato nº 1 Bege', 'bacia_polida_1'),
        new item(10, 'Bacia Polida C/Prato nº 1 Cimento', 'bacia_polida_1'),
        new item(10, 'Bacia Polida C/Prato nº 1 Marrom', 'bacia_polida_1'),
        new item(10, 'Bacia Polida C/Prato nº 1 Preto', 'bacia_polida_1'),

        new item(6, 'Bacia Polida C/Prato nº 2 Bege', 'bacia_polida_2'),
        new item(6, 'Bacia Polida C/Prato nº 2 Cimento', 'bacia_polida_2'),
        new item(4, 'Bacia Polida C/Prato nº 2 Marrom', 'bacia_polida_2'),
        new item(6, 'Bacia Polida C/Prato nº 2 Preto', 'bacia_polida_2'),

        new item(3, 'Coluna Red. Degrau Grafiato C/Prato nº 1 Bege', 'coluna_degrau_1'),
        new item(3, 'Coluna Red. Degrau Grafiato C/Prato nº 1 Cimento', 'coluna_degrau_1'),
        new item(3, 'Coluna Red. Degrau Grafiato C/Prato nº 1 Marrom', 'coluna_degrau_1'),
        new item(3, 'Coluna Red. Degrau Grafiato C/Prato nº 1 Preto', 'coluna_degrau_1'),

        new item(3, 'Coluna Red. Degrau Grafiato C/Prato nº 2 Bege', 'coluna_degrau_2'),
        new item(3, 'Coluna Red. Degrau Grafiato C/Prato nº 2 Cimento', 'coluna_degrau_2'),
        new item(3, 'Coluna Red. Degrau Grafiato C/Prato nº 2 Marrom', 'coluna_degrau_2'),
        new item(3, 'Coluna Red. Degrau Grafiato C/Prato nº 2 Preto', 'coluna_degrau_2'),

        new item(3, 'Coluna Red. Degrau Grafiato C/Prato nº 3 Bege', 'coluna_degrau_3'),
        new item(3, 'Coluna Red. Degrau Grafiato C/Prato nº 3 Cimento', 'coluna_degrau_3'),
        new item(3, 'Coluna Red. Degrau Grafiato C/Prato nº 3 Marrom', 'coluna_degrau_3'),
        new item(3, 'Coluna Red. Degrau Grafiato C/Prato nº 3 Preto', 'coluna_degrau_3'),

        new item(3, 'Coluna Red. Degrau Grafiato C/Prato nº 4 Bege', 'coluna_degrau_4'),
        new item(3, 'Coluna Red. Degrau Grafiato C/Prato nº 4 Cimento', 'coluna_degrau_4'),
        new item(3, 'Coluna Red. Degrau Grafiato C/Prato nº 4 Marrom', 'coluna_degrau_4'),
        new item(3, 'Coluna Red. Degrau Grafiato C/Prato nº 4 Preto', 'coluna_degrau_4'),

        new item(2, 'Coluna Red. Degrau Grafiato C/Prato nº 5 Bege', 'coluna_degrau_5'),
        new item(2, 'Coluna Red. Degrau Grafiato C/Prato nº 5 Preto', 'coluna_degrau_5'),

        new item(2, 'Coluna Red. Diamante C/Prato nº 1 Bege', 'coluna_diamante_1'),
        new item(4, 'Coluna Red. Diamante C/Prato nº 1 Cimento', 'coluna_diamante_1'),
        new item(1, 'Coluna Red. Diamante C/Prato nº 1 Marrom', 'coluna_diamante_1'),
        new item(3, 'Coluna Red. Diamante C/Prato nº 1 Preta', 'coluna_diamante_1'),

        new item(2, 'Coluna Red. Diamante C/Prato nº 2 Bege', 'coluna_diamante_2'),
        new item(3, 'Coluna Red. Diamante C/Prato nº 2 Cimento', 'coluna_diamante_2'),
        new item(1, 'Coluna Red. Diamante C/Prato nº 2 Marrom', 'coluna_diamante_2'),
        new item(3, 'Coluna Red. Diamante C/Prato nº 2 Preta', 'coluna_diamante_2'),

        new item(3, 'Coluna Red. Diamante C/Prato nº 3 Bege', 'coluna_diamante_3'),
        new item(1, 'Coluna Red. Diamante C/Prato nº 3 Cimento', 'coluna_diamante_3'),
        new item(4, 'Coluna Red. Diamante C/Prato nº 3 Marrom', 'coluna_diamante_3'),
        new item(2, 'Coluna Red. Diamante C/Prato nº 3 Preta', 'coluna_diamante_3'),

        new item(1, 'Coluna Red. Diamante C/Prato nº 4 Bege', 'coluna_diamante_4'),
        new item(1, 'Coluna Red. Diamante C/Prato nº 4 Cimento', 'coluna_diamante_4'),
        new item(1, 'Coluna Red. Diamante C/Prato nº 4 Marrom', 'coluna_diamante_4'),
        new item(3, 'Coluna Red. Diamante C/Prato nº 4 Preta', 'coluna_diamante_4'),

        new item(2, 'Coluna Red. Diamante C/Prato nº 5 Bege', 'coluna_diamante_5'),
        new item(2, 'Coluna Red. Diamante C/Prato nº 5 Cimento', 'coluna_diamante_5'),
        new item(2, 'Coluna Red. Diamante C/Prato nº 5 Marrom', 'coluna_diamante_5'),
        new item(2, 'Coluna Red. Diamante C/Prato nº 5 Preta', 'coluna_diamante_5'),

        new item(4, 'Coluna Red. Grafiato C/Preto nº 1 Bege', 'coluna_grafiato_1'),
        new item(4, 'Coluna Red. Grafiato C/Preto nº Cimento', 'coluna_grafiato_1'),
        new item(4, 'Coluna Red. Grafiato C/Preto nº 1 Marrom', 'coluna_grafiato_1'),
        new item(4, 'Coluna Red. Grafiato C/Preto nº 1 Preto', 'coluna_grafiato_1'),

        new item(5, 'Coluna Red. Grafiato C/Preto nº 2 Bege', 'coluna_grafiato_2'),
        new item(6, 'Coluna Red. Grafiato C/Preto nº 2 Ciemento', 'coluna_grafiato_2'),
        new item(5, 'Coluna Red. Grafiato C/Preto nº 2 Marrom', 'coluna_grafiato_2'),
        new item(4, 'Coluna Red. Grafiato C/Preto nº 2 Preto', 'coluna_grafiato_2'),

        new item(7, 'Coluna Red. Grafito C/Prato nº 3 Bege', 'coluna_grafiato_3'),
        new item(5, 'Coluna Red. Grafito C/Prato nº 3 Cimento', 'coluna_grafiato_3'),
        new item(5, 'Coluna Red. Grafito C/Prato nº 3 Marrom', 'coluna_grafiato_3'),
        new item(6, 'Coluna Red. Grafito C/Prato nº 3 Preto', 'coluna_grafiato_3'),

        new item(4, 'Coluna Red. Grafito C/Prato nº 4 Bege', 'coluna_grafiato_4'),
        new item(4, 'Coluna Red. Grafito C/Prato nº 4 Cimento', 'coluna_grafiato_4'),
        new item(4, 'Coluna Red. Grafito C/Prato nº 4 Marrom', 'coluna_grafiato_4'),
        new item(4, 'Coluna Red. Grafito C/Prato nº 4 Preto', 'coluna_grafiato_4'),

        new item(4, 'Coluna Red. Marmorizada C/Prato nº 1 Azul', 'coluna_marmorizada_1'),
        new item(3, 'Coluna Red. Marmorizada C/Prato nº 1 Vermelho', 'coluna_marmorizada_1'),

        new item(3, 'Coluna Red. Marmorizada C/Prato nº 2 Azul', 'coluna_marmorizada_2'),
        new item(3, 'Coluna Red. Marmorizada C/Prato nº 2 Vermelho', 'coluna_marmorizada_2'),

        new item(5, 'Coluna Red. Marmorizada C/Prato nº 3 Azul', 'coluna_marmorizada_3'),
        new item(4, 'Coluna Red. Marmorizada C/Prato nº 3 Vermelho', 'coluna_marmorizada_3'),

        new item(4, 'Coluna Red. Marmorizada C/Prato nº 4 Azul', 'coluna_marmorizada_4'),
        new item(3, 'Coluna Red. Marmorizada C/Prato nº 4 Vermelho', 'coluna_marmorizada_4'),

        new item(6, 'Coluna Red. Polida C/Prato nº 1 Bege', 'coluna_polida_1'),
        new item(6, 'Coluna Red. Polida C/Prato nº 1 Cimento', 'coluna_polida_1'),
        new item(6, 'Coluna Red. Polida C/Prato nº 1 Marrom', 'coluna_polida_1'),
        new item(6, 'Coluna Red. Polida C/Prato nº 1 Preto', 'coluna_polida_1'),

        new item(5, 'Coluna Red. Polida C/Prato nº 2 Bege', 'coluna_polida_2'),
        new item(5, 'Coluna Red. Polida C/Prato nº 2 Cimento', 'coluna_polida_2'),
        new item(6, 'Coluna Red. Polida C/Prato nº 2 Marrom', 'coluna_polida_2'),
        new item(5, 'Coluna Red. Polida C/Prato nº 2 Preto', 'coluna_polida_2'),

        new item(5, 'Coluna Red. Polida C/Prato nº 3 Bege', 'coluna_polida_3'),
        new item(5, 'Coluna Red. Polida C/Prato nº 3 Cimento', 'coluna_polida_3'),
        new item(8, 'Coluna Red. Polida C/Prato nº 3 Marrom', 'coluna_polida_3'),
        new item(5, 'Coluna Red. Polida C/Prato nº 3 Preto', 'coluna_polida_3'),

        new item(2, 'Coluna Red. Polida C/Prato nº 4 Bege', 'coluna_polida_4'),
        new item(4, 'Coluna Red. Polida C/Prato nº 4 Cimento', 'coluna_polida_4'),
        new item(5, 'Coluna Red. Polida C/Prato nº 4 Marrom', 'coluna_polida_4'),
        new item(4, 'Coluna Red. Polida C/Prato nº 4 Preto', 'coluna_polida_4'),

        new item(3, 'Jardineira Frisada C/Prato Bege', 'jardineira_frisada_1'),
        new item(3, 'Jardineira Frisada C/Prato Preto', 'jardineira_frisada_1'),

        new item(4, 'Jardineira Grafito C/Prato nº 1 Bege', 'jardineira_grafiato_1'),
        new item(4, 'Jardineira Grafito C/Prato nº 1 Preto', 'jardineira_grafiato_1'),

        new item(4, 'Jardineira Grafito C/Prato nº 2 Bege', 'jardineira_grafiato_2'),
        new item(4, 'Jardineira Grafito C/Prato nº 2 Preto', 'jardineira_grafiato_2'),
        
        new item(6, 'Vaso Bojo Red. Diamante C/Prato nº 1 Bege', 'vaso_diamante_1'),
        new item(6, 'Vaso Bojo Red. Diamante C/Prato nº 1 Cimento', 'vaso_diamante_1'),
        new item(8, 'Vaso Bojo Red. Diamante C/Prato nº 1 Marrom', 'vaso_diamante_1'),
        new item(3, 'Vaso Bojo Red. Diamante C/Prato nº 1 Preto', 'vaso_diamante_1'),

        new item(2, 'Vaso Bojo Red. Diamante C/Prato nº 2 Bege', 'vaso_diamante_2'),
        new item(3, 'Vaso Bojo Red. Diamante C/Prato nº 2 Cimento', 'vaso_diamante_2'),
        new item(4, 'Vaso Bojo Red. Diamante C/Prato nº 2 Marrom', 'vaso_diamante_2'),
        new item(3, 'Vaso Bojo Red. Diamante C/Prato nº 2 Preto', 'vaso_diamante_2'),

        new item(3, 'Vaso Bojo Red. Diamante C/Prato nº 3 Bege', 'vaso_diamante_3'),
        new item(3, 'Vaso Bojo Red. Diamante C/Prato nº 3 Cimento', 'vaso_diamante_3'),
        new item(2, 'Vaso Bojo Red. Diamante C/Prato nº 3 Marrom', 'vaso_diamante_3'),
        new item(4, 'Vaso Bojo Red. Diamante C/Prato nº 3 Preto', 'vaso_diamante_3'),

        new item(8, 'Vaso Bojo Red. Diamante C/Prato nº 4 Bege', 'vaso_diamante_4'),
        new item(5, 'Vaso Bojo Red. Diamante C/Prato nº 4 Cimento', 'vaso_diamante_4'),
        new item(7, 'Vaso Bojo Red. Diamante C/Prato nº 4 Marrom', 'vaso_diamante_4'),
        new item(7, 'Vaso Bojo Red. Diamante C/Prato nº 4 Preto', 'vaso_diamante_4'),

        new item(15, 'Vaso Bojo Frisado C/Prato nº 1 Bege', 'vaso_frisado_1'),
        new item(15, 'Vaso Bojo Frisado C/Prato nº 1 Cimento', 'vaso_frisado_1'),
        new item(15, 'Vaso Bojo Frisado C/Prato nº 1 Marrom', 'vaso_frisado_1'),
        new item(15, 'Vaso Bojo Frisado C/Prato nº 1 Preto', 'vaso_frisado_1'),

        new item(10, 'Vaso Bojo Frisado C/Prato nº 2 Bege', 'vaso_frisado_2'),
        new item(10, 'Vaso Bojo Frisado C/Prato nº 2 Cimento', 'vaso_frisado_2'),
        new item(7, 'Vaso Bojo Frisado C/Prato nº 2 Marrom', 'vaso_frisado_2'),
        new item(7, 'Vaso Bojo Frisado C/Prato nº 2 Preto', 'vaso_frisado_2'),

        new item(10, 'Vaso Bojo Frisado C/Prato nº 3 Bege', 'vaso_frisado_3'),
        new item(10, 'Vaso Bojo Frisado C/Prato nº 3 Cimento', 'vaso_frisado_3'),
        new item(4, 'Vaso Bojo Frisado C/Prato nº 3 Marrom', 'vaso_frisado_3'),
        new item(7, 'Vaso Bojo Frisado C/Prato nº 3 Preto', 'vaso_frisado_3'),

        new item(6, 'Vaso Bojo Frisado C/Prato nº 4 Bege', 'vaso_frisado_4'),
        new item(6, 'Vaso Bojo Frisado C/Prato nº 4 Cimento', 'vaso_frisado_4'),
        new item(5, 'Vaso Bojo Frisado C/Prato nº 4 Marrom', 'vaso_frisado_4'),
        new item(7, 'Vaso Bojo Frisado C/Prato nº 4 Preto', 'vaso_frisado_4'),

        new item(10, 'Vaso Bojo Red. Grafito C/Prato nº 1 Bege', 'vaso_grafito_1'),
        new item(10, 'Vaso Bojo Red. Grafito C/Prato nº 1 Cimento', 'vaso_grafito_1'),
        new item(10, 'Vaso Bojo Red. Grafito C/Prato nº 1 Marrom', 'vaso_grafito_1'),
        new item(9, 'Vaso Bojo Red. Grafito C/Prato nº 1 Preto', 'vaso_grafito_1'),

        new item(8, 'Vaso Bojo Red. Grafito C/Prato nº 2 Bege', 'vaso_grafito_2'),
        new item(8, 'Vaso Bojo Red. Grafito C/Prato nº 2 Cimento', 'vaso_grafito_2'),
        new item(6, 'Vaso Bojo Red. Grafito C/Prato nº 2 Marrom', 'vaso_grafito_2'),
        new item(3, 'Vaso Bojo Red. Grafito C/Prato nº 2 Preto', 'vaso_grafito_2'),

        new item(6, 'Vaso Bojo Red. Grafito C/Prato nº 3 Bege', 'vaso_grafito_3'),
        new item(6, 'Vaso Bojo Red. Grafito C/Prato nº 3 Cimento', 'vaso_grafito_3'),
        new item(4, 'Vaso Bojo Red. Grafito C/Prato nº 3 Marrom', 'vaso_grafito_3'),
        new item(4, 'Vaso Bojo Red. Grafito C/Prato nº 3 Preto', 'vaso_grafito_3'),

        new item(4, 'Vaso Bojo Red. Grafito C/Prato nº 4 Bege', 'vaso_grafito_4'),
        new item(4, 'Vaso Bojo Red. Grafito C/Prato nº 4 Cimento', 'vaso_grafito_4'),
        new item(5, 'Vaso Bojo Red. Grafito C/Prato nº 4 Marrom', 'vaso_grafito_4'),
        new item(4, 'Vaso Bojo Red. Grafito C/Prato nº 4 Preto', 'vaso_grafito_4'),

        new item(7, 'Vaso Bojo Red. Marmorizado C/Prato nº 1 Azul', 'vaso_marmorizado_1'),
        new item(6, 'Vaso Bojo Red. Marmorizado C/Prato nº 1 Vermelho', 'vaso_marmorizado_1'),

        new item(4, 'Vaso Bojo Red. Marmorizado C/Prato nº 2 Azul', 'vaso_marmorizado_2'),
        new item(6, 'Vaso Bojo Red. Marmorizado C/Prato nº 2 Vermelho', 'vaso_marmorizado_2'),

        new item(5, 'Vaso Bojo Red. Marmorizado C/Prato nº 3 Azul', 'vaso_marmorizado_3'),
        new item(5, 'Vaso Bojo Red. Marmorizado C/Prato nº 3 Vermelho', 'vaso_marmorizado_3'),

        new item(7, 'Vaso Bojo Red. Polido C/Prato nº 1 Bege', 'vaso_polido_1'),
        new item(7, 'Vaso Bojo Red. Polido C/Prato nº 1 Cimento', 'vaso_polido_1'),
        new item(6, 'Vaso Bojo Red. Polido C/Prato nº 1 Marrom', 'vaso_polido_1'),
        new item(9, 'Vaso Bojo Red. Polido C/Prato nº 1 Preto', 'vaso_polido_1'),

        new item(4, 'Vaso Bojo Red. Polido C/Prato nº 2 Bege', 'vaso_polido_2'),
        new item(6, 'Vaso Bojo Red. Polido C/Prato nº 2 Cimento', 'vaso_polido_2'),
        new item(4, 'Vaso Bojo Red. Polido C/Prato nº 2 Marrom', 'vaso_polido_2'),
        new item(4, 'Vaso Bojo Red. Polido C/Prato nº 2 Preto', 'vaso_polido_2'),

        new item(3, 'Vaso Bojo Red. Polido C/Prato nº 3 Bege', 'vaso_polido_3'),
        new item(3, 'Vaso Bojo Red. Polido C/Prato nº 3 Cimento', 'vaso_polido_3'),
        new item(3, 'Vaso Bojo Red. Polido C/Prato nº 3 Marrom', 'vaso_polido_3'),
        new item(5, 'Vaso Bojo Red. Polido C/Prato nº 3 Preto', 'vaso_polido_3'),

        new item(1, 'Vaso Cone Polido C/Prato nº 4 Marrom', 'vaso_cone_4')
    ]
)

//=================================================||Funções||====================================================
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
        try {document.getElementById(`entrada${index}`).select()}
        catch {null}
    } else {
        menuEspecificOn = false
        menuEspecifico.style.display = 'none'
    }
}

function multiplicação(index) {
    var multiplicando = registro[index].valor
    var multiplicador = window.document.getElementById(`entrada${index}`).value

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
        <p id='${identificador}${index}' class='inventario' onclick="linhaDestacada(${identificador}${index})">
            ${empresa.inventario[index].nome}${'.'.repeat(repeatNumber - (empresa.inventario[index].nome.length))}${'.'.repeat(5 - String(empresa.inventario[index].quantidade).length)}${empresa.inventario[index].quantidade}
        </p>`
        objeto = empresa.inventario[index].objeto
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
        case 'eme_a_eme':
            return emeAeme
        case 'forth':
            return forth
        case 'alfa':
            return alfa
        default:
            break
    }
}

var alternador = ''

function validação(identidade) {
    let quadroDeEntrada = document.getElementById('divDeEntrada')
    let quadroDeSaida = document.getElementById('divDeSaida')
    let reposição = document.getElementById('entradaDoRepositor').value
    let item = buscadorDeInventario(identidade).inventario[indiceRepositor]

    if ((item.quantidade - reposição) < 0) {
        if (!document.getElementsByClassName('menssagem_de_erro')[0]) {
            quadroDeEntrada.innerHTML += '<p class="menssagem_de_erro">Quantidado no disponivel</p>'
        }
        
    } else {
        try {document.getElementsByClassName('menssagem_de_erro')[0].remove()}
        catch {null}

        if (alternador != item.objeto) {quadroDeSaida.innerHTML += '<br>'}
        alternador = `${item.objeto}`

        quadroDeSaida.innerHTML += `<p class="ordem_de_reposição">${item.nome} /${reposição}</p>`
        indiceRepositor++
                
        repositor(identidade)
    }
}

function repositor(identidade) {
    function contato(texto, tag='p class="repositor"') {quadroDeEntrada.innerHTML += `<${tag}>${texto}</${tag}>`}
    
    let empresa = buscadorDeInventario(identidade)
    let quadroDeEntrada = document.getElementById('divDeEntrada')

    quadroDeEntrada.innerHTML = `<h1 style='text-align: center;'>Repositor ${empresa.nome}</h1>`
    contato(empresa.inventario[indiceRepositor].nome, 'h3')
    contato(`Estoque: ${empresa.inventario[indiceRepositor].quantidade}`)
    contato(`Repor: <input tipe='number' id='entradaDoRepositor' class='repositor' onchange='validação("${identidade}")'>`)
}

//====================================================||Comandos||================================================
impreção(articleRegaplan, regaplan, 'regaplan')
impreção(articleEmeAEme, emeAeme, 'emeAeme')
impreção(articleForth, forth, 'forth')
impreção(articleAlfa, alfa, 'alfa')
