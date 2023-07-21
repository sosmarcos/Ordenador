class item {
    constructor(quantidade, nome, objeto, valor=0) {
        this.nome = nome
        this.objeto = objeto
        this.valor = valor
        this.quantidade = quantidade
    }
}

var regaplan = [
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

let objeto
for (let index in regaplan) {
    if (objeto != regaplan[index].objeto) {document.getElementById('principal').innerHTML += '<br>'}
    document.getElementById('principal').innerText += `${regaplan[index].nome}${'.'.repeat(43 - (regaplan[index].nome.length))}${'.'.repeat(3 - String(regaplan[index].quantidade).length)}${regaplan[index].quantidade}
    `

    objeto = regaplan[index].objeto
}


